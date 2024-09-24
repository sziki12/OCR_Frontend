import {Button, Dialog, Input} from "@mui/material";
import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faMessage, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import getDateToShow from "../utils/Utils";
import {ReceiptData} from "../states/ReceiptState";
import {useState} from "react";
import {createReceipt} from "../../dist/endpoints/ReceiptEndpoint";


export default function NewReceiptDialog({open, close}) {
    let receiptData = ReceiptData()

    const [receipt, setReceipt] = useState({
        id: -1,
        name: "",
        dateOfPurchase: new Date(),
        items: [],
        totalCost: 0,
    })

    const onChange = (e) => {
        const {name, value} = e.target;
        setReceipt(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={close}
            >
                <div className={"p-5"}>
                    <FontAwesomeIcon className={"pr-2"} icon={faMessage} color={"Dodgerblue"}/>
                    <Input
                        multiline={true}
                        autoFocus={true}
                        placeholder="Name"
                        value={receipt.name}
                        name={"name"}
                        onChange={onChange}
                    />
                    <br/>
                    <FontAwesomeIcon className={"pr-2"} icon={faCalendar}/>
                    <Input
                        type="date"
                        placeholder="Date Of Purchase"
                        name={"dateOfPurchase"}
                        value={getDateToShow(receipt.dateOfPurchase)}
                        onChange={onChange}
                    />
                    <br/>
                    <p>
                        <FontAwesomeIcon className={"pr-2"} icon={faMoneyBill} color={"green"}/>
                        {receipt.totalCost}
                    </p>
                    <br/>
                    <Button onClick={async () => {
                        await createReceipt(receipt.name, receipt.dateOfPurchase)
                        receiptData.updateAllReceipt()
                        setReceipt({
                            id: -1,
                            name: "",
                            dateOfPurchase: new Date(),
                            items: [],
                            totalCost: 0,
                        })
                        close()
                    }}>Save</Button>
                </div>
            </Dialog>
        </>
    )
}