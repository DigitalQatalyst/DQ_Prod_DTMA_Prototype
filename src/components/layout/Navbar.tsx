import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useFlow } from "@/contexts/FlowContext";
import { Menu, X, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import DTMALogo from "@/components/layout/DTMALogo";
import ExploreDigitalQatalystCta from "@/components/layout/ExploreDigitalQatalystCta";
import { btnPrimary } from "@/lib/brandAccent";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isForYouOpen, setIsForYouOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const { flow } = useFlow();
  const exploreRef = useRef<HTMLDivElement>(null);
  const forYouRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setIsExploreOpen(false);
      }
      if (forYouRef.current && !forYouRef.current.contains(event.target as Node)) {
        setIsForYouOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Disable body scroll when dropdown is open
  useEffect(() => {
    if (isExploreOpen || isForYouOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExploreOpen, isForYouOpen]);

  const navLinks: { href: string; label: string }[] = [];

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = cn(
    "text-sm font-medium text-gray-600 transition-colors hover:text-dq-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-orange focus-visible:ring-offset-2 rounded-sm"
  );

  const dropdownTriggerClass = cn(navLinkClass, "flex items-center gap-1");

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleSignIn = () => {
    const path = flow === "provider" ? "/auth/instructor" : "/auth";
    navigate(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 md:px-8 lg:px-10">
          <div className="flex items-center gap-8">
            <DTMALogo />

            <nav className="hidden items-center gap-6 md:flex">
                
                {/* Explore Dropdown */}
                <div className="relative" ref={exploreRef}>
                  <button 
                    onClick={() => {
                      setIsExploreOpen(!isExploreOpen);
                      setIsForYouOpen(false);
                    }}
                    className={dropdownTriggerClass}
                  >
                    Explore Courses
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Full Screen Overlay Dropdown */}
                  {isExploreOpen && (
                    <div className="pointer-events-none fixed left-0 right-0 top-16 z-[9999] border-t border-gray-100 bg-white shadow-lg">
                      <div className="pointer-events-auto mx-auto max-w-[1200px] px-5 py-10 md:px-8 lg:px-10">
                        {/* Header */}
                        <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-6">
                          <div>
                            <p className="dq-eyebrow mb-2">6XD Framework</p>
                            <h2 className="text-[28px] font-semibold text-dq-navy">Explore Courses</h2>
                          </div>
                          <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 text-[13px] font-semibold text-dq-orange transition-colors hover:text-[#E04020]"
                            onClick={() => setIsExploreOpen(false)}
                          >
                            View All Courses
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>

                        {/* Course grid */}
                        <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                          {[
                            { num: "01", to: "/courses/course-economy-40", title: "Mastering Economy 4.0", desc: "Master the fundamentals of the digital economy and Economy 4.0" },
                            { num: "02", to: "/courses/course-cognitive-org", title: "Decoding Digital Cognitive Organisations", desc: "Transform your organization into an intelligent, learning entity" },
                            { num: "03", to: "/courses/course-business-platforms", title: "Building Powerful Digital Business Platforms", desc: "Master the architecture and design of scalable digital platforms" },
                            { num: "04", to: "/courses/course-transformation", title: "Navigating Digital Transformation 2.0", desc: "Lead successful digital transformation initiatives" },
                            { num: "05", to: "/courses/course-digital-workers", title: "Optimizing Digital Workers and Workspaces", desc: "Master tools and practices for modern digital work" },
                            { num: "06", to: "/courses/course-digital-accelerators", title: "Leveraging Digital Accelerators for Growth", desc: "Harness AI, blockchain, IoT, and automation" },
                          ].map((course) => (
                            <Link
                              key={course.num}
                              to={course.to}
                              className="group flex items-start gap-4 rounded-xl px-3 py-2 transition-colors hover:bg-gray-50"
                              onClick={() => setIsExploreOpen(false)}
                            >
                              <span className="mt-0.5 w-8 flex-shrink-0 text-[22px] font-semibold leading-none text-gray-200">{course.num}</span>
                                <div>
                                <h3 className="mb-1 text-[14px] font-semibold leading-snug text-dq-navy transition-colors group-hover:text-dq-orange">{course.title}</h3>
                                <p className="text-[13px] text-[#9a9aaa] leading-relaxed">{course.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* For You Dropdown */}
                <div className="relative" ref={forYouRef}>
                  <button 
                    onClick={() => {
                      setIsForYouOpen(!isForYouOpen);
                      setIsExploreOpen(false);
                    }}
                    className={dropdownTriggerClass}
                  >
                    For You
                    <ChevronDown className={`w-4 h-4 transition-transform ${isForYouOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isForYouOpen && (
                    <div className="absolute left-0 mt-6 w-64 bg-white border shadow-lg rounded-xl z-[9999] py-4 pointer-events-auto" style={{ borderColor: '#EEEDE9' }}>
                      <div className="px-6 py-2">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Choose Your Path</h3>
                        <ul className="space-y-3">
                          <li><Link to="/personas/digital-workers" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Digital Workers</Link></li>
                          <li><Link to="/personas/organizational-leaders" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Organizational Leaders</Link></li>
                          <li><Link to="/personas/transformation-specialists" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Transformation Specialists</Link></li>
                        </ul>
                      </div>
                      <div className="px-6 py-2 border-t border-[#EEEDE9] mt-2">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Resources</h3>
                        <ul className="space-y-3">
                          <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Blog & Insights</Link></li>
                          <li><Link to="/help" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Help Center</Link></li>
                          <li><Link to="/accreditation" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Accreditation</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    navLinkClass,
                    isActive(link.href) && "font-semibold text-dq-orange"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {!loading && user ? (
              <>
                <div className="hidden items-center gap-3 md:flex">
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:bg-gray-50 hover:text-dq-orange">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dq-navy text-xs font-semibold text-white">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-gray-600 hover:bg-gray-50 hover:text-dq-orange">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <ExploreDigitalQatalystCta className="hidden md:inline-flex" />
              </>
            ) : (
              <div className="hidden items-center gap-3 md:flex">
                <ExploreDigitalQatalystCta />
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="text-[13px] font-semibold text-dq-navy transition-colors hover:text-dq-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-orange focus-visible:ring-offset-2 rounded-sm"
                >
                  Log in
                </button>
                <Button size="sm" onClick={handleSignIn} className={cn(btnPrimary, "px-5")}>
                  Get Started
                </Button>
              </div>
            )}

            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="rounded-md p-2 outline-none focus-visible:ring-2 focus-visible:ring-dq-navy focus-visible:ring-offset-2 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-30 flex flex-col gap-1 overflow-y-auto bg-white p-4 md:hidden">
          <button
            type="button"
            onClick={() => setIsExploreOpen(!isExploreOpen)}
            className="flex w-full items-center gap-2 border-b border-gray-100 py-3 text-lg font-medium text-dq-navy"
          >
            Explore Courses
            <ChevronDown className={`h-4 w-4 transition-transform ${isExploreOpen ? "rotate-180" : ""}`} />
          </button>
          {isExploreOpen && (
            <div className="space-y-2 pb-3 pl-4">
              <Link
                to="/courses"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-dq-orange"
                onClick={() => {
                  setIsOpen(false);
                  setIsExploreOpen(false);
                }}
              >
                View All Courses
              </Link>
              <Link
                to="/categories"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-dq-orange"
                onClick={() => {
                  setIsOpen(false);
                  setIsExploreOpen(false);
                }}
              >
                Course Categories
              </Link>
              <Link
                to="/masterclasses"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-dq-orange"
                onClick={() => {
                  setIsOpen(false);
                  setIsExploreOpen(false);
                }}
              >
                In-Person Trainings
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsForYouOpen(!isForYouOpen)}
            className="flex w-full items-center gap-2 border-b border-gray-100 py-3 text-lg font-medium text-dq-navy"
          >
            For You
            <ChevronDown className={`h-4 w-4 transition-transform ${isForYouOpen ? "rotate-180" : ""}`} />
          </button>
          {isForYouOpen && (
            <div className="space-y-2 pb-3 pl-4">
              <Link
                to="/personas/digital-workers"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-dq-orange"
                onClick={() => {
                  setIsOpen(false);
                  setIsForYouOpen(false);
                }}
              >
                Digital Workers
              </Link>
              <Link
                to="/personas/organizational-leaders"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-dq-orange"
                onClick={() => {
                  setIsOpen(false);
                  setIsForYouOpen(false);
                }}
              >
                Organizational Leaders
              </Link>
              <Link
                to="/personas/transformation-specialists"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-dq-orange"
                onClick={() => {
                  setIsOpen(false);
                  setIsForYouOpen(false);
                }}
              >
                Transformation Specialists
              </Link>
              <Link
                to="/blog"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-dq-orange"
                onClick={() => {
                  setIsOpen(false);
                  setIsForYouOpen(false);
                }}
              >
                Blog & Insights
              </Link>
              <Link
                to="/help"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-dq-orange"
                onClick={() => {
                  setIsOpen(false);
                  setIsForYouOpen(false);
                }}
              >
                Help Center
              </Link>
              <Link
                to="/accreditation"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-dq-orange"
                onClick={() => {
                  setIsOpen(false);
                  setIsForYouOpen(false);
                }}
              >
                Accreditation
              </Link>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="border-b border-gray-100 py-3 text-lg font-medium text-dq-navy"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {!loading && user ? (
            <>
              <Link
                to="/dashboard"
                className="border-b border-gray-100 py-3 text-lg font-medium text-dq-navy"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                type="button"
                className="mt-4 w-full rounded-full border border-gray-200 py-3 text-center font-semibold text-dq-navy"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <ExploreDigitalQatalystCta className="mt-4 w-full" showIcon={false} />
              <button
                type="button"
                className="border-b border-gray-100 py-3 text-left text-lg font-medium text-dq-navy"
                onClick={() => {
                  handleSignIn();
                  setIsOpen(false);
                }}
              >
                Log in
              </button>
              <Button className={cn(btnPrimary, "mt-4 w-full py-3")} onClick={handleSignIn}>
                Get Started
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
