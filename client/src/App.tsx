import { Flex } from '@chakra-ui/react'

// components
import { Wave } from './components/Wave'
import { Profile } from './components/Profile'
import { WaveList } from './components/Waves/List'

function App() {
  return (
    <Flex direction='column' p='20px'>
      <Profile />

      <Wave />

      <WaveList />
    </Flex>
  )
}

export { App }
