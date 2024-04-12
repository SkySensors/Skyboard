// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://route/api/' }),
  endpoints: (builder) => ({

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  } = apiSlice