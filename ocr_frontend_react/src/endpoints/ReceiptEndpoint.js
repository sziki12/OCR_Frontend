import {callAndEnsureLogin,getHeaders} from "../services/AuthService";
import {serverAddress} from "./BackendAccess";

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

    async getSingleReceipt(receiptId) {

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
    async createReceipt(name, dateOfPurchase) {
        let request = async () => {
            let receiptsRequest = await fetch(serverAddress + 'api/receipt', {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify({
                    name,
                    dateOfPurchase,
                    items: [],
                }),
            });
        }
        return await callAndEnsureLogin(request)
    },

    async updateReceipt(receipt) {

        let request = async () => {
            let receiptsRequest = await fetch(serverAddress + 'api/receipt/' + receipt.id, {
                method: 'PUT',
                headers: getHeaders(true),
                body: JSON.stringify(receipt),
            });
        }
        return await callAndEnsureLogin(request)
    },

    async deleteReceipts(receiptId) {
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
    async addItemToReceipt(receiptId, item) {
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
    async createNewItem(receiptId) {
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