import * as React from 'react';
import {Button} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus,faFileArrowUp,} from '@fortawesome/free-solid-svg-icons'
import MainSection from "../../components/utils/MainSection";
import {useEffect, useState} from "react";
import AllReceipts from "../../components/receipts/AllReceipts";
import {useNavigate} from "react-router-dom";
import {getReceipts} from "../../components/utils/BackendAccess";

export default function ReceiptsPage() {

    const navigate = useNavigate();
    const [receipts,setReceipts] = useState([])

    useEffect(()=>{
        getReceipts().then((data)=>{{
            setReceipts(data)
        }})
    },[])


    return (
        <>
            <Button onClick={()=>{navigate("/create/receipts")}}><FontAwesomeIcon icon={faPlus}  size={"xl"}/></Button>
            <Button onClick={()=>{navigate("/upload/image")}}><FontAwesomeIcon icon={faFileArrowUp}  size={"xl"}/></Button>
            <div className="flex flex-wrap flex-row">
                <AllReceipts receipts={receipts}/>
            </div>
        </>
    );
}
