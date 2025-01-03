import {useEffect, useState} from "react";
import {Alert, Button, Input, Paper, Typography} from "@mui/material";
import GoogleMap from "../maps/GoogleMap";
import {PlaceEndpointFunctions} from "../../dist/endpoints/PlaceEndpoint"
import {faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PlaceData} from "../states/PlaceState";
import {HouseholdData} from "../states/HouseholdState";
import Box from "@mui/material/Box";
import {ThemeData} from "../handlers/ThemeHandler";


export default function EditablePlace({}) {
    const placeData = PlaceData()
    const {selectedHousehold} = HouseholdData()
    const {createPlace,updatePlace} = PlaceEndpointFunctions()
    const{breakpoints} = ThemeData()
    const [selectedPlace, setSelectedPlace] = useState({
        id: -1,
        name: "",
        description: "",
        lat: undefined,
        lng: undefined
    })
    //TODO lastPlace, disable save if same as selectedPlace

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

    return (<div className={`flex ${(breakpoints.sm||breakpoints.md)?"flex-col items-center":"flex-row justify-evenly"}`}>
        <div className={`${(breakpoints.sm||breakpoints.md)?"w-fit":"w-4/12"} p-5`}>
            <Paper className={"p-5"}>
                <div className={"flex flex-col justify-center items-center space-y-5"}>
                    <Typography variant="h4">Add or Edit Place</Typography>
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

                    <Button  onClick={async () => {
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
                        <p>Save <FontAwesomeIcon icon={faFloppyDisk} size={"xl"}/></p>
                    </Button>
                    <div className={"flex justify-center"}>
                        {
                            (typeof attempt.isValid !== "undefined")
                                ?
                                (attempt.isValid)
                                    ?
                                    <></>
                                    :
                                    <>
                                        <Alert severity="error">Please select a Place or Place a Marker and provide the Name</Alert>
                                    </>
                                :
                                <></>
                        }
                    </div>
                </div>
            </Paper>
        </div>
        <Box className={`p-5 ${(breakpoints.sm||breakpoints.md)?"w-fit":"w-7/12"}`}>
            <div className={"flex justify-center"}>
                <GoogleMap
                    canCreateMarker={true}
                    selectedPlace={selectedPlace}
                    onSelectedPlaceChanged={onSelectedPlaceChanged}/>
            </div>
        </Box>
    </div>)
}