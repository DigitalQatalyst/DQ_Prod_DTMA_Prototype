import fs from "fs";
import path from "path";

const filePath = path.resolve("src/pages/dashboard/AdminDashboard.tsx");
let s = fs.readFileSync(filePath, "utf8");

const pairs = [
  ['className="text-[16px] font-semibold text-foreground"', 'className={learnerItemTitle}'],
  ['className="text-[16px] font-semibold text-foreground mb-4"', 'className={cn(learnerItemTitle, "mb-4")}'],
  ['className="font-semibold text-[16px]"', 'className={learnerItemTitle}'],
  ['className="text-[20px] font-semibold text-[var(--dq-navy-950)]"', 'className={learnerSectionHeading}'],
  ['className="text-[20px] font-semibold text-foreground"', 'className={learnerSectionHeading}'],
  ['className="text-[20px] font-bold text-foreground"', 'className={learnerKpiValue}'],
  ['className="text-[14px] font-semibold text-foreground"', 'className={learnerItemTitle}'],
  ['className="text-[14px] font-semibold text-[var(--dq-navy-950)]"', 'className={learnerItemTitle}'],
  ['className="font-semibold text-[14px] text-foreground"', 'className={learnerItemTitle}'],
  ['className="font-medium text-[14px] text-[var(--dq-navy-950)] truncate"', 'className={cn(learnerItemTitle, "truncate")}'],
  ['className="text-[14px] font-medium text-[var(--dq-navy-950)]"', 'className={learnerItemTitle}'],
  ['className="text-[14px] text-[var(--dq-text-disabled)]"', 'className={learnerCaption}'],
  ['className="text-[12px] text-[var(--dq-text-secondary)]"', 'className={learnerCaption}'],
  ['className="text-[12px] text-muted-foreground"', 'className={learnerCaption}'],
  ['className="text-[12px] text-muted-foreground mt-0.5"', 'className={cn(learnerCaption, "mt-0.5")}'],
  ['className="text-[12px] text-muted-foreground w-14 text-right flex-shrink-0"', 'className={cn(learnerCaption, "w-14 text-right shrink-0")}'],
  ['className="text-[12px] font-medium text-muted-foreground"', 'className={cn(learnerCaption, "font-medium")}'],
  ['className="text-[12px] font-medium text-foreground block mb-1"', 'className={cn(learnerCaption, "font-medium text-dq-navy block mb-1")}'],
  ['className="text-[12px] font-semibold text-emerald-600 uppercase tracking-wide"', 'className={cn(learnerGroupLabel, "text-emerald-600")}'],
  ['className="text-[12px] font-semibold text-red-500 uppercase tracking-wide mt-3"', 'className={cn(learnerGroupLabel, "text-red-500 mt-3")}'],
  ['className="text-[12px] font-semibold text-red-500 uppercase tracking-wide"', 'className={cn(learnerGroupLabel, "text-red-500")}'],
  ['className="text-[12px] text-[var(--dq-text-disabled)]"', 'className={learnerCaption}'],
  ['className="text-[12px] px-2 py-0.5 rounded-full bg-[var(--dq-gray-100)] text-[var(--dq-navy-950)] font-medium capitalize"', 'className={cn(learnerBadge, "rounded-full bg-gray-100 px-2 py-0.5 capitalize text-dq-navy")}'],
  ['className="text-center py-12 text-[14px] text-[var(--dq-text-disabled)]"', 'className={cn("py-12 text-center", learnerBodyMuted)}'],
  ['className="text-center py-10 text-[14px] text-[var(--dq-text-disabled)]"', 'className={cn("py-10 text-center", learnerBodyMuted)}'],
  ['className="text-[12px] text-[var(--dq-text-secondary)] max-w-[160px] truncate"', 'className={cn(learnerCaption, "max-w-[160px] truncate")}'],
  ['className="px-3 py-1.5 border border-border rounded-lg text-[12px] text-muted-foreground hover:bg-muted transition-colors flex items-center gap-1.5 whitespace-nowrap"', 'className={cn(learnerCaption, "flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-200 px-3 py-1.5 text-gray-500 transition-colors hover:bg-gray-50")}'],
  ['className="text-[12px] text-muted-foreground"', 'className={learnerCaption}'],
  ['className="text-[14px] text-muted-foreground"', 'className={learnerBodyMuted}'],
  ['className="text-[12px] text-muted-foreground"', 'className={learnerCaption}'],
  ['className="text-[24px] leading-[32px] font-bold"', 'className={learnerKpiValue}'],
  ['className="text-[13px] font-medium"', 'className={cn(learnerCaption, "font-medium")}'],
  ['className="font-bold text-[15px]"', 'className={cn(learnerItemTitle, "text-[15px]")}'],
];

for (const [from, to] of pairs) {
  const count = s.split(from).length - 1;
  if (count > 0) {
    s = s.split(from).join(to);
    console.log(`Replaced ${count}x: ${from.slice(0, 60)}`);
  }
}

// table header cells
s = s.replace(
  /className="text-left px-4 py-2\.5 text-\[12px\] font-medium text-muted-foreground whitespace-nowrap"/g,
  'className={cn("px-4 py-2.5 text-left whitespace-nowrap", learnerCaption, "font-medium")}'
);
s = s.replace(
  /className="text-left px-4 py-3 text-\[12px\] font-medium text-white whitespace-nowrap"/g,
  'className={cn("px-4 py-3 text-left whitespace-nowrap", learnerCaption, "font-medium text-white")}'
);

fs.writeFileSync(filePath, s);
console.log("Pass 2 done");
