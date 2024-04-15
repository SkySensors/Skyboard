
export const groupSensors = (weatherStations) => {
    if (!weatherStations) {
        return null
    }

    const sensorTypes = {};

    weatherStations.forEach(station => {
        station.sensors.forEach(sensor => {
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