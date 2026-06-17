import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  Compass,
  GraduationCap,
  Hammer,
  LayoutGrid,
  Link2,
  LogOut,
  Settings,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import DTMALogo from "@/components/layout/DTMALogo";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";
import {
  learnerCaption,
  learnerNavGroup,
  learnerNavSubItem,
  learnerNavSubItemActive,
  microLabel,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";

export type InstructorTabId =
  | "getting-started"
  | "overview"
  | "ai-cockpit"
  | "courses"
  | "catalog"
  | "course-builder"
  | "learners"
  | "verification"
  | "reviews"
  | "profile";

type NavLeaf = {
  id: InstructorTabId;
  label: string;
};

type NavGroup = {
  id: string;
  label: string;
  icon: LucideIcon;
  items: NavLeaf[];
};

type NavSection = {
  id: string;
  label: string;
  groups?: NavGroup[];
  items?: NavLeaf[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    id: "orientation",
    label: "Orientation",
    groups: [
      {
        id: "getting-started",
        label: "Getting Started",
        icon: Compass,
        items: [{ id: "getting-started", label: "Home" }],
      },
      {
        id: "quick-links",
        label: "Quick Links",
        icon: Link2,
        items: [
          { id: "overview", label: "Dashboard" },
          { id: "ai-cockpit", label: "AI cockpit" },
          { id: "courses", label: "My Courses" },
        ],
      },
    ],
  },
  {
    id: "marketplace",
    label: "Marketplace",
    items: [{ id: "catalog", label: "Explore Courses" }],
  },
  {
    id: "workspaces",
    label: "Workspaces",
    items: [{ id: "course-builder", label: "Course builder" }],
  },
  {
    id: "platform",
    label: "Platform Management",
    items: [
      { id: "verification", label: "Verification" },
      { id: "learners", label: "Learners" },
      { id: "reviews", label: "Reviews" },
      { id: "profile", label: "Profile & Settings" },
    ],
  },
];

const ITEM_ICONS: Partial<Record<InstructorTabId, LucideIcon>> = {
  courses: BookOpen,
  catalog: GraduationCap,
  "course-builder": Hammer,
  learners: Users,
  verification: CheckCircle,
  reviews: Star,
  profile: Settings,
};

function groupContainsTab(group: NavGroup, tab: InstructorTabId) {
  return group.items.some((item) => item.id === tab);
}

type InstructorDashboardSidebarProps = {
  activeTab: InstructorTabId;
  onTabChange: (tab: InstructorTabId) => void;
  onSignOut: () => void;
  profileName: string | null;
  profileEmail: string | null;
  profileAvatar?: string | null;
  className?: string;
};

export function InstructorDashboardSidebar({
  activeTab,
  onTabChange,
  onSignOut,
  profileName,
  profileEmail,
  profileAvatar,
  className,
}: InstructorDashboardSidebarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAV_SECTIONS.forEach((section) => {
      section.groups?.forEach((group) => {
        initial[group.id] = groupContainsTab(group, activeTab);
      });
    });
    return initial;
  });

  useEffect(() => {
    NAV_SECTIONS.forEach((section) => {
      section.groups?.forEach((group) => {
        if (groupContainsTab(group, activeTab)) {
          setOpenGroups((prev) => ({ ...prev, [group.id]: true }));
        }
      });
    });
  }, [activeTab]);

  const getInitials = (name: string | null) => {
    if (!name) return "I";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const renderLeaf = (item: NavLeaf) => {
    const isActive = activeTab === item.id;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onTabChange(item.id)}
        className={cn(
          "flex w-full items-center justify-between py-2 pl-10 pr-3 text-left transition-colors",
          isActive
            ? cn(learnerNavSubItemActive, "rounded-md bg-gray-100")
            : cn(learnerNavSubItem, "hover:bg-gray-50 hover:text-dq-navy")
        )}
      >
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <aside
      className={cn(
        "flex h-screen w-72 flex-col border-r border-gray-200 bg-white",
        className
      )}
    >
      <div className="border-b border-gray-100 px-5 py-5">
        <DTMALogo />
      </div>

      <RoleSwitcher currentRole="instructor" variant="light" />

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.id}>
              <p className={cn(microLabel, "mb-2 px-2")}>{section.label}</p>

              {section.groups?.map((group) => {
                const Icon = group.icon;
                const isOpen = openGroups[group.id] ?? false;
                const groupActive = groupContainsTab(group, activeTab);

                return (
                  <div key={group.id} className="mb-1">
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.id)}
                      className={cn(
                        "relative flex w-full items-center gap-2.5 rounded-lg px-2 py-2 transition-colors",
                        groupActive
                          ? cn(
                              learnerNavGroup,
                              "bg-[#eef2f9] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:rounded-full before:bg-dq-orange"
                            )
                          : cn(learnerNavGroup, "hover:bg-gray-50")
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-gray-500" />
                      <span className="flex-1 text-left">{group.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-gray-400 transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {isOpen ? (
                      <div className="mt-0.5 space-y-0.5">
                        {group.items.map((item) => renderLeaf(item))}
                      </div>
                    ) : null}
                  </div>
                );
              })}

              {section.items?.map((item) => {
                const Icon = ITEM_ICONS[item.id] ?? LayoutGrid;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "relative mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2 py-2 transition-colors",
                      isActive
                        ? cn(
                            learnerNavSubItemActive,
                            "bg-[#eef2f9] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:rounded-full before:bg-dq-orange"
                          )
                        : cn(learnerNavGroup, "hover:bg-gray-50")
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-gray-500" />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t border-gray-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={profileAvatar || undefined} />
            <AvatarFallback className="bg-dq-navy text-xs text-white">
              {getInitials(profileName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className={cn(learnerNavSubItemActive, "truncate")}>
              {profileName || "Instructor"}
            </p>
            <p className={cn(learnerCaption, "truncate")}>{profileEmail || "Instructor"}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-gray-600 hover:text-dq-navy"
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}

export default InstructorDashboardSidebar;
