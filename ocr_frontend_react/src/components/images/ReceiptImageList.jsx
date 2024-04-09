
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {ReceiptData} from "../states/ReceiptState";
import {useEffect, useState} from "react";
import {getImage} from "../utils/BackendAccess"

export default function ReceiptImageList() {
    const {receipt} = ReceiptData()
    const [images,setImages] = useState([])
    const [image,setImage] = useState()
    //TODO useState object, [imageId]:imageResponse, toUrl

    useEffect(()=>{
        if(receipt&&receipt.images)
        {
            setImages(receipt.images)
            getImage(receipt.id,receipt.images[0].id).then((response)=>{
                if(response.ok)
                {
                    console.log(response.body)
                    setImage(response.body)
                    //TODO Recognize Image
                }
                else
                    console.log("ELSE")
            })
        }
        else {
            console.log(receipt)
        }
    },[receipt.images])
    return (
        <ImageList  sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {
                (images.length>0)
                ?
                    images.map((item) => (
                        <ImageListItem key={item.image}>
                            <img
                                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))
                :
                    <></>
            }
        </ImageList>
    );
}