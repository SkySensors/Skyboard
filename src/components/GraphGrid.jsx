import { Card, CardBody, CardHeader, Center, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import EchartsGraph from './EchartsGraph/EchartsGraph'
import { groupSensors } from '../util/sensorGraphHelper'
import { useGetWeatherStationDataQuery } from '../redux/services/apiSlice'

export default function GraphGrid({ selectedStation, dateRange }) {

    const { data: weatherStationsData, error } = useGetWeatherStationDataQuery({
        macAddress: selectedStation?.value ?? "",
        startTime: dateRange[0].getTime(),
        endTime: dateRange[1].getTime()
    })

    const groupedSensors = useMemo(() => groupSensors(weatherStationsData), [weatherStationsData])

    return error ?
        <Center>
            <Heading>Error fetching data</Heading>
        </Center>
        :
        !weatherStationsData ?
            <Center>
                <Spinner size={"xl"} />
            </Center>
            :
            weatherStationsData.length < 2 ?
                // If only one weather station is received, then show just one graph with all values
                weatherStationsData.map(weatherStation => {
                    return (
                        <Card>
                            <EchartsGraph sensors={weatherStation.sensors} />
                        </Card>
                    )
                })
                :
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    {
                        Object.entries(groupedSensors).map(([key, value], index) => {
                            // key: "Temperature"
                            // value: [{type: "8e:16:08:38:43:c4", sensorValues: []}]

                            const arrayLength = Object.keys(groupedSensors).length

                            // If the graph is the last in the array and amount of graphs is unequal
                            // Span take up two grid cols
                            const shouldSpan = arrayLength - 1 === index && index % 2 === 0

                            return (
                                <GridItem key={index} colSpan={shouldSpan ? 2 : 1}>
                                    <Card h={'30vh'}>
                                        <CardHeader p={2}>
                                            <Center>
                                                <Heading size='md'>{key}</Heading>
                                            </Center>
                                        </CardHeader>
                                        <EchartsGraph sensors={value} type={key} />
                                    </Card>
                                </GridItem>
                            )
                        })
                    }
                </Grid>
}