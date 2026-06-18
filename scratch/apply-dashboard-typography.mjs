import fs from "fs";
import path from "path";

const root = path.resolve("src");

function patchFile(relPath, pairs, importTokens = []) {
  const filePath = path.join(root, relPath);
  let s = fs.readFileSync(filePath, "utf8");

  if (importTokens.length) {
    const marker = "from \"@/lib/brandAccent\";";
    const altMarker = "from '@/lib/brandAccent';";
    const useMarker = s.includes(marker) ? marker : altMarker;
    if (useMarker && s.includes(useMarker)) {
      const blockStart = s.indexOf("import {");
      const blockEnd = s.indexOf(useMarker);
      const importBlock = s.slice(blockStart, blockEnd);
      const missing = importTokens.filter((t) => !importBlock.includes(t));
      if (missing.length) {
        s = s.replace(useMarker, `${missing.join(",\n  ")},\n} ${useMarker.startsWith("from") ? useMarker : ""}`);
        // Fix broken import - simpler approach
      }
    }
  }

  for (const [from, to] of pairs) {
    s = s.split(from).join(to);
  }

  fs.writeFileSync(filePath, s);
  return filePath;
}

function ensureBrandImports(relPath, tokens) {
  const filePath = path.join(root, relPath);
  let s = fs.readFileSync(filePath, "utf8");
  const match = s.match(/import \{([^}]+)\} from ['"]@\/lib\/brandAccent['"];/);
  if (!match) return;
  const existing = match[1].split(",").map((t) => t.trim()).filter(Boolean);
  const merged = [...new Set([...existing, ...tokens])].sort();
  const replacement = `import {\n  ${merged.join(",\n  ")},\n} from '@/lib/brandAccent';`;
  s = s.replace(/import \{[^}]+\} from ['"]@\/lib\/brandAccent['"];/, replacement);
  fs.writeFileSync(filePath, s);
}

const adminPairs = [
  ['className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)]"', 'className={learnerSectionHeading}'],
  ['className="text-[28px] leading-[36px] font-semibold mb-6"', 'className={cn(learnerSectionHeading, "mb-6")}'],
  ['className="text-[28px] leading-[36px] font-semibold"', 'className={learnerSectionHeading}'],
  ['className="text-[24px] leading-[32px] font-semibold"', 'className={learnerKpiValue}'],
  ['className="text-[24px] leading-[32px] font-medium"', 'className={learnerKpiValue}'],
  ['className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]"', 'className={learnerSectionHeading}'],
  ['className="text-[20px] leading-[28px] font-semibold text-white"', 'className={cn(learnerSectionHeading, "text-white")}'],
  ['className="text-[20px] leading-[28px] font-medium text-white"', 'className={cn(learnerCardTitle, "text-white")}'],
  ['className="text-[20px] leading-[28px] font-medium mb-4"', 'className={cn(learnerCardTitle, "mb-4")}'],
  ['className="text-[20px] leading-[28px] font-medium"', 'className={learnerCardTitle}'],
  ['className="text-[16px] leading-[24px] font-semibold"', 'className={learnerItemTitle}'],
  ['className="text-[16px] leading-[24px] font-medium text-gray-700 mb-2"', 'className={cn(learnerItemTitle, "mb-2")}'],
  ['className="text-[16px] leading-[24px] font-medium text-gray-700"', 'className={learnerItemTitle}'],
  ['className="text-[14px] leading-[20px] font-normal text-muted-foreground mb-4"', 'className={cn(learnerBodyMuted, "mb-4")}'],
  ['className="text-[14px] leading-[20px] font-normal text-muted-foreground"', 'className={learnerBodyMuted}'],
  ['className="text-[14px] leading-[20px] font-normal text-white/80 mb-4"', 'className={cn(learnerBody, "text-white/80 mb-4")}'],
  ['className="text-[14px] leading-[20px] font-normal text-white/80"', 'className={cn(learnerBody, "text-white/80")}'],
  ['className="text-[14px] leading-[20px] font-normal"', 'className={learnerBody}'],
  ['className="text-[14px] leading-[20px] font-medium text-[var(--dq-text-secondary)]"', 'className={learnerBodyMuted}'],
  ['className="text-[14px] leading-[20px] font-medium text-gray-700 mb-2"', 'className={cn(learnerItemTitle, "text-sm mb-2")}'],
  ['className="text-[14px] leading-[20px] font-medium text-gray-700"', 'className={cn(learnerItemTitle, "text-sm")}'],
  ['className="text-[14px] leading-[20px] font-medium"', 'className={cn(learnerItemTitle, "text-sm")}'],
  ['className="text-[14px] leading-[20px] font-semibold text-[var(--dq-navy-950)]"', 'className={learnerItemTitle}'],
  ['className="text-[12px] leading-[16px] text-[var(--dq-text-disabled)]"', 'className={learnerCaption}'],
  ['className="text-[12px] leading-[16px] text-gray-500 mt-2 text-center"', 'className={cn(learnerCaption, "mt-2 text-center")}'],
  ['className="text-[12px] leading-[16px]"', 'className={learnerCaption}'],
];

ensureBrandImports("pages/dashboard/AdminDashboard.tsx", [
  "learnerCardTitle",
  "learnerItemTitle",
  "learnerCaption",
  "learnerGroupLabel",
  "learnerBtnPrimary",
]);
patchFile("pages/dashboard/AdminDashboard.tsx", adminPairs);

const smsFiles = [
  "components/sms/SMSOverviewPanel.tsx",
  "components/sms/SMSCoursesPanel.tsx",
  "components/sms/SMSFacultyPanel.tsx",
  "components/sms/SMSStudentsPanel.tsx",
  "components/sms/SMSFinancePanel.tsx",
  "components/sms/SMSBillingPanel.tsx",
  "components/sms/SMSPartnersPanel.tsx",
  "components/sms/SMSCompliancePanel.tsx",
  "components/sms/SMSStaffPanel.tsx",
];

const smsPairs = [
  ['className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3"', 'className={cn(learnerGroupLabel, "mb-3")}'],
  ['className="text-[24px] leading-[32px] font-medium"', 'className={learnerKpiValue}'],
  ['className="text-[14px] leading-[20px] font-medium text-slate-700"', 'className={cn(learnerItemTitle, "text-sm")}'],
  ['className="text-[12px] leading-[16px] mt-0.5 text-slate-500', 'className={cn(learnerCaption, "mt-0.5"'],
  ['className="text-[12px] leading-[16px] mt-0.5', 'className={cn(learnerCaption, "mt-0.5"'],
  ['className="text-[12px] leading-[16px]"', 'className={learnerCaption}'],
  ['className="text-sm font-semibold text-slate-700', 'className={cn(learnerItemTitle, "text-sm"'],
  ['className="text-sm text-slate-800', 'className={cn(learnerBody, "text-dq-navy"'],
  ['className="text-sm font-medium text-slate-900"', 'className={learnerItemTitle}'],
  ['className="text-sm text-slate-800 truncate', 'className={cn(learnerBody, "text-dq-navy truncate"'],
  ['className="text-xs text-slate-500"', 'className={learnerCaption}'],
  ['className="text-xs text-slate-400', 'className={cn(learnerCaption, "text-gray-400"'],
  ['bg-card rounded-2xl p-6 shadow-sm border border-slate-200/80', 'className={cn(learnerKpiCard, "cursor-pointer transition-colors hover:border-gray-300")}'],
];

for (const file of smsFiles) {
  ensureBrandImports(file, [
    "learnerKpiCard",
    "learnerKpiValue",
    "learnerKpiLabel",
    "learnerIconWell",
    "learnerGroupLabel",
    "learnerItemTitle",
    "learnerBody",
    "learnerBodyMuted",
    "learnerCaption",
    "learnerSectionHeading",
    "learnerCardTitle",
    "learnerPanel",
  ]);
  let s = fs.readFileSync(path.join(root, file), "utf8");
  if (!s.includes('import { cn }')) {
    s = s.replace(/import \{ cn \} from "@\/lib\/utils";/, 'import { cn } from "@/lib/utils";\n');
  }
  for (const [from, to] of smsPairs) {
    s = s.split(from).join(to);
  }
  // Fix broken kpi card replacement - the script may have broken div tags
  fs.writeFileSync(path.join(root, file), s);
}

console.log("Typography patch complete");
