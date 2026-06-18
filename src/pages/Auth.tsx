import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Loader2 } from "lucide-react";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn, signUp, loading: authLoading } = useAuth();

  const redirectPath = searchParams.get("redirect");

  const [mode, setMode] = useState<"login" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewSignup, setIsNewSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
    agreeTerms: false,
  });

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "signup") setMode("signup");
    else setMode("login");
  }, [searchParams]);

  useEffect(() => {
    if (user && !authLoading && redirectPath) navigate(redirectPath);
  }, [user, authLoading, redirectPath, navigate]);

  useEffect(() => {
    if (user && !authLoading && isNewSignup) navigate("/learner-onboarding");
    else if (user && !authLoading && !redirectPath && !isNewSignup) navigate("/dashboard");
  }, [user, authLoading, isNewSignup, redirectPath, navigate]);

  if (user && !authLoading && !redirectPath && !isNewSignup) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (mode === "signup") {
        if (!formData.agreeTerms) {
          toast({ title: "Terms required", description: "Please agree to the Terms of Service and Privacy Policy", variant: "destructive" });
          setIsSubmitting(false);
          return;
        }
        const { error } = await signUp(formData.email, formData.password, formData.name, "learner");
        if (error) {
          let message = error.message;
          if (error.message.includes("already registered")) message = "This email is already registered. Please sign in instead.";
          toast({ title: "Sign up failed", description: message, variant: "destructive" });
        } else {
          toast({ title: "Account created!", description: "Welcome to DTMA. Setting up your profile..." });
          setIsNewSignup(true);
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({ title: "Sign in failed", description: "Invalid email or password. Please try again.", variant: "destructive" });
        } else {
          toast({ title: "Welcome back!", description: "You've successfully signed in." });
        }
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
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse 70% 50% at 20% 80%, rgba(255, 69, 0, 0.15) 0%, transparent 60%)' }} />

        {/* Quote */}
        <div className="relative z-10 flex flex-1 flex-col justify-center max-w-sm">
          <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-6">Student testimonial</p>
          <blockquote className="text-[22px] leading-[1.4] font-bold text-white mb-6">
            "DTMA transformed how we approach digital innovation. The 6XD framework gave us the clarity and tools to lead our industry."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ff4500] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">SC</div>
            <div>
              <div className="text-[14px] font-semibold text-white">Sarah Chen</div>
              <div className="text-[12px] text-white/50">Digital Transformation Leader</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-10 border-t border-white/10 pt-8">
          {[{ value: "15K+", label: "Learners" }, { value: "31+", label: "Courses" }, { value: "4.8", label: "Rating" }].map((s) => (
            <div key={s.label}>
              <div className="text-[26px] font-bold text-white">{s.value}</div>
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
              <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-3">
                {mode === "login" ? "Welcome back" : "Get started"}
              </p>
              <h1 className="text-[36px] leading-[1.1] font-bold text-[#0a0f1e] mb-2">
                {mode === "login" ? "Sign in to DTMA" : "Create your account"}
              </h1>
              <p className="text-[15px] text-[#9a9aaa]">
                {mode === "login" ? "Enter your credentials to access your account" : "Start your digital transformation journey today"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[13px] font-medium text-[#0a0f1e]">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9aaa]" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 h-11 border-[#e8e8ec] rounded-xl focus:border-[#ff4500] focus:ring-0 text-[14px] text-[#0a0f1e] placeholder:text-[#9a9aaa]"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[13px] font-medium text-[#0a0f1e]">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9aaa]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
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
                    placeholder={mode === "login" ? "Enter your password" : "Create a password (min 6 characters)"}
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

              {mode === "login" ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="remember" className="text-[13px] text-[#4a4a5a] cursor-pointer">Remember me</Label>
                  </div>
                  <Link to="/forgot-password" className="text-[13px] font-medium text-[#ff4500] hover:text-[#cc3700] transition-colors">
                    Forgot password?
                  </Link>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-[13px] text-[#4a4a5a] cursor-pointer leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-[#ff4500] hover:text-[#cc3700] font-medium">Terms of Service</Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-[#ff4500] hover:text-[#cc3700] font-medium">Privacy Policy</Link>
                  </Label>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-[#ff4500] hover:bg-[#cc3700] text-white text-[14px] font-semibold rounded-full transition-colors mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{mode === "login" ? "Signing in..." : "Creating account..."}</>
                ) : (
                  mode === "login" ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>

            {/* Switch mode */}
            <p className="text-center text-[13px] text-[#9a9aaa] mt-8">
              {mode === "login" ? (
                <>Don't have an account?{" "}<button type="button" onClick={() => setMode("signup")} className="text-[#ff4500] font-semibold hover:text-[#cc3700] transition-colors">Sign up</button></>
              ) : (
                <>Already have an account?{" "}<button type="button" onClick={() => setMode("login")} className="text-[#ff4500] font-semibold hover:text-[#cc3700] transition-colors">Sign in</button></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
