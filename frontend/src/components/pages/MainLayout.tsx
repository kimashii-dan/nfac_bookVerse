import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function MainLayout() {
  return (
    <>
      <header className="p-4 border-b">
        <Header />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="p-4 border-t">
        <Footer />
      </footer>
    </>
  );
}
