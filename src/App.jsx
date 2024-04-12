import { Box, Center, ChakraProvider } from '@chakra-ui/react'
import './App.css'
import GraphGrid from './components/GraphGrid'
import defaultTheme from './assets/theme'
import { useMemo } from 'react'

export default function App() {

  const theme = useMemo(() => defaultTheme(), [])
  
  return (
    <ChakraProvider theme={theme}>
      <Center>
        <Box w={"90vw"} h={"90vh"}>
          <GraphGrid />
        </Box>
      </Center>
    </ChakraProvider>
  )
}
