import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryProvider from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryProvider>
  );
}
