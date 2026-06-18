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
  const [formData, setFormData] = useState({ email: "", password: "" });

  if (user && !authLoading) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({ title: "Sign in failed", description: "Invalid credentials. Please try again.", variant: "destructive" });
      } else {
        toast({ title: "Signed in!", description: "Welcome back to the Instructor Hub." });
        navigate("/dashboard");
      }
    } catch {
      toast({ title: "Error", description: "An unexpected error occurred. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#ff4500]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex h-screen font-sans">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[45%] flex-col bg-[#050d1e] p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse 70% 50% at 20% 80%, rgba(255, 69, 0, 0.15) 0%, transparent 60%)' }} />

        {/* Quote */}
        <div className="relative z-10 flex flex-1 flex-col justify-center max-w-sm">
          <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-6">Instructor portal</p>
          <blockquote className="text-[22px] leading-[1.4] font-bold text-white mb-6">
            "Shape the Future of Digital Transformation. Join DTMA's community of expert instructors and drive digital transformation education forward."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ff4500] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">DI</div>
            <div>
              <div className="text-[14px] font-semibold text-white">DTMA Instructor</div>
              <div className="text-[12px] text-white/50">Digital Transformation Expert</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-10 border-t border-white/10 pt-8">
          {[{ value: "Create", label: "Courses" }, { value: "Inspire", label: "Learners" }, { value: "Transform", label: "Education" }].map((s) => (
            <div key={s.label}>
              <div className="text-[22px] font-bold text-white">{s.value}</div>
              <div className="text-[12px] text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-[55%] flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-16">
          <div className="w-full max-w-[400px]">

            {/* Back link */}
            <Link to="/" className="inline-flex items-center gap-2 text-[13px] text-[#9a9aaa] hover:text-[#0a0f1e] transition-colors mb-10">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-3">Instructor access</p>
              <h1 className="text-[36px] leading-[1.1] font-bold text-[#0a0f1e] mb-2">
                Instructor Sign In
              </h1>
              <p className="text-[15px] text-[#9a9aaa]">Access your instructor dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[13px] font-medium text-[#0a0f1e]">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9aaa]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your instructor email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-11 border-[#e8e8ec] rounded-xl focus:border-[#ff4500] focus:ring-0 text-[14px] text-[#0a0f1e] placeholder:text-[#9a9aaa]"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-[13px] font-medium text-[#0a0f1e]">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9aaa]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 h-11 border-[#e8e8ec] rounded-xl focus:border-[#ff4500] focus:ring-0 text-[14px] text-[#0a0f1e] placeholder:text-[#9a9aaa]"
                    required
                    minLength={6}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9aaa] hover:text-[#0a0f1e] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#ff4500] hover:bg-[#cc3700] text-white text-[14px] font-semibold rounded-full transition-colors mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <p className="text-center text-[13px] text-[#9a9aaa] mt-8">
              Don't have an account?{" "}
              <Link to="/instructor-application" className="text-[#ff4500] font-semibold hover:text-[#cc3700] transition-colors">
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
