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
              <Link to="/" className="flex items-center gap-3 group h-[60px]">
                <img
                  src="/log.svg"
                  alt="BROWZ Academy"
                  className="h-[50px] w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-4 ml-auto">
                <div className="flex items-center" style={{ gap: "28px" }}>
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
                      <div className="fixed left-0 right-0 top-20 z-[9999] bg-white border-t border-b pointer-events-none" style={{ height: '368px', borderColor: '#EEEDE9' }}>
                        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 h-full pointer-events-auto">
                          <div className="grid grid-cols-2 h-full">
                            {/* Left Column - Menu Items */}
                            <div className="p-12 lg:p-16 space-y-8 flex flex-col justify-center">
                              <Link
                                to="/categories"
                                onClick={() => setIsExploreOpen(false)}
                                className="block group/item hover:no-underline"
                              >
                                <div className="mb-4">
                                  <h3 className="text-lg font-semibold text-foreground uppercase tracking-wide group-hover/item:text-primary transition-colors">
                                    Course Categories
                                  </h3>
                                  <div className="h-1 w-12 bg-primary opacity-0 group-hover/item:opacity-100 transition-all mt-2" />
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                                  Explore our comprehensive range of beauty training programs designed to elevate your skills and career.
                                </p>
                              </Link>

                              <Link
                                to="/masterclasses"
                                onClick={() => setIsExploreOpen(false)}
                                className="block group/item hover:no-underline"
                              >
                                <div className="mb-4">
                                  <h3 className="text-lg font-semibold text-foreground uppercase tracking-wide group-hover/item:text-primary transition-colors">
                                    In-Person Trainings
                                  </h3>
                                  <div className="h-1 w-12 bg-primary opacity-0 group-hover/item:opacity-100 transition-all mt-2" />
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                                  Hands-on masterclasses with expert instructors in structured, practical environments.
                                </p>
                              </Link>
                            </div>

                            {/* Right Column - Hero Content */}
                            <div className="p-12 lg:p-16 flex items-center justify-center" style={{ marginTop: '-56px' }}>
                              <div className="text-center">
                                <img src="/hat.png" alt="Graduation Hat" className="w-72 h-72 object-contain opacity-60" />
                              </div>
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
