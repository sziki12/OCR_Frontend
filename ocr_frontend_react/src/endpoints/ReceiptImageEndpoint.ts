import {getHeaders, callAndEnsureLogin} from "../services/AuthService";
// @ts-ignore
import BackendAccess from "./BackendAccess";

let ReceiptImageEndpoint = {
    async getImage(receiptId: string, imageId: string) {
        let request = async () => {
            const url = BackendAccess.serverAddress + `api/image/${receiptId}/${imageId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: getHeaders(false)
            })
            const reader = response.body.getReader();
            let chunks: Uint8Array = new Uint8Array();
            return reader.read().then(function processText({done, value}) {

                if (done) {
                    //console.log('Stream finished. Content received:')
                    //console.log(chunks);
                    //console.log(blob);
                    return new Blob([chunks], {type: "image/jpg"})
                }
                //console.log(`Received ${chunks.length} chars so far!`)
                // console.log(value);
                const tempArray = new Uint8Array(chunks.length + value.length);
                tempArray.set(chunks);
                tempArray.set(value, chunks.length);
                chunks = tempArray

                return reader.read().then(processText)
            })
        }
        return await callAndEnsureLogin(request)
    },
}

module.exports = ReceiptImageEndpoint