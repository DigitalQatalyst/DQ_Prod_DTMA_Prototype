import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Eye, EyeOff, ArrowLeft, Mail, Lock, Loader2, User } from "lucide-react";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";

const AdminAuth = () => {
  const { toast } = useToast();
  const { user, signIn, signUp, loading: authLoading } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Allow admins to sign in or sign up without invite links.
  if (user && !authLoading) {
    return <AdminDashboard />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        const { error } = await signUp(formData.email, formData.password, formData.name, "admin");

        if (error) {
          let message = error.message;
          if (error.message.includes("already registered")) {
            message = "This email is already registered. Please sign in instead.";
            setMode("login");
          }
          toast({
            title: "Sign up failed",
            description: message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Welcome to the Admin Portal.",
          });
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);

        if (error) {
          toast({
            title: "Sign in failed",
            description: "Invalid credentials. Please try again.",
            variant: "destructive",
          });
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
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-background">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop"
            alt="Beauty instructor"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-white/40" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-foreground">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/dtma-logo.png"
              alt="DTMA"
              className="h-[50px] w-auto"
            />
          </Link>

          <div className="max-w-md opacity-60">
            <h2 className="text-[28px] leading-[36px] font-semibold mb-4">
              Administrator
              <br />
              Control Center
            </h2>
            <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
              Manage users, approve courses, and oversee the entire DTMA platform.
            </p>
          </div>

          <div className="flex gap-12 opacity-50">
            <div>
              <div className="text-[24px] leading-[32px] font-medium text-primary">Full</div>
              <div className="text-[12px] leading-[16px] font-normal text-muted-foreground">Platform Access</div>
            </div>
            <div>
              <div className="text-[24px] leading-[32px] font-medium text-primary">User</div>
              <div className="text-[12px] leading-[16px] font-normal text-muted-foreground">Management</div>
            </div>
            <div>
              <div className="text-[24px] leading-[32px] font-medium text-primary">Course</div>
              <div className="text-[12px] leading-[16px] font-normal text-muted-foreground">Approvals</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-background dark:bg-charcoal">
        <div className="lg:hidden p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/dtma-logo.png"
              alt="DTMA"
              className="h-[40px] w-auto"
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[14px] leading-[20px] font-normal text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <div className="mb-8">
              <h1 className="text-[32px] leading-[40px] font-semibold text-foreground mb-2">
                {mode === "signup" ? "Create Admin Account" : "Admin Sign In"}
              </h1>
              <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                {mode === "signup" ? "Set up your administrator account" : "Access the administrator dashboard"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-11 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your admin email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-11 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={mode === "signup" ? "Create a password (min 6 characters)" : "Enter your password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-11 pr-11 h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
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

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-[16px] leading-[24px] font-normal"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {mode === "signup" ? "Creating account..." : "Signing in..."}
                  </>
                ) : (
                  mode === "signup" ? "Create Admin Account" : "Sign In as Administrator"
                )}
              </Button>
            </form>

            <p className="text-center text-[14px] leading-[20px] font-normal text-muted-foreground mt-8">
              {mode === "signup" ? (
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
              ) : (
                <>
                  Not an administrator?{" "}
                  <Link to="/auth" className="text-primary font-medium hover:underline">
                    Go to learner login
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
