import * as React from 'react';
import {Button} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faPenToSquare, faTrashCan,faMoneyBill,faCalendar,faMessage,} from '@fortawesome/free-solid-svg-icons'
import MainSection from "../utils/MainSection";
import {useEffect, useState} from "react";
import {green} from "@mui/material/colors";
import Receipts from "./Receipt";

async function getReceipts() {
    let receiptsRequest = await fetch("http://localhost:8080/api/receipt",
        {
            cache: "no-store"
        })

    return await receiptsRequest.json()
}

export default function ReceiptsPage() {

    const [receipts,setReceipts] = useState([])

    getReceipts().then((data)=>{{
        setReceipts(data)
    }})


    return (
        <MainSection>
            <p>Receipts</p>
            <div className="flex flex-wrap flex-row">
                <Receipts receipts={[receipts]}/>
            </div>
        </MainSection>
    );
}
