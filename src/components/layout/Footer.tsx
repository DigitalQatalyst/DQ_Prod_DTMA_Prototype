import { Link } from "react-router-dom";
import { Linkedin, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#e8e8ec] font-sans">
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img src="/log.svg" alt="DTMA" className="h-8 w-auto" />
            </Link>
            <p className="text-[14px] text-[#6b6b7b] leading-relaxed max-w-[220px]">
              Master the skills to lead, deliver, and thrive in the new digital economy.
            </p>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#9a9aaa] mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Courses", href: "/courses" },
                { label: "The 6XD Framework", href: "/6xd" },
                { label: "Faculty", href: "/faculty" },
                { label: "For Organizational Leaders", href: "/personas/organizational-leaders" },
                { label: "For Transformation Specialists", href: "/personas/transformation-specialists" },
                { label: "For Digital Workers", href: "/personas/digital-workers" },
                { label: "Blog & Insights", href: "/blog" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-[14px] text-[#4a4a5a] hover:text-[#ff4500] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#9a9aaa] mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Accreditation & Credentials", href: "/accreditation" },
                { label: "Help Centre", href: "/help" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
                { label: "Admin", href: "/admin" },
                { label: "School Manager", href: "/sms-admin" },
                { label: "Instructor", href: "/auth/instructor" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-[14px] text-[#4a4a5a] hover:text-[#ff4500] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Follow Us */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#9a9aaa] mb-5">
              Follow Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="inline-flex items-center gap-2 text-[14px] text-[#4a4a5a] hover:text-[#ff4500] transition-colors">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center gap-2 text-[14px] text-[#4a4a5a] hover:text-[#ff4500] transition-colors">
                  <Twitter className="w-4 h-4" /> X
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center gap-2 text-[14px] text-[#4a4a5a] hover:text-[#ff4500] transition-colors">
                  <Youtube className="w-4 h-4" /> YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e8e8ec]">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-[#9a9aaa]">
            © 2026 DTMA | Digital Transformation Management Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-[13px] text-[#9a9aaa] hover:text-[#0a0f1e] transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[13px] text-[#9a9aaa] hover:text-[#0a0f1e] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
