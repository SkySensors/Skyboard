import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { useGetWeatherStationsQuery } from '../redux/services/apiSlice';

export default function DeviceMap() {
    const { data: weatherStations } = useGetWeatherStationsQuery()

    return (
        <MapContainer center={[55.45116321550825, 11.79659457784343]} zoom={7} className='echartsGraph'>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {/* Add markers for weather stations */}
            {weatherStations && weatherStations.map(station => (
                <Marker key={station.macAddress} position={[station.gpsLocation.latitude, station.gpsLocation.longitude]}>
                    <Tooltip>{station.macAddress}</Tooltip>
                </Marker>
            ))}
        </MapContainer>
    )
}