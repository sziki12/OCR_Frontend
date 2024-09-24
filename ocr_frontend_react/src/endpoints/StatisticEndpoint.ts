import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";

let StatisticEndpoint = {
    async getChartData(dateObject: any) {//TODO Fix type
        let request = async () => {
            console.log(dateObject)
            const url = serverAddress + `api/receipt/chart`;
            let request = await fetch(url, {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify(dateObject)
            });
            return await request.json()
        }
        return await callAndEnsureLogin(request)
    }
}

module.exports = StatisticEndpoint