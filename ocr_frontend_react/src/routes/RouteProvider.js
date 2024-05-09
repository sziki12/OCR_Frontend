import AllReceiptPage from "../pages/receipts/AllReceiptPage";
import AddItem from "../pages/items/AddItem";
import DeleteReceiptPage from "../pages/receipts/DeleteReceipt";
import DeleteItemPage from "../pages/items/DeleteItemPage";
import UploadImage from "../pages/image/UploadImage";
import LoginPage from "../pages/auth/LoginPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import React from "react";
import ReceiptMainPage from "../pages/receipts/ReceiptMainPage";
import ReceiptTab from "../components/tabs/ReceiptTab";
import EditablePlace from "../components/places/EditablePlace";
import AddPlacePage from "../pages/places/AddPlacePage";
import ChartPage from "../pages/chart/ChartPage";


export default function RouteProvider(isAuthenticated)
{
    let routes = [
    {
        path:'/receipts',
        element:<AllReceiptPage/>,
        isProtected:true,
    },
    {
        path:'/receipts/:receiptId',
        element:<ReceiptMainPage/>,
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
        path: '/places',
        element: <AddPlacePage/>,
        isProtected: true,
    },
    {
        path:'/chart',
        element:<ChartPage/>,
        isProtected:true,
    },
]

    return routes.filter((route)=>{
        return (isAuthenticated || !route.isProtected)
    })
}