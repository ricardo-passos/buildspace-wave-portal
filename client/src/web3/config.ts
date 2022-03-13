import { WavePortal__factory } from '../types/contracts'

// ABIs
import WavePortalABI from './ABIs/WavePortal.json'

// utils
import { currentEnv } from '../utils/currentEnv'

const commonConfig = {
  abi: WavePortalABI,
  contractFactory: {
    WavePortal: WavePortal__factory,
  },
}

const devConfig = {
  address: import.meta.env.VITE_DEV_WAVE_PORTAL_SMART_CONTRACT_ADDRESS,
  supportedChainIds: [31337],
  url: 'http://127.0.0.1:8545',
  ...commonConfig,
}
const prodConfig = {
  address: import.meta.env.VITE_PROD_WAVE_PORTAL_SMART_CONTRACT_ADDRESS,
  supportedChainIds: [4],
  url: '',
  ...commonConfig,
}

const config = currentEnv === 'development' ? devConfig : prodConfig

export { config }
