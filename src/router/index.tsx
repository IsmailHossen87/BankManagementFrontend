import App from "@/App";

import About from "@/pages/About";
import Home from "@/pages/Home";
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
           }
]
    }
])