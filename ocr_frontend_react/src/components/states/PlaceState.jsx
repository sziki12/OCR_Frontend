import {createContext, useContext, useEffect, useState} from "react";
import {PlaceEndpointFunctions} from "../../dist/endpoints/PlaceEndpoint"
import {HouseholdData} from "./HouseholdState";

const PlaceContext = createContext(
    {}
);

export const PlaceData = () => useContext(PlaceContext)

export default function PlaceState({children}) {
    const {getPlaces} = PlaceEndpointFunctions()
    const [places, setPlaces] = useState([])
    const {selectedHousehold} = HouseholdData()
    const updatePlaces = () => {
        getPlaces(selectedHousehold.id).then((data) => {
            setPlaces(data)
        })
    }

    useEffect(() => {
        updatePlaces()
    }, []);
    return (
        <PlaceContext.Provider value={{
            places: places,
            setPlaces: setPlaces,
            updatePlaces: updatePlaces
        }}>
            {children}
        </PlaceContext.Provider>
    )
}