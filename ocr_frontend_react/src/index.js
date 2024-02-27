import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import ReceiptsPage from './pages/receipts/ReceiptsPage';
import SingleReceiptPage from './pages/receipts/SingleReceiptPage';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

//TODO <Link to="" />
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
