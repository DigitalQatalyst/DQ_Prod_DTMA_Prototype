import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, User, Ticket, ArrowRight } from "lucide-react";

const HybridTrainingSection = () => {
  const masterclasses = [
    {
      id: 1,
      title: "Advanced Facial Contouring Masterclass",
      location: "Dubai",
      date: "18–19 March 2026",
      duration: "2-Day Intensive",
      instructor: "Dr. Amira Khalid",
      seatsRemaining: 8,
      price: 1200,
      cta: "Reserve Your Seat",
    },
    {
      id: 2,
      title: "Body Sculpting Practical Intensive",
      location: "Abu Dhabi",
      date: "5 April 2026",
      duration: "1-Day Workshop",
      instructor: "Marcus Tan",
      seatsRemaining: 5,
      price: 850,
      cta: "View Details",
    },
    {
      id: 3,
      title: "Injectables Safety & Consultation Lab",
      location: "Dubai",
      date: "22 May 2026",
      duration: "2-Day Certification Lab",
      instructor: "Dr. Layla Noor",
      seatsRemaining: null,
      isLimited: true,
      price: 1500,
      cta: "Apply to Attend",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="text-sm font-medium text-primary tracking-wide uppercase opacity-50">In-Person Training</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 mt-3">
              Take Your Skills Beyond the Screen
            </h2>
            <p className="text-base text-muted-foreground max-w-4xl">
              While our online courses build your foundation, our in-person sessions are designed for professionals ready to refine their technique under expert guidance.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {masterclasses.map((masterclass) => (
              <div
                key={masterclass.id}
                className="rounded-2xl border border-border p-8 shadow-md hover:shadow-lg transition-shadow bg-white"
              >
                {/* Scarcity Badge */}
                {masterclass.isLimited && (
                  <div className="mb-4">
                    <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold px-3 py-1 rounded-full border border-red-200">
                      Limited Availability
                    </span>
                  </div>
                )}

                {/* Title */}
                <h4 className="text-lg font-semibold text-foreground mb-6">
                  {masterclass.title}
                </h4>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{masterclass.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{masterclass.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{masterclass.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span>Led by {masterclass.instructor}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Ticket className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {masterclass.isLimited
                        ? "Limited Availability"
                        : `${masterclass.seatsRemaining} Seats Remaining`}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border my-6" />

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Price</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${masterclass.price}
                    </p>
                  </div>
                  <Link to={`/masterclasses/${masterclass.id}`}>
                    <Button variant="hero" size="sm">
                      {masterclass.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center">
            <Link to="/masterclasses" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All Upcoming Sessions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HybridTrainingSection;
