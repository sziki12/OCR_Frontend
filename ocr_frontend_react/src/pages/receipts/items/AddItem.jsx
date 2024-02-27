import { useState } from 'react';
import {Button} from "@mui/material";
import {useParams} from "react-router-dom";

export default function AddItem() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const params = useParams()

    const create = async() => {
        const receiptId = params.receiptId

        const url = 'http://localhost:8080/api/receipt/'+receiptId+'/item'
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                quantity,
                totalCost,
            }),
        });
        setName('');
        setQuantity('');
        setTotalCost('');
    }

    return (
        <form onSubmit={create}>
            <h3>Create a new Item</h3>
            <input
                className={"text-black"}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className={"text-black"}
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <input
                className={"text-black"}
                type="number"
                placeholder="Total Cost"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
            />
            <br></br>
            <Button type="submit">
                Add Item
            </Button>
        </form>
    );
}