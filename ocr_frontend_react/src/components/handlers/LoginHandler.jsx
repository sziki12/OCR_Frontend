import {createContext, useContext, useState} from "react";
import {loginUser,setAuthToken,registerUser} from "../utils/BackendAccess"
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

            const response = await loginUser(user)
            if(response.status===200)
            {
                let json = await response.json()
                setUser({userName: user.userName,isAuthenticated: true})
                setAuthToken(json.token)
                resolve("Logged In")
                updateRouter(true)
                navigate("/")
            }
            else
            {
                reject("Wrong Username or Password")
                console.log("Login Status: "+response.status)
            }
        })
    }

    const register = async (user)=>{
        return new Promise(async (reject, resolve) => {
            const response = await registerUser(user)
            if(response.status===200)
            {
                let json = await response.json()
                setUser({userName: user.userName,isAuthenticated: true})
                setAuthToken(json.token)
                resolve("Registered")
                navigate("/")
                updateRouter(true)
            }
            else
            {
                reject("User with Username already Exists!")
                console.log("Login Status: "+response.status)
            }
        })
    }

    const logout = () => {
        setUser({userName: "",isAuthenticated: false})
        navigate("/login")
        setAuthToken("")
        updateRouter(false)
    }


    return(
        <AuthContext.Provider value = {{
            user,
            login,
            logout,
            register,
        }}>
            {children}
        </AuthContext.Provider>
    )
}