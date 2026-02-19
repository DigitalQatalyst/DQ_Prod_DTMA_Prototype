import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, Eye, EyeOff, ArrowLeft, Mail, Lock, User, Loader2 } from "lucide-react";

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
    if (modeParam === "signup") {
      setMode("signup");
    } else {
      setMode("login");
    }
  }, [searchParams]);

  // Redirect if already logged in AND there's a redirect path
  useEffect(() => {
    if (user && !authLoading && redirectPath) {
      navigate(redirectPath);
    }
  }, [user, authLoading, redirectPath, navigate]);

  // Redirect to onboarding if new signup, otherwise to dashboard
  useEffect(() => {
    if (user && !authLoading && isNewSignup) {
      navigate("/learner-onboarding");
    } else if (user && !authLoading && !redirectPath && !isNewSignup) {
      navigate("/dashboard");
    }
  }, [user, authLoading, isNewSignup, redirectPath, navigate]);

  // Show loading or form, don't show dashboard directly
  if (user && !authLoading && !redirectPath && !isNewSignup) {
    return null; // Will redirect via useEffect
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        if (!formData.agreeTerms) {
          toast({
            title: "Terms required",
            description: "Please agree to the Terms of Service and Privacy Policy",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.name, "learner");
        
        if (error) {
          let message = error.message;
          if (error.message.includes('already registered')) {
            message = 'This email is already registered. Please sign in instead.';
          }
          toast({
            title: "Sign up failed",
            description: message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Welcome to BROWZ Beauty Academy. Setting up your profile...",
          });
          setIsNewSignup(true);
          // Redirect will happen via useEffect
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          toast({
            title: "Sign in failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You've successfully signed in.",
          });
          // Redirect will happen via useEffect
        }
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-charcoal">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop"
            alt="Beauty professional"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-foreground">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/log.svg"
              alt="BROWZ Academy"
              className="h-[50px] w-auto"
            />
          </Link>

          <div className="max-w-md opacity-60">
            <blockquote className="text-lg font-medium leading-relaxed mb-4 text-foreground">
              "BROWZ Beauty Academy gave me the skills and confidence to launch my own successful beauty business."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary" />
              <div>
                <div className="font-semibold text-sm text-foreground">Michelle Torres</div>
                <div className="text-xs text-muted-foreground">Beauty Entrepreneur</div>
              </div>
            </div>
          </div>

          <div className="flex gap-12 opacity-50">
            <div>
              <div className="text-2xl font-semibold text-foreground">25K+</div>
              <div className="text-xs text-muted-foreground">Students</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground">150+</div>
              <div className="text-xs text-muted-foreground">Courses</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground">4.9</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="lg:hidden p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/log.svg"
              alt="BROWZ Academy"
              className="h-[40px] w-auto"
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-muted-foreground">
                {mode === "login"
                  ? "Enter your credentials to access your account"
                  : "Start your beauty education journey today"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-11 h-12"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-11 h-12"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={mode === "login" ? "Enter your password" : "Create a password (min 6 characters)"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-11 pr-11 h-12"
                    required
                    minLength={6}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {mode === "login" ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, rememberMe: checked as boolean })
                      }
                    />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, agreeTerms: checked as boolean })
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {mode === "login" ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  mode === "login" ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
