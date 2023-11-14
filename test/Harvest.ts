import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Harvest", () => {
  async function config() {
    const amountToMint: number = 10000000;
    const amountToMintWei = ethers.parseUnits(amountToMint.toString(), "ether");
    const name = "Harvest";
    const symbol = "HVR";
    const decimals = 18;

    const signers = await ethers.getSigners();
    const deployer = signers[0];
    const manager = signers[1];

    const Harvest = await ethers.getContractFactory("Harvest");
    const harvest = await Harvest.connect(deployer).deploy(
      manager,
      amountToMint
    );

    return {
      harvest,
      amountToMint,
      amountToMintWei,
      manager,
      name,
      symbol,
      decimals,
      deployer,
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

    it("Total supply should be owned by Manager", async () => {
      const { amountToMintWei, manager, harvest } = await loadFixture(config);
      const managerBalance = await harvest.balanceOf(manager.address);
      const totalSupply = await harvest.totalSupply();

      console.log("Balance:", managerBalance);
      console.log("TotalSupply:", totalSupply);
      console.log("amountToMint:", amountToMintWei);
      expect(managerBalance).to.equal(totalSupply);
      expect(managerBalance).to.equal(amountToMintWei);
    });
  });
});
