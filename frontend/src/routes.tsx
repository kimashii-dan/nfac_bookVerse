import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Favorites from "./components/pages/Favorites";
import Profile from "./components/pages/Profile";
import MainLayout from "./components/pages/MainLayout";
import AuthLayout from "./components/pages/AuthLayout";
import BookPage from "./components/pages/BookPage";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/:id",
        element: <BookPage />,
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
