import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

function getBaseAddress(householdId: string, receiptId: string | null) {
    if (typeof receiptId === "string" || typeof receiptId === "number")
        return `${serverAddress}/api/household/${householdId}/receipt/${receiptId}/item`
    else
        return `${serverAddress}/api/household/${householdId}/receipt/item`
}

export async function deleteItem(householdId: string, receiptId: string, itemId: string) {
    let request = async (headers) => {
        await fetch(`${getBaseAddress(householdId, receiptId)}/${itemId}`,
            {
                method: 'DELETE',
                cache: "no-store",
                headers: headers
            });
    }
    return await callAndEnsureLogin(request,false)
}

export async function getItemCategories(householdId: string) {
    let request = async (headers) => {
        const url = `${getBaseAddress(householdId, null)}/categories`;

        console.log("getItemCategories")
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        })
        return await response.json();
    }
    return await callAndEnsureLogin(request,false)
}

export async function categoriseItems(householdId: string, receiptId: string,categoriseModel: String) {
    let request = async (headers) => {
        const url = `${getBaseAddress(householdId, receiptId)}/categorise?categoriseModel=${categoriseModel}`;
        return await fetch(url, {
            method: 'PUT',
            headers: headers
        });
    }
    return await callAndEnsureLogin(request,false)
}