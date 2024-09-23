let AuthService = {
    saveAuthToken(token) {
        if (token)
            window.localStorage.setItem("auth_token", token)
        else
            window.localStorage.setItem("auth_token", "")
    },
    async saveUser(user) {
        if (user && user.userName) {
            window.localStorage.setItem("user_name", user.userName)
            window.localStorage.setItem("password_hash", user.password)
        } else {
            window.localStorage.setItem("user_name", "")
            window.localStorage.setItem("password_hash", "")
        }
    },

    getUser() {
        return {
            userName: this.getUserName(),
            isAuthenticated: Boolean(this.getUserName() && this.getPasswordHash())
        }
    },

    getAuthToken() {
        return window.localStorage.getItem("auth_token")
    },

    getUserName() {
        return window.localStorage.getItem("user_name")
    },

    getPasswordHash() {
        return window.localStorage.getItem("password_hash")
    },

    getAuth() {
        let token = this.getAuthToken()
        if (token === null || token === "") {
            return {}
        } else {
            return {
                'Authorization': `Bearer ${token}`
            }
        }
    },
    getHeaders(isJson) {
        if (isJson) {
            return {
                'Content-Type': 'application/json',
                'Authorization': this.getAuth().Authorization
            }
        } else {
            return this.getAuth()
        }
    },
    async callAndEnsureLogin(request) {
        try {
            return await request()
        } catch (e) {
            let user = {
                userName: this.getUserName(),
                password: this.getPasswordHash().toString()
            }
            let response = await this.loginUser(user, true)
            let json = await response.json()
            this.saveAuthToken(json.token)
            if (response.ok) {
                return await request()
            } else {
                console.log(response.status)
            }
        }
    },

    async hashPassword(user, request) {
        const bcrypt = require('bcryptjs');
        if (user && user.password && user.salt) {
            let hash = bcrypt.hashSync(user.password, user.salt)
            user.password = hash.toString()
            return await request(user);
        }
    },
}

module.exports = AuthService