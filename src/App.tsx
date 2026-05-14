import "@/styles/dq-design-tokens.css";
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
import InstructorApplication from "./pages/InstructorApplication";
import LearnerOnboarding from "./pages/LearnerOnboarding";
import LearnerDashboard from "./pages/dashboard/LearnerDashboard";
import InstructorDashboard from "./pages/dashboard/InstructorDashboard";
import InstitutionDashboard from "./pages/dashboard/InstitutionDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import SMSDashboard from "./pages/dashboard/SMSDashboard";
import Masterclasses from "./pages/Masterclasses";
import MasterclassDetail from "./pages/MasterclassDetail";
import MasterclassBooking from "./pages/MasterclassBooking";
import CourseBuilder from "./pages/CourseBuilder";
import NotFound from "./pages/NotFound";
import SixXD from "./pages/SixXD";
import Testimonials from "./pages/Testimonials";
import DigitalWorkers from "./pages/personas/DigitalWorkers";
import TransformationSpecialists from "./pages/personas/TransformationSpecialists";
import OrganizationalLeaders from "./pages/personas/OrganizationalLeaders";
import DigitalEconomy from "./pages/dimensions/DigitalEconomy";
import DigitalCognitiveOrganisation from "./pages/dimensions/DigitalCognitiveOrganisation";
import DigitalBusinessPlatform from "./pages/dimensions/DigitalBusinessPlatform";
import DigitalTransformation from "./pages/dimensions/DigitalTransformation";
import DigitalWorkerWorkspace from "./pages/dimensions/DigitalWorkerWorkspace";
import DigitalAccelerators from "./pages/dimensions/DigitalAccelerators";
import Faculty from "./pages/Faculty";
import FacultyDetail from "./pages/FacultyDetail";
import AIStudyBuddyPage from "./pages/AIStudyBuddyPage";
import Blog from "./pages/Blog";
import Accreditation from "./pages/Accreditation";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Help from "./pages/Help";

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
    if (location.pathname.startsWith("/instructor-")) {
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
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/6xd" element={<SixXD />} />
      <Route path="/personas/digital-workers" element={<DigitalWorkers />} />
      <Route path="/personas/transformation-specialists" element={<TransformationSpecialists />} />
      <Route path="/personas/organizational-leaders" element={<OrganizationalLeaders />} />
      <Route path="/dimensions/digital-economy" element={<DigitalEconomy />} />
      <Route path="/dimensions/digital-cognitive-organisation" element={<DigitalCognitiveOrganisation />} />
      <Route path="/dimensions/digital-business-platform" element={<DigitalBusinessPlatform />} />
      <Route path="/dimensions/digital-transformation" element={<DigitalTransformation />} />
      <Route path="/dimensions/digital-worker-workspace" element={<DigitalWorkerWorkspace />} />
      <Route path="/dimensions/digital-accelerators" element={<DigitalAccelerators />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/faculty/:id" element={<FacultyDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/accreditation" element={<Accreditation />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/help" element={<Help />} />
      <Route path="/instructor-application" element={<InstructorApplication />} />
      <Route path="/learner-onboarding" element={<ProtectedRoute><LearnerOnboarding /></ProtectedRoute>} />
      <Route path="/masterclasses/:id" element={<MasterclassDetail />} />
      <Route path="/masterclasses/:id/booking" element={<ProtectedRoute><MasterclassBooking /></ProtectedRoute>} />
      <Route path="/courses/:courseId/builder" element={<ProtectedRoute><CourseBuilder /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/sms-admin" element={<SMSDashboard />} />
      <Route path="/ai-study-buddy" element={<ProtectedRoute><AIStudyBuddyPage /></ProtectedRoute>} />
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
