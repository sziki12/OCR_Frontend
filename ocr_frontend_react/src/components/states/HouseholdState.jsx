import {createContext, useContext, useEffect, useState} from "react";
import {getHouseholds} from "../../dist/endpoints/HouseholdEndpoint"

const HouseholdContext = createContext(
    {}
);

export const HouseholdData = () => useContext(HouseholdContext)

export default function HouseholdState({children}) {

    const [households, setHouseholds] = useState([])
    const [selectedHousehold, setSelectedHousehold] = useState({})
    const updateHouseholds = () => {
        getHouseholds().then((data) => {
            setHouseholds(data)
        })
    }

    useEffect(() => {
        updateHouseholds()
    }, []);
    return (
        <HouseholdContext.Provider value={{
            households: households,
            setHouseholds: setHouseholds,
            selectedHousehold: selectedHousehold,
            setSelectedHousehold: setSelectedHousehold,
            updateHouseholds: updateHouseholds
        }}>
            {children}
        </HouseholdContext.Provider>
    )
}