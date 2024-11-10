import {createContext, useContext, useEffect, useState} from "react";
import {AuthServiceFunctions} from "../../dist/services/AuthService"
import {useNavigate} from "react-router-dom";
import {updateRouter} from "../../index"
import {AuthEndpointFunctions} from "../../dist/endpoints/AuthEndpoint";

const AuthContext = createContext(
    {
        user: {name: "", email: "", salt: "", token: "", isAuthenticated: false}
    }
)
export const AuthData = () => {
    try {
        return useContext(AuthContext)
    } catch (e) {
        return ({})
    }
}

export default function LoginHandler({children}) {
    let navigate = useNavigate()

    const {saveAuthToken, saveUser, getUser, hashPassword,loggedOut,setLoggedOut} = AuthServiceFunctions()
    const {loginUser, registerUser} = AuthEndpointFunctions()
    const [user, setUser] = useState({name: "", email: "", salt: "", isAuthenticated: false})

    useEffect(() => {
        if(loggedOut){
            console.log("LOGOUT TRUE")
            logout(true)
        }
    }, [loggedOut]);

    const login = async (user) => {

        return new Promise(async (reject, resolve) => {
            const response = await loginUser(user, false)
            if (response&&response.status === 200) {
                let responseUser = await response.json()

                let newUser = {...responseUser, isAuthenticated: true}

                setUser(newUser)
                console.log("loggedOut")
                console.log(loggedOut)
                setLoggedOut&&setLoggedOut(false)
                await saveUser(newUser)

                resolve("Logged In")
                updateRouter(true)
                navigate("/")
            } else {
                reject("Wrong Username or Password")
            }
        })
    }

    const register = async (user) => {
        return new Promise(async (reject, resolve) => {
            console.log(`User to Register:`)
            console.log(user)
            const response = await registerUser(user)
            if (response.status === 200) {
                let responseUser = await response.json()

                let newUser = {...responseUser, isAuthenticated: true}
                setUser(newUser)
                await saveUser(newUser)

                resolve("Registered")
                navigate("/")
                updateRouter(true)
            } else {
                reject("User with Username already Exists!")
                console.log("Login Status: " + response.status)
            }
        })
    }

    const logout = (isRedirect= false) => {
        saveUser().then(() => {
            setUser({name: "", email: "", salt: "", token: "", password: "", isAuthenticated: false})
            if(isRedirect)
                navigate("/login/redirect")
            else
                navigate("/login")
            window.localStorage.setItem("refresh_in_progress", "false");
            updateRouter(false)
        })
    }

    useEffect(() => {
        let savedUser = getUser();
        if (savedUser && savedUser.isAuthenticated) {
            console.log("Login")
            console.log(savedUser)
            setUser(savedUser)
        } else {
            console.log("No User")
            console.log(savedUser)
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            register,
        }}>
            {children}
        </AuthContext.Provider>
    )
}