import { extendTheme } from "@chakra-ui/react";

export default function defaultTheme() {
    const dashboardBgColor = "#f6f7ff"
    const cardBgColor = "#FFFFFF"

    const overrides = extendTheme({
        styles: {
            global: () => ({
                body: {
                    bg: "dashboardBgColor"
                }
            })
        },
        colors: {
            dashboardBgColor: dashboardBgColor,
            cardBgColor: cardBgColor,
        },
        components: {
            Card: {
                variants: {
                    'Primary': {
                        container: {
                            bg: "cardBgColor"
                        }
                    }
                },
                defaultProps: {
                    variant: 'Primary'
                }
            }
        }
    })

    return overrides
}