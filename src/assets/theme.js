import { extendTheme } from "@chakra-ui/react";

export default function defaultTheme() {
    const dashboardBgColor = "#f6f7ff"
    const bgColor = "#edeef7"
    const textColor = "#000000"
    const primaryColor = "#4855cb"
    const primaryTextColor = "#FFFFFF"
    const primaryHoverColor = "#7b85da"
    const disabledTextColor = "#000000"

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
            bgColor: bgColor,
            textColor: textColor,
            primaryColor: primaryColor,
            primaryTextColor: primaryTextColor,
            primaryHoverColor: primaryHoverColor,
            disabledTextColor: disabledTextColor,
        },
        components: {
            Card: {
                variants: {
                    'Primary': {
                        container: {
                            bg: "bgColor"
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