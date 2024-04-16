import { Box, Center, ChakraProvider } from '@chakra-ui/react'
import './App.css'
import GraphGrid from './components/GraphGrid'
import defaultTheme from './assets/theme'
import { useMemo, useState } from 'react'
import Toolbar from './components/Toolbar'
import "./GlobalStyle.scss"
import { subDays } from 'date-fns'

export default function App() {

  const theme = useMemo(() => defaultTheme(), [])

  const [selectedStation, setSelectedStation] = useState(null)
  const [dateRange, setDateRange] = useState([subDays(new Date(), 1), new Date()]);

  return (
    <ChakraProvider theme={theme}>
      <Center>
        <Box w={"95%"} h={"95%"}>
          <Toolbar selectedStation={selectedStation} setSelectedStation={setSelectedStation} dateRange={dateRange} setDateRange={setDateRange}/>
          <GraphGrid selectedStation={selectedStation} dateRange={dateRange}/>
        </Box>
      </Center>
    </ChakraProvider>
  )
}
