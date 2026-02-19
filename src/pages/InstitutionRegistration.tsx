import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type RegistrationStep = "organization" | "contact" | "payouts";

interface InstitutionRegistrationData {
  // Organization
  organizationName: string;
  organizationType: string;
  registrationNumber: string;
  website: string;
  country: string;
  city: string;
  // Contact Person
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  contactPosition: string;
  // Payouts
  bankAccountHolder: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
}

const InstitutionRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("organization");
  const [formData, setFormData] = useState<InstitutionRegistrationData>({
    organizationName: "",
    organizationType: "",
    registrationNumber: "",
    website: "",
    country: "",
    city: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    contactPosition: "",
    bankAccountHolder: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
  });

  const steps: { id: RegistrationStep; label: string; number: number }[] = [
    { id: "organization", label: "Organization", number: 1 },
    { id: "contact", label: "Contact", number: 2 },
    { id: "payouts", label: "Payouts", number: 3 },
  ];

  const organizationTypes = [
    "University",
    "College",
    "Training Institute",
    "Beauty School",
    "Professional Academy",
    "Other Educational Institution",
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
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

  const handleComplete = () => {
    console.log("Institution registration completed:", formData);
    navigate("/institution-verification");
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
              {currentStep === "organization" && (
                <div>
                  <h2 className="text-3xl font-semibold text-foreground mb-2">
                    Organization Information
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Tell us about your institution
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        placeholder="e.g., Beauty Academy International"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Organization Type
                      </label>
                      <select
                        name="organizationType"
                        value={formData.organizationType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select organization type...</option>
                        {organizationTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Registration Number
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        placeholder="Business or educational registration number"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
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
                        placeholder="https://www.yourorganization.com"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="e.g., United States"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g., New York"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === "contact" && (
                <div>
                  <h2 className="text-3xl font-semibold text-foreground mb-2">
                    Primary Contact Person
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Who should we contact regarding your institution's account?
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="contactFirstName"
                          value={formData.contactFirstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="contactLastName"
                          value={formData.contactLastName}
                          onChange={handleInputChange}
                          placeholder="Smith"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Position/Title
                      </label>
                      <input
                        type="text"
                        name="contactPosition"
                        value={formData.contactPosition}
                        onChange={handleInputChange}
                        placeholder="e.g., Director, Head of Online Programs"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        placeholder="contact@organization.com"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-blue-50"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
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
                    Set up how your institution will receive payments from course sales
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
                            We use Stripe to process payouts securely. You'll be redirected to
                            Stripe to connect your organization's bank account.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        name="bankAccountHolder"
                        value={formData.bankAccountHolder}
                        onChange={handleInputChange}
                        placeholder="Organization name on bank account"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        name="bankAccountNumber"
                        value={formData.bankAccountNumber}
                        onChange={handleInputChange}
                        placeholder="••••••••••••••••"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Routing Number
                      </label>
                      <input
                        type="text"
                        name="bankRoutingNumber"
                        value={formData.bankRoutingNumber}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
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
                  disabled={currentStepIndex === 0}
                  className="flex-1"
                >
                  Back
                </Button>
                {!isLastStep ? (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleNext}
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
                    className="flex-1"
                  >
                    Complete Registration
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InstitutionRegistration;
