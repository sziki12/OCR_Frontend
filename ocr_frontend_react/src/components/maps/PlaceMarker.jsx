import {AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import PlacePin from "./pins/PlacePin";


export default function PlaceMarker({place,refHandler,inSelectMode,select,receiptId})
{
    const [markerRef, marker] = useAdvancedMarkerRef()
    const [infoWindowShown,setInfoWindowShown] = useState(false)
    const [selectMode,setSelectMode] = useState(inSelectMode || false)

    refHandler(marker,place.id)

    useEffect(() => {
        return () => {
            setInfoWindowShown(false);
        };
    }, []);

    const containsNumber = (array,value)=>
    {
        if(!array||array.size<=0)
            return false
        for(let item of array)
        {
            if(Number(item) === Number(value))
            {
                return true
            }
        }
        return false
    }

    const isPlaceSelected=()=>{
        return containsNumber(place.receipts && place.receipts.map((receipt)=>{return receipt.id}),receiptId)
    }

    return (
        <>
            <AdvancedMarker
                position={place}
                ref={markerRef}
                onClick={()=>{
                    setInfoWindowShown(true)
                    console.log(place)
                 }}
            >
                {
                    (infoWindowShown&&markerRef)
                        ?
                        <InfoWindow
                            anchor={marker}
                            onCloseClick={()=>setInfoWindowShown(false)}>
                            <h2>{place.name}</h2>
                            <p className={"pb-2"}>{place.description || "Desc"}</p>
                            {
                                (selectMode)
                                    ?
                                        (isPlaceSelected())
                                        ?
                                            <><Button variant={"contained"} color={"error"} onClick={()=>select()}>
                                                Unselect
                                            </Button></>
                                        :
                                            <><Button variant={"contained"} onClick={()=>select(place.id)}>
                                                Select
                                            </Button></>
                                    :
                                    <></>
                            }
                        </InfoWindow>
                        :
                        <></>
                }
                {
                    <PlacePin validated={place.validated} selected={isPlaceSelected()} isNew={place.isNew}/>
                }
            </AdvancedMarker>
        </>
    )
}