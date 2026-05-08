import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  Download, 
  Share2,
  ExternalLink,
  Target,
  BookOpen
} from 'lucide-react';
import { useEffect, useState } from 'react';

// DQ Design System Ribbon Icons - matching the accreditation design
const RibbonIcon1 = ({ color = "#fb5535" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4L12 10H8V20C8 22.2091 9.79086 24 12 24H20C22.2091 24 24 22.2091 24 20V10H20L16 4Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 10L10 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 10L22 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const RibbonIcon2 = ({ color = "#fb5535" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4L12 10H8V20C8 22.2091 9.79086 24 12 24H20C22.2091 24 24 22.2091 24 20V10H20L16 4Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 10L10 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 10L22 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="16" cy="17" r="2" fill={color}/>
  </svg>
);

const RibbonIcon3 = ({ color = "#fb5535" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4L12 10H8V20C8 22.2091 9.79086 24 12 24H20C22.2091 24 24 22.2091 24 20V10H20L16 4Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 10L10 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 10L22 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 16L16 18L18 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RibbonIcon4 = ({ color = "#fb5535" }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4L12 10H8V20C8 22.2091 9.79086 24 12 24H20C22.2091 24 24 22.2091 24 20V10H20L16 4Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 10L10 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 10L22 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 15L16 17L17 15M16 17V19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CertificatesBadges = () => {
  const [certificates, setCertificates] = useState<any[]>([]);

  // Load certificates from localStorage on component mount
  useEffect(() => {
    const savedCerts = JSON.parse(localStorage.getItem('user_certificates') || '[]');
    setCertificates(savedCerts);
  }, []);

  const badges = [
    { id: '1', name: 'Fast Learner', icon: Target, description: 'Completed 5 courses in 30 days' },
    { id: '2', name: 'Perfect Score', icon: Award, description: 'Achieved 100% on 3 quizzes' },
    { id: '3', name: 'Consistent', icon: Award, description: '30-day learning streak' },
    { id: '4', name: 'Collaborator', icon: BookOpen, description: 'Helped 10 peers in forums' },
  ];

  const accreditationTiers = [
    {
      tier: 'TIER 1',
      title: 'Course Certificate',
      description: 'Complete any single DTMA course with quizzes and assessments. Earn a KHDA-attested certificate for that specific dimension.',
      icon: RibbonIcon1,
    },
    {
      tier: 'TIER 2',
      title: 'Foundation Credential',
      description: 'Complete all seven courses, including foundational and 6xD dimensions, to demonstrate full mastery of the Digital Cognitive Organization framework.',
      icon: RibbonIcon2,
    },
    {
      tier: 'TIER 3',
      title: 'Practitioner Credential',
      description: 'Complete core courses and specialized electives to demonstrate ability to design, execute, and deliver measurable transformation outcomes.',
      icon: RibbonIcon3,
    },
    {
      tier: 'TIER 4',
      title: 'Expert Credential',
      description: 'Master the 6xD framework through core courses, electives, and advanced assessments, earning the highest certification for transformation leaders.',
      icon: RibbonIcon4,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2" style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600 }}>
          Certificates & Badges
        </h2>
        <p className="text-muted-foreground" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}>
          View your earned certificates and achievement badges
        </p>
      </div>

      {/* Accreditation & Credentials Section */}
      <div className="bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-800)] to-[var(--dq-navy-950)] rounded-xl p-8 text-white">
        <div className="text-center mb-8">
          <p className="text-[12px] leading-[16px] font-semibold text-[var(--dq-orange-500)] uppercase tracking-widest mb-2">
            Accreditation & Credentials
          </p>
          <h2 className="text-[36px] leading-[44px] font-semibold mb-4 text-white">KHDA Accredited</h2>
          <p className="text-[16px] leading-[24px] text-[var(--dq-text-on-dark-secondary)] max-w-lg mx-auto">
            All credentials are KHDA-attested and recognized across the UAE and internationally.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {accreditationTiers.map((tier, idx) => {
            const IconComponent = tier.icon;
            return (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-[var(--dq-navy-950)]/30 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-[var(--dq-navy-700)]">
                  <IconComponent color="var(--dq-orange-500)" />
                </div>
                <p className="text-[12px] leading-[16px] font-semibold text-[var(--dq-orange-500)] uppercase tracking-widest mb-2">
                  {tier.tier}
                </p>
                <h3 className="text-[18px] leading-[26px] font-semibold mb-3 text-white">{tier.title}</h3>
                <p className="text-[14px] leading-[20px] text-[var(--dq-text-on-dark-secondary)]">{tier.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <Tabs defaultValue="certificates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden border border-border">
                <div className="bg-gradient-to-r from-[#1e2348] to-[#2a3058] p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm mb-1" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                        KHDA-Attested Certificate
                      </p>
                      <h3 className="font-semibold text-lg" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
                        {cert.title}
                      </h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                        Issue Date
                      </p>
                      <p className="font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                        Certificate ID
                      </p>
                      <p className="font-medium font-mono text-sm" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                        {cert.certificateNumber}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-[#ff6b4d] hover:bg-[#e56045] text-white" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {certificates.length === 0 && (
            <Card className="p-12 text-center border border-border">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
                No Certificates Yet
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                Complete courses to earn KHDA-attested certificates
              </p>
            </Card>
          )}
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <Card key={badge.id} className="p-6 text-center hover:shadow-lg transition-shadow border border-border">
                  <div className="w-12 h-12 bg-[var(--dq-orange-50)] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-[var(--dq-orange-500)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
                    {badge.name}
                  </h3>
                  <p className="text-sm text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                    {badge.description}
                  </p>
                </Card>
              );
            })}
          </div>

          <Card className="p-6 border border-border">
            <h3 className="font-semibold mb-4" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
              Badge Progress
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--dq-orange-50)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-[var(--dq-orange-500)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
                      Goal Crusher
                    </p>
                    <p className="text-sm text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      Complete 10 courses
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                    6/10
                  </p>
                  <div className="w-24 h-2 bg-white rounded-full mt-1 border border-border">
                    <div className="w-3/5 h-full bg-[var(--dq-success)] rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--dq-orange-50)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-[var(--dq-orange-500)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
                      Knowledge Seeker
                    </p>
                    <p className="text-sm text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                      Complete 50 lessons
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
                    24/50
                  </p>
                  <div className="w-24 h-2 bg-white rounded-full mt-1 border border-border">
                    <div className="w-1/2 h-full bg-[var(--dq-success)] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
