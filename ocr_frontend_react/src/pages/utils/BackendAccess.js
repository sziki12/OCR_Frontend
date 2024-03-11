

const BackendAccess =
    {

        async getReceipts() {
            let receiptsRequest = await fetch("http://localhost:8080/api/receipt",
                {
                    cache: "no-store"
                })

            return await receiptsRequest.json()
        },

        async getSingleReceipt(receiptId) {

            let receiptsRequest = await fetch("http://localhost:8080/api/receipt/"+receiptId,
                {
                    cache: "no-store"
                })

            return await receiptsRequest.json()
        },
        async getItem(receiptId,itemId) {

            let receiptsRequest = await fetch("http://localhost:8080/api/receipt/"+receiptId+"/item/"+itemId,
                {
                    cache: "no-store"
                })

            return await receiptsRequest.json()
        },

        async createReceipt(description,dateOfPurchase)
        {
            await fetch('http://localhost:8080/api/receipt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                headers: {
                    'Content-Type': 'application/json',
                },
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
                    cache: "no-store"
                })
        },
        async createItem(receiptId,name,quantity,totalCost)
        {
            const url = 'http://localhost:8080/api/receipt/'+receiptId+'/item'
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    quantity,
                    totalCost,
                }),
            });
        },
        async updateItem(receiptId,itemId,name,quantity,totalCost)
        {
            await fetch("http://localhost:8080/api/receipt/"+receiptId+"/item/"+itemId,
                {
                    method: 'PUT',
                    cache: "no-store",
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
                    cache: "no-store"
                });
        },

        async processImage(image)
        {
            const url = 'http://localhost:8080/api/receipt/image';
            const response =  await fetch(url, {
                method: 'POST',
                body: image
            });

            return await response.json()
        },

    }


    module.exports = BackendAccess