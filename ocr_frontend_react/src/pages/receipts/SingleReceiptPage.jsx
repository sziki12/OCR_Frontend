import * as React from 'react';
import {Button} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPlus,
} from '@fortawesome/free-solid-svg-icons'
import MainSection from "../../components/utils/MainSection";
import {useEffect, useState} from "react";
import {green} from "@mui/material/colors";
import {useNavigate, useParams} from "react-router-dom";
import Receipts from "../../components/receipts/Receipt";
import {getSingleReceipt} from "../../components/utils/BackendAccess";
import ReceiptDataGrid from "./ReceiptDataGrid";


export default function ReceiptsPage() {

    const navigate = useNavigate();
    const params = useParams()

    const receiptId = params.receiptId

    const [receipt,setReceipt] = useState([])

    useEffect(()=>{
        getSingleReceipt(receiptId).then((data)=>{{
            setReceipt(data)
        }})
    },[])


    return (
        <>
            <Button onClick={()=>{navigate("/create/receipts/"+receiptId)}}><FontAwesomeIcon icon={faPlus}  size={"xl"}/></Button>
            <div className="flex flex-wrap flex-row">
                {
                    //<Receipts showItems={true} receipts={[receipts]}/>
                }
                    <ReceiptDataGrid receipt={[receipt]}></ReceiptDataGrid>
            </div>
        </>
    );
}
