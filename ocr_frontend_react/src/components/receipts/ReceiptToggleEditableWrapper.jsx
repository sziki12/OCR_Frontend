import {Switch} from "@mui/material";
import SingleReceipt from "./SingleReceipt";
import * as React from "react";
import {useState} from "react";


export default function ReceiptToggleEditableWrapper({children}) {

    const [viewMode, setViewMode] = useState({mode: "view"})
    const handleSwitch = (e) => {
        setViewMode({
            mode: (viewMode.mode === "view") ? "edit" : "view"
        })
    }

    return (
        <>
            <div className={"flex flex-row align-middle items-center"}>
                <p>View Mode</p>
                <Switch onChange={handleSwitch}/>
                <p>Edit Mode</p>
            </div>
            <div className={"flex flex-row justify-between flex-grow"}>
                {
                    <SingleReceipt isEditable={viewMode.mode === "edit"}/>
                }
                {children}
            </div>
        </>
    )
}