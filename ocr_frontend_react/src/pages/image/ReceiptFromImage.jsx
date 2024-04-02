import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSingleReceipt} from "../../components/utils/BackendAccess";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileArrowUp, faPlus} from "@fortawesome/free-solid-svg-icons";
import SingleReceipt from "../../components/receipts/SingleReceipt";
import * as React from "react";

export default function ReceiptsFromImagePage(props) {

    const navigate = useNavigate();
    const [receipt,setReceipt] = useState({
        items:[]
    })
    const [responseToShow,setResponseToShow] = useState("extractedItems")

    useEffect(()=>{
        getSingleReceipt(props.response.newReceiptId).then((newReceipt)=>{
            setReceipt(newReceipt)
        })
    },[])


    return (
            <div className="flex flex-row w-2/3">
                <div className="flex flex-row flex-wrap w-1/2">
                    <SingleReceipt receipt={receipt} setReceipt={setReceipt}/>
                </div>
                <div className="w-1/2 px-10 py-6 m-5 bg-blue-50 shadow rounded">
                    <OcrResponseView responseToShow={responseToShow} setResponseToShow={setResponseToShow} response={props.response}></OcrResponseView>
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
                    <MenuItem value={"plainText"}>Plain OCR Text</MenuItem>
                    <MenuItem value={"filteredReceipt"}>Filtered Receipt</MenuItem>
                    <MenuItem value={"extractedItems"}>Extracted Items</MenuItem>
                </Select>
            </FormControl>
            {
                props.response[props.responseToShow].map((item)=><p>{item}</p>)
            }
        </div>
    )
}