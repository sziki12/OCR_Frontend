import {Button, IconButton} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";


export default function Item(props)
{
    const navigate = useNavigate();
    const params = useParams();

    return(props.items?.map((item)=>
        {
            return(
                <div className="px-4 py-2 bg-sky-100">
                    <div className={"flex flex-row align-middle"}>
                        <p className={"pr-3"}>
                            {item.name+": "+item.quantity+" piece"}
                        </p>
                        <IconButton className={"text-red-700"} onClick={()=>{navigate("/delete/receipts/"+params.receiptId+"/items/"+item.id)}}>
                            <FontAwesomeIcon icon={faTrashCan} width={16} color={"red"}/>
                        </IconButton>
                    </div>
                    <p>
                        {"Cost: "+item.totalCost}
                    </p>
                </div>
            )
        }))
}