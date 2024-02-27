'use client';

import { useState } from 'react';
import {Button} from "@mui/material";
import { useRouter } from 'next/navigation'

export default function AddReceipt() {
    const [description, setDescription] = useState('');
    const [dateOfPurchase, setDateOfPurchase] = useState('');

    const router = useRouter()

    const create = async(e:any) => {

        e.preventDefault()

        await fetch('http://localhost:8080/api/receipt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description,
                dateOfPurchase,
                items:[],
            }),
        });

        setDescription('');
        setDateOfPurchase('');

        router.push("/receipts")
    }

    return (
        <form onSubmit={create}>
            <h3>Create a new Receipt</h3>
            <input
                className={"text-black"}
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                className={"text-black"}
                type="date"
                placeholder="Date Of Purchase"
                value={dateOfPurchase}
                onChange={(e) => setDateOfPurchase(e.target.value)}
            />
            <br></br>
            <Button type="submit">
               Add Receipt
            </Button>
        </form>
    );
}