import {useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faFloppyDisk, faMessage, faMoneyBill,faPlus} from "@fortawesome/free-solid-svg-icons";
import Item from "../items/Item";
import {Button,Input} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {getSingleReceipt, updateReceipt,createNewItem} from "../utils/BackendAccess";
import EditableItem from "../items/EditableItem";
import getDateToShow from "../utils/DateConverter";
import Paper from '@mui/material/Paper';
import ItemDataGrid from "../items/ItemDataGrid";


export default function EditableReceipt(props) {
    const navigate = useNavigate();
    const [receipt, setReceipt] = useState({
        description:"",
        dateOfPurchase:new Date(),
        items:[],
        totalCost:0,
    })

    useEffect(() => {
        setReceipt({...props.receipt})
    }, [props.receipt]);



    const onChange = (e) => {
        const { name, value } = e.target;
        setReceipt(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const insertItem = async (e) => {
        const item = await createNewItem(receipt.id)
        await saveItems([...receipt.items, item])
        return item
    }

    const saveItems = async (items) => {
        const updatedReceipt = {
            ...receipt,
            items: items
        }
        setReceipt(updatedReceipt)
        await update(updatedReceipt)
    }
    const update = async(updatedReceipt) => {
        //e.preventDefault()
        await updateReceipt(updatedReceipt.id,updatedReceipt.description,updatedReceipt.dateOfPurchase,updatedReceipt.items)
        props.setReceipt({
            ...updatedReceipt
        })
    }

    return(<Paper elevation={12} className="px-10 py-6 m-5 bg-blue-50">
            <div>
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
                <ItemDataGrid insertItem={insertItem} items={receipt.items} saveItems={saveItems}></ItemDataGrid>
            </div>
        </Paper>
    )
}