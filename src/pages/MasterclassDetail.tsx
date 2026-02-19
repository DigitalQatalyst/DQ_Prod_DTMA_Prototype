import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Ticket,
  ChevronLeft,
  CheckCircle,
  MapPinIcon,
  FileText,
  Award,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MasterclassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isReserving, setIsReserving] = useState(false);

  // Mock data - in real app, fetch based on ID
  const session = {
    id: 1,
    title: "Advanced Facial Contouring Masterclass",
    location: "Dubai",
    address: "Dubai Aesthetics Center, Sheikh Zayed Road, Dubai, UAE",
    date: "18–19 March 2026",
    duration: "2-Day Intensive",
    instructor: "Dr. Amira Khalid",
    instructorBio:
      "Dr. Amira Khalid is a renowned facial aesthetics expert with 15+ years of clinical experience. She has trained over 500 professionals and is recognized as a thought leader in advanced contouring techniques.",
    instructorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop",
    seatsRemaining: 8,
    price: 1200,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    whatYouLearn: [
      "Advanced facial anatomy and proportions",
      "Contouring assessment and planning",
      "Hands-on contouring techniques",
      "Safety protocols and risk management",
      "Client consultation and communication",
      "Post-procedure care and follow-up",
    ],
    whoItsFor: {
      skillLevel: "Intermediate to Advanced",
      prerequisites: "Basic knowledge of facial aesthetics",
      certifications: "Beauty professional or healthcare background preferred",
    },
    whatsIncluded: [
      "2 days of expert-led training",
      "Certification of completion",
      "Training materials and workbook",
      "Practice kit with tools",
      "Lunch and refreshments",
      "Networking with peers",
    ],
    venueDetails: {
      address: "Dubai Aesthetics Center, Sheikh Zayed Road, Dubai, UAE",
      parking: "Free parking available",
      accessibility: "Fully accessible facility",
    },
    faq: [
      {
        question: "What is the refund policy?",
        answer:
          "Full refund if cancelled 30 days before the event. 50% refund if cancelled 15-29 days before. No refund within 14 days.",
      },
      {
        question: "Can I transfer my seat to someone else?",
        answer:
          "Yes, you can transfer your seat to another person up to 7 days before the event.",
      },
      {
        question: "What should I bring?",
        answer:
          "Comfortable clothing, closed-toe shoes, and a notebook. All materials and tools will be provided.",
      },
      {
        question: "Is accommodation included?",
        answer:
          "Accommodation is not included, but we can provide recommendations for nearby hotels.",
      },
    ],
  };

  const handleReserve = () => {
    setIsReserving(true);
    // Navigate to booking page
    setTimeout(() => {
      navigate(`/masterclasses/${id}/booking`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="absolute inset-0 h-96 bg-gradient-to-b from-primary/10 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/masterclasses"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to sessions
            </Link>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Left - Image */}
              <div className="md:col-span-2">
                <img
                  src={session.image}
                  alt={session.title}
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>

              {/* Right - Key Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-semibold text-foreground mb-4">
                    {session.title}
                  </h1>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">
                        {session.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">
                        {session.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">
                        {session.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Seats Remaining */}
                <div className="bg-accent rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">
                      {session.seatsRemaining} Seats Remaining
                    </span>
                  </div>
                  {session.seatsRemaining <= 5 && (
                    <p className="text-sm text-red-600 font-medium">
                      Limited availability - book soon!
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Price</p>
                  <p className="text-4xl font-bold text-foreground mb-6">
                    ${session.price}
                  </p>
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={handleReserve}
                    disabled={isReserving || session.seatsRemaining === 0}
                  >
                    {isReserving ? "Loading..." : "Reserve Your Seat"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-12">
              {/* What You'll Learn */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  What You'll Learn
                </h2>
                <ul className="space-y-3">
                  {session.whatYouLearn.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who It's For */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Who It's For
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Skill Level
                    </p>
                    <p className="text-foreground font-medium">
                      {session.whoItsFor.skillLevel}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Prerequisites
                    </p>
                    <p className="text-foreground font-medium">
                      {session.whoItsFor.prerequisites}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Recommended Background
                    </p>
                    <p className="text-foreground font-medium">
                      {session.whoItsFor.certifications}
                    </p>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {session.whatsIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Venue Details */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Venue Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Location
                      </p>
                      <p className="text-foreground font-medium">
                        {session.venueDetails.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Parking
                      </p>
                      <p className="text-foreground font-medium">
                        {session.venueDetails.parking}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructor Profile */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Your Instructor
                </h2>
                <div className="flex gap-6">
                  <img
                    src={session.instructorImage}
                    alt={session.instructor}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {session.instructor}
                    </h3>
                    <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                      Verified Instructor
                    </Badge>
                    <p className="text-muted-foreground">
                      {session.instructorBio}
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible>
                  {session.faq.map((item, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`}>
                      <AccordionTrigger className="text-foreground font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Right Column - Sticky CTA */}
            <div className="md:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-6 shadow-sm">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Price</p>
                  <p className="text-4xl font-bold text-foreground">
                    ${session.price}
                  </p>
                </div>

                <div className="mb-6 bg-accent rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">
                      {session.seatsRemaining} Seats Left
                    </span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mb-3"
                  onClick={handleReserve}
                  disabled={isReserving || session.seatsRemaining === 0}
                >
                  {isReserving ? "Loading..." : "Reserve Your Seat"}
                </Button>

                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/masterclasses">View Other Sessions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MasterclassDetail;
