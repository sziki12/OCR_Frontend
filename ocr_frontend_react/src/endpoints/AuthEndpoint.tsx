// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {AuthServiceFunctions} from "../services/AuthService";
import {EmailSalt, LoginUser, User} from "../types/MainTypes";
import React, {createContext, useContext} from "react";
import bcrypt from "bcryptjs";

const AuthEndpointContext: React.Context<any> = createContext(
    {
        loginUser:async(loginUser: LoginUser, isPasswordHashed: boolean):Promise<any>=>{},
        registerUser:async(user: User):Promise<any>=>{},
        getSalt,
        tryRefreshToken,
    }
);
export const AuthEndpointFunctions = () => useContext(AuthEndpointContext)
export default function AuthEndpoint({children}) {
    const {hashPassword} = AuthServiceFunctions()
    const loginUser = async (loginUser: LoginUser, isPasswordHashed: boolean) => {
        let saltResponse = await getSalt({email: loginUser.email, salt: ""})

        if (!saltResponse.ok) {
            return {status: 404}
        }
        let saltResponseObject = await saltResponse.json()
        let user: LoginUser = {
            name: loginUser.name,
            email: loginUser.email,
            password: loginUser.password,
            salt: saltResponseObject.salt
        }
        let request = async (user: LoginUser) => {
            const url = serverAddress + '/login';
            return await fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        if (isPasswordHashed) {
            return await request(user)
        } else {
            return await hashPassword(user, request)
        }
    }

    const registerUser = async (user: User) => {
        const bcrypt = require('bcryptjs');
        user.salt = bcrypt.genSaltSync()
        let request = async () => {
            const url = serverAddress + '/register';
            return await fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        return await hashPassword(user, request)
    }

    return (
        <AuthEndpointContext.Provider value={{
            loginUser,
            registerUser,
            getSalt,
            tryRefreshToken,
        }}>
            {children}
        </AuthEndpointContext.Provider>
    )
}

export async function getSalt(emailSalt: EmailSalt) {
    const url = serverAddress + `/salt`;
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(emailSalt),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function tryRefreshToken(refreshToken: String) {
    let request = async () => {
        const url = serverAddress + '/refresh';
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({refreshToken: refreshToken}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return request()
}


