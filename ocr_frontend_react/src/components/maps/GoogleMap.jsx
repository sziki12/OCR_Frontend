import {AdvancedMarker, APIProvider, Map, Marker, Pin, useMap} from '@vis.gl/react-google-maps';
import {useEffect, useRef, useState} from "react";
import {MarkerClusterer} from '@googlemaps/markerclusterer';

export default function GoogleMap(props)
{
    //TODO On first marker place the clusterer not works properly, leaves out the new Marker
    const defaultLocations = [
        {id:1,lat: 47.507, lng: 19.045},
        {id:2,lat: 48.507, lng: 18.045},
        {id:3,lat: 47.807, lng: 20.045},
        {id:4,lat: 47.707, lng: 19.945},
        {id:5,lat: 47.707, lng: 21.945},
        {id:6,lat: 49.707, lng: 19.945}];
    let [newPlace,setNewPlace] = useState({})
    const [places, setPlaces] = useState(props.places || [...defaultLocations]);

    return (
            <APIProvider apiKey={'AIzaSyAN_KMLA-2J691xqMysa6_5ERNLJAnbYJ0'}>
                <div style={{height:"50vh", width:"50%"}}>
                    <Map
                        onClick={(e)=>{
                            let newLocation = e.detail.latLng
                            setNewPlace({
                                id:10,
                                lat:newLocation.lat,
                                lng:newLocation.lng
                                })
                        }}
                        mapId={"3d321da67ef9306"}
                        defaultCenter={places[0]}
                        defaultZoom={12}>
                        <Markers places={[...places,newPlace]} />
                    </Map>
                </div>
            </APIProvider>
        );
}

const Markers = ({places}) => {
    const map = useMap();
    const markers = useRef({});
    const clusterer = useRef(null);

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
    };
    return (
        <>
            {places.map(place => (place&&place.id)?(
                <AdvancedMarker
                    position={place}
                    key={place.id}
                    ref={ref => setMarkerRef(ref, place.id)}
                    >
                </AdvancedMarker>
            ):(<></>))}
        </>
    );
};