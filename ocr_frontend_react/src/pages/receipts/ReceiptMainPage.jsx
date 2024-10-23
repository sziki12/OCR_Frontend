import * as React from "react";
import ReceiptTab from "../../components/tabs/ReceiptTab";
import PlaceState from "../../components/states/PlaceState";


export default function ReceiptMainPage() {
    return (
        <>
            {
            <PlaceState>
                <ReceiptTab/>
            </PlaceState>
            }
        </>
    )
}