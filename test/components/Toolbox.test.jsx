import React from "react";
import { render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import Toolbar from "../../src/components/Toolbar";
import { Provider } from "react-redux";
import { store } from "../../src/redux/store";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { setupServer } from 'msw/node'
import config from "../../src/config";

// We use msw to intercept the network request during the test,
// when receiving a get request to the `WeatherStation/list` endpoint
export const handlers = [
    http.get(config.API + 'WeatherStation/list', async () => {
        return HttpResponse.json([
            {
                "macAddress": "08-3A-F2-AA-0B-8C",
                "gpsLocation": {
                    "longitude": 11.7823,
                    "latitude": 55.4269
                }
            },
            {
                "macAddress": "A8-42-E3-57-90-54",
                "gpsLocation": {
                    "longitude": 11.7853,
                    "latitude": 55.4269
                }
            },
            {
                "macAddress": "30-C6-F7-05-74-B4",
                "gpsLocation": {
                    "longitude": 11.7753,
                    "latitude": 55.4269
                }
            }
        ])
    })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("Toolbox", () => {
    it("Button should show default value and be visible", () => {
        // Arrange
        render(<Provider store={store}><Toolbar /></Provider>)

        // Act
        const button = screen.getByRole("button", { name: /Live/ })

        // Assert
        expect(button).toBeVisible()
        expect(button).toHaveTextContent(/Start/)
    })

    it("Button should say Stop and be visible", async () => {
        // Arrange
        render(<Provider store={store}><Toolbar /></Provider>)

        // Act
        const button = screen.getByRole("button", { name: /Live/ })
        const user = userEvent.setup()
        await user.click(button)
        // Assert
        expect(button).toBeVisible()
        expect(button).toHaveTextContent(/Stop/)
    })

    it("Select weather station input should show values received from api", async () => {
        // Arrange
        render(<Provider store={store}><Toolbar /></Provider>)

        // Act
        const select = screen.getByText("Filtrer Vejrstation")
        const user = userEvent.setup()
        await user.type(select, "{arrowdown}")
        const selectText = await screen.findByText(/08-3A-F2-AA-0B-8C/)

        // Assert
        expect(selectText).toHaveTextContent("08-3A-F2-AA-0B-8C")
    })
})