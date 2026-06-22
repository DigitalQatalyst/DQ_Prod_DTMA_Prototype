import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Target,
  Flame,
  Zap,
  Award,
  Crown,
  Star,
  CheckCircle,
  Lock,
} from 'lucide-react';
import {
  learnerBadge,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerCaption,
  learnerItemTitle,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerLink,
  learnerPanel,
  learnerSectionHeading,
  microLabel,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

const TOTAL_POINTS = 2450;
const CURRENT_LEVEL = 'Gold';
const NEXT_LEVEL = 'Platinum';
const POINTS_TO_NEXT = 3000 - TOTAL_POINTS;

export const GamificationFeatures = () => {
  const dailyChallenges = [
    {
      id: '1',
      title: 'Complete 2 Lessons',
      description: 'Finish any 2 lessons today',
      progress: 1,
      total: 2,
      points: 50,
      completed: false,
      icon: Target,
    },
    {
      id: '2',
      title: 'Score 80% on a Quiz',
      description: 'Achieve 80% or higher on any quiz',
      progress: 0,
      total: 1,
      points: 75,
      completed: false,
      icon: Award,
    },
    {
      id: '3',
      title: 'Help a Peer',
      description: 'Answer a question in the forum',
      progress: 1,
      total: 1,
      points: 30,
      completed: true,
      icon: CheckCircle,
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Ahmed Al-Mansoori', avatar: null, points: 2850, isCurrentUser: false },
    { rank: 2, name: 'Sarah Johnson', avatar: null, points: 2720, isCurrentUser: false },
    { rank: 3, name: 'Mohammed Hassan', avatar: null, points: 2650, isCurrentUser: false },
    { rank: 4, name: 'Fatima Al-Zaabi', avatar: null, points: 2580, isCurrentUser: false },
    { rank: 5, name: 'You', avatar: null, points: 2450, isCurrentUser: true },
  ];

  const microlearningPaths = [
    {
      id: '1',
      title: 'Digital Economy Essentials',
      description: '5-minute daily lessons on digital economy',
      progress: 12,
      total: 30,
      daysCompleted: 12,
      streak: 7,
      locked: false,
      href: '/courses/course-economy-40/learn',
    },
    {
      id: '2',
      title: 'AI Quick Bites',
      description: 'Daily AI concepts in 5 minutes',
      progress: 8,
      total: 30,
      daysCompleted: 8,
      streak: 5,
      locked: false,
      href: '/courses/course-cognitive-org/learn',
    },
    {
      id: '3',
      title: 'Leadership Moments',
      description: 'Daily leadership insights',
      progress: 0,
      total: 30,
      daysCompleted: 0,
      streak: 0,
      locked: true,
      href: '#',
    },
  ];

  const achievements = [
    { level: 'Bronze', points: 500, unlocked: true },
    { level: 'Silver', points: 1000, unlocked: true },
    { level: 'Gold', points: 2000, unlocked: true },
    { level: 'Platinum', points: 3000, unlocked: false },
    { level: 'Diamond', points: 5000, unlocked: false },
  ];

  const challengesComplete = dailyChallenges.filter((c) => c.completed).length;

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase();

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-amber-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-muted-foreground';
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return <Crown className="h-5 w-5" />;
    return <span className="text-sm font-semibold">{rank}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className={cn(learnerKpiCard, 'rounded-2xl p-4')}>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
            <Trophy className="h-4 w-4 text-dq-orange" />
          </div>
          <div className={learnerKpiValue}>2,450</div>
          <div className={learnerKpiLabel}>Total Points</div>
        </div>
        <div className={cn(learnerKpiCard, 'rounded-2xl p-4')}>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className={learnerKpiValue}>28</div>
          <div className={learnerKpiLabel}>Day Streak</div>
        </div>
        <div className={cn(learnerKpiCard, 'rounded-2xl p-4')}>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
            <Star className="h-4 w-4 text-purple-600" />
          </div>
          <div className={learnerKpiValue}>5th</div>
          <div className={learnerKpiLabel}>Rank</div>
        </div>
        <div className={cn(learnerKpiCard, 'rounded-2xl p-4')}>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10">
            <Award className="h-4 w-4 text-green-500" />
          </div>
          <div className={learnerKpiValue}>12</div>
          <div className={learnerKpiLabel}>Badges</div>
        </div>
      </div>

      <section
        className={cn(
          learnerPanel,
          'rounded-2xl border-orange-100/60 bg-gradient-to-r from-orange-50/70 via-white to-white p-4 lg:p-5',
        )}
        aria-label="Today's microlearning momentum"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={microLabel}>Today&apos;s momentum</p>
            <p className="mt-1 text-sm font-medium text-dq-navy">
              {challengesComplete} of {dailyChallenges.length} daily challenges complete ·{' '}
              <span className="text-dq-orange">{CURRENT_LEVEL}</span> achievement level
            </p>
          </div>
          <div className="min-w-[200px] sm:max-w-xs sm:flex-1">
            <div className="mb-1 flex justify-between text-xs">
              <span className={learnerCaption}>Progress to {NEXT_LEVEL}</span>
              <span className="font-medium text-dq-navy">{POINTS_TO_NEXT} pts left</span>
            </div>
            <Progress value={(TOTAL_POINTS / 3000) * 100} className="h-1.5" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <section className={cn(learnerPanel, 'rounded-2xl p-5 lg:p-6')} aria-labelledby="daily-challenges-heading">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <h2 id="daily-challenges-heading" className={cn(learnerSectionHeading, 'flex items-center gap-2')}>
                <Target className="h-5 w-5 text-dq-orange" aria-hidden />
                Daily Challenges
              </h2>
              <Badge className={cn('border border-gray-200 bg-gray-100 text-dq-navy', learnerBadge)}>
                Resets in 8h
              </Badge>
            </div>

            <div className="space-y-3">
              {dailyChallenges.map((challenge) => {
                const Icon = challenge.icon;
                return (
                  <div
                    key={challenge.id}
                    className={cn(
                      'rounded-xl border p-4',
                      challenge.completed
                        ? 'border-green-200 bg-green-50/80'
                        : 'border-gray-200 bg-white',
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                          challenge.completed
                            ? 'bg-green-500 text-white'
                            : 'bg-orange-50 text-dq-orange',
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <h3 className={learnerItemTitle}>{challenge.title}</h3>
                            <p className={learnerBodyMuted}>{challenge.description}</p>
                          </div>
                          <Badge className={cn('shrink-0 bg-dq-orange text-white', learnerBadge)}>
                            +{challenge.points} pts
                          </Badge>
                        </div>
                        {!challenge.completed && (
                          <div className="mt-3">
                            <div className={cn(learnerCaption, 'mb-1.5 flex items-center justify-between')}>
                              <span>Progress</span>
                              <span className="font-medium text-dq-navy">
                                {challenge.progress}/{challenge.total}
                              </span>
                            </div>
                            <Progress
                              value={(challenge.progress / challenge.total) * 100}
                              className="h-1.5"
                            />
                          </div>
                        )}
                        {challenge.completed && (
                          <div className="mt-2 flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" aria-hidden />
                            <span className="text-sm font-medium">Completed!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className={cn(learnerPanel, 'rounded-2xl p-5 lg:p-6')} aria-labelledby="paths-heading">
            <h2
              id="paths-heading"
              className={cn(learnerSectionHeading, 'mb-5 flex items-center gap-2 border-b border-gray-100 pb-4')}
            >
              <Zap className="h-5 w-5 text-dq-orange" aria-hidden />
              Microlearning Paths
            </h2>

            <div className="space-y-3">
              {microlearningPaths.map((path) => (
                <article
                  key={path.id}
                  className={cn(
                    'rounded-xl border p-4',
                    path.locked ? 'border-gray-200 bg-gray-50' : 'border-gray-200 bg-white',
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                        path.locked ? 'bg-gray-200 text-gray-600' : 'bg-orange-50 text-dq-orange',
                      )}
                    >
                      {path.locked ? <Lock className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={cn(learnerItemTitle, 'mb-1', path.locked && 'text-gray-700')}>
                        {path.title}
                      </h3>
                      <p className={cn(learnerBodyMuted, 'mb-3', path.locked && 'text-gray-600')}>
                        {path.description}
                      </p>
                      {!path.locked && (
                        <>
                          <div className={cn(learnerCaption, 'mb-3 flex flex-wrap items-center gap-x-4 gap-y-1')}>
                            <span className="inline-flex items-center gap-1">
                              <Flame className="h-4 w-4 text-amber-500" />
                              {path.streak} day streak
                            </span>
                            <span>
                              {path.daysCompleted}/{path.total} days
                            </span>
                          </div>
                          <Progress value={(path.progress / path.total) * 100} className="mb-4 h-1.5" />
                          <Link to={path.href}>
                            <Button size="sm" className={learnerBtnPrimary}>
                              Continue Path
                            </Button>
                          </Link>
                        </>
                      )}
                      {path.locked && (
                        <p className={learnerBodyMuted}>Complete previous paths to unlock</p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <section className={cn(learnerPanel, 'rounded-2xl p-5')} aria-labelledby="leaderboard-heading">
            <h2
              id="leaderboard-heading"
              className={cn(learnerSectionHeading, 'mb-4 flex items-center gap-2 border-b border-gray-100 pb-3')}
            >
              <Trophy className="h-5 w-5 text-dq-orange" aria-hidden />
              Leaderboard
            </h2>
            <ul className="space-y-2">
              {leaderboard.map((user) => (
                <li
                  key={user.rank}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border p-3',
                    user.isCurrentUser
                      ? 'border-dq-orange/40 bg-orange-50/60'
                      : 'border-gray-200 bg-white',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center',
                      getRankColor(user.rank),
                    )}
                  >
                    {getRankIcon(user.rank)}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback className={cn(learnerCaption, 'bg-gray-100 font-medium text-dq-navy')}>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-dq-navy">{user.name}</p>
                    <p className={learnerCaption}>{user.points} points</p>
                  </div>
                  {user.rank <= 3 && (
                    <Trophy className={cn('h-5 w-5 shrink-0', getRankColor(user.rank))} aria-hidden />
                  )}
                </li>
              ))}
            </ul>
            <button type="button" className={cn(learnerLink, 'mt-4 block w-full text-center text-sm')}>
              View Full Leaderboard
            </button>
          </section>

          <section className={cn(learnerPanel, 'rounded-2xl p-5')} aria-labelledby="achievement-heading">
            <div className="mb-4 flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <h2 id="achievement-heading" className={learnerSectionHeading}>
                Achievement Level
              </h2>
              <Badge className={cn('border-orange-200 bg-orange-50 text-dq-orange', learnerBadge)}>
                {CURRENT_LEVEL}
              </Badge>
            </div>
            <ol className="space-y-0">
              {achievements.map((achievement, index) => (
                <li key={achievement.level} className="relative">
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-xl border p-3',
                      achievement.unlocked
                        ? 'border-dq-orange/25 bg-orange-50/50'
                        : 'border-gray-200 bg-gray-50',
                      achievement.level === CURRENT_LEVEL && 'ring-1 ring-dq-orange/30',
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                        achievement.unlocked ? 'bg-white text-dq-orange' : 'bg-gray-200 text-gray-600',
                      )}
                    >
                      {achievement.unlocked ? (
                        <Award className="h-4 w-4" />
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={cn(learnerItemTitle, 'text-sm', !achievement.unlocked && 'text-gray-700')}>
                        {achievement.level}
                      </p>
                      <p className={cn(learnerCaption, !achievement.unlocked && 'text-gray-600')}>
                        {achievement.points} points
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="h-4 w-4 shrink-0 text-dq-orange" aria-hidden />
                    )}
                  </div>
                  {index < achievements.length - 1 && (
                    <div
                      className={cn(
                        'mx-auto h-2 w-px',
                        achievement.unlocked ? 'bg-dq-orange/40' : 'bg-gray-300',
                      )}
                      aria-hidden
                    />
                  )}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};
