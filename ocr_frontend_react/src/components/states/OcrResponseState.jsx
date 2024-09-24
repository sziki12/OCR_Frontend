import {createContext, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getOcrResponse} from "../../dist/endpoints/OcrResponseEndpoint";


const OcrResponseContext = createContext(
    {}
);

export const OcrResponseData = () => useContext(OcrResponseContext)

export default function OcrResponseState({children}) {
    const params = useParams()

    const [ocrResponse, setOcrResponse] = useState({})

    const updateOcrResponse = (receiptId) => {
        if (!receiptId)
            return
        getOcrResponse(receiptId).then((response) => {
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