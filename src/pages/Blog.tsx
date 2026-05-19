import { ArrowRight, Calendar, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Digital Transformation",
      excerpt: "Explore how organizations are adapting to the digital economy and the skills needed to lead transformation initiatives.",
      date: "May 8, 2026",
      author: "DTMA Team",
      category: "Digital Transformation",
      image: "bg-gradient-to-br from-[var(--dq-orange-500)] to-[var(--dq-orange-600)]",
    },
    {
      id: 2,
      title: "Mastering the 6XD Framework",
      excerpt: "Learn how the 6XD framework helps organizations navigate complexity and drive sustainable growth in the digital age.",
      date: "May 1, 2026",
      author: "DTMA Team",
      category: "Framework",
      image: "bg-gradient-to-br from-[var(--dq-navy-600)] to-[var(--dq-navy-700)]",
    },
    {
      id: 3,
      title: "Building High-Performance Digital Teams",
      excerpt: "Discover best practices for assembling and managing teams that excel in digital-first environments.",
      date: "April 24, 2026",
      author: "DTMA Team",
      category: "Leadership",
      image: "bg-gradient-to-br from-[var(--dq-teal-500)] to-[var(--dq-teal-600)]",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[var(--dq-navy-950)]">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[12px] leading-[16px] font-semibold uppercase tracking-wide text-[var(--dq-orange-500)] mb-6">
                Resources & Insights
              </p>
              <h1 className="text-[40px] leading-[48px] font-semibold text-white mb-6">
                Blog & Insights
              </h1>
              <p className="text-[18px] leading-[28px] font-normal text-white/90 max-w-3xl mx-auto">
                Stay updated with the latest insights, trends, and best practices in digital transformation and leadership.
              </p>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* Blog Posts Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-[var(--dq-navy-100)] rounded-[12px] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Featured Image */}
                  <div className={`h-48 ${post.image}`} />

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-[var(--dq-orange-500)] uppercase tracking-wide">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[var(--dq-navy-950)] mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[var(--dq-navy-600)] mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-[var(--dq-navy-500)] mb-4 pb-4 border-b border-[var(--dq-navy-100)]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>

                    {/* Read More */}
                    <button className="text-sm font-semibold text-[var(--dq-orange-500)] hover:text-[var(--dq-orange-600)] flex items-center gap-2 transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 lg:py-24 bg-[var(--dq-navy-50)]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-16 text-center">
            <h2 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-semibold text-[var(--dq-navy-950)] mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-[16px] leading-[24px] font-normal text-[var(--dq-navy-600)] mb-8 max-w-2xl mx-auto">
              Get the latest insights and updates delivered to your inbox.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-[8px] border border-[var(--dq-navy-200)] focus:outline-none focus:border-[var(--dq-orange-500)]"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white font-semibold rounded-[8px] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
