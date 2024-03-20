import React, { useState } from "react";
import MainSection from "../../components/utils/MainSection";
import {Button} from "@mui/material";
import {uploadImageForOCR} from "../../components/utils/BackendAccess";
import {useNavigate} from "react-router-dom";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReceiptsFromImagePage from "./ReceiptFromImage";




const UploadAndDisplayImage = (props) => {

    const navigate = useNavigate()

    const [receiptImage, setReceiptImage] = useState(null);
    const [imageData, setImageData] = useState(null);

    //waiting, processing, processed
    const [processingState, setProcessingState] = useState("waiting");

    const [response, setResponse] = useState({});

    const uploadImageWrapper = async (file) => {
        const formData = new FormData();
        formData.append('file',file,file.name);
        setImageData(formData);
        setProcessingState("processing")
        setResponse(await uploadImageForOCR(formData))
        setProcessingState("processed")
    }

    return (
            <div className={"flex flex-row justify-center"}>
                {
                    (processingState==="processed") &&
                    <ReceiptsFromImagePage response={response}/>
                }

                <div className={"w-1/3 px-10 py-6 m-5 bg-blue-50 shadow rounded"}>
                    <h1>Upload the Receipt for analysis</h1>
                    {
                        receiptImage && (
                            <div>
                                <div className={"flex justify-center"}>
                                    <img
                                        alt="not found"
                                        width={"400rem"}
                                        src={URL.createObjectURL(receiptImage)}
                                    />
                                    <br />
                                </div>
                                <br />
                                {
                                    (processingState==="waiting") &&(
                                        <>
                                            <Button variant={"contained"} onClick={() => uploadImageWrapper(receiptImage)}>Submit</Button>
                                            <Button variant={"contained"} onClick={() => setReceiptImage(null)}>Remove</Button>
                                        </>
                                    )
                                }
                                {
                                    (processingState==="processing") &&(
                                        <div className={"flex justify-center"}>
                                            <FontAwesomeIcon icon={faSpinner} spinPulse size={"2xl"} />
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <br />
                    {
                        !receiptImage &&(
                            <input
                                type="file"
                                name="receiptImage"
                                onChange={(event) => {
                                    setReceiptImage(event.target.files[0]);
                                }}
                            />)
                    }
                </div>
            </div>
    );
};

export default UploadAndDisplayImage;