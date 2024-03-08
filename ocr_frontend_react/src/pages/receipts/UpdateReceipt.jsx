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
            const month = date.getMonth()+1
            const day = date.getDate()
            const dateToShow = year+"-"+(month<10?'0'+month:month)+"-"+(day<10?'0'+day:day)
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
                <h3>Update selected Receipt</h3>
                <textarea
                    cols={"30"}
                    rows={"4"}
                    autoFocus={"true"}
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
                    Update Receipt
                </Button>
            </form>
        </MainSection>
    );
}