import { HardhatUserConfig } from "hardhat/config";
import { ethers, run, network } from "hardhat";
require("dotenv").config();

async function main() {
  const manager = process.env.MANAGER_PUBLIC_KEY?.toString()!; // Manager Address to send 90% funds once deployment
  const signers = await ethers.getSigners();
  const deployer = signers[0];

  const VestingContract = await ethers.getContractFactory("Vester");
  const vestingContract = await VestingContract.connect(deployer).deploy();
  const vestingAddress = await vestingContract.getAddress();

  const Harvest = await ethers.getContractFactory("Harvest");
  const harvest = await Harvest.connect(deployer).deploy(
    manager,
    vestingAddress
  );

  console.log(`Vesting Address: ${vestingAddress}`);
  console.log(`Harvest contract deployed to:  ${await harvest.getAddress()}`);
  console.log(`\nName: ${await harvest.name()}`);
  console.log(`Symbol: ${await harvest.symbol()}`);
  console.log(
    `Amount HVR minted: ${ethers.formatEther(await harvest.totalSupply())} HVR`
  );
  console.log(
    `Manager HVR balance:  ${ethers.formatEther(
      await harvest.balanceOf(manager)
    )}`
  );
  console.log(
    `Dev Vesting HVR balance:  ${ethers.formatEther(
      await harvest.balanceOf(vestingAddress)
    )}`
  );

  try {
    if (network.name !== "hardhat" && network.name !== "BaseTestnet") {
      console.log("[!] Verifying...");
      await run("verify:verify", {
        address: await vestingContract.getAddress(),
        constructorArguments: [],
      });

      await run("verify:verify", {
        address: await harvest.getAddress(),
        constructorArguments: [manager, vestingAddress],
      });
    }
  } catch (e) {
    console.log(e);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
