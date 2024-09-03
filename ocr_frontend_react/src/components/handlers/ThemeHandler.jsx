import {createContext, useContext, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const ThemeContext = createContext({
    setTheme: (mode) => {
    },
    switchTheme: () => {
    },
    selectedTheme: {}
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
        },
    });
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });
    //lightTheme.palette.
    let [selectedTheme, setSelectedTheme] = useState(lightTheme)

    const setTheme = (mode) => {
        if (mode === "light") {
            setSelectedTheme(lightTheme)
        } else if (mode === "dark") {
            setSelectedTheme(darkTheme)
        }
    }
    const switchTheme = () => {
        if (selectedTheme.palette.mode === lightTheme.palette.mode) {
            setSelectedTheme(darkTheme)
        } else {
            setSelectedTheme(lightTheme)
        }
    }

    return (
        <ThemeContext.Provider value={{setTheme, switchTheme, selectedTheme}}>
            <ThemeProvider theme={selectedTheme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}