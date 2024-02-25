'use client';

import { useState } from 'react';
import {useRouter} from 'next/router';
//import {useRouter} from 'next/navigation';
import {Button} from "@mui/material";

export default function AddItem() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [url, setUrl] = useState('');


    //const navRouter = useRouter();

    const create = async() => {
        const router = useRouter()
        const receiptId = router.query

        await fetch('http://localhost:8080/api/receipt/'+receiptId, {
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
        setUrl('http://localhost:8080/api/receipt/'+receiptId)
        setName('');
        setQuantity('');
        setTotalCost('');

        //navRouter.refresh();
    }

    return (
        <form onSubmit={create}>
            <h3>Create a new Item</h3>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <input
                type="number"
                placeholder="Total Cost"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
            />
            <br></br>
            <p>URL: {url}</p>
            <br></br>
            <Button type="submit">
                Add Item
            </Button>
        </form>
    );
}