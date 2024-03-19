import {createContext, useContext, useState} from "react";
import {loginUser} from "../utils/BackendAccess"



const AuthContext = createContext(
    {
        userName:"Failed",
        isAuthenticated:true
    }
);
export const AuthData = ()=> useContext(AuthContext)

export default function LoginHandler({children})
{

    const [user,setUser] = useState({
        userName:"Alma",
        isAuthenticated:true
    })


    const login = async (userName, password) => {
        const user = {
            userName: userName,
            password: password
        }

        return new Promise((reject,resolve) => {

            //TODO Call Backend Login
            // const response = await loginUser(user)

            if(password==="password")
            {
                setUser({userName: userName,isAuthenticated: true})
                resolve("Success")
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