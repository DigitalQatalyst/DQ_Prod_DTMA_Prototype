import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useFlow } from "@/contexts/FlowContext";
import { Menu, X, LogOut, LayoutDashboard, Search, ChevronDown, GraduationCap } from "lucide-react";

type SignInRole = "learner" | "instructor" | "admin";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const { flow } = useFlow();

  const navLinks = [
    { href: "/become-provider", label: "Become a Provider" },
  ];

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
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="w-full">
        <div className="flex items-center justify-between h-20 px-8 md:px-12 lg:px-16">
          <div className="flex items-center" style={{ maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group h-[44px]">
                <img
                  src="/logo.svg"
                  alt="BROWZ Academy"
                  className="h-[44px] w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8 ml-8">
                {/* Explore Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsExploreOpen(!isExploreOpen)}
                    className="text-sm font-medium transition-colors duration-200 hover:text-primary text-muted-foreground flex items-center gap-1"
                  >
                    Explore
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Full Screen Overlay Dropdown */}
                  {isExploreOpen && (
                    <div className="fixed left-0 right-0 top-20 z-[9999] bg-white border-t border-b pointer-events-none" style={{ height: 'auto', borderColor: '#EEEDE9' }}>
                      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12 pointer-events-auto">
                        <div className="grid grid-cols-4 gap-12">
                          {/* Explore Roles */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Explore roles</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Data Analyst</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Project Manager</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cyber Security Analyst</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Data Scientist</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Business Intelligence Analyst</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Digital Marketing Specialist</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">UI / UX Designer</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Machine Learning Engineer</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Social Media Specialist</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Computer Support Specialist</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 mt-4 inline-block">View all</a>
                          </div>

                          {/* Explore Categories */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Explore categories</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Artificial Intelligence</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Business</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Data Science</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Information Technology</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Computer Science</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Healthcare</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Physical Science and Engineering</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Personal Development</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Social Sciences</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Language Learning</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Arts and Humanities</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 mt-4 inline-block">View all</a>
                          </div>

                          {/* Earn a Professional Certificate */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Earn a Professional Certificate</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Business</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Computer Science</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Data Science</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Information Technology</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 mt-4 inline-block">View all</a>
                            
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6 mt-8">Earn an online degree</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Bachelor's Degrees</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Master's Degrees</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Postgraduate Programs</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 mt-4 inline-block">View all</a>
                          </div>

                          {/* Explore Trending Skills */}
                          <div>
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6">Explore trending skills</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Python</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Artificial Intelligence</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Excel</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Machine Learning</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">SQL</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Project Management</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Power BI</a></li>
                              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Marketing</a></li>
                            </ul>
                            <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 mt-4 inline-block">View all</a>
                            
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-6 mt-8">Prepare for a certification exam</h3>
                            <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 inline-block">View all</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                      isActive(link.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Right Side - Auth & Dashboard */}
              <div className="hidden md:flex items-center gap-4 ml-auto">
                {!loading && user ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                        {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleSignOut}>
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button 
                    variant="hero" 
                    size="sm" 
                    onClick={handleSignIn}
                    className="px-6"
                  >
                    Sign In
                  </Button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors ml-auto"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
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
