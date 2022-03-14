import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Flex, Button, FormControl, Input, FormLabel } from '@chakra-ui/react'

// hooks
import { useContract } from '../../hooks/useContract'

function Wave() {
  // states
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  // hooks
  const { active } = useWeb3React()
  const { contract: wavePortalContract } = useContract({
    name: 'WavePortal',
    onlyOnActiveAccount: true,
  })

  async function wave() {
    if (active && wavePortalContract && message.length) {
      try {
        let count = await wavePortalContract.totalwaves()
        console.log('Retrieved total wave count...', count.toNumber())

        setSendingMessage(true)

        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        })
        console.log('Mining...', waveTxn.hash)

        await waveTxn.wait()
        console.log('Mined -- ', waveTxn.hash)

        setMessage('')
        setSendingMessage(false)

        count = await wavePortalContract.totalwaves()
        console.log('Retrieved total wave count...', count.toNumber())
      } catch (error) {
        console.log(error)
      } finally {
        setSendingMessage(false)
      }
    }
  }

  return (
    <Flex align='flex-end' gap={5}>
      <FormControl>
        <FormLabel htmlFor='message'>Your message: </FormLabel>
        <Input
          id='message'
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
        />
      </FormControl>

      <Button
        onClick={wave}
        colorScheme='pink'
        loadingText='waving...'
        isLoading={sendingMessage}
      >
        Wave at me
      </Button>
    </Flex>
  )
}

export { Wave }
