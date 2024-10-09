import {callAndEnsureLogin, getHeaders} from "../services/AuthService";
// @ts-ignore
import {serverAddress} from "./BackendAccess";
import {Place} from "../types/MainTypes";

function getBaseAddress(householdId: string) {
    return `${serverAddress}/api/household/${householdId}/place`
}

export async function getPlaces(householdId: string) {
    let request = async () => {
        const url = `${getBaseAddress(householdId)}`;
        const response = await fetch(url, {
            method: `GET`,
            headers: getHeaders(false),
        });

        return await response.json()
    }
    return await callAndEnsureLogin(request)
}

export async function createPlace(householdId: string, place: Place) {
    let request = async () => {
        const url = `${getBaseAddress(householdId)}/create`;
        return await fetch(url, {
            method: `POST`,
            body: JSON.stringify(place),
            headers: getHeaders(true)
        })
    }
    return await callAndEnsureLogin(request)
}

export async function updatePlace(householdId: string, place: Place) {
    let request = async () => {
        const url = `${getBaseAddress(householdId)}/update`;
        return await fetch(url, {
            method: `POST`,
            body: JSON.stringify(place),
            headers: getHeaders(true)
        })
    }
    return await callAndEnsureLogin(request)
}

export async function assignPlace(householdId: string, placeId: string, receiptId: string) {
    let request = async () => {
        const url = `${getBaseAddress(householdId)}/${placeId}/to/${receiptId}`;
        await fetch(url, {
            method: `PUT`,
            headers: getHeaders(false)
        })
    }
    return await callAndEnsureLogin(request)
}

export async function removePlace(householdId: string, receiptId: string) {
    let request = async () => {
        const url = `${getBaseAddress(householdId)}/remove/${receiptId}`;
        await fetch(url, {
            method: `PUT`,
            headers: getHeaders(false)
        })
    }
    return await callAndEnsureLogin(request)
}