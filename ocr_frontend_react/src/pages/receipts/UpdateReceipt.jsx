import {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import MainSection from "../utils/MainSection";
import {getSingleReceipt, updateReceipt} from "../utils/BackendAccess";
import getDateToShow from "../utils/DateConverter";

export default function UpdateReceipt() {

    const navigate = useNavigate();
    const params = useParams()

    const [receipt, setReceipt] = useState({
        description:"",
        dateOfPurchase:new Date(),
        items:[],
        totalCost:0
    })

    useEffect(()=>{
        getSingleReceipt(params.receiptId).then((receipt)=>{
            setReceipt({...receipt})
        })
    },[])

    const onChange = (e) => {
        const { name, value } = e.target;
        setReceipt(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const update = async(e) => {

        e.preventDefault()

        await updateReceipt(params.receiptId,receipt.description,receipt.dateOfPurchase,receipt.items)

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
                    value={receipt.description}
                    name={"description"}
                    onChange={onChange}
                />
                <br/>
                <input
                    className={"text-black"}
                    type="date"
                    placeholder="Date Of Purchase"
                    value={getDateToShow(receipt.dateOfPurchase)}
                    name={"dateOfPurchase"}
                    onChange={onChange}
                />
                <br></br>
                <Button type="submit">
                    Update Receipt
                </Button>
            </form>
        </MainSection>
    );
}



