import ReceiptToggleEditableWrapper from "../receipts/ReceiptToggleEditableWrapper";
import * as React from "react";
import ReceiptImageList from "../images/ReceiptImageList";


export default function ReceiptImageTab()
{

    return(<div className={"flex flex-row justify-between"}>
            <div className="flex flex-row flex-wrap h-1/2">
                <ReceiptToggleEditableWrapper/>
            </div>
            <div className="w-1/2 px-10 py-6 m-5 bg-blue-50 shadow rounded">
                {
                    <ReceiptImageList/>
                }
            </div>
        </div>)
}