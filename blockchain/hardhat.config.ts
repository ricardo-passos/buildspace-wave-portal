import '@nomiclabs/hardhat-waffle'
import 'dotenv/config'

// types
import type { HardhatUserConfig } from 'hardhat/types'

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: `0x${process.env.WALLET_PRIVATE_KEY}`,
          balance: '10000000000000000000000',
        },
      ],
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_PROJECT_ID}`,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
    },
  },
}

export default config
