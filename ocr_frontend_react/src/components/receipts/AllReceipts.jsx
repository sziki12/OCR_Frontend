import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEye, faMessage, faMoneyBill, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@mui/material";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import Paper from '@mui/material/Paper';
import {ReceiptData} from "../states/ReceiptState";
import {useEffect, useState} from "react";
import ReceiptDeleteDialog from "./ReceiptDeleteDialog";
import {HouseholdData} from "../states/HouseholdState";
import {ThemeData} from "../handlers/ThemeHandler";


export default function AllReceipts({filterValue}) {
    const navigate = useNavigate()
    const [open, setOpen] = useState({})

    const {selectedTheme} = ThemeData()
    const colorMode = selectedTheme.palette.mode

    const receiptNames = filterValue.receiptNames.map((name) => {
        return name.label
    })
    const placeNames = filterValue.placeNames.map((name) => {
        return name.label
    })

    //console.log(receiptNames)
    //console.log(placeNames)
    const receiptLayout = (receipt) => <div key={`receipt-${receipt.id}`}>
        <Paper elevation={12} className="px-10 py-6 m-5">
            <p><FontAwesomeIcon icon={faMessage} color={"Dodgerblue"}/> {receipt.name}</p>
            <p><FontAwesomeIcon icon={faCalendar}/> {new Date(receipt.dateOfPurchase).toLocaleDateString()}</p>
            <p><FontAwesomeIcon icon={faMoneyBill} color={"green"}/> {receipt.totalCost + " "}</p>

            <Button onClick={() => {
                navigate("/receipts/" + receipt.id)
            }}>
                <FontAwesomeIcon icon={faEye} width={30}/>
            </Button>
            <Button className={"text-red-700"} onClick={() => {
                setOpen({[receipt.id]: true})
            }}>
                <FontAwesomeIcon icon={faTrashCan} width={25} color={"red"}/>
            </Button>
        </Paper>
    </div>

    const pendingLayout = (receipt) => <div key={`pending-${receipt.id}`}>
        <Paper elevation={12} className="px-10 py-6 m-5 bg-gray-500">
            <p className={(colorMode==="light")?`text-gray-700`:`text-gray-400`}><FontAwesomeIcon icon={faMessage} color={"grey"}/> {receipt.name}</p>
            <p className={(colorMode==="light")?`text-gray-700`:`text-gray-400`}><FontAwesomeIcon icon={faCalendar}
                                                            color={"grey"}/> {new Date(receipt.dateOfPurchase).toLocaleDateString()}
            </p>
            <p className={(colorMode==="light")?`text-gray-700`:`text-gray-400`}><FontAwesomeIcon icon={faMoneyBill}
                                                            color={"grey"}/> {receipt.totalCost + " "}</p>

            <Button disabled={true} onClick={() => {
                navigate("/receipts/" + receipt.id)
            }}>
                <FontAwesomeIcon icon={faEye} color={"grey"} width={30}/>
            </Button>
            <Button disabled={true} onClick={() => {
                setOpen({[receipt.id]: true})
            }}>
                <FontAwesomeIcon icon={faTrashCan} width={25} color={"grey"}/>
            </Button>
        </Paper>
    </div>

    const {selectedHousehold} = HouseholdData()
    const {allReceipt, updateAllReceipt} = ReceiptData()
    const [receipts, setReceipts] = useState({})

    const closeDialog = (receiptId) =>
        setOpen((prev) => {
            const newOpen = {...prev};
            delete newOpen[receiptId];
            return newOpen;
        })

    useEffect(() => {
        updateAllReceipt()
    }, [selectedHousehold]);

    useEffect(() => {
        setReceipts(allReceipt)
    }, [allReceipt]);


    return (
        <>
            {(receipts && receipts.length > 0)
                ?
                receipts?.filter((receipt) => {
                    //name not in filtered category
                    if (!receiptNames.includes(receipt.name) && receiptNames.filter((name) => {
                        return filterValue.emptyValues.includes(name)
                    }).length === 0) {
                        return false
                    }
                    //place not in filtered category

                    if (receipt.place != null) {
                        if (!placeNames.includes(receipt.place.name) && placeNames.filter((name) => {
                            return filterValue.emptyValues.includes(name)
                        }).length === 0) {
                            return false
                        }
                    } else {
                        if (!placeNames.includes(filterValue.unassignedValue) && placeNames.filter((name) => {
                            return filterValue.emptyValues.includes(name)
                        }).length === 0) {
                            return false;
                        }

                    }

                    return true;
                })?.map((receipt) => {
                    return (
                        <div key={`receipt-container-${receipt.id}`}>
                            <ReceiptDeleteDialog
                                key={`receipt-delete-dialog-${receipt.id}`}
                                open={open[receipt.id]}
                                close={() => closeDialog(receipt.id)}
                                receiptId={receipt.id}
                            />
                            {
                                (receipt.pending)
                                    ?
                                    pendingLayout(receipt)
                                    :
                                    receiptLayout(receipt)
                            }
                        </div>)
                })
                :
                <></>
            }
        </>)
}