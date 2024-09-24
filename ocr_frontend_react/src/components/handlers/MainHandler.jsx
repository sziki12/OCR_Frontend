import ThemeHandler from "./ThemeHandler";
import LoginHandler from "./LoginHandler";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import HouseholdState from "../states/HouseholdState";


export default function MainHandler({children}) {


    return (
        <>
            <ThemeHandler>
                <LoginHandler>
                    <HouseholdState>
                        {children}
                    </HouseholdState>
                </LoginHandler>
            </ThemeHandler>
        </>
    )
}