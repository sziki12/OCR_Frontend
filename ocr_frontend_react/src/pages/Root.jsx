import {Outlet, useLocation} from "react-router-dom";
import MainSection from "../components/utils/MainSection";
import {Card, CardContent, Box, Typography, Stack, Paper, Button,} from "@mui/material";
import {faComputer, faDatabase, faImage} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthData} from "../components/handlers/LoginHandler";
import {ThemeData} from "../components/handlers/ThemeHandler";

function Root() {
    const location = useLocation();
    const {user} = AuthData();

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
    return (
        <Paper elevation={10} className={"px-6 pt-6 pb-16"}>
            <Typography sx={{fontSize: 18}} component="div">Main Features</Typography>
            <Stack spacing={6} direction="row" justifyContent={"center"}>
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
            <Button
                sx={[
                    (theme) => ({
                        color: '#fff',
                        backgroundColor: theme.palette.primary.main,
                        ...theme.applyStyles('dark', {
                            backgroundColor: theme.palette.secondary.main,
                        }),
                        '&:hover': {
                            boxShadow: theme.shadows[3],
                            backgroundColor: theme.palette.primary.dark,
                            ...theme.applyStyles('dark', {
                                backgroundColor: theme.palette.secondary.dark,
                            }),
                        },
                    }),
                ]}
            >
                Theme Test Button
            </Button>
        </Paper>
    )
}

export default Root;
