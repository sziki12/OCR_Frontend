import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RouteProvider from "./routes/RouteProvider";
import {getUser} from "./services/AuthService";

export function updateRouter(isAuthenticated) {
    let router = createRouter(isAuthenticated)
    root.render(
        <RouterProvider router={router}/>
    );
}

function createRouter(isAuthenticated) {
    return createBrowserRouter([
        {
            path: '/',
            element: <Root/>,
            errorElement: <ErrorPage/>,
            children: RouteProvider(isAuthenticated)
        }])
}

let savedUser = getUser();
//Locks the auth required pages
let router = createRouter((savedUser) ? savedUser.isAuthenticated : false)

let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
