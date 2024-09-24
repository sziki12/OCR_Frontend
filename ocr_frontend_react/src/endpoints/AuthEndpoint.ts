// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {hashPassword} from "../services/AuthService";
import {EmailSalt, LoginUser, User} from "../types/MainTypes";
import {getSalt} from "bcryptjs-react";

let AuthEndpoint = {
    //TODO Refactor login
    async getSalt(emailSalt: EmailSalt) {
        const url = serverAddress + `/salt`;
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(emailSalt),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    async loginUser(loginUser: LoginUser, isPasswordHashed: boolean) {
        let saltResponse = await this.getSalt({email: loginUser.email, salt: ""})

        if (!saltResponse.ok) {
            return {status: 404}
        }
        let saltResponseObject = await saltResponse.json()
        let user: User = {
            name: loginUser.name,
            email: loginUser.email,
            password: loginUser.password,
            salt: saltResponseObject.salt
        }
        let request = async (user: User) => {
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
    },
    async registerUser(user: User) {
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
    },
}

module.exports = AuthEndpoint