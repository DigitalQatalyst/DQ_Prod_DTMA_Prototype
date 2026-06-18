import fs from "fs";
import path from "path";

const files = [
  "src/components/admin/InviteManagement.tsx",
  "src/components/admin/AIUsageMonitoringDashboard.tsx",
  "src/components/admin/WhatsAppAnalyticsDashboard.tsx",
];

const importBlock = `import { cn } from "@/lib/utils";
import {
  learnerBody,
  learnerBodyMuted,
  learnerBtnPrimary,
  learnerCaption,
  learnerCardTitle,
  learnerIconWell,
  learnerItemTitle,
  learnerKpiCard,
  learnerKpiLabel,
  learnerKpiValue,
  learnerPanel,
  learnerSectionHeading,
} from "@/lib/brandAccent";
`;

for (const rel of files) {
  const filePath = path.resolve(rel);
  let s = fs.readFileSync(filePath, "utf8");
  if (!s.includes("learnerKpiCard")) {
    const anchor = s.indexOf("import ");
    s = importBlock + s.slice(anchor);
  }

  // Remove duplicate in-panel page headers (shell provides title)
  s = s.replace(
    /\s*<div className="flex items-center justify-between">\s*<div>\s*<h2[^>]*>[^<]+<\/h2>\s*<p[^>]*>[^<]+<\/p>\s*<\/div>\s*/g,
    '\n      <div className="flex items-center justify-end">\n        '
  );

  const pairs = [
    ['className="text-[20px] leading-[28px] font-medium text-[#1e2348]"', 'className={learnerSectionHeading}'],
    ['className="text-[14px] leading-[20px] font-normal text-[#4B5563]"', 'className={learnerBodyMuted}'],
    ['className="text-[14px] leading-[20px] font-normal text-[#1e2348]"', 'className={learnerItemTitle}'],
    ['className="text-[12px] leading-[16px] font-medium text-[#9CA3AF]"', 'className={cn(learnerCaption, "font-medium")}'],
    ['className="text-[24px] leading-[32px] font-medium text-[#ff6b4d]"', 'className={cn(learnerKpiValue, "text-dq-orange")}'],
    ['className="text-[24px] leading-[32px] font-medium text-green-600"', 'className={cn(learnerKpiValue, "text-emerald-600")}'],
    ['className="text-[24px] leading-[32px] font-medium text-[#9CA3AF]"', 'className={cn(learnerKpiValue, "text-gray-400")}'],
    ['className="bg-white rounded-xl p-4 border border-[#E5E7EB]"', 'className={learnerKpiCard}'],
    ['className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--dq-surface-border-default)]"', 'className={learnerKpiCard}'],
    ['className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]"', 'className={learnerKpiCard}'],
    ['className="text-[32px] leading-[40px] font-bold text-[var(--dq-text-primary)]"', 'className={learnerKpiValue}'],
    ['className="text-[32px] leading-[40px] font-bold text-[#1e2348]"', 'className={learnerKpiValue}'],
    ['className="text-[13px] text-[var(--dq-text-secondary)] mt-1"', 'className={cn(learnerKpiLabel, "mt-1")}'],
    ['className="text-[13px] text-[#4B5563] mt-1"', 'className={cn(learnerKpiLabel, "mt-1")}'],
    ['className="text-[12px] text-[var(--dq-orange-500)] font-medium mt-2"', 'className={cn(learnerCaption, "mt-2 font-medium text-dq-orange")}'],
    ['className="text-[12px] text-[var(--dq-success)] font-medium mt-2"', 'className={cn(learnerCaption, "mt-2 font-medium text-emerald-600")}'],
    ['className="text-[12px] text-[var(--dq-text-primary)] font-medium mt-2"', 'className={cn(learnerCaption, "mt-2 font-medium text-dq-navy")}'],
    ['className="text-[12px] text-[#ff6b4d] font-medium mt-2"', 'className={cn(learnerCaption, "mt-2 font-medium text-dq-orange")}'],
    ['className="text-[12px] text-[#1e2348] font-medium mt-2"', 'className={cn(learnerCaption, "mt-2 font-medium text-dq-navy")}'],
    ['className="text-[18px] font-semibold text-[var(--dq-text-primary)]"', 'className={learnerSectionHeading}'],
    ['className="text-[13px] text-[var(--dq-text-secondary)] mt-1"', 'className={cn(learnerBodyMuted, "mt-1")}'],
    ['className="text-[13px] font-medium text-[var(--dq-text-primary)] max-w-[200px] truncate"', 'className={cn(learnerItemTitle, "max-w-[200px] truncate text-sm")}'],
    ['className="text-[20px] leading-[28px] font-medium mb-2 text-[#1e2348]"', 'className={cn(learnerSectionHeading, "mb-2")}'],
    ['className="bg-[#ff6b4d] hover:bg-[#fff0ed] hover:text-[#ff6b4d] text-white transition-colors"', 'className={learnerBtnPrimary}'],
    ['className="border border-[var(--dq-surface-border-default)] rounded-xl overflow-hidden bg-white"', 'className={cn(learnerPanel, "overflow-hidden")}'],
    ['<div className="w-12 h-12 rounded-xl bg-[var(--dq-orange-50)] flex items-center justify-center mb-3">', '<div className={cn(learnerIconWell, "mb-3 h-12 w-12 bg-orange-50")}>'],
  ];

  for (const [from, to] of pairs) {
    s = s.split(from).join(to);
  }

  fs.writeFileSync(filePath, s);
  console.log("Updated", rel);
}
