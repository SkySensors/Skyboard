import { Box, Center, Flex } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react'
import Select from 'react-select';
import { selectStyle } from '../assets/reactSelectStyle';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import { subDays } from 'date-fns';

export default function Toolbar() {

    const [dateRange, setDateRange] = useState([subDays(new Date(), 1), new Date()]);
    const [selectedStation, setSelectedStation] = useState(null)

    const selectStyles = useMemo(() => selectStyle(), [])
    const weatherStations = [
        { value: "jens", label: "nice" },
        { value: "jens2", label: "nice2" },
        { value: "jens3", label: "nice3" },
    ]


    return (
        <Flex bg={"bgColor"} gap={3} margin={"10px"} padding={3} borderRadius={"var(--chakra-radii-md)"}>
            <Box >
                <Select
                    styles={selectStyles}
                    options={weatherStations}
                    onChange={setSelectedStation}
                    value={selectedStation}
                    isClearable={true}
                />
            </Box>
            <Center>
                <DateTimeRangePicker
                    className={"DashboardDateRangePicker"}
                    calendarClassName={"DashboardDateRangePickerCalendar"}
                    value={dateRange}
                    onChange={setDateRange}
                    disableClock={true}
                    maxDate={new Date()}
                    clearIcon={false}
                    format="d-MM-yyyy HH:mm"
                />
            </Center>
        </Flex>
    )
}
