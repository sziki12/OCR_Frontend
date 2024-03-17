import {useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faFloppyDisk, faMessage, faMoneyBill,faPlus} from "@fortawesome/free-solid-svg-icons";
import Item from "../items/Item";
import {Button,Input} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {getSingleReceipt, updateReceipt,createNewItem} from "../../pages/utils/BackendAccess";
import EditableItem from "../items/EditableItem";
import getDateToShow from "../../pages/utils/DateConverter";
import Paper from '@mui/material/Paper';


export default function EditableReceipt(props) {
    const navigate = useNavigate();

    const receiptData = props.receipt || props.receipts?.[0] || {
        description:"",
        dateOfPurchase:new Date(),
        items:[],
        totalCost:0
    }
    const [receipt, setReceipt] = useState({
        description:receiptData.description,
        dateOfPurchase:receiptData.dateOfPurchase,
        items:receiptData.items,
        totalCost:receiptData.totalCost
    })

    useEffect(() => {
        setReceipt({
            id:receiptData.id,
            description:receiptData.description,
            dateOfPurchase:receiptData.dateOfPurchase,
            items:receiptData.items,
            totalCost:receiptData.totalCost
        })
    }, [receiptData]);



    const onChange = (e) => {
        const { name, value } = e.target;
        setReceipt(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const insertItem = async (e) => {
        const item = await createNewItem(receipt.id)
        saveItems([...receipt.items, item])
    }

    const saveItems = (items)=> {
        setReceipt({
            ...receipt,
            items:items
        })
    }
    const update = async(e) => {
        e.preventDefault()
        await updateReceipt(receipt.id,receipt.description,receipt.dateOfPurchase,receipt.items)
        navigate("/receipts/"+receipt.id)
    }

    return(<Paper elevation={12} className="px-10 py-6 m-5 bg-blue-50">
                <p className={"text-black"}>
                    <FontAwesomeIcon icon={faMessage} color={"Dodgerblue"}/>
                    {receipt.description}
                </p>
                <p className={"text-black"}>
                    <FontAwesomeIcon icon={faCalendar}/>
                    {new Date(receipt.dateOfPurchase).toLocaleDateString()}
                </p>
                <p className={"text-black"}>
                    <FontAwesomeIcon icon={faMoneyBill} color={"green"}/>
                    {receipt.totalCost + " "}
                </p>

                <div>
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
                    <Input
                        className={"text-black"}
                        type="date"
                        placeholder="Date Of Purchase"
                        name={"dateOfPurchase"}
                        value={getDateToShow(receipt.dateOfPurchase)}
                        onChange={onChange}
                    />
                    <br></br>
                    <EditableItem receiptId={receipt.id} items={receipt.items} saveItems={saveItems}></EditableItem>
                </div>
                    <Button onClick={update}>
                        <FontAwesomeIcon icon={faFloppyDisk} size={"xl"}/>
                    </Button>
                    <Button onClick={insertItem}>
                        <FontAwesomeIcon icon={faPlus}  size={"xl"}/>
                    </Button>
            </Paper>
    )
}