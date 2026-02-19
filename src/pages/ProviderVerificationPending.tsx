import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ProviderVerificationPending = () => {
  const { user } = useAuth();

  // Update user role to instructor when this page loads
  useEffect(() => {
    if (user && user.role !== "instructor") {
      // Update the user's role to instructor
      const users = JSON.parse(localStorage.getItem("mock_users") || "[]");
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, role: "instructor" } : u
      );
      localStorage.setItem("mock_users", JSON.stringify(updatedUsers));
      // Set verification pending flag
      localStorage.setItem("instructor_verification_pending", "true");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Success State */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Verification Submitted
              </h1>
              <p className="text-lg text-muted-foreground">
                Thank you for submitting your verification documents. We're reviewing your
                credentials.
              </p>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl border border-border p-8 lg:p-12 mb-8">
              <div className="space-y-8">
                {/* Timeline */}
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                        ✓
                      </div>
                      <div className="w-1 h-12 bg-primary mt-2" />
                    </div>
                    <div className="pb-6">
                      <h3 className="font-semibold text-foreground mb-1">
                        Application Submitted
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your verification documents have been received
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="w-1 h-12 bg-gray-200 mt-2" />
                    </div>
                    <div className="pb-6">
                      <h3 className="font-semibold text-foreground mb-1">
                        Under Review
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Our team is reviewing your credentials (typically 2-5 business days)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Verification Complete
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You'll receive an email when your account is approved
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">
                        Check your email
                      </h4>
                      <p className="text-sm text-blue-800">
                        We'll send you a confirmation email at your registered email address once
                        your verification is complete.
                      </p>
                    </div>
                  </div>
                </div>

                {/* What's Next */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">What happens next?</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary font-semibold">1.</span>
                      <span className="text-muted-foreground">
                        Our team reviews your credentials and documents
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-semibold">2.</span>
                      <span className="text-muted-foreground">
                        We verify your professional background and expertise
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-semibold">3.</span>
                      <span className="text-muted-foreground">
                        Once approved, you can start creating and publishing courses
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-12">
                <Link to="/" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    Back to Home
                  </Button>
                </Link>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => {
                    // Update user role to instructor
                    if (user) {
                      const users = JSON.parse(localStorage.getItem("mock_users") || "[]");
                      const updatedUsers = users.map((u: any) => 
                        u.id === user.id ? { ...u, role: "instructor" } : u
                      );
                      localStorage.setItem("mock_users", JSON.stringify(updatedUsers));
                      // Set verification pending flag
                      localStorage.setItem("instructor_verification_pending", "true");
                      // Reload to refresh auth context
                      window.location.href = "/dashboard";
                    }
                  }}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-border p-8">
              <h3 className="font-semibold text-foreground mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    How long does verification take?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Typically 2-5 business days. We review all submissions in the order they're
                    received.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    What if my verification is rejected?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We'll send you an email explaining why and what you can do to reapply. You can
                    contact our support team for more details.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Can I start creating courses while waiting?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    You can start creating courses, but you won't be able to publish them until
                    your verification is complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProviderVerificationPending;
