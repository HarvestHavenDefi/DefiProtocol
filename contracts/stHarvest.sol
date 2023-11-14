// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.23;
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "./Harvest.sol";

// /// @title HARVEST ERC-20
// /// @author Cristian Richarte Gil - Harvest
// /// @notice ERC-20 token
// /// @dev Explain to a developer any extra details
// contract Harvest is ERC20 {
//     // Mapping to track the allowed minters. It´s meant to be DefiContracts whitelisted.
//     mapping(address => bool) public isMinter;

//     modifier onlyMinter() {
//         require(isMinter[msg.sender], "Not allowed");
//         _;
//     }

//     constructor()
//         payable
//         ERC20("staked Harvest", "stHVR")
//         Ownable(msg.sender)
//     {}

//     function mint(uint256 amount, address receiver) external onlyMinter {
//         _mint(receiver, amount);
//     }

//     function updateMinter() external onlyOwner {}

//     function burn(uint256 amount) external onlyOwner {
//         _burn(msg.sender, amount);
//     }
// }
