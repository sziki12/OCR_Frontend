import {Pin} from "@vis.gl/react-google-maps";
import {Tooltip} from "@mui/material";


export default function PlacePin({place, selected}) {
    const isValidated = place.validated || false
    const isSelected = selected || false
    const isPlaceNew = place.isNew || false

    const mainColor = (isPlaceNew) ? ("cyan") : ((isValidated) ? ("red") : ("gray"))
    return (<Pin
            borderColor={mainColor}
            background={mainColor}
            glyphColor={(isSelected) ? ("red") : ("blue")}
        ></Pin>)
}