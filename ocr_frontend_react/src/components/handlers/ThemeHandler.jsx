import {createContext, useContext, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {dark} from "@mui/material/styles/createPalette";

const ThemeContext = createContext({
    setTheme: (mode) => {
    },
    switchTheme: () => {
    },
    selectedTheme: {
        palette: {
            breakpoints: {
                values: []
            }
        }
    },
    mobile: null,
    desktop: null
});

export const ThemeData = () => {
    try {
        return useContext(ThemeContext)
    } catch (e) {
        return ({})
    }
}

export default function ThemeHandler({children}) {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                light: "#e0e1dd",
                main: "#778da9",
                dark: "#486484"
            },
            secondary: {
                light: "#ACB7C3",
                main: "#778DA9",
                dark: "#607997"
            },
            background: {
                paper: "#1b263b",
                default: "#0d1b2a"
            },
            text: {
                primary: "#fff",
                secondary: "#fff"
            },
            breakpoints: {
                values: {
                    mobile: 600,
                    desktop: 1200,
                },
            },
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                light: "#A7BFD8",
                main: "#8FA6D3",
                dark: "#5F75C9"
            },
            secondary: {
                light: "#DFEBEE",
                main: "#CFE1E5",
                dark: "#BED7DC"
            },
            background: {
                paper: "#CFE1E5",
                default: "#DFEBEE"
            },
            text: {
                primary: "#000000",
                secondary: "#000000"
            },
            breakpoints: {
                values: {
                    mobile: 600,
                    desktop: 1200,
                },
            },
        },
    });
    let [selectedTheme, setSelectedTheme] = useState(lightTheme)

    /**
     * @param mode light or dark, String
     */
    const setTheme = (mode) => {
        if (mode === "light") {
            setSelectedTheme(lightTheme)
        } else if (mode === "dark") {
            setSelectedTheme(darkTheme)
        }
    }
    const switchTheme = () => {
        if (selectedTheme.palette.mode === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    const mobile = useMediaQuery(`(max-width:${selectedTheme.palette.breakpoints.values["mobile"]}px)`)
    const desktop = useMediaQuery(`(min-width:${selectedTheme.palette.breakpoints.values["desktop"]}px)`)

    return (
        <ThemeContext.Provider value={{setTheme, switchTheme, selectedTheme, mobile, desktop}}>
            <ThemeProvider theme={selectedTheme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}