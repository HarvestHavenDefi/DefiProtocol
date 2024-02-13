// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Harvest (HVR) ERC-20 Token
 * @author 0xCR6 - Harvest Haven
 */
contract Harvest is ERC20 {
    /**
     * @dev Initializes the Harvest ERC-20 contract with the total supply.
     * @param manager The address of the manager.
     * @param vester The address of the vester contract.
     * @notice The maximum token supply is set to 20 million tokens.
     */
    constructor(
        address manager,
        address vester
    ) payable ERC20("Harvest", "HVR") {
        _mint(manager, 19000000 * 10 ** decimals());
        _mint(vester, 1000000 * 10 ** decimals());
    }
}
