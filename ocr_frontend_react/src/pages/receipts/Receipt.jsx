import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEye, faMessage, faMoneyBill, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@mui/material";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import Item from "./items/Item";


export default function Receipts(props)
{
    const navigate = useNavigate()
    return(props.receipts?.map((receipt)=>
    {
        return  (
            <div className="px-10 py-6 m-5 bg-blue-50 shadow rounded">
                <p className={"text-black"}><FontAwesomeIcon icon={faMessage} color={"Dodgerblue"}/> {receipt.description}</p>
                <p className={"text-black"}><FontAwesomeIcon icon={faCalendar}/> {new Date(receipt.dateOfPurchase).toLocaleDateString()}</p>
                <p className={"text-black"}><FontAwesomeIcon icon={faMoneyBill} color={"green"} /> {receipt.totalCost+" "}</p>

                {props.showItems===true&&<Item items={receipt.items}/>}

                <Button onClick={()=>{navigate("/receipts/"+receipt.id)}}>
                    <FontAwesomeIcon icon={faEye} width={30}/>
                </Button>
                <Button className={"text-green-600"} onClick={()=>{navigate("/update/receipts/"+receipt.id)}}>
                    <FontAwesomeIcon icon={faPenToSquare} width={28} color={"green"}/>
                </Button>
                <Button className={"text-red-700"} onClick={()=>{navigate("/delete/receipts/"+receipt.id)}}>
                    <FontAwesomeIcon icon={faTrashCan} width={25} color={"red"}/>
                </Button>
            </div>)
    })
    )
}