
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import MenuPage from "./pages/Menu";
import HistoryPage from "./pages/History";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { BillProvider } from "./context/BillContext";
import { AdminProvider, useAdmin } from "./context/AdminContext";

const queryClient = new QueryClient();

// Create a component that connects AdminContext to BillProvider
const BillProviderWithAdmin = ({ children }: { children: React.ReactNode }) => {
  const { gstPercentage } = useAdmin();
  return <BillProvider gstPercentage={gstPercentage}>{children}</BillProvider>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <BillProviderWithAdmin>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BillProviderWithAdmin>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
