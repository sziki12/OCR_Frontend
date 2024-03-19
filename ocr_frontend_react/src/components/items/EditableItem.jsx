import {Button, IconButton,Input,FormControl} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan, faBox, faSignature, faTag, faPlus} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {useEffect, useState} from "react";


export default function EditableItem(props) {

    const [items, setItems] = useState([])

    const deleteItem = async (itemId) => {
        const otherItems = items.filter(item=>item.id!==itemId)
        const newArray = [...otherItems]
        setItems(newArray);
        props.saveItems(newArray)
    }


    useEffect(()=>{
        setItems([...props.items])
        console.log("ITEMS")
        console.log([...props.items])
    },[props.items])

    const onChange = (e,id) => {
        let selectedItem = items.filter(item=>item.id===id)[0]
        const otherItems = items.filter(item=>item.id!==id)
        const { name, value } = e.target;
        selectedItem = {
            ...selectedItem,
            [name]:value,
        }
        const newArray = [selectedItem,...otherItems]
        newArray.sort((a,b)=>a.id-b.id)
        setItems(newArray);
        props.saveItems(newArray)
        console.log("otherItems")
        console.log([...otherItems])
        console.log("selectedItem")
        console.log(selectedItem)
        console.log("SAVE")
        console.log(newArray)
    }

    return (items?.map((item)=>
        {
            return(<div key={item.id} className={"flex flex-row flex-wrap py-2"}>
                <div>
                    <FontAwesomeIcon icon={faSignature} />
                    <Input
                        autoFocus={true}
                        className={"text-black"}
                        placeholder="Name"
                        value={item.name}
                        name={"name"}
                        onChange={(e)=>{onChange(e,item.id)}}
                    />
                </div>
                <br/>
                <div>
                    <FontAwesomeIcon icon={faBox} />
                    <Input
                        className={"text-black w-1/4"}
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        name={"quantity"}
                        onChange={(e)=>{onChange(e,item.id)}}
                    />
                </div>

                <br/>
                <div>
                    <FontAwesomeIcon icon={faTag} />
                    <Input
                        className={"text-black w-1/2"}
                        type="number"
                        placeholder="Total Cost"
                        value={item.totalCost}
                        name={"totalCost"}
                        onChange={(e)=>{onChange(e,item.id)}}
                    />
                </div>
                <Button onClick={()=>deleteItem(item.id)}>
                    <FontAwesomeIcon icon={faTrashCan} color={"red"}/>
                </Button>

                <br/>
            </div>)
        })
    )
}