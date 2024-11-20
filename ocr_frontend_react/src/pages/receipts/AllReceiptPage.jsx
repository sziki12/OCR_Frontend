import * as React from 'react';
import {Button, Paper} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus,} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import AllReceipts from "../../components/receipts/AllReceipts";
import {FilterEndpointFunctions} from "../../dist/endpoints/FilterEndpoint";
import NewReceiptDialog from "../../components/receipts/NewReceiptDialog";
import FilterSearchBar from "../../components/filter/FilterSearchBar";
import {ThemeData} from "../../components/handlers/ThemeHandler";
import {HouseholdData} from "../../components/states/HouseholdState";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import background_light from "../../resources/background_light.webp";
import background_dark from "../../resources/background_dark02.png";

export default function AllReceiptPage() {
    const {getFilterOptions} = FilterEndpointFunctions()
    const {breakpoints,selectedTheme} = ThemeData();
    const mode = selectedTheme.palette.mode || "light"

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
            <Paper>
                <div className={"justify-center flex pt-5 pb-10"}>
                    <Typography variant={"h4"}>Receipts of {selectedHousehold.name}</Typography>
                </div>
                <div className={`flex ${(breakpoints.sm)?"flex-col space-y-5":"flex-row space-x-5"}`}>
                    <FilterSearchBar
                        options={filterOptions.receiptNames}
                        emptyValues={emptyValues}
                        updateValue={updateReceiptNameFilter}
                        name={"Receipt Name Search"}
                        className={(breakpoints.sm)?"":"w-1/3"}
                    />
                    <FilterSearchBar
                        options={filterOptions.placeNames}
                        emptyValues={emptyValues}
                        updateValue={updatePlaceNameFilter}
                        name={"Place Name Search"}
                        className={(breakpoints.sm)?"":"w-1/3"}
                    />
                    <Button onClick={() => {
                        setAddOpen(true)
                    }}>
                        <Typography>Add New </Typography>
                        <FontAwesomeIcon icon={faPlus} size={"xl"}/>
                    </Button>
                </div>
            </Paper>
            <Box className={"h-screen"} sx={{
                backgroundImage: (mode==="light")?`url(${background_light})`:`url(${background_dark})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}>
                <NewReceiptDialog open={addOpen} close={() => setAddOpen(false)}></NewReceiptDialog>
                <div className={`flex flex-wrap flex-row ${breakpoints.sm ? ("justify-center") : ""}`}>
                    <AllReceipts filterValue={filterValue}/>
                </div>
            </Box>
        </>
    );
}
