import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEye, faMessage, faMoneyBill, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@mui/material";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import Item from "../items/Item";
import Paper from '@mui/material/Paper';
import {ReceiptData} from "../states/ReceiptState";
import {useEffect, useState} from "react";


export default function AllReceipts()
{
    const navigate = useNavigate()
    //TODO Fix Delete Receipt Page
    const receiptLayout = (receipt)=> <>
        <Paper key={receipt.id} elevation={12} className="px-10 py-6 m-5 bg-blue-50">
            <p className={"text-black"}><FontAwesomeIcon icon={faMessage} color={"Dodgerblue"}/> {receipt.description}</p>
            <p className={"text-black"}><FontAwesomeIcon icon={faCalendar}/> {new Date(receipt.dateOfPurchase).toLocaleDateString()}</p>
            <p className={"text-black"}><FontAwesomeIcon icon={faMoneyBill} color={"green"} /> {receipt.totalCost+" "}</p>

            <Button onClick={()=>{navigate("/receipts/"+receipt.id)}}>
                <FontAwesomeIcon icon={faEye} width={30}/>
            </Button>
            <Button className={"text-red-700"} onClick={()=>{navigate("/delete/receipts/"+receipt.id)}}>
                <FontAwesomeIcon icon={faTrashCan} width={25} color={"red"}/>
            </Button>
        </Paper>
    </>

    const pendingLayout = (receipt)=> <>
        <Paper key={receipt.id} elevation={12} className="px-10 py-6 m-5 bg-gray-500">
            <p className={"text-gray-700"}><FontAwesomeIcon icon={faMessage} color={"grey"}/> {receipt.description}</p>
            <p className={"text-gray-700"}><FontAwesomeIcon icon={faCalendar} color={"grey"}/> {new Date(receipt.dateOfPurchase).toLocaleDateString()}</p>
            <p className={"text-gray-700"}><FontAwesomeIcon icon={faMoneyBill} color={"grey"} /> {receipt.totalCost+" "}</p>

            <Button disabled={true} onClick={()=>{navigate("/receipts/"+receipt.id)}}>
                <FontAwesomeIcon icon={faEye} color={"grey"} width={30}/>
            </Button>
            <Button disabled={true} onClick={()=>{navigate("/delete/receipts/"+receipt.id)}}>
                <FontAwesomeIcon icon={faTrashCan} width={25} color={"grey"}/>
            </Button>
        </Paper>
    </>


    const receiptData = ReceiptData()
    const [receipts,setReceipts] = useState({})

    useEffect(() => {
        setReceipts(receiptData.allReceipt)
    }, [receiptData.allReceipt]);

    return(
        <>
            {(receipts.length>0)
                ?
                receipts?.map((receipt)=>
                {
                    return  (
                        (receipt.pending)
                            ?
                            pendingLayout(receipt)
                            :
                            receiptLayout(receipt)
                    )
                })
                :
                <></>
            }
        </>)
}