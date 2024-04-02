import ReceiptsPage from "../pages/receipts/ReceiptsPage";
import AddReceipt from "../pages/receipts/AddReceipt";
import AddItem from "../pages/items/AddItem";
import DeleteReceiptPage from "../pages/receipts/DeleteReceipt";
import DeleteItemPage from "../pages/items/DeleteItemPage";
import UploadImage from "../pages/image/UploadImage";
import LoginPage from "../pages/auth/LoginPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import React from "react";
import {AuthData} from "../components/handlers/LoginHandler";
import ReceiptMainPage from "../pages/receipts/ReceiptMainPage";
import {getSingleReceipt} from "../components/utils/BackendAccess"
import GoogleMap from "../components/maps/GoogleMap";


export default function RouteProvider(isAuthenticated)
{
    let routes = [
    {
        path:'/receipts',
        element:<ReceiptsPage/>,
        isProtected:true,
    },
    {
        path:'/receipts/:receiptId',
        element:<ReceiptMainPage/>,
        isProtected:true,
    },
    {
        path:'/create/receipts',
        element:<AddReceipt/>,
        isProtected:true,
    },
    {
        path:'/create/receipts/:receiptId',
        element:<AddItem/>,
        isProtected:true,
    },
    {
        path:'/delete/receipts/:receiptId',
        element:<DeleteReceiptPage/>,
        isProtected:true,
    },
    {
        path:'/delete/receipts/:receiptId/items/:itemId',
        element:<DeleteItemPage/>,
        isProtected:true,
    },
    {
        path:'/upload/image',
        element:<UploadImage/>,
        isProtected:true,
    },
    {
        path:'/login',
        element:<LoginPage/>,
        isProtected:false,
    },
    {
        path:'/register',
        element:<RegistrationPage/>,
        isProtected:false,
    },
        {
            path:'/map',
            element:<GoogleMap markers={[
                {
                    id:1,
                    location:{lat: 61.2176, lng: -149.8997}
                },
                {
                    id:2,
                    location:{lat: 60.2176, lng: -150.8997}
                },
                {
                    id:3,
                    location:{lat: 62.2176, lng: -151.8997}
                }
            ]}/>,
            isProtected:false,
        },
]

    return routes.filter((route)=>{
        return (isAuthenticated || !route.isProtected)
    })
}