import {createContext, useContext, useEffect, useState} from "react";
import {getPlaces} from "../utils/BackendAccess"

const PlaceContext = createContext(
    {}
);

export const PlaceData =  ()=> useContext(PlaceContext)

export default function PlaceState({children})
{

    const [places,setPlaces] = useState([])
    const updatePlaces = ()=>{
        getPlaces().then((data)=>{
            setPlaces(data)
        })
    }

    useEffect(() => {
        updatePlaces()
    }, []);
    return(
        <PlaceContext.Provider value = {{
            places:places,
            setPlaces:setPlaces,
            updatePlaces:updatePlaces
        }}>
            {children}
        </PlaceContext.Provider>
    )
}