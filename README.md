# Harvest Haven (DeFi Protocol)

Mainnet Chain: Base (CHAIN ID: 8453)

- Harvest ERC-20: [0x486C3fb721c7faA426D4E68D7769b4427F86a7d9](https://basescan.org/address/0x486C3fb721c7faA426D4E68D7769b4427F86a7d9) - [Audit](https://github.com/HarvestHavenDefi/DefiProtocol/blob/main/contracts/Harvest-HVR-Audit.pdf)
- Vester contract: [0xcb8bBb6ABAF4E16B6c585eC1051E4cb91b89d04a](https://basescan.org/address/0xcb8bBb6ABAF4E16B6c585eC1051E4cb91b89d04a)

Testnet Chain: Base Sepolia (CHAIN ID: 84532)

- Harvest ERC-20: [0x59d7f67abaaf534e1baef17b6b988b0d4e37a966](https://sepolia.basescan.org/address/0x59d7f67abaaf534e1baef17b6b988b0d4e37a966) - [Audit](https://github.com/HarvestHavenDefi/DefiProtocol/blob/main/contracts/Harvest-HVR-Audit.pdf)
- Vester contract: [0xdb703099243e59ef2d8c741d053444211dcce42d](https://sepolia.basescan.org/address/0xdb703099243e59ef2d8c741d053444211dcce42d)

## Steps to reproduce

1. Clone the repository
2. Run `npm i`
3. Create a .env file following .env.example.

### Once enviroments are set up

- Smart contract Testing (Base Goerli fork):

  - Run: `npx hardhat test`

- For deployment:
  - Run: `npx hardhat run scripts/<DEPLOYMENT SCRIPT.TS> --network "<CHOOSEN NETWORK>"`

_Note: Network options:_

    - "hardhat": Forking Base Goerli testnet.
    - "BaseMainnet": Base Mainnet
    - "BaseTestnet": Base Goerli Testnet
