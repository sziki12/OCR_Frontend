import React, {useState} from "react";
import {Button, MenuItem, Paper, Select, styled, Switch, Tooltip,} from "@mui/material";
import {uploadImageForOCR} from "../../dist/endpoints/ImageProcessingEndpoint";
import {useNavigate} from "react-router-dom";
import {faCloudArrowUp, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {HouseholdData} from "../../components/states/HouseholdState";

const UploadAndDisplayImage = (props) => {

    const navigate = useNavigate()

    const {selectedHousehold} = HouseholdData()
    const [receiptImage, setReceiptImage] = useState(null);
    const [imageData, setImageData] = useState(null);

    //waiting, processing, processed
    const [processingState, setProcessingState] = useState("waiting");
    const [ocrSettings, setOcrSettings] = useState({
        ocrType: "paddle",
        orientation: "portrait",
        parseModel: "mistral"
    })

    const multimodalLlmModels = ["mistral","gemini","llava"]
    let isParseModelDisabled = multimodalLlmModels.includes(ocrSettings.ocrType)

    const updateOcrSettings = (attr, value) => {
        setOcrSettings((prevState) => {
            if(attr === "ocrType" && multimodalLlmModels.includes(value)){
                return {
                    ...prevState,
                    ["ocrType"]: value,
                    ["parseModel"]: value
                }
            } else{
                return {
                    ...prevState,
                    [attr]: value
                }
            }
        })
    }
    const ocrOrientationSwitch = () => {
        updateOcrSettings("orientation", (ocrSettings.ocrType === "portrait") ? "landscape" : "portrait")
    }

    const uploadImageWrapper = async (file) => {
        const formData = new FormData();
        formData.append('file', file, file.name);
        setImageData(formData);
        setProcessingState("processing")
        setTimeout(() => navigate("/receipts"), 1500)
        await uploadImageForOCR(selectedHousehold.id, formData, ocrSettings)
    }

    return (
        <div className={"flex flex-row justify-center"}>
            <div>
                <Paper className={"px-10 py-6 m-5 space-y-5"}>
                    <div>
                        <p>Select image orientation</p>
                        <div className={"flex flex-row items-center pl-5"}>
                            <p>Portrait</p>
                            <Switch onChange={ocrOrientationSwitch}/>
                            <p>Landscape</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Choose Ocr Engine</p>
                            <Select
                                labelId="ocr-settings-select-ocr-type-label"
                                id="ocr-settings-select-ocr-type"
                                value={ocrSettings.ocrType}
                                label="Receipt ocr type"
                                onChange={(event) => {
                                    updateOcrSettings("ocrType", event.target.value)
                                }}
                                className={"pl-5"}
                            >
                                <MenuItem value={"paddle"}><Tooltip title={"Ocr Engine"}>Paddle</Tooltip></MenuItem>
                                <MenuItem value={"tesseract"} divider={true}><Tooltip title={"Ocr Engine"}>Tesseract</Tooltip></MenuItem>
                                <MenuItem value={"mistral"}><Tooltip title={"Llm Model"}>Mistral</Tooltip></MenuItem>
                                <MenuItem value={"gemini"}><Tooltip title={"Llm Model"}>Gemini</Tooltip></MenuItem>
                                <MenuItem value={"gpt-4o-mini"}><Tooltip title={"Llm Model"}>Chat GPT 4o Mini</Tooltip></MenuItem>
                                <MenuItem value={"gpt-4o"}><Tooltip title={"Llm Model"}>Chat GPT 4o</Tooltip></MenuItem>
                                <MenuItem value={"llava"}><Tooltip title={"Llm Model"}>Llava</Tooltip></MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <p>Choose Parse Model</p>
                        <Select
                            labelId="ocr-settings-select-parse-model-label"
                            id="ocr-settings-select-parse-model"
                            value={ocrSettings.parseModel}
                            label="Receipt parse model"
                            onChange={(event) => {
                                updateOcrSettings("parseModel", event.target.value)
                            }}
                            className={"pl-5"}
                            disabled={isParseModelDisabled}
                        >
                            <MenuItem value={"mistral"}><Tooltip title={"Llm Model"}>Mistral</Tooltip></MenuItem>
                            <MenuItem value={"gemini"}><Tooltip title={"Llm Model"}>Gemini</Tooltip></MenuItem>
                            <MenuItem value={"gpt-4o-mini"}><Tooltip title={"Llm Model"}>Chat GPT 4o Mini</Tooltip></MenuItem>
                            <MenuItem value={"gpt-4o"}><Tooltip title={"Llm Model"}>Chat GPT 4o</Tooltip></MenuItem>
                            <MenuItem value={"llava"}><Tooltip title={"Llm Model"}>Llava</Tooltip></MenuItem>
                            <MenuItem value={"llama3.1"}><Tooltip title={"Llm Model"}>Llama 3.1</Tooltip></MenuItem>
                            <MenuItem value={"claude"}><Tooltip title={"Llm Model"}>Claude</Tooltip></MenuItem>
                            <MenuItem value={"t5"}><Tooltip title={"Llm Model"}>T5</Tooltip></MenuItem>
                        </Select>
                    </div>
                    <div className={"flex  justify-evenly"}>
                        {receiptImage && (processingState === "waiting") && (
                            <>
                                <Button variant={"contained"}
                                        onClick={() => uploadImageWrapper(receiptImage)}>Submit</Button>
                                <Button variant={"contained"} onClick={() => setReceiptImage(null)}>Remove</Button>
                            </>
                        )
                        }
                        {
                            receiptImage && (processingState === "processing") && (
                                <div className={"flex justify-center"}>
                                    <FontAwesomeIcon icon={faSpinner} spinPulse size={"2xl"}/>
                                </div>
                            )
                        }
                    </div>
                </Paper>
            </div>
            <Paper className={" px-10 py-6 m-5"}>
                <h1>Upload the Receipt for analysis</h1>
                {
                    receiptImage && (
                        <div className={"flex justify-center"}>
                            <img
                                alt="not found"
                                width={"400rem"}
                                src={URL.createObjectURL(receiptImage)}
                            />
                        </div>
                    )
                }
                <br/>
                {
                    !receiptImage && (
                        <div className={"flex justify-center"}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<FontAwesomeIcon icon={faCloudArrowUp}/>}
                            >
                                Upload file
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(event) => setReceiptImage(event.target.files[0])}
                                    //multiple
                                />
                            </Button>
                        </div>)
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