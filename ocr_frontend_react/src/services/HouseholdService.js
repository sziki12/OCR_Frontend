

export async function getSelectedHouseholdId(){
    return window.localStorage.getItem("selected_household_id")
}

export async function saveSelectedHouseholdId(householdId){
    window.localStorage.setItem("selected_household_id", householdId)
}