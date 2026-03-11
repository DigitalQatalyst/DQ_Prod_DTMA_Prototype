import { BookOpen, Users, TrendingUp, Award } from "lucide-react";

const HowCoursebayHelpsSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Structured Learning",
      description:
        "Courses are organized into lessons and modules so you can learn step-by-step and build skills progressively.",
      iconColor: "text-cyan-400",
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description:
        "Stay motivated with a personal dashboard that tracks your course progress and completed lessons.",
      iconColor: "text-orange-400",
    },
    {
      icon: Award,
      title: "Earn Certificates",
      description:
        "Receive certificates upon course completion to showcase your achievements and strengthen your professional profile.",
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <section style={{ backgroundColor: '#1E2348' }} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-0 lg:px-16">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-4 max-w-2xl" style={{ lineHeight: '1.5' }}>
            An Experience Designed for Your Success
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Features */}
          <div className="grid grid-cols-1 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="pb-8"
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <IconComponent className={`w-10 h-10 ${feature.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed max-w-lg">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/ima.png"
              alt="Learning Experience"
              className="w-full h-auto min-h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowCoursebayHelpsSection;
