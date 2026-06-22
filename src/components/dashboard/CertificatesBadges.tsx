import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Download, Share2, ExternalLink, Target, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  learnerBodyMuted,
  learnerCaption,
  learnerCardTitle,
  learnerItemTitle,
  learnerPanel,
  learnerBtnPrimary,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

export const CertificatesBadges = () => {
  const [certificates, setCertificates] = useState<
    Array<{
      id: string;
      title: string;
      issueDate: string;
      certificateNumber: string;
    }>
  >([]);

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
    <Tabs defaultValue="certificates" className="space-y-6">
      <TabsList className="inline-flex h-auto gap-1 rounded-lg bg-gray-100 p-1">
        <TabsTrigger
          value="certificates"
          className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Certificates
        </TabsTrigger>
        <TabsTrigger
          value="badges"
          className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Badges
        </TabsTrigger>
      </TabsList>

      <TabsContent value="certificates" className="mt-0 space-y-4">
        {certificates.length === 0 && (
          <div className={cn(learnerPanel, 'flex items-center gap-4 p-6')}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50">
              <Award className="h-6 w-6 text-dq-orange" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={cn(learnerItemTitle, 'mb-1')}>No certificates yet</h3>
              <p className={learnerBodyMuted}>
                Complete a course to earn your first KHDA-attested certificate
              </p>
            </div>
          </div>
        )}

        {certificates.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {certificates.map((cert) => (
              <article key={cert.id} className={cn(learnerPanel, 'flex flex-col overflow-hidden')}>
                <div className="border-b border-gray-100 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                      <Award className="h-6 w-6 text-dq-orange" />
                    </div>
                    <div className="min-w-0">
                      <p className={cn(learnerCaption, 'mb-0.5')}>KHDA-Attested Certificate</p>
                      <h3 className={cn(learnerItemTitle, 'truncate')}>{cert.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <dl className="mb-5 grid grid-cols-2 gap-4 border-b border-gray-100 pb-5">
                    <div>
                      <dt className={learnerBodyMuted}>Issue Date</dt>
                      <dd className="mt-1 text-sm font-medium text-dq-navy">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </dd>
                    </div>
                    <div>
                      <dt className={learnerBodyMuted}>Certificate ID</dt>
                      <dd className="mt-1 truncate font-mono text-xs font-medium text-dq-navy">
                        {cert.certificateNumber}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    <Button className={cn(learnerBtnPrimary, 'flex-1 sm:flex-none')}>
                      <Download className="mr-1.5 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full border-gray-200 sm:flex-none"
                    >
                      <Share2 className="mr-1.5 h-4 w-4" />
                      Share
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 shrink-0 text-gray-500 hover:text-dq-navy"
                      aria-label="Open certificate"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="badges" className="mt-0 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div key={badge.id} className={cn(learnerPanel, 'p-5 text-center')}>
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50">
                  <IconComponent className="h-5 w-5 text-dq-orange" strokeWidth={1.5} />
                </div>
                <h3 className={cn(learnerItemTitle, 'mb-1')}>{badge.name}</h3>
                <p className={learnerBodyMuted}>{badge.description}</p>
              </div>
            );
          })}
        </div>

        <div className={cn(learnerPanel, 'p-5 lg:p-6')}>
          <h3 className={cn(learnerCardTitle, 'mb-5')}>Badge Progress</h3>
          <div className="space-y-5">
            {[
              { icon: Target, title: 'Goal Crusher', body: 'Complete 10 courses', current: 6, total: 10 },
              { icon: BookOpen, title: 'Knowledge Seeker', body: 'Complete 50 lessons', current: 24, total: 50 },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                  <item.icon className="h-4 w-4 text-dq-orange" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className={learnerItemTitle}>{item.title}</p>
                    <span className="text-xs font-medium text-dq-navy">
                      {item.current}/{item.total}
                    </span>
                  </div>
                  <p className={cn(learnerBodyMuted, 'mb-2')}>{item.body}</p>
                  <Progress value={(item.current / item.total) * 100} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
