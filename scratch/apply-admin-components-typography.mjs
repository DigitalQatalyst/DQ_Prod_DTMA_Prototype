import fs from "fs";
import path from "path";

const root = path.resolve("src/components/admin");
const files = fs
  .readdirSync(root)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => path.join(root, f));

const tokens = [
  "learnerBody",
  "learnerBodyMuted",
  "learnerCaption",
  "learnerCardTitle",
  "learnerGroupLabel",
  "learnerItemTitle",
  "learnerKpiCard",
  "learnerKpiLabel",
  "learnerKpiValue",
  "learnerPanel",
  "learnerSectionHeading",
  "learnerBadge",
  "learnerIconWell",
];

const pairs = [
  ['className="text-[28px] leading-[36px] font-semibold text-[var(--dq-navy-950)]"', 'className={learnerSectionHeading}'],
  ['className="text-[28px] leading-[36px] font-semibold"', 'className={learnerSectionHeading}'],
  ['className="text-[24px] leading-[32px] font-medium"', 'className={learnerKpiValue}'],
  ['className="text-[24px] leading-[32px] font-semibold"', 'className={learnerKpiValue}'],
  ['className="text-[20px] leading-[28px] font-semibold text-[var(--dq-navy-950)]"', 'className={learnerSectionHeading}'],
  ['className="text-[20px] leading-[28px] font-medium"', 'className={learnerCardTitle}'],
  ['className="text-[16px] font-semibold text-foreground"', 'className={learnerItemTitle}'],
  ['className="text-[14px] leading-[20px] font-normal text-muted-foreground"', 'className={learnerBodyMuted}'],
  ['className="text-[14px] leading-[20px] font-normal"', 'className={learnerBody}'],
  ['className="text-[14px] font-semibold text-[var(--dq-navy-950)]"', 'className={learnerItemTitle}'],
  ['className="text-[14px] font-medium text-[var(--dq-navy-950)]"', 'className={learnerItemTitle}'],
  ['className="text-[12px] leading-[16px]"', 'className={learnerCaption}'],
  ['className="text-[12px] text-muted-foreground"', 'className={learnerCaption}'],
  ['className="text-[12px] text-[var(--dq-text-secondary)]"', 'className={learnerCaption}'],
  ['className="text-sm text-muted-foreground"', 'className={learnerBodyMuted}'],
  ['className="text-sm font-semibold"', 'className={learnerItemTitle}'],
  ['className="text-lg font-semibold"', 'className={learnerCardTitle}'],
  ['className="text-2xl font-bold"', 'className={learnerKpiValue}'],
];

for (const filePath of files) {
  let s = fs.readFileSync(filePath, "utf8");
  if (!s.includes("text-[") && !s.includes("text-lg font-semibold")) continue;

  const before = s;
  for (const [from, to] of pairs) {
    s = s.split(from).join(to);
  }

  if (s === before) continue;

  if (!s.includes("@/lib/brandAccent")) {
    s = s.replace(
      /import \{ cn \} from ["']@\/lib\/utils["'];/,
      `import { cn } from "@/lib/utils";\nimport {\n  ${tokens.join(",\n  ")},\n} from "@/lib/brandAccent";`
    );
    if (!s.includes("@/lib/brandAccent")) {
      s = `import { cn } from "@/lib/utils";\nimport {\n  ${tokens.join(",\n  ")},\n} from "@/lib/brandAccent";\n` + s;
    }
  } else if (!s.includes("learnerSectionHeading")) {
    s = s.replace(
      /import \{([^}]+)\} from ["']@\/lib\/brandAccent["'];/,
      (_, inner) => {
        const existing = inner.split(",").map((t) => t.trim()).filter(Boolean);
        const merged = [...new Set([...existing, ...tokens])].sort();
        return `import {\n  ${merged.join(",\n  ")},\n} from "@/lib/brandAccent";`;
      }
    );
  }

  if (!s.includes('import { cn }')) {
    s = s.replace(/^import /m, 'import { cn } from "@/lib/utils";\nimport ');
  }

  fs.writeFileSync(filePath, s);
  console.log("Updated", path.basename(filePath));
}
