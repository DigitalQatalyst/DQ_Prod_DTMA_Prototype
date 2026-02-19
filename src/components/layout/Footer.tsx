import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: "Hair Styling", href: "/courses/hair-styling" },
      { label: "Nail Artistry", href: "/courses/nail-artistry" },
      { label: "Skincare", href: "/courses/skincare" },
      { label: "Makeup", href: "/courses/makeup" },
    ],
    legal: [
      { label: "Refund Policy", href: "/refunds" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms Of Service", href: "/terms" },
      { label: "Contact Information", href: "/contact" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-white text-black">
      <div className="w-full">
        {/* Main Footer - 3 Columns with Dividers */}
        <div className="flex flex-col lg:flex-row border-b border-black/5">

          {/* Column 1: Logo */}
          <div className="flex-1 p-10 lg:p-20 lg:pl-16 flex flex-col items-start justify-start">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/log.svg"
                alt="BROWZ Academy"
                className="h-[60px] w-auto"
              />
            </Link>
            <p className="text-black/70 text-sm leading-relaxed max-w-xs">
              Empowering beauty professionals worldwide with industry-leading training, certifications, and career advancement opportunities
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex-1 p-10 lg:p-20 border-t lg:border-t-0 lg:border-l border-black/10">
            <h4 className="font-semibold text-lg mb-8">Courses</h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-black/70 hover:text-black transition-colors block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Info */}
          <div className="flex-1 p-10 lg:p-20 border-t lg:border-t-0 lg:border-l border-black/10">

            {/* Contact Block */}
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <p className="text-sm text-black/70 mb-1">600 564 668</p>
              <a href="mailto:hello@browz.ae" className="text-sm text-black/70 hover:text-black transition-colors">hello@browz.ae</a>
            </div>

            {/* Company Links */}
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-black/70 hover:text-black transition-colors">About Us</Link></li>
                <li><Link to="/instructors" className="text-sm text-black/70 hover:text-black transition-colors">Instructors</Link></li>
                <li><Link to="/careers" className="text-sm text-black/70 hover:text-black transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="text-sm text-black/70 hover:text-black transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: "#4E382D" }}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-100/50 py-6 px-4 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-black/60">

          {/* Left: Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span className="font-bold text-black/70">© {currentYear} BROWZ Beauty Academy. All rights reserved.</span>
          </div>

          {/* Center: Legal Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} to={link.href} className="hover:text-black transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Payment Icons (Placeholders) */}
          <div className="flex items-center gap-2 grayscale opacity-70">
            {/* Using simple divs representing card icons or text if no images available */}
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
