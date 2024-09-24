import {loginUser} from "../dist/endpoints/AuthEndpoint"
export function getAuthToken() {
    return window.localStorage.getItem("auth_token")
}

export  function getUserEmail(){
    return window.localStorage.getItem("user_email")
}

export function getUserName() {
    return window.localStorage.getItem("user_name")
}

export function getPasswordHash() {
    return window.localStorage.getItem("password_hash")
}


export function saveAuthToken(token) {
    if (token)
        window.localStorage.setItem("auth_token", token)
    else
        window.localStorage.setItem("auth_token", "")
}

export async function saveUser(user) {
    if (user && user.userName) {
        window.localStorage.setItem("user_name", user.userName)
        window.localStorage.setItem("password_hash", user.password)
    } else {
        window.localStorage.setItem("user_name", "")
        window.localStorage.setItem("password_hash", "")
    }
}

export function getUser() {
    return {
        userName: getUserName(),
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
            password: getPasswordHash().toString()
        }
        let response = await loginUser(user, true)
        let json = await response.json()
        saveAuthToken(json.token)
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
        return await request(user);
    }
}