import {Autocomplete, TextField} from "@mui/material";
import React from "react";

export default function FilterSearchBar({options, emptyValues, updateInputValue, updateValue, name,className}) {

    const actualEmptyValues = (emptyValues) ? (emptyValues) : (["All"])
    const [values, setValues] = React.useState([{label: actualEmptyValues[0]}]);
    const [inputValue, setInputValue] = React.useState('');
    const actualName = name || "Search"
    const actualOptions = ([...options, {label: actualEmptyValues[0]}].filter((option)=> {
        return values.filter((value)=>option.label === value.label).length === 0
    }))

    return (<div className={className}>
        <Autocomplete
            multiple
            value={values}
            inputValue={inputValue}
            onChange={(event, newValue) => {
                setValues(newValue)
                if (updateValue) {
                    updateValue(newValue)
                }

            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
                if (updateInputValue) {
                    //console.log("updateInputValue")
                    updateInputValue(newInputValue)
                }
            }}
            options={actualOptions}
            //sx={{width: 300}}
            getOptionLabel={(option) => option && option.label || emptyValues[0]}
            defaultValue={[emptyValues[0]]}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label={actualName}
                    placeholder="Search"
                />
            )}
        />
    </div>)

}