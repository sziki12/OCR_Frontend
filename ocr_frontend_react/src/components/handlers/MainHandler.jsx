import ThemeHandler from "./ThemeHandler";
import LoginHandler from "./LoginHandler";


export default function MainHandler({children})
{
    return(
        <>
            <ThemeHandler>
                <LoginHandler>
                    {children}
                </LoginHandler>
            </ThemeHandler>
        </>
    )
}