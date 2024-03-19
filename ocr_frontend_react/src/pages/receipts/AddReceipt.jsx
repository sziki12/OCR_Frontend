import { useState } from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MainSection from "../../components/utils/MainSection";
import {createReceipt} from "../../components/utils/BackendAccess";
export default function AddReceipt() {

    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [dateOfPurchase, setDateOfPurchase] = useState('');

    const create = async(e) => {

        e.preventDefault()

        await createReceipt(description, dateOfPurchase)

        setDescription('');
        setDateOfPurchase('');

        navigate("/receipts")
    }

    return (
        <MainSection>
            <form onSubmit={create}>
                <h3>Create a new Receipt</h3>
                <textarea
                    cols={30}
                    rows={4}
                    autoFocus={true}
                    className={"text-black"}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br/>
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
        </MainSection>
    );
}