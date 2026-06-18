import fs from "fs";
import path from "path";

const filePath = path.resolve("src/pages/dashboard/AdminDashboard.tsx");
let s = fs.readFileSync(filePath, "utf8");

const tokens = [
  "learnerBody",
  "learnerBodyMuted",
  "learnerBtnPrimary",
  "learnerCaption",
  "learnerCardTitle",
  "learnerGroupLabel",
  "learnerIconWell",
  "learnerItemTitle",
  "learnerKpiCard",
  "learnerKpiLabel",
  "learnerKpiValue",
  "learnerPageDescription",
  "learnerPageTitle",
  "learnerPanel",
  "learnerSectionHeading",
  "learnerWorkspaceBg",
];

const importMatch = s.match(/import \{([^}]+)\} from '@\/lib\/brandAccent';/);
if (importMatch) {
  const existing = importMatch[1]
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const merged = [...new Set([...existing, ...tokens])].sort();
  s = s.replace(
    /import \{[^}]+\} from '@\/lib\/brandAccent';/,
    `import {\n  ${merged.join(",\n  ")},\n} from '@/lib/brandAccent';`
  );
}

const pairs = [
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

for (const [from, to] of pairs) {
  const count = s.split(from).length - 1;
  if (count > 0) {
    s = s.split(from).join(to);
    console.log(`Replaced ${count}x: ${from.slice(0, 50)}...`);
  }
}

fs.writeFileSync(filePath, s);
console.log("Done");
