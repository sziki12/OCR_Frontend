import AuthService from "../services/AuthService";
import BackendAccess from "./BackendAccess";

let ReceiptImageEndpoint = {
    async getImage(receiptId, imageId) {
        let request = async () => {
            const url = BackendAccess.serverAddress + `api/image/${receiptId}/${imageId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: AuthService.getHeaders(false)
            })
            const reader = await response.body.getReader();
            let chunks = [];
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
        return await AuthService.callAndEnsureLogin(request)
    },
}

module.exports = ReceiptImageEndpoint