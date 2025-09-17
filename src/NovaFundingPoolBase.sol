// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

struct ReserveData {
    address aTokenAddress;
}

interface IAaveAddressesProvider {
    function getPool() external view returns (address);
}

interface IAavePool {
    function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
    function getReserveData(address asset) external view returns (ReserveData memory);
}

/**
 * @title NovaFundingPoolBase
 * @notice Abstract base for single-token funding pools that earn yield via Aave
 * @dev Concrete pools specify TOKEN and DECIMALS_FACTOR at construction
 */
interface IReceiptToken is IERC20 {
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
}

abstract contract NovaFundingPoolBase is Ownable, ReentrancyGuard, Pausable {
    // Aave V3 addresses provider (configurable per deployment)
    IAaveAddressesProvider public immutable addressesProvider;

    // Underlying stablecoin managed by this pool
    address public immutable TOKEN;

    // Factor to normalize TOKEN decimals to 18 (e.g., 1e12 for 6-dec tokens)
    uint256 public immutable DECIMALS_FACTOR;

    // NOGE receipt token interface (mint/burn)
    IReceiptToken public immutable nogeToken;

    // Optional Aave integration (disabled when addressesProvider == address(0))
    IAavePool public immutable AAVE_POOL;
    address public immutable ATOKEN;
    bool public immutable useAave;

    // Aggregate principal tracked to compute available yield
    uint256 public totalDeposits; // total amount of TOKEN managed by the pool

    // Events (token is implied by the pool)
    event Deposited(address indexed user, uint256 amount, uint256 nogeReceived);
    event Withdrawn(address indexed user, uint256 amount);
    event YieldWithdrawn(address indexed recipient, uint256 amount);

    constructor(address _nogeToken, address _token, uint256 _decimalsFactor, address _addressesProvider)
        Ownable(msg.sender)
    {
        require(_nogeToken != address(0), "Invalid NOGE token");
        require(_token != address(0), "Invalid asset");
        nogeToken = IReceiptToken(_nogeToken);
        TOKEN = _token;
        DECIMALS_FACTOR = _decimalsFactor;
        IAaveAddressesProvider resolvedProvider = IAaveAddressesProvider(address(0));
        IAavePool resolvedPool = IAavePool(address(0));
        address resolvedAToken = address(0);
        bool resolvedUseAave = false;

        if (_addressesProvider != address(0)) {
            IAaveAddressesProvider providerCandidate = IAaveAddressesProvider(_addressesProvider);
            IAavePool poolCandidate = IAavePool(providerCandidate.getPool());

            try poolCandidate.getReserveData(_token) returns (ReserveData memory data) {
                if (data.aTokenAddress != address(0)) {
                    resolvedProvider = providerCandidate;
                    resolvedPool = poolCandidate;
                    resolvedAToken = data.aTokenAddress;
                    resolvedUseAave = true;

                    // Set a one-time max allowance to the Aave pool
                    IERC20(_token).approve(address(poolCandidate), 0);
                    IERC20(_token).approve(address(poolCandidate), type(uint256).max);
                }
            } catch {
                // Asset not listed in the configured Aave pool; fall back to holding tokens locally.
            }
        }

        addressesProvider = resolvedProvider;
        AAVE_POOL = resolvedPool;
        ATOKEN = resolvedAToken;
        useAave = resolvedUseAave;
    }

    /**
     * @notice Deposit TOKEN and receive NOGE memecoin tokens
     * @param amount The amount of TOKEN to deposit
     */
    function deposit(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");

        // Transfer TOKEN from user
        IERC20(TOKEN).transferFrom(msg.sender, address(this), amount);

        // Update aggregate principal
        totalDeposits += amount;

        // Deposit to Aave to earn yield when configured
        if (useAave) {
            AAVE_POOL.supply(TOKEN, amount, address(this), 0);
        }

        // Calculate NOGE tokens to mint (normalized to 18 decimals)
        uint256 nogeAmount = amount * DECIMALS_FACTOR;

        // Mint NOGE tokens to user
        nogeToken.mint(msg.sender, nogeAmount);

        emit Deposited(msg.sender, amount, nogeAmount);
    }

    /**
     * @notice Withdraw deposited TOKEN using NOGE tokens
     * @param amount The amount of TOKEN to withdraw
     */
    function withdraw(uint256 amount) external nonReentrant whenNotPaused {

        // Calculate NOGE tokens to burn (normalized to 18 decimals)
        uint256 nogeNeeded = amount * DECIMALS_FACTOR;

        // Burn user's NOGE tokens (pool has mint/burn role)
        nogeToken.burn(msg.sender, nogeNeeded);

        // Update aggregate principal
        totalDeposits -= amount;

        uint256 withdrawn;

        if (useAave) {
            // Withdraw from Aave
            withdrawn = AAVE_POOL.withdraw(TOKEN, amount, msg.sender);
        } else {
            IERC20(TOKEN).transfer(msg.sender, amount);
            withdrawn = amount;
        }

        emit Withdrawn(msg.sender, withdrawn);
    }

    /**
     * @notice Returns current accrued yield available for owner withdrawal
     */
    function getAvailableYield() public view returns (uint256) {
        if (useAave) {
            uint256 balance = IERC20(ATOKEN).balanceOf(address(this));
            if (balance <= totalDeposits) {
                return 0;
            }
            return balance - totalDeposits;
        }

        uint256 contractBalance = IERC20(TOKEN).balanceOf(address(this));
        if (contractBalance <= totalDeposits) {
            return 0;
        }
        return contractBalance - totalDeposits;
    }

    /**
     * @notice Owner-only function to withdraw accrued yield (not principal)
     * @param amount Amount of TOKEN yield to withdraw
     * @param recipient Recipient of the withdrawn yield
     */
    function withdrawYield(uint256 amount, address recipient) external onlyOwner {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        uint256 available = getAvailableYield();
        require(amount <= available, "Exceeds available yield");

        uint256 withdrawn;
        if (useAave) {
            withdrawn = AAVE_POOL.withdraw(TOKEN, amount, recipient);
            require(withdrawn == amount, "Yield withdraw mismatch");
        } else {
            IERC20(TOKEN).transfer(recipient, amount);
            withdrawn = amount;
        }

        emit YieldWithdrawn(recipient, amount);
    }

    // Admin controls
    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // Disallow receiving Ether
    receive() external payable { revert(); }
    fallback() external payable { revert(); }
}
