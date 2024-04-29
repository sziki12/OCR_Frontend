import {createContext, useContext, useEffect, useState} from "react";
import {getSingleReceipt,getReceipts} from "../utils/BackendAccess"
import {useParams} from "react-router-dom";


const ReceiptContext = createContext(
    {}
);

export const ReceiptData =  ()=> useContext(ReceiptContext)

export default function ReceiptState({children})
{
    const params = useParams()
    const [receipt,setReceipt] = useState({
        id:-1,
        name:"",
        dateOfPurchase:new Date(),
        items:[],
        totalCost:0
    })

    const [allReceipt,setAllReceipt] = useState([])

    const updateReceipt = (receiptId)=>{
        if(!receiptId)
            return
        getSingleReceipt(receiptId).then((data)=>{
            setReceipt(data)
        })
    }

    const updateAllReceipt = ()=>{
        getReceipts().then((data)=>{
            setAllReceipt([...data])
        })
    }

    useEffect(()=>{
        updateAllReceipt()
        if(params.receiptId)
            updateReceipt(params.receiptId)
    },[])

    return(
        <ReceiptContext.Provider value = {{
            receipt:receipt,
            allReceipt:allReceipt,
            setReceipt:setReceipt,
            setAllReceipt:setAllReceipt,
            updateReceipt:updateReceipt,
            updateAllReceipt:updateAllReceipt
        }}>
            {children}
        </ReceiptContext.Provider>
    )
}