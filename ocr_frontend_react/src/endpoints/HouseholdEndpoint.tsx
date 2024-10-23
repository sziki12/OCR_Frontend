// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {AuthServiceFunctions} from "../services/AuthService";
import {Household} from "../types/MainTypes";
import React, {createContext, useContext} from "react";

const HouseholdEndpointContext: React.Context<any> = createContext(
    {
        getHouseholds:async():Promise<any>=>{},
    }
);
export const HouseholdEndpointFunctions = () => useContext(HouseholdEndpointContext)


export default function HouseholdEndpoint({children}) {

    const {callAndEnsureLogin} = AuthServiceFunctions()
    const getBaseAddress = () => {
        return `${serverAddress}/api/household`
    }
    const getHouseholds = async (): Promise<[Household]> => {
        let request = async (headers: any) => {
            const url = getBaseAddress();
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            })
            return await response.json();
        }
        // @ts-ignore
        return await callAndEnsureLogin(request, false)
    }

    return (
        <HouseholdEndpointContext.Provider value={{
            getHouseholds,
        }}>
            {children}
        </HouseholdEndpointContext.Provider>
    )
}
