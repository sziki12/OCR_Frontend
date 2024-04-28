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
import ReceiptTab from "../../components/tabs/ReceiptTab";
import ReceiptState from "../../components/states/ReceiptState";
import PlaceState from "../../components/states/PlaceState";



export default function ReceiptMainPage()
{
    return(
        <>
            <PlaceState>
                <ReceiptState>
                    <ReceiptTab/>
                </ReceiptState>
            </PlaceState>
        </>

    )
}