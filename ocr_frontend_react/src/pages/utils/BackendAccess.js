

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

        async updateReceipt(receiptId,description,dateOfPurchase)
        {
            await fetch('http://localhost:8080/api/receipt/'+receiptId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description,
                    dateOfPurchase,
                }),
            });
        },

        async deleteReceipts(receiptId) {
            let receiptsRequest = await fetch("http://localhost:8080/api/receipt/"+receiptId,
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

        async uploadImage(image)
        {
            const url = 'http://localhost:8080/api/receipt/image'
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(image)
            });
        },

    }



    module.exports = BackendAccess