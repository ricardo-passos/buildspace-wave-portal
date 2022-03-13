import { ChakraProvider as Provider } from '@chakra-ui/react'
import { theme } from './theme'

// types
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function ChakraProvider({ children }: Props) {
  return <Provider theme={theme}>{children}</Provider>
}

export { ChakraProvider }
