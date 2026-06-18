import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Download, Share2, ExternalLink, Target, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  learnerBody,
  learnerBodyMuted,
  learnerCaption,
  learnerCardTitle,
  learnerItemTitle,
  learnerPanel,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

export const CertificatesBadges = () => {
  const [certificates, setCertificates] = useState<any[]>([]);

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
    <Tabs defaultValue="certificates" className="space-y-4">
      <TabsList className="h-9">
        <TabsTrigger value="certificates" className="text-sm">
          Certificates
        </TabsTrigger>
        <TabsTrigger value="badges" className="text-sm">
          Badges
        </TabsTrigger>
      </TabsList>

      <TabsContent value="certificates" className="space-y-4">
        {certificates.length === 0 && (
          <Card className={cn(learnerPanel, 'flex items-center gap-3 p-4')}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
              <Award className="h-5 w-5 text-dq-orange" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={learnerItemTitle}>No certificates yet</h3>
              <p className={learnerBodyMuted}>Complete a course to earn your first KHDA-attested certificate</p>
            </div>
          </Card>
        )}

        {certificates.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {certificates.map((cert) => (
              <Card key={cert.id} className={cn(learnerPanel, 'overflow-hidden')}>
                <div className="border-b border-gray-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                      <Award className="h-6 w-6 text-dq-orange" />
                    </div>
                    <div className="min-w-0">
                      <p className={learnerCaption}>KHDA-Attested Certificate</p>
                      <h3 className={cn(learnerItemTitle, 'truncate')}>{cert.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className={learnerBodyMuted}>Issue Date</p>
                      <p className="font-medium text-dq-navy">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className={learnerBodyMuted}>Certificate ID</p>
                      <p className="truncate font-mono text-xs font-medium text-dq-navy">
                        {cert.certificateNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="h-8 flex-1 text-xs">
                      <Download className="mr-1.5 h-3.5 w-3.5" />
                      Download
                    </Button>
                    <Button variant="secondary" size="sm" className="h-8 text-xs">
                      <Share2 className="mr-1.5 h-3.5 w-3.5" />
                      Share
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="badges" className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <Card key={badge.id} className={cn(learnerPanel, 'p-4 text-center')}>
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                  <IconComponent className="h-5 w-5 text-dq-orange" strokeWidth={1.5} />
                </div>
                <h3 className={cn(learnerItemTitle, 'mb-1')}>{badge.name}</h3>
                <p className="text-xs text-gray-500">{badge.description}</p>
              </Card>
            );
          })}
        </div>

        <Card className={cn(learnerPanel, 'p-4')}>
          <h3 className={cn(learnerCardTitle, 'mb-3')}>Badge Progress</h3>
          <div className="space-y-3">
            {[
              { icon: Target, title: 'Goal Crusher', body: 'Complete 10 courses', progress: '6/10', width: 'w-3/5' },
              { icon: BookOpen, title: 'Knowledge Seeker', body: 'Complete 50 lessons', progress: '24/50', width: 'w-1/2' },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                    <item.icon className="h-4 w-4 text-dq-orange" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className={learnerItemTitle}>{item.title}</p>
                    <p className="text-xs text-gray-500">{item.body}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs font-medium text-dq-navy">{item.progress}</p>
                  <div className="mt-1 h-1.5 w-20 rounded-full bg-gray-200">
                    <div className={cn('h-full rounded-full bg-green-500', item.width)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
