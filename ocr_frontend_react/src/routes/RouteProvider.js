import ReceiptsPage from "../pages/receipts/ReceiptsPage";
import SingleReceiptPage from "../pages/receipts/SingleReceiptPage";
import AddReceipt from "../pages/receipts/AddReceipt";
import AddItem from "../pages/items/AddItem";
import DeleteReceiptPage from "../pages/receipts/DeleteReceipt";
import UpdateReceipt from "../pages/receipts/UpdateReceipt";
import DeleteItemPage from "../pages/items/DeleteItemPage";
import UpdateItemPage from "../pages/items/UpdateItemPage";
import UploadImage from "../pages/image/UploadImage";
import LoginPage from "../pages/auth/LoginPage";
import React from "react";
import {AuthData} from "../components/handlers/LoginHandler";


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
        element:<SingleReceiptPage/>,
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
        path:'/update/receipts/:receiptId',
        element:<UpdateReceipt/>,
        isProtected:true,
    },
    {
        path:'/delete/receipts/:receiptId/items/:itemId',
        element:<DeleteItemPage/>,
        isProtected:true,
    },
    {
        path:'/update/receipts/:receiptId/items/:itemId',
        element:<UpdateItemPage/>,
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
]

    return routes.filter((route)=>{
        return (isAuthenticated || !route.isProtected)
    })
}