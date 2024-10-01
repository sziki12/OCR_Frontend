import {createContext, useContext, useEffect, useState} from "react";
import {getSingleReceipt, getReceipts} from "../../dist/endpoints/ReceiptEndpoint"
import {getItemCategories} from "../../dist/endpoints/ItemEndpoint"
import {useParams} from "react-router-dom";
import {HouseholdData} from "./HouseholdState";

const ReceiptContext = createContext(
    {}
);

export const ReceiptData = () => useContext(ReceiptContext)

export default function ReceiptState({children}) {
    const {selectedHousehold} = HouseholdData()
    const params = useParams()
    const [receipt, setReceipt] = useState({
        id: -1,
        name: "",
        dateOfPurchase: new Date(),
        items: [],
        totalCost: 0,
        categories: []
    })

    const [allReceipt, setAllReceipt] = useState([])

    const updateReceipt = (receiptId) => {
        if (!receiptId)
            return
        getSingleReceipt(selectedHousehold.id, receiptId).then((data) => {
            setReceipt((prev) => {
                console.log({...prev, ...data})
                return {...prev, ...data}
            })
        })
        getItemCategories(selectedHousehold.id).then((categories) => {
            setReceipt((prev) => {
                console.log({...prev, categories: categories})
                return {...prev, categories: categories}
            })
        })
    }

    const updateAllReceipt = () => {
        getReceipts(selectedHousehold.id).then((data) => {
            console.log(data)
            if (data.length > 0)
                setAllReceipt([...data])
            else
                setAllReceipt([])
        })
    }

    useEffect(() => {
        updateAllReceipt()
        if (params.receiptId)
            updateReceipt(params.receiptId)
    }, [])

    return (
        <ReceiptContext.Provider value={{
            receipt: receipt,
            allReceipt: allReceipt,
            setReceipt: setReceipt,
            setAllReceipt: setAllReceipt,
            updateReceipt: updateReceipt,
            updateAllReceipt: updateAllReceipt
        }}>
            {children}
        </ReceiptContext.Provider>
    )
}