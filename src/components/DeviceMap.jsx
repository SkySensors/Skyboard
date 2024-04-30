import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvent } from 'react-leaflet';
import { useGetWeatherStationsQuery } from '../redux/services/apiSlice';
import { icon } from 'leaflet';
import weatherStationIcon from "/src/assets/icons/weatherStationIcon.png"

export default function DeviceMap({ selectedStation }) {
    const { data: weatherStations } = useGetWeatherStationsQuery()

    return (
        <MapContainer center={[55.45116321550825, 11.79659457784343]} zoom={7} className='echartsGraph leafletStyle'>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {/* Add markers for weather stations */}
            {weatherStations && weatherStations.map(station => (
                <Marker
                    key={station.macAddress}
                    position={[station.gpsLocation.latitude, station.gpsLocation.longitude]}
                    icon={icon({
                        iconUrl: weatherStationIcon,
                        iconSize: [42, 42]
                    })}
                >
                    <Tooltip>{station.macAddress}</Tooltip>
                </Marker>
            ))}
            <CenterOnStation selectedStation={selectedStation} weatherStations={weatherStations}/>
        </MapContainer>
    )
}

const CenterOnStation = ({ selectedStation, weatherStations }) => {
    const map = useMap();
    useEffect(() => {
        // If a station is selected, then center map to weather station
        if (selectedStation && weatherStations) {
            // Find the weather station coords
            const foundStation = weatherStations.find(station => station.macAddress === selectedStation.value)
            if (foundStation) {
                map.setZoom(13);
                map.setView([foundStation.gpsLocation.latitude, foundStation.gpsLocation.longitude]);
            }
        }
    }, [selectedStation]);
    return null;
}