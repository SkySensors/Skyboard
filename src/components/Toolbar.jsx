import { Box, Center, Flex } from '@chakra-ui/react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import React, { useMemo } from 'react';
import Select from 'react-select';
import { selectStyle } from '../assets/reactSelectStyle';
import { useGetWeatherStationsQuery } from '../redux/services/apiSlice';

export default function Toolbar({selectedStation, setSelectedStation, dateRange, setDateRange}) {

    const { data: weatherStations, isLoading } = useGetWeatherStationsQuery()

    const selectStyles = useMemo(() => selectStyle(), [])

    const weatherStationsOption = useMemo(() => {
        if (weatherStations) {
            return weatherStations.map(station => ({
                value: station.macAddress, label: station.macAddress
            }))
        }

        return []
    },[weatherStations])


    return (
        <Flex bg={"bgColor"} gap={3} margin={"10px 5%"} padding={3} borderRadius={"var(--chakra-radii-md)"}>
            <Box >
                <Select
                    styles={selectStyles}
                    options={weatherStationsOption}
                    onChange={setSelectedStation}
                    value={selectedStation}
                    isClearable={true}
                    isLoading={isLoading}
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
