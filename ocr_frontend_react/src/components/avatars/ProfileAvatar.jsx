import {Avatar, Button, Card, Popper, Typography, CardContent, CardActions, Select, MenuItem} from "@mui/material";
import React from "react";
import {AuthData} from "../handlers/LoginHandler";
import {HouseholdData} from "../states/HouseholdState";
import {useNavigate} from "react-router-dom";

export default function ProfileAvatar()
{
    const navigate = useNavigate()
    const {user,logout} = AuthData();
    const {selectedHousehold, households, setSelectedHousehold} = HouseholdData()
    let name = stringAvatar(user.name)
    const [anchorElement, setAnchorElement] = React.useState(null);
    const handleClick = (event) => {
        setAnchorElement(anchorElement ? null : event.currentTarget);
    };
    const isPopperOpen = Boolean(anchorElement);
    const popper_id = isPopperOpen ? 'simple-popper' : undefined;

    const selectedHouseholdChanged = (event)=>{
        console.log("New Selected Household")
        console.log(households.filter((household)=>household.id === event.target.value)[0])
        setSelectedHousehold(households.filter((household)=>household.id === event.target.value)[0])
    }

    const userTextStyle = {
        fontWeight: 'fontWeightBold',
        fontSize: 22,
    }

    const typeTextStyle = {
        fontSize: 22,
    }

    return(<div className={"px-2"}>
        <Avatar onClick={handleClick} sx={name.sx}>{name.children}</Avatar>
        <Popper sx={{minWidth: 200}} id={popper_id} open={isPopperOpen} anchorEl={anchorElement}>
            <Card>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Logged in as:
                    </Typography>
                    <div className={"p-2 flex flex-col justify-center"}>
                        <div className={"flex flex-row items-start space-x-2"}>
                            <Typography sx={typeTextStyle}>Name:</Typography>
                            <Typography sx={userTextStyle}>{user.name}</Typography>
                        </div>
                        <div className={"flex flex-row items-start space-x-2"}>
                            <Typography sx={typeTextStyle}>Email:</Typography>
                            <Typography sx={userTextStyle}>{user.email}</Typography>
                        </div>
                        <Typography sx={typeTextStyle}>Household</Typography>
                        <Select
                            labelId="household-select-label"
                            id="household-select"
                            value={selectedHousehold.id}
                            label="Household"
                            onChange={selectedHouseholdChanged}
                        >
                            {households.map((household)=>{
                                return <MenuItem key={`household-${household.id}`} value={household.id}>{household.name}</MenuItem>
                            })}
                        </Select>
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant={"contained"} color="inherit" onClick={()=>{
                        navigate("/household");
                    }}>Manage Households</Button>
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