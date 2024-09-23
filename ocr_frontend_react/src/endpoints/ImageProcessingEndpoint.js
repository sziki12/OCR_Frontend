import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
import {serverAddress} from "./BackendAccess";

let ImageProcessingEndpoint = {
    async uploadImageForOCR(image, query) {
        if (typeof query === "undefined" || typeof query.ocrType === "undefined" ||
            typeof query.orientation === "undefined" || typeof query.parseModel === "undefined")
            return new Promise(async (resolve, reject) => {
                reject("Insufficient query param")
            })
        let request = async () => {
            const url = serverAddress + `api/image?ocrType=${query.ocrType}&orientation=${query.orientation}&parseModel=${query.parseModel}`
            console.log(url)
            let response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(false),
                body: image
            });
            return await response.json()
        }
        return await callAndEnsureLogin(request)
    },
}

module.exports = ImageProcessingEndpoint