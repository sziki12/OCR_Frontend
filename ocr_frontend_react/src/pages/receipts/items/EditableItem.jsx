import {Button, IconButton} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";


export default function EditableItem(props) {


    return (props.items?.map((item)=>
        {
            return(<form>
                <textarea
                    autoFocus={true}
                    cols={25}
                    className={"text-black"}
                    placeholder="Name"
                    value={item.name}
                    onChange={(e) => {item.name = e.target.value}}
                />
                <br/>
                <input
                    className={"text-black"}
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => {item.quantity = e.target.value}}
                />
                <br/>
                <input
                    className={"text-black"}
                    type="number"
                    placeholder="Total Cost"
                    value={item.totalCost}
                    onChange={(e) => {item.totalCost = e.target.value}}
                />
                <br/>
            </form>)
        })
    )
}