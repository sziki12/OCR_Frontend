import {Button, Dialog, Input} from "@mui/material";
import * as React from "react";
import {ReceiptData} from "../states/ReceiptState";
import { deleteReceipts} from "../utils/BackendAccess";


export default function ReceiptDeleteDialog({open,close,receiptId})
{
    let receiptData = ReceiptData()
    const receiptToDelete = receiptId || -1
    const isOpen = open || false

    return(
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
                <Button color={"error"} onClick={()=>{
                    deleteReceipts(receiptToDelete).then(()=>{
                        close()
                        receiptData.updateAllReceipt()
                    })}}>Delete</Button>
                <Button onClick={()=>close()}>Back</Button>
            </div>
            </Dialog>
        </>
    )
}