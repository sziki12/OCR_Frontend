import { useState } from 'react';
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {ReceiptEndpointFunctions} from "../../dist/endpoints/ReceiptEndpoint";
import {HouseholdData} from "../../components/states/HouseholdState";

export default function AddItem() {
    const {addItemToReceipt} = ReceiptEndpointFunctions()
    const navigate = useNavigate();
    const params = useParams()
    const {selectedHousehold} = HouseholdData()

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalCost, setTotalCost] = useState(0);

    const create = async(e) => {
        const receiptId = params.receiptId

        e.preventDefault()
        await addItemToReceipt(selectedHousehold.id, receiptId, {name, quantity, totalCost})

        setName('');
        setQuantity(1);
        setTotalCost(0);

        navigate("/receipts/"+receiptId)
    }

    return (
        <form onSubmit={create}>
                <h3>Create a new Item</h3>
                <textarea
                    autoFocus={true}
                    cols={25}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <br/>
                <input
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
    );
}