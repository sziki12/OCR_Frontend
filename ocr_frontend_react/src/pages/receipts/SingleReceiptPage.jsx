import * as React from 'react';
import {Button} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faPenToSquare, faTrashCan,faMoneyBill,faCalendar,faMessage,} from '@fortawesome/free-solid-svg-icons'
import MainSection from "../utils/MainSection";
import {useEffect, useState} from "react";
import {green} from "@mui/material/colors";
import {useParams} from "react-router-dom";
import Receipts from "./Receipt";
import {getSingleReceipt} from "../utils/BackendAccess";


export default function ReceiptsPage() {

    const params = useParams()

    const receiptId = params.receiptId

    const [receipts,setReceipts] = useState([])

    useEffect(()=>{
        getSingleReceipt(receiptId).then((data)=>{{
            setReceipts(data)
        }})
    },[])


    return (
        <MainSection>
            <p>Receipts</p>
            <div className="flex flex-wrap flex-row">
                <Receipts showItems={true} receipts={[receipts]}/>
            </div>
        </MainSection>
    );
}
