import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/filter`
}

export async function getFilterOptions(householdId: string) {
    let request = async () => {
        const url = getBaseAddress(householdId);
        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(false)
        })
        return await response.json();
    }
    return await callAndEnsureLogin(request)
}