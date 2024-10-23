import {AuthServiceFunctions} from "../services/AuthService";
// @ts-ignore
import BackendAccess, {serverAddress} from "./BackendAccess";
import React, {createContext, useContext} from "react";

const ReceiptImageEndpointContext: React.Context<any> = createContext(
    {
        getImage:async(householdId: string, receiptId: string, imageId: string):Promise<any>=>{},
    }
);
export const ReceiptImageEndpointFunctions = () => useContext(ReceiptImageEndpointContext)

export default function ReceiptImageEndpoint({children}){
    const {callAndEnsureLogin} = AuthServiceFunctions()

    const getImage = async(householdId: string, receiptId: string, imageId: string) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId)}/${receiptId}/${imageId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            })
            const reader = response.body.getReader();
            let chunks: Uint8Array = new Uint8Array([]);
            return reader.read().then(function processText({done, value}) {

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
        return await callAndEnsureLogin(request,false)
    }
    return (
        <ReceiptImageEndpointContext.Provider value={{
            getImage,
    }}>
    {children}
    </ReceiptImageEndpointContext.Provider>
)
}
function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/image`
}