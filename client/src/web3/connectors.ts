import { InjectedConnector } from '@web3-react/injected-connector'

// web3
import { config } from './config'

// this is the `ethereum` object that is injected in the page when metamask is installed
const injected = new InjectedConnector({
  supportedChainIds: config.supportedChainIds,
})

export { injected }
