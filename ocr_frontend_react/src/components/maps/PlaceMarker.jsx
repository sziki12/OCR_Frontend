import {AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import PlacePin from "./pins/PlacePin";


export default function PlaceMarker({place,refHandler,inSelectMode,select,receiptId,infoWindowShown,setInfoWindowShown})
{
    const [markerRef, marker] = useAdvancedMarkerRef()
    const [selectMode,setSelectMode] = useState(inSelectMode || false)

    useEffect(() => {
        if (!marker) {
            return;
        }
        refHandler(marker,place.id)
    }, [marker]);

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

    //console.log(`Draw ${place.id} Marker`)
    return (
        <>W
            <AdvancedMarker
                position={place}
                ref={markerRef}
                onClick={()=>{
                    setInfoWindowShown({[place.id]:true})
                 }}
            >
                {
                    (infoWindowShown[place.id])
                        ?
                        <InfoWindow
                            anchor={marker}
                            onCloseClick={()=>{
                                setInfoWindowShown((prev)=>{
                                    const newInfoWindowShown = {...prev};
                                    delete newInfoWindowShown[place.id];
                                    return newInfoWindowShown;
                                })
                            }}
                            shouldFocus={false}>
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