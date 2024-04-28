import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {deleteReceipts} from "../../components/utils/BackendAccess";



export default function DeleteReceiptPage({receiptId})
{
    const navigate = useNavigate()

    return(
        <>
            <p>Are you sure you would like to delete this receipt?</p>
            <div className={""}>
                <Button onClick={()=>{deleteReceipts(receiptId).then(()=>{navigate("/receipts")})}}>Delete</Button>
                <Button onClick={()=>{navigate("/receipts")}}>Back</Button>
            </div>
        </>
    )
}