// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://skyapi.viften.elkok.dk/api/',

  }),
  endpoints: (builder) => ({
    getWeatherStationData: builder.query({
      query: (params) => params.macAddress? 
      `WeatherStation?macAddress=${params.macAddress}&startTime=${params.startTime}&endTime=${params.endTime}` 
      : `WeatherStation/all?startTime=${params.startTime}&endTime=${params.endTime}`, // If no mac address, then use all endpoint
    }),
    getWeatherStations: builder.query({
      query: (params) => `WeatherStation/list`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWeatherStationDataQuery, useGetWeatherStationsQuery } = apiSlice