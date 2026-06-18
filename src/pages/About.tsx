import { CheckCircle2, Target, Lightbulb, Zap } from "lucide-react";
import PublicPageLayout from "@/components/layout/PublicPageLayout";
import MarketingHero from "@/components/marketing/MarketingHero";
import MarketingSection from "@/components/marketing/MarketingSection";
import MarketingCtaBand from "@/components/marketing/MarketingCtaBand";
import SectionHeader from "@/components/marketing/SectionHeader";
import FeatureCard from "@/components/marketing/FeatureCard";

const About = () => {
  const targetAudience = [
    "Organizational leaders steering digital transformation",
    "Transformation specialists executing digital initiatives",
    "Digital workers adapting to the AI-shaped workplace",
    "Teams building Digital Cognitive Organizations",
  ];

  const journeySteps = [
    { step: "1", title: "Discovery", description: "Explore the 6XD framework and find your entry point" },
    { step: "2", title: "Core Courses", description: "Complete 7 core 6XD-aligned courses" },
    { step: "3", title: "Electives", description: "Deepen expertise with specialized courses" },
    { step: "4", title: "Certification", description: "Earn KHDA-attested credentials" },
  ];

  return (
    <PublicPageLayout>
      <MarketingHero
        eyebrowText="About DTMA"
        title={
          <>
            Closing the <span className="text-dq-orange">Capability Gap</span> in Digital Transformation
          </>
        }
        description="DTMA equips leaders, specialists, and digital workers with the skills to thrive in Economy 4.0 and build Digital Cognitive Organizations."
      />

      <MarketingSection narrow>
        <SectionHeader
          eyebrowText="A Modern Digital Academy"
          title={
            <>
              For the <span className="text-dq-orange">New Economy</span>
            </>
          }
        />
        <p className="text-lg leading-relaxed text-gray-600">
          DTMA is built to close the capability gaps that keep digital transformation efforts from
          succeeding. We serve organizational leaders, transformation specialists, and digital workers
          through structured learning, guided discovery, and the 6 Dimensions of Digital (6XD) framework.
        </p>
      </MarketingSection>

      <MarketingSection background="gray">
        <SectionHeader
          title={
            <>
              Why <span className="text-dq-orange">DTMA?</span>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Target}
            title="6XD Framework"
            description="Our learning is organized around the 6 Dimensions of Digital, turning each perspective into structured courses and clear entry points for every persona."
          />
          <FeatureCard
            icon={Lightbulb}
            title="Hybrid HI + AI Faculty"
            description="Learn from both human intelligence and artificial intelligence, combining expert instruction with AI-powered guidance throughout your journey."
          />
          <FeatureCard
            icon={Zap}
            title="Bite-Sized Learning"
            description="Podcast-style microlearning that fits your schedule. Always-available content designed for busy professionals navigating digital transformation."
          />
        </div>
      </MarketingSection>

      <MarketingSection>
        <SectionHeader
          title={
            <>
              Your Learning <span className="text-dq-orange">Journey</span>
            </>
          }
          description="From discovery to certification, DTMA guides you through a structured path aligned with your role and goals."
        />
        <div className="grid gap-6 md:grid-cols-4">
          {journeySteps.map((item) => (
            <div key={item.step}>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-dq-navy text-lg font-semibold text-white">
                {item.step}
              </div>
              <h3 className="mb-2 text-base font-semibold text-dq-navy">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection background="gray">
        <SectionHeader
          eyebrowText="Who We Serve"
          title={
            <>
              Built for Three <span className="text-dq-orange">Core Audiences</span>
            </>
          }
        />
        <div className="grid max-w-3xl gap-4 md:grid-cols-2">
          {targetAudience.map((audience) => (
            <div
              key={audience}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-card"
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-dq-orange" strokeWidth={1.5} />
              <p className="text-[15px] leading-relaxed text-dq-navy">{audience}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection narrow>
        <img src="/KHDA.png" alt="KHDA" className="mb-6 h-16 w-auto" />
        <SectionHeader
          title={
            <>
              KHDA-Attested <span className="text-dq-orange">Credentials</span>
            </>
          }
        />
        <p className="text-lg leading-relaxed text-gray-600">
          All DTMA courses award credentials recognized across the UAE and internationally, backed by
          the Knowledge and Human Development Authority (KHDA) in Dubai.
        </p>
      </MarketingSection>

      <MarketingCtaBand
        title="Ready to Close Your Capability Gap?"
        description="Join leaders, specialists, and digital workers building the skills to thrive in Economy 4.0."
        primaryCta={{ label: "Explore Courses", href: "/courses" }}
        secondaryCta={{ label: "Learn More", href: "/" }}
      />
    </PublicPageLayout>
  );
};

export default About;
