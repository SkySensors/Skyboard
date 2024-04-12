import { Box, Center, ChakraProvider } from '@chakra-ui/react'
import './App.css'
import GraphGrid from './components/GraphGrid'
import defaultTheme from './assets/theme'
import { useMemo } from 'react'
import Toolbar from './components/Toolbar'

export default function App() {

  const theme = useMemo(() => defaultTheme(), [])

  return (
    <ChakraProvider theme={theme}>
      <Center>
        <Box w={"95%"} h={"95%"}>
          <Toolbar />
          <GraphGrid />
        </Box>
      </Center>
    </ChakraProvider>
  )
}
