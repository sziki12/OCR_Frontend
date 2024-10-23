import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {ReceiptData} from "../states/ReceiptState";
import {useEffect, useState} from "react";
import {ReceiptImageEndpointFunctions} from "../../dist/endpoints/ReceiptImageEndpoint"
import {Dialog} from "@mui/material";
import ImageView from "./ImageView";
import * as Utils from "../utils/Utils";
import {ThemeData} from "../handlers/ThemeHandler";
import {HouseholdData} from "../states/HouseholdState";

export default function ReceiptImageList() {
    const {receipt} = ReceiptData()
    const {getImage} = ReceiptImageEndpointFunctions()
    const {selectedHousehold} = HouseholdData()
    const [images, setImages] = useState([])

    const [open, setOpen] = React.useState({});
    const {breakpoints} = ThemeData();

    const handleClickOpen = (imageId) => {
        setOpen((prev) => {
            return ({...prev, [imageId]: true})
        });
    };

    const handleClose = (imageId) => {
        setOpen((prev) => {
            return ({...prev, [imageId]: false})
        });
    };

    useEffect(() => {
        if (receipt && receipt.images) {
            for (let image of receipt.images) {
                getImage(selectedHousehold.id, receipt.id, image.id).then((blob) => {
                    setImages((prev) => {
                        let otherImages = prev.filter((img) => {
                            return img.id !== image.id
                        })
                        return ([
                            ...otherImages, {
                                id: image.id,
                                name: image.name,
                                src: URL.createObjectURL(blob)
                            }
                        ])
                    })
                    setOpen((prev) => {
                        if (Utils.isObjectEmpty(prev)) {
                            return ({
                                [image.id]: false
                            })
                        } else {
                            return ({
                                ...prev,
                                [image.id]: false
                            })
                        }
                    })
                })
            }
        }
    }, [receipt.images])
    return (
        <div className={"flex justify-center"}>
            <ImageList sx={{
                width: (breakpoints.sm) ? (300) : ((breakpoints.md) ? (450) : (600)),
                height: (breakpoints.sm) ? (300) : ((breakpoints.md) ? (450) : (600))
            }} cols={3} rowHeight={(breakpoints.sm) ? (80) : ((breakpoints.md) ? (120) : (164))} variant="quilted">
                {
                    (images.length > 0)
                        ?
                        images.map((item) => (
                            <>
                                <ImageListItem key={item.src} cols={3} rows={4}>
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        loading="lazy"
                                        onClick={() => handleClickOpen(item.id)}
                                    />
                                </ImageListItem>
                                <Dialog
                                    fullScreen
                                    open={open[item.id]}
                                    onClose={() => handleClose(item.id)}
                                >
                                    <ImageView imageData={item} handleClose={handleClose}/>
                                </Dialog>
                            </>
                        ))
                        :
                        <></>
                }
            </ImageList>
        </div>
    );
}