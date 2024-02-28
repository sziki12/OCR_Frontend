import React, { useState } from "react";
import MainSection from "../utils/MainSection";
import {Button} from "@mui/material";
import {uploadImage} from "../utils/BackendAccess";

const UploadAndDisplayImage = () => {

    const [receiptImage, setReceiptImage] = useState(null);

    return (
        <MainSection>
            <div className={"bg-gray-300 rounded shadow"}>
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
                        <br />
                        <Button variant={"contained"} onClick={() => uploadImage(receiptImage)}>Submit</Button>
                        <Button variant={"contained"} onClick={() => setReceiptImage(null)}>Remove</Button>
                    </div>
                    )
                }
                <br />
                {
                    !receiptImage && (
                        <input
                        type="file"
                        name="receiptImage"
                        onChange={(event) => {
                            setReceiptImage(event.target.files[0]);
                        }}
                    />)
                }

            </div>
        </MainSection>
    );
};

export default UploadAndDisplayImage;