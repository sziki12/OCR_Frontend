import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import * as React from "react";

export default function OcrResponseView(props)
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