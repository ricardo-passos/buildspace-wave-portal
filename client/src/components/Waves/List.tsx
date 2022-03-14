import { useState, useEffect } from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'

// hooks
import { useContract } from '../../hooks/useContract'

type Wave = {
  address: string
  timestamp: Date
  message: string
}

function WaveList() {
  // states
  const [allWaves, setAllWaves] = useState<Wave[]>([])

  // hooks
  const { active } = useWeb3React()
  const { contract: wavePortalContract } = useContract({
    name: 'WavePortal',
  })

  // loads the new comments
  useEffect(() => {
    if (active && wavePortalContract) {
      const onNewWave = (from: string, timestamp: string, message: string) => {
        console.log('NewWave', from, timestamp, message)

        setAllWaves((prevState) => [
          ...prevState,
          {
            address: from,
            timestamp: new Date(Number(timestamp) * 1000),
            message: message,
          },
        ])
      }

      wavePortalContract.on('NewWave', onNewWave)

      return () => {
        wavePortalContract.off('NewWave', onNewWave)
      }
    }
  }, [wavePortalContract])

  // loads all comments when user connects their wallet
  useEffect(() => {
    if (active && wavePortalContract) {
      ;(async () => {
        try {
          const waves = await wavePortalContract.getAllWaves()

          const formattedWaves: Wave[] = []
          waves.forEach((wave) => {
            formattedWaves.push({
              address: wave.waver,
              timestamp: new Date(Number(wave.timestamp) * 1000),
              message: wave.message,
            })
          })

          setAllWaves(formattedWaves)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [active, wavePortalContract])

  return (
    <Flex direction='column'>
      {allWaves.map((wave) => (
        <Box
          key={wave.timestamp.toString()}
          style={{
            backgroundColor: 'OldLace',
            marginTop: '16px',
            padding: '8px',
          }}
        >
          <Text>Address: {wave.address}</Text>
          <Text>Time: {wave.timestamp.toString()}</Text>
          <Text>Message: {wave.message}</Text>
        </Box>
      ))}
    </Flex>
  )
}

export { WaveList }
