import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEye, faMessage, faMoneyBill, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@mui/material";
import * as React from "react";

export default function Receipts(props)
{
    console.log(props)
    return(props.receipts?.map((receipt)=>
    {
        return  (
            <div className="px-10 py-6 m-5 bg-blue-50 shadow rounded">
                <p className={"text-black"}><FontAwesomeIcon icon={faMessage} color={"Dodgerblue"}/> {receipt.description}</p>
                <p className={"text-black"}><FontAwesomeIcon icon={faCalendar}/> {new Date(receipt.dateOfPurchase).toLocaleDateString()}</p>
                <p className={"text-black"}><FontAwesomeIcon icon={faMoneyBill} color={"green"} /> {receipt.totalCost+" "}</p>

                <Button href={"receipts/"+receipt.id}><FontAwesomeIcon icon={faEye} width={30}/></Button>
                <Button className={"text-green-600"} href={"receipts/"+receipt.id+"/edit"}><FontAwesomeIcon icon={faPenToSquare} width={28}/></Button>
                <Button className={"text-red-700"} href={"receipts/"+receipt.id+"/delete"}> <FontAwesomeIcon icon={faTrashCan} width={25}/></Button>
            </div>)
    })
    )
}