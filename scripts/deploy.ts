import { ethers } from "hardhat";

async function main() {
  const manager = "0x0000"; //todo! Update with the manager Address
  const amountToMint = 0; //todo! Update with the amount to mint

  const signers = await ethers.getSigners();
  const deployer = signers[0];

  const Harvest = await ethers.getContractFactory("Harvest");
  const harvest = await Harvest.connect(deployer).deploy(manager, amountToMint);

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
