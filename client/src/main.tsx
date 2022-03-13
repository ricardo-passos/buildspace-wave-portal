import React from 'react'
import ReactDOM from 'react-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// routes
import { App } from './App'

import { ChakraProvider } from './config/chakra'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Routes>
            <Route path='/' element={<App />}>
            </Route>
          </Routes>
        </Web3ReactProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
