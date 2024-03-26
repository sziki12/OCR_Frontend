import {Button, Switch} from "@mui/material";
import Receipts from "../../components/receipts/Receipt";
import EditableReceipt from "../../components/receipts/EditableReceipt";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSingleReceipt} from "../../components/utils/BackendAccess";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";



export default function ReceiptMainPage()
{
    const navigate = useNavigate();
    const params = useParams()

    const receiptId = params.receiptId

    const [receipt,setReceipt] = useState({})

    const [viewMode,setViewMode] = useState({mode:"view"})

    const handleSwitch = (e)=>{
        setViewMode({
            mode: (viewMode.mode==="view")?"edit":"view"
        })
    }

    useEffect(()=>{
        getSingleReceipt(receiptId).then((data)=>{{
            setReceipt(data)
        }})
    },[])

    return(
        <>
            <div className={"flex flex-row align-middle"}>
                <p>View Mode</p>
                <Switch onChange={handleSwitch}/>
                <p>Edit Mode</p>
            </div>
            <div className="flex flex-wrap flex-row">
                {
                    (viewMode.mode==="view")
                    ?
                        <Receipts showItems={true} receipts={[receipt]}/>
                    :
                        <EditableReceipt receipt={receipt} setReceipt={setReceipt}/>
                }

            </div>
        </>

    )
}