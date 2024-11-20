import {AuthServiceFunctions} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {ReceiptItem, Receipt, CreateReceiptRequest} from "../types/MainTypes";
import React, {createContext, useContext} from "react";


function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/receipt`
}

const ReceiptEndpointContext: React.Context<any> = createContext(
    {
        getReceipts:async(householdId: string):Promise<any>=>{},
        getSingleReceipt:async(householdId: string, receiptId: string):Promise<any>=>{},
        createReceipt:async(householdId: string, receipt: CreateReceiptRequest):Promise<any>=>{},
        updateReceipt:async(householdId: string, receipt: Receipt):Promise<any>=>{},
        deleteReceipts:async(householdId: string, receiptId: string):Promise<any>=>{},
        addItemToReceipt:async(householdId: string, receiptId: string, item: ReceiptItem):Promise<any>=>{},
        createNewItem:async(householdId: string, receiptId: string):Promise<any>=>{},
    }
);
export const ReceiptEndpointFunctions = () => useContext(ReceiptEndpointContext)

export default function ReceiptEndpoint({children}) {
    const {callAndEnsureLogin} = AuthServiceFunctions()

    const getReceipts = async(householdId: string): Promise<[Receipt]> => {
        let request = async (headers) => {
            const url = getBaseAddress(householdId);
            let receiptsRequest = await fetch(url,
                {
                    cache: 'no-store',
                    headers: headers
                })
            return await receiptsRequest.json()
        }
        // @ts-ignore
        return await callAndEnsureLogin(request, false)
    }

    const getSingleReceipt = async(householdId: string, receiptId: string): Promise<Receipt> => {

        let request = async (headers) => {
            let receiptsRequest = await fetch(`${getBaseAddress(householdId)}/${receiptId}`,
                {
                    cache: "no-store",
                    headers: headers
                })
            return await receiptsRequest.json()
        }
        // @ts-ignore
        return await callAndEnsureLogin(request, false)
    }

    const createReceipt = async(householdId: string, receipt: CreateReceiptRequest) => {
        let request = async (headers) => {
            let receiptsRequest = await fetch(`${getBaseAddress(householdId)}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(receipt),
            });
        }
        return await callAndEnsureLogin(request, true)
    }

    const updateReceipt = async(householdId: string, receipt: Receipt) => {

        let request = async (headers) => {
            let receiptsRequest = await fetch(`${getBaseAddress(householdId)}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(receipt),
            });
        }
        return await callAndEnsureLogin(request, true)
    }

    const deleteReceipts = async(householdId: string, receiptId: string) => {
        let request = async (headers) => {
            let receiptsRequest = await fetch(`${getBaseAddress(householdId)}/${receiptId}`,
                {
                    method: 'DELETE',
                    cache: "no-store",
                    headers: headers
                })
        }
        return await callAndEnsureLogin(request, false)
    }

    const addItemToReceipt = async(householdId: string, receiptId: string, item: ReceiptItem) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId)}/${receiptId}/item`
            let response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(item),
            });
        }
        return await callAndEnsureLogin(request, true)
    }

    const createNewItem = async(householdId: string, receiptId: string) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId)}/${receiptId}/new/item`
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
            });
            return await response.json()
        }
        return await callAndEnsureLogin(request, true)
    }
    return (
        <ReceiptEndpointContext.Provider value={{
            getReceipts,
            getSingleReceipt,
            createReceipt,
            updateReceipt,
            deleteReceipts,
            addItemToReceipt,
            createNewItem,
        }}>
            {children}
        </ReceiptEndpointContext.Provider>
    )
}