import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {deleteReceipts} from "../../dist/endpoints/ReceiptEndpoint";
import {HouseholdData} from "../../components/states/HouseholdState";


export default function DeleteReceiptPage({receiptId}) {
    const navigate = useNavigate()
    const {selectedHousehold} = HouseholdData()

    return (
        <>
            <p>Are you sure you would like to delete this receipt?</p>
            <div className={""}>
                <Button onClick={() => {
                    deleteReceipts(selectedHousehold.id, receiptId).then(() => {
                        navigate("/receipts")
                    })
                }}>Delete</Button>
                <Button onClick={() => {
                    navigate("/receipts")
                }}>Back</Button>
            </div>
        </>
    )
}