import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faMessage, faMoneyBill,} from "@fortawesome/free-solid-svg-icons";
import {Input} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {ReceiptEndpointFunctions} from "../../dist/endpoints/ReceiptEndpoint";
import getDateToShow from "../utils/Utils";
import Paper from '@mui/material/Paper';
import ItemDataGrid from "../items/ItemDataGrid";
import {ReceiptData} from "../states/ReceiptState";
import {HouseholdData} from "../states/HouseholdState";


export default function SingleReceipt(props) {
    let receiptData = ReceiptData()
    const {selectedHousehold} = HouseholdData()

    const {updateReceipt, createNewItem} = ReceiptEndpointFunctions()

    const [receipt, setReceipt] = useState({
        id: -1,
        name: "",
        dateOfPurchase: new Date(),
        items: [],
        totalCost: 0,
    })
    const isEditable = props.isEditable || false


    useEffect(() => {
        setReceipt({...receiptData.receipt})
    }, [receiptData.receipt]);

    const insertItem = async (e) => {
        const item = await createNewItem(selectedHousehold.id, receipt.id)
        await saveItems([...receipt.items, item])
        return item
    }

    const calculateTotalCost = (items) => {
        let sum = 0
        for (let item of items) {
            sum += item.totalCost
        }
        return sum
    }

    const onChange = (e) => {
        const {name, value} = e.target;
        setReceipt(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const saveItems = async (items) => {
        const updatedReceipt = {
            ...receipt,
            items: items,
            totalCost: calculateTotalCost(items)
        }
        console.log("saveItems")
        console.log(items)
        console.log(updatedReceipt)

        setReceipt(updatedReceipt)
        await update(updatedReceipt)
    }
    const update = async (updatedReceipt) => {
        console.log("update Receipt")
        await updateReceipt(selectedHousehold.id, updatedReceipt)
        console.log("receiptData.setReceipt")
        receiptData.setReceipt({
            ...updatedReceipt
        })
    }


    return (
        <div className={"flex flex-col"}>
            <Paper elevation={12} className="px-10 py-6 m-5">
                <div>
                    <ReceiptHeader receipt={receipt} isEditable={isEditable} onChange={onChange}/>
                    <ItemDataGrid receipt={receipt} items={receipt.items} saveItems={saveItems}
                                  categories={receipt.categories}
                                  insertItem={insertItem} isEditable={isEditable}
                    />
                </div>
            </Paper>
        </div>
    )
}

function ReceiptHeader(props) {
    const receipt = props.receipt
    let isEditable = props.isEditable || false
    const onChange = props.onChange


    return (
        <>
            {
                (isEditable)
                    ?
                    <>
                        <FontAwesomeIcon className={"pr-2"} icon={faMessage} color={"Dodgerblue"}/>
                        <Input
                            multiline={true}
                            autoFocus={true}
                            placeholder="Name"
                            value={receipt.name}
                            name={"name"}
                            onChange={onChange}
                        />
                        <br/>
                        <FontAwesomeIcon className={"pr-2"} icon={faCalendar}/>
                        <Input
                            type="date"
                            placeholder="Date Of Purchase"
                            name={"dateOfPurchase"}
                            value={getDateToShow(receipt.dateOfPurchase)}
                            onChange={onChange}
                        />
                        <br/>
                        <p>
                            <FontAwesomeIcon className={"pr-2"} icon={faMoneyBill} color={"green"}/>
                            {receipt.totalCost}
                        </p>
                        <br/>
                    </>
                    :
                    <>
                        <p><FontAwesomeIcon icon={faMessage} color={"Dodgerblue"}/> {receipt.name}</p>
                        <p><FontAwesomeIcon icon={faCalendar}/> {new Date(receipt.dateOfPurchase).toLocaleDateString()}
                        </p>
                        <p><FontAwesomeIcon icon={faMoneyBill} color={"green"}/> {receipt.totalCost + " "}</p>
                    </>
            }

        </>
    )
}