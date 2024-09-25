import {useEffect, useState} from "react";
import {Button, Input, Paper, Typography} from "@mui/material";
import GoogleMap from "../maps/GoogleMap";
import {savePlace} from "../../dist/endpoints/PlaceEndpoint"
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PlaceData} from "../states/PlaceState";
import {HouseholdData} from "../states/HouseholdState";


export default function EditablePlace(props) {
    const placeData = PlaceData()
    const {selectedHousehold} = HouseholdData()

    const [places, setPlaces] = useState(placeData.places)//TODO why is place not used?
    const [selectedPlace, setSelectedPlace] = useState({
        name: "",
        lat: undefined,
        lng: undefined
    })

    const [attempt, setAttempt] = useState({
            isValid: undefined
        })
    ;
    const onSelectedPlaceChanged = (place) => {
        setSelectedPlace({...selectedPlace, ...place})
    }


    const onChange = (e) => {
        setSelectedPlace({...selectedPlace, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        setPlaces(placeData.places)
    }, [placeData.places])

    return (<>
        <Paper>
            <div className={"flex flex-col"}>
                <div className={"flex justify-center"}>
                    <Input
                        className={"w-1/3"}
                        autoFocus={true}
                        placeholder={"Name of the Place"}
                        name={"name"}
                        value={selectedPlace.name}
                        onChange={onChange}>
                    </Input>

                    <Button onClick={async () => {
                        if (selectedPlace
                            && selectedPlace.name
                            && selectedPlace.lat
                            && selectedPlace.lng) {
                            await savePlace(selectedHousehold.id, selectedPlace)
                            setSelectedPlace({
                                name: "",
                                lat: undefined,
                                lng: undefined,
                                id: undefined
                            })
                            placeData.updatePlaces()
                            setAttempt({isValid: true})
                        } else setAttempt({isValid: false})


                    }}>
                        <FontAwesomeIcon icon={faFloppyDisk} size={"xl"}/>
                    </Button>
                </div>
                <div className={"flex justify-center"}>
                    <GoogleMap
                        canCreateMarker={true}
                        selectedPlace={selectedPlace}
                        onSelectedPlaceChanged={onSelectedPlaceChanged}/>
                </div>
                <div className={"flex justify-center"}>
                    {
                        (typeof attempt.isValid !== "undefined")
                            ?
                            (attempt.isValid)
                                ?
                                <></>
                                :
                                <>
                                    <Typography bgcolor={"red"}>Please select a place and give it a name</Typography>
                                </>
                            :
                            <></>
                    }
                </div>
            </div>
        </Paper>
    </>)
}