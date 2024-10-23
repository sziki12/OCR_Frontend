import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {ReceiptItem, Receipt, CreateReceiptRequest} from "../types/MainTypes";


function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/receipt`
}

export async function getReceipts(householdId: string): Promise<[Receipt]> {
    let request = async (headers) => {
        const url = getBaseAddress(householdId);
        let receiptsRequest = await fetch(url,
            {
                cache: 'no-store',
                headers: headers
            })
        return await receiptsRequest.json()
    }
    return await callAndEnsureLogin(request,false)
}

export async function getSingleReceipt(householdId: string, receiptId: string): Promise<Receipt> {

    let request = async (headers) => {
        let receiptsRequest = await fetch(`${getBaseAddress(householdId)}/${receiptId}`,
            {
                cache: "no-store",
                headers: headers
            })
        return await receiptsRequest.json()
    }
    return await callAndEnsureLogin(request,false)
}

export async function createReceipt(householdId: string, receipt: CreateReceiptRequest) {
    let request = async (headers) => {
        let receiptsRequest = await fetch(`${getBaseAddress(householdId)}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(receipt),
        });
    }
    return await callAndEnsureLogin(request,true)
}

export async function updateReceipt(householdId: string, receipt: Receipt) {

    let request = async (headers) => {
        let receiptsRequest = await fetch(`${getBaseAddress(householdId)}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(receipt),
        });
    }
    return await callAndEnsureLogin(request,true)
}

export async function deleteReceipts(householdId: string, receiptId: string) {
    let request = async (headers) => {
        let receiptsRequest = await fetch(`${getBaseAddress(householdId)}/${receiptId}`,
            {
                method: 'DELETE',
                cache: "no-store",
                headers: headers
            })
    }
    return await callAndEnsureLogin(request,false)
}

export async function addItemToReceipt(householdId: string, receiptId: string, item: ReceiptItem) {
    let request = async (headers) => {
        const url = `${getBaseAddress(householdId)}/${receiptId}/item`
        let response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(item),
        });
    }
    return await callAndEnsureLogin(request,true)
}

export async function createNewItem(householdId: string, receiptId: string) {
    let request = async (headers) => {
        const url = `${getBaseAddress(householdId)}/${receiptId}/new/item`
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
        });
        return await response.json()
    }
    return await callAndEnsureLogin(request,true)
}