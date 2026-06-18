import { cn } from "@/lib/utils";

export type TabItem = { id: string; label: string };

export default function HorizontalTabs({
  tabs,
  activeId,
  onChange,
  className,
}: {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex gap-6 overflow-x-auto border-b border-gray-200 scrollbar-none", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative shrink-0 whitespace-nowrap pb-3 text-sm font-medium transition-colors",
            activeId === tab.id ? "text-dq-navy" : "text-gray-400 hover:text-dq-navy"
          )}
        >
          {tab.label}
          {activeId === tab.id ? (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-dq-orange" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
