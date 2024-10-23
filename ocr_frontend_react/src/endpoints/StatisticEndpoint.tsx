import {AuthServiceFunctions} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import React, {createContext, useContext} from "react";

const StatisticEndpointContext: React.Context<any> = createContext(
    {
        getChartData:async (householdId: string, dateObject: any):Promise<any>=>{},
    }
);
export const StatisticEndpointFunctions = () => useContext(StatisticEndpointContext)
export default function StatisticEndpoint({children}) {
    const {callAndEnsureLogin} = AuthServiceFunctions()

    const getChartData = async (householdId: string, dateObject: any) => {
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
        return await callAndEnsureLogin(request, true)
    }
    return (
        <StatisticEndpointContext.Provider value={{
            getChartData,
        }}>
            {children}
        </StatisticEndpointContext.Provider>
    )
}

function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/statistic/chart`
}