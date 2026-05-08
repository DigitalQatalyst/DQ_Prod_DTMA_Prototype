import { ChevronDown, Search, MessageCircle, Mail, Phone } from "lucide-react";
import { useState } from "react";
import PublicPageLayout from "@/components/layout/PublicPageLayout";

const Help = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, navigate to the Courses section, select your desired course, and click the 'Enroll Now' button. You'll need to create an account or log in to complete the enrollment process.",
    },
    {
      id: 2,
      question: "What are the system requirements?",
      answer: "You need a modern web browser (Chrome, Firefox, Safari, or Edge), a stable internet connection, and a device with at least 4GB of RAM. For video content, we recommend a minimum internet speed of 5 Mbps.",
    },
    {
      id: 3,
      question: "How do I access my course materials?",
      answer: "Once enrolled, log into your account and navigate to 'My Courses'. You'll find all course materials, videos, assignments, and resources organized by module.",
    },
    {
      id: 4,
      question: "Can I download course materials?",
      answer: "Yes, most course materials can be downloaded for offline access. Look for the download icon next to each resource. Some materials may have restrictions based on licensing agreements.",
    },
    {
      id: 5,
      question: "How do I get my certificate?",
      answer: "Upon successful completion of a course (including all assignments and assessments), your certificate will be automatically generated and available in your account dashboard.",
    },
    {
      id: 6,
      question: "What is your refund policy?",
      answer: "We offer a 14-day money-back guarantee if you're not satisfied with your course. Contact our support team to initiate a refund request.",
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@dtma.ae",
      responseTime: "24-48 hours",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call our support team",
      contact: "+971 4 XXX XXXX",
      responseTime: "Business hours",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Available on website",
      responseTime: "Real-time",
    },
  ];

  return (
    <PublicPageLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-800)] to-[var(--dq-navy-950)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[12px] leading-[16px] font-medium uppercase tracking-wide text-[var(--dq-orange-500)] mb-4">
              Support & Resources
            </p>
            <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-white mb-6">
              Help Center
            </h1>
            <p className="text-[16px] leading-[24px] font-normal text-white/90 max-w-3xl mx-auto">
              Find answers to common questions and get support
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-12">Frequently Asked Questions</h2>

          <div className="max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-[var(--dq-navy-100)] rounded-[12px] overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-[var(--dq-navy-50)] hover:bg-[var(--dq-navy-100)] transition-colors"
                >
                  <span className="text-left font-semibold text-[var(--dq-navy-950)]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--dq-orange-500)] transition-transform ${
                      expandedFaq === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedFaq === faq.id && (
                  <div className="px-6 py-4 bg-white border-t border-[var(--dq-navy-100)]">
                    <p className="text-[var(--dq-navy-600)] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-24 bg-[var(--dq-navy-50)]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-12">Get in Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-[var(--dq-orange-500)] rounded-[8px] flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--dq-navy-950)] mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-[var(--dq-navy-600)] mb-4">
                    {method.description}
                  </p>
                  <p className="text-sm font-semibold text-[var(--dq-orange-500)] mb-2">
                    {method.contact}
                  </p>
                  <p className="text-xs text-[var(--dq-navy-500)]">
                    {method.responseTime}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-[var(--dq-navy-950)] mb-12">Additional Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[var(--dq-navy-50)] border border-[var(--dq-navy-100)] rounded-[12px] p-8">
              <h3 className="text-xl font-bold text-[var(--dq-navy-950)] mb-4">Documentation</h3>
              <p className="text-[var(--dq-navy-600)] mb-4">
                Access comprehensive guides and documentation for all our courses and features.
              </p>
              <button className="text-[var(--dq-orange-500)] hover:text-[var(--dq-orange-600)] font-semibold transition-colors">
                View Documentation →
              </button>
            </div>

            <div className="bg-[var(--dq-navy-50)] border border-[var(--dq-navy-100)] rounded-[12px] p-8">
              <h3 className="text-xl font-bold text-[var(--dq-navy-950)] mb-4">Video Tutorials</h3>
              <p className="text-[var(--dq-navy-600)] mb-4">
                Watch step-by-step video tutorials to learn how to use our platform effectively.
              </p>
              <button className="text-[var(--dq-orange-500)] hover:text-[var(--dq-orange-600)] font-semibold transition-colors">
                Watch Tutorials →
              </button>
            </div>
          </div>
        </div>
      </section>
    </PublicPageLayout>
  );
};

export default Help;
