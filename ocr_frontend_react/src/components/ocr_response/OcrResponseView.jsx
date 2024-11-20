import {FormControl, InputLabel, MenuItem, Paper, Select} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {OcrResponseData} from "../states/OcrResponseState";

export default function OcrResponseView() {
    const {ocrResponse} = OcrResponseData()
    const [response, setResponse] = useState({})

    useEffect(() => {
        setResponse(ocrResponse)
    }, [ocrResponse]);
    const [responseToShow, setResponseToShow] = useState("receiptText")
    //console.log(response)
    return (
        <Paper className="px-10 py-6 m-5 flex-grow">
            <FormControl>
                <InputLabel id="ocr-response-select-label">OCR Response</InputLabel>
                <Select
                    labelId="ocr-response-select-label"
                    id="ocr-response-select"
                    value={responseToShow}
                    label="OCR Response"
                    onChange={(event) => {
                        setResponseToShow(event.target.value)
                    }}
                >
                    <MenuItem value={"receiptText"}>Plain OCR Text</MenuItem>
                </Select>
            </FormControl>
            {
                (response && response[responseToShow])
                    ?
                    response[responseToShow].split("\n").map((item) => <p>{item}</p>)
                    :
                    <></>
            }
        </Paper>
    )
}