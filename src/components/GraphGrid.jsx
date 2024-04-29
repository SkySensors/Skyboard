import { Card, CardBody, CardHeader, Center, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import EchartsGraph from './EchartsGraph/EchartsGraph'
import { groupSensors } from '../util/sensorGraphHelper'
import { useGetWeatherStationDataQuery } from '../redux/services/apiSlice'

export default function GraphGrid({ selectedStation, dateRange, calibratedValues }) {

    const { data: weatherStationsData, error, isFetching: weatherStationFetching } = useGetWeatherStationDataQuery({
        macAddress: selectedStation?.value ?? null,
        startTime: dateRange[0].getTime(),
        endTime: dateRange[1].getTime(),
        isCalibrated: calibratedValues
    })

    const groupedSensors = useMemo(() => groupSensors(weatherStationsData), [weatherStationsData])

    const translateTypeToDanish = (type) => {
        // SINCE THIS IS THE ONLY THING NEEDED TO BE TRANSLATED, DO IT SIMPLE
        // USUALLY A TRANSLATION LAYER WOULD BE ADDED
        switch (type) {
            case "Temperature":
                return "Temperatur"
            case "Humidity":
                return "Fugtighed"
            case "Light":
                return "Lys"
            default:
                return type
        }
    }

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
                            <GridItem key={key} colSpan={shouldSpan ? 2 : 1}>
                                <Card h={'30vh'}>
                                    <CardHeader p={2}>
                                        <Center>
                                            <Heading size='md'>{translateTypeToDanish(key)}</Heading>
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