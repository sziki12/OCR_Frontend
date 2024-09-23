import * as React from "react";
import ReceiptTab from "../../components/tabs/ReceiptTab";
import ReceiptState from "../../components/states/ReceiptState";
import PlaceState from "../../components/states/PlaceState";


export default function ReceiptMainPage() {
    return (
        <>
            <PlaceState>
                <ReceiptState>
                    <ReceiptTab/>
                </ReceiptState>
            </PlaceState>
        </>

    )
}