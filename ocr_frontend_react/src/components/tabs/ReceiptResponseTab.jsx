import SingleReceipt from "../receipts/SingleReceipt";
import OcrResponseView from "../ocr_response/OcrResponseView";
import * as React from "react";
import ReceiptToggleEditableWrapper from "../receipts/ReceiptToggleEditableWrapper";
import OcrResponseState, {OcrResponseData} from "../states/OcrResponseState"


export default function ReceiptResponseTab()
{
    const ocrResponseData = OcrResponseData()
    return(<>
        <OcrResponseState>
            <div className={"flex flex-row justify-between"}>
                <div className="h-1/2">
                    <ReceiptToggleEditableWrapper/>
                </div>
                <div className="w-1/2 bg-blue-50">
                    {
                        <OcrResponseView/>
                    }
                </div>
            </div>
        </OcrResponseState>
    </>)
}