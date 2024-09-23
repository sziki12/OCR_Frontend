import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

let OcrResponseEndpoint = {
    async getOcrResponse(receiptId: string) {
        let request = async () => {
            const url = serverAddress + 'api/ocr/response/' + receiptId;
            return await fetch(url, {
                method: 'GET',
                headers: getHeaders(false)
            })
        }
        return await callAndEnsureLogin(request)
    },
}

module.exports = OcrResponseEndpoint