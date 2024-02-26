'use client';

import { useState } from 'react';
//import {useRouter} from 'next/router';
import {useParams} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {Button} from "@mui/material";

export default function AddItem() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [totalCost, setTotalCost] = useState('');


    const navRouter = useRouter();
    const params = useParams<{receiptId:string}>()

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

        navRouter.refresh();
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