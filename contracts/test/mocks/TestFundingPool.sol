// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../src/NovaFundingPoolBase.sol";

/**
 * @dev Concrete implementation exposing the base constructor and using injected provider/pool via vm.etch
 * In tests we will deploy with mocked Aave Pool at the provider address located in the base.
 */
contract TestFundingPool is NovaFundingPoolBase {
    constructor(address nogeToken, address token, uint256 decimalsFactor, address provider)
        NovaFundingPoolBase(nogeToken, token, decimalsFactor, provider)
    {}
}

