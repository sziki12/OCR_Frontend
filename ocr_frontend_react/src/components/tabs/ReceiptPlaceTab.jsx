import GoogleMap from "../maps/GoogleMap";
import * as React from "react";
import {useEffect, useState} from "react";
import ReceiptToggleEditableWrapper from "../receipts/ReceiptToggleEditableWrapper";
import {PlaceEndpointFunctions} from "../../dist/endpoints/PlaceEndpoint";
import {ReceiptEndpointFunctions} from "../../dist/endpoints/ReceiptEndpoint";
import {useParams} from "react-router-dom";
import {HouseholdData} from "../states/HouseholdState";


export default function ReceiptPlaceTab(props) {
    const params = useParams()
    const {selectedHousehold} = HouseholdData()
    const {getSingleReceipt} = ReceiptEndpointFunctions()
    const {getPlaces} = PlaceEndpointFunctions()

    const receiptId = params.receiptId

    const [receipt, setReceipt] = useState({
        name: "",
        dateOfPurchase: new Date(),
        items: [],
        totalCost: 0
    })

    const [places, setPlaces] = useState([])

    const updateState = () => {
        getSingleReceipt(selectedHousehold.id, receiptId).then((data) => {
            {
                setReceipt(data)
            }
        })
        getPlaces(selectedHousehold.id).then((data) => {
            setPlaces(data)
        })
    }

    const handlePlaceSelect = async (placeId) => {

        updateState()
    }

    useEffect(() => {
        updateState()
    }, [])


    return (<>
        <ReceiptToggleEditableWrapper receipt={receipt} setReceipt={setReceipt}>
            <GoogleMap places={places} canCreateMarker={false} inAssignMode={true} receiptId={receiptId}/>
        </ReceiptToggleEditableWrapper>
    </>)
}