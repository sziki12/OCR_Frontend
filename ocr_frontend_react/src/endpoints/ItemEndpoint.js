import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
import {serverAddress} from "./BackendAccess";

let ItemEndpoint = {
    async deleteItem(receiptId, itemId) {
        let request = async () => {
            await fetch(serverAddress + "api/receipt/" + receiptId + "/item/" + itemId,
                {
                    method: 'DELETE',
                    cache: "no-store",
                    headers: getHeaders(false)
                });
        }
        return await callAndEnsureLogin(request)
    },
    async getItemCategories() {
        let request = async () => {
            const url = serverAddress + `api/receipt/item/categories`;
            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders(false)
            })
            return await response.json();
        }
        return await callAndEnsureLogin(request)
    },
    async categoriseItems(receiptId) {
        let request = async () => {
            const url = serverAddress + `api/receipt/${receiptId}/categorise`;
            return await fetch(url, {
                method: 'PUT',
                headers: getHeaders(false)
            });
        }
        return await callAndEnsureLogin(request)
    },
}

module.exports = ItemEndpoint