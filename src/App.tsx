import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CashFlow from "./pages/CashFlow";
import Expenses from "./pages/Expenses";
import Forecasting from "./pages/Forecasting";
import Risks from "./pages/Risks";
import Compliance from "./pages/Compliance";
import Reports from "./pages/Reports";
import Benchmarking from "./pages/Benchmarking";
import Bookkeeping from "./pages/Bookkeeping";
import Products from "./pages/Products";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import UploadAnalyze from "./pages/UploadAnalyze";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cash-flow" element={<CashFlow />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/forecasting" element={<Forecasting />} />
            <Route path="/risks" element={<Risks />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/benchmarking" element={<Benchmarking />} />
            <Route path="/bookkeeping" element={<Bookkeeping />} />
            <Route path="/products" element={<Products />} />
            <Route path="/security" element={<Security />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/upload" element={<UploadAnalyze />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
