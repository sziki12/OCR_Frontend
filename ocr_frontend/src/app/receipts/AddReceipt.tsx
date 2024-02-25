'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from "@mui/material";

export default function AddReceipt() {
    const [description, setDescription] = useState('');
    const [dateOfPurchase, setDateOfPurchase] = useState('');


    const router = useRouter();

    const create = async() => {

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

        router.refresh();
    }

    return (
        <form onSubmit={create}>
            <h3>Create a new Receipt</h3>
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
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