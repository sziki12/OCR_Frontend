import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faMessage, faMoneyBill,} from "@fortawesome/free-solid-svg-icons";
import {Button,Input} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {updateReceipt,createNewItem} from "../utils/BackendAccess";
import getDateToShow from "../utils/DateConverter";
import Paper from '@mui/material/Paper';
import ItemDataGrid from "../items/ItemDataGrid";
import {ReceiptData} from "../states/ReceiptState";


export default function SingleReceipt(props) {
    let receiptData = ReceiptData()

    const [receipt, setReceipt] = useState({
        id:-1,
        description:"",
        dateOfPurchase:new Date(),
        items:[],
        totalCost:0,
    })
    const isEditable = props.isEditable || false



    useEffect(() => {
        setReceipt({...receiptData.receipt})
    }, [receiptData.receipt]);

    const insertItem = async (e) => {
        const item = await createNewItem(receipt.id)
        await saveItems([...receipt.items, item])
        return item
    }

    const calculateTotalCost = ()=>{
        let sum = 0
        for(let item of receipt.items)
        {
            sum += item.totalCost
        }
        return sum
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setReceipt(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const saveItems = async (items) => {
        const updatedReceipt = {
            ...receipt,
            items: items,
            totalCost: calculateTotalCost()
        }
        setReceipt(updatedReceipt)
    }
    const update = async(updatedReceipt) => {
        await updateReceipt(updatedReceipt.id,updatedReceipt.description,updatedReceipt.dateOfPurchase,updatedReceipt.items)
        receiptData.setReceipt({
            ...updatedReceipt
        })
    }

    return(
        <div className={"flex flex-col"}>
            <Paper elevation={12} className="px-10 py-6 m-5 bg-blue-50">
                <div>
                    <ReceiptHeader receipt={receipt} isEditable={isEditable} onChange={onChange}/>
                    <ItemDataGrid insertItem={insertItem} items={receipt.items} saveItems={saveItems} isEditable={isEditable}></ItemDataGrid>
                </div>
                <div>
                    <Button onClick={()=>update(receipt)}>Submit</Button>
                </div>
            </Paper>
        </div>
    )
}

function ReceiptHeader(props)
{
    const receipt = props.receipt
    let isEditable =  props.isEditable || false
    const onChange = props.onChange


    return(
        <>
            {
                (isEditable)
                ?
                    <>
                        <FontAwesomeIcon className={"pr-2"} icon={faMessage} color={"Dodgerblue"}/>
                        <Input
                            multiline={true}
                            autoFocus={true}
                            className={"text-black"}
                            placeholder="Description"
                            value={receipt.description}
                            name={"description"}
                            onChange={onChange}
                        />
                        <br/>
                        <FontAwesomeIcon className={"pr-2"} icon={faCalendar}/>
                        <Input
                            className={"text-black"}
                            type="date"
                            placeholder="Date Of Purchase"
                            name={"dateOfPurchase"}
                            value={getDateToShow(receipt.dateOfPurchase)}
                            onChange={onChange}
                        />
                        <br/>
                        <p className={"text-black"}>
                            <FontAwesomeIcon className={"pr-2"} icon={faMoneyBill} color={"green"}/>
                            {receipt.totalCost}
                        </p>
                        <br/>
                    </>
                :
                    <>
                        <p className={"text-black"}><FontAwesomeIcon icon={faMessage} color={"Dodgerblue"}/> {receipt.description}</p>
                        <p className={"text-black"}><FontAwesomeIcon icon={faCalendar}/> {new Date(receipt.dateOfPurchase).toLocaleDateString()}</p>
                        <p className={"text-black"}><FontAwesomeIcon icon={faMoneyBill} color={"green"} /> {receipt.totalCost+" "}</p>
                    </>
            }

        </>
    )
}