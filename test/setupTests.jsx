import '@testing-library/jest-dom/vitest'
import 'vitest-canvas-mock'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { store } from '../src/redux/store'
import { apiSlice } from '../src/redux/services/apiSlice'

afterEach(() => {
  cleanup();
  store.dispatch(apiSlice.util.resetApiState());
})