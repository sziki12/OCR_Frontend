import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/image`
}
export async function uploadImageForOCR(householdId: string, image: any, query: {
    ocrType: "tesseract" | "paddle";
    orientation: "portrait" | "landscape";
    parseModel: "gpt-4o" | "gpt-4o-mini" | "llama";
}) {
    let request = async () => {
        const url =`${getBaseAddress(householdId)}?ocrType=${query.ocrType}&orientation=${query.orientation}&parseModel=${query.parseModel}`
        console.log(url)
        let response = await fetch(url, {
            method: 'POST',
            headers: getHeaders(false),
            body: image
        });
        return await response.json()
    }
    return await callAndEnsureLogin(request)
}