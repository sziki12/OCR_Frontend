import {createContext, useContext, useEffect, useState} from "react";
import {ReceiptEndpointFunctions} from "../../dist/endpoints/ReceiptEndpoint"
import {ItemEndpointFunctions} from "../../dist/endpoints/ItemEndpoint"
import {useParams} from "react-router-dom";
import {HouseholdData} from "./HouseholdState";
import {AuthData} from "../handlers/LoginHandler";

const ReceiptContext = createContext(
    {}
);

export const ReceiptData = () => useContext(ReceiptContext)

export default function ReceiptState({children}) {
    const {selectedHousehold} = HouseholdData()
    const {user} = AuthData()
    const {getSingleReceipt, getReceipts} = ReceiptEndpointFunctions()
    const {getItemCategories} = ItemEndpointFunctions()

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
                //console.log({...prev, ...data})
                return {...prev, ...data}
            })
        })
        getItemCategories(selectedHousehold.id).then((categories) => {
            setReceipt((prev) => {
                //console.log({...prev, categories: categories})
                return {...prev, categories: categories}
            })
        })
    }

    const updateAllReceipt = () => {
        getReceipts(selectedHousehold.id).then((data) => {
            console.log(data)
            if (data&&data.length > 0)
                setAllReceipt([...data])
            else
                setAllReceipt([])
        })
    }

    useEffect(() => {
        if(user.isAuthenticated){
            updateAllReceipt()
            if (params.receiptId)
                updateReceipt(params.receiptId)
        }
    }, [user.isAuthenticated])

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