import {Outlet, useLocation} from "react-router-dom";
import MainSection from "../components/utils/MainSection";
import {Card, CardContent, Typography, Stack, Paper, Button,} from "@mui/material";
import {faChartSimple, faComputer, faDatabase, faImage, faList, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ThemeData} from "../components/handlers/ThemeHandler";
import Box from "@mui/material/Box";
import background_light from '../resources/background_light.webp';
import background_dark from '../resources/background_dark02.png';

export default function Root() {

    const location = useLocation();
    return (
        <MainSection>
            <div>
                {
                    (location.pathname === "/")
                        ?
                        <>
                            <RootContent key={"root_content"}/>
                        </>
                        :
                        <>
                            <Outlet key={"outlet"}/>
                        </>
                }
            </div>
        </MainSection>
    );
}
//<Stack spacing={6} direction={(breakpoints.md||breakpoints.sm||breakpoints.lg) ? "column" : "row"} justifyContent={"center"}
function RootContent() {
    const {breakpoints,selectedTheme} = ThemeData();
    const mode = selectedTheme.palette.mode || "light"
    return (
        <Paper elevation={10} className={"px-6 pt-6 pb-16 h-screen"}
               sx={{
                   backgroundImage: (mode==="light")?`url(${background_light})`:`url(${background_dark})`,
                   backgroundRepeat: "no-repeat",
                   backgroundSize: "cover",
               }}>

            <Box>
                <Typography variant={"h4"} component="div" className={"pb-4"}>Main Features</Typography>
                <div className={"flex flex-row justify-center items-center flex-wrap gap-6"}>
                    <Card elevation={10} sx={{width: 200, height: 150}}>
                        <CardContent className={"flex flex-col items-center"}>
                            Store Your Receipts Online
                            <br/>
                            <FontAwesomeIcon className={"pt-5"} size={"2xl"} icon={faDatabase}/>
                        </CardContent>
                    </Card>
                    <Card elevation={10} sx={{width: 200, height: 150}}>
                        <CardContent className={"flex flex-col items-center"}>
                            Extract Content from Image
                            <br/>
                            <FontAwesomeIcon className={"pt-5"} size={"2xl"} icon={faComputer}/>
                        </CardContent>
                    </Card>
                    <Card elevation={10} sx={{width: 200, height: 150}}>
                        <CardContent className={"flex flex-col items-center"}>
                            Categorise purchased Items
                            <br/>
                            <FontAwesomeIcon className={"pt-5"} size={"2xl"} icon={faList} />
                        </CardContent>
                    </Card>
                    <Card elevation={10} sx={{width: 200, height: 150}}>
                        <CardContent className={"flex flex-col items-center"}>
                            Save the Image with the Data
                            <br/>
                            <FontAwesomeIcon className={"pt-5"} size={"2xl"} icon={faImage}/>
                        </CardContent>
                    </Card>
                    <Card elevation={10} sx={{width: 200, height: 150}}>
                        <CardContent className={"flex flex-col items-center"}>
                            Manage Places and Filter your Receipts
                            <br/>
                            <FontAwesomeIcon className={"pt-5"} size={"2xl"} icon={faLocationDot} />
                        </CardContent>
                    </Card>
                    <Card elevation={10} sx={{width: 200, height: 150}}>
                        <CardContent className={"flex flex-col items-center"}>
                            Explore Charts of your Purchases
                            <br/>
                            <FontAwesomeIcon className={"pt-5"} size={"2xl"} icon={faChartSimple} />
                        </CardContent>
                    </Card>
                </div>
            </Box>
        </Paper>
    )
}
