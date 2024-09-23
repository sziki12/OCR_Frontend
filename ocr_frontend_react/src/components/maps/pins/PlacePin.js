import {Pin} from "@vis.gl/react-google-maps";


export default function PlacePin({validated, selected, isNew}) {
    const isValidated = validated || false
    const isSelected = selected || false
    const isPlaceNew = isNew || false

    const mainColor = (isPlaceNew) ? ("cyan") : ((isValidated) ? ("red") : ("gray"))
    return (<>
        <Pin
            borderColor={mainColor}
            background={mainColor}
            glyphColor={(isSelected) ? ("red") : ("blue")}
        ></Pin>
    </>)
}