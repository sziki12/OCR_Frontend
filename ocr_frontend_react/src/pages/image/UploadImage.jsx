import React, { useState } from "react";
import MainSection from "../../components/utils/MainSection";
import {Button, Paper, styled,} from "@mui/material";
import {uploadImageForOCR} from "../../components/utils/BackendAccess";
import {useNavigate} from "react-router-dom";
import {faCloudArrowUp, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReceiptsFromImagePage from "./ReceiptFromImage";

const UploadAndDisplayImage = (props) => {

    const navigate = useNavigate()

    const [receiptImage, setReceiptImage] = useState(null);
    const [imageData, setImageData] = useState(null);

    //waiting, processing, processed
    const [processingState, setProcessingState] = useState("waiting");

    const uploadImageWrapper = async (file) => {
        const formData = new FormData();
        formData.append('file',file,file.name);
        setImageData(formData);
        setProcessingState("processing")
        setTimeout(()=>navigate("/receipts"),1500)
        await uploadImageForOCR(formData)
    }

    return (
            <div className={"flex flex-row justify-center"}>

                <Paper className={" px-10 py-6 m-5"}>
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

                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(event) => setReceiptImage(event.target.files[0])}
                                    multiple
                                />
                            </Button>)
                    }
                </Paper>
            </div>
    );
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default UploadAndDisplayImage;