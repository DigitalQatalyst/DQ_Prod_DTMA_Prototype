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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2" style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 600, color: 'var(--dq-text-primary)' }}>
          Certificates & Badges
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400, color: 'var(--dq-text-secondary)' }}>
          View your earned certificates and achievement badges
        </p>
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
              <Card key={cert.id} className="overflow-hidden border" style={{ borderColor: 'var(--dq-surface-border-default)' }}>
                <div className="bg-gradient-to-r from-[var(--dq-navy-900)] to-[var(--dq-navy-800)] p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-[var(--dq-text-on-dark-secondary)] text-sm mb-1" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500 }}>
                        KHDA-Attested Certificate
                      </p>
                      <h3 className="font-semibold text-lg text-white" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>
                        {cert.title}
                      </h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6" style={{ backgroundColor: 'var(--dq-surface-background)' }}>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm mb-1" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: 'var(--dq-text-secondary)' }}>
                        Issue Date
                      </p>
                      <p className="font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500, color: 'var(--dq-text-primary)' }}>
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm mb-1" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: 'var(--dq-text-secondary)' }}>
                        Certificate ID
                      </p>
                      <p className="font-medium font-mono text-sm" style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500, color: 'var(--dq-text-primary)' }}>
                        {cert.certificateNumber}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1 text-white" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500, backgroundColor: 'var(--dq-orange-500)' }}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="hover:text-white" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500, borderColor: 'var(--dq-surface-border-default)', color: 'var(--dq-text-primary)' }}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="icon" style={{ borderColor: 'var(--dq-surface-border-default)', color: 'var(--dq-text-primary)' }}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {certificates.length === 0 && (
            <Card className="p-12 text-center border" style={{ borderColor: 'var(--dq-surface-border-default)', backgroundColor: 'var(--dq-surface-background)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--dq-navy-50)' }}>
                <Award className="w-8 h-8" style={{ color: 'var(--dq-text-secondary)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600, color: 'var(--dq-text-primary)' }}>
                No Certificates Yet
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: 'var(--dq-text-secondary)' }}>
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
                <Card key={badge.id} className="p-6 text-center hover:shadow-lg transition-shadow border" style={{ borderColor: 'var(--dq-surface-border-default)', backgroundColor: 'var(--dq-surface-background)' }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'var(--dq-orange-50)' }}>
                    <IconComponent className="w-6 h-6" style={{ color: 'var(--dq-orange-500)' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'var(--dq-text-primary)' }}>
                    {badge.name}
                  </h3>
                  <p className="text-sm" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: 'var(--dq-text-secondary)' }}>
                    {badge.description}
                  </p>
                </Card>
              );
            })}
          </div>

          <Card className="p-6 border" style={{ borderColor: 'var(--dq-surface-border-default)', backgroundColor: 'var(--dq-surface-background)' }}>
            <h3 className="font-semibold mb-4" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 600, color: 'var(--dq-text-primary)' }}>
              Badge Progress
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--dq-orange-50)' }}>
                    <Target className="w-5 h-5" style={{ color: 'var(--dq-orange-500)' }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'var(--dq-text-primary)' }}>
                      Goal Crusher
                    </p>
                    <p className="text-sm" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: 'var(--dq-text-secondary)' }}>
                      Complete 10 courses
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 600, color: 'var(--dq-text-primary)' }}>
                    6/10
                  </p>
                  <div className="w-24 h-2 rounded-full mt-1" style={{ backgroundColor: 'var(--dq-surface-border-subtle)' }}>
                    <div className="w-3/5 h-full rounded-full" style={{ backgroundColor: 'var(--dq-success)' }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--dq-orange-50)' }}>
                    <BookOpen className="w-5 h-5" style={{ color: 'var(--dq-orange-500)' }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600, color: 'var(--dq-text-primary)' }}>
                      Knowledge Seeker
                    </p>
                    <p className="text-sm" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: 'var(--dq-text-secondary)' }}>
                      Complete 50 lessons
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 600, color: 'var(--dq-text-primary)' }}>
                    24/50
                  </p>
                  <div className="w-24 h-2 rounded-full mt-1" style={{ backgroundColor: 'var(--dq-surface-border-subtle)' }}>
                    <div className="w-1/2 h-full rounded-full" style={{ backgroundColor: 'var(--dq-success)' }} />
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
