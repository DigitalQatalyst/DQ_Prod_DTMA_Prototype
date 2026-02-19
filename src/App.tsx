import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { FlowProvider, useFlow } from "@/contexts/FlowContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminAuth from "./pages/auth/AdminAuth";
import InstructorAuth from "./pages/auth/InstructorAuth";
import Categories from "./pages/Categories";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseLearning from "./pages/CourseLearning";
import About from "./pages/About";
import BecomeProvider from "./pages/BecomeProvider";
import ProviderApplication from "./pages/ProviderApplication";
import ProviderRegistration from "./pages/ProviderRegistration";
import ProviderVerification from "./pages/ProviderVerification";
import ProviderVerificationPending from "./pages/ProviderVerificationPending";
import InstitutionProviderRegistration from "./pages/InstitutionProviderRegistration";
import InstitutionVerification from "./pages/InstitutionVerification";
import LearnerOnboarding from "./pages/LearnerOnboarding";
import LearnerDashboard from "./pages/dashboard/LearnerDashboard";
import InstructorDashboard from "./pages/dashboard/InstructorDashboard";
import InstitutionDashboard from "./pages/dashboard/InstitutionDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Masterclasses from "./pages/Masterclasses";
import MasterclassDetail from "./pages/MasterclassDetail";
import MasterclassBooking from "./pages/MasterclassBooking";
import CourseBuilder from "./pages/CourseBuilder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

// Dashboard router based on role
function DashboardRouter() {
  const { role, profile, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (role === 'admin') {
    return <AdminDashboard />;
  }
  
  if (role === 'instructor') {
    // Check if it's an institution or individual instructor
    const providerType = profile?.provider_type;
    if (providerType === 'institution') {
      return <InstitutionDashboard />;
    }
    return <InstructorDashboard />;
  }
  
  return <LearnerDashboard />;
}

// Flow tracker component
function FlowTracker() {
  const { setFlow } = useFlow();
  const location = useLocation();

  useEffect(() => {
    // Set flow based on current route
    if (location.pathname.startsWith("/become-provider") || 
        location.pathname.startsWith("/provider-") ||
        location.pathname.startsWith("/institution-")) {
      setFlow("provider");
    } else if (location.pathname === "/" || 
               location.pathname.startsWith("/categories") ||
               location.pathname.startsWith("/courses") ||
               location.pathname.startsWith("/about")) {
      setFlow("learner");
    }
  }, [location.pathname, setFlow]);

  return null;
}

const AppRoutes = () => (
  <>
    <FlowTracker />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/admin" element={<AdminAuth />} />
      <Route path="/auth/instructor" element={<InstructorAuth />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/courses/:id/learn" element={<CourseLearning />} />
      <Route path="/about" element={<About />} />
      <Route path="/become-provider" element={<BecomeProvider />} />
      <Route path="/provider-apply" element={<ProviderApplication />} />
      <Route path="/provider-register/:type" element={<ProviderRegistration />} />
      <Route path="/provider-verification" element={<ProviderVerification />} />
      <Route path="/provider-verification-pending" element={<ProviderVerificationPending />} />
      <Route path="/institution-register/:type" element={<InstitutionProviderRegistration />} />
      <Route path="/institution-verification" element={<InstitutionVerification />} />
      <Route path="/learner-onboarding" element={<ProtectedRoute><LearnerOnboarding /></ProtectedRoute>} />
      <Route path="/masterclasses" element={<Masterclasses />} />
      <Route path="/masterclasses/:id" element={<MasterclassDetail />} />
      <Route path="/masterclasses/:id/booking" element={<ProtectedRoute><MasterclassBooking /></ProtectedRoute>} />
      <Route path="/courses/:courseId/builder" element={<ProtectedRoute><CourseBuilder /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <BrowserRouter>
        <AuthProvider>
          <FlowProvider>
            <AppRoutes />
          </FlowProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
