import {createContext, useContext, useState} from "react";
import {loginUser,setAuthToken} from "../utils/BackendAccess"
import {useNavigate} from "react-router-dom";
import {updateRouter} from "../../index"



const AuthContext = createContext(
    {
        user:{
            userName:"",
            isAuthenticated:false
        }
    }
);
export const AuthData = ()=>
{
    try {
        return useContext(AuthContext)
    }
    catch (e)
    {
        return({})
    }

}

export default function LoginHandler({children})
{
    let navigate = useNavigate()

    const [user,setUser] = useState({
        userName:"",
        isAuthenticated:false
    })

    const login = async (user) => {

        return new Promise(async (reject, resolve) => {

            //TODO Call Backend Login
            const response = await loginUser(user)
            if(response.status===200)
            {
                let json = await response.json()
                setUser({userName: user.userName,isAuthenticated: true})
                setAuthToken(json.token)
                resolve("Success")
                navigate("/")
                updateRouter(true)
            }
            else
            {
                reject("Wrong Username or Password")
                console.log("Login Status: "+response.status)
            }

            /*if(user.password==="password")
            {
                setUser({userName: user.userName,isAuthenticated: true})
                resolve("Success")
                navigate("/")
                updateRouter(true)
            }
            else
            {
                reject("Wrong Username or Password")
            }*/
        })
    }

    const logout = () => {
        setUser({userName: "",isAuthenticated: false})
        //TODO Call Backend Logout
        navigate("/login")
        updateRouter(false)
    }


    return(
        <AuthContext.Provider value = {{
            user,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}