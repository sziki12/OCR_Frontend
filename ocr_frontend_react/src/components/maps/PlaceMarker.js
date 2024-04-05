import {AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef} from "@vis.gl/react-google-maps";
import {useState} from "react";


export default function PlaceMarker({place,refHandler})
{
    const [markerRef, marker] = useAdvancedMarkerRef()
    const [infoWindowShown,setInfoWindowShown] = useState(false)
    refHandler(marker,place)

    return (
        <>
            <AdvancedMarker
                position={place}
                key={place.id}
                ref={markerRef}
                onClick={()=>setInfoWindowShown((prev)=>!prev)}
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