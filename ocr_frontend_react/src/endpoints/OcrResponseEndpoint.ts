import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/ocr/response`
}
export async function getOcrResponse(householdId: string, receiptId: string) {
    let request = async () => {
        const url =`${getBaseAddress(householdId)}/${receiptId}`;
        return await fetch(url, {
            method: 'GET',
            headers: getHeaders(false)
        })
    }
    return await callAndEnsureLogin(request)
}