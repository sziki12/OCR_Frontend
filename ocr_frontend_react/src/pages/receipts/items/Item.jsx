import {Button, IconButton} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";


export default function Item(props)
{
    const navigate = useNavigate();
    const params = useParams()

    return(props.items?.map((item)=>
        {
            return(
                <div className="px-4 py-2 bg-sky-100">
                    <p className={"text-black"}>
                        {item.name+": "+item.quantity+" piece"}
                        <IconButton className={"text-green-600"} onClick={()=>{navigate("/update/receipts/"+params.receiptId+"/items/"+item.id)}}>
                            <FontAwesomeIcon icon={faPenToSquare} width={18} color={"green"}/>
                        </IconButton>
                        <IconButton className={"text-red-700"} onClick={()=>{navigate("/delete/receipts/"+params.receiptId+"/items/"+item.id)}}>
                            <FontAwesomeIcon icon={faTrashCan} width={16} color={"red"}/>
                        </IconButton>
                    </p>
                    <p className={"text-black"}>
                        {"Cost: "+item.totalCost}
                    </p>
                </div>
            )
        }))
}