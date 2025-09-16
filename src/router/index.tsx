import App from "@/App";

import About from "@/pages/About";
import Home from "@/pages/Home";
import { LoginForm } from "@/pages/Login";
import { RegisterForm } from "@/pages/register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                Component: Home,
                index: true
            },
            {
                path: "about",
                Component: About
            },

        ]
    },
    {
        path: "/login",
        Component: LoginForm
    },
    {
        path: "/register",
        Component: RegisterForm
    },
])