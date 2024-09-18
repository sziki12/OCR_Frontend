import React from "react";
import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {faChartPie, faGears, faHouse, faMapLocationDot, faReceipt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RouteProvider from "../../routes/RouteProvider";
import {useNavigate} from "react-router-dom";


export default function AppDrawer({open, toggleDrawer, isAuthenticated}) {

    const navigate = useNavigate();
    const controlMenuItems = [
        {title: "Home Page", icon: faHouse, path: "/"},
        {title: "My Receipts", icon: faReceipt, path: "/receipts"},
        {title: "Places", icon: faMapLocationDot, path: "/places"},
        {title: "Process Image", icon: faGears, path: "/upload/image"},
        {title: "Charts", icon: faChartPie, path: "/chart"},
    ]

    const validRoutes = RouteProvider(true)

    const preferenceMenuItems = []

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            <ListFromItems menuItems={controlMenuItems} validRoutes={validRoutes} isAuthenticated={isAuthenticated}
                           navigate={navigate}/>
            <Divider/>
            <ListFromItems menuItems={preferenceMenuItems} validRoutes={validRoutes} isAuthenticated={isAuthenticated}/>
        </Box>
    );

    return (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    )
}

function ListFromItems({menuItems, validRoutes, isAuthenticated, navigate}) {
    return (<>
        <List>
            {menuItems.map(menuItem => (
                <ListItem key={menuItem.title} disablePadding onClick={
                    ((isPathProtected(menuItem.path, validRoutes)))
                        ?
                        () => {
                            if (isAuthenticated) {
                                navigate(menuItem.path)
                            }
                            else {
                                navigate('/login')
                            }
                        }
                        :
                        () => {
                            navigate(menuItem.path)
                        }
                }>
                    <ListItemButton>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={menuItem.icon}/>
                        </ListItemIcon>
                        <ListItemText primary={menuItem.title}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </>)
}

function isPathProtected(selectedPath, validRoutes) {
    for (let route of validRoutes) {
        if (route.path === selectedPath) {
            return route.isProtected
        }
    }
    return null
}