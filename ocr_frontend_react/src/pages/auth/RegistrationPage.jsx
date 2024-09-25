import React, {useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {AuthData} from "../../components/handlers/LoginHandler"
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";


export default function LoginPage() {
    const navigate = useNavigate()
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
        <div className={"flex justify-center"}>
            <Paper className={"flex flex-col p-4"}>
                <div className={"flex justify-center p-4"}>
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
                            setTimeout(() => navigate("/"), 500)

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
                                        <div className={"bg-red-500 p-2"}>
                                            <p>{attempt.message}</p>
                                        </div>
                                        :
                                        <div className={"bg-green-500 p-2"}>
                                            <p>{attempt.message}</p>
                                        </div>
                                }
                            </>
                            :
                            <></>
                    }
                </Stack>
            </Paper>
        </div>
    )
}