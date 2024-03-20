import React from 'react';
import ReactDOM, {hydrateRoot} from 'react-dom/client';
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
import AddItem from "./pages/items/AddItem";
import UploadImage from "./pages/image/UploadImage";
import DeleteItemPage from "./pages/items/DeleteItemPage";
import UpdateItemPage from "./pages/items/UpdateItemPage";
import LoginPage from "./pages/auth/LoginPage";
import RouteProvider from "./routes/RouteProvider";
import LoginHandler from "./components/handlers/LoginHandler";


export function updateRouter(isAuthenticated)
{
    let router = createRouter(isAuthenticated)
    root.render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

function createRouter(isAuthenticated)
{
    return createBrowserRouter([
        {
            path:'/',
            element:<Root/>,
            errorElement:<ErrorPage/>,
            children:RouteProvider(isAuthenticated)
        }])
}

let router = createRouter(false)

let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
