import {tryRefreshToken} from "../endpoints/AuthEndpoint"
import {createContext, useContext, useState} from "react";
import React from 'react'

export function getRefreshToken() {
    return window.localStorage.getItem("refresh_token")
}

export function getAuthToken() {
    return window.localStorage.getItem("auth_token")
}

export function getUserEmail() {
    return window.localStorage.getItem("user_email")
}

export function getUserName() {
    return window.localStorage.getItem("user_name")
}

export async function saveUser(user = null) {
    console.log("Save User")
    console.log(user)
    if (user && user.name && user.email && user.tokens) {
        window.localStorage.setItem("user_name", user.name)
        window.localStorage.setItem("user_email", user.email)
        window.localStorage.setItem("refresh_token", user.tokens.refreshToken)
        window.localStorage.setItem("auth_token", user.tokens.authToken)
    } else {
        window.localStorage.setItem("user_name", "")
        window.localStorage.setItem("user_email", "")
        window.localStorage.setItem("refresh_token", "")
        window.localStorage.setItem("auth_token", "")
    }
}

export async function saveTokens(tokens) {
    console.log("Tokens")
    console.log(tokens)
    if (tokens) {
        window.localStorage.setItem("refresh_token", tokens.refreshToken)
        window.localStorage.setItem("auth_token", tokens.authToken)
    } else {
        window.localStorage.setItem("refresh_token", "")
        window.localStorage.setItem("auth_token", "")
    }
}

export function getUser() {
    return {
        name: getUserName(),
        email: getUserEmail(),
        isAuthenticated: Boolean(getUserName() && getRefreshToken())
    }
}

export function getAuth() {
    let token = getAuthToken()
    if (token === null || token === "") {
        return {
            'Authorization': ``
        }
    } else {
        return {
            'Authorization': `Bearer ${token}`
        }
    }
}

export function getHeaders(isJson) {
    if (isJson) {
        return {
            'Content-Type': 'application/json',
            'Authorization': getAuth().Authorization
        }
    } else {
        return getAuth()
    }
}

async function hashPassword(user, request) {
    const bcrypt = require('bcryptjs');
    if (user && user.password && user.salt) {
        let hash = bcrypt.hashSync(user.password, user.salt)
        user.password = hash.toString()
        return await request(user)
    }
}

const AuthServiceContext = createContext(
    {
        callAndEnsureLogin: async (request, isContentJson) => {
        },
        hashPassword: async (user, request) => {
        },
        setLoggedOut: (isLoggedOut)=>{
        },
    }
);
export const AuthServiceFunctions = () => useContext(AuthServiceContext)

export function AuthService({children}) {
    let [loggedOut,setLoggedOut] = useState(false)

    const callAndEnsureLogin = async (request, isContentJson) => {
        let headers = getHeaders(isContentJson)
        try {
            return await request(headers)
        } catch (e) {
            try {
                if (window.localStorage.getItem("refresh_in_progress") === "true") {
                    while (window.localStorage.getItem("refresh_in_progress") === "true") {
                        await new Promise(r => setTimeout(r, 1000));
                    }
                    headers = getHeaders(isContentJson);
                    return await request(headers)
                }

                window.localStorage.setItem("refresh_in_progress", "true");

                let response = await tryRefreshToken(getRefreshToken().toString())
                let tokenResponse = await response.json()

                await saveTokens(tokenResponse)
                window.localStorage.setItem("refresh_in_progress", "false");

                if (response.ok) {
                    headers = getHeaders(isContentJson)
                    return await request(headers)
                } else {
                    console.log(response.status)
                    console.log("LOGOUT SET")
                    return setLoggedOut(true)
                }
            } catch (e) {
                console.log("LOGOUT SET")
                return setLoggedOut(true)
            }
        }
    }

    return (
        <AuthServiceContext.Provider value={{
            saveUser,
            saveTokens,
            getUser,
            getAuth,
            getHeaders,
            callAndEnsureLogin,
            hashPassword,
            loggedOut,
            setLoggedOut,
        }}>
            {children}
        </AuthServiceContext.Provider>
    )
}