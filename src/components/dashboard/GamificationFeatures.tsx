import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Target, 
  Flame, 
  Zap,
  Award,
  TrendingUp,
  Crown,
  Star,
  CheckCircle,
  Lock
} from 'lucide-react';
import {
  btnPrimary,
  learnerBadge,
  learnerBody,
  learnerBodyMuted,
  learnerCaption,
  learnerItemTitle,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerPanel,
  learnerSectionHeading,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

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
      icon: Target
    },
    {
      id: '2',
      title: 'Score 80% on a Quiz',
      description: 'Achieve 80% or higher on any quiz',
      progress: 0,
      total: 1,
      points: 75,
      completed: false,
      icon: Award
    },
    {
      id: '3',
      title: 'Help a Peer',
      description: 'Answer a question in the forum',
      progress: 1,
      total: 1,
      points: 30,
      completed: true,
      icon: CheckCircle
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      name: 'Ahmed Al-Mansoori',
      avatar: null,
      points: 2850,
      courses: 8,
      streak: 45,
      isCurrentUser: false
    },
    {
      rank: 2,
      name: 'Sarah Johnson',
      avatar: null,
      points: 2720,
      courses: 7,
      streak: 38,
      isCurrentUser: false
    },
    {
      rank: 3,
      name: 'Mohammed Hassan',
      avatar: null,
      points: 2650,
      courses: 6,
      streak: 42,
      isCurrentUser: false
    },
    {
      rank: 4,
      name: 'Fatima Al-Zaabi',
      avatar: null,
      points: 2580,
      courses: 7,
      streak: 35,
      isCurrentUser: false
    },
    {
      rank: 5,
      name: 'You',
      avatar: null,
      points: 2450,
      courses: 6,
      streak: 28,
      isCurrentUser: true
    },
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
      locked: false
    },
    {
      id: '2',
      title: 'AI Quick Bites',
      description: 'Daily AI concepts in 5 minutes',
      progress: 8,
      total: 30,
      daysCompleted: 8,
      streak: 5,
      locked: false
    },
    {
      id: '3',
      title: 'Leadership Moments',
      description: 'Daily leadership insights',
      progress: 0,
      total: 30,
      daysCompleted: 0,
      streak: 0,
      locked: true
    },
  ];

  const achievements = [
    { level: 'Bronze', points: 500, unlocked: true },
    { level: 'Silver', points: 1000, unlocked: true },
    { level: 'Gold', points: 2000, unlocked: true },
    { level: 'Platinum', points: 3000, unlocked: false },
    { level: 'Diamond', points: 5000, unlocked: false },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-amber-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-muted-foreground';
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return <Crown className="w-5 h-5" />;
    return <span className="font-semibold">{rank}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className={learnerKpiCard}>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
              <Trophy className="h-5 w-5 text-dq-orange" />
            </div>
          </div>
          <div className={learnerKpiValue}>2,450</div>
          <div className={learnerKpiLabel}>Total Points</div>
        </Card>

        <Card className={learnerKpiCard}>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <Flame className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <div className={learnerKpiValue}>28</div>
          <div className={learnerKpiLabel}>Day Streak</div>
        </Card>

        <Card className={learnerKpiCard}>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <Star className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className={learnerKpiValue}>5th</div>
          <div className={learnerKpiLabel}>Rank</div>
        </Card>

        <Card className={learnerKpiCard}>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
              <Award className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <div className={learnerKpiValue}>12</div>
          <div className={learnerKpiLabel}>Badges</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Challenges */}
        <div className="lg:col-span-2 space-y-6">
          <Card className={cn(learnerPanel, 'p-6')}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className={cn(learnerSectionHeading, 'flex items-center gap-2')}>
                <Target className="h-5 w-5 text-dq-orange" />
                Daily Challenges
              </h3>
              <Badge className={cn('border border-gray-200 bg-gray-100 text-dq-navy', learnerBadge)}>
                Resets in 8h
              </Badge>
            </div>

            <div className="space-y-4">
              {dailyChallenges.map((challenge) => {
                const Icon = challenge.icon;
                return (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-lg border-2 ${
                      challenge.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        challenge.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-50 text-dq-orange'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className={learnerItemTitle}>{challenge.title}</h4>
                            <p className={learnerBodyMuted}>{challenge.description}</p>
                          </div>
                          <Badge className={cn('bg-dq-orange text-white', learnerBadge)}>
                            +{challenge.points} pts
                          </Badge>
                        </div>

                        {!challenge.completed && (
                          <div className="mt-3">
                            <div className={cn(learnerBodyMuted, 'mb-2 flex items-center justify-between')}>
                              <span>Progress</span>
                              <span className="font-medium text-dq-navy">{challenge.progress}/{challenge.total}</span>
                            </div>
                            <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                          </div>
                        )}

                        {challenge.completed && (
                          <div className="flex items-center gap-2 text-green-600 mt-2">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Completed!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Microlearning Paths */}
          <Card className={cn(learnerPanel, 'p-6')}>
            <h3 className={cn(learnerSectionHeading, 'mb-6 flex items-center gap-2')}>
              <Zap className="h-5 w-5 text-dq-orange" />
              Microlearning Paths
            </h3>

            <div className="space-y-4">
              {microlearningPaths.map((path) => (
                <div
                  key={path.id}
                  className={`p-4 rounded-lg border ${
                    path.locked ? 'border-border bg-gray-50' : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      path.locked
                        ? 'bg-gray-300 text-gray-700'
                        : 'bg-orange-50 text-dq-orange'
                    }`}>
                      {path.locked ? <Lock className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                    </div>

                    <div className="flex-1">
                      <h4 className={cn(learnerItemTitle, 'mb-1', path.locked && 'text-gray-700')}>{path.title}</h4>
                      <p className={cn(learnerBodyMuted, 'mb-3', path.locked && 'text-gray-600')}>{path.description}</p>

                      {!path.locked && (
                        <>
                          <div className={cn(learnerBodyMuted, 'mb-3 flex items-center gap-4')}>
                            <span className="flex items-center gap-1">
                              <Flame className="w-4 h-4 text-amber-500" />
                              {path.streak} day streak
                            </span>
                            <span className="text-muted-foreground">
                              {path.daysCompleted}/{path.total} days
                            </span>
                          </div>
                          <Progress value={(path.progress / path.total) * 100} className="h-2 mb-3" />
                          <Button size="sm" className={cn(btnPrimary, 'h-8 px-3 py-1 text-sm')}>
                            Continue Path
                          </Button>
                        </>
                      )}

                      {path.locked && (
                        <p className={learnerBodyMuted}>
                          Complete previous paths to unlock
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Leaderboard & Achievements */}
        <div className="space-y-6">
          <Card className={cn(learnerPanel, 'p-6')}>
            <h3 className={cn(learnerSectionHeading, 'mb-6 flex items-center gap-2')}>
              <Trophy className="h-5 w-5 text-dq-orange" />
              Leaderboard
            </h3>

            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`p-3 rounded-lg flex items-center gap-3 ${
                    user.isCurrentUser
                      ? 'border-2 border-dq-orange bg-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center font-semibold ${getRankColor(user.rank)}`}>
                    {getRankIcon(user.rank)}
                  </div>

                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback className={cn(learnerCaption, 'bg-gray-100 font-medium text-dq-navy')}>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-dq-navy">{user.name}</p>
                    <p className={learnerCaption}>{user.points} points</p>
                  </div>

                  {user.rank <= 3 && (
                    <Trophy className={`w-5 h-5 ${getRankColor(user.rank)}`} />
                  )}
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-4 w-full text-sm hover:border-dq-orange hover:bg-dq-orange hover:text-white">
              View Full Leaderboard
            </Button>
          </Card>

          {/* Achievement Levels */}
          <Card className={cn(learnerPanel, 'p-6')}>
            <h3 className={cn(learnerSectionHeading, 'mb-6')}>Achievement Level</h3>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={achievement.level} className="relative">
                  <div className={`flex items-center gap-3 p-3 rounded-lg border ${
                    achievement.unlocked
                      ? 'border-dq-orange bg-orange-50 text-dq-navy'
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? 'bg-white text-dq-orange' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {achievement.unlocked ? (
                        <Award className="w-5 h-5" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={cn(learnerItemTitle, !achievement.unlocked && 'text-gray-900')}>
                        {achievement.level}
                      </p>
                      <p className={cn(learnerBodyMuted, !achievement.unlocked && 'text-gray-700')}>
                        {achievement.points} points
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="w-5 h-5 text-dq-orange" />
                    )}
                  </div>
                  {index < achievements.length - 1 && (
                    <div className={`w-0.5 h-4 mx-auto ${
                      achievement.unlocked ? 'bg-dq-orange' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
