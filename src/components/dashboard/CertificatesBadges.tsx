import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  Download, 
  Share2,
  ExternalLink
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
    { id: '1', name: 'Fast Learner', icon: '⚡', description: 'Completed 5 courses in 30 days' },
    { id: '2', name: 'Perfect Score', icon: '💯', description: 'Achieved 100% on 3 quizzes' },
    { id: '3', name: 'Consistent', icon: '🔥', description: '30-day learning streak' },
    { id: '4', name: 'Collaborator', icon: '🤝', description: 'Helped 10 peers in forums' },
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
            {badges.map((badge) => (
              <Card key={badge.id} className="p-6 text-center hover:shadow-lg transition-shadow border border-border">
                <div className="text-5xl mb-3">{badge.icon}</div>
                <h3 className="font-semibold mb-2" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>
                  {badge.name}
                </h3>
                <p className="text-sm text-muted-foreground" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
                  {badge.description}
                </p>
              </Card>
            ))}
          </div>

          <Card className="p-6 border border-border">
            <h3 className="font-semibold mb-4" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
              Badge Progress
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🎯</div>
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
                    <div className="w-3/5 h-full bg-green-600 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📚</div>
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
                    <div className="w-1/2 h-full bg-green-600 rounded-full" />
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
