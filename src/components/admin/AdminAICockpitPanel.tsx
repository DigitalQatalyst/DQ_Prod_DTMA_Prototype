import { ChevronRight, LayoutGrid } from "lucide-react";
import { TransactAI } from "@/components/mentor/TransactAI";
import {
  ADMIN_AI_CAPABILITIES,
  type AdminAICapabilityId,
} from "@/components/admin/adminAICapabilities";
import {
  learnerBodyMuted,
  learnerItemTitle,
  learnerPanel,
  learnerSectionHeading,
} from "@/lib/brandAccent";
import { cn } from "@/lib/utils";

type AdminAICockpitPanelProps = {
  selectedCapability: AdminAICapabilityId | null;
  onSelectCapability: (capability: AdminAICapabilityId | null) => void;
  pendingReviewsCount?: number;
};

export function AdminAICockpitPanel({
  selectedCapability,
  onSelectCapability,
  pendingReviewsCount = 0,
}: AdminAICockpitPanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <TransactAI
        key={selectedCapability ?? "hub"}
        embedded
        variant="admin"
        pendingReviewsCount={pendingReviewsCount}
        adminCapability={selectedCapability}
        onCapabilitySelect={(capability) => onSelectCapability(capability)}
        onClearCapability={() => onSelectCapability(null)}
      />

      <div className={cn(learnerPanel, "p-5")}>
        <h3 className={cn(learnerSectionHeading, "mb-1")}>AI capabilities</h3>
        <p className={cn(learnerBodyMuted, "mb-4")}>
          Select a capability to load it in the cockpit on the left.
        </p>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onSelectCapability(null)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors",
              selectedCapability === null
                ? "border-dq-orange/30 bg-orange-50"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
              <LayoutGrid className="h-4 w-4 text-dq-navy" />
            </div>
            <div className="min-w-0 flex-1">
              <p className={learnerItemTitle}>Cockpit hub</p>
              <p className={cn(learnerBodyMuted, "text-xs")}>
                Platform overview and routing to any AI tool
              </p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
          </button>

          {ADMIN_AI_CAPABILITIES.map((capability) => {
            const Icon = capability.icon;
            const isActive = selectedCapability === capability.id;

            return (
              <button
                key={capability.id}
                type="button"
                onClick={() => onSelectCapability(capability.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors",
                  isActive
                    ? "border-dq-orange/30 bg-orange-50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                  <Icon className="h-4 w-4 text-dq-navy" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={learnerItemTitle}>{capability.label}</p>
                  <p className={cn(learnerBodyMuted, "text-xs")}>{capability.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminAICockpitPanel;
