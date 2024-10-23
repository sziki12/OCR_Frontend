import * as React from 'react';
import {Button} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus,} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import AllReceipts from "../../components/receipts/AllReceipts";
import {FilterEndpointFunctions} from "../../dist/endpoints/FilterEndpoint";
import NewReceiptDialog from "../../components/receipts/NewReceiptDialog";
import FilterSearchBar from "../../components/filter/FilterSearchBar";
import {ThemeData} from "../../components/handlers/ThemeHandler";
import {HouseholdData} from "../../components/states/HouseholdState";

export default function AllReceiptPage() {
    const {getFilterOptions} = FilterEndpointFunctions()
    const {breakpoints} = ThemeData();
    const {selectedHousehold} = HouseholdData()
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

    const updateFilterOptions = (placeNames, receiptNames) => {
        setFilterOptions({
            placeNames: placeNames,
            receiptNames: receiptNames,
        })
    }

    //console.log(filterValue)
    const [filterOptions, setFilterOptions] = useState({
        placeNames: [],
        receiptNames: [],
    })
    const [addOpen, setAddOpen] = useState(false)
    useEffect(() => {
        getFilterOptions(selectedHousehold.id).then((newFilterOptions) => {
            if (newFilterOptions) {
                let placeNames = [...newFilterOptions.placeNames.map((name) => {
                    return {label: name}
                }), {label: unassignedValue}]

                let receiptNames =  [...newFilterOptions.receiptNames.map((name) => {
                    return {label: name}
                }), {label: unassignedValue}]
                updateFilterOptions(placeNames, receiptNames)
            } else {
                updateFilterOptions([],[])
            }

        })
    }, [selectedHousehold]);


    return (
        <>
            <Button onClick={() => {
                setAddOpen(true)
            }}><FontAwesomeIcon icon={faPlus} size={"xl"}/></Button>
            <div className={"flex flex-row space-x-5"}>
                <FilterSearchBar
                    options={filterOptions.receiptNames}
                    emptyValues={emptyValues}
                    updateValue={updateReceiptNameFilter}
                    name={"Receipt Name Search"}
                    className={"w-1/3"}
                />
                <FilterSearchBar
                    options={filterOptions.placeNames}
                    emptyValues={emptyValues}
                    updateValue={updatePlaceNameFilter}
                    name={"Place Name Search"}
                    className={"w-1/3"}
                />
            </div>
            {//<ReceiptState>
                 }
                <NewReceiptDialog open={addOpen} close={() => setAddOpen(false)}></NewReceiptDialog>
                <div className={`flex flex-wrap flex-row ${breakpoints.sm ? ("justify-center") : ""}`}>
                    <AllReceipts filterValue={filterValue}/>
                </div>
            {//</ReceiptState>
                }

        </>
    );
}
