import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#f5f4f0] pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">
            Legal
          </p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold text-[#0a0f1e] mb-6 max-w-2xl">
            Privacy <span className="text-[#ff4500]">Policy</span>
          </h1>
          <p className="text-[17px] text-[#4a4a5a]">
            Last updated: May 8, 2026
          </p>
        </div>
      </section>

      <main>
        {/* Content */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="max-w-3xl">

              <div className="mb-12">
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-4">1. Introduction</h2>
                <p className="text-[#4a4a5a] leading-relaxed mb-4">
                  DTMA (Digital Transformation Management Academy) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-4">2. Information We Collect</h2>
                <p className="text-[#4a4a5a] leading-relaxed mb-4">
                  We may collect information about you in a variety of ways. The information we may collect on the site includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#4a4a5a]">
                  <li>Personal identification information (name, email address, phone number, etc.)</li>
                  <li>Professional information (job title, company, industry)</li>
                  <li>Educational information (courses enrolled, progress, achievements)</li>
                  <li>Technical information (IP address, browser type, device information)</li>
                  <li>Usage data (pages visited, time spent, interactions)</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-4">3. Use of Your Information</h2>
                <p className="text-[#4a4a5a] leading-relaxed mb-4">
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#4a4a5a]">
                  <li>Create and manage your account</li>
                  <li>Deliver course content and educational services</li>
                  <li>Send periodic emails regarding your account or order</li>
                  <li>Improve our website and services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Generate analytics and insights</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-4">4. Disclosure of Your Information</h2>
                <p className="text-[#4a4a5a] leading-relaxed mb-4">
                  We may share information we have collected about you in certain situations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#4a4a5a]">
                  <li>By Law or to Protect Rights</li>
                  <li>Third-Party Service Providers</li>
                  <li>Affiliates and Partners</li>
                  <li>Business Transfers</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-4">5. Security of Your Information</h2>
                <p className="text-[#4a4a5a] leading-relaxed">
                  We use administrative, technical, and physical security measures to protect your personal information. However, perfect security does not exist on the Internet.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-[28px] font-bold text-[#0a0f1e] mb-4">6. Contact Us</h2>
                <p className="text-[#4a4a5a] leading-relaxed">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-6 bg-[#f5f4f0] rounded-xl border border-[#e8e8ec]">
                  <p className="text-[#0a0f1e] font-semibold">DTMA Privacy Team</p>
                  <p className="text-[#4a4a5a]">Email: privacy@dtma.ae</p>
                  <p className="text-[#4a4a5a]">Dubai, UAE</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
