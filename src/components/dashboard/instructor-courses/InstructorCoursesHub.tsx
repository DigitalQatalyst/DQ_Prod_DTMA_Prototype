import { useMemo, useState } from 'react';
import { BarChart3, FileDown, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Course } from '@/hooks/useCourses';
import type { InstructorTabId } from '@/components/dashboard/InstructorDashboardSidebar';
import { learnerBtnPrimary } from '@/lib/brandAccent';
import { buildCoursesHubSnapshot } from '@/lib/instructorCoursesHubData';
import type {
  CourseFilterTab,
  HubCourseItem,
  PipelineStage,
  SortKey,
} from '@/lib/instructorCoursesHubData';
import { BulkActionsBar } from './BulkActionsBar';
import { CourseActivityFeed } from './CourseActivityFeed';
import { CourseDrawer } from './CourseDrawer';
import { CourseGrid, SampleDataBanner } from './CourseGrid';
import { CourseMetricsGrid } from './CourseMetricCard';
import { CoursePerformancePanel } from './CoursePerformancePanel';
import { CoursePipeline } from './CoursePipeline';
import { CourseQuickActions } from './CourseQuickActions';
import { CoursesEmptyState } from './CoursesEmptyState';

type NewCourseForm = {
  title: string;
  category: string;
  level: string;
  description: string;
  price: string;
};

export interface InstructorCoursesHubProps {
  courses: Course[] | undefined;
  isLoading: boolean;
  publishedCount: number;
  underReviewCount: number;
  draftCount: number;
  totalEnrollments: number;
  averageRating: number;
  isVerificationPending: boolean;
  hasCredentials?: boolean;
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
  newCourse: NewCourseForm;
  setNewCourse: (course: NewCourseForm) => void;
  handleCreateCourse: () => void;
  handleSubmitForReview: (id: string) => void;
  handleArchive: (id: string) => void;
  handleDuplicate: (id: string) => void;
  handleEdit: (id: string) => void;
  createCoursePending: boolean;
  onNavigate: (tab: InstructorTabId) => void;
}

export function InstructorCoursesHub({
  courses,
  isLoading,
  publishedCount,
  underReviewCount,
  draftCount,
  totalEnrollments,
  averageRating,
  isVerificationPending,
  hasCredentials,
  isCreateOpen,
  setIsCreateOpen,
  newCourse,
  setNewCourse,
  handleCreateCourse,
  handleSubmitForReview,
  handleArchive,
  handleDuplicate,
  handleEdit,
  createCoursePending,
  onNavigate,
}: InstructorCoursesHubProps) {
  const [filterTab, setFilterTab] = useState<CourseFilterTab>('all');
  const [sortKey, setSortKey] = useState<SortKey>('recent');
  const [search, setSearch] = useState('');
  const [pipelineStage, setPipelineStage] = useState<PipelineStage | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerCourse, setDrawerCourse] = useState<HubCourseItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const snapshot = useMemo(
    () =>
      buildCoursesHubSnapshot({
        courses,
        publishedCount,
        underReviewCount,
        draftCount,
        totalEnrollments,
        averageRating,
        isVerificationPending,
        hasCredentials,
      }),
    [
      courses,
      publishedCount,
      underReviewCount,
      draftCount,
      totalEnrollments,
      averageRating,
      isVerificationPending,
      hasCredentials,
    ],
  );

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const openDrawer = (course: HubCourseItem) => {
    setDrawerCourse(course);
    setDrawerOpen(true);
  };

  const isDemoId = (id: string) =>
    snapshot.useDemo && !(courses ?? []).some((c) => c.id === id);

  const safeEdit = (id: string) => {
    if (!isDemoId(id)) handleEdit(id);
  };
  const safeDuplicate = (id: string) => {
    if (!isDemoId(id)) handleDuplicate(id);
  };
  const safeArchive = (id: string) => {
    if (!isDemoId(id)) handleArchive(id);
  };
  const safeSubmit = (id: string) => {
    if (!isDemoId(id)) handleSubmitForReview(id);
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" size="sm" className="rounded-full border-gray-200">
          <Upload className="mr-1.5 h-4 w-4" />
          Import Course
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-gray-200"
          onClick={() => onNavigate('reviews')}
        >
          <BarChart3 className="mr-1.5 h-4 w-4" />
          View Analytics
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-gray-200"
        >
          <FileDown className="mr-1.5 h-4 w-4" />
          Export
        </Button>
        <Button className={learnerBtnPrimary} onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      <CourseMetricsGrid metrics={snapshot.metrics} loading={isLoading} />

      <CourseQuickActions
        onCreateCourse={() => setIsCreateOpen(true)}
        onNavigate={onNavigate}
        onDuplicate={() => {
          const first = snapshot.items.find((c) => !isDemoId(c.id));
          if (first) handleDuplicate(first.id);
        }}
      />

      {snapshot.isEmpty && (
        <CoursesEmptyState
          steps={snapshot.onboardingSteps}
          onCreateCourse={() => setIsCreateOpen(true)}
          onNavigate={onNavigate}
        />
      )}

      {snapshot.useDemo && <SampleDataBanner />}

      <BulkActionsBar count={selectedIds.size} onClear={() => setSelectedIds(new Set())} />

      <CoursePipeline
        counts={snapshot.pipelineCounts}
        activeStage={pipelineStage}
        onStageClick={setPipelineStage}
      />

      <CourseGrid
        courses={snapshot.items}
        search={search}
        onSearchChange={setSearch}
        filterTab={filterTab}
        onFilterTabChange={setFilterTab}
        sortKey={sortKey}
        onSortChange={setSortKey}
        pipelineStage={pipelineStage}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onOpenCourse={openDrawer}
        onEdit={safeEdit}
        onDuplicate={safeDuplicate}
        onArchive={safeArchive}
        onAnalytics={() => onNavigate('reviews')}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <CoursePerformancePanel
          rows={snapshot.performance}
          onViewAnalytics={() => onNavigate('reviews')}
        />
        <CourseActivityFeed activities={snapshot.activity} />
      </div>

      <CourseDrawer
        course={drawerCourse}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onEdit={safeEdit}
        onView={safeEdit}
        onSubmitReview={safeSubmit}
      />

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Fill in the basic details to create a new course draft.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="hub-title">Course Title *</Label>
              <Input
                id="hub-title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                placeholder="e.g., Digital Transformation Strategy Fundamentals"
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select
                  value={newCourse.category}
                  onValueChange={(v) => setNewCourse({ ...newCourse, category: v })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital-transformation">Digital Transformation</SelectItem>
                    <SelectItem value="digital-business-platform">Digital Business Platform</SelectItem>
                    <SelectItem value="digital-accelerators">Digital Accelerators</SelectItem>
                    <SelectItem value="digital-workers">Digital Workers</SelectItem>
                    <SelectItem value="digital-economy">Digital Economy</SelectItem>
                    <SelectItem value="digital-cognitive-organisation">Digital Cognitive Organisation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Level *</Label>
                <Select
                  value={newCourse.level}
                  onValueChange={(v) => setNewCourse({ ...newCourse, level: v })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="hub-price">Price ($)</Label>
              <Input
                id="hub-price"
                type="number"
                value={newCourse.price}
                onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                placeholder="99"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="hub-desc">Description</Label>
              <Textarea
                id="hub-desc"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                placeholder="Brief description of your course..."
                rows={3}
                className="mt-1.5"
              />
            </div>
            <Button
              className="w-full bg-dq-orange hover:bg-[#E04020]"
              onClick={handleCreateCourse}
              disabled={createCoursePending}
            >
              {createCoursePending ? 'Creating...' : 'Create Course'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InstructorCoursesHub;
