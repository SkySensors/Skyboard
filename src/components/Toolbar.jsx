import { Box, Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react'
import Select from 'react-select';
import { selectStyle } from '../assets/reactSelectStyle';

export default function Toolbar() {

    const selectStyles = useMemo(() => selectStyle(), [])
    const weatherStations = [
        { value: "jens", label: "nice" },
        { value: "jens2", label: "nice2" },
        { value: "jens3", label: "nice3" },
    ]

    return (
        <Flex bg={"bgColor"} margin={"10px"} padding={"10px"} borderRadius={"var(--chakra-radii-md)"}>
            <Box marginLeft={"5px"}>
                <Select
                    styles={selectStyles}
                    options={weatherStations}
                />
            </Box>
        </Flex>
    )
}
