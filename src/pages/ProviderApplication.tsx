import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, Building2 } from "lucide-react";

const ProviderApplication = () => {
  const providerTypes = [
    {
      id: "individual",
      title: "Individual Instructor",
      description: "Share your expertise as an independent educator or subject matter expert",
      icon: Users,
    },
    {
      id: "institution",
      title: "Institution / School",
      description: "University, college, or educational organization offering courses",
      icon: Building2,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Provider Type Selection */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Join BROWZ Beauty Academy as a Provider
              </h1>
              <p className="text-lg text-muted-foreground">
                Choose the option that best describes you or your organization
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {providerTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Link
                    key={type.id}
                    to={type.id === "individual" ? `/provider-register/${type.id}` : `/institution-register/${type.id}`}
                    className="group"
                  >
                    <div className="rounded-3xl border border-border p-8 lg:p-12 hover:shadow-lg transition-all hover:border-[#4E382D] cursor-pointer h-full">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-4">
                        {type.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProviderApplication;
