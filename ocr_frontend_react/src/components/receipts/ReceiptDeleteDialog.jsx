import {Button, Dialog} from "@mui/material";
import * as React from "react";
import {ReceiptData} from "../states/ReceiptState";
import {deleteReceipts} from "../../dist/endpoints/ReceiptEndpoint";
import {HouseholdData} from "../states/HouseholdState";


export default function ReceiptDeleteDialog({open, close, receiptId}) {
    const {selectedHousehold} = HouseholdData()
    let receiptData = ReceiptData()
    const receiptToDeleteId = receiptId || -1
    const isOpen = open || false

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={close}
            >
                <div className={"p-5"}>
                    <p>
                        Are You sure you would like to delete this Receipt?
                    </p>
                    <br/>
                    <Button color={"error"} onClick={() => {
                        deleteReceipts(selectedHousehold.id, receiptToDeleteId).then(() => {
                            close()
                            receiptData.updateAllReceipt()
                        })
                    }}>Delete</Button>
                    <Button onClick={() => close()}>Back</Button>
                </div>
            </Dialog>
        </>
    )
}