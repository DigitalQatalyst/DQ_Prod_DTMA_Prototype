import { ChevronDown, Search, MessageCircle, Mail, Phone } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#f5f4f0] pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-4">
            Support & Resources
          </p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold text-[#0a0f1e] mb-6 max-w-2xl">
            Help <span className="text-[#ff4500]">Center</span>
          </h1>
          <p className="text-[17px] text-[#4a4a5a] max-w-xl">
            Find answers to common questions and get support
          </p>
        </div>
      </section>

      <main>
        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-3">
              FAQs
            </p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-[#0a0f1e] mb-12">
              Frequently Asked Questions
            </h2>

            <div className="max-w-3xl space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white border border-[#e8e8ec] rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#f5f4f0] transition-colors"
                  >
                    <span className="text-left font-semibold text-[#0a0f1e]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#ff4500] flex-shrink-0 ml-4 transition-transform ${
                        expandedFaq === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedFaq === faq.id && (
                    <div className="px-6 py-4 bg-white border-t border-[#e8e8ec]">
                      <p className="text-[#4a4a5a] leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-[#050d1e]" style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)' }}>
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-3">
              Contact
            </p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-white mb-12">
              Get in Touch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
                  >
                    <div className="w-12 h-12 bg-[#ff4500] rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">
                      {method.description}
                    </p>
                    <p className="text-sm font-semibold text-[#ff4500] mb-2">
                      {method.contact}
                    </p>
                    <p className="text-xs text-white/40">
                      {method.responseTime}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff4500] mb-3">
              Resources
            </p>
            <h2 className="text-[36px] md:text-[44px] leading-[1.1] font-bold text-[#0a0f1e] mb-12">
              Additional Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all">
                <h3 className="text-xl font-bold text-[#0a0f1e] mb-4">Documentation</h3>
                <p className="text-[#4a4a5a] mb-4">
                  Access comprehensive guides and documentation for all our courses and features.
                </p>
                <button className="text-[#ff4500] hover:text-[#cc3700] font-semibold transition-colors">
                  View Documentation →
                </button>
              </div>

              <div className="bg-white border border-[#e8e8ec] rounded-xl p-6 hover:shadow-md transition-all">
                <h3 className="text-xl font-bold text-[#0a0f1e] mb-4">Video Tutorials</h3>
                <p className="text-[#4a4a5a] mb-4">
                  Watch step-by-step video tutorials to learn how to use our platform effectively.
                </p>
                <button className="text-[#ff4500] hover:text-[#cc3700] font-semibold transition-colors">
                  Watch Tutorials →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
