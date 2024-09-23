import * as React from 'react';
import {Button} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus,} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import AllReceipts from "../../components/receipts/AllReceipts";
import {getReceipts} from "../../endpoints/ReceiptEndpoint";
import {getFilterOptions} from "../../endpoints/FilterEndpoint";
import ReceiptState from "../../components/states/ReceiptState";
import NewReceiptDialog from "../../components/receipts/NewReceiptDialog";
import FilterSearchBar from "../../components/filter/FilterSearchBar";
import {ThemeData} from "../../components/handlers/ThemeHandler";

export default function AllReceiptPage() {

    const {breakpoints} = ThemeData();
    const [receipts, setReceipts] = useState([])
    const emptyValues = ["All", ""]
    const unassignedValue = "Unassigned"
    const [filterValue, setFilterValue] = useState({
        receiptNames: [{label: emptyValues[0]}],
        placeNames: [{label: emptyValues[0]}],
        emptyValues: emptyValues,
        unassignedValue: unassignedValue
    })

    const updateReceiptNameFilter = (names) => {
        setFilterValue((prev) => {
            return ({...prev, receiptNames: names})
        })
    }

    const updatePlaceNameFilter = (names) => {
        setFilterValue((prev) => {
            return ({...prev, placeNames: names})
        })
    }

    console.log(filterValue)
    const [filterOptions, setFilterOptions] = useState({
        placeNames: [],
        receiptNames: [],
    })
    const [addOpen, setAddOpen] = useState(false)
    useEffect(() => {
        getReceipts().then((data) => {
            {
                setReceipts(data)
            }
        })
        getFilterOptions().then((data) => {
            setFilterOptions({
                placeNames: [...data.placeNames.map((name) => {
                    return {label: name}
                }), {label: unassignedValue}],
                receiptNames: data.receiptNames.map((name) => {
                    return {label: name}
                })
            })
        })
    }, [])


    return (
        <>
            <Button onClick={() => {
                setAddOpen(true)
            }}><FontAwesomeIcon icon={faPlus} size={"xl"}/></Button>
            <div className={"flex flex-row"}>
                <FilterSearchBar
                    options={filterOptions.receiptNames}
                    emptyValues={emptyValues}
                    updateValue={updateReceiptNameFilter}
                    name={"Receipt Name Search"}
                />
                <FilterSearchBar
                    options={filterOptions.placeNames}
                    emptyValues={emptyValues}
                    updateValue={updatePlaceNameFilter}
                    name={"Place Name Search"}
                />
            </div>
            <ReceiptState>
                <NewReceiptDialog open={addOpen} close={() => setAddOpen(false)}></NewReceiptDialog>
                <div className={`flex flex-wrap flex-row ${breakpoints.sm ? ("justify-center") : ""}`}>
                    <AllReceipts filterValue={filterValue}/>
                </div>
            </ReceiptState>

        </>
    );
}
