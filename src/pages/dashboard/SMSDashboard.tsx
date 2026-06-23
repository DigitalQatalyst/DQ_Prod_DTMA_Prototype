import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  SMSDashboardSidebar,
  type SMSTabId,
} from "@/components/dashboard/SMSDashboardSidebar";
import {
  LearnerOverviewPanel,
  type OverviewPanelTab,
} from "@/components/dashboard/LearnerOverviewPanel";
import SMSOverviewPanel from "@/components/sms/SMSOverviewPanel";
import SMSCoursesPanel from "@/components/sms/SMSCoursesPanel";
import SMSFacultyPanel from "@/components/sms/SMSFacultyPanel";
import SMSStudentsPanel from "@/components/sms/SMSStudentsPanel";
import SMSFinancePanel from "@/components/sms/SMSFinancePanel";
import SMSBillingPanel from "@/components/sms/SMSBillingPanel";
import SMSPartnersPanel from "@/components/sms/SMSPartnersPanel";
import SMSCompliancePanel from "@/components/sms/SMSCompliancePanel";
import SMSStaffPanel from "@/components/sms/SMSStaffPanel";
import SMSMyProfilePanel from "@/components/sms/SMSMyProfilePanel";
import JourneyContextSwitcher from "@/components/layout/JourneyContextSwitcher";
import {
  learnerPageDescription,
  learnerPageTitle,
  learnerWorkspaceBg,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";

const TAB_LABELS: Record<SMSTabId, string> = {
  "getting-started": "Home",
  overview: "Overview",
  courses: "Courses",
  faculty: "Faculty",
  students: "Students",
  finance: "Finance",
  billing: "Billing",
  partners: "Partners",
  compliance: "Accreditation",
  staff: "Staff",
  profile: "My Profile",
};

const TAB_DESCRIPTIONS: Partial<Record<SMSTabId, string>> = {
  overview: "Academy performance, alerts, and operational snapshot",
  courses: "Course performance, completion health, and category trends",
  faculty: "Human instructors and AI agents supporting course delivery",
  students: "Progress, access status, and engagement for all enrolled students",
  finance: "Revenue trends, course earnings, and subscription performance",
  billing: "Failed payments and refund requests. Escalate issues to the finance team",
  partners: "Content providers and schools contributing courses to the platform",
  compliance: "Accreditation status for all courses. Escalate expiring or lapsed items",
  staff: "Operational teams behind the portal and escalation routing",
  profile: "Your Academy Manager platform account, security, and access settings",
};

/** Open billing issues count for nav badge (matches SMSBillingPanel mock data) */
const OPEN_BILLING_ISSUE_COUNT = 3;

export default function SMSDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SMSTabId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageDescription =
    activeTab === "getting-started" ? undefined : TAB_DESCRIPTIONS[activeTab];

  const pageTitle = activeTab === "getting-started" ? "Home" : TAB_LABELS[activeTab];

  const handleOverviewNavigate = (tab: OverviewPanelTab) => {
    if (tab === "catalog" || tab === "courses") {
      setActiveTab("courses");
      return;
    }
    setActiveTab("overview");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <SMSDashboardSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }}
        onSignOut={handleSignOut}
        profileName={profile?.full_name ?? null}
        profileEmail={profile?.email ?? null}
        profileAvatar={profile?.avatar_url}
        billingIssueCount={OPEN_BILLING_ISSUE_COUNT}
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed left-0 top-0 z-50 transition-transform duration-200 lg:sticky lg:translate-x-0`}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className={cn("flex-1 h-full overflow-y-auto", learnerWorkspaceBg)}>
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3 lg:px-8 lg:py-4">
          <div className="flex items-start justify-between gap-4">
            <button
              type="button"
              className="-ml-2 shrink-0 p-2 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6 text-dq-navy" />
              ) : (
                <Menu className="h-6 w-6 text-dq-navy" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <h2 className={learnerPageTitle}>{pageTitle}</h2>
              {pageDescription && (
                <p className={cn(learnerPageDescription, "mt-0.5")}>{pageDescription}</p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <JourneyContextSwitcher className="inline-flex shrink-0" />
              <Avatar className="h-8 w-8 shrink-0 ring-2 ring-dq-orange lg:hidden">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-gray-100 text-xs text-dq-navy">
                {profile?.full_name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6">
          {activeTab === "getting-started" && (
            <LearnerOverviewPanel onNavigate={handleOverviewNavigate} />
          )}
          {activeTab === "overview" && (
            <SMSOverviewPanel onNavigate={setActiveTab} />
          )}
          {activeTab === "courses" && <SMSCoursesPanel />}
          {activeTab === "faculty" && <SMSFacultyPanel />}
          {activeTab === "students" && <SMSStudentsPanel />}
          {activeTab === "finance" && <SMSFinancePanel />}
          {activeTab === "billing" && <SMSBillingPanel />}
          {activeTab === "partners" && <SMSPartnersPanel />}
          {activeTab === "compliance" && <SMSCompliancePanel />}
          {activeTab === "staff" && <SMSStaffPanel />}
          {activeTab === "profile" && <SMSMyProfilePanel />}
        </div>
      </main>
    </div>
  );
}
