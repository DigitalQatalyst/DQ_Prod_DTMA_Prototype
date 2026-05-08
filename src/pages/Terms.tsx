import PublicPageLayout from "@/components/layout/PublicPageLayout";

const Terms = () => {
  return (
    <PublicPageLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-800)] to-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[12px] leading-[16px] font-medium uppercase tracking-wide text-[var(--dq-orange-500)] mb-4">
              Legal
            </p>
            <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-white mb-6">
              Terms of Use
            </h1>
            <p className="text-[16px] leading-[24px] font-normal text-white/90 max-w-3xl mx-auto">
              Last updated: May 8, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">1. Agreement to Terms</h2>
              <p className="text-[var(--dq-navy-600)] leading-relaxed">
                By accessing and using this website and our services, you accept and agree to be bound by and comply with these Terms and Conditions. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">2. Use License</h2>
              <p className="text-[var(--dq-navy-600)] leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on DTMA's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--dq-navy-600)]">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">3. Disclaimer</h2>
              <p className="text-[var(--dq-navy-600)] leading-relaxed">
                The materials on DTMA's website are provided on an 'as is' basis. DTMA makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">4. Limitations</h2>
              <p className="text-[var(--dq-navy-600)] leading-relaxed">
                In no event shall DTMA or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DTMA's website, even if DTMA or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">5. Accuracy of Materials</h2>
              <p className="text-[var(--dq-navy-600)] leading-relaxed">
                The materials appearing on DTMA's website could include technical, typographical, or photographic errors. DTMA does not warrant that any of the materials on its website are accurate, complete, or current. DTMA may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">6. Links</h2>
              <p className="text-[var(--dq-navy-600)] leading-relaxed">
                DTMA has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DTMA of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">7. Modifications</h2>
              <p className="text-[var(--dq-navy-600)] leading-relaxed">
                DTMA may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">8. Governing Law</h2>
              <p className="text-[var(--dq-navy-600)] leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the United Arab Emirates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--dq-navy-950)] mb-4">9. Contact Information</h2>
              <p className="text-[var(--dq-navy-600)] leading-relaxed mb-4">
                If you have any questions about these Terms of Use, please contact us:
              </p>
              <div className="p-4 bg-[var(--dq-navy-50)] rounded-[8px] border border-[var(--dq-navy-100)]">
                <p className="text-[var(--dq-navy-950)] font-semibold">DTMA Legal Team</p>
                <p className="text-[var(--dq-navy-600)]">Email: legal@dtma.ae</p>
                <p className="text-[var(--dq-navy-600)]">Dubai, UAE</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </PublicPageLayout>
  );
};

export default Terms;
