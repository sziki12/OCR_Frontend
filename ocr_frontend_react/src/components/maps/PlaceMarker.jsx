import {AdvancedMarker, useAdvancedMarkerRef} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import {Button, Dialog, Tooltip} from "@mui/material";
import PlacePin from "./pins/PlacePin";
import Box from "@mui/material/Box";


export default function PlaceMarker({
                                        place,
                                        refHandler,
                                        inAssignMode,
                                        onAssign,
                                        receiptId,
                                        infoWindowShown,
                                        setInfoWindowShown,
                                        onSelectedPlaceChanged,
                                        selectedPlace
                                    }) {
    const [markerRef, marker] = useAdvancedMarkerRef()
    const assignMode= inAssignMode || false

    const isOpen = infoWindowShown[place.id] || false
    useEffect(() => {
        if (!marker) {
            return;
        }
        refHandler(marker, place.id)

        return () => {
            refHandler(null, place.id)
            markerRef(null)
        }
    }, [marker]);

    const containsNumber = (array, value) => {
        if (!array || array.size <= 0)
            return false
        for (let item of array) {
            if (Number(item) === Number(value)) {
                return true
            }
        }
        return false
    }

    const isPlaceAssigned = () => {
        return containsNumber(place.receipts && place.receipts.map((receipt) => {
            return receipt.id
        }), receiptId)
    }
    console.log("marker place")
    console.log(place)
    return (
        <>
            <AdvancedMarker
                title={place.name}
                position={place}
                ref={markerRef}
                onClick={() => {
                    if(assignMode) {
                        setInfoWindowShown({[place.id]: true})
                    }else {
                        onSelectedPlaceChanged(place)
                    }
                }}
                draggable={false}
            >
                {

                    <Dialog
                        open={isOpen}
                        onClose={() => {
                            setInfoWindowShown((prev) => {
                                const newInfoWindowShown = {...prev};
                                delete newInfoWindowShown[place.id];
                                return newInfoWindowShown;
                            })
                        }}

                    >
                        <Box sx={{
                            minWidth:"200px",
                            minHeight:"100px",
                            }} className={"py-2 px-5 flex flex-col justify-center items-center"}>
                            <h2 className={"pb-5"}>{place.name || "Name..."}</h2>
                            <p className={"pb-2"}>{place.description || "Description..."}</p>
                            {
                                (assignMode)
                                    ?
                                    (isPlaceAssigned())
                                        ?
                                        <><Button variant={"contained"} color={"error"} onClick={() => onAssign()}>
                                            Unselect
                                        </Button></>
                                        :
                                        <><Button variant={"contained"} onClick={() => onAssign(place.id)}>
                                            Select
                                        </Button></>
                                    :
                                    <></>
                            }
                        </Box>
                    </Dialog>
                }
                {
                    <>
                        <PlacePin place={place} selected={isPlaceAssigned() ||
                            (selectedPlace !== undefined && selectedPlace.id === place.id)}/>
                    </>
                }
            </AdvancedMarker>
        </>
    )
}