import {callAndEnsureLogin,getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {Item} from "../types/MainTypes";

const ReceiptEndpoint={
    async getReceipts() {
        let request = async () => {
            let receiptsRequest = await fetch(serverAddress + "api/receipt",
                {
                    cache: 'no-store',
                    headers: getHeaders(false)
                })
            return await receiptsRequest.json()
        }
        return await callAndEnsureLogin(request)
    },

    async getSingleReceipt(receiptId: string) {

        let request = async () => {
            let receiptsRequest = await fetch(serverAddress + "api/receipt/" + receiptId,
                {
                    cache: "no-store",
                    headers: getHeaders(false)
                })
            return await receiptsRequest.json()
        }
        return await callAndEnsureLogin(request)
    },
    async createReceipt(receipt: {name: string, dateOfPurchase: Date, items: []}) {
        let request = async () => {
            let receiptsRequest = await fetch(serverAddress + 'api/receipt', {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify(receipt),
            });
        }
        return await callAndEnsureLogin(request)
    },

    async updateReceipt(receipt: { id: string; }) {

        let request = async () => {
            let receiptsRequest = await fetch(serverAddress + 'api/receipt/' + receipt.id, {
                method: 'PUT',
                headers: getHeaders(true),
                body: JSON.stringify(receipt),
            });
        }
        return await callAndEnsureLogin(request)
    },

    async deleteReceipts(receiptId: string) {
        let request = async () => {
            let receiptsRequest = await fetch(serverAddress + "api/receipt/" + receiptId,
                {
                    method: 'DELETE',
                    cache: "no-store",
                    headers: getHeaders(false)
                })
        }
        return await callAndEnsureLogin(request)
    },
    async addItemToReceipt(receiptId: string, item: Item) {
        let request = async () => {
            const url = serverAddress + 'api/receipt/' + receiptId + '/item'
            let response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify(item),
            });
        }
        return await callAndEnsureLogin(request)
    },
    async createNewItem(receiptId: string) {
        let request = async () => {
            const url = serverAddress + 'api/receipt/' + receiptId + '/new/item'
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