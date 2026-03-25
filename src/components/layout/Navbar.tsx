import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useFlow } from "@/contexts/FlowContext";
import { Menu, X, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

type SignInRole = "learner" | "instructor" | "admin";

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

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleSignIn = () => {
    const path = flow === "provider" ? "/auth/instructor" : "/auth";
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e2348]/20 backdrop-blur-md">
      <nav className="w-full relative">
        <div className="flex items-center w-full px-8 md:px-12 lg:px-16 py-6 gap-8 lg:gap-16 xl:gap-24" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* Left: Logo Area */}
          <div className="flex items-center flex-shrink-0 gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/dtma-logo.png"
                alt="DTMA"
                className="h-[48px] w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="h-[48px] w-[1px] bg-white/20"></div>
          </div>

          {/* Right: Single Row with Nav Links and Auth */}
          <div className="flex items-center justify-between flex-grow">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-sm font-medium transition-colors duration-200 text-white hover:text-white">
                  Home
                </Link>
                
                {/* Explore Dropdown */}
                <div className="relative" ref={exploreRef}>
                  <button 
                    onClick={() => {
                      setIsExploreOpen(!isExploreOpen);
                      setIsForYouOpen(false);
                    }}
                    className="text-sm font-medium transition-colors duration-200 hover:text-white text-white/90 flex items-center gap-1"
                  >
                    Explore Courses
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Full Screen Overlay Dropdown */}
                  {isExploreOpen && (
                    <div className="fixed left-0 right-0 top-[100px] z-[9999] bg-white border-t border-b pointer-events-none" style={{ height: 'calc(100vh - 100px)', borderColor: '#EEEDE9' }}>
                      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12 pointer-events-auto">
                        {/* First Row - 3 Categories */}
                        <div className="grid grid-cols-3 gap-12 mb-12">
                          {/* Digital Economy */}
                          <div>
                            <h3 className="text-sm font-semibold text-[#1e2348] uppercase tracking-wide mb-6">Digital Economy</h3>
                            <ul className="space-y-3">
                              <li><Link to="/courses/digital-economy-1" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">The Rise of Economy 4.0</Link></li>
                              <li><Link to="/courses/digital-economy-2" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Perfect Life Transactions: The Cornerstone of Economy 4.0</Link></li>
                              <li><Link to="/courses/digital-economy-3" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Success metrics of Economy 4.0</Link></li>
                            </ul>
                            <Link to="/courses?category=digital-economy" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</Link>
                          </div>

                          {/* Digital Cognitive Organisations */}
                          <div>
                            <h3 className="text-sm font-semibold text-[#1e2348] uppercase tracking-wide mb-6">Digital Cognitive Organisations</h3>
                            <ul className="space-y-3">
                              <li><Link to="/courses/digital-cognitive-org-1" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Building the Digital Cognitive Organization</Link></li>
                              <li><Link to="/courses/digital-cognitive-org-2" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">AI-Driven Decision Making & Organizational Intelligence</Link></li>
                              <li><Link to="/courses/digital-cognitive-org-3" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Continuous Learning & Adaptive Systems</Link></li>
                            </ul>
                            <Link to="/courses?category=digital-cognitive-organisation" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</Link>
                          </div>

                          {/* Digital Business Platforms */}
                          <div>
                            <h3 className="text-sm font-semibold text-[#1e2348] uppercase tracking-wide mb-6">Digital Business Platforms</h3>
                            <ul className="space-y-3">
                              <li><Link to="/courses/digital-business-platform-1" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Digital Business Platform Fundamentals</Link></li>
                              <li><Link to="/courses/digital-business-platform-2" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Cloud Infrastructure & API Strategy</Link></li>
                              <li><Link to="/courses/digital-business-platform-3" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Platform Security & Scalability</Link></li>
                            </ul>
                            <Link to="/courses?category=digital-business-platform" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</Link>
                          </div>
                        </div>

                        {/* Second Row - 3 Categories */}
                        <div className="grid grid-cols-3 gap-12">
                          {/* Digital Transformation */}
                          <div>
                            <h3 className="text-sm font-semibold text-[#1e2348] uppercase tracking-wide mb-6">Digital Transformation</h3>
                            <ul className="space-y-3">
                              <li><Link to="/courses/digital-transformation-1" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Digital Transformation 2.0 Strategy</Link></li>
                              <li><Link to="/courses/digital-transformation-2" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Change Management for Digital Transformation</Link></li>
                              <li><Link to="/courses/digital-transformation-3" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Measuring Transformation Success</Link></li>
                            </ul>
                            <Link to="/courses?category=digital-transformation" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</Link>
                          </div>

                          {/* Digital Workers & Workspace */}
                          <div>
                            <h3 className="text-sm font-semibold text-[#1e2348] uppercase tracking-wide mb-6">Digital Workers & Workspace</h3>
                            <ul className="space-y-3">
                              <li><Link to="/courses/digital-worker-1" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Digital Worker Essentials & Productivity</Link></li>
                              <li><Link to="/courses/digital-worker-2" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Remote Work & Collaboration Tools</Link></li>
                              <li><Link to="/courses/digital-worker-5" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Digital Wellness & Work-Life Balance</Link></li>
                            </ul>
                            <Link to="/courses?category=digital-worker-workspace" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</Link>
                          </div>

                          {/* Digital Accelerators */}
                          <div>
                            <h3 className="text-sm font-semibold text-[#1e2348] uppercase tracking-wide mb-6">Digital Accelerators</h3>
                            <ul className="space-y-3">
                              <li><Link to="/courses/digital-accelerators-1" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">AI & Machine Learning Fundamentals</Link></li>
                              <li><Link to="/courses/digital-accelerators-2" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Blockchain & Emerging Technologies</Link></li>
                              <li><Link to="/courses/digital-accelerators-3" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">IoT Strategy & Implementation</Link></li>
                            </ul>
                            <Link to="/courses?category=digital-accelerators" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</Link>
                          </div>
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
                    className="text-sm font-medium transition-colors duration-200 hover:text-white text-white/90 flex items-center gap-1"
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
                    </div>
                  )}
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-white ${
                      isActive(link.href) ? "text-white" : "text-white/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

            {/* Auth / Right Side Actions */}
            <div className="hidden md:flex items-center gap-6">
              {!loading && user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-white/80 hover:bg-white/10">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1e2348] flex items-center justify-center text-xs font-semibold text-white">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-white hover:text-white/80 hover:bg-white/10">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleSignIn}
                    className="text-sm font-semibold transition-colors duration-200 hover:text-white text-white/90"
                  >
                    Log In
                  </button>
                  <Button 
                    variant="hero" 
                    size="sm" 
                    onClick={handleSignIn}
                    className="px-6 bg-[#ff6b4d] hover:bg-[#e56045] text-white border-transparent"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button
                className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {/* Explore Dropdown Mobile */}
              <div>
                <button
                  onClick={() => setIsExploreOpen(!isExploreOpen)}
                  className="text-base font-medium py-2 transition-colors text-muted-foreground hover:text-primary flex items-center gap-2 w-full"
                >
                  Explore
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
                </button>
                {isExploreOpen && (
                  <div className="pl-4 space-y-3 mt-3 border-l-2 border-primary/30">
                    <Link
                      to="/categories"
                      className="block text-sm text-foreground hover:text-primary py-2 transition-colors font-medium"
                      onClick={() => {
                        setIsOpen(false);
                        setIsExploreOpen(false);
                      }}
                    >
                      Course Categories
                    </Link>
                    <Link
                      to="/masterclasses"
                      className="block text-sm text-foreground hover:text-primary py-2 transition-colors font-medium"
                      onClick={() => {
                        setIsOpen(false);
                        setIsExploreOpen(false);
                      }}
                    >
                      In-Person Trainings
                    </Link>
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-base font-medium py-2 transition-colors ${
                    isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                {!loading && user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="hero" 
                    className="w-full px-6"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
