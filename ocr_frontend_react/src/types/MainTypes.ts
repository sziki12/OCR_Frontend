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

export type Receipt = { dateOfPurchase: Date, name: string, items: [Item], pending: boolean }

export type Place = { id: string, name: string, lat: number, lng: number, validated: boolean }

export type Item = { id: string, name: string, quantity: number, totalCost: number, category: Category }
