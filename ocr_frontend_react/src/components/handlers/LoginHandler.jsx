import {createContext, useContext, useEffect, useState} from "react";
import {saveAuthToken, saveUser, getUser, hashPassword} from "../../services/AuthService"
import {loginUser, registerUser} from "../../dist/endpoints/AuthEndpoint"
import {useNavigate} from "react-router-dom";
import {updateRouter} from "../../index"

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

    const [user, setUser] = useState({name: "", email: "", salt: "", token: "", isAuthenticated: false})

    const login = async (user) => {

        return new Promise(async (reject, resolve) => {
            const response = await loginUser(user, false)
            if (response.status === 200) {
                let responseUser = await response.json()

                let newUser = {...responseUser, isAuthenticated: true}

                setUser(newUser)

                await saveUser(newUser)

                resolve("Logged In")
                updateRouter(true)
                navigate("/")
            } else {
                reject("Wrong Username or Password")
                console.log("Login Status: " + response.status)
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

    const logout = () => {
        saveUser().then(() => {
            setUser({name: "", email: "", salt: "", token: "", password: "", isAuthenticated: false})
            navigate("/login")
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