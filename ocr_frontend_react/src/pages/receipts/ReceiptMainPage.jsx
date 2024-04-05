import {Button, Switch} from "@mui/material";
import AllReceipts from "../../components/receipts/AllReceipts";
import SingleReceipt from "../../components/receipts/SingleReceipt";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSingleReceipt} from "../../components/utils/BackendAccess";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import GoogleMap from "../../components/maps/GoogleMap";
import {getPlaces} from "../../components/utils/BackendAccess"
import {get} from "axios";
import {assignPlace} from "../../components/utils/BackendAccess"



export default function ReceiptMainPage()
{
    const navigate = useNavigate();
    const params = useParams()

    const receiptId = params.receiptId

    const [receipt,setReceipt] = useState({
        description:"",
        dateOfPurchase:new Date(),
        items:[],
        totalCost:0
    })

    const [viewMode,setViewMode] = useState({mode:"view"})

    const [places,setPlaces] = useState([])


    const handleSwitch = (e)=>{
        setViewMode({
            mode: (viewMode.mode==="view")?"edit":"view"
        })
    }

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
        await assignPlace(placeId, receiptId)
        updateState()
    }

    useEffect(()=>{
        updateState()
    },[])

    return(
        <>
            <div className={"flex flex-row align-middle"}>
                <p>View Mode</p>
                <Switch onChange={handleSwitch}/>
                <p>Edit Mode</p>
            </div>
            <div className={"flex flex-row justify-between flex-grow"}>
                {
                    (viewMode.mode==="view")
                    ?
                        <>
                            <SingleReceipt receipt={receipt} setReceipt={setReceipt}/>
                        </>
                    :
                        <>
                            <SingleReceipt receipt={receipt} setReceipt={setReceipt} isEditable={true}/>
                        </>
                }
                <GoogleMap places={places} canCreateMarker={false} inSelectMode={true} select={handlePlaceSelect} receiptId={receiptId}/>
            </div>
        </>

    )
}