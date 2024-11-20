import {AuthServiceFunctions} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import React, {createContext, useContext} from "react";
import {OcrQuery} from "../types/MainTypes";

const ItemEndpointContext: React.Context<any> = createContext(
    {
        deleteItem:async(householdId: string, receiptId: string, itemId: string):Promise<any>=>{},
        getItemCategories:async(householdId: string):Promise<any>=>{},
        categoriseItems:async(householdId: string, receiptId: string, categoriseModel: String):Promise<any>=>{},
    }
);
export const ItemEndpointFunctions = () => useContext(ItemEndpointContext)
export default function ItemEndpoint({children}) {
    const {callAndEnsureLogin} = AuthServiceFunctions()
    const deleteItem = async (householdId: string, receiptId: string, itemId: string) => {
        let request = async (headers) => {
            await fetch(`${getBaseAddress(householdId, receiptId)}/${itemId}`,
                {
                    method: 'DELETE',
                    cache: "no-store",
                    headers: headers
                });
        }
        return await callAndEnsureLogin(request, false)
    }

    const getItemCategories = async (householdId: string) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId, null)}/categories`;

            console.log("getItemCategories")
            console.log(url)
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            })
            return await response.json();
        }
        return await callAndEnsureLogin(request, false)
    }

    const categoriseItems = async (householdId: string, receiptId: string, categoriseModel: String) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId, receiptId)}/categorise?categoriseModel=${categoriseModel}`;
            return await fetch(url, {
                method: 'PUT',
                headers: headers
            });
        }
        return await callAndEnsureLogin(request, false)
    }

    return (
        <ItemEndpointContext.Provider value={{
            deleteItem,
            getItemCategories,
            categoriseItems,
        }}>
            {children}
        </ItemEndpointContext.Provider>
    )
}

function getBaseAddress(householdId: string, receiptId: string | null) {
    if (typeof receiptId === "string" || typeof receiptId === "number")
        return `${serverAddress}/api/household/${householdId}/receipt/${receiptId}/item`
    else
        return `${serverAddress}/api/household/${householdId}/receipt/item`
}