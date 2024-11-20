import {useEffect, useState} from "react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";


export default function ImageView({imageData, handleClose}) {
    const [image, setImage] = useState(imageData)

    useEffect(() => {
        setImage(imageData)
    }, [imageData])
    return (
        <>
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => handleClose(image.id)}
                        aria-label="close"
                    >
                        <FontAwesomeIcon icon={faXmark}/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Close
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={"flex justify-center"}>
                <img className={"h-screen"}
                     alt={image.name}
                     src={image.src}
                     loading={"lazy"}
                />
            </div>
        </>
    )
}