// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@aave/contracts/interfaces/IPool.sol";
import "@aave/contracts/interfaces/IPoolAddressesProvider.sol";

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
    using SafeERC20 for IERC20;
    // Aave V3 addresses on Ethereum mainnet
    IPoolAddressesProvider public constant ADDRESSES_PROVIDER =
        IPoolAddressesProvider(0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e);

    // Underlying stablecoin managed by this pool
    address public immutable TOKEN;

    // Factor to normalize TOKEN decimals to 18 (e.g., 1e12 for 6-dec tokens)
    uint256 public immutable DECIMALS_FACTOR;

    // NOGE receipt token interface (mint/burn)
    IReceiptToken public immutable nogeToken;

    // Cached Aave pool and aToken to minimize external calls
    IPool public immutable AAVE_POOL;
    address public immutable ATOKEN;

    // Aggregate principal tracked to compute available yield
    uint256 public totalDeposits; // total amount of TOKEN managed by the pool

    // Events (token is implied by the pool)
    event Deposited(address indexed user, uint256 amount, uint256 nogeReceived);
    event Withdrawn(address indexed user, uint256 amount);
    event YieldWithdrawn(address indexed recipient, uint256 amount);

    constructor(address _nogeToken, address _token, uint256 _decimalsFactor) Ownable(msg.sender) {
        nogeToken = IReceiptToken(_nogeToken);
        TOKEN = _token;
        DECIMALS_FACTOR = _decimalsFactor;

        // Cache Aave pool and aToken at deployment for simplicity
        IPool pool = IPool(ADDRESSES_PROVIDER.getPool());
        AAVE_POOL = pool;
        ATOKEN = pool.getReserveData(_token).aTokenAddress;

        // Set a one-time max allowance to the Aave pool
        IERC20(_token).safeApprove(address(pool), 0);
        IERC20(_token).safeApprove(address(pool), type(uint256).max);
    }

    /**
     * @notice Deposit TOKEN and receive NOGE memecoin tokens
     * @param amount The amount of TOKEN to deposit
     */
    function deposit(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");

        // Transfer TOKEN from user
        IERC20(TOKEN).safeTransferFrom(msg.sender, address(this), amount);

        // Update aggregate principal
        totalDeposits += amount;

        // Deposit to Aave to earn yield
        AAVE_POOL.supply(TOKEN, amount, address(this), 0);

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

        // Withdraw from Aave
        uint256 withdrawn = AAVE_POOL.withdraw(TOKEN, amount, msg.sender);

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
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        uint256 available = getAvailableYield();
        require(amount <= available, "Exceeds available yield");

        uint256 withdrawn = AAVE_POOL.withdraw(TOKEN, amount, recipient);
        require(withdrawn == amount, "Yield withdraw mismatch");

        emit YieldWithdrawn(recipient, amount);
    }

    // Admin controls
    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // Disallow receiving Ether
    receive() external payable { revert(); }
    fallback() external payable { revert(); }
}


