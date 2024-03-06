import * as React from 'react';
import {Button} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus,faFileArrowUp,} from '@fortawesome/free-solid-svg-icons'
import MainSection from "../utils/MainSection";
import {useEffect, useState} from "react";
import Receipts from "./Receipt";
import {useNavigate} from "react-router-dom";
import {getReceipts} from "../utils/BackendAccess";

export default function ReceiptsPage() {

    const navigate = useNavigate();
    const [receipts,setReceipts] = useState([])

    useEffect(()=>{
        getReceipts().then((data)=>{{
            setReceipts(data)
        }})
    },[])


    return (
        <MainSection>
            <Button onClick={()=>{navigate("/create/receipts")}}><FontAwesomeIcon icon={faPlus}  size={"xl"}/></Button>
            <Button onClick={()=>{navigate("/upload/image")}}><FontAwesomeIcon icon={faFileArrowUp}  size={"xl"}/></Button>
            <div className="flex flex-wrap flex-row">
                <Receipts receipts={receipts}/>
            </div>
        </MainSection>
    );
}
