import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Icon,
    Typography,
    IconButton,
    Popper,
    Card,
    Drawer,
    useMediaQuery
} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faGears,
    faHouse,
    faMapLocationDot,
    faReceipt,
    faChartPie,
    faSun,
    faMoon,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";
import {AuthData} from "../handlers/LoginHandler";
import ProfileAvatar from "../avatars/ProfileAvatar";
import React from "react";
import {ThemeData} from "../handlers/ThemeHandler";
import AppDrawer from "./AppDrawer";


export default function MainToolbar() {
    const {user} = AuthData();
    const {switchTheme, selectedTheme} = ThemeData();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const mobile = useMediaQuery((theme) => theme.breakpoints.down('mobile'), {noSsr: true});

    return (
        <Box sx={{flexGrow: 1}}>
            {
                (mobile)
                    ?
                    <DesktopAppBar user={user} selectedTheme={selectedTheme} switchTheme={switchTheme}
                                   navigate={navigate}/>
                    :
                    <MobileAppBar selectedTheme={selectedTheme} switchTheme={switchTheme} user={user}
                                  navigate={navigate}
                                  toggleDrawer={toggleDrawer} open={open}/>
            }
        </Box>
    )
}

function MobileAppBar({selectedTheme, user, switchTheme, toggleDrawer, open, navigate}) {
    return (<>
        <AppBar position={"static"}>
            <Toolbar>
                <IconButton onClick={toggleDrawer(true)}>
                    <FontAwesomeIcon icon={faBars} width={50}/>
                </IconButton>
                <Typography component="div" sx={{flexGrow: 1}}></Typography>
                <IconButton onClick={() => switchTheme()}>
                    {
                        (selectedTheme.palette.mode === "light")
                            ?
                            <FontAwesomeIcon icon={faSun} width={50}/>
                            :
                            <FontAwesomeIcon icon={faMoon} width={50}/>
                    }
                </IconButton>
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
                                <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                            </>
                    }
                </>
            </Toolbar>
        </AppBar>
        <AppDrawer open={open} toggleDrawer={toggleDrawer} isAuthenticated={user.isAuthenticated}/>
    </>)
}

function DesktopAppBar({selectedTheme, user, switchTheme, navigate}) {
    return (
        <AppBar position={"static"}>
            <Toolbar>
                <IconButton onClick={() => {
                    navigate("/")
                }}>
                    <FontAwesomeIcon icon={faHouse} width={50}/>
                </IconButton>
                <IconButton onClick={() => {
                    if (user.isAuthenticated)
                        navigate('/receipts')
                    else
                        navigate('/login')
                }}>
                    <FontAwesomeIcon icon={faReceipt} width={50}/>
                </IconButton>
                <IconButton onClick={() => {
                    if (user.isAuthenticated)
                        navigate('/places')
                    else
                        navigate('/login')
                }}>
                    <FontAwesomeIcon icon={faMapLocationDot} width={50}/>
                </IconButton>
                <IconButton onClick={() => {
                    (user.isAuthenticated) ? navigate("/upload/image") : navigate("/login")
                }}>
                    <FontAwesomeIcon icon={faGears} width={50}/>
                </IconButton>
                <IconButton onClick={() => {
                    (user.isAuthenticated) ? navigate("/chart") : navigate("/login")
                }}>
                    <FontAwesomeIcon icon={faChartPie} width={50}/>
                </IconButton>
                <Typography component="div" sx={{flexGrow: 1}}></Typography>
                <IconButton onClick={() => switchTheme()}>
                    {
                        (selectedTheme.palette.mode === "light")
                            ?
                            <FontAwesomeIcon icon={faSun} width={50}/>
                            :
                            <FontAwesomeIcon icon={faMoon} width={50}/>
                    }
                </IconButton>
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
                                <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                            </>
                    }
                </>
            </Toolbar>
        </AppBar>)
}