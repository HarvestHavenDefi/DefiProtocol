// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract VestingContract {
    uint256 public constant totalLocked = 2000000 ether;
    uint256 public constant vestingPeriod = 10; // 10 months
    uint256 public constant vestingInterval = 30 days; // 30 days per interval
    uint256 public vestingsClaimed = 0; // Amounts of vestings claimed
    address public immutable owner;
    uint256[] public vestingSchedule = [
        0,
        1710284400,
        1712959200,
        1715551200,
        1718229600,
        1720821600,
        1723500000,
        1726178400,
        1728770400,
        1731452400,
        1734044400
    ]; // Every 13 of each month at 00:00:00 GMT+2

    event Withdrawn(address indexed beneficiary, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function withdraw(address _token) external {
        require(_token != address(0), "not_valid_address");
        require(msg.sender == owner, "not_owner");
        uint256 withdrawableAmount = totalLocked / vestingPeriod;
        IERC20 token = IERC20(_token);

        require(
            block.timestamp >= vestingSchedule[vestingsClaimed],
            "Vesting period has not started"
        );
        require(
            vestingsClaimed <= vestingSchedule.length,
            "All tokens already withdrawn"
        );

        uint256 currentInterval = vestingSchedule[vestingsClaimed];
        require(
            currentInterval <= block.timestamp,
            "Not enough time has passed"
        );

        require(
            token.balanceOf(address(this)) >= withdrawableAmount,
            "Insufficient balance in the contract"
        );

        vestingsClaimed++;
        token.transfer(owner, withdrawableAmount);
        emit Withdrawn(owner, withdrawableAmount);
    }

    function remainingLockedTokens(
        address _token
    ) external view returns (uint256) {
        require(_token != address(0), "not_valid_address");
        IERC20 token = IERC20(_token);
        return token.balanceOf(address(this));
    }

    function nextVesting() external view returns (uint256) {
        return vestingSchedule[vestingsClaimed];
    }
}
