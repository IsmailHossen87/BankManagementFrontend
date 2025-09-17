import App from "@/App";
import About from "@/pages/About";
import Home from "@/pages/Home";
import DashboardLayout from "@/pages/DashBoardLaylout/DashboardLayout";
import { LoginForm } from "@/pages/Login";
import { RegisterForm } from "@/pages/register";


import { createBrowserRouter } from "react-router";
import CompleteProfile from "@/pages/CompleteProfile";
import AdminDasboardLayout from "@/pages/DashBoardLaylout/Admin/AdminDasboardLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,    // means "/"
                Component: Home,
            },
            {
                path: "about",
                Component: About,
            },
        ],
    },

    { path: "/login", Component: LoginForm },
    { path: "/register", Component: RegisterForm },
    { path: "/complete-profile", Component: CompleteProfile },


   {
  path: "/dashboard",
  Component: DashboardLayout,
  children: [
    {
      path: "complete-profile",
      Component: CompleteProfile,
    },
    {
      path: "admin",
      Component: AdminDasboardLayout,
    }
  ],
}




]);
