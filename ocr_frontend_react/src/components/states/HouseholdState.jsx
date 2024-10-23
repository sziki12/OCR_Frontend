import {createContext, useContext, useEffect, useState} from "react";
import {HouseholdEndpointFunctions} from "../../dist/endpoints/HouseholdEndpoint"
import {getSelectedHouseholdId} from "../../services/HouseholdService";
import {AuthData} from "../handlers/LoginHandler";

const HouseholdContext = createContext(
    {}
);

export const HouseholdData = () => useContext(HouseholdContext)

export default function HouseholdState({children}) {
    const {getHouseholds} = HouseholdEndpointFunctions()
    const {user} = AuthData()
    const [households, setHouseholds] = useState([])
    const [selectedHousehold, setSelectedHousehold] = useState({})
    const updateHouseholds = () => {
        console.log("updateHouseholds")
        getHouseholds().then((data) => {
            setHouseholds(data)
            console.log("getHouseholds")
            console.log(data)
            let selectedId = getSelectedHouseholdId()
            let selected = data.filter((household) => household.id === selectedId)
            if(selected.length === 1)
                setSelectedHousehold(selected[0])
            else
                setSelectedHousehold(data[0])

            console.log("setSelectedHousehold")
            console.log(selected[0])
            console.log(data[0])
        })
    }

    useEffect(() => {
        if(user.isAuthenticated){
            console.log("user.isAuthenticated")
            updateHouseholds()
        }
    }, [user.isAuthenticated]);
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