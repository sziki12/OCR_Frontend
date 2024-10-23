import {useEffect, useState} from "react";
import {Button, Input, Paper, Typography} from "@mui/material";
import GoogleMap from "../maps/GoogleMap";
import {PlaceEndpointFunctions} from "../../dist/endpoints/PlaceEndpoint"
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PlaceData} from "../states/PlaceState";
import {HouseholdData} from "../states/HouseholdState";


export default function EditablePlace(props) {
    const placeData = PlaceData()
    const {selectedHousehold} = HouseholdData()
    const {createPlace,updatePlace} = PlaceEndpointFunctions()
    const [selectedPlace, setSelectedPlace] = useState({
        id: -1,
        name: "",
        description: "",
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

    return (<div className={"flex flex-row justify-evenly"}>
        <div className={"w-4/12"}>
            <Paper className={"p-5"}>
                <div className={"flex flex-col justify-center items-center space-y-5"}>
                    <Input
                        className={"w-2/3"}
                        autoFocus={true}
                        placeholder={"Name of the Place"}
                        name={"name"}
                        value={selectedPlace.name}
                        onChange={onChange}>
                    </Input>
                    <Input
                        className={"w-2/3"}
                        autoFocus={true}
                        placeholder={"Description"}
                        name={"description"}
                        value={selectedPlace.description}
                        multiline={true}
                        onChange={onChange}>
                    </Input>

                    <Button onClick={async () => {
                        if (selectedPlace
                            && selectedPlace.name
                            && selectedPlace.lat
                            && selectedPlace.lng) {
                            if(selectedPlace.id) {
                                await updatePlace(selectedHousehold.id, selectedPlace)
                            }else {
                                await createPlace(selectedHousehold.id, selectedPlace)
                            }
                            setSelectedPlace({
                                name: "",
                                description: "",
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
            </Paper>
        </div>
        <Paper className={"p-5 w-7/12"}>
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
        </Paper>
    </div>)
}