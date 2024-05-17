import {Avatar, Button, Card, Popper,Typography,CardContent,CardActions} from "@mui/material";
import React from "react";
import {AuthData} from "../handlers/LoginHandler";

export default function ProfileAvatar()
{
    const {user,logout} = AuthData();

    let name = stringAvatar(user.userName)
    const [anchorElement, setAnchorElement] = React.useState(null);
    const handleClick = (event) => {
        setAnchorElement(anchorElement ? null : event.currentTarget);
    };
    const isPopperOpen = Boolean(anchorElement);
    const popper_id = isPopperOpen ? 'simple-popper' : undefined;

    return(<div className={"px-2"}>
        <Avatar onClick={handleClick} sx={name.sx}>{name.children}</Avatar>
        <Popper id={popper_id} open={isPopperOpen} anchorEl={anchorElement}>
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Logged in as:
                    </Typography>
                    <p>{user.userName}</p>
                </CardContent>
                <CardActions>
                    <Button variant={"contained"} color="inherit" onClick={()=>{
                        logout();
                    }}>Logout</Button>
                </CardActions>
            </Card>
        </Popper>
    </div>)
}

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    let names = name.split(' ')
    let children = ""
    for(name of names)
    {
        children+=name[0]
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: children
    };
}