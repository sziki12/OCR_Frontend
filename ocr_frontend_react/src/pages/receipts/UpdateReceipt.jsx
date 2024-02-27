import {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import MainSection from "../utils/MainSection";
import {updateReceipt,getSingleReceipt} from "../utils/BackendAccess";
export default function UpdateReceipt() {

    const navigate = useNavigate();
    const params = useParams()

    const [description, setDescription] = useState('');
    const [dateOfPurchase, setDateOfPurchase] = useState('');


    useEffect(()=>{
        getSingleReceipt(params.receiptId).then((receipt)=>{
            const date = new Date(receipt.dateOfPurchase)
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDay()
            const dateToShow = year+"-"+(month<10?'0'+month:month)+"-"+(day<10?'0'+day:day)
            console.log(dateToShow)
            setDescription(receipt.description)
            setDateOfPurchase(dateToShow)
        })
    },[])

    const update = async(e) => {

        e.preventDefault()

        await updateReceipt(params.receiptId,description,dateOfPurchase)

        setDescription('');
        setDateOfPurchase('');

        navigate("/receipts")
    }

    return (
        <MainSection>
            <form onSubmit={update}>
                <h3>Create a new Receipt</h3>
                <textarea
                    cols={"30"}
                    rows={"4"}
                    autoFocus={"true"}
                    className={"text-black"}
                    type="text"
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