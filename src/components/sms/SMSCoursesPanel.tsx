// Courses & Faculty — reuses the existing AnalyticsPerformanceInsightsPanel
// which already has course performance, faculty spotlight, and category data.
// The acquisition funnel and operations health tabs are not surfaced here;
// the school manager sees only the course/faculty-relevant tabs.
import AnalyticsPerformanceInsightsPanel from "@/components/admin/stage4/AnalyticsPerformanceInsightsPanel";

export default function SMSCoursesPanel() {
  return <AnalyticsPerformanceInsightsPanel />;
}
