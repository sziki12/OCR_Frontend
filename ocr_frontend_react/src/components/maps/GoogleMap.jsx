import {
    APIProvider,
    Map,
    useMap
} from '@vis.gl/react-google-maps';
import {useEffect, useRef, useState} from "react";
import {MarkerClusterer} from '@googlemaps/markerclusterer';
import PlaceMarker from "./PlaceMarker";
import {PlaceData} from "../states/PlaceState";
import {assignPlace, removePlace} from "../../dist/endpoints/PlaceEndpoint";
import * as Utils from "../utils/Utils";
import {HouseholdData} from "../states/HouseholdState";

export default function GoogleMap({
                                      onSelectedPlaceChanged,
                                      selectedPlace,
                                      canCreateMarker,
                                      receiptId,
                                      inAssignMode
                                  }) {
    const {places, updatePlaces} = PlaceData()
    const {selectedHousehold} = HouseholdData()

    const defaultLocation = [{id: 1, lat: 47.507, lng: 19.045}];
    canCreateMarker = canCreateMarker || false
    selectedPlace = selectedPlace || {id:-1}
    const width = ""
    const height = ""

    /*useEffect(() => {
        setPlaces(placeData.places)
        console.log("update Completed")
    }, [placeData.places]);

    useEffect(() => {
        setSelectedPlace(props.selectedPlace)
    }, [props.selectedPlace])*/

    const onAssign = async (placeId) => {
        (placeId) ? await assignPlace(selectedHousehold.id, placeId, receiptId) : await removePlace(selectedHousehold.id, receiptId)
        await updatePlaces()
    }
    //console.log("PLACES")
    //console.log(places)
    //console.log(selectedPlace)
    //console.log((places && places.length > 0) ? ((places.filter((place)=>place.id===selectedPlace.id).length!==0)?[...places]:[...places, selectedPlace] ): [selectedPlace])
    //console.log(((places.filter((place)=>place.id===selectedPlace.id).length!==0)?[...places]:[...places, selectedPlace]))
    return (
        <APIProvider apiKey={'AIzaSyAN_KMLA-2J691xqMysa6_5ERNLJAnbYJ0'}>
            <div style={{height: "50vh", width: "50%"}}>
                <Map
                    onClick={async (e) => {
                        if (canCreateMarker) {
                            let newLocation = e.detail.latLng
                            let newPlace = {
                                id: -1,
                                lat: newLocation.lat,
                                lng: newLocation.lng,
                                name:"",
                                description:"",
                                isNew: true,
                            }
                            onSelectedPlaceChanged(newPlace)
                        }
                    }}
                    mapId={"3d321da67ef9306"}
                    defaultCenter={places && places[0] || defaultLocation[0]}
                    defaultZoom={12}>
                    <Markers places={((places && places.length > 0) ? (selectedPlace&&selectedPlace.id&&(places.filter((place)=>place.id===selectedPlace.id).length!==0)?[...places]:[...places, selectedPlace] ): [selectedPlace])}
                             inAssignMode={inAssignMode}
                             onAssign={onAssign}
                             receiptId={receiptId}
                             onSelectedPlaceChanged={onSelectedPlaceChanged}
                             selectedPlace={selectedPlace}
                    />
                </Map>
            </div>
        </APIProvider>
    );
}

const Markers = ({places, inAssignMode, onAssign, receiptId, onSelectedPlaceChanged, selectedPlace}) => {
    const map = useMap();
    const [markers, setMarkers] = useState({});
    const clusterer = useRef(null);
    const [infoWindowShown, setInfoWindowShown] = useState({})

    const placesToShow = places.filter((place) => (place && place.id && place.lat && place.lng))

    useEffect(() => {
        if (!map) return;

        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({map});
        }

        return () => {
            clusterer.current?.clearMarkers();
            setMarkers({})
        }
    }, [map]);

    useEffect(() => {
        //console.log("markers CLUSTER")
        //console.log(placesToShow)
        //console.log(markers)
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
        markersUpdate()
    }, [markers]);

    const setMarkerRef = (ref, key) => {
        //console.log(`markers[key]: ${markers[key]}  ${key}`)
        if (ref && markers[key]) return;
        if (!ref && !markers[key]) return;

        setMarkers((prev) => {
            //console.log("Marker Set")
            if (ref) {
                //console.log(`markers[key]: ${markers[key]}  ${key}`)
                //console.log(`new:`)
                //console.log({...prev, [key]: ref})
                return {...prev, [key]: ref};
            } else {
                const newMarkers = {...prev};
                delete newMarkers[key];
                //console.log(`${key} setMarkerRef delete`)
                //console.log(`new`)
                //console.log(newMarkers)
                return newMarkers;
            }
        });
    };

    const markersUpdate = () => {
        if (!Utils.isObjectEmpty(markers)) {
            for (let key in markers) {
                const marker = placesToShow.filter((place) => (Number(place.id) === Number(key)))
                if (marker.length <= 0) {
                    //console.log("REMOVED")
                    //console.log(key)
                    setMarkers((prev) => {
                        const newMarkers = {...prev};
                        delete newMarkers[key];
                        return newMarkers;
                    });
                }
            }
        }
    }

    //markersUpdate()
    //console.log(infoWindowShown)
    return (
        <>
            {
                placesToShow.map((place) =>
                    (place)
                        ?
                        <PlaceMarker key={place.id}
                                     place={place}
                                     refHandler={setMarkerRef}
                                     inAssignMode={inAssignMode}
                                     onAssign={onAssign}
                                     receiptId={receiptId}
                                     infoWindowShown={infoWindowShown}
                                     setInfoWindowShown={setInfoWindowShown}
                                     onSelectedPlaceChanged={onSelectedPlaceChanged}
                                     selectedPlace={selectedPlace}
                        />
                        :
                        <></>
                )
            }
        </>
    );
};