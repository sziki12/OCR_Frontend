

function getAuth()
{
    let token = getAuthToken()
    if(token === null || token === "")
    {
        return {}
    }
    else
    {
        return{
            'Authorization':`Bearer ${token}`
        }
    }
}

function getHeaders(isJson)
{
    if(isJson)
    {
        return{
            'Content-Type': 'application/json',
            'Authorization':getAuth().Authorization
        }
    }
    else
    {
        return getAuth()
    }
}

function getAuthToken(){
    return window.localStorage.getItem("auth_token")
}
const ipAddress = "localhost"//"172.17.32.1"
const baseAddress = `http://${ipAddress}:8080/`

const BackendAccess =
    {
        setAuthToken(token)
        {
            window.localStorage.setItem("auth_token",token)
        },

        //TODO Refactor params in objects
        async getReceipts() {
            let receiptsRequest = await fetch(baseAddress+"api/receipt",
                {
                    cache: 'no-store',
                    headers: getHeaders(false)
                })
            return await receiptsRequest.json()
        },

        async getSingleReceipt(receiptId) {

            let receiptsRequest = await fetch(baseAddress+"api/receipt/"+receiptId,
                {
                    cache: "no-store",
                    headers: getHeaders(false)
                })
            return await receiptsRequest.json()
        },
        async getItem(receiptId,itemId) {

            let receiptsRequest = await fetch(baseAddress+"api/receipt/"+receiptId+"/item/"+itemId,
                {
                    cache: "no-store"
                    ,
                    headers: getHeaders(false)
                })
            return await receiptsRequest.json()
        },

        async createReceipt(description,dateOfPurchase)
        {
            let receiptsRequest = await fetch(baseAddress+'api/receipt', {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify({
                    description,
                    dateOfPurchase,
                    items:[],
                }),
            });
        },

        async updateReceipt(receiptId,description,dateOfPurchase,items)
        {
            let receiptsRequest = await fetch(baseAddress+'api/receipt/'+receiptId, {
                method: 'PUT',
                headers: getHeaders(true),
                body: JSON.stringify({
                    description,
                    dateOfPurchase,
                    items
                }),
            });
        },

        async deleteReceipts(receiptId) {
            let receiptsRequest = await fetch(baseAddress+"api/receipt/"+receiptId,
                {
                    method: 'DELETE',
                    cache: "no-store",
                    headers: getHeaders(false)
                })
        },
        async addItemToReceipt(receiptId,name,quantity,totalCost)
        {
            const url = baseAddress+'api/receipt/'+receiptId+'/item'
            let request = await fetch(url, {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify({
                    name,
                    quantity,
                    totalCost,
                }),
            });
        },

        async createNewItem(receiptId)
        {
            const url = baseAddress+'api/receipt/'+receiptId+'/new/item'
            const response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(true),
            });
            return await response.json()
        },
        async updateItem(receiptId,itemId,name,quantity,totalCost)
        {
            await fetch(baseAddress+"api/receipt/"+receiptId+"/item/"+itemId,
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
        },
        async deleteItem(receiptId,itemId)
        {
            await fetch(baseAddress+"api/receipt/"+receiptId+"/item/"+itemId,
                {
                    method: 'DELETE',
                    cache: "no-store",
                    headers: getHeaders(false)
                });
        },

        async uploadImageForOCR(image)
        {
            const url = baseAddress+'api/image'
            let response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(false),
                body: image
            });
            return await response.json()
        },

        async loginUser(user)
        {
            const url = baseAddress+'login';
            const response =  await fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response
        },
        async registerUser(user)
        {
            const url = baseAddress+'register';
            return await fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        async getPlaces()
        {
            const url = baseAddress+'api/place';
            const response =  await fetch(url, {
                method: 'GET',
                headers: getHeaders(false),
            });

            return await response.json()
        },
        async savePlace(place)
        {
            const url = baseAddress+'api/place/save';
            return await fetch(url, {
                method: 'POST',
                body: JSON.stringify(place),
                headers: getHeaders(true)
            })
        },
        async assignPlace(placeId,receiptId)
        {
            const url = baseAddress+'api/place/'+placeId+"/to/"+receiptId;
            await fetch(url, {
                method: 'PUT',
                headers: getHeaders(false)
            })
        },
        async removePlace(receiptId)
        {
            const url = baseAddress+'api/place/remove/'+receiptId;
            await fetch(url, {
                method: 'PUT',
                headers: getHeaders(false)
            })
        },
        async getOcrResponse(receiptId)
        {
            const url = baseAddress+'api/ocr/response/'+receiptId;
            return await fetch(url, {
                method: 'GET',
                headers: getHeaders(false)
            })
        },
        async getImage(receiptId,imageId)
        {
            const url = baseAddress+`api/image/${receiptId}/${imageId}`;
            const response =  await fetch(url, {
                method: 'GET',
                headers: getHeaders(false)
            })
            const reader = await response.body.getReader();
            let chunks = [];
            return reader.read().then(function processText({ done, value }) {

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
        },

    }



    module.exports = BackendAccess