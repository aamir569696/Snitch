import { createBrowserRouter } from "react-router";
import Register from "../feature/auth/pages/Register";
import Login from "../feature/auth/pages/Login";
import CreateProduct from "../feature/products/pages/CreateProduct";
import Dashbord from "../feature/products/pages/Dashbord";
import Protected from "../feature/auth/components/Protected";

export const router = createBrowserRouter([

{
    path: "/",
    element: <h1>Home</h1>
},
{
    path: "/register",
    element: <Register />
},
{
    path: "/login",
    element: <Login />
},
{
    path:"/seller",

    children:[
        {
            path:"/seller/create-product",
            element:<Protected> <CreateProduct/> </Protected>
        },
        {
            path:"/seller/dashboard",
            element:<Dashbord/>
        }
    ]
}

])
