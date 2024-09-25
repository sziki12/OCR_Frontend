import {createContext, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getOcrResponse} from "../../dist/endpoints/OcrResponseEndpoint";
import {HouseholdData} from "./HouseholdState";


const OcrResponseContext = createContext(
    {}
);

export const OcrResponseData = () => useContext(OcrResponseContext)

export default function OcrResponseState({children}) {
    const params = useParams()
    const {selectedHousehold} = HouseholdData()

    const [ocrResponse, setOcrResponse] = useState({})

    const updateOcrResponse = (receiptId) => {
        if (!receiptId)
            return
        getOcrResponse(selectedHousehold.id, receiptId).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setOcrResponse(data)
                })
            }
        })
    }

    useEffect(() => {
        if (params.receiptId)
            updateOcrResponse(params.receiptId)
    }, [])

    console.log(ocrResponse)
    return (
        <OcrResponseContext.Provider value={{
            ocrResponse: ocrResponse,
            setOcrResponse: setOcrResponse,
            updateOcrResponse: updateOcrResponse,
        }}>
            {children}
        </OcrResponseContext.Provider>
    )
}