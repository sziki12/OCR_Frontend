import {Pin} from "@vis.gl/react-google-maps";


export default function PlacePin({validated,selected})
{
    const isValidated = validated || false
    const isSelected = selected || false
    return(<>
        <Pin
            borderColor={(isValidated)?("red"):("gray")}
            background={(isValidated)?("red"):("gray")}
            glyphColor={(isSelected)?("red"):("blue")}
        ></Pin>
    </>)
}