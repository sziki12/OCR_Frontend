import {Outlet, useLocation} from "react-router-dom";
import MainSection from "../components/utils/MainSection";
import {Card, CardContent, Typography, Stack, Paper, Button,} from "@mui/material";
import {faComputer, faDatabase, faImage} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ThemeData} from "../components/handlers/ThemeHandler";

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

function RootContent() {
    const {breakpoints} = ThemeData();
    return (
        <Paper elevation={10} className={"px-6 pt-6 pb-16"}>
            <Typography sx={{fontSize: 18}} component="div" className={"pb-4"}>Main Features</Typography>
            <Stack spacing={6} direction={(breakpoints.sm) ? "column" : "row"} justifyContent={"center"} alignItems={"center"}>
                <Card elevation={10} sx={{width: 200}}>
                    <CardContent>
                        Store Your Receipts Online
                        <br/>
                        <div className={"flex justify-center"}><FontAwesomeIcon size={"2xl"} icon={faDatabase}/></div>
                    </CardContent>
                </Card>
                <Card elevation={10} sx={{width: 200}}>
                    <CardContent>
                        Extract Receipt from Image
                        <br/>
                        <div className={"flex justify-center"}><FontAwesomeIcon size={"2xl"} icon={faComputer}/></div>
                    </CardContent>
                </Card>
                <Card elevation={10} sx={{width: 200}}>
                    <CardContent>
                        Save the Image with the data
                        <br/>
                        <div className={"flex justify-center"}><FontAwesomeIcon size={"2xl"} icon={faImage}/></div>
                    </CardContent>
                </Card>
            </Stack>
        </Paper>
    )
}
