import { Box, Button, Center, Flex, FormControl, FormLabel, Switch, Tooltip } from '@chakra-ui/react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import React, { useMemo } from 'react';
import Select from 'react-select';
import { selectStyle } from '../assets/reactSelectStyle';
import { useGetWeatherStationsQuery } from '../redux/services/apiSlice';

export default function Toolbar({ selectedStation, setSelectedStation, dateRange, setDateRange, calibratedValues, setCalibratedValues }) {

    const { data: weatherStations, isLoading } = useGetWeatherStationsQuery()

    const selectStyles = useMemo(() => selectStyle(), [])

    const weatherStationsOption = useMemo(() => {
        if (weatherStations) {
            return weatherStations.map(station => ({
                value: station.macAddress, label: station.macAddress
            }))
        }

        return []
    }, [weatherStations])

    const handleSetTimeToNow = () => {
        // Use previous start date, but change end date to current date
        setDateRange([dateRange[0], new Date()])
    }

    const handleSetCalibratedValues = (evt) => {
        setCalibratedValues(evt.target.checked)
    }


    return (
        <Flex bg={"bgColor"} gap={3} margin={"10px 0px"} padding={3} borderRadius={"var(--chakra-radii-md)"} justifyContent={"center"} flexFlow={"wrap"}>
            <Center>
                <FormControl display='flex' alignItems='center'>
                    <FormLabel marginBottom={0}>Calibrated Values</FormLabel>
                    <Switch id='calibratedValues' isChecked={calibratedValues} onChange={handleSetCalibratedValues}/>
                </FormControl>
            </Center>
            <Box>
                <Select
                    styles={selectStyles}
                    options={weatherStationsOption}
                    onChange={setSelectedStation}
                    value={selectedStation}
                    isClearable={true}
                    isLoading={isLoading}
                    placeholder="Filter Weather Station"
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
            <Center>
                <Tooltip label="Set end date to now">
                    <Button size={"sm"}
                        onClick={handleSetTimeToNow}>
                        Refresh
                    </Button>
                </Tooltip>
            </Center>
        </Flex>
    )
}
