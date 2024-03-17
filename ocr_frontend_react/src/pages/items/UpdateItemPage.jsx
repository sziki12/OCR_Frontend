import {useEffect,useState} from 'react';
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import MainSection from "../../utils/MainSection";
import {updateItem,getItem} from "../../utils/BackendAccess";
export default function UpdateReceipt() {

    const navigate = useNavigate();
    const params = useParams()

    const [name, setName] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [quantity, setQuantity] = useState(1)


    useEffect(()=>{
        getItem(params.receiptId,params.itemId).then((item)=>{
            setName(item.name)
            setQuantity(item.quantity)
            setTotalCost(item.totalCost)
        })
    },[])

    const update = async(e) => {

        e.preventDefault()

        await updateItem(params.receiptId,params.itemId,name,quantity,totalCost)

        setName('')
        setQuantity(1)
        setTotalCost(0)

        navigate("/receipts/"+params.receiptId)
    }

    return (
        <MainSection>
            <form onSubmit={update}>
                <h3>Update selected Item</h3>
                <textarea
                    cols={"30"}
                    rows={"4"}
                    autoFocus={"true"}
                    className={"text-black"}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <input
                    className={"text-black"}
                    type="number"
                    placeholder="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                    className={"text-black"}
                    type="number"
                    placeholder="totalCost"
                    value={totalCost}
                    onChange={(e) => setTotalCost(e.target.value)}
                />
                <br></br>
                <Button type="submit">
                    Update Item
                </Button>
            </form>
        </MainSection>
    );
}