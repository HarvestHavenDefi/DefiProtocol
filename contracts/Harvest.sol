// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Harvest (HVR) ERC-20 Token
/// @author Cristian Richarte Gil - Harvest Haven

contract Harvest is ERC20 {
    /**
     * @dev Initializes the Harvest ERC-20 contract with the total supply.
     * @param manager The address of the total supply manager/receiver.
     * @notice The maximum token supply is set to 20 million tokens.
     */
    constructor(
        address manager,
        address devVesting
    ) payable ERC20("Harvest", "HVR") {
        _mint(manager, 18000000 * 10 ** decimals());
        _mint(devVesting, 2000000 * 10 ** decimals());
    }
}
