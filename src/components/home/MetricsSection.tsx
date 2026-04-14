import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MetricsSection = () => {
  const metrics = [
    {
      value: "150+",
      label: "Expert Courses",
      description: "Curated beauty courses designed by industry professionals.",
    },
    {
      value: "25K+",
      label: "Students Enrolled",
      description: "Digital transformation professionals learning with DTMA worldwide.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Our Success in Numbers:<br />A Quick Overview
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-12 leading-relaxed">
              We have trained thousands of beauty professionals, ensuring they gain the skills and confidence needed to excel in their careers.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-12 mb-8">
              {metrics.map((metric, index) => (
                <div key={index}>
                  <div className="text-4xl font-semibold text-foreground mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-2">
                    {metric.label}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Right Column - Image Grid */}
          <div className="relative hidden lg:block h-full flex items-center justify-center">
            <div className="relative w-96 h-96">
              {/* Top Center */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32">
                <img
                  src="/e1.png"
                  alt="Course 1"
                  className="w-full h-full object-cover rounded-3xl transform rotate-45"
                />
              </div>
              
              {/* Left */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-32 h-32">
                <img
                  src="/e2.png"
                  alt="Course 2"
                  className="w-full h-full object-cover rounded-3xl transform rotate-45"
                />
              </div>
              
              {/* Right */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-32">
                <img
                  src="/e3.png"
                  alt="Course 3"
                  className="w-full h-full object-cover rounded-3xl transform rotate-45"
                />
              </div>
              
              {/* Bottom Center */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32">
                <img
                  src="/e1.png"
                  alt="Course 4"
                  className="w-full h-full object-cover rounded-3xl transform rotate-45"
                />
              </div>
              
              {/* Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36">
                <img
                  src="/e2.png"
                  alt="Course 5"
                  className="w-full h-full object-cover rounded-3xl transform rotate-45"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
