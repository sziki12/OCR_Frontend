import ThemeHandler from "./ThemeHandler";
import LoginHandler from "./LoginHandler";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


export default function MainHandler({children}) {


    return (
        <>
            <ThemeHandler>
                <LoginHandler>
                    {children}
                </LoginHandler>
            </ThemeHandler>
        </>
    )
}