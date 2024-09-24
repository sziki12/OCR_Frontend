// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
import {Household} from "../types/MainTypes";


let HouseholdEndpoint = {
    getBaseAddress(){
        return `${serverAddress}/api/household`
    },
    async getHouseholds():Promise<[Household]> {
        let request = async () => {
            const url = this.getBaseAddress();
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