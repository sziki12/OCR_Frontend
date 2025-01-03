import {Button, Input} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan, faBox, faSignature, faTag} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {useEffect, useState} from "react";


export default function EditableItem(props) {

    const [items, setItems] = useState([])

    const deleteItem = async (itemId) => {
        const otherItems = items.filter(item => item.id !== itemId)
        const newArray = [...otherItems]
        setItems(newArray);
        props.saveItems(newArray)
    }


    useEffect(() => {
        setItems([...props.items])
    }, [props.items])

    const onChange = (e, id) => {
        let selectedItem = items.filter(item => item.id === id)[0]
        const otherItems = items.filter(item => item.id !== id)
        const {name, value} = e.target;
        selectedItem = {
            ...selectedItem,
            [name]: value,
        }
        const newArray = [selectedItem, ...otherItems]
        newArray.sort((a, b) => a.id - b.id)
        setItems(newArray);
        props.saveItems(newArray)
    }

    return (items?.map((item) => {
            return (<div key={item.id} className={"p-2"}>
                <div>
                    <FontAwesomeIcon icon={faSignature}/>
                    <Input
                        autoFocus={true}
                        placeholder="Name"
                        value={item.name}
                        name={"name"}
                        onChange={(e) => {
                            onChange(e, item.id)
                        }}
                    />
                </div>
                <br/>
                <div className={"flex flex-row flex-wrap"}>
                    <div className={"w-1/3"}>
                        <FontAwesomeIcon icon={faBox} className={"px-2"}/>
                        <Input
                            className={"w-3/4"}
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            name={"quantity"}
                            onChange={(e) => {
                                onChange(e, item.id)
                            }}
                        />
                    </div>
                    <div className={"w-1/2"}>
                        <FontAwesomeIcon icon={faTag} className={"px-2"}/>
                        <Input
                            className={"w-3/4"}
                            type="number"
                            placeholder="Total Cost"
                            value={item.totalCost}
                            name={"totalCost"}
                            onChange={(e) => {
                                onChange(e, item.id)
                            }}
                        />
                    </div>
                    <Button onClick={() => deleteItem(item.id)} size={"large"}>
                        <FontAwesomeIcon icon={faTrashCan} color={"red"} size={"lg"}/>
                    </Button>
                </div>
            </div>)
        })
    )
}