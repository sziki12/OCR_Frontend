// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
import {Household} from "../types/MainTypes";


    function getBaseAddress(){
        return `${serverAddress}/api/household`
    }
    export async function getHouseholds():Promise<[Household]> {
        let request = async () => {
            const url = getBaseAddress();
            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders(false)
            })
            return await response.json();
        }
        return await callAndEnsureLogin(request)
    }
