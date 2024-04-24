import { Box, Center, ChakraProvider, Flex } from '@chakra-ui/react'
import './App.css'
import GraphGrid from './components/GraphGrid'
import defaultTheme from './assets/theme'
import { useMemo, useState } from 'react'
import Toolbar from './components/Toolbar'
import "./GlobalStyle.scss"
import { subDays } from 'date-fns'
import DeviceMap from './components/DeviceMap'

export default function App() {

  const theme = useMemo(() => defaultTheme(), [])

  const [selectedStation, setSelectedStation] = useState(null)
  const [dateRange, setDateRange] = useState([subDays(new Date(), 1), new Date()]);
  const [calibratedValues, setCalibratedValues] = useState(true)

  return (
    <ChakraProvider theme={theme}>
      <Center>
        <Box w={"95%"} h={"95%"}>
          <Toolbar selectedStation={selectedStation} setSelectedStation={setSelectedStation}
            dateRange={dateRange} setDateRange={setDateRange}
            calibratedValues={calibratedValues} setCalibratedValues={setCalibratedValues} />
          <Flex direction={"column"} gap={6}>
            <Box h={"20vh"}>
              <DeviceMap />
            </Box>
            <GraphGrid selectedStation={selectedStation} dateRange={dateRange} calibratedValues={calibratedValues}/>
          </Flex>
        </Box>
      </Center>
    </ChakraProvider>
  )
}
