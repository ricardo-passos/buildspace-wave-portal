import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { providers } from 'ethers'

// web3
import { config } from '../web3/config'

// types
import type { Signer } from 'ethers'

function useProvider() {
  // states
  const [provider, setProvider] = useState(
    new providers.JsonRpcProvider(config.url)
  )
  const [signer, setSigner] = useState<Signer>()

  // hooks
  const { active, library } = useWeb3React()

  useEffect(() => {
    if (active) {
      const provider = new providers.Web3Provider(library.provider)
      const signer = provider.getSigner()

      setProvider(provider)
      setSigner(signer)
    }
  }, [active])

  return { provider, signer }
}

export { useProvider }
