import App from "@/App";
import About from "@/pages/About";
import Home from "@/pages/Home";
import DashboardLayout from "@/pages/DashBoardLaylout/DashboardLayout";
import { LoginForm } from "@/pages/Login";
import { RegisterForm } from "@/pages/register";


import { createBrowserRouter } from "react-router";
import CompleteProfile from "@/pages/user/CompleteProfile";
import AdminDasboardLayout from "@/pages/DashBoardLaylout/Admin/AdminDasboardLayout";
import DataAnalysic from "@/pages/user/CreditScore";
import CreditScore from "@/pages/user/CreditScore";

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
    { path: "/creditScore", Component: CreditScore },


   {
  path: "/dashboard",
  Component: DashboardLayout,
  children: [
    {
      path: "complete-profile",
      Component: CompleteProfile,
    },
    {
      path: "creditScore",
      Component: CreditScore,
    },
    {
      path: "admin",
      Component: AdminDasboardLayout,
    }
  ],
}




]);
