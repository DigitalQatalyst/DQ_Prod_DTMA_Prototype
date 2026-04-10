import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VerificationSubmittedModal from "@/components/modals/VerificationSubmittedModal";
import {
  useRegisterProvider,
} from "@/hooks/useProviderRegistration";

type RegistrationStep = "account" | "profile";

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
}

const InstructorApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("account");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [instructorName, setInstructorName] = useState("");
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    headline: "",
    bio: "",
    website: "",
    linkedin: "",
  });

  const registerProvider = useRegisterProvider();

  const steps: { id: RegistrationStep; label: string; number: number }[] = [
    { id: "account", label: "Account", number: 1 },
    { id: "profile", label: "Profile", number: 2 },
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
    // Validate current step
    let isValid = false;
    
    if (currentStep === "account") {
      isValid = validateAccountStep();
      if (!isValid) return;
    }

    // Move to next step
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
    // Validate profile step
    const isValid = validateProfileStep();
    if (!isValid) return;

    try {
      // Create instructor account
      const result = await registerProvider.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        headline: formData.headline,
        bio: formData.bio,
        website: formData.website,
        linkedin: formData.linkedin,
        providerType: "individual",
      });

      const newInstructorId = result?.id;
      if (!newInstructorId) {
        throw new Error("Failed to create account");
      }

      // Set instructor name for modal
      setInstructorName(formData.firstName);

      // Show verification modal
      setShowVerificationModal(true);

      toast({
        title: "Application submitted",
        description: "Your instructor application has been submitted for review.",
      });
    } catch (error) {
      toast({
        title: "Application failed",
        description:
          error instanceof Error ? error.message : "Failed to submit application",
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
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-[40px] leading-[48px] font-semibold text-[#1e2348] mb-4">
                Become a DTMA Instructor
              </h1>
              <p className="text-[16px] leading-[24px] font-normal text-gray-600">
                Join our community of digital transformation experts
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-3 mb-16">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-[16px] leading-[24px] font-semibold transition-all ${
                        currentStepIndex >= index
                          ? "bg-[#ff6b4d] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {currentStepIndex > index ? "✓" : step.number}
                    </div>
                    <p className="text-[12px] leading-[16px] font-medium text-[#1e2348] mt-2">{step.label}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-24 h-1 mx-4 transition-all ${
                        currentStepIndex > index ? "bg-[#ff6b4d]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="bg-white">
              {/* Error Alert */}
              {Object.keys(errors).length > 0 && (
                <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[14px] leading-[20px] font-medium text-red-900 mb-1">
                      Please fix the following errors:
                    </h4>
                    <ul className="text-[14px] leading-[20px] text-red-800 space-y-1">
                      {Object.values(errors).map((error, idx) => (
                        <li key={idx}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === "account" && (
                <div>
                  <div className="text-center mb-10">
                    <h2 className="text-[32px] leading-[40px] font-semibold text-[#1e2348] mb-3">
                      Create your instructor account
                    </h2>
                    <p className="text-[14px] leading-[20px] font-normal text-gray-600">
                      Set up your DTMA instructor profile
                    </p>
                  </div>

                  <div className="space-y-5 max-w-md mx-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] leading-[16px] font-medium text-[#1e2348] mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Jane"
                          className={`w-full px-4 py-3 text-[14px] leading-[20px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent transition-all ${
                            errors.firstName ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-[12px] leading-[16px] text-red-600 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[12px] leading-[16px] font-medium text-[#1e2348] mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className={`w-full px-4 py-3 text-[14px] leading-[20px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent transition-all ${
                            errors.lastName ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-[12px] leading-[16px] text-red-600 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] leading-[16px] font-medium text-[#1e2348] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 text-[14px] leading-[20px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent transition-all ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[12px] leading-[16px] text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] leading-[16px] font-medium text-[#1e2348] mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 text-[14px] leading-[20px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent transition-all ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.password && (
                        <p className="text-[12px] leading-[16px] text-red-600 mt-1">{errors.password}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === "profile" && (
                <div>
                  <div className="text-center mb-10">
                    <h2 className="text-[32px] leading-[40px] font-semibold text-[#1e2348] mb-3">
                      Build your instructor profile
                    </h2>
                    <p className="text-[14px] leading-[20px] font-normal text-gray-600">
                      Help learners understand your expertise in digital transformation
                    </p>
                  </div>

                  <div className="space-y-5 max-w-md mx-auto">
                    <div>
                      <label className="block text-[12px] leading-[16px] font-medium text-[#1e2348] mb-2">
                        Professional Headline *
                      </label>
                      <input
                        type="text"
                        name="headline"
                        value={formData.headline}
                        onChange={handleInputChange}
                        placeholder="Digital Transformation Consultant & Strategist"
                        className={`w-full px-4 py-3 text-[14px] leading-[20px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent transition-all ${
                          errors.headline ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.headline && (
                        <p className="text-[12px] leading-[16px] text-red-600 mt-1">{errors.headline}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] leading-[16px] font-medium text-[#1e2348] mb-2">
                        Bio *
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell learners about your experience in digital transformation, your expertise areas, and what makes you passionate about teaching..."
                        rows={5}
                        className={`w-full px-4 py-3 text-[14px] leading-[20px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent transition-all ${
                          errors.bio ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.bio && (
                        <p className="text-[12px] leading-[16px] text-red-600 mt-1">{errors.bio}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] leading-[16px] font-medium text-[#1e2348] mb-2">
                        Website (Optional)
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://"
                        className="w-full px-4 py-3 text-[14px] leading-[20px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] leading-[16px] font-medium text-[#1e2348] mb-2">
                        LinkedIn Profile (Optional)
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-3 text-[14px] leading-[20px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b4d] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12 max-w-md mx-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  disabled={currentStepIndex === 0 || registerProvider.isPending}
                  className="flex-1 h-12 border-gray-300 text-[#1e2348] hover:bg-gray-50 text-[14px] leading-[20px] font-medium"
                >
                  Back
                </Button>
                {!isLastStep ? (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleNext}
                    disabled={registerProvider.isPending}
                    className="flex-1 h-12 gap-2 bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[14px] leading-[20px] font-medium"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleComplete}
                    disabled={registerProvider.isPending}
                    className="flex-1 h-12 bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[14px] leading-[20px] font-medium"
                  >
                    {registerProvider.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
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
        providerName={instructorName}
      />
    </div>
  );
};

export default InstructorApplication;
