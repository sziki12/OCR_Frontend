import {useNavigate, useParams} from "react-router-dom";
import MainSection from "../utils/MainSection";
import {Receipt} from "@mui/icons-material";
import {Button} from "@mui/material";
import {deleteReceipts} from "../utils/BackendAccess";



export default function DeleteReceiptPage()
{
    const navigate = useNavigate()
    const params = useParams()

    return(
        <MainSection>
            <p>Are you sure you would like to delete this receipt?</p>
            <div className={""}>
                <Button onClick={()=>{deleteReceipts(params.receiptId).then(()=>{navigate("/receipts")})}}>Delete</Button>
                <Button onClick={()=>{navigate("/receipts")}}>Back</Button>
            </div>
        </MainSection>
    )
}