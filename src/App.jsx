import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Login, { action, action as loginAction } from "./pages/Login";
import Signup, { action as signupAction } from "./pages/Signup";
import MenuUpload from "./pages/MenuUpload";
import MenuPage from "./pages/MenuPage";
import LocationPage from "./pages/LocationPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "signup",
        element: <Signup />,
        action: signupAction,
      },
      {
        path: "menupan",
        element: <MenuUpload />,
      },
      {
        path: "dummy",
        element: <MenuPage />,
      },
      {
        path: "where",
        element: <LocationPage />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
