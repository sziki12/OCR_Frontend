import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MainSection from "@/data_types/MainSection";



async function getReceipts():Promise<Receipt[]> {
    let receiptsRequest = await fetch("http://localhost:8080/api/receipt",
        {
            cache: "no-store"
        })
    let receipts = await receiptsRequest.json()


    return receipts as Receipt[]
}

function getItems(items: Item[]
)
{
    let itemList: React.JSX.Element[] = []

    let itemsList = items.map((item: any)=>
    {
        return(
            <div className="px-4 py-2 bg-sky-100">
                <p>{item.name+": "+item.quantity+" piece"}</p>
                <p>{"Cost: "+item.totalCost}</p>
            </div>
        )
    })
    itemList.push(<p>Items</p>)

    return itemList.concat(itemsList)
}

export default async function ReceiptPage({params} : any) {

    let receipts:Receipt[] = await getReceipts()

    return (
       <MainSection>
            <p>Receipts</p>
            <div className="flex flex-row">
                {receipts?.filter((receipt) => {
                    return receipt.id == params.receiptId;
                }).map((receipt) => {
                    return (
                        <div className="px-4 py-2 bg-sky-50 shadow rounded">
                            <p>Date: {new Date(receipt.dateOfPurchase).toLocaleDateString()}</p>
                            {receipt.items.length > 0 && getItems(receipt.items)}
                            <p>Description: {receipt.description}</p>
                            <p>Total Cost: {receipt.totalCost}</p>
                        </div>);
                })}
            </div>
        </MainSection>
    );
}
