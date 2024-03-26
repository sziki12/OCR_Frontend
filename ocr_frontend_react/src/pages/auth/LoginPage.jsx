import React, {useState} from "react";
import {Button, Grid, Input, InputBase, PopoverPaper, Stack, TextField, Typography} from "@mui/material";
import {AuthData} from "../../components/handlers/LoginHandler"
import MainSection from "../../components/utils/MainSection";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";


export default function LoginPage()
{
    const navigate = useNavigate()
    const {login} = AuthData()
    const [attempt,setAttempt] = useState({
        userName:"",
        password:"",
        isAuthenticated:false,
        hasAttempt:false,
        message:""
    })


    const onChange = (e) => {
        let {name, value} = e.target;
        setAttempt({...attempt,[name]:value})
    }

    return(
         <div className={"flex justify-center"}>
             <div className={"flex flex-col bg-blue-200 p-4"}>
                 <div className={"flex justify-center p-4"}>
                    <Typography  variant="h4">Login</Typography>
                 </div>
                 <Stack spacing={2} className={"p-4"}>

                     <TextField value={attempt.userName} label={"username"} name={"userName"} variant={"outlined"} onChange={onChange}/>
                     <TextField value={attempt.password} type={"password"} label={"password"} name={"password"} variant={"outlined"} onChange={onChange}/>
                     <Button onClick={async () => {
                         login(
                             {
                                 userName:attempt.userName,
                                 password:attempt.password
                             }
                         ).then((message)=>{
                             //Failed
                             setAttempt({...attempt,message: message, hasAttempt: true, isAuthenticated:false})
                         }).catch((message)=>{
                             //Success
                             setAttempt({...attempt,message: message, hasAttempt: true, isAuthenticated: true})
                             setTimeout(()=>navigate("/"),500)

                         })
                     }}>Login</Button>
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
             </div>
         </div>
    )
}