import React from "react";
import MainSection from "../components/utils/MainSection";
import {Typography, Paper} from "@mui/material";
import {NavLink} from "react-router-dom";


export default function ErrorPage() {
    return (
        <MainSection>
            <div className={"flex justify-center"}>
                <Paper className={"p-6"} elevation={0}>
                    <Typography sx={{fontSize: 36}}>404 Page Not Found</Typography>
                    <div className={"flex justify-center"}>
                        <NavLink className={"text-red-600"} to={"/"}>Please return to a valid Page</NavLink>
                    </div>
                </Paper>
            </div>
        </MainSection>

    );
}

