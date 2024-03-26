import {createContext, useContext} from "react";


const ThemeContext = createContext({});
const AuthData = ()=> useContext(ThemeContext)

export default function ThemeHandler({children})
{

    return(
        <ThemeContext.Provider value={{
                theme:"light"   //light or dark
            }}>
            {children}
        </ThemeContext.Provider>)
}