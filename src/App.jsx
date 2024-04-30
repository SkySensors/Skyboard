import { Box, Center, ChakraProvider, Flex } from '@chakra-ui/react'
import './App.css'
import GraphGrid from './components/GraphGrid'
import defaultTheme from './assets/theme'
import { useMemo, useState } from 'react'
import Toolbar from './components/Toolbar'
import "./GlobalStyle.scss"
import { isAfter, subDays } from 'date-fns'
import DeviceMap from './components/DeviceMap'

export default function App() {

  const theme = useMemo(() => defaultTheme(), [])

  const [selectedStation, setSelectedStation] = useState(null)
  const [dateRange, setDateRange] = useState([subDays(new Date(), 1), new Date()]);
  const [calibratedValues, setCalibratedValues] = useState(true)

  const setDateRangee = (range) => {
    // Dont change if start date is bigger than end date
    if ((range && range[0] && range[1]) && isAfter(range[0], range[1])) {
      return;
    }
    
    setDateRange(range)
  }

  return (
    <ChakraProvider theme={theme}>
      <Center>
        <Box w={"95%"} h={"95%"}>
          <Toolbar selectedStation={selectedStation} setSelectedStation={setSelectedStation}
            dateRange={dateRange} setDateRange={setDateRangee}
            calibratedValues={calibratedValues} setCalibratedValues={setCalibratedValues} />
          <Flex direction={"column"} gap={6}>
            <Box h={"20vh"}>
              <DeviceMap selectedStation={selectedStation}/>
            </Box>
            <GraphGrid selectedStation={selectedStation} dateRange={dateRange} calibratedValues={calibratedValues}/>
          </Flex>
        </Box>
      </Center>
    </ChakraProvider>
  )
}
