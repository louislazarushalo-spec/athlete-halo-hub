import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import AthletesPage from "./pages/AthletesPage";
import AthletePage from "./pages/AthletePage";
import FeedPage from "./pages/FeedPage";
import FanHomePage from "./pages/FanHomePage";
import ExplorePage from "./pages/ExplorePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CausePage from "./pages/CausePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AccountPage from "./pages/AccountPage";
import SubscribePage from "./pages/SubscribePage";
import SubscribePaymentPage from "./pages/SubscribePaymentPage";
import SubscribeSuccessPage from "./pages/SubscribeSuccessPage";
import TrainingProgramPage from "./pages/TrainingProgramPage";
import MatthieuTrainingProgramPage from "./pages/MatthieuTrainingProgramPage";
import CassandreTrainingProgramPage from "./pages/CassandreTrainingProgramPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminContentPage from "./pages/AdminContentPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/home" element={
                    <ProtectedRoute>
                      <FanHomePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/explore" element={
                    <ProtectedRoute>
                      <ExplorePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/athletes" element={
                    <ProtectedRoute>
                      <AthletesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/athlete/:id" element={<AthletePage />} />
                  <Route path="/athlete/:id/cause" element={
                    <ProtectedRoute>
                      <CausePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/feed" element={<FeedPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/subscribe/:id" element={<SubscribePage />} />
                  <Route path="/subscribe/:id/payment" element={<SubscribePaymentPage />} />
                  <Route path="/subscribe/:id/success" element={<SubscribeSuccessPage />} />
                  <Route path="/athlete/arthur-cazaux/training/:programId" element={<TrainingProgramPage />} />
                  <Route path="/athlete/matthieu-jalibert/training/:programId" element={<MatthieuTrainingProgramPage />} />
                  <Route path="/athlete/cassandre-beaugrand/training/:programId" element={<CassandreTrainingProgramPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  <Route path="/admin/content" element={<AdminContentPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
