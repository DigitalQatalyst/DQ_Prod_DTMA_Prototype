import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Ticket,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

const Masterclasses = () => {
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("upcoming");

  // Mock data for masterclasses
  const masterclasses = [
    {
      id: 1,
      title: "Advanced Facial Contouring Masterclass",
      location: "Dubai",
      date: "18–19 March 2026",
      dateObj: new Date("2026-03-18"),
      duration: "2-Day Intensive",
      instructor: "Dr. Amira Khalid",
      instructorBio: "Expert in facial aesthetics with 15+ years experience",
      seatsRemaining: 8,
      price: 1200,
      category: "Facial Aesthetics",
      description: "Master advanced facial contouring techniques in this intensive 2-day masterclass.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Body Sculpting Practical Intensive",
      location: "Abu Dhabi",
      date: "5 April 2026",
      dateObj: new Date("2026-04-05"),
      duration: "1-Day Workshop",
      instructor: "Marcus Tan",
      instructorBio: "Renowned body sculpting specialist",
      seatsRemaining: 5,
      price: 850,
      category: "Body Aesthetics",
      description: "Hands-on body sculpting techniques with practical demonstrations.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Injectables Safety & Consultation Lab",
      location: "Dubai",
      date: "22 May 2026",
      dateObj: new Date("2026-05-22"),
      duration: "2-Day Certification Lab",
      instructor: "Dr. Layla Noor",
      instructorBio: "Safety-first injectables expert",
      seatsRemaining: 0,
      isLimited: true,
      price: 1500,
      category: "Injectables",
      description: "Comprehensive safety protocols and consultation techniques for injectables.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Eye Enhancement & Blepharoplasty Awareness",
      location: "Dubai",
      date: "10 June 2026",
      dateObj: new Date("2026-06-10"),
      duration: "1-Day Workshop",
      instructor: "Dr. Amira Khalid",
      instructorBio: "Expert in facial aesthetics with 15+ years experience",
      seatsRemaining: 12,
      price: 950,
      category: "Eye Enhancement",
      description: "Understanding eye enhancement procedures and professional awareness.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const locations = [...new Set(masterclasses.map((m) => m.location))];
  const categories = [...new Set(masterclasses.map((m) => m.category))];

  const filteredAndSorted = useMemo(() => {
    const filtered = masterclasses.filter((m) => {
      if (locationFilter && m.location !== locationFilter) return false;
      if (categoryFilter && m.category !== categoryFilter) return false;
      return true;
    });

    filtered.sort((a, b) => {
      if (sortBy === "upcoming") {
        return a.dateObj.getTime() - b.dateObj.getTime();
      } else if (sortBy === "demand") {
        return b.seatsRemaining - a.seatsRemaining;
      } else if (sortBy === "limited") {
        return a.seatsRemaining - b.seatsRemaining;
      }
      return 0;
    });

    return filtered;
  }, [locationFilter, categoryFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to home
              </Link>
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
                In-Person Masterclasses
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Hands-on, expert-led, seat-limited training sessions designed for professionals ready to refine their technique under expert guidance.
              </p>
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <Select value={locationFilter || "all"} onValueChange={(value) => setLocationFilter(value === "all" ? null : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={categoryFilter || "all"} onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming Soonest</SelectItem>
                  <SelectItem value="demand">Highest Demand</SelectItem>
                  <SelectItem value="limited">Limited Seats</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center justify-end">
                <span className="text-sm text-muted-foreground">
                  {filteredAndSorted.length} session{filteredAndSorted.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Sessions Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredAndSorted.map((session) => (
                <Link
                  key={session.id}
                  to={`/masterclasses/${session.id}`}
                  className="group rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow bg-white"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={session.image}
                      alt={session.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {session.seatsRemaining === 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-semibold">Sold Out</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Scarcity Badge */}
                    {session.isLimited && (
                      <div className="mb-3">
                        <Badge className="bg-red-50 text-red-700 border-red-200">
                          Limited Availability
                        </Badge>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {session.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{session.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{session.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>Led by {session.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Ticket className="w-4 h-4" />
                        <span>
                          {session.seatsRemaining === 0
                            ? "No seats available"
                            : `${session.seatsRemaining} Seats Remaining`}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border my-4" />

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Price</p>
                        <p className="text-2xl font-bold text-foreground">
                          ${session.price}
                        </p>
                      </div>
                      <Button
                        variant="hero"
                        size="sm"
                        disabled={session.seatsRemaining === 0}
                        className="flex items-center gap-2"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredAndSorted.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No sessions found matching your filters. Try adjusting your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Masterclasses;
