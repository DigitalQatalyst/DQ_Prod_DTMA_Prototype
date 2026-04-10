import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Shield, HelpCircle } from "lucide-react";

interface VerificationData {
  proofType: string;
  professionalBio: string;
  areaOfExpertise: string;
  yearsOfExperience: string;
  credibilityDocument: File | null;
}

const ProviderVerification = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"credibility" | "eligibility">(
    "credibility"
  );
  const [verificationData, setVerificationData] = useState<VerificationData>({
    proofType: "",
    professionalBio: "",
    areaOfExpertise: "",
    yearsOfExperience: "",
    credibilityDocument: null,
  });

  const proofTypes = [
    "Professional Certification",
    "University Degree",
    "Work Experience",
    "Portfolio",
    "Other",
  ];

  const experienceLevels = [
    "Less than 1 year",
    "1-3 years",
    "3-5 years",
    "5-10 years",
    "10+ years",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setVerificationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setVerificationData((prev) => ({
        ...prev,
        credibilityDocument: e.target.files![0],
      }));
    }
  };

  const handleSubmitVerification = () => {
    console.log("Verification submitted:", verificationData);
    // After verification is submitted, redirect to pending verification page
    navigate("/provider-verification-pending");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Verify your eligibility to publish on DTMA
              </h1>
              <p className="text-lg text-muted-foreground">
                Help us ensure quality by confirming your credentials. This quick step protects
                learners and maintains trust on our platform.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-border">
              <button
                onClick={() => setActiveTab("credibility")}
                className={`pb-4 px-4 font-medium transition-colors ${
                  activeTab === "credibility"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Credibility Proof
              </button>
              <button
                onClick={() => setActiveTab("eligibility")}
                className={`pb-4 px-4 font-medium transition-colors ${
                  activeTab === "eligibility"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Eligibility Verification
              </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-border p-8 lg:p-12">
              {activeTab === "credibility" && (
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Credibility Proof
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Provide at least one form of credibility verification
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Proof Type
                      </label>
                      <select
                        name="proofType"
                        value={verificationData.proofType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select proof type...</option>
                        {proofTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">
                            Why we verify instructors
                          </h4>
                          <p className="text-sm text-blue-800">
                            Verification helps us maintain quality standards and build trust with
                            learners. Your information is reviewed by our team and kept confidential.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Upload Document
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="document-upload"
                        />
                        <label htmlFor="document-upload" className="cursor-pointer">
                          <div className="text-4xl mb-2">📄</div>
                          <p className="text-sm font-medium text-foreground mb-1">
                            {verificationData.credibilityDocument
                              ? verificationData.credibilityDocument.name
                              : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, JPG, or PNG (Max 5MB)
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "eligibility" && (
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Individual Instructor Verification
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Tell us about your professional background and expertise
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Professional Bio *
                      </label>
                      <textarea
                        name="professionalBio"
                        value={verificationData.professionalBio}
                        onChange={handleInputChange}
                        placeholder="Describe your professional background, teaching experience, and what makes you qualified to teach on DTMA..."
                        rows={5}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Include your education, work experience, and any relevant achievements
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Primary Area of Expertise
                      </label>
                      <input
                        type="text"
                        name="areaOfExpertise"
                        value={verificationData.areaOfExpertise}
                        onChange={handleInputChange}
                        placeholder="e.g., Hair Styling, Makeup, Skincare"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Years of Teaching or Industry Experience
                      </label>
                      <select
                        name="yearsOfExperience"
                        value={verificationData.yearsOfExperience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select experience level...</option>
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-4 mt-12">
                <Button variant="outline" size="lg" className="flex-1">
                  Back
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleSubmitVerification}
                  className="flex-1"
                >
                  Submit for Verification
                </Button>
              </div>

              {/* Help Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Questions about verification?{" "}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Visit our Help Center
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProviderVerification;
