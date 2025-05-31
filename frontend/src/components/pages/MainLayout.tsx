import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ChatWrapper from "../ChatWrapper";
import ErrorBoundary from "../providers/ErrorBoundary";
import { useAuth } from "../../hooks/useAuth";

export default function MainLayout() {
  const { removeAuth } = useAuth();
  return (
    <>
      <header className="p-6 border-b">
        <Header />
      </header>
      <main className="flex-1">
        <ErrorBoundary removeAuth={removeAuth}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <ChatWrapper />
      <footer className="p-6 border-t">
        <Footer />
      </footer>
    </>
  );
}
