import { useState, useEffect } from 'react'

// hooks
import { useProvider } from './useProvider'

// web3
import { config } from '../web3/config'

// types
import type { WavePortal } from '../types/contracts'

type Props = {
  name: 'WavePortal'
  onlyOnActiveAccount?: boolean
}

function useContract({
  name: contractName,
  onlyOnActiveAccount = false,
}: Props) {
  // states
  const [contract, setContract] = useState<WavePortal>()

  // hooks
  const { provider, signer } = useProvider()

  useEffect(() => {
    const contract = config.contractFactory[contractName].connect(
      config.address,
      provider
    )

    setContract(contract)
  }, [])

  useEffect(() => {
    if (onlyOnActiveAccount && signer) {
      const contract = config.contractFactory[contractName].connect(
        config.address,
        signer
      )

      setContract(contract)
    }
  }, [onlyOnActiveAccount, signer])

  return { contract }
}

export { useContract }
