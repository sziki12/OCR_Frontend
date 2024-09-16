import ReceiptToggleEditableWrapper from "../receipts/ReceiptToggleEditableWrapper";
import * as React from "react";
import ReceiptImageList from "../images/ReceiptImageList";
import {Paper} from "@mui/material";


export default function ReceiptImageTab()
{

    return(<div className={"flex flex-row justify-between"}>
            <div className="flex flex-row flex-wrap h-1/2">
                <ReceiptToggleEditableWrapper/>
            </div>
            <Paper className="px-10 py-6 m-5">
                {
                    <ReceiptImageList/>
                }
            </Paper>
        </div>)
}