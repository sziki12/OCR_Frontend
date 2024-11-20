import {List} from "postcss/lib/list";

export enum Category {
    Housing = "Housing",
    Clothing = "Clothing",
    Food = "Food",
    Personal = "Personal",
    Utilities = "Utilities",
    Household = "Household",
    Entertainment = "Entertainment",
    Other = "Other",
    Undefined = "Undefined"
}

export type OcrResponse = {}

export type Receipt = {
    id: string,
    dateOfPurchase: Date,
    name: string,
    items: [ReceiptItem],
    pending: boolean,
    place: ReceiptPlace
}

export type CreateReceiptRequest = {
    id: string,
    dateOfPurchase: Date,
    name: string,
    items: [ReceiptItem],
    pending: boolean
}

export type Household = { id: string }

export type Place = {
    id: string,
    name: string,
    description: string,
    lat: number,
    lng: number,
    validated: boolean,
    receipts: [Receipt]
}

export type ReceiptPlace = {
    id: string,
    name: string,
    description: string,
    lat: number,
    lng: number,
    validated: boolean
}

export type CreatePlaceRequest = { name: string, lat: number, lng: number, }

export type ReceiptItem = { id: string, name: string, quantity: number, totalCost: number, category: Category }


export type User = { name: string, email: string, tokens: TokenData, salt: string }

export type TokenData = { authToken: string, refreshToken: string }

export type LoginUser = { name: string, email: string, password: string, salt: string }

export type EmailSalt = { email: string, salt: string }

export type OcrQuery = {
    ocrType: "tesseract" | "paddle";
    orientation: "portrait" | "landscape";
    parseModel: "gpt-4o" | "gpt-4o-mini" | "llama";
}

export type HouseholdUser = {
    id: string,
    name: string,
    email: string,
    isAdmin: boolean
}
export type HouseholdUsers = {
    currentUser:HouseholdUser,
    otherUsers:[HouseholdUser]
}