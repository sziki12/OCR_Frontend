import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import {deleteItem} from "../../dist/endpoints/ItemEndpoint";
import {HouseholdData} from "../../components/states/HouseholdState";

export default function DeleteItemPage()
{
    const navigate = useNavigate()
    const params = useParams()
    const {selectedHousehold} = HouseholdData()

    return(
        <>
            <p>Are you sure you would like to delete this Item?</p>
            <div className={""}>
                <Button onClick={()=>{deleteItem(selectedHousehold.id, params.receiptId,params.itemId).then(()=>{navigate("/receipts/"+params.receiptId)})}}>Delete</Button>
                <Button onClick={()=>{navigate("/receipts/"+params.receiptId)}}>Back</Button>
            </div>
        </>
    )
}