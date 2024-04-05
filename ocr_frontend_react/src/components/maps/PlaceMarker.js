import {AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";


export default function PlaceMarker({place,refHandler})
{
    const [markerRef, marker] = useAdvancedMarkerRef()
    const [infoWindowShown,setInfoWindowShown] = useState(false)
    refHandler(marker,place.id)

    useEffect(() => {
        // Ensure that the InfoWindow is closed when the marker is unmounted
        return () => {
            setInfoWindowShown(false);
        };
    }, []);

    //console.log(place.id)
    //console.log(infoWindowShown)
    return (
        <>
            <AdvancedMarker
                position={place}
                ref={markerRef}
                onClick={()=>setInfoWindowShown(true)}
            >
                {
                    (infoWindowShown)
                        ?
                        <InfoWindow
                            anchor={marker}
                            onCloseClick={()=>setInfoWindowShown(false)}>
                            <h2>{place.name}</h2>
                            <p>{place.description || "Desc"}</p>
                        </InfoWindow>
                        :
                        <></>
                }
                {
                    (place.validated)
                        ?<><Pin background={"red"} borderColor={"red"}></Pin></>
                        :<><Pin background={"gray"} borderColor={"gray"}></Pin></>
                }
            </AdvancedMarker>
        </>
    )
}