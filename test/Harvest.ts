import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Harvest", () => {
  async function config() {
    const amountToMint: number = 20000000; // 20 millions
    const amountToMintWei = ethers.parseUnits(amountToMint.toString(), "ether");
    const name = "Harvest";
    const symbol = "HVR";
    const decimals = 18;

    const signers = await ethers.getSigners();
    const deployer = signers[0];
    const managerAddress = process.env.MANAGER_PUBLIC_KEY!;

    const VestingContract = await ethers.getContractFactory("Vester");
    const vestingContract = await VestingContract.connect(deployer).deploy();
    const vestingAddress = await vestingContract.getAddress();

    const expectedManagerBalance = 18000000 * 10 ** 18; // 90%
    const expectedVestingBalance = 2000000 * 10 ** 18; // 10%

    const Harvest = await ethers.getContractFactory("Harvest");
    const harvest = await Harvest.connect(deployer).deploy(
      managerAddress,
      vestingAddress
    );

    return {
      harvest,
      amountToMint,
      amountToMintWei,
      managerAddress,
      name,
      symbol,
      decimals,
      deployer,
      vestingAddress,
      vestingContract,
      expectedManagerBalance,
      expectedVestingBalance,
    };
  }

  describe("Deployment", async () => {
    it("Name", async () => {
      const { name, harvest } = await loadFixture(config);
      expect(await harvest.name()).to.equal(name);
    });

    it("Symbol", async () => {
      const { symbol, harvest } = await loadFixture(config);
      expect(await harvest.symbol()).to.equal(symbol);
    });

    it("Decimals", async () => {
      const { decimals, harvest } = await loadFixture(config);
      expect(await harvest.decimals()).to.equal(decimals);
    });

    it("Amount Minted", async () => {
      const { amountToMintWei, harvest } = await loadFixture(config);
      expect(await harvest.totalSupply()).to.equal(amountToMintWei);
    });

    it("90% Total supply should be owned by Manager & 10% by dev vesting", async () => {
      const {
        managerAddress,
        harvest,
        vestingAddress,
        expectedManagerBalance,
        expectedVestingBalance,
      } = await loadFixture(config);
      const managerBalance = await harvest.balanceOf(managerAddress);
      const vestingBalance = await harvest.balanceOf(vestingAddress);
      const totalSupply = await harvest.totalSupply();

      console.log("Manager Balance:", managerBalance.toString());
      console.log("Vesting Balance:", vestingBalance.toString());
      console.log("Total Supply:", totalSupply.toString());
      console.log(
        "Expected Manager Balance (90% of Total Supply):",
        expectedManagerBalance.toString()
      );
      console.log(
        "Expected Vesting Balance (10% of Total Supply):",
        expectedVestingBalance.toString()
      );

      expect(Number(managerBalance)).to.equal(expectedManagerBalance);
      expect(Number(vestingBalance)).to.equal(expectedVestingBalance);
    });

    it("withdraw first vesting", async () => {
      const { deployer, harvest, expectedVestingBalance, vestingContract } =
        await loadFixture(config);
      const vestingAmount = expectedVestingBalance / 10;

      await vestingContract.withdraw(await harvest.getAddress());

      const vestingBalance = await harvest.balanceOf(deployer);

      expect(Number(vestingBalance)).to.equal(vestingAmount);
      console.log("Developer now has: ", vestingBalance);
    });

    it("should withdraw the next vesting after 30 days", async () => {
      const { deployer, harvest, expectedVestingBalance, vestingContract } =
        await loadFixture(config);
      const vestingAmount = expectedVestingBalance / 10;

      await vestingContract.withdraw(await harvest.getAddress()); // First vesting
      // Increase time by 30 days
      for (let i = 0; i < 9; i++) {
        await time.increase(32 * 24 * 60 * 60);
        await vestingContract.withdraw(await harvest.getAddress());
      }

      const vestingBalance = await harvest.balanceOf(deployer);

      console.log("Developer now has: ", vestingBalance);
      expect(Number(vestingBalance)).to.equal(10 * vestingAmount);

      // If the contract is empty of HVR then revert
      await expect(vestingContract.withdraw(await harvest.getAddress())).to.be
        .reverted;
    });

    it("should revert if withdraw before 30 days", async () => {
      const { harvest, expectedVestingBalance, vestingContract } =
        await loadFixture(config);

      await vestingContract.withdraw(await harvest.getAddress()); // First vesting

      await expect(vestingContract.withdraw(await harvest.getAddress())).to.be
        .reverted;
    });
  });
});
