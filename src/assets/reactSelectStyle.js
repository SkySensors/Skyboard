export const selectStyle = () => {
    {
        const bgColor = "var(--chakra-colors-bgColor)"
        const textColor = "var(--chakra-colors-textColor)"
        const primaryTextColor = "var(--chakra-colors-primaryTextColor) !important"
        const primaryBgColor = "var(--chakra-colors-primaryColor) !important"
        const primaryBgHoverColor = "var(--chakra-colors-primaryHoverColor) !important"
        return {
            menuPortal: (base) => ({ 
                ...base, 
                zIndex: 9999,
            }),
            menu: (styles) => ({ 
                ...styles, 
                backgroundColor: bgColor,
                color: textColor,
            }),
            control: (styles) => ({ 
                ...styles, 
                backgroundColor: bgColor,
                color: textColor,
                minWidth: "180px",
                cursor: "pointer",
                borderColor: "var(--chakra-colors-borderColor)",
            }),
            input: (styles) => ({ 
                ...styles,
                color: textColor
            }),
            placeholder: (styles) => ({ 
                ...styles,
                backgroundColor: bgColor,
                color: textColor
            }),
            singleValue: (styles) => ({ 
                ...styles,
                backgroundColor: bgColor,
                color: textColor
            }),
            option: (styles, {isSelected, isFocused}) => ({ 
                ...styles,
                backgroundColor: isSelected? primaryBgColor : isFocused? primaryBgHoverColor : bgColor,
                color: isSelected || isFocused? primaryTextColor : textColor,
                cursor: "pointer",
                borderColor: "var(--chakra-colors-borderColor)",
            }),
        }
    }
}