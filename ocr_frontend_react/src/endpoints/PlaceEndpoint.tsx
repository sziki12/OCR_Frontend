import {AuthServiceFunctions} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {Place} from "../types/MainTypes";
import React, {createContext, useContext} from "react";


const PlaceEndpointContext: React.Context<any> = createContext(
    {
        getPlaces:async(householdId: string):Promise<any>=>{},
        createPlace:async(householdId: string, place: Place):Promise<any>=>{},
        updatePlace:async(householdId: string, place: Place):Promise<any>=>{},
        assignPlace:async(householdId: string, placeId: string, receiptId: string):Promise<any>=>{},
        removePlace:async(householdId: string, receiptId: string):Promise<any>=>{},
    }
);
export const PlaceEndpointFunctions = () => useContext(PlaceEndpointContext)
export default function PlaceEndpoint({children}) {
    const {callAndEnsureLogin} = AuthServiceFunctions()

    const getPlaces = async(householdId: string) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId)}`;
            const response = await fetch(url, {
                method: `GET`,
                headers: headers,
            });

            return await response.json()
        }
        return await callAndEnsureLogin(request, false)
    }

    const createPlace = async(householdId: string, place: Place) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId)}/create`;
            return await fetch(url, {
                method: `POST`,
                body: JSON.stringify(place),
                headers: headers
            })
        }
        return await callAndEnsureLogin(request, true)
    }

    const updatePlace = async(householdId: string, place: Place) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId)}/update`;
            return await fetch(url, {
                method: `POST`,
                body: JSON.stringify(place),
                headers: headers
            })
        }
        return await callAndEnsureLogin(request, true)
    }

    const assignPlace = async(householdId: string, placeId: string, receiptId: string) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId)}/${placeId}/to/${receiptId}`;
            await fetch(url, {
                method: `PUT`,
                headers: headers
            })
        }
        return await callAndEnsureLogin(request, false)
    }

    const removePlace = async(householdId: string, receiptId: string) => {
        let request = async (headers) => {
            const url = `${getBaseAddress(householdId)}/remove/${receiptId}`;
            await fetch(url, {
                method: `PUT`,
                headers: headers
            })
        }
        return await callAndEnsureLogin(request, false)
    }

    return (
        <PlaceEndpointContext.Provider value={{
            getPlaces,
            createPlace,
            updatePlace,
            assignPlace,
            removePlace,
        }}>
            {children}
        </PlaceEndpointContext.Provider>
    )
}

function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/place`
}

