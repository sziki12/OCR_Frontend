import {callAndEnsureLogin,getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {ReceiptItem, Receipt, CreateReceiptRequest} from "../types/MainTypes";

const ReceiptEndpoint={
    getBaseAddress(householdId: string) {
        return `${serverAddress}/api/household/${householdId}/receipt`
    } ,
    async getReceipts(householdId: string):Promise<[Receipt]> {
        let request = async () => {
            let receiptsRequest = await fetch(this.getBaseAddress(householdId),
                {
                    cache: 'no-store',
                    headers: getHeaders(false)
                })
            return await receiptsRequest.json()
        }
        return await callAndEnsureLogin(request)
    },

    async getSingleReceipt(householdId: string, receiptId: string):Promise<Receipt> {

        let request = async () => {
            let receiptsRequest = await fetch(`${this.getBaseAddress(householdId)}/${receiptId}`,
                {
                    cache: "no-store",
                    headers: getHeaders(false)
                })
            return await receiptsRequest.json()
        }
        return await callAndEnsureLogin(request)
    },
    async createReceipt(householdId: string, receipt: CreateReceiptRequest) {
        let request = async () => {
            let receiptsRequest = await fetch(`${this.getBaseAddress(householdId)}`, {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify(receipt),
            });
        }
        return await callAndEnsureLogin(request)
    },

    async updateReceipt(householdId: string, receipt: Receipt) {

        let request = async () => {
            let receiptsRequest = await fetch(`${this.getBaseAddress(householdId)}/${receipt.id}`, {
                method: 'PUT',
                headers: getHeaders(true),
                body: JSON.stringify(receipt),
            });
        }
        return await callAndEnsureLogin(request)
    },

    async deleteReceipts(householdId: string, receiptId: string) {
        let request = async () => {
            let receiptsRequest = await fetch(`${this.getBaseAddress(householdId)}/${receiptId}`,
                {
                    method: 'DELETE',
                    cache: "no-store",
                    headers: getHeaders(false)
                })
        }
        return await callAndEnsureLogin(request)
    },
    async addItemToReceipt(householdId: string, receiptId: string, item: ReceiptItem) {
        let request = async () => {
            const url = `${this.getBaseAddress(householdId)}/${receiptId}/item`
            let response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify(item),
            });
        }
        return await callAndEnsureLogin(request)
    },
    async createNewItem(householdId: string, receiptId: string) {
        let request = async () => {
            const url = `${this.getBaseAddress(householdId)}/${receiptId}/new/item`
            const response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(true),
            });
            return await response.json()
        }
        return await callAndEnsureLogin(request)
    },
}

module.exports = ReceiptEndpoint