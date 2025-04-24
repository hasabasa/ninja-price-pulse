
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PriceBot from "./pages/PriceBot";
import Sales from "./pages/Sales";
import UnitEconomics from "./pages/UnitEconomics";
import CRM from "./pages/CRM";
import KaspiProductAnalytics from "./pages/KaspiProductAnalytics";
import AdminPanel from "./pages/AdminPanel";
import KaspiAdminDashboard from "./pages/KaspiAdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/price-bot" element={<Layout><PriceBot /></Layout>} />
          <Route path="/sales" element={<Layout><Sales /></Layout>} />
          <Route path="/unit-economics" element={<Layout><UnitEconomics /></Layout>} />
          <Route path="/crm" element={<Layout><CRM /></Layout>} />
          <Route path="/kaspi-analytics" element={<Layout><KaspiProductAnalytics /></Layout>} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/kaspi-admin-dashboard" element={<Layout><KaspiAdminDashboard /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
