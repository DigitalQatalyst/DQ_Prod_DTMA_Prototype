import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRightLeft,
  Building2,
  Check,
  ChevronDown,
  GraduationCap,
  Presentation,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { useAuth, type AppRole } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type JourneyId = "learner" | "instructor" | "admin" | "academy-manager";

type Journey = {
  id: JourneyId;
  label: string;
  description: string;
  href: string;
  dashboardHref: string;
  icon: LucideIcon;
  matchPaths: string[];
};

export const DTMA_JOURNEYS: Journey[] = [
  {
    id: "learner",
    label: "Learner",
    description: "Browse courses and track your progress",
    href: "/auth",
    dashboardHref: "/dashboard",
    icon: GraduationCap,
    matchPaths: ["/auth", "/dashboard", "/learner-onboarding"],
  },
  {
    id: "instructor",
    label: "Instructor",
    description: "Create and deliver courses",
    href: "/auth/instructor",
    dashboardHref: "/dashboard",
    icon: Presentation,
    matchPaths: ["/auth/instructor", "/instructor-application", "/instructor"],
  },
  {
    id: "admin",
    label: "Admin",
    description: "Platform administration",
    href: "/admin",
    dashboardHref: "/admin",
    icon: Shield,
    matchPaths: ["/admin", "/auth/admin"],
  },
  {
    id: "academy-manager",
    label: "Academy Manager",
    description: "Institutional operations",
    href: "/sms-admin",
    dashboardHref: "/sms-admin",
    icon: Building2,
    matchPaths: ["/sms-admin", "/institution"],
  },
];

function journeyFromRole(
  role: AppRole,
  providerType?: "individual" | "institution"
): Journey {
  if (role === "admin") {
    return DTMA_JOURNEYS.find((journey) => journey.id === "admin") ?? DTMA_JOURNEYS[0];
  }

  if (role === "instructor") {
    if (providerType === "institution") {
      return DTMA_JOURNEYS.find((journey) => journey.id === "academy-manager") ?? DTMA_JOURNEYS[0];
    }
    return DTMA_JOURNEYS.find((journey) => journey.id === "instructor") ?? DTMA_JOURNEYS[0];
  }

  return DTMA_JOURNEYS.find((journey) => journey.id === "learner") ?? DTMA_JOURNEYS[0];
}

function resolveActiveJourney(
  pathname: string,
  role: AppRole | null,
  providerType?: "individual" | "institution"
): Journey {
  if (role) {
    return journeyFromRole(role, providerType);
  }

  const match =
    DTMA_JOURNEYS.find((journey) =>
      journey.matchPaths.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`)
      )
    ) ?? DTMA_JOURNEYS.find((journey) => journey.id === "learner");

  return match ?? DTMA_JOURNEYS[0];
}

const DASHBOARD_PATHS = ["/dashboard", "/admin", "/sms-admin"];

function isDashboardPath(pathname: string): boolean {
  return DASHBOARD_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

function journeyDestination(journey: Journey, pathname: string): string {
  return isDashboardPath(pathname) ? journey.dashboardHref : journey.href;
}

function destinationNeedsDemoSignIn(destination: string): boolean {
  return (
    destination === "/dashboard" ||
    destination === "/admin" ||
    destination === "/sms-admin"
  );
}

type JourneyContextSwitcherProps = {
  className?: string;
  variant?: "navbar" | "mobile";
  context?: "default" | "dashboard";
  onNavigate?: () => void;
};

const JourneyContextSwitcher = ({
  className,
  variant = "navbar",
  context = "default",
  onNavigate,
}: JourneyContextSwitcherProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, profile, signInAsDemo } = useAuth();
  const activeJourney = useMemo(
    () => resolveActiveJourney(location.pathname, role, profile?.provider_type),
    [location.pathname, role, profile?.provider_type]
  );

  const pathname = context === "dashboard" ? "/dashboard" : location.pathname;

  const handleJourneySelect = async (journey: Journey) => {
    if (journey.id === activeJourney.id) {
      onNavigate?.();
      return;
    }

    const destination = journeyDestination(journey, pathname);

    if (destinationNeedsDemoSignIn(destination)) {
      const { error } = await signInAsDemo(journey.id);
      if (error) return;
    }

    onNavigate?.();
    navigate(destination);
  };

  if (variant === "mobile") {
    return (
      <div className={cn("border-b border-gray-100 py-3", className)}>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
          Switch journey
        </p>
        <div className="space-y-1">
          {DTMA_JOURNEYS.map((journey) => {
            const Icon = journey.icon;
            const isActive = journey.id === activeJourney.id;

            return (
              <button
                key={journey.id}
                type="button"
                onClick={() => void handleJourneySelect(journey)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                  isActive ? "bg-gray-50" : "hover:bg-gray-50"
                )}
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <Icon className="h-4 w-4 text-dq-navy" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-sm font-medium text-dq-navy">
                    {journey.label}
                    {isActive ? <Check className="h-4 w-4 text-dq-orange" /> : null}
                  </span>
                  <span className="block text-xs leading-relaxed text-gray-500">
                    {journey.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center gap-1.5 rounded-full border border-[#c5cde8] bg-white/60 px-4 py-2 text-sm font-semibold text-dq-navy backdrop-blur-sm transition hover:border-[#a0aacc] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-orange focus-visible:ring-offset-2",
            className
          )}
        >
          <ArrowRightLeft size={14} aria-hidden />
          <span className="hidden sm:inline">Journey:</span>
          <span>{activeJourney.label}</span>
          <ChevronDown size={14} className="text-gray-500" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
          Switch journey
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {DTMA_JOURNEYS.map((journey) => {
          const Icon = journey.icon;
          const isActive = journey.id === activeJourney.id;

          return (
            <DropdownMenuItem
              key={journey.id}
              className="cursor-pointer p-0"
              onSelect={(event) => {
                event.preventDefault();
                void handleJourneySelect(journey);
              }}
            >
              <span className="flex w-full items-start gap-3 px-2 py-2.5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <Icon className="h-4 w-4 text-dq-navy" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-sm font-medium text-dq-navy">
                    {journey.label}
                    {isActive ? <Check className="h-4 w-4 text-dq-orange" /> : null}
                  </span>
                  <span className="block text-xs leading-relaxed text-gray-500">
                    {journey.description}
                  </span>
                </span>
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JourneyContextSwitcher;
