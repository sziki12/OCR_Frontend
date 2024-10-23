import {AuthServiceFunctions} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import React, {createContext, useContext} from "react";

const FilterEndpointContext: React.Context<any> = createContext(
    {
        getFilterOptions:async(householdId: string):Promise<any>=>{},
    }
);
export const FilterEndpointFunctions = () => useContext(FilterEndpointContext)

export default function FilterEndpoint({children}) {
    const {callAndEnsureLogin} = AuthServiceFunctions()

    const getFilterOptions = async (householdId: string) => {
        let request = async (headers) => {
            const url = getBaseAddress(householdId);
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            })
            return await response.json();
        }
        return await callAndEnsureLogin(request, false)
    }
    return (
        <FilterEndpointContext.Provider value={{
            getFilterOptions,
        }}>
            {children}
        </FilterEndpointContext.Provider>)
}

function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/filter`
}

