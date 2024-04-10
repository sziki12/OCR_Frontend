
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {ReceiptData} from "../states/ReceiptState";
import {useEffect, useState} from "react";
import {getImage} from "../utils/BackendAccess"

export default function ReceiptImageList() {
    const {receipt} = ReceiptData()
    const [images,setImages] = useState([])
    const [blob,setBlob] = useState()
    const [url,setUrl] = useState()
    //TODO useState object, [imageId]:imageResponse, toUrl

    useEffect(()=>{
        if(receipt&&receipt.images)
        {
            setImages(receipt.images)
            getImage(receipt.id,receipt.images[0].id).then((blob)=>{
                setBlob(blob)
                setUrl(URL.createObjectURL(blob))
            })
        }
        else {
            console.log(receipt)
        }
    },[receipt.images])
    console.log(blob)
    console.log(url)
    return (
        <ImageList sx={{width:600,height:600}} cols={2} rowHeight={164}>
            {
                (images.length>0)
                ?
                    images.map((item) => (
                    <>
                        <ImageListItem key={`${url}0`} cols={2} rows={4}>
                            <img
                                src={`${url}`}
                                alt={item.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                        <ImageListItem key={`${url}1`}>
                            <img
                                src={`${url}`}
                                alt={item.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                        <ImageListItem key={`${url}2`}>
                            <img
                                src={`${url}`}
                                alt={item.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                        <ImageListItem key={`${url}3`}>
                            <img
                                src={`${url}`}
                                alt={item.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                    </>
                    ))
                :
                    <></>
            }
        </ImageList>
    );
}