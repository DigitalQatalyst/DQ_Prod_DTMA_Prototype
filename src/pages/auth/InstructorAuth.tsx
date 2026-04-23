import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Loader2 } from "lucide-react";

const InstructorAuth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signIn, loading: authLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // If user is logged in and signing in, redirect to dashboard
  if (user && !authLoading) {
    // Redirect to dashboard instead of showing it directly
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        toast({
          title: "Sign in failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed in!",
          description: "Welcome back to the Instructor Hub.",
        });
        // Redirect to dashboard after signin
        navigate("/dashboard");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#1e2348] via-[#2a3058] to-[#1e2348]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1974&auto=format&fit=crop"
            alt="Digital transformation"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/dtma-logo.png"
              alt="DTMA"
              className="h-[50px] w-auto"
            />
          </Link>

          <div className="max-w-md">
            <h2 className="text-[18px] leading-[28px] font-normal mb-4 text-white">
              "Shape the Future of Digital Transformation. Join DTMA's community of expert instructors and drive digital transformation education forward."
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ff6b4d]" />
              <div>
                <div className="text-[14px] leading-[20px] font-medium text-white">DTMA Instructor</div>
                <div className="text-[12px] leading-[16px] font-normal text-white/70">Digital Transformation Expert</div>
              </div>
            </div>
          </div>

          <div className="flex gap-12">
            <div>
              <div className="text-[24px] leading-[32px] font-medium text-white">Create</div>
              <div className="text-[12px] leading-[16px] font-normal text-white/70">Courses</div>
            </div>
            <div>
              <div className="text-[24px] leading-[32px] font-medium text-white">Inspire</div>
              <div className="text-[12px] leading-[16px] font-normal text-white/70">Learners</div>
            </div>
            <div>
              <div className="text-[24px] leading-[32px] font-medium text-white">Transform</div>
              <div className="text-[12px] leading-[16px] font-normal text-white/70">Education</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white">
        <div className="lg:hidden p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/dtma-logo.png"
              alt="DTMA"
              className="h-[40px] w-auto"
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[14px] leading-[20px] font-normal text-muted-foreground hover:text-[#ff6b4d] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <div className="mb-8">
              <h1 className="text-[32px] leading-[40px] font-semibold text-[#0B0C19] mb-2">
                Instructor Sign In
              </h1>
              <p className="text-[14px] leading-[20px] font-normal text-[#4B5563]">
                Access your instructor dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[12px] leading-[16px] font-medium text-[#1e2348]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your instructor email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-11 h-12 text-[14px] leading-[20px] bg-white border-gray-300 text-[#1e2348] placeholder:text-gray-400 focus:border-[#ff6b4d] focus:ring-[#ff6b4d] transition-all"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[12px] leading-[16px] font-medium text-[#1e2348]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-11 pr-11 h-12 text-[14px] leading-[20px] bg-white border-gray-300 text-[#1e2348] placeholder:text-gray-400 focus:border-[#ff6b4d] focus:ring-[#ff6b4d] transition-all"
                    required
                    minLength={6}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1e2348] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[16px] leading-[24px] font-normal"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <p className="text-center text-[14px] leading-[20px] font-normal text-muted-foreground mt-8">
              Don't have an account?{" "}
              <Link to="/instructor-application" className="text-[#ff6b4d] font-medium hover:underline">
                Apply to become an instructor
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorAuth;
