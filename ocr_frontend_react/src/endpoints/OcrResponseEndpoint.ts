import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/ocr/response`
}
export async function getOcrResponse(householdId: string, receiptId: string) {
    let request = async (headers) => {
        const url =`${getBaseAddress(householdId)}/${receiptId}`;
        return await fetch(url, {
            method: 'GET',
            headers: headers
        })
    }
    return await callAndEnsureLogin(request,false)
}