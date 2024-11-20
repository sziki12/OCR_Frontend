import React, {useState} from "react";
import {Alert, Button, Stack, TextField, Typography} from "@mui/material";
import {AuthData} from "../../components/handlers/LoginHandler"
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import {ThemeData} from "../../components/handlers/ThemeHandler";
import background_light from "../../resources/background_light.webp";
import background_dark from "../../resources/background_dark02.png";
import Box from "@mui/material/Box";


export default function LoginPage() {
    const navigate = useNavigate()
    const {breakpoints,selectedTheme} = ThemeData();
    const mode = selectedTheme.palette.mode || "light"
    const {register} = AuthData()
    const [attempt, setAttempt] = useState({
        name: "",
        email: "",
        password: "",
        isAuthenticated: false,
        hasAttempt: false,
        message: ""
    })


    const onChange = (e) => {
        let {name, value} = e.target;
        setAttempt({...attempt, [name]: value})
    }

    return (
        <Box className={"flex justify-center h-screen p-5"}
             sx={{
                 backgroundImage: (mode==="light")?`url(${background_light})`:`url(${background_dark})`,
                 backgroundRepeat: "no-repeat",
                 backgroundSize: "cover",
             }}>
            <Paper className={"flex flex-col p-5 h-fit"}>
                <div className={"flex justify-center p-5"}>
                    <Typography variant="h4">Create Account</Typography>
                </div>
                <Stack spacing={2} className={"p-4"}>

                    <TextField autoFocus={true} value={attempt.name} label={"name"} name={"name"}
                               variant={"outlined"} onChange={onChange} type={"text"}/>
                    <TextField value={attempt.email} label={"email"} name={"email"}
                               variant={"outlined"} onChange={onChange} type={"email"}/>
                    <TextField value={attempt.password} type={"password"} label={"password"} name={"password"}
                               variant={"outlined"} onChange={onChange}/>
                    <Button onClick={async () => {
                        register(
                            {
                                name: attempt.name,
                                email: attempt.email,
                                password: attempt.password
                            }
                        ).then((message) => {
                            //Failed
                            setAttempt({...attempt, message: message, hasAttempt: true, isAuthenticated: false})
                        }).catch((message) => {
                            //Success
                            setAttempt({...attempt, message: message, hasAttempt: true, isAuthenticated: true})
                        })
                    }}>Register</Button>
                    <Button onClick={() => navigate("/login")}>Already has account?</Button>
                    {
                        (attempt.hasAttempt)
                            ?
                            <>
                                {
                                    (!attempt.isAuthenticated)
                                        ?
                                        <Alert severity={"error"}>{attempt.message}</Alert>
                                        :
                                        <Alert severity={"success"}>{attempt.message}</Alert>
                                }
                            </>
                            :
                            <></>
                    }
                </Stack>
            </Paper>
        </Box>
    )
}