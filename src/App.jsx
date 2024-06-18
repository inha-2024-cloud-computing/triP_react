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
import MenuUpload from "./pages/MenuUpload";
import MenuPage from "./pages/MenuPage";
import { checkAuthLoader, getAuthToken, tokenLoader } from "./util/auth";
import ChatPage from "./pages/ChatPage";
import TokenExchange from "./components/TokenExchange";
import Error from "./pages/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",
    loader: getAuthToken,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menupan",
        element: <MenuUpload />,
        loader: checkAuthLoader,
      },

      {
        path: "chat",
        element: <ChatPage />,
        loader: checkAuthLoader,
      },
      {
        path: "token-exchange",
        element: <TokenExchange />,
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
