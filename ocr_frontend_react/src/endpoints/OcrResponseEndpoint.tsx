import {AuthServiceFunctions} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import React, {createContext, useContext} from "react";
import {OcrQuery} from "../types/MainTypes";

const OcrResponseEndpointContext: React.Context<any> = createContext(
    {
        getOcrResponse:async(householdId: string, receiptId: string):Promise<any>=>{},
    }
);
export const OcrResponseEndpointFunctions = () => useContext(OcrResponseEndpointContext)
export default function OcrResponseEndpoint({children}) {
    const {callAndEnsureLogin} = AuthServiceFunctions()

    const getOcrResponse = async (householdId: string, receiptId: string) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId)}/${receiptId}`;
            return await fetch(url, {
                method: 'GET',
                headers: headers
            })
        }
        return await callAndEnsureLogin(request, false)
    }

    return (
        <OcrResponseEndpointContext.Provider value={{
            getOcrResponse,
        }}>
            {children}
        </OcrResponseEndpointContext.Provider>
    )
}

function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/ocr/response`
}