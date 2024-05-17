import {useNavigate, useParams} from "react-router-dom";
import MainSection from "../../components/utils/MainSection";
import {Button} from "@mui/material";
import {deleteItem} from "../../components/utils/BackendAccess";



export default function DeleteItemPage()
{
    const navigate = useNavigate()
    const params = useParams()

    return(
        <>
            <p>Are you sure you would like to delete this Item?</p>
            <div className={""}>
                <Button onClick={()=>{deleteItem(params.receiptId,params.itemId).then(()=>{navigate("/receipts/"+params.receiptId)})}}>Delete</Button>
                <Button onClick={()=>{navigate("/receipts/"+params.receiptId)}}>Back</Button>
            </div>
        </>
    )
}