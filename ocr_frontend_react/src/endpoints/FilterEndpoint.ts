import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

let FilterEndpoint = {
    async getFilterOptions() {
        let request = async () => {
            const url = serverAddress + `api/filter`;
            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders(false)
            })
            return await response.json();
        }
        return await callAndEnsureLogin(request)
    },
}

module.exports = FilterEndpoint