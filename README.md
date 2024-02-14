# Harvest Haven (DeFi)

<a href="https://harvesthaven.gitbook.io/" target="_blank">Harvest Haven Gitbook</a> 🌱

Mainnet Chain: Base (CHAIN ID: 8453)

- Harvest ERC-20: [0x0](https://sepolia.basescan.org/address/0x0)
- Vester contract: [0xdb703099243e59ef2d8c741d053444211dcce42d](https://basescan.org/address/0xdb703099243e59ef2d8c741d053444211dcce42d)

Testnet Chain: Base Sepolia (CHAIN ID: 84532)

- Harvest ERC-20: [0x59d7f67abaaf534e1baef17b6b988b0d4e37a966](https://sepolia.basescan.org/address/0x59d7f67abaaf534e1baef17b6b988b0d4e37a966)
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

### `.env.example`

```.env
# Manager (Total supply receiver)
MANAGER_PUBLIC_KEY=0xa3070E7Ff34aa7a1fBEFF961cA6d3A97115a8F4a

# Deployers & Testing
DEVELOPER=0x562a2b9177DD821cAA073f18F669a121Fd583508
PRIVATE_KEY=xxxx

# RPC PROVIDERS
RPC_PROVIDER_MAINNET=https://base.llamarpc.com
RPC_PROVIDER_TESTNET=https://base-sepolia.blockpi.network/v1/rpc/public

# BaseScan API Key for verification
BASE_SCAN_API_KEY=xxxx

```
