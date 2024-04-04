import {AdvancedMarker, APIProvider, InfoWindow, Map, Marker, Pin, useMap} from '@vis.gl/react-google-maps';
import {useEffect, useRef, useState} from "react";
import {MarkerClusterer} from '@googlemaps/markerclusterer';
import {red} from "@mui/material/colors";

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
                        <Markers places={placesToPass} />
                    </Map>
                </div>
            </APIProvider>
        );
}

const Markers = ({places}) => {
    const map = useMap();
    const markers = useRef({});
    const clusterer = useRef(null);
    const infoWindowShown = useRef({});
    const [forcedRedraw,setForcedRedraw] = useState(0)

    const toggleInfoWindow = () =>
        infoWindowShown.current = (previousState) => !previousState;

    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({map});
        }
    }, [map]);

    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers.current));
    }, [markers.current]);

    const setMarkerRef = (ref, key) => {
        if (ref && markers[key]) return;
        if (!ref && !markers[key]) return;

        markers.current = (() => {
            if (ref) {
                return {...markers.current, [key]: ref};
            } else {
                const newMarkers = {...markers.current};
                delete newMarkers[key];
                return newMarkers;
            }
        })();

        if(ref)
        {
            infoWindowShown.current = (()=>{
                if(Object.keys(infoWindowShown.current).length === 0)
                    return {[key]:false}
                else
                    return {...infoWindowShown.current,[key]:false}
            })()
        }
    };
    return (
        <>
            {places.map(place => (place&&place.id)?(
                <AdvancedMarker
                    position={place}
                    key={place.id}
                    ref={ref => setMarkerRef(ref, place.id)}
                    >
                    {
                        (infoWindowShown[place.id])
                        ?
                            <InfoWindow anchor={markers.current[place.id]}>
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
            ):(<></>))}
        </>
    );
};