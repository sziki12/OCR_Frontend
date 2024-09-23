import {serverAddress} from "./BackendAccess";
import {callAndEnsureLogin, getHeaders} from "../services/AuthService";


let HouseholdEndpoint = {
    async getHouseholds() {
        let request = async () => {
            const url = serverAddress + `api/household`;
            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders(false)
            })
            return await response.json();
        }
        return await callAndEnsureLogin(request)
    },
}

module.exports = HouseholdEndpoint