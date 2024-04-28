import SingleReceipt from "../receipts/SingleReceipt";
import GoogleMap from "../maps/GoogleMap";
import * as React from "react";
import {Switch} from "@mui/material";
import {useEffect, useState} from "react";
import ReceiptToggleEditableWrapper from "../receipts/ReceiptToggleEditableWrapper";
import {assignPlace, getPlaces, getSingleReceipt} from "../utils/BackendAccess";
import {useNavigate, useParams} from "react-router-dom";


export default function ReceiptPlaceTab(props)
{
    const params = useParams()

    const receiptId = params.receiptId

    const [receipt,setReceipt] = useState({
        description:"",
        dateOfPurchase:new Date(),
        items:[],
        totalCost:0
    })

    const [places,setPlaces] = useState([])

    const updateState = ()=>
    {
        getSingleReceipt(receiptId).then((data)=>{{
            setReceipt(data)
        }})
        getPlaces().then((data)=>{
            setPlaces(data)
        })
    }

    const handlePlaceSelect = async (placeId) => {

        updateState()
    }

    useEffect(()=>{
        updateState()
    },[])


    return(<>
        <ReceiptToggleEditableWrapper receipt={receipt} setReceipt={setReceipt}>
            <GoogleMap places={places} canCreateMarker={false} inSelectMode={true} receiptId={receiptId}/>
        </ReceiptToggleEditableWrapper>
    </>)
}