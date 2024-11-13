// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {AuthServiceFunctions} from "../services/AuthService";
import {Household, HouseholdUsers} from "../types/MainTypes";
import React, {createContext, useContext} from "react";

const HouseholdEndpointContext: React.Context<any> = createContext(
    {
        getHouseholds: async (): Promise<any> => {
        },
        getHouseholdUsers: async (householdId: string):Promise<any> =>{
        },
        inviteUser: async (email:string):Promise<any> =>{
        },
        saveHouseholdName: async (householdId: string,newName:string):Promise<any> =>{
        },
        createNewHousehold: async (householdName:string):Promise<any> =>{
        }
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

    const getHouseholdUsers = async (householdId: string):
        Promise<HouseholdUsers> => {
        let request = async (headers: any) => {
            const url = getBaseAddress()+`/${householdId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            })
            return await response.json();
        }
        // @ts-ignore
        return await callAndEnsureLogin(request, false)
    }

    const inviteUser = async (householdId: string,email:string):
        Promise<HouseholdUsers> => {
        let request = async (headers: any) => {
            const url = getBaseAddress()+`/${householdId}/invite/${email}`;
            return await fetch(url, {
                method: 'POST',
                headers: headers
            });
        }
        // @ts-ignore
        return await callAndEnsureLogin(request, false)
    }

    const saveHouseholdName = async (householdId: string,newName:string):
        Promise<HouseholdUsers> => {
        let request = async (headers: any) => {
            const url = getBaseAddress()+`/${householdId}/update/${newName}`;
            return await fetch(url, {
                method: 'PUT',
                headers: headers
            });
        }
        // @ts-ignore
        return await callAndEnsureLogin(request, false)
    }

    const createNewHousehold = async (householdName:string):
        Promise<HouseholdUsers> => {
        let request = async (headers: any) => {
            const url = getBaseAddress()+`/${householdName}/new`;
            return await fetch(url, {
                method: 'POST',
                headers: headers
            });
        }
        // @ts-ignore
        return await callAndEnsureLogin(request, false)
    }

    return (
        <HouseholdEndpointContext.Provider value={{
            getHouseholds,
            getHouseholdUsers,
            inviteUser,
            saveHouseholdName,
            createNewHousehold,
        }}>
            {children}
        </HouseholdEndpointContext.Provider>
    )
}
