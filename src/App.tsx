import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import CollegeFinder from "./pages/CollegeFinder";
import FormFillingGuide from "./pages/FormFillingGuide";
import ILSRound from "./pages/ILSRound";
import PrepareDocuments from "./pages/PrepareDocuments";
import NotFound from "./pages/NotFound";
import Login from "./components/Auth/Login"; // Import Login
import Signup from "./components/Auth/Signup"; // Import Signup
import CollegeNetwork from "./pages/CollegeNetwork"; // Import CollegeNetwork

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/college-finder" replace />} />
            <Route path="college-finder" element={<CollegeFinder />} />
            <Route path="form-filling-guide" element={<FormFillingGuide />} />
            <Route path="prepare-documents" element={<PrepareDocuments />} />
            <Route path="ils-round" element={<ILSRound />} />
            <Route path="login" element={<Login />} /> {/* New Login Route */}
            <Route path="signup" element={<Signup />} /> {/* New Signup Route */}
            <Route path="college-network" element={<CollegeNetwork />} /> {/* New College Network Route */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;