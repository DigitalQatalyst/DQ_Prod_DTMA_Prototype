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
      image: "bg-gradient-to-br from-[#ff4500] to-[#cc3700]",
    },
    {
      id: 2,
      title: "Mastering the 6XD Framework",
      excerpt: "Learn how the 6XD framework helps organizations navigate complexity and drive sustainable growth in the digital age.",
      date: "May 1, 2026",
      author: "DTMA Team",
      category: "Framework",
      image: "bg-gradient-to-br from-[#0a0f1e] to-[#1a2540]",
    },
    {
      id: 3,
      title: "Building High-Performance Digital Teams",
      excerpt: "Discover best practices for assembling and managing teams that excel in digital-first environments.",
      date: "April 24, 2026",
      author: "DTMA Team",
      category: "Leadership",
      image: "bg-gradient-to-br from-[#1a6b6b] to-[#0d4444]",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#f5f4f0] pt-28 pb-20 px-8 md:px-12 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">
            Resources & Insights
          </p>
          <h1 className="text-[52px] md:text-[68px] leading-[1.05] font-bold tracking-tight text-[#0a0f1e] mb-5 max-w-3xl">
            Blog & <span className="text-[#ff4500]">Insights</span>
          </h1>
          <p className="text-[17px] leading-[1.6] text-[#4a4a5a] max-w-2xl">
            Stay updated with the latest insights, trends, and best practices in digital transformation and leadership.
          </p>
        </div>
      </section>

      <main>
        {/* Blog Posts Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-[#e8e8ec] rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  {/* Featured Image */}
                  <div className={`h-48 ${post.image}`} />

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-[18px] font-bold text-[#0a0f1e] mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-[14px] leading-[1.6] text-[#4a4a5a] mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-[12px] text-[#9a9aaa] mb-4 pb-4 border-b border-[#e8e8ec]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </div>
                    </div>

                    {/* Read More */}
                    <button className="text-[13px] font-semibold text-[#ff4500] hover:text-[#cc3700] flex items-center gap-2 transition-colors">
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
        <section className="py-20 bg-[#050d1e] relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255, 69, 0, 0.2) 0%, transparent 70%)' }}
          />
          <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center relative z-10">
            <p className="text-[11px] font-semibold text-[#ff4500] uppercase tracking-widest mb-4">Stay in the Loop</p>
            <h2 className="text-[40px] md:text-[52px] leading-[1.1] font-bold text-white mb-4 max-w-2xl mx-auto">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-[16px] text-white/50 mb-8">
              Get the latest insights and updates delivered to your inbox.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ff4500]"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#ff4500] hover:bg-[#cc3700] text-white text-sm font-semibold rounded-full transition-colors"
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
