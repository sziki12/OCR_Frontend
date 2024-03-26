

function getAuth()
{
    let token = getAuthToken()
    if(typeof token === 'undefined')
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

const BackendAccess =
    {
        setAuthToken(token)
        {
            window.localStorage.setItem("auth_token",token)
        },

        //TODO Refactor params in objects and add auth param
        async getReceipts() {
            let receiptsRequest = await fetch("http://localhost:8080/api/receipt",
                {
                    cache: 'no-store',
                    headers: getHeaders(false)
                })

            return await receiptsRequest.json()
        },

        async getSingleReceipt(receiptId) {

            let receiptsRequest = await fetch("http://localhost:8080/api/receipt/"+receiptId,
                {
                    cache: "no-store",
                    headers: getHeaders(false)
                })

            return await receiptsRequest.json()
        },
        async getItem(receiptId,itemId) {

            let receiptsRequest = await fetch("http://localhost:8080/api/receipt/"+receiptId+"/item/"+itemId,
                {
                    cache: "no-store"
                    ,
                    headers: getHeaders(false)
                })

            return await receiptsRequest.json()
        },

        async createReceipt(description,dateOfPurchase)
        {
            await fetch('http://localhost:8080/api/receipt', {
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
            await fetch('http://localhost:8080/api/receipt/'+receiptId, {
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
            await fetch("http://localhost:8080/api/receipt/"+receiptId,
                {
                    method: 'DELETE',
                    cache: "no-store",
                    headers: getHeaders(false)
                })
        },
        async addItemToReceipt(receiptId,name,quantity,totalCost)
        {
            const url = 'http://localhost:8080/api/receipt/'+receiptId+'/item'
            await fetch(url, {
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
            const url = 'http://localhost:8080/api/receipt/'+receiptId+'/new/item'
            const response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(true),
            });
            return await response.json()
        },
        async updateItem(receiptId,itemId,name,quantity,totalCost)
        {
            await fetch("http://localhost:8080/api/receipt/"+receiptId+"/item/"+itemId,
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
            await fetch("http://localhost:8080/api/receipt/"+receiptId+"/item/"+itemId,
                {
                    method: 'DELETE',
                    cache: "no-store",
                    headers: getHeaders(false)
                });
        },

        async uploadImageForOCR(image)
        {
            const url = 'http://localhost:8080/api/image'
            let response = await fetch(url, {
                method: 'POST',
                headers: getHeaders(false),
                body: image
            });
            return await response.json()
        },

        async loginUser(user)
        {
            console.log(user)
            const url = 'http://localhost:8080/login';
            const response =  await fetch(url, {
                method: 'POST',
                body: user,
                headers: getHeaders(true)
            });

            return await response.json()
        },
        async registerUser(user)
        {
            const url = 'http://localhost:8080/register';
            const response =  await fetch(url, {
                method: 'POST',
                body: user,
                headers: getHeaders(true)
            });

            return await response.json()
        }

    }



    module.exports = BackendAccess