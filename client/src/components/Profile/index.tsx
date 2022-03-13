import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Flex, Button, Text, Tooltip, useClipboard } from '@chakra-ui/react'

// web3
import { injected } from '../../web3/connectors'

function Address() {
  // states
  const [formattedAddress, setFormattedAddress] = useState('')

  // hooks
  const { account } = useWeb3React()
  const { onCopy, hasCopied } = useClipboard(account!)

  useEffect(() => {
    const firstAddressPart = account?.substring(0, 6)
    const lastAddressPart = account?.substring(38, 42)

    const formattedAddress = `${firstAddressPart} ... ${lastAddressPart}`

    setFormattedAddress(formattedAddress)
  }, [])

  return (
    <Tooltip label={hasCopied ? 'Copied!' : 'Copy'} closeOnClick={false}>
      <Text
        px='10px'
        color='#333'
        onClick={onCopy}
        cursor='pointer'
        borderRadius='xl'
        bgColor='gray.300'
        fontWeight='medium'
        transition='ease 200ms'
        _hover={{
          bgColor: 'gray.400',
          color: '#222',
        }}
      >
        {formattedAddress}
      </Text>
    </Tooltip>
  )
}

function Profile() {
  // hooks
  const { activate, deactivate, active } = useWeb3React()

  async function handleWalletConnection() {
    if (!active) {
      try {
        await activate(injected, undefined, true)
      } catch (err) {
        console.log('erro ao logar', { err })
      }
    } else {
      deactivate()
    }
  }

  return (
    <Flex as='header' gap='10px' justify='flex-end' align='center'>
      {active && <Address />}

      <Button
        onClick={handleWalletConnection}
        colorScheme={active ? 'red' : 'whatsapp'}
      >
        {active ? 'Disconnect wallet' : 'Connect Wallet'}
      </Button>
    </Flex>
  )
}

export { Profile }
