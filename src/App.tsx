import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout"; // Import the new Layout component
import CollegeFinder from "./pages/CollegeFinder";
import FormFillingGuide from "./pages/FormFillingGuide";
import ILSRound from "./pages/ILSRound";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}> {/* Use Layout as the parent route */}
            <Route index element={<Navigate to="/college-finder" replace />} /> {/* Redirect root to college finder */}
            <Route path="college-finder" element={<CollegeFinder />} />
            <Route path="form-filling-guide" element={<FormFillingGuide />} />
            <Route path="ils-round" element={<ILSRound />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;