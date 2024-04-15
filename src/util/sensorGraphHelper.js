
// Groups all the same sensors from different weather stations
export const groupSensors = (weatherStations) => {
    if (!weatherStations) {
        return null
    }

    const sensorTypes = {};

    weatherStations.forEach(station => {
        station.sensors.forEach(sensor => {
            // If sensor type does not exists, then add an array for it
            if (!sensorTypes[sensor.type]) {
                sensorTypes[sensor.type] = [];
            }
            
            sensorTypes[sensor.type].push({
                macAddress: station.macAddress,
                gpsLocation: station.gpsLocation,
                type: station.macAddress, // For compatability with EchartsGraph add type
                sensorValues: sensor.sensorValues
            });
        });
    });

    return sensorTypes
}