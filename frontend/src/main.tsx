import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./components/providers/RouterProvider.tsx";
import Providers from "./components/providers/Providers.tsx";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Router />
      <Toaster />
    </Providers>
  </StrictMode>
);
