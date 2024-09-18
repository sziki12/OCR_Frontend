import ReceiptToggleEditableWrapper from "../receipts/ReceiptToggleEditableWrapper";
import * as React from "react";
import ReceiptImageList from "../images/ReceiptImageList";
import {Paper} from "@mui/material";
import {ThemeData} from "../handlers/ThemeHandler";


export default function ReceiptImageTab()
{
    const {breakpoints} = ThemeData();
    const isSmall = breakpoints.sm||breakpoints.md||breakpoints.lg
    return(<div className={`flex flex-${(isSmall)?("col"):("row")} justify-between`}>
            <div>
                <ReceiptToggleEditableWrapper/>
            </div>
            <Paper className="px-10 py-6 m-5">
                {
                    <ReceiptImageList/>
                }
            </Paper>
        </div>)
}