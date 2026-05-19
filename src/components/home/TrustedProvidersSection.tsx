import { Link } from "react-router-dom";
import { Users, Building2, User, Shield } from "lucide-react";

const TrustedProvidersSection = () => {
  const providers = [
    {
      id: "individual-instructors",
      title: "Instructors",
      description: "Learn directly from experienced professionals sharing real-world knowledge and practical skills.",
      icon: Users,
      iconColor: "text-cyan-400",
    },
    {
      id: "institutions",
      title: "Institutions",
      description: "Explore structured programs from academies and training institutions offering courses across multiple disciplines.",
      icon: Building2,
      iconColor: "text-orange-400",
    },
    {
      id: "organizations",
      title: "Professional Bodies",
      description: "Access authoritative courses from organizations that set standards and deliver industry-aligned training.",
      icon: Shield,
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div style={{ marginBottom: "72px" }}>
          <h2 className="text-4xl font-semibold text-foreground">
            Learn From Trusted Providers
          </h2>
        </div>

        {/* Provider Cards Grid - 1x3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {providers.map((provider) => {
            const IconComponent = provider.icon;
            return (
              <div key={provider.id} className="relative">
                {/* Shadow background */}
                <div 
                  className="absolute inset-0 rounded-lg"
                  style={{
                    backgroundColor: 'var(--dq-navy-950)',
                    opacity: 0.08,
                    transform: 'translate(8px, 8px)',
                    zIndex: 0,
                  }}
                />
                
                {/* Main card */}
                <Link
                  to={`/courses?provider=${provider.id}`}
                  className="group relative z-10"
                >
                  <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 h-full border border-slate-100">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <IconComponent className={`${provider.iconColor} w-8 h-8 flex-shrink-0`} />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {provider.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-green-600 font-medium mt-1">
                          <span>✓</span>
                          <span>Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/70 leading-relaxed text-sm">
                      {provider.description}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedProvidersSection;
