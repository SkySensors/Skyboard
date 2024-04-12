import { Card, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import EchartsGraph from './EchartsGraph/EchartsGraph'

export default function GraphGrid() {

    const sensors = [1, 2, 3]

    return (
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
            {
                sensors.map((sensor, index) => {
                    // If the sensor is the last in the array, then span across the rest of the screen
                    const shouldSpan = sensors.length - 1 === index && index % 2 === 0
                    return (
                        <GridItem key={index} colSpan={shouldSpan ? 2 : 1} h='300'>
                            <Card>
                                <EchartsGraph />
                            </Card>
                        </GridItem>
                    )
                })
            }
        </Grid>
    )
}