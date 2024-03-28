import ReceiptsPage from "../pages/receipts/ReceiptsPage";
import SingleReceiptPage from "../pages/receipts/SingleReceiptPage";
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
import ReceiptDataGrid from "../pages/receipts/ReceiptDataGrid";
import {getSingleReceipt} from "../components/utils/BackendAccess"


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
        path:'/test',
        element:<ReceiptDataGrid receipt={async () => {
            await getSingleReceipt(1)
        }}/>,
        isProtected:false,
    },
]

    return routes.filter((route)=>{
        return (isAuthenticated || !route.isProtected)
    })
}