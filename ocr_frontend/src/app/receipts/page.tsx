import * as React from 'react';
import {AppBar,Toolbar, Button, Box, Icon, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport, faTrashCan, faEye, faPenToSquare, faPlus, } from '@fortawesome/free-solid-svg-icons'
import MainToolbar from "@/data_types/Toolbar";
import MainSection from "@/data_types/MainSection";
import AddReceipt from './AddReceipt';

async function getReceipts():Promise<Receipt[]> {
    let receiptsRequest = await fetch("http://localhost:8080/api/receipt",
        {
            cache: "no-store"
        })

    let receipts = await receiptsRequest.json()


    return receipts as Receipt[]
}

export default async function ReceiptsPage() {

    let receipts = await getReceipts()

    return (
        <MainSection>
                <p>Receipts</p>
                <div className="flex flex-wrap flex-row">
                    {receipts?.map((receipt)=>
                    {
                        return  (
                            <div className="px-10 py-6 m-5 bg-white shadow rounded">
                                <p className={"text-black"}>Description: {receipt.description}</p>
                                <p className={"text-black"}>Date: {new Date(receipt.dateOfPurchase).toLocaleDateString()}</p>
                                <p className={"text-black"}>Total Cost: {receipt.totalCost}</p>
                                <Button href={"receipts/"+receipt.id}><Icon><FontAwesomeIcon icon={faEye} /></Icon></Button>
                            </div>)
                    })
                    }
                </div>
            <AddReceipt/>
        </MainSection>
    );
}
