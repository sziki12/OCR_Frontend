import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import ReceiptsPage from './pages/receipts/ReceiptsPage';
import SingleReceiptPage from './pages/receipts/SingleReceiptPage';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AddReceipt from "./pages/receipts/AddReceipt";
import DeleteReceiptPage from "./pages/receipts/DeleteReceipt";
import UpdateReceipt from "./pages/receipts/UpdateReceipt";
import AddItem from "./pages/receipts/items/AddItem";
import UploadImage from "./pages/receipts/image/UploadImage";
import DeleteItemPage from "./pages/receipts/items/DeleteItemPage";
import UpdateItemPage from "./pages/receipts/items/UpdateItemPage";
import ReceiptsFromImagePage from "./pages/receipts/image/ReceiptFromImage";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Root/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/receipts',
        element:<ReceiptsPage/>,
    },
    {
        path:'/receipts/:receiptId',
        element:<SingleReceiptPage/>,
    },
    {
        path:'/create/receipts',
        element:<AddReceipt/>,
    },
    {
        path:'/create/receipts/:receiptId',
        element:<AddItem/>,
    },
    {
        path:'/delete/receipts/:receiptId',
        element:<DeleteReceiptPage/>,
    },
    {
        path:'/update/receipts/:receiptId',
        element:<UpdateReceipt/>,
    },
    {
        path:'/delete/receipts/:receiptId/items/:itemId',
        element:<DeleteItemPage/>,
    },
    {
        path:'/update/receipts/:receiptId/items/:itemId',
        element:<UpdateItemPage/>,
    },
    {
        path:'/upload/image',
        element:<UploadImage/>,
    },
    ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
