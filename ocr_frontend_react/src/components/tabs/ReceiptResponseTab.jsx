import SingleReceipt from "../receipts/SingleReceipt";
import OcrResponseView from "../ocr_response/OcrResponseView";
import * as React from "react";
import ReceiptToggleEditableWrapper from "../receipts/ReceiptToggleEditableWrapper";


export default function ReceiptResponseTab(props)
{

    return(<>
        <div className="flex flex-row flex-wrap w-1/2">
            <ReceiptToggleEditableWrapper/>
        </div>
        <div className="w-1/2 px-10 py-6 m-5 bg-blue-50 shadow rounded">
            {
               //<OcrResponseView responseToShow={responseToShow} setResponseToShow={setResponseToShow} response={props.response}></OcrResponseView>
            }
        </div>
    </>)
}