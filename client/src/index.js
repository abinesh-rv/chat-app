import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import Chat from "./pages/Chat.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SetAvatar from './pages/SetAvatar';

const router = createBrowserRouter([
    {
        path:"/",
        element : <App/>,
        children:[
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"register",
            element:<Register/>
        },
        {
            path:"",
            element:<Chat/>
        },
        {
            path:"setAvatar",
            element:<SetAvatar/>
        }
    ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( <RouterProvider router={router} /> );
