import PlaceState from "../../components/states/PlaceState";
import EditablePlace from "../../components/places/EditablePlace";
import Box from "@mui/material/Box";
import background_light from "../../resources/background_light.webp";
import background_dark from "../../resources/background_dark02.png";
import {ThemeData} from "../../components/handlers/ThemeHandler";

export default function AddPlacePage() {
    const {selectedTheme} = ThemeData();
    const mode = selectedTheme.palette.mode || "light"
    return (
        <Box className={"h-screen"} sx={{
            backgroundImage: (mode==="light")?`url(${background_light})`:`url(${background_dark})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}>
            {
            <PlaceState>
                <EditablePlace/>
            </PlaceState>
            }
        </Box>
    )
}