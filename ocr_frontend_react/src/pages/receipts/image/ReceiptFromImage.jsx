import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getReceipts} from "../../utils/BackendAccess";
import MainSection from "../../utils/MainSection";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileArrowUp, faPlus} from "@fortawesome/free-solid-svg-icons";
import EditableReceipt from "../EditableReceipt";
import * as React from "react";

export default function ReceiptsFromImagePage() {

    const navigate = useNavigate();
    const [receipts,setReceipts] = useState([])
    const [responseToShow,setResponseToShow] = useState(3)

    useEffect(()=>{
        getReceipts().then((data)=>{{
            setReceipts(data)
        }})
    },[])


    return (
            <div className="flex flex-row w-2/3">
                <div className="flex flex-row flex-wrap w-1/2">
                    <EditableReceipt receipts={receipts}/>
                </div>
                <div className="w-1/2
                px-10 py-6 m-5 bg-blue-50 shadow rounded">
                    <OcrResponseView responseToShow={responseToShow} setResponseToShow={setResponseToShow}></OcrResponseView>
                </div>

            </div>
    );
}



function OcrResponseView(props)
{
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="ocr-response-select-label">OCR Response</InputLabel>
                <Select
                    labelId="ocr-response-select-label"
                    id="ocr-response-select"
                    value={props.responseToShow}
                    label="OCR Response"
                    onChange={(event)=>{props.setResponseToShow(event.target.value)}}
                >
                    <MenuItem value={1}>Plain OCR Text</MenuItem>
                    <MenuItem value={2}>Filtered Text</MenuItem>
                    <MenuItem value={3}>Processed Receipt</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}