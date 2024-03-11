import {useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faFloppyDisk, faMessage, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import Item from "./items/Item";
import {Button} from "@mui/material";
import * as React from "react";
import {useEffect} from "react";
import {getSingleReceipt, updateReceipt} from "../utils/BackendAccess";
import EditableItem from "./items/EditableItem";


export default function EditableReceipt(props) {

    const navigate = useNavigate();

    const receipt = props.receipt || props.receipts?.[0] || {}

    const update = async(e) => {
        e.preventDefault()

        await updateReceipt(receipt.id,receipt.description,receipt.dateOfPurchase)

        navigate("/receipts/"+receipt.id)
    }
    return(<div className="px-10 py-6 m-5 bg-blue-50 shadow rounded">
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

                <form>
                    <textarea
                        cols={30}
                        rows={4}
                        autoFocus={true}
                        className={"text-black"}
                        placeholder="Description"
                        value={receipt.description}
                        onChange={(e) => {receipt.description = e.target.value}}
                    />
                    <br/>
                    <input
                        className={"text-black"}
                        type="date"
                        placeholder="Date Of Purchase"
                        value={getDateToShow(receipt.dateOfPurchase)}
                        onChange={(e) => {receipt.dateOfPurcahse = e.target.value}}
                    />
                    <br></br>
                    <EditableItem items={receipt.items}></EditableItem>
                </form>

                {props.showItems === true && <Item items={receipt.items}/>}

                    <Button onClick={update}>
                        <FontAwesomeIcon icon={faFloppyDisk} size={"xl"}/>
                    </Button>
            </div>
    )
}

function getDateToShow(dateOfPurchase)
{
    const date = new Date(dateOfPurchase)
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    return year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day)
}