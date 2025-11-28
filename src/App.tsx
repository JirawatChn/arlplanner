import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Predict from "./pages/Predict";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/predict", element: <Predict /> },
    { path: "/overview", element: <Overview /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "*", element: <NotFound /> },
  ],
  {
    basename: "/arlplanner",
  }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: false,
        }}
      />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
