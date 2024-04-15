import { Card, CardBody, CardHeader, Center, Grid, GridItem, Heading } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import EchartsGraph from './EchartsGraph/EchartsGraph'
import { groupSensors } from '../util/sensorGraphHelper'

export default function GraphGrid() {

    const weatherStations = [
        {
            macAddress: "8e:16:08:38:43:c4",
            gpsLocation: {
                latitude: 55.42823781723924,
                longtitude: 11.784295993117867
            },
            sensors: [{
                type: "Temperature",
                sensorValues: [{ unixTime: 1713176882000, value: 22 }, { unixTime: 1713176888000, value: 21 }]
            },
            {
                type: "Humidity",
                sensorValues: [{ unixTime: 1713176882000, value: 40 }, { unixTime: 1713176888000, value: 50 }]
            },
            {
                type: "Light",
                sensorValues: [{ unixTime: 1713176882000, value: 163 }, { unixTime: 1713176888000, value: 140 }]
            },]
        },
        {
            macAddress: "2f:16:08:38:43:g2",
            gpsLocation: {
                latitude: 55.42823781723924,
                longtitude: 11.784295993117867
            },
            sensors: [{
                type: "Temperature",
                sensorValues: [{ unixTime: 1713176882000, value: 15 }, { unixTime: 1713176888000, value: 19 }]
            },
            {
                type: "Humidity",
                sensorValues: [{ unixTime: 1713176882000, value: 29 }, { unixTime: 1713176888000, value: 44 }]
            },]
        },
    ]

    const groupedSensors = useMemo(() => groupSensors(weatherStations), [weatherStations])

    return weatherStations.length < 2 ?
        // If only one weather station is received, then show just one graph with all values
        weatherStations.map(weatherStation => {
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
                            <Card h={'40vh'}>
                                <CardHeader p={2}>
                                    <Center>
                                        <Heading size='md'>{key}</Heading>
                                    </Center>
                                </CardHeader>
                                <EchartsGraph sensors={value} />
                            </Card>
                        </GridItem>
                    )
                })
            }
        </Grid>
}