import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
import {serverAddress} from "./BackendAccess";

let PlaceEndpoint = {
    async getPlaces() {
        let request = async () => {
            const url = serverAddress + 'api/place';
            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders(false),
            });

            return await response.json()
        }
        return await callAndEnsureLogin(request)
    },
    async savePlace(place) {
        let request = async () => {
            const url = serverAddress + 'api/place/save';
            return await fetch(url, {
                method: 'POST',
                body: JSON.stringify(place),
                headers: getHeaders(true)
            })
        }
        return await callAndEnsureLogin(request)
    },
    async assignPlace(placeId, receiptId) {
        let request = async () => {
            const url = serverAddress + 'api/place/' + placeId + "/to/" + receiptId;
            await fetch(url, {
                method: 'PUT',
                headers: getHeaders(false)
            })
        }
        return await callAndEnsureLogin(request)
    },
    async removePlace(receiptId) {
        let request = async () => {
            const url = serverAddress + 'api/place/remove/' + receiptId;
            await fetch(url, {
                method: 'PUT',
                headers: getHeaders(false)
            })
        }
        return await callAndEnsureLogin(request)
    },
}

module.exports = PlaceEndpoint