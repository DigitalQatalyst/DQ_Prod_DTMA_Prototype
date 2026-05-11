import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[var(--dq-navy-950)]">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[12px] leading-[16px] font-semibold uppercase tracking-wide text-[var(--dq-orange-500)] mb-6">
                Legal
              </p>
              <h1 className="text-[40px] leading-[48px] font-semibold text-white mb-6">
                Privacy Policy
              </h1>
              <p className="text-[18px] leading-[28px] font-normal text-white/90 max-w-3xl mx-auto">
                Last updated: May 8, 2026
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Content */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="max-w-3xl">
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">1. Introduction</h2>
                <p className="text-[var(--dq-navy-600)] leading-relaxed mb-4">
                  DTMA (Digital Transformation Management Academy) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">2. Information We Collect</h2>
                <p className="text-[var(--dq-navy-600)] leading-relaxed mb-4">
                  We may collect information about you in a variety of ways. The information we may collect on the site includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[var(--dq-navy-600)]">
                  <li>Personal identification information (name, email address, phone number, etc.)</li>
                  <li>Professional information (job title, company, industry)</li>
                  <li>Educational information (courses enrolled, progress, achievements)</li>
                  <li>Technical information (IP address, browser type, device information)</li>
                  <li>Usage data (pages visited, time spent, interactions)</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">3. Use of Your Information</h2>
                <p className="text-[var(--dq-navy-600)] leading-relaxed mb-4">
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[var(--dq-navy-600)]">
                  <li>Create and manage your account</li>
                  <li>Deliver course content and educational services</li>
                  <li>Send periodic emails regarding your account or order</li>
                  <li>Improve our website and services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Generate analytics and insights</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">4. Disclosure of Your Information</h2>
                <p className="text-[var(--dq-navy-600)] leading-relaxed mb-4">
                  We may share information we have collected about you in certain situations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[var(--dq-navy-600)]">
                  <li>By Law or to Protect Rights</li>
                  <li>Third-Party Service Providers</li>
                  <li>Affiliates and Partners</li>
                  <li>Business Transfers</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">5. Security of Your Information</h2>
                <p className="text-[var(--dq-navy-600)] leading-relaxed">
                  We use administrative, technical, and physical security measures to protect your personal information. However, perfect security does not exist on the Internet.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">6. Contact Us</h2>
                <p className="text-[var(--dq-navy-600)] leading-relaxed">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-[var(--dq-navy-50)] rounded-[8px] border border-[var(--dq-navy-100)]">
                  <p className="text-[var(--dq-navy-950)] font-semibold">DTMA Privacy Team</p>
                  <p className="text-[var(--dq-navy-600)]">Email: privacy@dtma.ae</p>
                  <p className="text-[var(--dq-navy-600)]">Dubai, UAE</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
