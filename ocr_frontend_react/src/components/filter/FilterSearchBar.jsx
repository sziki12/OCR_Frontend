import {Autocomplete, TextField} from "@mui/material";
import React from "react";

export default function FilterSearchBar({options, emptyValues, updateInputValue,updateValue,name}){

    const actualEmptyValues = (emptyValues)?(emptyValues):([""])
    const actualOptions = (options.includes(actualEmptyValues[0]))?(options):([...options,actualEmptyValues[0]])
    const [value, setValue] = React.useState(actualEmptyValues[0]);
    const [inputValue, setInputValue] = React.useState('');
    const actualName = name || "Search"

    return(<>
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                if(updateValue)
                    updateValue(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                if(updateInputValue)
                    updateInputValue(newInputValue)
            }}
            options={actualOptions}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={actualName} />}
        />
    </>)

}