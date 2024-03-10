import {useState} from "react";
import Root from "../pages/Root"

export default function LoginHandler({children})
{
    const [loggedIn, setLoggedIn] = useState(false)

    return((loggedIn)?children:<div><p>Not Logged In</p>{children}</div>)
}