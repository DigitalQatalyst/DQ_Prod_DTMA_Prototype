import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

interface OnboardingData {
  learningGoal: string;
  skillLevel: string;
  preferredFormat: string;
}

const LearnerOnboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OnboardingData>({
    learningGoal: "",
    skillLevel: "",
    preferredFormat: "",
  });
  const [isGoalDropdownOpen, setIsGoalDropdownOpen] = useState(false);

  const learningGoals = [
    "Career advancement in beauty",
    "Start my own beauty business",
    "Learn new beauty techniques",
    "Professional certification",
    "Personal skill development",
    "Career change to beauty industry",
  ];

  const skillLevels = ["Beginner", "Intermediate", "Advanced"];

  const preferredFormats = [
    {
      id: "self-paced",
      title: "Self-paced (Recorded)",
      description: "Learn on your own schedule",
    },
    {
      id: "live-classes",
      title: "Live Classes",
      description: "Real-time interaction with instructors",
    },
    {
      id: "cohort-based",
      title: "Cohort-based",
      description: "Learn together with a group",
    },
  ];

  const handleStartBrowsing = () => {
    // Save onboarding data to localStorage or context
    localStorage.setItem("learnerOnboarding", JSON.stringify(formData));
    navigate("/dashboard");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  const isFormComplete =
    formData.learningGoal && formData.skillLevel && formData.preferredFormat;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                What do you want to learn?
              </h1>
              <p className="text-lg text-muted-foreground">
                Help us personalize your experience.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-border p-8 lg:p-12">
              <div className="space-y-8">
                {/* Primary Learning Goal */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-4">
                    Primary Learning Goal
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setIsGoalDropdownOpen(!isGoalDropdownOpen)}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-left flex items-center justify-between"
                    >
                      <span>{formData.learningGoal || "Select a goal..."}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${isGoalDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isGoalDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 border border-border rounded-lg bg-white shadow-lg z-10">
                        {learningGoals.map((goal) => (
                          <button
                            key={goal}
                            onClick={() => {
                              setFormData({ ...formData, learningGoal: goal });
                              setIsGoalDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-[#EEEDE9] transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            {goal}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Current Skill Level */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-4">
                    Current Skill Level
                  </label>
                  <div className="flex gap-3">
                    {skillLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() =>
                          setFormData({ ...formData, skillLevel: level })
                        }
                        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                          formData.skillLevel === level
                            ? "bg-primary text-primary-foreground"
                            : "border border-border text-foreground hover:bg-[rgba(238,237,233,0.5)]"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Format */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-4">
                    Preferred Format
                  </label>
                  <div className="space-y-3">
                    {preferredFormats.map((format) => (
                      <label
                        key={format.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.preferredFormat === format.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="format"
                          value={format.id}
                          checked={formData.preferredFormat === format.id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferredFormat: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium text-foreground">
                            {format.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-12 space-y-4">
                <Button
                  onClick={handleStartBrowsing}
                  disabled={!isFormComplete}
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                >
                  Start Browsing
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-muted-foreground">Or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <button
                  onClick={handleSkip}
                  className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Skip for now
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-sm text-blue-900">
                <strong>💡 Tip:</strong> Your preferences help us recommend the
                best beauty courses tailored to your goals. You can update these
                anytime in your profile settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearnerOnboarding;
