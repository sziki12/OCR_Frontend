import {serverAddress} from "./BackendAccess";
import {hashPassword} from "../services/AuthService";

let AuthEndpoint = {
    async loginUser(user, isPasswordHashed) {
        const url = serverAddress + `salt`;
        let saltResponse = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                userName: user.userName,
                salt: ""
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!saltResponse.ok) {
            return {status: 404}
        }
        let saltResponseObject = await saltResponse.json()
        user.salt = saltResponseObject.salt
        let request = async () => {
            const url = serverAddress + 'login';
            return await fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        if (isPasswordHashed) {
            return await request()
        } else {
            return await hashPassword(user, request)
        }
    },
    async registerUser(user) {
        const bcrypt = require('bcryptjs');
        user.salt = bcrypt.genSaltSync()
        let request = async () => {
            const url = serverAddress + 'register';
            return await fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        return await hashPassword(user, request)
    },
}

module.exports = AuthEndpoint