import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VerificationSubmittedModal from "@/components/modals/VerificationSubmittedModal";
import {
  useRegisterProvider,
  useAddPayoutInfo,
} from "@/hooks/useProviderRegistration";

type RegistrationStep = "account" | "profile" | "payouts";

interface RegistrationData {
  // Account
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // Profile
  headline: string;
  bio: string;
  website: string;
  linkedin: string;
  // Payouts
  bankAccountHolder: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
}

const ProviderRegistration = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("account");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [providerName, setProviderName] = useState("");
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    headline: "",
    bio: "",
    website: "",
    linkedin: "",
    bankAccountHolder: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
  });

  const registerProvider = useRegisterProvider();
  const addPayoutInfo = useAddPayoutInfo();

  const steps: { id: RegistrationStep; label: string; number: number }[] = [
    { id: "account", label: "Account", number: 1 },
    { id: "profile", label: "Profile", number: 2 },
    { id: "payouts", label: "Payouts", number: 3 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;

  const validateAccountStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfileStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.headline.trim()) {
      newErrors.headline = "Professional headline is required";
    }
    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayoutStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.bankAccountHolder.trim()) {
      newErrors.bankAccountHolder = "Account holder name is required";
    }
    if (!formData.bankAccountNumber.trim()) {
      newErrors.bankAccountNumber = "Account number is required";
    }
    if (!formData.bankRoutingNumber.trim()) {
      newErrors.bankRoutingNumber = "Routing number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = async () => {
    // Validate current step - NO API CALLS, just validation
    let isValid = false;
    
    if (currentStep === "account") {
      isValid = validateAccountStep();
      if (!isValid) return;
    } else if (currentStep === "profile") {
      isValid = validateProfileStep();
      if (!isValid) return;
    }

    // Move to next step without creating account
    if (!isLastStep) {
      const nextStep = steps[currentStepIndex + 1].id;
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1].id;
      setCurrentStep(prevStep);
    }
  };

  const handleComplete = async () => {
    // Validate payout step
    const isValid = validatePayoutStep();
    if (!isValid) return;

    try {
      // NOW create account with all collected data
      const result = await registerProvider.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        headline: formData.headline,
        bio: formData.bio,
        website: formData.website,
        linkedin: formData.linkedin,
        providerType: (type as "individual" | "institution") || "individual",
      });

      const newProviderId = result?.id;
      if (!newProviderId) {
        throw new Error("Failed to create account");
      }

      // Add payout information
      await addPayoutInfo.mutateAsync({
        providerId: newProviderId,
        data: {
          bankAccountHolder: formData.bankAccountHolder,
          bankAccountNumber: formData.bankAccountNumber,
          bankRoutingNumber: formData.bankRoutingNumber,
        },
      });

      // Set provider name for modal
      setProviderName(formData.firstName);

      // Show verification modal instead of redirecting immediately
      setShowVerificationModal(true);

      toast({
        title: "Registration complete",
        description: "Your account has been created and is pending verification.",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description:
          error instanceof Error ? error.message : "Failed to complete registration",
        variant: "destructive",
      });
    }
  };

  const handleVerificationModalContinue = () => {
    // Set verification pending flag and redirect to dashboard
    localStorage.setItem("instructor_verification_pending", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-16">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      currentStepIndex >= index
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {currentStepIndex > index ? "✓" : step.number}
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-muted-foreground">Step {step.number}</p>
                    <p className="text-sm font-medium text-foreground">{step.label}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 transition-all ${
                        currentStepIndex > index ? "bg-primary" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-2xl border border-border p-8 lg:p-12">
              {/* Error Alert */}
              {Object.keys(errors).length > 0 && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">
                      Please fix the following errors:
                    </h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      {Object.values(errors).map((error, idx) => (
                        <li key={idx}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === "account" && (
                <div>
                  <h2 className="text-3xl font-semibold text-foreground mb-2">
                    Create your instructor account
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Set up your individual instructor profile
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Jane"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.firstName ? "border-red-500" : "border-border"
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.lastName ? "border-red-500" : "border-border"
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.email ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.password ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.password && (
                        <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === "profile" && (
                <div>
                  <h2 className="text-3xl font-semibold text-foreground mb-2">
                    Build your profile
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Help learners understand who you are and what you offer
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Professional Headline *
                      </label>
                      <input
                        type="text"
                        name="headline"
                        value={formData.headline}
                        onChange={handleInputChange}
                        placeholder="Senior Beauty Educator at Beauty Academy"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.headline ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.headline && (
                        <p className="text-xs text-red-600 mt-1">{errors.headline}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Bio *
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell students about your experience and expertise..."
                        rows={5}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.bio ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.bio && (
                        <p className="text-xs text-red-600 mt-1">{errors.bio}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        LinkedIn Profile (Optional)
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === "payouts" && (
                <div>
                  <h2 className="text-3xl font-semibold text-foreground mb-2">
                    Payout Information
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Set up how you'll receive payments from course sales
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <p className="text-sm text-blue-900">
                      <strong>Note:</strong> You can set this up later, but you won't be able to
                      publish paid courses until you complete payout setup.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">🔒</div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            Secure Payment Processing
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            We use Stripe to process payouts securely. Your bank information is
                            encrypted and never shared.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        name="bankAccountHolder"
                        value={formData.bankAccountHolder}
                        onChange={handleInputChange}
                        placeholder="Full name on bank account"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.bankAccountHolder ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.bankAccountHolder && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.bankAccountHolder}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Bank Account Number *
                      </label>
                      <input
                        type="password"
                        name="bankAccountNumber"
                        value={formData.bankAccountNumber}
                        onChange={handleInputChange}
                        placeholder="••••••••••••••••"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.bankAccountNumber ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.bankAccountNumber && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.bankAccountNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Routing Number *
                      </label>
                      <input
                        type="password"
                        name="bankRoutingNumber"
                        value={formData.bankRoutingNumber}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.bankRoutingNumber ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.bankRoutingNumber && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.bankRoutingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  disabled={currentStepIndex === 0 || registerProvider.isPending || addPayoutInfo.isPending}
                  className="flex-1"
                >
                  Back
                </Button>
                {!isLastStep ? (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleNext}
                    disabled={registerProvider.isPending || addPayoutInfo.isPending}
                    className="flex-1 gap-2"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleComplete}
                    disabled={registerProvider.isPending || addPayoutInfo.isPending}
                    className="flex-1"
                  >
                    {registerProvider.isPending || addPayoutInfo.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <VerificationSubmittedModal
        isOpen={showVerificationModal}
        onContinue={handleVerificationModalContinue}
        providerName={providerName}
      />
    </div>
  );
};

export default ProviderRegistration;
