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
    return <span className="font-bold">{rank}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[#ff6b4d]" />
            </div>
          </div>
          <div className="text-[24px] leading-[32px] font-medium">2,450</div>
          <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Total Points</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div className="text-[24px] leading-[32px] font-medium">28</div>
          <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Day Streak</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#1e2348]/10 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-[#1e2348]" />
            </div>
          </div>
          <div className="text-[24px] leading-[32px] font-medium">5th</div>
          <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Rank</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="text-[24px] leading-[32px] font-medium">12</div>
          <div className="text-[14px] leading-[20px] font-normal text-muted-foreground">Badges</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Challenges */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] leading-[28px] font-medium flex items-center gap-2">
                <Target className="w-6 h-6 text-[#ff6b4d]" />
                Daily Challenges
              </h3>
              <Badge className="bg-[#1e2348] text-white text-[12px] leading-[16px] font-medium">
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
                          : 'bg-[#ff6b4d]/10 text-[#ff6b4d]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-[16px] leading-[24px] font-normal">{challenge.title}</h4>
                            <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">{challenge.description}</p>
                          </div>
                          <Badge className="bg-[#ff6b4d] text-white text-[12px] leading-[16px] font-medium">
                            +{challenge.points} pts
                          </Badge>
                        </div>

                        {!challenge.completed && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-[14px] leading-[20px] font-normal mb-2">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{challenge.progress}/{challenge.total}</span>
                            </div>
                            <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                          </div>
                        )}

                        {challenge.completed && (
                          <div className="flex items-center gap-2 text-green-600 mt-2">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-[14px] leading-[20px] font-medium">Completed!</span>
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
          <Card className="p-6">
            <h3 className="text-[20px] leading-[28px] font-medium mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#ff6b4d]" />
              Microlearning Paths
            </h3>

            <div className="space-y-4">
              {microlearningPaths.map((path) => (
                <div
                  key={path.id}
                  className={`p-4 rounded-lg border ${
                    path.locked ? 'border-border bg-gray-50 opacity-60' : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      path.locked
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-gradient-to-br from-[#1e2348] to-[#ff6b4d] text-white'
                    }`}>
                      {path.locked ? <Lock className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-[16px] leading-[24px] font-normal mb-1">{path.title}</h4>
                      <p className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-3">{path.description}</p>

                      {!path.locked && (
                        <>
                          <div className="flex items-center gap-4 text-[14px] leading-[20px] font-normal mb-3">
                            <span className="flex items-center gap-1">
                              <Flame className="w-4 h-4 text-amber-500" />
                              {path.streak} day streak
                            </span>
                            <span className="text-muted-foreground">
                              {path.daysCompleted}/{path.total} days
                            </span>
                          </div>
                          <Progress value={(path.progress / path.total) * 100} className="h-2 mb-3" />
                          <Button size="sm" className="bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[14px] leading-[20px] font-normal">
                            Continue Path
                          </Button>
                        </>
                      )}

                      {path.locked && (
                        <p className="text-[14px] leading-[20px] font-normal text-muted-foreground">
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
          <Card className="p-6">
            <h3 className="text-[20px] leading-[28px] font-medium mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#ff6b4d]" />
              Leaderboard
            </h3>

            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`p-3 rounded-lg flex items-center gap-3 ${
                    user.isCurrentUser
                      ? 'bg-[#ff6b4d]/10 border-2 border-[#ff6b4d]'
                      : 'bg-accent/50'
                  }`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center font-bold ${getRankColor(user.rank)}`}>
                    {getRankIcon(user.rank)}
                  </div>

                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback className="bg-[#1e2348] text-white text-[10px] leading-[14px] font-medium">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] leading-[20px] font-medium truncate">{user.name}</p>
                    <p className="text-[12px] leading-[16px] font-normal text-muted-foreground">{user.points} points</p>
                  </div>

                  {user.rank <= 3 && (
                    <Trophy className={`w-5 h-5 ${getRankColor(user.rank)}`} />
                  )}
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4 text-[14px] leading-[20px] font-normal">
              View Full Leaderboard
            </Button>
          </Card>

          {/* Achievement Levels */}
          <Card className="p-6">
            <h3 className="text-[20px] leading-[28px] font-medium mb-6">Achievement Level</h3>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={achievement.level} className="relative">
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-[#1e2348] to-[#ff6b4d] text-white'
                      : 'bg-gray-100'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? 'bg-white/20' : 'bg-gray-300'
                    }`}>
                      {achievement.unlocked ? (
                        <Award className="w-5 h-5" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[16px] leading-[24px] font-normal ${achievement.unlocked ? 'text-white' : 'text-gray-600'}`}>
                        {achievement.level}
                      </p>
                      <p className={`text-[14px] leading-[20px] font-normal ${achievement.unlocked ? 'text-white/80' : 'text-gray-500'}`}>
                        {achievement.points} points
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="w-5 h-5" />
                    )}
                  </div>
                  {index < achievements.length - 1 && (
                    <div className={`w-0.5 h-4 mx-auto ${
                      achievement.unlocked ? 'bg-[#ff6b4d]' : 'bg-gray-300'
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
