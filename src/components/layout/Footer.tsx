import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "Explore Courses", href: "/courses" },
      { label: "Browse Categories", href: "/categories" },
      { label: "Become an Instructor", href: "/become-provider" },
      { label: "Partner as an Institution", href: "/institution-register/academy" },
      { label: "Publish Courses (Organizations)", href: "/provider-apply" },
    ],
    learners: [
      { label: "How Coursebay Works", href: "/about" },
      { label: "Learning Paths", href: "/learning-paths" },
      { label: "Certificates", href: "/certificates" },
      { label: "Eligibility Tests", href: "/eligibility-tests" },
      { label: "Learner Dashboard", href: "/dashboard" },
    ],
    providers: [
      { label: "Teach on Coursebay", href: "/become-provider" },
      { label: "Institution Partnerships", href: "/institution-partnerships" },
      { label: "Tutor Guidelines", href: "/tutor-guidelines" },
      { label: "Provider Verification", href: "/provider-verification" },
      { label: "Course Publishing Guide", href: "/publishing-guide" },
    ],
    company: [
      { label: "About Coursebay", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog / Insights", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "FAQs", href: "/faqs" },
      { label: "Platform Support", href: "/support" },
      { label: "Report an Issue", href: "/report" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Data Protection", href: "/data-protection" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-white text-black">
      <div className="w-full">
        {/* Main Footer */}
        <div className="p-10 lg:p-20 border-b border-black/5">
          
          {/* First Row: Logo, Platform, For Learners, For Providers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

            {/* Column 1: Logo & Description */}
            <div>
              <Link to="/" className="inline-block mb-6">
                <img
                  src="/logo.svg"
                  alt="Coursebay"
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-black/70 text-sm leading-relaxed mb-6">
                A trusted learning marketplace connecting learners with verified providers.
              </p>
            </div>

            {/* Column 2: Platform/Marketplace */}
            <div>
              <h4 className="font-semibold text-sm mb-4 uppercase text-black/80">Platform</h4>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-xs text-black/60 hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: For Learners */}
            <div>
              <h4 className="font-semibold text-sm mb-4 uppercase text-black/80">For Learners</h4>
              <ul className="space-y-2">
                {footerLinks.learners.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-xs text-black/60 hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: For Providers */}
            <div>
              <h4 className="font-semibold text-sm mb-4 uppercase text-black/80">For Providers</h4>
              <ul className="space-y-2">
                {footerLinks.providers.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-xs text-black/60 hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Second Row: Company, Support, Legal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Empty column to align with logo column */}
            <div className="hidden lg:block"></div>

            {/* Column 1: Company */}
            <div>
              <h4 className="font-semibold text-sm mb-4 uppercase text-black/80">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-xs text-black/60 hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Support */}
            <div>
              <h4 className="font-semibold text-sm mb-4 uppercase text-black/80">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-xs text-black/60 hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h4 className="font-semibold text-sm mb-4 uppercase text-black/80">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-xs text-black/60 hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Section - Separate */}
        <div className="bg-white py-8 px-4 lg:px-12 border-b border-black/5">
          <div className="text-center">
            <h4 className="font-semibold text-sm mb-6 uppercase text-black/80">Follow Us</h4>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: "#1E2348" }}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-100/50 py-6 px-4 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-black/60">
          {/* Left: Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span className="font-bold text-black/70">© {currentYear} Coursebay. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>A trusted learning marketplace connecting learners with verified providers.</span>
          </div>

          {/* Right: Payment Icons */}
          <div className="flex items-center gap-2 grayscale opacity-70">
            <div className="h-6 w-9 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[8px]">VISA</div>
            <div className="h-6 w-9 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[8px]">MC</div>
            <div className="h-6 w-9 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-[8px]">AMEX</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;