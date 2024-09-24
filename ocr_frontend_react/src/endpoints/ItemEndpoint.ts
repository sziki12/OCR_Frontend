import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

let ItemEndpoint = {
    getBaseAddress(householdId: string, receiptId: string | null) {
        if(typeof receiptId === "string")
            return `${serverAddress}/api/household/${householdId}/receipt/${receiptId}/item`
        else
            return `${serverAddress}/api/household/${householdId}/receipt/item`
    } ,
    async deleteItem(householdId: string,receiptId: string, itemId: string) {
        let request = async () => {
            await fetch(serverAddress + `${this.getBaseAddress(householdId,receiptId)}/${itemId}`,
                {
                    method: 'DELETE',
                    cache: "no-store",
                    headers: getHeaders(false)
                });
        }
        return await callAndEnsureLogin(request)
    },
    async getItemCategories(householdId: string,) {
        let request = async () => {
            const url = serverAddress + `${this.getBaseAddress(householdId,null)}/categories`;
            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders(false)
            })
            return await response.json();
        }
        return await callAndEnsureLogin(request)
    },
    async categoriseItems(householdId: string,receiptId: string) {
        let request = async () => {
            const url = serverAddress + `${this.getBaseAddress(householdId,receiptId)}/categorise`;
            return await fetch(url, {
                method: 'PUT',
                headers: getHeaders(false)
            });
        }
        return await callAndEnsureLogin(request)
    },
}

module.exports = ItemEndpoint