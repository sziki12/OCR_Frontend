import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSingleReceipt} from "../../dist/endpoints/ReceiptEndpoint";
import SingleReceipt from "../../components/receipts/SingleReceipt";
import * as React from "react";
import OcrResponseView from "../../components/ocr_response/OcrResponseView"
import {HouseholdData} from "../../components/states/HouseholdState";


export default function ReceiptsFromImagePage(props) {

    const navigate = useNavigate();
    const {selectedHousehold} = HouseholdData()
    const [receipt,setReceipt] = useState({
        items:[]
    })
    const [responseToShow,setResponseToShow] = useState("extractedItems")

    useEffect(()=>{
        getSingleReceipt(selectedHousehold.id, props.response.newReceiptId).then((newReceipt)=>{
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



