import {FormControl, InputLabel, MenuItem, Paper, Select} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {OcrResponseData} from "../states/OcrResponseState";

export default function OcrResponseView()
{
    const ocrResponseData = OcrResponseData()
    const [response,setResponse] = useState({})

    useEffect(() => {
        setResponse(ocrResponseData.ocrResponse)
    }, [ocrResponseData.ocrResponse]);
    const [responseToShow,setResponseToShow] = useState("extractedItems")
    //console.log(response)
    return (
        <Paper className="px-10 py-6 m-5">
            <FormControl>
                <InputLabel id="ocr-response-select-label">OCR Response</InputLabel>
                <Select
                    labelId="ocr-response-select-label"
                    id="ocr-response-select"
                    value={responseToShow}
                    label="OCR Response"
                    onChange={(event)=>{setResponseToShow(event.target.value)}}
                >
                    <MenuItem value={"plainText"}>Plain OCR Text</MenuItem>
                    <MenuItem value={"filteredReceipt"}>Filtered Receipt</MenuItem>
                    <MenuItem value={"extractedItems"}>Extracted Items</MenuItem>
                </Select>
            </FormControl>
            {
                (response&&response[responseToShow])
                ?
                    response[responseToShow].map((item)=><p>{item}</p>)
                :
                    <></>
            }
        </Paper>
    )
}