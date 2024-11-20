import {AuthServiceFunctions} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import React, {createContext, useContext} from "react";
import {OcrQuery} from "../types/MainTypes";

const ImageProcessingEndpointContext: React.Context<any> = createContext(
    {
        uploadImageForOCR:async(householdId: string, image: any, query: OcrQuery):Promise<any>=>{},
    }
);
export const ImageProcessingEndpointFunctions = () => useContext(ImageProcessingEndpointContext)
export default function ImageProcessingEndpoint({children}){

    const {callAndEnsureLogin} = AuthServiceFunctions()
    const uploadImageForOCR = async(householdId: string, image: any, query: OcrQuery) => {
        let request = async (headers) => {
            const url =`${getBaseAddress(householdId)}?ocrType=${query.ocrType}&orientation=${query.orientation}&parseModel=${query.parseModel}`
            console.log(url)
            let response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: image
            });
            return await response.json()
        }
        return await callAndEnsureLogin(request,false)
    }
    return (
        <ImageProcessingEndpointContext.Provider value={{
            uploadImageForOCR,
    }}>
    {children}
    </ImageProcessingEndpointContext.Provider>
)
}
function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/image`
}