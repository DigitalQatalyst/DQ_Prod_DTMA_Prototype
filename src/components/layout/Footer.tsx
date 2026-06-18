import { Link } from "react-router-dom";
import { Linkedin, Youtube, Twitter } from "lucide-react";
import DTMALogo from "@/components/layout/DTMALogo";
import { linkMuted, sectionPaddingX } from "@/lib/brandAccent";
import { DQ_CORP_WEB_URL, EXPLORE_DQ_LABEL } from "@/lib/brandLinks";

const Footer = () => {
  return (
    <footer className={`border-t border-gray-100 bg-white pb-8 pt-14 ${sectionPaddingX}`}>
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <DTMALogo />
            </div>
            <p className="max-w-[320px] text-[14px] leading-relaxed text-gray-500">
              Master the skills to lead, deliver, and thrive in the new digital economy.
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
              Explore
            </p>
            <ul className="space-y-2.5 text-[14px] text-gray-600">
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
                  <Link to={link.href} className={linkMuted}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
              Company
            </p>
            <ul className="space-y-2.5 text-[14px] text-gray-600">
              {[
                { label: "About Us", href: "/about" },
                { label: "Accreditation & Credentials", href: "/accreditation" },
                { label: "Help Centre", href: "/help" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className={linkMuted}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
              Follow Us
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.linkedin.com/company/digitalqatalyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-[14px] text-gray-600 ${linkMuted}`}
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/digitalqatalyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-[14px] text-gray-600 ${linkMuted}`}
                >
                  <Twitter className="h-4 w-4" /> X
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@digitalqatalyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-[14px] text-gray-600 ${linkMuted}`}
                >
                  <Youtube className="h-4 w-4" /> YouTube
                </a>
              </li>
              <li>
                <a
                  href={DQ_CORP_WEB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-[14px] text-gray-600 ${linkMuted}`}
                >
                  {EXPLORE_DQ_LABEL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-[12px] text-gray-400 sm:flex-row">
          <p>© 2026 DTMA | Digital Transformation Management Academy. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="transition-colors hover:text-gray-700">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-gray-700">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
