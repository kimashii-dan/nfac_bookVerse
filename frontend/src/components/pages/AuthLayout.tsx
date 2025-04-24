import { Outlet, Navigate } from "react-router-dom";
import isLoggedIn from "../../helpers/isLoggedIn";

export default function AuthLayout() {
  if (isLoggedIn()) return <Navigate to="/" />;
  return (
    <main className="h-[90vh]">
      <Outlet />
    </main>
  );
}
