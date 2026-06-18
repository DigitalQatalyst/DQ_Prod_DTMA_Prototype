import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import DTMALogo from "@/components/layout/DTMALogo";
import JourneyContextSwitcher from "@/components/layout/JourneyContextSwitcher";

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
    "Lead digital transformation initiatives",
    "Build digital strategy capabilities",
    "Develop AI and emerging tech skills",
    "Transform organizational operations",
    "Advance my digital career",
    "Understand Economy 4.0 dynamics",
  ];

  const skillLevels = ["Beginner", "Intermediate", "Advanced"];

  const preferredFormats = [
    { id: "self-paced", title: "Self-paced (Recorded)", description: "Learn on your own schedule" },
    { id: "live-classes", title: "Live Classes", description: "Real-time interaction with instructors" },
    { id: "audio", title: "Audio", description: "Listen and learn on the go" },
  ];

  const handleStartBrowsing = () => {
    localStorage.setItem("learnerOnboarding", JSON.stringify(formData));
    navigate("/dashboard");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  const isFormComplete = formData.learningGoal && formData.skillLevel && formData.preferredFormat;

  return (
    <div className="min-h-screen bg-[#f5f4f0] font-sans flex flex-col">
      {/* Minimal top bar */}
      <header className="bg-white border-b border-[#e8e8ec] px-8 py-3 flex items-center justify-between">
        <DTMALogo />
        <div className="flex items-center gap-4">
          <JourneyContextSwitcher />
          <button
            onClick={handleSkip}
            className="text-[13px] text-[#9a9aaa] hover:text-[#0a0f1e] transition-colors"
          >
            Skip for now
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[560px]">

          {/* Header */}
          <div className="mb-10">
            <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-3">
              Personalise your journey
            </p>
            <h1 className="text-[40px] leading-[1.1] font-bold text-[#0a0f1e] mb-3">
              What do you want to <span className="text-[#ff4500]">learn?</span>
            </h1>
            <p className="text-[16px] text-[#4a4a5a]">
              Help us personalise your digital transformation journey.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white border border-[#e8e8ec] rounded-xl p-8 space-y-8">

            {/* Primary Learning Goal */}
            <div>
              <label className="block text-[13px] font-semibold text-[#0a0f1e] mb-3 uppercase tracking-wide">
                Primary Learning Goal
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsGoalDropdownOpen(!isGoalDropdownOpen)}
                  className="w-full px-4 py-3 border border-[#e8e8ec] rounded-xl bg-white text-left flex items-center justify-between hover:border-[#ff4500] transition-colors focus:outline-none focus:border-[#ff4500]"
                >
                  <span className={formData.learningGoal ? "text-[#0a0f1e] text-[14px]" : "text-[#9a9aaa] text-[14px]"}>
                    {formData.learningGoal || "Select a goal..."}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#9a9aaa] transition-transform ${isGoalDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {isGoalDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 border border-[#e8e8ec] rounded-xl bg-white shadow-lg z-10 overflow-hidden">
                    {learningGoals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => { setFormData({ ...formData, learningGoal: goal }); setIsGoalDropdownOpen(false); }}
                        className="w-full px-4 py-3 text-left text-[14px] text-[#0a0f1e] hover:bg-[#f5f4f0] transition-colors"
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Skill Level */}
            <div>
              <label className="block text-[13px] font-semibold text-[#0a0f1e] mb-3 uppercase tracking-wide">
                Current Skill Level
              </label>
              <div className="flex gap-3">
                {skillLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setFormData({ ...formData, skillLevel: level })}
                    className={`flex-1 px-3 py-2.5 rounded-full text-[13px] font-medium transition-all ${
                      formData.skillLevel === level
                        ? "bg-[#0a0f1e] text-white"
                        : "border border-[#e8e8ec] text-[#4a4a5a] hover:border-[#0a0f1e]"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Format */}
            <div>
              <label className="block text-[13px] font-semibold text-[#0a0f1e] mb-3 uppercase tracking-wide">
                Preferred Format
              </label>
              <div className="space-y-2">
                {preferredFormats.map((format) => (
                  <label
                    key={format.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.preferredFormat === format.id
                        ? "border-[#ff4500] bg-[#ff4500]/5"
                        : "border-[#e8e8ec] hover:border-[#ff4500]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={format.id}
                      checked={formData.preferredFormat === format.id}
                      onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                      className="mt-0.5 accent-[#ff4500]"
                    />
                    <div>
                      <div className="text-[14px] font-semibold text-[#0a0f1e]">{format.title}</div>
                      <div className="text-[13px] text-[#9a9aaa]">{format.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleStartBrowsing}
              disabled={!isFormComplete}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-[14px] font-semibold transition-all ${
                isFormComplete
                  ? "bg-[#ff4500] hover:bg-[#cc3700] text-white"
                  : "bg-[#e8e8ec] text-[#9a9aaa] cursor-not-allowed"
              }`}
            >
              Start Browsing
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tip */}
          <div className="mt-6 p-5 bg-white border border-[#e8e8ec] rounded-xl">
            <p className="text-[13px] text-[#4a4a5a] leading-relaxed">
              <span className="font-semibold text-[#0a0f1e]">Tip:</span> Your preferences help us recommend the best digital transformation courses tailored to your goals. You can update these anytime in your profile settings.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LearnerOnboarding;
