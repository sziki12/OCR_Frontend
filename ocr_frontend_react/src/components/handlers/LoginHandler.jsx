import {createContext, useContext, useState} from "react";
import {loginUser} from "../utils/BackendAccess"
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

        return new Promise((reject,resolve) => {

            //TODO Call Backend Login
            // const response = await loginUser(user)

            if(user.password==="password")
            {
                setUser({userName: user.userName,isAuthenticated: true})
                resolve("Success")
                navigate("/")
                updateRouter(true)
            }
            else
            {
                reject("Wrong Username or Password")
            }
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