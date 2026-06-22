import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Brain,
  ChevronRight,
  GraduationCap,
  Layers,
  PlayCircle,
  Search,
  Star,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { dtmaCoursesNew, type Course } from '@/data/dtmaCoursesNew';
import type { Enrollment } from '@/hooks/useCourses';
import { openAIMentor } from '@/lib/aiMentor';
import {
  AI_RECOMMENDATIONS,
  CAPABILITY_PATHWAYS,
  CERTIFICATION_PATHWAYS,
  LEARNER_SUCCESS_STORY,
  SKILL_AREA_LABELS,
  TRENDING,
  courseMatchesPathway,
  courseMatchesSkillArea,
  getCourseMeta,
  getDefaultSnapshot,
  getFeaturedJourney,
  searchCourse,
  type SkillArea,
} from '@/lib/exploreCoursesData';
import { MarketplaceCourseCard } from './MarketplaceCourseCard';
import {
  learnerBadge,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerCaption,
  learnerCardTitle,
  learnerEmptyBody,
  learnerEmptyTitle,
  learnerItemTitle,
  learnerKpiCard,
  learnerLink,
  learnerPanel,
  learnerSectionHeading,
  microLabel,
} from '@/lib/brandAccent';
import { cn } from '@/lib/utils';

type ExploreCoursesMarketplaceProps = {
  embedded?: boolean;
  userName?: string;
  enrollments?: Enrollment[];
  initialCategory?: string;
  onCourseClick?: (courseId: string) => void;
  onNavigate?: (tab: 'courses' | 'ai-cockpit') => void;
};

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'digital-economy', label: 'Digital Economy' },
  { value: 'digital-cognitive-organisation', label: 'Digital Cognitive Organisation' },
  { value: 'digital-business-platform', label: 'Digital Business Platform' },
  { value: 'digital-transformation', label: 'Digital Transformation' },
  { value: 'digital-worker-workspace', label: 'Digital Worker & Workspace' },
  { value: 'digital-accelerators', label: 'Digital Accelerators' },
];

const LEVELS = ['all', 'beginner', 'intermediate', 'advanced'] as const;
const DURATIONS = ['all', 'short', 'medium', 'long'] as const;
const RATINGS = ['all', '4.5+', '4.7+'] as const;
const CERT_TRACKS = ['all', 'foundation', 'professional', 'leader'] as const;

function ProgressRing({
  value,
  size = 72,
  onDark = false,
}: {
  value: number;
  size?: number;
  onDark?: boolean;
}) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden>
      <svg className="-rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={onDark ? 'rgba(255,255,255,0.25)' : '#e5e7eb'}
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FB5535"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center text-sm font-semibold',
          onDark ? 'text-white' : 'text-dq-navy',
        )}
      >
        {value}%
      </span>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-dq-orange bg-orange-50 text-dq-orange'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
      )}
    >
      {label}
    </button>
  );
}

function ExploreRecommendationBanner({
  userName,
  snapshot,
  onContinue,
  onViewPlan,
}: {
  userName: string;
  snapshot: ReturnType<typeof getDefaultSnapshot>;
  onContinue: () => void;
  onViewPlan: () => void;
}) {
  const bannerLabel =
    'mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-orange-200';

  return (
    <section
      className={cn(
        'overflow-hidden rounded-2xl border border-white/10 shadow-sm',
        'bg-gradient-to-br from-[#030F35] via-[#0c1d52] to-[#1a2f6b] p-5 text-white lg:p-6',
      )}
    >
      <p className="mb-1 text-sm text-white/90">Welcome back, {userName}</p>
      <h3 className="mb-4 text-lg font-semibold text-white lg:text-xl">
        Recommended for your Digital Transformation Journey
      </h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className={bannerLabel}>Current Course</p>
          <p className="font-medium text-white">{snapshot.currentCourse}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className={bannerLabel}>Next Pathway</p>
          <p className="font-medium text-white">{snapshot.nextPathway}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className={bannerLabel}>Certification Readiness</p>
          <div className="flex items-center gap-3">
            <ProgressRing value={snapshot.certificationReadiness} size={56} onDark />
            <span className="text-2xl font-semibold text-white">
              {snapshot.certificationReadiness}%
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button className={learnerBtnPrimary} onClick={onContinue}>
          <PlayCircle className="mr-1.5 h-4 w-4" />
          Continue Learning
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
          onClick={onViewPlan}
        >
          View Learning Plan
        </Button>
      </div>
    </section>
  );
}

function LearningSnapshotCard({ snapshot }: { snapshot: ReturnType<typeof getDefaultSnapshot> }) {
  const metrics = [
    { label: 'Courses Completed', value: String(snapshot.coursesCompleted) },
    { label: 'Courses In Progress', value: String(snapshot.coursesInProgress) },
    { label: 'Capability Score', value: `${snapshot.capabilityScore}%` },
    { label: 'Certification Readiness', value: `${snapshot.certificationReadiness}%` },
    { label: 'Hours Learned', value: String(snapshot.hoursLearned) },
  ];

  return (
    <aside className={cn(learnerPanel, 'rounded-2xl p-4 lg:sticky lg:top-28')} aria-label="My Learning Snapshot">
      <h3 className={cn(learnerItemTitle, 'mb-4')}>My Learning Snapshot</h3>
      <dl className="mb-5 space-y-3">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between gap-2 text-sm">
            <dt className={learnerBodyMuted}>{m.label}</dt>
            <dd className="font-semibold text-dq-navy">{m.value}</dd>
          </div>
        ))}
      </dl>
      <div>
        <p className={cn(learnerCaption, 'mb-2 font-medium uppercase tracking-wide')}>Skills Developing</p>
        <div className="flex flex-wrap gap-1.5">
          {snapshot.skillsDeveloping.map((skill) => (
            <Badge key={skill} variant="secondary" className={learnerBadge}>
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </aside>
  );
}

function matchesDuration(course: Course, duration: string): boolean {
  if (duration === 'all') return true;
  const hours = Number.parseInt(course.duration, 10) || 1;
  if (duration === 'short') return hours <= 2;
  if (duration === 'medium') return hours > 2 && hours <= 8;
  return hours > 8;
}

export function ExploreCoursesMarketplace({
  embedded = false,
  userName = 'Learner',
  enrollments = [],
  initialCategory = 'all',
  onCourseClick,
  onNavigate,
}: ExploreCoursesMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [level, setLevel] = useState('all');
  const [duration, setDuration] = useState('all');
  const [rating, setRating] = useState('all');
  const [certTrack, setCertTrack] = useState('all');
  const [skillArea, setSkillArea] = useState<SkillArea | 'all'>('all');
  const [activePathway, setActivePathway] = useState<string | null>(null);

  const snapshot = useMemo(() => {
    const base = getDefaultSnapshot();
    const active = enrollments.filter((e) => e.status === 'active');
    const completed = enrollments.filter((e) => e.status === 'completed');
    const primary = active[0];
    const primaryCourse = primary
      ? dtmaCoursesNew.find((c) => c.id === primary.course_id)
      : dtmaCoursesNew[0];

    return {
      ...base,
      coursesInProgress: active.length || base.coursesInProgress,
      coursesCompleted: completed.length || base.coursesCompleted,
      currentCourse: primaryCourse?.title ?? base.currentCourse,
      certificationReadiness:
        active.length > 0
          ? Math.round(
              active.reduce((s, e) => s + (e.progress ?? 0), 0) / active.length * 0.7,
            )
          : base.certificationReadiness,
    };
  }, [enrollments]);

  const featuredProgress =
    enrollments.find((e) => e.course_id === 'course-economy-40')?.progress ?? 65;
  const featured = getFeaturedJourney(featuredProgress);

  const activeFilters = useMemo(() => {
    const pills: { key: string; label: string; clear: () => void }[] = [];
    if (category !== 'all')
      pills.push({
        key: 'category',
        label: CATEGORIES.find((c) => c.value === category)?.label ?? category,
        clear: () => setCategory('all'),
      });
    if (level !== 'all')
      pills.push({ key: 'level', label: level, clear: () => setLevel('all') });
    if (duration !== 'all')
      pills.push({ key: 'duration', label: duration, clear: () => setDuration('all') });
    if (rating !== 'all')
      pills.push({ key: 'rating', label: rating, clear: () => setRating('all') });
    if (certTrack !== 'all')
      pills.push({ key: 'cert', label: certTrack, clear: () => setCertTrack('all') });
    if (skillArea !== 'all')
      pills.push({
        key: 'skill',
        label: SKILL_AREA_LABELS[skillArea],
        clear: () => setSkillArea('all'),
      });
    if (activePathway) {
      const p = CAPABILITY_PATHWAYS.find((x) => x.id === activePathway);
      pills.push({
        key: 'pathway',
        label: p?.title ?? activePathway,
        clear: () => setActivePathway(null),
      });
    }
    return pills;
  }, [category, level, duration, rating, certTrack, skillArea, activePathway]);

  const filteredCourses = useMemo(() => {
    return dtmaCoursesNew.filter((course) => {
      const meta = getCourseMeta(course.id);
      if (!searchCourse(course, searchQuery, meta)) return false;
      if (category !== 'all' && course.category !== category) return false;
      if (level !== 'all' && course.level.toLowerCase() !== level) return false;
      if (!matchesDuration(course, duration)) return false;
      if (rating === '4.5+' && course.rating < 4.5) return false;
      if (rating === '4.7+' && course.rating < 4.7) return false;
      if (certTrack !== 'all' && meta.certificationTrack !== certTrack) return false;
      if (skillArea !== 'all' && !courseMatchesSkillArea(course, skillArea)) return false;
      if (activePathway && !courseMatchesPathway(course.id, activePathway)) return false;
      return true;
    });
  }, [searchQuery, category, level, duration, rating, certTrack, skillArea, activePathway]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setCategory('all');
    setLevel('all');
    setDuration('all');
    setRating('all');
    setCertTrack('all');
    setSkillArea('all');
    setActivePathway(null);
  };

  const cycleFilter = <T extends string>(current: T, options: readonly T[], setter: (v: T) => void) => {
    const idx = options.indexOf(current);
    setter(options[(idx + 1) % options.length]);
  };

  return (
    <div className={cn('space-y-8', !embedded && 'pb-16')}>
      {!embedded && (
        <header className="mx-auto max-w-[1280px] px-5 pt-8 md:px-8 lg:px-10">
          <h1 className="text-2xl font-semibold tracking-tight text-dq-navy lg:text-[28px]">
            Explore Courses
          </h1>
          <p className={cn(learnerBodyMuted, 'mt-2 max-w-2xl')}>
            Browse the DTMA transformation capability catalog and discover your next learning milestone.
          </p>
        </header>
      )}

      <div className={cn(embedded ? '' : 'mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10')}>
        <ExploreRecommendationBanner
          userName={userName}
          snapshot={snapshot}
          onContinue={() => onNavigate?.('courses')}
          onViewPlan={() => onNavigate?.('courses')}
        />
      </div>

      {/* Search & filters */}
      <section
        className={cn(
          embedded ? cn(learnerPanel, 'rounded-2xl p-4') : 'border-b border-gray-200 bg-white py-4',
        )}
        aria-label="Course discovery filters"
      >
        <div className={cn(!embedded && 'mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10')}>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, skills, certifications, frameworks, or competencies..."
              className="rounded-full border-gray-200 pl-10"
              aria-label="Search courses"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label={`Category${category !== 'all' ? `: ${CATEGORIES.find((c) => c.value === category)?.label}` : ''}`}
              active={category !== 'all'}
              onClick={() =>
                cycleFilter(
                  category as (typeof CATEGORIES)[number]['value'],
                  CATEGORIES.map((c) => c.value),
                  setCategory,
                )
              }
            />
            <FilterChip
              label={`Level${level !== 'all' ? `: ${level}` : ''}`}
              active={level !== 'all'}
              onClick={() => cycleFilter(level, LEVELS, setLevel)}
            />
            <FilterChip
              label={`Duration${duration !== 'all' ? `: ${duration}` : ''}`}
              active={duration !== 'all'}
              onClick={() => cycleFilter(duration, DURATIONS, setDuration)}
            />
            <FilterChip
              label={`Rating${rating !== 'all' ? `: ${rating}` : ''}`}
              active={rating !== 'all'}
              onClick={() => cycleFilter(rating, RATINGS, setRating)}
            />
            <FilterChip
              label={`Certification${certTrack !== 'all' ? `: ${certTrack}` : ''}`}
              active={certTrack !== 'all'}
              onClick={() => cycleFilter(certTrack, CERT_TRACKS, setCertTrack)}
            />
            <FilterChip
              label={`Skill Area${skillArea !== 'all' ? '' : ''}`}
              active={skillArea !== 'all'}
              onClick={() => {
                const areas: (SkillArea | 'all')[] = ['all', ...Object.keys(SKILL_AREA_LABELS) as SkillArea[]];
                const idx = areas.indexOf(skillArea);
                setSkillArea(areas[(idx + 1) % areas.length]);
              }}
            />
          </div>
          {activeFilters.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {activeFilters.map((pill) => (
                <Badge
                  key={pill.key}
                  variant="secondary"
                  className={cn('gap-1 pr-1', learnerBadge)}
                >
                  {pill.label}
                  <button
                    type="button"
                    onClick={pill.clear}
                    className="rounded-full p-0.5 hover:bg-gray-200"
                    aria-label={`Remove ${pill.label} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <button type="button" onClick={clearAllFilters} className={cn(learnerLink, 'text-xs')}>
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      <div className={cn(!embedded && 'mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10')}>
        {/* Capability pathways */}
        <section className="mb-8" aria-labelledby="pathways-heading">
          <div className="mb-4">
            <h2 id="pathways-heading" className={learnerSectionHeading}>
              Explore by Capability Path
            </h2>
            <p className={cn(learnerBodyMuted, 'mt-1')}>
              Structured learning journeys designed to build measurable transformation capability.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {CAPABILITY_PATHWAYS.map((pathway) => (
              <button
                key={pathway.id}
                type="button"
                onClick={() =>
                  setActivePathway(activePathway === pathway.id ? null : pathway.id)
                }
                className={cn(
                  learnerPanel,
                  'rounded-2xl p-4 text-left transition-all hover:shadow-md',
                  activePathway === pathway.id && 'border-dq-orange ring-2 ring-dq-orange/20',
                )}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-dq-orange">
                  <Layers className="h-5 w-5" />
                </div>
                <Badge variant="outline" className={cn('mb-2', learnerBadge)}>
                  {pathway.level}
                </Badge>
                <h3 className={cn(learnerItemTitle, 'mb-1')}>{pathway.title}</h3>
                <p className={cn(learnerCaption, 'mb-2')}>
                  {pathway.courseCount} Courses · {pathway.stat}
                </p>
                <p className={cn(learnerBodyMuted, 'mb-3 line-clamp-2 text-sm')}>
                  {pathway.description}
                </p>
                <span className={cn(learnerLink, 'text-sm')}>
                  Explore Pathway
                  <ChevronRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured journey */}
        <section
          className={cn(
            learnerPanel,
            'mb-8 overflow-hidden rounded-2xl border-orange-100 bg-gradient-to-r from-orange-50/80 via-white to-white p-5 lg:p-6',
          )}
          aria-labelledby="featured-journey-heading"
        >
          <h2 id="featured-journey-heading" className={cn(learnerSectionHeading, 'mb-4')}>
            Continue Your Learning Journey
          </h2>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <ProgressRing value={featured.progress} />
            <div className="min-w-0 flex-1">
              <h3 className={learnerCardTitle}>{featured.title}</h3>
              <p className={cn(learnerBodyMuted, 'mt-1')}>{featured.moduleLabel}</p>
            </div>
            <Link to={featured.learnHref} className="shrink-0">
              <Button className={learnerBtnPrimary}>
                <PlayCircle className="mr-1.5 h-4 w-4" />
                Resume Learning
              </Button>
            </Link>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            {/* Catalog */}
            <section aria-labelledby="catalog-heading">
              <div className="mb-4 flex items-end justify-between">
                <h2 id="catalog-heading" className={learnerSectionHeading}>
                  Course Catalog
                </h2>
                <p className={learnerCaption}>
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                </p>
              </div>

              {filteredCourses.length === 0 ? (
                <div className={cn(learnerPanel, 'px-6 py-12 text-center')} role="status">
                  <Search className="mx-auto mb-4 h-10 w-10 text-gray-300" />
                  <h3 className={cn(learnerEmptyTitle, 'mb-2')}>No courses match your criteria</h3>
                  <p className={cn(learnerEmptyBody, 'mx-auto mb-6 max-w-md')}>
                    Try adjusting your filters or explore one of our recommended capability pathways.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button variant="outline" className="rounded-full" onClick={clearAllFilters}>
                      Clear Filters
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setActivePathway('foundation')}
                    >
                      Browse Pathways
                    </Button>
                    <Button className={learnerBtnPrimary} onClick={() => openAIMentor()}>
                      <Brain className="mr-1.5 h-4 w-4" />
                      Ask AI Coach
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
                  {filteredCourses.map((course) => (
                    <MarketplaceCourseCard
                      key={course.id}
                      course={course}
                      highlighted={
                        activePathway !== null && courseMatchesPathway(course.id, activePathway)
                      }
                      onCourseClick={onCourseClick}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* AI recommendations */}
            <section aria-labelledby="ai-rec-heading">
              <h2 id="ai-rec-heading" className={learnerSectionHeading}>
                AI Recommended For You
              </h2>
              <p className={cn(learnerBodyMuted, 'mb-4 mt-1')}>
                Personalized suggestions based on your learning progress, competency profile and
                certification goals.
              </p>
              <div className="space-y-3">
                {AI_RECOMMENDATIONS.map((rec) => (
                  <article
                    key={rec.id}
                    className={cn(learnerPanel, 'flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center')}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className={learnerItemTitle}>{rec.title}</h3>
                        <Badge className={cn('gap-1 bg-orange-50 text-dq-orange', learnerBadge)}>
                          <Brain className="h-3 w-3" />
                          AI Pick
                        </Badge>
                      </div>
                      <p className={learnerBodyMuted}>{rec.reason}</p>
                    </div>
                    {onCourseClick ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0 rounded-full"
                        onClick={() => onCourseClick(rec.courseId)}
                      >
                        View Course
                      </Button>
                    ) : (
                      <Link to={`/courses/${rec.courseId}`}>
                        <Button variant="outline" size="sm" className="rounded-full">
                          View Course
                        </Button>
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section aria-labelledby="cert-heading">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 id="cert-heading" className={learnerSectionHeading}>
                  Certification Pathways
                </h2>
                <button type="button" className={cn(learnerLink, 'text-sm')}>
                  View Certification Journey
                </button>
              </div>
              <div className="space-y-3">
                {CERTIFICATION_PATHWAYS.map((cert) => (
                  <div key={cert.id} className={cn(learnerPanel, 'rounded-2xl p-4')}>
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 shrink-0 text-dq-orange" />
                        <div>
                          <p className={learnerItemTitle}>{cert.title}</p>
                          <p className={learnerCaption}>{cert.requiredCourses} Required Courses</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-dq-navy">{cert.progress}%</span>
                    </div>
                    <Progress value={cert.progress} className="h-1.5" />
                  </div>
                ))}
              </div>
            </section>

            {/* Social proof */}
            <section aria-labelledby="trending-heading">
              <h2 id="trending-heading" className={cn(learnerSectionHeading, 'mb-4')}>
                Trending This Month
              </h2>
              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Users, label: 'Most Enrolled', ...TRENDING.mostEnrolled },
                  { icon: Star, label: 'Highest Rated', ...TRENDING.highestRated },
                  { icon: TrendingUp, label: 'Fastest Growing', ...TRENDING.fastestPathway },
                ].map(({ icon: Icon, label, title, stat }) => (
                  <div key={label} className={cn(learnerKpiCard, 'rounded-2xl p-4')}>
                    <Icon className="mb-2 h-5 w-5 text-dq-orange" />
                    <p className={cn(microLabel, 'mb-1')}>{label}</p>
                    <p className="text-sm font-semibold text-dq-navy">{title}</p>
                    <p className={learnerCaption}>{stat}</p>
                  </div>
                ))}
              </div>
              <blockquote className={cn(learnerPanel, 'rounded-2xl border-l-4 border-dq-orange p-5')}>
                <p className={cn(learnerBodyMuted, 'mb-4 italic')}>&ldquo;{LEARNER_SUCCESS_STORY.quote}&rdquo;</p>
                <footer className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-dq-navy">
                    {LEARNER_SUCCESS_STORY.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dq-navy">{LEARNER_SUCCESS_STORY.name}</p>
                    <p className={learnerCaption}>
                      {LEARNER_SUCCESS_STORY.certification} · {LEARNER_SUCCESS_STORY.role}
                    </p>
                  </div>
                  <Badge className="ml-auto shrink-0 border-green-200 bg-green-50 text-green-800">
                    <GraduationCap className="mr-1 h-3 w-3" />
                    Certified
                  </Badge>
                </footer>
              </blockquote>
            </section>
          </div>

          <div className="hidden lg:col-span-4 lg:block">
            <LearningSnapshotCard snapshot={snapshot} />
          </div>
        </div>

        {/* Mobile snapshot */}
        <div className="mt-8 lg:hidden">
          <LearningSnapshotCard snapshot={snapshot} />
        </div>
      </div>
    </div>
  );
}
