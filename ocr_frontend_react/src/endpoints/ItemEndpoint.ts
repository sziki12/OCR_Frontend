import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

function getBaseAddress(householdId: string, receiptId: string | null) {
    if (typeof receiptId === "string")
        return `${serverAddress}/api/household/${householdId}/receipt/${receiptId}/item`
    else
        return `${serverAddress}/api/household/${householdId}/receipt/item`
}

export async function deleteItem(householdId: string, receiptId: string, itemId: string) {
    let request = async () => {
        await fetch(serverAddress + `${getBaseAddress(householdId, receiptId)}/${itemId}`,
            {
                method: 'DELETE',
                cache: "no-store",
                headers: getHeaders(false)
            });
    }
    return await callAndEnsureLogin(request)
}

export async function getItemCategories(householdId: string,) {
    let request = async () => {
        const url = `${getBaseAddress(householdId, null)}/categories`;

        console.log("getItemCategories")
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(false)
        })
        return await response.json();
    }
    return await callAndEnsureLogin(request)
}

export async function categoriseItems(householdId: string, receiptId: string) {
    let request = async () => {
        const url = serverAddress + `${getBaseAddress(householdId, receiptId)}/categorise`;
        return await fetch(url, {
            method: 'PUT',
            headers: getHeaders(false)
        });
    }
    return await callAndEnsureLogin(request)
}