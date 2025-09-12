// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title NOVA USD Token
 * @notice Regulated stablecoin token implementing compliance controls aligned with GENIUS Act concepts
 * @dev Implements: pausing, blacklist, account freeze, optional KYC gating, law-enforcement force transfer and wipe, and EIP-2612 permits
 */
contract NovaToken is ERC20, ERC20Permit, Pausable, AccessControl {
    // ===== Roles =====
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");
    bytes32 public constant LAW_ENFORCEMENT_ROLE = keccak256("LAW_ENFORCEMENT_ROLE");

    // ===== Compliance State =====
    mapping(address => bool) private _blacklisted;
    mapping(address => bool) private _frozen;
    mapping(address => bool) private _kycApproved;
    bool private _kycRequired;

    // Internal flag to allow special operations to bypass compliance checks (e.g., law-enforcement actions)
    bool private _bypassCompliance;

    // ===== Events =====
    event BlacklistUpdated(address indexed account, bool isBlacklisted);
    event FrozenStatusUpdated(address indexed account, bool isFrozen);
    event KycStatusChanged(address indexed account, bool isApproved);
    event KycRequiredSet(bool required);
    event ForcedTransfer(address indexed from, address indexed to, uint256 amount, string reference);
    event FundsSeizedAndWiped(address indexed from, uint256 amount, string reference);
    event Redeemed(address indexed account, uint256 amount);

    constructor(address initialAdmin)
        ERC20("NOVA USD", "NOVA")
        ERC20Permit("NOVA USD")
    {
        require(initialAdmin != address(0), "admin is zero");
        _grantRole(DEFAULT_ADMIN_ROLE, initialAdmin);
        _grantRole(PAUSER_ROLE, initialAdmin);
        _grantRole(MINTER_ROLE, initialAdmin);
        _grantRole(COMPLIANCE_ROLE, initialAdmin);
        _grantRole(LAW_ENFORCEMENT_ROLE, initialAdmin);
    }

    // ===== Admin/Compliance Controls =====
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function setKycRequired(bool required) external onlyRole(COMPLIANCE_ROLE) {
        _kycRequired = required;
        emit KycRequiredSet(required);
    }

    function setKyc(address account, bool approved) external onlyRole(COMPLIANCE_ROLE) {
        _kycApproved[account] = approved;
        emit KycStatusChanged(account, approved);
    }

    function setBlacklist(address account, bool isBlacklisted) external onlyRole(COMPLIANCE_ROLE) {
        _blacklisted[account] = isBlacklisted;
        emit BlacklistUpdated(account, isBlacklisted);
    }

    function setFrozen(address account, bool isFrozen) external onlyRole(COMPLIANCE_ROLE) {
        _frozen[account] = isFrozen;
        emit FrozenStatusUpdated(account, isFrozen);
    }

    // ===== Mint/Burn/Redemption =====
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    /**
     * @notice Holder-initiated redemption (burn). Off-chain redemption at par is operational.
     */
    function redeem(uint256 amount) external {
        _burn(_msgSender(), amount);
        emit Redeemed(_msgSender(), amount);
    }

    // ===== Law-Enforcement Actions =====
    /**
     * @notice Force transfer tokens from one address to another per lawful order.
     * @dev Bypasses pause/blacklist/freeze/KYC checks for this operation only.
     */
    function forceTransfer(address from, address to, uint256 amount, string calldata reference)
        external
        onlyRole(LAW_ENFORCEMENT_ROLE)
    {
        require(from != address(0) && to != address(0), "zero addr");
        require(balanceOf(from) >= amount, "insufficient");

        _bypassCompliance = true;
        _update(from, to, amount);
        _bypassCompliance = false;

        emit ForcedTransfer(from, to, amount, reference);
    }

    /**
     * @notice Seize and wipe tokens from an address per lawful order.
     * @param from Account to wipe
     * @param amount If set to type(uint256).max, wipes full balance
     */
    function seizeAndWipe(address from, uint256 amount, string calldata reference)
        external
        onlyRole(LAW_ENFORCEMENT_ROLE)
    {
        require(from != address(0), "zero addr");
        uint256 burnAmount = amount == type(uint256).max ? balanceOf(from) : amount;
        require(balanceOf(from) >= burnAmount, "insufficient");

        _bypassCompliance = true;
        _burn(from, burnAmount);
        _bypassCompliance = false;

        emit FundsSeizedAndWiped(from, burnAmount, reference);
    }

    // ===== Views =====
    function isBlacklisted(address account) external view returns (bool) { return _blacklisted[account]; }
    function isFrozen(address account) external view returns (bool) { return _frozen[account]; }
    function isKycApproved(address account) external view returns (bool) { return _kycApproved[account]; }
    function kycRequired() external view returns (bool) { return _kycRequired; }

    // ===== Internal hooks =====
    function _update(address from, address to, uint256 value) internal override {
        if (!_bypassCompliance) {
            require(!paused(), "token paused");

            if (from != address(0)) {
                require(!_blacklisted[from], "from blacklisted");
                require(!_frozen[from], "from frozen");
                if (_kycRequired) {
                    require(_kycApproved[from], "from not KYC-approved");
                }
            }

            if (to != address(0)) {
                require(!_blacklisted[to], "to blacklisted");
                if (_kycRequired) {
                    require(_kycApproved[to], "to not KYC-approved");
                }
            }
        }

        super._update(from, to, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

