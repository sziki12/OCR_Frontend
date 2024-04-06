import {
    AdvancedMarker,
    APIProvider,
    InfoWindow,
    Map,
    Marker,
    Pin,
    useAdvancedMarkerRef,
    useMap
} from '@vis.gl/react-google-maps';
import {useEffect, useRef, useState} from "react";
import {MarkerClusterer} from '@googlemaps/markerclusterer';
import {red} from "@mui/material/colors";
import PlaceMarker from "./PlaceMarker";

export default function GoogleMap(props)
{
    //TODO On first marker place the clusterer not works properly, leaves out the new Marker
    const defaultLocation = [{id:1,lat: 47.507, lng: 19.045}];
    let [newPlace,setNewPlace] = useState({})
    const [places, setPlaces] = useState(props.places);
    const canCreateMarker = props.canCreateMarker || false
    const [forcedRedraw,setForcedRedraw] = useState(0)

    const placesToPass = (places&&places.length>0)?[...places,newPlace]:[newPlace]

    useEffect(() => {
        setPlaces(props.places)
        setTimeout(()=>{setForcedRedraw(forcedRedraw + 1)},500)
    }, [props.places]);
    return (
            <APIProvider apiKey={'AIzaSyAN_KMLA-2J691xqMysa6_5ERNLJAnbYJ0'}>
                <div style={{height:"50vh", width:"50%"}}>
                    <Map
                        onClick={(e)=>{
                            if(canCreateMarker)
                            {
                                let newLocation = e.detail.latLng
                                let newPlace= {
                                    id:-1,
                                    lat:newLocation.lat,
                                    lng:newLocation.lng
                                }
                                setNewPlace(newPlace)
                                props.onMarkerCreated(newPlace)
                            }
                        }}
                        mapId={"3d321da67ef9306"}
                        defaultCenter={places[0]||defaultLocation[0]}
                        defaultZoom={12}>
                        <Markers places={placesToPass} inSelectMode={props.inSelectMode} select={props.select} receiptId={props.receiptId}/>
                    </Map>
                </div>
            </APIProvider>
        );
}

const Markers = ({places,inSelectMode,select,receiptId}) => {
    const map = useMap();
    const [markers,setMarkers] = useState({});
    const clusterer = useRef(null);

    useEffect(() => {
        if (!map) return;

        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map });
        }
    }, [map]);

    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (ref, key) => {
        if (ref && markers[key]) return;
        if (!ref && !markers[key]) return;

        setMarkers((prev) => {
            if (ref) {
                return {...prev, [key]: ref};
            } else {
                const newMarkers = {...prev};
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };
    return (
        <>
            {places.map(place => (place&&place.id)?(
                <PlaceMarker key={place.id} place={place} refHandler={setMarkerRef} inSelectMode={inSelectMode} select={select} receiptId={receiptId}/>
            ):(<></>))}
        </>
    );
};