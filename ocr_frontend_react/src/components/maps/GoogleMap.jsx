import {AdvancedMarker, APIProvider, Map, Marker, Pin, useMap} from '@vis.gl/react-google-maps';
import {useEffect, useRef, useState} from "react";
import {MarkerClusterer} from '@googlemaps/markerclusterer';

export default function GoogleMap(props)
{
    //
    const map = useMap();
    const defaultLocation = {lat: 47.507, lng: 19.045};
    let [newPlace,setNewPlace] = useState({})
    const [places, setPlaces] = useState(props.places || [defaultLocation]);

    return (
            <APIProvider apiKey={'AIzaSyAN_KMLA-2J691xqMysa6_5ERNLJAnbYJ0'}>
                <div style={{height:"50vh", width:"50%"}}>
                    <Map
                        onClick={(e)=>{
                            let newLocation = e.detail.latLng
                            setNewPlace({
                                id:-1,
                                lat:newLocation.lat,
                                lng:newLocation.lng
                                })
                        }}
                        mapId={"3d321da67ef9306"}
                        defaultCenter={places[0]}
                        defaultZoom={12}>
                        <Markers places={[...places,newPlace]} />//TODO newPlace is {} ERROR
                    </Map>
                </div>
            </APIProvider>
        );
}

const Markers = ({places}) => {
    const map = useMap();
    const [markers, setMarkers] = useState({});
    const clusterer = useRef(null);

    // Initialize MarkerClusterer
    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({map});
        }
    }, [map]);

    // Update markers
    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker, key) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers(prev => {
            if (marker) {
                return {...prev, [key]: marker};
            } else {
                const newMarkers = {...prev};
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };

    {console.log(places)}
    return (
        <>
            {places.map(place => (
                <AdvancedMarker
                    position={place}
                    key={place.id}
                    ref={marker => setMarkerRef(marker, place.id)}>
                </AdvancedMarker>
            ))}
        </>
    );
};