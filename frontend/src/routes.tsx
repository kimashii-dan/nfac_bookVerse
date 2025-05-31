import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Favorites from "./components/pages/Favorites";
import MainLayout from "./components/pages/MainLayout";
import AuthLayout from "./components/pages/AuthLayout";
import BookPage from "./components/pages/BookPage";
import NotFound from "./components/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/books/:id",
        element: <BookPage />,
      },
      {
        path: "/favorites/:id",
        element: <BookPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
