import { useState } from 'react';
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import MainSection from "../../utils/MainSection";
import {createItem} from "../../utils/BackendAccess";

export default function AddItem() {

    const navigate = useNavigate();
    const params = useParams()

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalCost, setTotalCost] = useState(0);

    const create = async(e) => {
        const receiptId = params.receiptId

        e.preventDefault()
        await createItem(receiptId, name, quantity, totalCost)

        setName('');
        setQuantity(1);
        setTotalCost(0);

        navigate("/receipts/"+receiptId)
    }

    return (
        <MainSection>
            <form onSubmit={create}>
                <h3>Create a new Item</h3>
                <textarea
                    autoFocus={true}
                    cols={25}
                    className={"text-black"}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <input
                    className={"text-black"}
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <br/>
                <input
                    className={"text-black"}
                    type="number"
                    placeholder="Total Cost"
                    value={totalCost}
                    onChange={(e) => setTotalCost(e.target.value)}
                />
                <br/>
                <Button type="submit">
                    Add Item
                </Button>
            </form>
        </MainSection>
    );
}