import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Quizzes from "./pages/Quizzes";
import Exams from "./pages/Exams";
import Videos from "./pages/Videos";
import LearnAI from "./pages/LearnAI";
import Alumni from "./pages/Alumni";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<GetStarted />} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/learn-ai" element={<LearnAI />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/profile" element={<Profile />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
