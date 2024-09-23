import {createContext, useContext, useEffect, useState} from "react";
import {saveAuthToken, saveUser, getUser} from "../../services/AuthService"
import {loginUser, registerUser} from "../../endpoints/AuthEndpoint"
import {useNavigate} from "react-router-dom";
import {updateRouter} from "../../index"

const AuthContext = createContext(
    {
        user: {
            userName: "",
            isAuthenticated: false
        }
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

    const [user, setUser] = useState({
        userName: "",
        isAuthenticated: false
    })

    const login = async (user) => {

        return new Promise(async (reject, resolve) => {
            const response = await loginUser(user)
            if (response.status === 200) {
                let json = await response.json()

                saveAuthToken(json.token)
                await saveUser(user)

                console.log(getUser())

                let newUser = {userName: user.userName, isAuthenticated: true, salt: json.salt}
                setUser(newUser)
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
            const response = await registerUser(user)
            if (response.status === 200) {
                let json = await response.json()
                saveAuthToken(json.token)
                await saveUser(user)

                setUser({userName: user.userName, isAuthenticated: true})
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
            saveAuthToken()
            setUser({userName: "", isAuthenticated: false})
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