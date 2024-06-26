import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import AddMenu from "../pages/Admin/AddMenu";
import UserRole from "../pages/Admin/UserRole";
import MoreStats from "../pages/Admin/MoreStats";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'menu',
          element: <PrivateRoute> <Menu></Menu></PrivateRoute>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'addmenu',
          element: <AddMenu></AddMenu>
        },
        {
          path: 'userrole',
          element: <UserRole></UserRole>
        },
        {
          path: 'morestats',
          element: <MoreStats></MoreStats>
        }
      ]
    },
  ]);