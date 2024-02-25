'use client';

// export default function Test() {
//   return (
//     <div>
//       <h1>Create Note</h1>
//     </div>
//   );
// }

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from "@mui/material";

export default function AddReceipt() {
    const [description, setDescription] = useState('');
    const [dateOfPurchase, setDateOfPurchase] = useState('');


    const router = useRouter();

    const create = async() => {
        // const db = new PocketBase('http://127.0.0.1:8090');

        // await db.records.create('notes', {
        //   title,
        //   content,
        // });

        await fetch('http://localhost:8080/api/receipt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description,
                dateOfPurchase,
                items:[],
                id:10,
            }),
        });

        setDescription('');
        setDateOfPurchase('');

        router.refresh();
    }

    return (
        <form onSubmit={create}>
            <h3>Create a new Note</h3>
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