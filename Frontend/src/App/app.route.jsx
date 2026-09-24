import { createBrowserRouter } from "react-router";
import Register from "../feature/auth/pages/Register";
import Login from "../feature/auth/pages/Login";
import CreateProduct from "../feature/products/pages/CreateProduct";
import Dashbord from "../feature/products/pages/Dashbord";
import Protected from "../feature/auth/components/Protected";
import Home from "../feature/products/pages/Home";
import ProductsDetail from "../feature/products/pages/ProductsDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path:"/productdetail/:productId",
    element:<ProductsDetail/>
  },

  {
    path: "/seller",
    children: [
      {
        path: "create-product",
        element: (
          <Protected role="seller">
            <CreateProduct />
          </Protected>
        ),
      },
      {
        path: "dashboard",
        element: <Protected role="seller">
            <Dashbord />
        </Protected>,
      },
    ],
  },
]);
