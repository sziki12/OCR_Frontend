import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/statistic/chart`
}
export async function getChartData(householdId: string, dateObject: any) {//TODO Fix type
    let request = async (headers) => {
        console.log(dateObject)
        const url = `${getBaseAddress(householdId)}`;
        let request = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dateObject)
        });
        return await request.json()
    }
    return await callAndEnsureLogin(request,true)
}