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
      query: (params) => `WheatherStation?macAddress=${params.macAddress}&startTime=${params.startTime}&endTime=${params.endTime}`,
    }),
    getWeatherStations: builder.query({
      query: (params) => `WheatherStation/list`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWeatherStationDataQuery, useGetWeatherStationsQuery } = apiSlice