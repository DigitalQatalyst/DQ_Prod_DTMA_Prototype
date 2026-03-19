import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useFlow } from "@/contexts/FlowContext";
import { Menu, X, LogOut, LayoutDashboard, Search, ChevronDown, GraduationCap } from "lucide-react";

type SignInRole = "learner" | "instructor" | "admin";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isForYouOpen, setIsForYouOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const navLinks: { href: string; label: string }[] = [];

  const isActive = (path: string) => location.pathname === path;

  const getSignInPath = (role: SignInRole) => {
    if (role === "learner") return "/auth";
    return role === "admin" ? "/auth/admin" : "/auth/instructor";
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleSignIn = () => {
    // Use flow context to determine which auth page to navigate to
    const path = flow === "provider" ? "/auth/instructor" : "/auth";
    navigate(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="w-full relative">
        <div className="flex items-stretch w-full px-8 md:px-12 lg:px-16 py-6 gap-8 lg:gap-16 xl:gap-24" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* Left: Logo Area */}
          <div className="flex items-center flex-shrink-0 gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo dtma.svg"
                alt="DTMA"
                className="h-[48px] w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="h-[48px] w-[1px] bg-white/20"></div>
          </div>

          {/* Right: Two Rows Main Content */}
          <div className="flex flex-col flex-grow justify-center max-w-6xl" style={{ marginTop: '32px' }}>
            {/* Top Row */}
            <div className="flex justify-between items-end w-full pb-3 border-b border-white/20">
              <h2 className="text-[20px] leading-[28px] font-normal text-white mb-1 tracking-tight">
                Digital Transformation Management Academy
              </h2>
              
              <div className="hidden md:flex items-center gap-6 mb-1">
                {/* Auth / Right Side Actions */}
                {!loading && user ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-white/80 hover:bg-white/10">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                        {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-white hover:text-white/80 hover:bg-white/10">
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <button 
                    onClick={handleSignIn}
                    className="text-sm font-semibold transition-colors duration-200 hover:text-white text-white/90"
                  >
                    Log In
                  </button>
                )}


                
                {!loading && !user && (
                  <Button 
                    variant="hero" 
                    size="sm" 
                    onClick={handleSignIn}
                    className="px-6 ml-2 bg-[#ff6b4d] hover:bg-[#e56045] text-white border-transparent"
                  >
                    Get Started
                  </Button>
                )}
              </div>

               {/* Mobile Toggle */}
              <div className="md:hidden flex items-center gap-4 mb-1">
                <button
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Bottom Row - Navigation Links */}
            <div className="hidden md:flex items-center gap-8 pt-4">
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
                    <div className="fixed left-0 right-0 top-[160px] z-[9999] bg-white border-t border-b pointer-events-none" style={{ height: 'calc(100vh - 160px)', borderColor: '#EEEDE9' }}>
                      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12 pointer-events-auto">
                        <div className="grid grid-cols-4 gap-12">
                          {/* Digital Workers */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Digital Workers</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 1</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 2</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 3</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</a>
                          </div>

                          {/* Digital Leaders */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Digital Leaders</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 1</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 2</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 3</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</a>
                          </div>

                          {/* Transformation Specialists and Teams */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Transformation Specialists and Teams</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 1</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 2</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 3</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</a>
                          </div>

                          {/* Digital Economy */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Digital Economy</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 1</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 2</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 3</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</a>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-12 mt-12">
                          {/* Digital Cognitive Organisations */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Digital Cognitive Organisations</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 1</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 2</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 3</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</a>
                          </div>

                          {/* Digital Business Platforms */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Digital Business Platforms</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 1</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 2</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 3</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</a>
                          </div>

                          {/* Digital Transformation */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Digital Transformation</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 1</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 2</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 3</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</a>
                          </div>

                          {/* Digital Worker & Workspace */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Digital Worker & Workspace</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 1</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 2</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Course 3</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-[#ff6b4d] hover:text-[#e56045] mt-4 inline-block">View all</a>
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
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Digital Workers</a></li>
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Organizational Leaders</a></li>
                          <li><a href="#" className="text-sm text-muted-foreground hover:text-[#ff6b4d] transition-colors">Transformation Specialists</a></li>
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
