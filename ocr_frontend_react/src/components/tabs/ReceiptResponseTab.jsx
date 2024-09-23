import OcrResponseView from "../ocr_response/OcrResponseView";
import * as React from "react";
import ReceiptToggleEditableWrapper from "../receipts/ReceiptToggleEditableWrapper";
import OcrResponseState from "../states/OcrResponseState"
import {ThemeData} from "../handlers/ThemeHandler";


export default function ReceiptResponseTab() {
    const {breakpoints} = ThemeData();
    return (<>
        <OcrResponseState>
            <div className={`flex flex-${(breakpoints.sm || breakpoints.md) ? ("col") : ("row")} justify-between`}>
                <div>
                    <ReceiptToggleEditableWrapper/>
                </div>
                <div>
                    {
                        <OcrResponseView/>
                    }
                </div>
            </div>
        </OcrResponseState>
    </>)
}