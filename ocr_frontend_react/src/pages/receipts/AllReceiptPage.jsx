import * as React from 'react';
import {Button} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus,faFileArrowUp,} from '@fortawesome/free-solid-svg-icons'
import MainSection from "../../components/utils/MainSection";
import {useEffect, useState} from "react";
import AllReceipts from "../../components/receipts/AllReceipts";
import {useNavigate} from "react-router-dom";
import {getReceipts} from "../../components/utils/BackendAccess";
import ReceiptState from "../../components/states/ReceiptState";
import NewReceiptDialog from "../../components/receipts/NewReceiptDialog";

export default function AllReceiptPage() {

    const navigate = useNavigate();
    const [receipts,setReceipts] = useState([])
    const [open,setOpen] = useState(false)

    useEffect(()=>{
        getReceipts().then((data)=>{{
            setReceipts(data)
        }})
    },[])


    return (
        <>
            <Button onClick={()=>{setOpen(true)}}><FontAwesomeIcon icon={faPlus}  size={"xl"}/></Button>
            <Button onClick={()=>{navigate("/upload/image")}}><FontAwesomeIcon icon={faFileArrowUp}  size={"xl"}/></Button>
            <ReceiptState>
                <NewReceiptDialog open={open} close={()=>setOpen(false)}></NewReceiptDialog>
                <div className="flex flex-wrap flex-row">
                    <AllReceipts/>
                </div>
            </ReceiptState>

        </>
    );
}
