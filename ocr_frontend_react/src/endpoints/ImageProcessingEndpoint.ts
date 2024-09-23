import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

let ImageProcessingEndpoint = {
    async uploadImageForOCR(image: any, query: { ocrType: "tesseract"|"paddle"; orientation: "portrait"|"landscape"; parseModel: "gpt-4o"|"gpt-4o-mini"|"llama"; }) {
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