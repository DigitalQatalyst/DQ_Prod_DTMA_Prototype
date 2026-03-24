import { Link } from "react-router-dom";
import { Linkedin, Youtube, Twitter, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const footerLinks = {
    getToKnowUs: [
      { label: "About Us", href: "/about" },
      { label: "Discover the 6XD", href: "/6xd" },
      { label: "Faculty", href: "/faculty" },
      { label: "Help Centre", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Accreditation & Credentials", href: "/accreditation" },
      { label: "Admin", href: "/admin" },
    ],
    forYou: [
      { label: "Explore Courses", href: "/courses" },
      { label: "For Organizational Leaders", href: "/personas/organizational-leaders" },
      { label: "For Transformation Specialists", href: "/personas/transformation-specialists" },
      { label: "For Digital Workers", href: "/personas/digital-workers" },
      { label: "Blog & Insights", href: "/blog" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "X (Twitter)" },
  ];

  return (
    <footer className="bg-[#1e2348] text-white">
      <div className="w-full">
        {/* Main Footer */}
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Column 1: Brand & Newsletter */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <img
                  src="/dtma-logo.png"
                  alt="DTMA"
                  className="h-12 w-auto"
                />
              </Link>
              <h3 className="text-base font-semibold mb-3">
                DTMA | Digital Transformation Management Academy
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                Master the skills to lead, deliver, and thrive in the new digital economy.
              </p>
              
              {/* Newsletter Signup */}
              <form onSubmit={handleNewsletterSubmit} className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#ff6b4d]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-[#ff6b4d] hover:bg-[#e56045] flex items-center justify-center transition-colors"
                  aria-label="Submit"
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>

            {/* Column 2: Get to Know Us */}
            <div>
              <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide text-white/90">
                Get to Know Us
              </h4>
              <ul className="space-y-3">
                {footerLinks.getToKnowUs.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: For You */}
            <div>
              <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide text-white/90">
                For You
              </h4>
              <ul className="space-y-3">
                {footerLinks.forYou.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Find Us */}
            <div>
              <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide text-white/90">
                Find Us
              </h4>
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <a 
                href="#" 
                className="text-sm text-white/70 hover:text-white transition-colors inline-block"
              >
                DTMA Website →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-6">
            {/* Accreditation Strip */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#ff6b4d]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    Licensed Training Institute — KHDA, Dubai
                  </p>
                  <p className="text-xs text-white/60">
                    Training Institute Permit No. [TBD]
                  </p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60">
              <p>
                © 2026 DTMA | Digital Transformation Management Academy. All rights reserved.
              </p>
              <p>Version v1.0</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
