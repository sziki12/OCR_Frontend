import {loginUser} from "../endpoints/AuthEndpoint"

function getAuthToken() {
    return window.localStorage.getItem("auth_token")
}

function getUserEmail() {
    return window.localStorage.getItem("user_email")
}

function getUserName() {
    return window.localStorage.getItem("user_name")
}

function getPasswordHash() {
    return window.localStorage.getItem("password_hash")
}

export async function saveUser(user) {
    console.log("Save User")
    console.log(user)
    if (user && user.name && user.email && user.token) {
        window.localStorage.setItem("user_name", user.name)
        window.localStorage.setItem("user_email", user.email)
        //window.localStorage.setItem("password_hash", user.password)//TODO Replace to Refresh token
        window.localStorage.setItem("auth_token", user.token)
    } else {
        window.localStorage.setItem("user_name", "")
        window.localStorage.setItem("user_email", "")
        //window.localStorage.setItem("password_hash", "")
        window.localStorage.setItem("auth_token", "")
    }
}

export function getUser() {
    return {
        name: getUserName(),
        email: getUserEmail(),
        isAuthenticated: Boolean(getUserName() && getPasswordHash())
    }
}

export function getAuth() {
    let token = getAuthToken()
    if (token === null || token === "") {
        return {}
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

export async function callAndEnsureLogin(request) {
    try {
        return await request()
    } catch (e) {
        let user = {
            name: getUserName(),
            email: getUserEmail(),
            password: getPasswordHash().toString()//TODO Password is not present
        }
        let response = await loginUser(user, true)
        let userResponse = await response.json()
        await saveUser(userResponse)
        if (response.ok) {
            return await request()
        } else {
            console.log(response.status)
        }
    }
}

export async function hashPassword(user, request) {
    const bcrypt = require('bcryptjs');
    if (user && user.password && user.salt) {
        let hash = bcrypt.hashSync(user.password, user.salt)
        user.password = hash.toString()
        return await request(user)
    }
}