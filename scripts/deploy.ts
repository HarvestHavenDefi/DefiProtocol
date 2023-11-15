import { HardhatUserConfig } from "hardhat/config";
import { ethers } from "hardhat";
require("dotenv").config();

async function main() {
  const manager = process.env.MANAGER_PUBLIC_KEY?.toString()!; // Manager Address to send all funds once deployment

  const signers = await ethers.getSigners();
  const deployer = signers[0];

  const Harvest = await ethers.getContractFactory("Harvest");
  const harvest = await Harvest.connect(deployer).deploy(manager);

  console.log(`Harvest contract deployed to:  ${await harvest.getAddress()}`);
  console.log(`Name: ${await harvest.name()}`);
  console.log(`Symbol: ${await harvest.symbol()}`);
  console.log(
    `Amount HVR minted: ${ethers.formatEther(await harvest.totalSupply())} HVR`
  );
  console.log(
    `Manager HVR balance:  ${ethers.formatEther(
      await harvest.balanceOf(manager)
    )}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
