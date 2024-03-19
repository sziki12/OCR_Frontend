import React from "react";
import {Button} from "@mui/material";
import {AuthData} from "../../components/handlers/LoginHandler"
import MainSection from "../../components/utils/MainSection";


export default function LoginPage()
{
    const {login} = AuthData()
    return(
        <Button onClick={()=>login("User","password")}>Login</Button>
    )
}