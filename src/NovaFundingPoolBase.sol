// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Pausable.sol';

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

interface IReceiptToken is IERC20 {
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
}

// Custom errors
error InvalidNogeToken();
error InvalidAsset();
error AssetNotListedInAavePool();
error AmountZero();
error InvalidRecipient();
error ExceedsAvailableYield(uint256 requested, uint256 available);
error TransferFailed(address token, address from, address to, uint256 amount);
error WithdrawMismatch(address token, uint256 requested, uint256 withdrawn);

/**
 * @title NovaFundingPoolBase
 * @notice Abstract base for single-token funding pools that earn yield via Aave
 * @dev Concrete pools specify TOKEN and DECIMALS_FACTOR at construction
 */
abstract contract NovaFundingPoolBase is Ownable, ReentrancyGuard, Pausable {
    // Underlying stablecoin managed by this pool
    address public immutable TOKEN;

    // Factor to normalize TOKEN decimals to 18 (e.g., 1e12 for 6-dec tokens)
    uint256 public immutable DECIMALS_FACTOR;

    // NOGE receipt token interface (mint/burn)
    IReceiptToken public immutable NOGE;

    // Aave integration
    // Aave V3 addresses provider (configurable per deployment)
    IAaveAddressesProvider public immutable addressesProvider;
    IAavePool public immutable AAVE_POOL;
    address public immutable ATOKEN;

    // Aggregate principal tracked to compute available yield
    uint256 public totalDeposits; // total amount of TOKEN managed by the pool

    // Events (token is implied by the pool)
    event Deposited(address indexed user, uint256 amount, uint256 nogeReceived);
    event Withdrawn(address indexed user, uint256 amount);
    event YieldWithdrawn(address indexed recipient, uint256 amount);

    constructor(address _noge, address _token, uint256 _decimalsFactor, address _addressesProvider)
        Ownable(msg.sender)
    {
        if (_noge == address(0)) revert InvalidNogeToken();
        if (_token == address(0)) revert InvalidAsset();

        NOGE = IReceiptToken(_noge);
        TOKEN = _token;
        DECIMALS_FACTOR = _decimalsFactor;

        IAaveAddressesProvider providerCandidate = IAaveAddressesProvider(_addressesProvider);
        IAavePool poolCandidate = IAavePool(providerCandidate.getPool());

        ReserveData memory data = poolCandidate.getReserveData(_token);
        if (data.aTokenAddress == address(0)) revert AssetNotListedInAavePool();

        addressesProvider = providerCandidate;
        AAVE_POOL = poolCandidate;
        ATOKEN = data.aTokenAddress;

        // Set a one-time max allowance to the Aave pool
        IERC20(_token).approve(address(poolCandidate), 0);
        IERC20(_token).approve(address(poolCandidate), type(uint256).max);
    }

    /**
     * @notice Deposit TOKEN and receive NOGE memecoin tokens
     * @param amount The amount of TOKEN to deposit
     */
    function deposit(uint256 amount) external nonReentrant whenNotPaused {
        if (amount == 0) revert AmountZero();

        // Transfer TOKEN from user
        if (!IERC20(TOKEN).transferFrom(msg.sender, address(this), amount)) {
            revert TransferFailed(TOKEN, msg.sender, address(this), amount);
        }

        // Deposit to Aave to earn yield
        AAVE_POOL.supply(TOKEN, amount, address(this), 0);

        // Calculate NOGE tokens to mint (normalized to 18 decimals)
        uint256 nogeAmount = amount * DECIMALS_FACTOR;

        // Mint NOGE tokens to user
        NOGE.mint(msg.sender, nogeAmount);

        // Update aggregate principal
        totalDeposits += amount;

        emit Deposited(msg.sender, amount, nogeAmount);
    }

    /**
     * @notice Withdraw deposited TOKEN using NOGE tokens
     * @param amount The amount of TOKEN to withdraw
     */
    function withdraw(uint256 amount) external nonReentrant whenNotPaused {
        if (amount == 0) revert AmountZero();

        // Calculate NOGE tokens to burn (normalized to 18 decimals)
        uint256 nogeNeeded = amount * DECIMALS_FACTOR;

        // Burn user's NOGE tokens (pool has mint/burn role)
        NOGE.burn(msg.sender, nogeNeeded);

        // Withdraw from Aave
        uint256 withdrawn = AAVE_POOL.withdraw(TOKEN, amount, msg.sender);
        if (withdrawn != amount) {
            revert WithdrawMismatch(TOKEN, amount, withdrawn);
        }

        // Update aggregate principal
        totalDeposits -= amount;

        emit Withdrawn(msg.sender, withdrawn);
    }

    /**
     * @notice Returns current accrued yield available for owner withdrawal
     */
    function getAvailableYield() public view returns (uint256) {
        uint256 balance = IERC20(ATOKEN).balanceOf(address(this));
        if (balance <= totalDeposits) {
            return 0;
        }
        return balance - totalDeposits;
    }

    /**
     * @notice Owner-only function to withdraw accrued yield (not principal)
     * @param amount Amount of TOKEN yield to withdraw
     * @param recipient Recipient of the withdrawn yield
     */
    function withdrawYield(uint256 amount, address recipient) external onlyOwner {
        if (recipient == address(0)) revert InvalidRecipient();
        if (amount == 0) revert AmountZero();

        uint256 available = getAvailableYield();
        if (amount > available) revert ExceedsAvailableYield(amount, available);

        uint256 withdrawn = AAVE_POOL.withdraw(TOKEN, amount, recipient);
        if (withdrawn != amount) {
            revert WithdrawMismatch(TOKEN, amount, withdrawn);
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
