import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEye, faMessage, faMoneyBill, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Item from "./items/Item";
import {Button} from "@mui/material";
import * as React from "react";


export default function EditableReceipt(props) {
    const navigate = useNavigate()
    const receipt = props.receipt
    return(
            <div className="px-10 py-6 m-5 bg-blue-50 shadow rounded">
                <p className={"text-black"}><FontAwesomeIcon icon={faMessage} color={"Dodgerblue"}/> {receipt.description}</p>
                <p className={"text-black"}><FontAwesomeIcon icon={faCalendar}/> {new Date(receipt.dateOfPurchase).toLocaleDateString()}</p>
                <p className={"text-black"}><FontAwesomeIcon icon={faMoneyBill} color={"green"} /> {receipt.totalCost+" "}</p>


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


                {props.showItems===true&&<Item items={receipt.items}/>}

                <Button onClick={()=>{navigate("/receipts/"+receipt.id)}}>
                    <FontAwesomeIcon icon={faEye} width={30}/>
                </Button>
                <Button className={"text-green-600"} onClick={()=>{navigate("/update/receipts/"+receipt.id)}}>
                    <FontAwesomeIcon icon={faPenToSquare} width={28} color={"green"}/>
                </Button>
                <Button className={"text-red-700"} onClick={()=>{navigate("/delete/receipts/"+receipt.id)}}>
                    <FontAwesomeIcon icon={faTrashCan} width={25} color={"red"}/>
                </Button>
            </div>
    )
}