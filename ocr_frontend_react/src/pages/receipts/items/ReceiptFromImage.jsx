import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getReceipts} from "../../utils/BackendAccess";
import MainSection from "../../utils/MainSection";
import {Button} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileArrowUp, faPlus} from "@fortawesome/free-solid-svg-icons";
import EditableReceipt from "../Receipt";
import * as React from "react";

export default function ReceiptsFromImagePage() {

    const navigate = useNavigate();
    const [receipts,setReceipts] = useState([])

    useEffect(()=>{
        getReceipts().then((data)=>{{
            setReceipts(data)
        }})
    },[])


    return (
        <MainSection>
            <div className="flex flex-row">
                <EditableReceipt receipts={receipts}/>
                <div>TODO("Final Output, Filtered Output, Plain Output")</div>
                <div>TODO("Image")</div>
            </div>
        </MainSection>
    );
}