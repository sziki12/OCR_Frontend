import {Autocomplete, TextField} from "@mui/material";
import React from "react";

export default function FilterSearchBar({options, emptyValues, updateInputValue,updateValue,name}){

    const actualEmptyValues = (emptyValues)?(emptyValues):([""])
    const actualOptions = (options.includes(actualEmptyValues[0]))?(options):([...options,{label:actualEmptyValues[0]}])
    const [value, setValue] = React.useState([{label:actualEmptyValues[0]}]);
    const [inputValue, setInputValue] = React.useState('');
    const actualName = name || "Search"

    //console.log(value)
    return(<>
        <Autocomplete
            multiple
            value={value}
            inputValue={inputValue}
            onChange={(event, newValue) => {
                setValue(newValue)
                //console.log(newValue)
                if(updateValue)
                {
                    //console.log("updateValue")
                    updateValue(newValue)
                }

            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
                if(updateInputValue)
                {
                    //console.log("updateInputValue")
                    updateInputValue(newInputValue)
                }
            }}
            options={actualOptions}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option && option.label || emptyValues[0]}
            defaultValue={[emptyValues[0]]}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label={actualName}
                    placeholder="Favorites"
                />
            )}
        />
    </>)

}