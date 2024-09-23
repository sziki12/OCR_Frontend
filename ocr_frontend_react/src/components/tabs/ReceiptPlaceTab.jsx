import GoogleMap from "../maps/GoogleMap";
import * as React from "react";
import {useEffect, useState} from "react";
import ReceiptToggleEditableWrapper from "../receipts/ReceiptToggleEditableWrapper";
import {getPlaces} from "../../endpoints/PlaceEndpoint";
import {getSingleReceipt} from "../../endpoints/ReceiptEndpoint";
import {useParams} from "react-router-dom";


export default function ReceiptPlaceTab(props) {
    const params = useParams()

    const receiptId = params.receiptId

    const [receipt, setReceipt] = useState({
        name: "",
        dateOfPurchase: new Date(),
        items: [],
        totalCost: 0
    })

    const [places, setPlaces] = useState([])

    const updateState = () => {
        getSingleReceipt(receiptId).then((data) => {
            {
                setReceipt(data)
            }
        })
        getPlaces().then((data) => {
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
            <GoogleMap places={places} canCreateMarker={false} inSelectMode={true} receiptId={receiptId}/>
        </ReceiptToggleEditableWrapper>
    </>)
}