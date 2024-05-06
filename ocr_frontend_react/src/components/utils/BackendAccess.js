const bcrypt = require("bcryptjs");

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
function getUserName(){
    return window.localStorage.getItem("user_name")
}
function getPasswordHash(){
    return window.localStorage.getItem("password_hash")
}

async function callAndEnsureLogin(request)
{
    try {
         return await request()
    }
    catch (e)
    {
        let user = {
            userName:getUserName(),
            password:getPasswordHash()
        }
        await hashPassword(user,BackendAccess.loginUser)
        return await request()
    }

}

async function hashPassword(user,request)
{
    const bcrypt = require('bcryptjs');
    if(user && user.password && user.salt)
    {
        console.log(user)
        let hash = bcrypt.hashSync(user.password, user.salt)
        user.password = hash
        //TODO Remove
        console.log("hash:")
        console.log(hash)
        return await request(user);
    }
}
const ipAddress = "localhost"//"172.17.32.1"
const baseAddress = `http://${ipAddress}:8080/`

const BackendAccess =
    {
        saveAuthToken(token)
        {
            if(token)
                window.localStorage.setItem("auth_token",token)
            else
                window.localStorage.setItem("auth_token","")
        },
        async saveUser(user)
        {
            if(user && user.userName)
            {
                window.localStorage.setItem("user_name",user.userName)
                await hashPassword(user,(hash)=>{
                    window.localStorage.setItem("password_hash",hash)
                })
            }
            else
            {
                window.localStorage.setItem("user_name","")
                window.localStorage.setItem("password_hash","")
            }
        },

        getUser()
        {
            return {
                userName:getUserName(),
                isAuthenticated: Boolean(getUserName()&&getPasswordHash())
            }
        },

        //TODO Refactor params in objects
        async getReceipts() {
            let request = async ()=> {
                let receiptsRequest = await fetch(baseAddress+"api/receipt",
                    {
                        cache: 'no-store',
                        headers: getHeaders(false)
                    })
                return await receiptsRequest.json()
            }
            return await callAndEnsureLogin(request)
        },

        async getSingleReceipt(receiptId) {

            let request = async ()=>{
                let receiptsRequest = await fetch(baseAddress+"api/receipt/"+receiptId,
                    {
                        cache: "no-store",
                        headers: getHeaders(false)
                    })
                return await receiptsRequest.json()
            }
            return await callAndEnsureLogin(request)
        },
        async getItem(receiptId,itemId) {
            let request = async ()=>{
                let receiptsRequest = await fetch(baseAddress+"api/receipt/"+receiptId+"/item/"+itemId,
                    {
                        cache: "no-store"
                        ,
                        headers: getHeaders(false)
                    })
                return await receiptsRequest.json()
            }
            return await callAndEnsureLogin(request)
        },

        async createReceipt(name,dateOfPurchase)
        {
            let request = async ()=>{
                let receiptsRequest = await fetch(baseAddress+'api/receipt', {
                    method: 'POST',
                    headers: getHeaders(true),
                    body: JSON.stringify({
                        name,
                        dateOfPurchase,
                        items:[],
                    }),
                });
            }
            return await callAndEnsureLogin(request)
        },

        async updateReceipt(receiptId,name,dateOfPurchase,items)
        {
            let request = async ()=>{
                let receiptsRequest = await fetch(baseAddress+'api/receipt/'+receiptId, {
                    method: 'PUT',
                    headers: getHeaders(true),
                    body: JSON.stringify({
                        name,
                        dateOfPurchase,
                        items
                    }),
                });
            }
            return await callAndEnsureLogin(request)
        },

        async deleteReceipts(receiptId) {
            let request = async ()=>{
                let receiptsRequest = await fetch(baseAddress+"api/receipt/"+receiptId,
                    {
                        method: 'DELETE',
                        cache: "no-store",
                        headers: getHeaders(false)
                    })
            }
            return await callAndEnsureLogin(request)
        },
        async addItemToReceipt(receiptId,name,quantity,totalCost)
        {
            let request = async ()=>{
                const url = baseAddress+'api/receipt/'+receiptId+'/item'
                let response = await fetch(url, {
                    method: 'POST',
                    headers: getHeaders(true),
                    body: JSON.stringify({
                        name,
                        quantity,
                        totalCost,
                    }),
                });
            }
            return await callAndEnsureLogin(request)
        },

        async createNewItem(receiptId)
        {
            let request = async ()=>{
                const url = baseAddress+'api/receipt/'+receiptId+'/new/item'
                const response = await fetch(url, {
                    method: 'POST',
                    headers: getHeaders(true),
                });
                return await response.json()
            }
            return await callAndEnsureLogin(request)
        },
        async updateItem(receiptId,itemId,name,quantity,totalCost)
        {
            let request = async ()=>{
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
            }
            return await callAndEnsureLogin(request)
        },
        async deleteItem(receiptId,itemId)
        {
            let request = async ()=>{
                await fetch(baseAddress+"api/receipt/"+receiptId+"/item/"+itemId,
                    {
                        method: 'DELETE',
                        cache: "no-store",
                        headers: getHeaders(false)
                    });
            }
            return await callAndEnsureLogin(request)
        },

        async uploadImageForOCR(image)
        {
            let request = async ()=>{
                const url = baseAddress+'api/image'
                let response = await fetch(url, {
                    method: 'POST',
                    headers: getHeaders(false),
                    body: image
                });
                return await response.json()
            }
            return await callAndEnsureLogin(request)
        },

        async loginUser(user)
        {
            const url = baseAddress+`salt`;
            let saltResponse = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    userName:user.userName,
                    salt:""
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let saltResponseObject = await saltResponse.json()
            user.salt = saltResponseObject.salt
            let request = async()=>{
                const url = baseAddress+'login';
                return await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            return await hashPassword(user,request)
        },
        async registerUser(user)
        {
            const bcrypt = require('bcryptjs');
            user.salt = bcrypt.genSaltSync()
            let request = async ()=>{
                const url = baseAddress+'register';
                return await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            return await hashPassword(user,request)
        },
        async getPlaces()
        {
            let request = async ()=>{
                const url = baseAddress+'api/place';
                const response =  await fetch(url, {
                    method: 'GET',
                    headers: getHeaders(false),
                });

                return await response.json()
            }
            return await callAndEnsureLogin(request)
        },
        async savePlace(place)
        {
            let request = async ()=>{
                const url = baseAddress+'api/place/save';
                return await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(place),
                    headers: getHeaders(true)
                })
            }
            return await callAndEnsureLogin(request)
        },
        async assignPlace(placeId,receiptId)
        {
            let request = async ()=>{
                const url = baseAddress+'api/place/'+placeId+"/to/"+receiptId;
                await fetch(url, {
                    method: 'PUT',
                    headers: getHeaders(false)
                })
            }
            return await callAndEnsureLogin(request)
        },
        async removePlace(receiptId)
        {
            let request = async ()=>{
                const url = baseAddress+'api/place/remove/'+receiptId;
                await fetch(url, {
                    method: 'PUT',
                    headers: getHeaders(false)
                })
            }
            return await callAndEnsureLogin(request)
        },
        async getOcrResponse(receiptId)
        {
            let request = async ()=>{
                const url = baseAddress+'api/ocr/response/'+receiptId;
                return await fetch(url, {
                    method: 'GET',
                    headers: getHeaders(false)
                })
            }
            return await callAndEnsureLogin(request)
        },
        async getImage(receiptId,imageId)
        {
            let request = async ()=>{
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
            }
            return await callAndEnsureLogin(request)
        },

        async getPlaceByReceiptId(receiptId)
        {
            let request = async ()=>{
                const url = baseAddress+`api/place/${receiptId}`;
                const response =  await fetch(url, {
                    method: 'GET',
                    headers: getHeaders(false)
                })
                return await response.json();
            }
            return await callAndEnsureLogin(request)
        },

        async  getFilterOptions()
        {
            let request = async ()=>{
                const url = baseAddress+`api/filter`;
                const response =  await fetch(url, {
                    method: 'GET',
                    headers: getHeaders(false)
                })
                return await response.json();
            }
            return await callAndEnsureLogin(request)
        }

    }



    module.exports = BackendAccess