// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title HARVEST ERC-20
/// @author Cristian Richarte Gil - Harvest Heaven

contract Harvest is ERC20 {
    constructor(
        address manager,
        uint256 amount
    ) payable ERC20("Harvest", "HVR") {
        _mint(manager, amount * 10 ** decimals());
    }
}
