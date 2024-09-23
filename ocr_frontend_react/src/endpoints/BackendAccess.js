
const BackendAccess =
    {
        ipAddress : "localhost",//"172.17.32.1",
        serverAddress : `http://${(this.ipAddress)}:8080/`,
        //TODO Refactor params in objects

        async getItem(receiptId, itemId) {
            let request = async () => {
                let receiptsRequest = await fetch(baseAddress + "api/receipt/" + receiptId + "/item/" + itemId,
                    {
                        cache: "no-store"
                        ,
                        headers: getHeaders(false)
                    })
                return await receiptsRequest.json()
            }
            return await callAndEnsureLogin(request)
        },

        async updateItem(receiptId, itemId, name, quantity, totalCost) {
            let request = async () => {
                await fetch(baseAddress + "api/receipt/" + receiptId + "/item/" + itemId,
                    {
                        method: 'PUT',
                        cache: "no-store",
                        headers: getHeaders(true),
                        body: JSON.stringify(
                            {
                                name,
                                quantity,
                                totalCost,
                            }),
                    });
            }
            return await callAndEnsureLogin(request)
        },

        async getPlaceByReceiptId(receiptId) {
            let request = async () => {
                const url = baseAddress + `api/place/${receiptId}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: getHeaders(false)
                })
                return await response.json();
            }
            return await callAndEnsureLogin(request)
        },
    }


module.exports = BackendAccess