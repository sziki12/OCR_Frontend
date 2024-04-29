import * as React from 'react';
import {Autocomplete, Button, TextField} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus,faFileArrowUp,} from '@fortawesome/free-solid-svg-icons'
import MainSection from "../../components/utils/MainSection";
import {useEffect, useState} from "react";
import AllReceipts from "../../components/receipts/AllReceipts";
import {useNavigate} from "react-router-dom";
import {getReceipts, getFilterOptions} from "../../components/utils/BackendAccess";
import ReceiptState from "../../components/states/ReceiptState";
import NewReceiptDialog from "../../components/receipts/NewReceiptDialog";
import ReceiptDeleteDialog from "../../components/receipts/ReceiptDeleteDialog";
import FilterSearchBar from "../../components/filter/FilterSearchBar";

export default function AllReceiptPage() {

    const navigate = useNavigate();
    const [receipts,setReceipts] = useState([])
    const emptyValues = ["All",""]
    const unassignedValue = "Unassigned"
    const [filterValue,setFilterValue] = useState({
        receiptName:emptyValues[0],
        placeName:emptyValues[0],
        emptyValues:emptyValues,
        unassignedValue:unassignedValue
    })

    const updateReceiptNameFilter = (name)=>{
        setFilterValue((prev)=>{
            return ({...prev,receiptName: name})
        })
    }

    const updatePlaceNameFilter = (name)=>{
        setFilterValue((prev)=>{
            return ({...prev,placeName: name})
        })
    }

    const [filterOptions,setFilterOptions] = useState({
        placeNames:[],
        receiptNames:[],
    })
    const [addOpen,setAddOpen] = useState(false)
    useEffect(()=>{
        getReceipts().then((data)=>{{
            setReceipts(data)
        }})
        getFilterOptions().then((data)=>{
            setFilterOptions({
                placeNames:[...data.placeNames.map((name)=>{return {label:name}}),{label:unassignedValue}],
                receiptNames:data.receiptNames.map((name)=>{return {label:name}})
            })
        })
    },[])


    return (
        <>
            <Button onClick={()=>{setAddOpen(true)}}><FontAwesomeIcon icon={faPlus}  size={"xl"}/></Button>
            <div className={"flex flex-row"}>
                <FilterSearchBar
                options={filterOptions.receiptNames}
                emptyValues={emptyValues}
                updateInputValue={updateReceiptNameFilter}
                name={"Receipt Name Search"}
                />
                <FilterSearchBar
                    options={filterOptions.placeNames}
                    emptyValues={emptyValues}
                    updateInputValue={updatePlaceNameFilter}
                    name={"Place Name Search"}
                />
            </div>
            <ReceiptState>
                <NewReceiptDialog open={addOpen} close={()=>setAddOpen(false)}></NewReceiptDialog>
                <div className="flex flex-wrap flex-row">
                    <AllReceipts filterValue={filterValue}/>
                </div>
            </ReceiptState>

        </>
    );
}
