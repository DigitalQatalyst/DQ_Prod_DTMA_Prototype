import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  Bot,
  Building2,
  ChevronDown,
  Clock,
  Compass,
  GraduationCap,
  LayoutGrid,
  Link2,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import DTMALogo from "@/components/layout/DTMALogo";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";
import {
  learnerBadge,
  learnerCaption,
  learnerNavGroup,
  learnerNavSubItem,
  learnerNavSubItemActive,
  microLabel,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";

export type AdminTabId =
  | "getting-started"
  | "overview"
  | "users"
  | "courses"
  | "pending"
  | "invites"
  | "assessments"
  | "scheduling"
  | "enrollment"
  | "faculty"
  | "resources"
  | "system"
  | "communication"
  | "governance"
  | "organizations"
  | "certification"
  | "commerce"
  | "whatsapp-analytics"
  | "ai-usage"
  | "ai-cockpit";

type NavLeaf = {
  id: AdminTabId;
  label: string;
  badge?: number;
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

const ITEM_ICONS: Partial<Record<AdminTabId, LucideIcon>> = {
  courses: BookOpen,
  pending: Clock,
  assessments: Award,
  scheduling: GraduationCap,
  enrollment: Users,
  faculty: Users,
  communication: MessageSquare,
  users: Users,
  invites: UserPlus,
  governance: Shield,
  organizations: Building2,
  certification: Award,
  commerce: Settings,
  "whatsapp-analytics": MessageSquare,
  "ai-usage": Bot,
  "ai-cockpit": Bot,
  system: Settings,
};

function groupContainsTab(group: NavGroup, tab: AdminTabId) {
  return group.items.some((item) => item.id === tab);
}

type AdminDashboardSidebarProps = {
  activeTab: AdminTabId;
  onTabChange: (tab: AdminTabId) => void;
  onSignOut: () => void;
  profileName: string | null;
  profileEmail: string | null;
  profileAvatar?: string | null;
  pendingCount?: number;
  className?: string;
};

export function AdminDashboardSidebar({
  activeTab,
  onTabChange,
  onSignOut,
  profileName,
  profileEmail,
  profileAvatar,
  pendingCount = 0,
  className,
}: AdminDashboardSidebarProps) {
  const navSections: NavSection[] = [
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
          ],
        },
      ],
    },
    {
      id: "marketplace",
      label: "Marketplace",
      items: [
        { id: "courses", label: "Course Management" },
        {
          id: "pending",
          label: "Requests",
          badge: pendingCount > 0 ? pendingCount : undefined,
        },
      ],
    },
    {
      id: "workspaces",
      label: "Workspaces",
      items: [
        {
          id: "pending",
          label: "Pending Reviews",
          badge: pendingCount > 0 ? pendingCount : undefined,
        },
        { id: "assessments", label: "Assessments" },
        { id: "scheduling", label: "Training Delivery" },
        { id: "enrollment", label: "Enrollment" },
        { id: "faculty", label: "Faculty Operations" },
        { id: "communication", label: "Communication" },
      ],
    },
    {
      id: "platform",
      label: "Platform Management",
      groups: [
        {
          id: "administration",
          label: "Administration",
          icon: Settings,
          items: [
            { id: "users", label: "User Management" },
            { id: "invites", label: "Invites" },
            { id: "organizations", label: "Organizations" },
            { id: "governance", label: "Content Governance" },
            { id: "certification", label: "Certification" },
            { id: "commerce", label: "Commerce & Billing" },
            { id: "whatsapp-analytics", label: "WhatsApp Analytics" },
            { id: "ai-usage", label: "AI Usage Monitoring" },
            { id: "system", label: "System Settings" },
          ],
        },
      ],
    },
  ];

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navSections.forEach((section) => {
      section.groups?.forEach((group) => {
        initial[group.id] = groupContainsTab(group, activeTab);
      });
    });
    return initial;
  });

  useEffect(() => {
    navSections.forEach((section) => {
      section.groups?.forEach((group) => {
        if (groupContainsTab(group, activeTab)) {
          setOpenGroups((prev) => ({ ...prev, [group.id]: true }));
        }
      });
    });
  }, [activeTab]);

  const getInitials = (name: string | null) => {
    if (!name) return "A";
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
        key={`${item.id}-${item.label}`}
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
        {item.badge ? (
          <Badge className={cn(learnerBadge, "h-5 min-w-5 rounded-full bg-dq-orange px-1.5 text-white")}>
            {item.badge}
          </Badge>
        ) : null}
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

      <RoleSwitcher currentRole="admin" variant="light" />

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navSections.map((section) => (
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
                    {item.badge ? (
                      <Badge className={cn(learnerBadge, "h-5 min-w-5 rounded-full bg-dq-orange px-1.5 text-white")}>
                        {item.badge}
                      </Badge>
                    ) : null}
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
              {profileName || "Admin"}
            </p>
            <p className={cn(learnerCaption, "truncate")}>{profileEmail || "Administrator"}</p>
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

export default AdminDashboardSidebar;
