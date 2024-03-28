import {AppBar, Toolbar, Button, Box, Icon, Typography, IconButton, Popper,Card} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt } from '@fortawesome/free-solid-svg-icons'
import {redirect, useNavigate} from "react-router-dom";
import {AuthData} from "../handlers/LoginHandler";
import ProfileAvatar from "../avatars/ProfileAvatar";
import React from "react";


export default function MainToolbar()
{
    const {user} = AuthData();
    const navigate = useNavigate();

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={()=>{
                        if(user.isAuthenticated)
                            navigate('/receipts')
                        else
                            navigate('/login')
                    }}>
                        <FontAwesomeIcon icon={faReceipt} width={50} color={"lightBlue"}/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Receipt OCR</Typography>
                        <>
                            {
                                (user.isAuthenticated)
                                    ?
                                        <>
                                            <Typography variant="h6" component="div">{user.userName}</Typography>
                                            <ProfileAvatar/>
                                        </>
                                    :
                                    <>
                                        <Button color="inherit" onClick={()=>navigate("/login")}>Login</Button>
                                    </>
                            }
                        </>
                </Toolbar>
            </AppBar>
        </Box>
    )
}