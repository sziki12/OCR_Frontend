import {
    APIProvider,
    Map,
    useMap
} from '@vis.gl/react-google-maps';
import {useEffect, useRef, useState} from "react";
import {MarkerClusterer} from '@googlemaps/markerclusterer';
import PlaceMarker from "./PlaceMarker";
import {PlaceData} from "../states/PlaceState";
import {assignPlace,removePlace} from "../utils/BackendAccess";

export default function GoogleMap(props)
{
    const placeData = PlaceData()

    const defaultLocation = [{id:1,lat: 47.507, lng: 19.045}];
    let [newPlace,setNewPlace] = useState({})
    const [places, setPlaces] = useState(placeData.places);
    const canCreateMarker = props.canCreateMarker || false

    const placesToPass = (places&&places.length>0)?[...places,newPlace]:[newPlace]

    useEffect(() => {
        console.log(placeData.places)
        setPlaces(placeData.places)
    }, [placeData.places]);

    const onSelect = async (placeId)=>
    {
        (placeId) ? await assignPlace(placeId, props.receiptId): await removePlace(props.receiptId)
        await placeData.updatePlaces()
    }
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
                                    lng:newLocation.lng,
                                    isNew:true,//TODO if isNew different colored Marker, when saved remove isNew
                                }
                                setNewPlace(newPlace)
                                props.onMarkerCreated(newPlace)
                                placeData.setPlaces([...placesToPass])
                            }
                        }}
                        mapId={"3d321da67ef9306"}
                        defaultCenter={places && places[0] || defaultLocation[0]}
                        defaultZoom={12}>
                        <Markers places={placesToPass} inSelectMode={props.inSelectMode} select={onSelect} receiptId={props.receiptId}/>
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