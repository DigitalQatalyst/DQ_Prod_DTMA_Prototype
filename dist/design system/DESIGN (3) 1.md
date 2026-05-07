# Design System: DigitalQatalyst (DQ DXP)

> **Version:** 1.2.0 | **Status:** Active | **Last updated:** 2026-04-28
>
> This file is the single source of truth for the DQ visual design system.
> Drop it into any project root and tell your AI agent "build UI that matches this DESIGN.md."
> It covers the full DQ Digital Experience Platform: corporate website, marketplace, insight hub,
> academy entry, sector pages, diagnostics, and product gateways.
>
> **v1.2.0 — Additive dynamic system.** This release layers Webflow/Linear/Framer/Vercel/Stripe-class
> dynamic patterns on top of the existing brand: tokenised navy/orange gradient mesh on hero/CTA/diagnostic
> surfaces (§1 carve-out), kinetic typography (§3a), glass and glow surfaces (§6a), bento grid (§11a),
> marquee (§11b), scroll storytelling (§11c), an expanded motion vocabulary (§13), and a vestibular-safety
> rule for parallax/scroll-jacking (§14). All v1.1.0 rules remain in force unless explicitly amended.

---

## DQ Design System Guidelines

> This section captures the design system approach, principles, and usage model.
> The detailed technical specification follows in the sections below.

### 1. Purpose

The DQ Design System is the shared design foundation for DigitalQatalyst internal platforms, external websites, client projects, products, prototypes, and applied digital experiences.

It exists to reduce one-off design decisions, speed up delivery, improve consistency, and give DQ a reusable foundation for owned products and client delivery.

### 2. Core Approach

DQ uses a **foundations-first, token-led, reusable system** approach.

The foundations include: Colour · Typography · Spacing · Radius · Shadows · Surfaces · Layout grid · Iconography · Motion · Accessibility · Components · Applied examples

### 3. One System, Multiple Expressions

The core principle is: **One system, multiple expressions.**

The same system structure supports:
- DQ corporate website
- DQ products and internal platforms
- DQ external platforms and marketplaces
- Dashboards and admin tools
- Client websites and platforms
- Prototypes and demos

For DQ-owned experiences, use DQ brand tokens. For client projects, reuse the same token structure with client-specific brand values.

### 4. Token-Led Design

Design tokens are the source of truth. **The token name is the contract. The raw value is only the implementation detail.**

Key tokens:
```css
--dq-navy-950:   #030F35;
--dq-orange-500: #FB5535;
--dq-white:      #FFFFFF;
--dq-radius-xl:  12px;
```

### 5. Colour Guidelines

Organise colours by role: **Brand · Surface · Text · Semantic Status**

- DQ Navy / `--dq-navy-950` / `#030F35` — primary brand, headings, dark surfaces
- DQ Orange / `--dq-orange-500` / `#FB5535` — CTA, highlights, active states, brand accent
- DQ White / `--dq-white` / `#FFFFFF` — page canvas, card base, light surfaces

Semantic Status (feedback and system indicators only — not brand colours):
- Success / `--dq-success` / `#198754`
- Warning / `--dq-warning` / `#F59E0B`
- Error / `--dq-error` / `#DC2626`
- Info / `--dq-info` / `#3B6EEA`

> **Rule:** DQ Orange is a brand accent and CTA colour. It must not be treated as a semantic status colour.

### 6. Typography Guidelines

**Font:** Plus Jakarta Sans

Type scale:

| Role | Token | Size | Weight |
| ---- | ----- | ---- | ------ |
| Display Hero | `--display-lg` | 3rem | 700 |
| Section Heading | `--display-sm` | 1.875rem | 600 |
| Card Title | `--title-lg` | 1.25rem | 600 |
| Sub-heading | `--title-sm` | 1rem | 600 |
| Body Text | `--body-md` | 1rem | 400 |
| Caption | `--caption` | 0.75rem | 400 |

Applied landing pages can use responsive Display Hero sizing, but must remain aligned to the type system.

### 7. Layout and Density Guidelines

**Density: Open / Comfortable** (current standard)

| Rule | Value | Code |
| ---- | ----- | ---- |
| Max container | 1440px | `max-w-[1440px]` |
| Page padding | 32–80px | `px-8 lg:px-16 2xl:px-20` |
| Section spacing | 64–80px | `py-16 lg:py-20` |
| Desktop grid | 12 columns | `gap-6` |
| Tablet grid | 6 columns | `gap-4` |
| Mobile grid | 4 columns | `gap-3` |

Compact density is reserved for future dashboards, admin tools, and data-heavy operational views.

### 8. Spacing, Margin, and Padding Guidelines

Base unit: 8px

| Rule | Value |
| ---- | ----- |
| Page padding | 32–80px |
| Section spacing | 64–80px |
| Standard grid gap | 24px (`gap-6`) |
| Compact grid gap | 16px (`gap-4`) |
| Standard card padding | 24px (`p-6`) |
| Feature card padding | 32px (`p-8`) |
| Form field gap | 16px (`space-y-4`) |
| Button padding | 12px 20px |

### 9. Border Radius Guidelines

**DQ standard radius: `xl` / 12px**

Use 12px for cards, panels, inputs, and key interface surfaces.

| Token | Value | Use |
| ----- | ----- | --- |
| `rounded-sm` | 4px | Compact technical UI |
| `rounded-md` | 6px | Small controls |
| `rounded-lg` | 8px | Restrained panels |
| `rounded-xl` | 12px | **DQ Standard** |
| `rounded-2xl` | 16px | Expressive showcase surfaces |
| `rounded-full` | 9999px | Pills, avatars, circular controls |

### 10. Shadow Guidelines

**DQ standard shadow: Medium**

Use Medium for cards, panels, applied examples, and key interface surfaces. Glow is special emphasis only.

### 11. Iconography Guidelines

DQ uses Lucide icons with a customised 1.5px stroke for a lighter enterprise feel.

> Lucide default is 24px / 2px stroke. DQ uses a 1.5px stroke override.

| Property | Value |
| -------- | ----- |
| Library | Lucide |
| Size | 24px |
| Stroke | 1.5px |
| Style | Outline |
| Default | DQ Navy `#030F35` |
| Active | DQ Orange `#FB5535` |
| Muted | `#8A91A6` |
| Semantic | Status icons only |

> **Rule:** Use icons only when they improve recognition, scanability, or state feedback. Do not use icons as decoration.

### 12. Motion Guidelines

DQ motion should be subtle, purposeful, and reduced-motion safe.

Tokens:
- `--motion-fast`: 150ms
- `--motion-base`: 250ms
- `--motion-slow`: 400ms
- `--ease-out`
- `--ease-in-out`

### 13. Accessibility Guidelines

- Visible focus states on all interactive elements
- Readable contrast (WCAG AA minimum, AAA for body text)
- Accessible semantic status labels
- Disabled states remain understandable
- No meaning relies on colour alone
- Buttons and CTAs always have visible text labels

### 14. Component Guidelines

DQ components follow a shadcn/ui-style primitive approach. Key components: Button · Card · Input · Badge · Tabs · Dialog · Table · Navigation · Form controls.

Each component should document: purpose · usage · variants · states · accessibility notes · DQ usage guidance.

### 15. Applied Example Guidelines

Applied examples prove the system works in real pages.

Current applied example: `/design-preview/examples/dxp-growth-engine`

Applied examples should show: hero sections · cards · CTAs · forms · dark surfaces · product/platform storytelling · footer layouts · real DQ-style content.

### 16. Client Project Adaptation

For DQ-owned work, use DQ brand tokens. For client work, reuse the same system structure but swap the brand layer.

```
DQ brand layer:     --dq-navy-950, --dq-orange-500, --dq-white
Client brand layer: --brand-primary, --brand-accent, --brand-surface
```

The system structure stays the same; the brand expression adapts.

### 17. Design System Application Approaches

**A. Generate a Design System from Scratch**
Foundations → Tokens → Components → Patterns → Examples

**B. Optimise for DQ-Owned Platforms** (DXP, DIA, DWS, corporate website, marketplaces, dashboards)
DQ Base → Platform Fit → Pattern Extension → Build Alignment

**C. Optimise for DQ Client Projects** (client websites, platforms, products, prototypes)
DQ Structure → Client Brand Mapping → Accessibility Check → Prototype Validation

### 18. Reference-Led Build Inputs

The design system was shaped through a reference-led approach using:
- [getdesign.md](https://getdesign.md) — reference for simple visual DESIGN.md-style preview pages
- VoltAgent / awesome-design-md — reference for AI-readable DESIGN.md structure
- nextlevelbuilder / ui-ux-pro-max-skill — reference for improving AI-generated UI/UX quality

> These references informed structure and quality. They were not copied. The final system is adapted to DQ brand, DQ platform logic, and DQ delivery needs.

### 19. Governance

- Use feature branches for experimental pages
- Do not merge random or duplicated design-preview pages into the shared branch
- Remove obsolete routes and links
- Do not delete shared UI primitives
- Document new token/component decisions before making them standard

### 20. Phase 1 vs Future Scope

Phase 1 proves the system. Later phases deepen it.

Future phases include: deeper component pages · pattern library · DXP blocks · voice and tone · theme playground · token inspector · advanced component playground · API tables · source snippets.

---

---

## 1. Visual Theme & Atmosphere

DigitalQatalyst's design system is built on a single, powerful tension: the **gravity of deep navy** (`#030f35`) against the **energy of catalyst orange** (`#fb5535`). The navy anchors, reassures, and projects enterprise-grade authority — it is the colour of conviction, of depth, of serious intellectual work. The orange propels, activates, and signals forward momentum — it is the colour of transformation, catalyst energy, and decisive action. White space is the third voice: clinical precision that gives both colours room to speak.

This is **premium B2B enterprise design** — neither the cold, sterile minimalism of a consultancy nor the playful gradient-heavy aesthetic of a consumer SaaS. It is something more deliberate: a visual language strong enough to hold a C-suite homepage, a dense marketplace grid, a thought-leadership article, an executive diagnostic, and a product gateway — all under one coherent system.

The platform targets executives, policymakers, architects, transformation leaders, builders, operators, and learners. Every component, shadow, spacing decision, and typographic choice is calibrated to signal credibility before content is read.

**Typographic anchor:** **Plus Jakarta Sans** — a geometric variable font that scales from 72px hero display to 11px overline without losing character. Its slightly squared curves carry authority without stiffness. It is engineered-feeling, not styled. A single typeface covers all surfaces: marketing headlines, product UI, data tables, and form labels. **JetBrains Mono** handles all code and technical strings.

**Key characteristics:**
- Deep navy `#030f35` as the dominant anchor — hero backgrounds on dark mode, primary headings on light mode
- Catalyst orange `#fb5535` exclusively for primary CTAs, brand moments, and conversion signals — never decorative
- White `#ffffff` canvas on light mode — maximum contrast, clinical precision
- Navy-tinted shadows — elevation that feels on-brand, not generic
- Dark mode: navy IS the canvas; orange remains the sole action colour
- No decorative gradients on primary surfaces — depth comes from layered surfaces and strategic contrast
- **Gradient mesh carve-out (v1.2.0 additive-dynamic):** A tokenised navy/orange mesh is permitted on the hero, full-width CTA bands, and the diagnostic entry block, using `--mesh-hero-light`, `--mesh-hero-dark`, and `--mesh-cta-orange`. Mesh is never used on cards, body text surfaces, or content surfaces, and never uses non-brand chroma (no AI purple/pink, no rainbow). Text on mesh must clear WCAG AA (4.5:1 body, 3:1 large) against a representative sample of the mesh
- High-contrast, accessible pairings throughout (WCAG AA minimum, AAA for body text)
- 8px base grid — all spacing is a multiple of 4px minimum

---

## 2. Color Palette & Roles

### Primary Brand

| Name | Hex | OKLCH (approx) | Role |
|------|-----|----------------|------|
| **DQ Navy** | `#030f35` | `oklch(0.12 0.082 264)` | Primary brand dark; dark-mode canvas; primary headings on light |
| **DQ Orange** | `#fb5535` | `oklch(0.65 0.208 29)` | Primary CTA; brand accent; conversion signals |
| **Pure White** | `#ffffff` | `oklch(1.00 0 0)` | Light-mode canvas; text on dark surfaces |

### Navy Scale

| Token | Hex | Use |
|-------|-----|-----|
| `navy-950` | `#030f35` | Brand / dark canvas / primary headings |
| `navy-900` | `#050e4a` | Dark hero alternate |
| `navy-800` | `#0a1a6e` | Dark section backgrounds |
| `navy-700` | `#0d2199` | Interactive navy on dark |
| `navy-600` | `#1130bb` | Links on dark / hover states |
| `navy-500` | `#1e45d4` | Mid-range interactive elements |
| `navy-400` | `#4468e3` | Lighter links and accents |
| `navy-300` | `#7a97ee` | Decorative / disabled navy |
| `navy-200` | `#b5c5f7` | Tinted borders on dark |
| `navy-100` | `#e8edfb` | Light navy surface tint |
| `navy-50` | `#f3f5fd` | Subtle page background tint |

### Orange Scale

| Token | Hex | Use |
|-------|-----|-----|
| `orange-950` | `#6e1a06` | Darkest orange — rare emphasis |
| `orange-900` | `#a6270d` | Dark orange text on light |
| `orange-800` | `#c93515` | Strong orange text |
| `orange-700` | `#e04020` | Orange on hover (dark surfaces) |
| `orange-600` | `#f24c2a` | Button hover state |
| `orange-500` | `#fb5535` | **Brand orange** — CTAs |
| `orange-400` | `#fc7256` | Lighter accent |
| `orange-300` | `#fd9478` | Decorative / illustration |
| `orange-200` | `#feb9a7` | Orange surface tint |
| `orange-100` | `#fde5df` | Light orange surface |
| `orange-50` | `#fff5f2` | Barely-orange background |

### Neutral Scale (cool — subtle navy undertone throughout)

| Token | Hex | Use |
|-------|-----|-----|
| `gray-950` | `#09090f` | Near-black text on white |
| `gray-900` | `#111118` | Primary body text |
| `gray-800` | `#1e1e2d` | Strong secondary text |
| `gray-700` | `#2e2e42` | Secondary body text |
| `gray-600` | `#454560` | Tertiary text, labels |
| `gray-500` | `#5f607f` | Placeholder text, muted |
| `gray-400` | `#8385a1` | Disabled text |
| `gray-300` | `#b0b2c8` | Borders (strong) |
| `gray-200` | `#d8d9e6` | Borders (default) |
| `gray-100` | `#eeeff6` | Borders (subtle), dividers |
| `gray-50` | `#f6f6fb` | Surface background |

### Semantic Colors

| Name | Hex | Surface Hex | Text Hex | Use |
|------|-----|-------------|----------|-----|
| **Success** | `#16a34a` | `#dcfce7` | `#15803d` | Confirmation, completion, active status |
| **Warning** | `#d97706` | `#fef3c7` | `#b45309` | Caution, pending, review needed |
| **Error** | `#dc2626` | `#fee2e2` | `#b91c1c` | Validation failure, destructive, critical |
| **Info** | `#2563eb` | `#dbeafe` | `#1d4ed8` | Informational, neutral notice |

### Product Identity Tokens

Each DQ product has a dedicated accent derived from the brand palette. These are used exclusively on product cards (top border), product badge backgrounds, and product navigation indicators. Orange remains the universal CTA colour — product accents are identity markers only, never interactive states.

| Product | Code | Accent Token | OKLCH | Role |
|---------|------|--------------|-------|------|
| DT Market Intelligence | DTMI | `navy-700` | `oklch(0.22 0.140 264)` | Insight, data depth |
| DT Market Architecture | DTMA | `navy-600` | `oklch(0.28 0.155 264)` | Structural, blueprint blue |
| DT Market Builder | DTMB | `navy-500` | `oklch(0.35 0.160 264)` | Informational, knowledge |
| DT Market Platform | DTMP | `navy-950` | `oklch(0.12 0.082 264)` | Platform authority (brand navy) |
| DT Org for Transformation | DTO4T | `orange-500` | `oklch(0.65 0.208 29)` | Catalyst energy (brand orange) |
| TMaaS | TMaaS | `navy-400` | `oklch(0.48 0.130 264)` | Service accessibility |
| DT Market Command Centre | DTMCC | `navy-800` | `oklch(0.18 0.120 264)` | Command, enterprise gravity |

**Usage rules:**
- Product card `border-top`: `4px solid <product-accent>`
- Product badge: `background: <product-accent>-tint` (10% opacity), `color: <product-accent>`
- Product nav indicator: `2px solid <product-accent>` bottom border on active tab
- Do **not** mix product accents — each product context uses its own accent exclusively

---

### Surface Layers

**Light mode (primary):**

| Layer | Hex | Use |
|-------|-----|-----|
| Page background | `#ffffff` | Main page canvas |
| Surface-1 | `#f6f6fb` | Default card, sidebar |
| Surface-2 | `#ffffff` + shadow-md | Elevated card, dropdown |
| Surface-3 | `#ffffff` + shadow-lg | Modal, overlay |
| Surface-navy | `#030f35` | Dark hero sections, full-width bands |
| Border-subtle | `#eeeff6` | Dividers, inner borders |
| Border-default | `#d8d9e6` | Card outlines, input borders |
| Border-strong | `#b0b2c8` | Prominent separators |

**Dark mode (secondary — navy as canvas):**

| Layer | Hex / Value | Use |
|-------|-------------|-----|
| Page background | `#030f35` | Canvas |
| Surface-1 | `#060e44` | Cards on navy |
| Surface-2 | `#0a1a6e` | Elevated cards |
| Surface-3 | `#0d2199` | Hover states, active panels |
| Border-subtle | `rgba(255,255,255,0.06)` | Inner borders |
| Border-default | `rgba(255,255,255,0.12)` | Card outlines |
| Border-strong | `rgba(255,255,255,0.22)` | Prominent separators |
| Text-primary | `#ffffff` | Main text |
| Text-secondary | `#b5c5f7` | Secondary text (navy-200) |
| Text-tertiary | `#7a97ee` | Muted text (navy-300) |

---

## 3. Typography Rules

### Font Family

```css
--font-sans: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", ui-monospace, "SF Mono", monospace;
```

**Variable font axes (Plus Jakarta Sans):**
- Weight range: 200–800 (variable)
- Available weights: 200 ExtraLight, 300 Light, 400 Regular, 500 Medium, 600 SemiBold, 700 Bold, 800 ExtraBold
- Use 700 for all display and hero headings
- Use 600 for all sub-headings and UI component labels
- Use 500 for body emphasis, nav links, button text
- Use 400 for all body text and captions
- Never go below 400 for body; never use 800 for body

**OpenType features:**
```css
/* Apply to all Plus Jakarta Sans text */
font-feature-settings: "kern" 1, "liga" 1, "calt" 1;

/* Tabular numerals — apply to all numeric data displays: stats, tables, dashboards */
font-feature-settings: "kern" 1, "tnum" 1;
```
- `"kern"` — kerning adjustment (always on; improves letterfitting at all sizes)
- `"liga"` — standard ligatures (e.g. `fi`, `fl` — on for body text)
- `"calt"` — contextual alternates (on globally; subtle glyph adjustments in context)
- `"tnum"` — tabular numerals: apply on all numeric tables, stat displays, dashboard figures. Ensures digits occupy equal horizontal space so columns align. **Never mix tnum and proportional numbers in the same table.**

**Letter-spacing progression formula:**
Negative tracking tightens proportionally with size. The ratio is approximately `−0.022em`:

| Size | Calculated | Rounded | Rule |
|------|-----------|---------|------|
| 72px | −1.58px | **−1.5px** | Display XL |
| 60px | −1.32px | **−1.2px** | Display L |
| 48px | −1.06px | **−0.96px** | Display M |
| 36px | −0.79px | **−0.54px** | Heading 1 |
| 30px | −0.66px | **−0.30px** | Heading 2 |
| 24px | −0.53px | **−0.24px** | Heading 3 |
| 20px | −0.44px | **−0.20px** | Heading 4 |
| 18px or smaller | 0 | **0** | Body and below |

Release to `0` at 18px and below — tight tracking harms readability at body sizes.

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&family=JetBrains+Mono:wght@400;500&display=swap');
```

### Type Scale & Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Use |
|------|------|--------|-------------|----------------|-----|
| Display XL | 72px / 4.5rem | 700 | 1.05 | −1.5px | Hero headlines, above-the-fold statements |
| Display L | 60px / 3.75rem | 700 | 1.08 | −1.2px | Section heroes, campaign banners |
| Display M | 48px / 3rem | 700 | 1.10 | −0.96px | Major section titles |
| Heading 1 | 36px / 2.25rem | 700 | 1.15 | −0.54px | Page titles, product names |
| Heading 2 | 30px / 1.875rem | 600 | 1.20 | −0.30px | Section titles, card group headings |
| Heading 3 | 24px / 1.5rem | 600 | 1.25 | −0.24px | Card titles, sidebar headings |
| Heading 4 | 20px / 1.25rem | 600 | 1.30 | −0.20px | Sub-section headings |
| Heading 5 | 18px / 1.125rem | 600 | 1.35 | 0 | Small headings, widget titles |
| Body L | 18px / 1.125rem | 400 | 1.65 | 0 | Intro paragraphs, hero body text |
| Body M | 16px / 1rem | 400 | 1.65 | 0 | Standard body text |
| Body S | 14px / 0.875rem | 400 | 1.60 | 0 | Secondary body, card descriptions |
| Label L | 14px / 0.875rem | 500 | 1.40 | 0.01em | Form labels, navigation items, badges |
| Label M | 12px / 0.75rem | 500 | 1.40 | 0.04em | Small labels, tags, tab labels |
| Caption | 12px / 0.75rem | 400 | 1.50 | 0 | Metadata, timestamps, footnotes |
| Overline | 11px / 0.6875rem | 600 | 1.40 | 0.12em | UPPERCASE section labels, category tags |
| Code M | 14px / 0.875rem | 400 | 1.65 | −0.32px | Code blocks, terminal strings |
| Code S | 12px / 0.75rem | 400 | 1.60 | −0.24px | Inline code, technical values |

### Typography Principles

- **Navy for authority, orange never for body text:** All display and heading text uses `#030f35` on light surfaces. Orange (`#fb5535`) appears only on links, CTA labels, and selected active states — never in running body text.
- **Negative letter-spacing at display sizes:** Tighten large headlines (Display XL → −1.5px, Display L → −1.2px, Display M → −0.96px) for authoritative, engineered density. Release spacing at body sizes.
- **Generous body line-height (1.65):** Thought-leadership and insight content deserves reading-pace spacing. The DXP serves executives reading executive briefs; rushed line-heights erode trust.
- **Single typeface, single voice:** Plus Jakarta Sans across all contexts ensures coherence across the marketing site, marketplace, insight hub, and product gateway.
- **Overlines for structure:** Use 11px/600/uppercase/0.12em overlines above headings to label section context ("INSIGHTS" / "SERVICES" / "WHAT WE DO"). Colour: `gray-500` on light, `navy-300` on dark.

---

## 3a. Kinetic Typography (v1.2.0)

Display text on hero, CTA, and storytelling surfaces may animate on mount and on scroll-into-view. Body text never animates.

### Patterns

- **Word stagger reveal:** translateY(8px → 0) + opacity(0 → 1) per word, 60–80ms stagger, 350ms duration, `--ease-out`. Use on hero headline only (one per page).
- **Gradient text:** `background-image: linear-gradient(135deg, navy-950, orange-500); background-clip: text; color: transparent;` — only on display sizes (≥36px), only one phrase per page, never on body. Verify contrast against the mid-point of the gradient.
- **Fluid scale (clamp):** display headlines may use `font-size: clamp(2.5rem, 4vw + 1rem, 4.5rem)` for fluid scaling, replacing fixed breakpoint type scaling at the Display XL/L/M tiers.

### Tokens

```css
--kinetic-stagger:        70ms;
--kinetic-word-duration:  350ms;
--kinetic-word-translate: 8px;
--kinetic-gradient-text:  linear-gradient(135deg, var(--navy-950), var(--orange-500));
```

### Accessibility

- All kinetic typography MUST collapse to static under `prefers-reduced-motion: reduce`.
- Gradient text MUST pass contrast against the mid-point of its own gradient (use a contrast checker on `oklch` mid-stop).
- Word-stagger MUST complete within 1.0s total — beyond this, perceived friction.
- Never apply kinetic patterns to navigation, form labels, body, or any surface a screen reader will linearise.

---

## 4. Component Stylings

### 4.1 Buttons

**Primary (DQ Orange) — the sole conversion button**
```
Background:      #fb5535
Text:            #ffffff
Border:          none
Border-radius:   8px
Padding:         10px 20px (MD), 8px 16px (SM), 12px 24px (LG)
Font:            14px / 500 / Plus Jakarta Sans
Hover:           background #f24c2a (orange-600)
Active:          background #e04020 (orange-700)
Focus ring:      0 0 0 3px rgba(251,85,53,0.30)
Disabled:        background #feb9a7 (orange-200), text #fd9478 (orange-300), cursor not-allowed
Shadow:          0 1px 3px rgba(3,15,53,0.20), 0 1px 2px rgba(3,15,53,0.08)
Hover shadow:    0 4px 8px rgba(251,85,53,0.30)
```

**Primary Navy — authoritative secondary CTA**
```
Background:      #030f35
Text:            #ffffff
Border-radius:   8px
Padding:         10px 20px (MD)
Font:            14px / 500
Hover:           background #050e4a (navy-900)
Active:          background #0a1a6e (navy-800)
Focus ring:      0 0 0 3px rgba(3,15,53,0.25)
Shadow:          0 1px 3px rgba(3,15,53,0.25), 0 1px 2px rgba(3,15,53,0.10)
```

**Outline Navy — secondary action on light surfaces**
```
Background:      transparent
Border:          1.5px solid #030f35
Text:            #030f35
Border-radius:   8px
Padding:         9.5px 20px (accounts for border)
Hover:           background #f3f5fd (navy-50), border stays
Active:          background #e8edfb (navy-100)
Focus ring:      0 0 0 3px rgba(3,15,53,0.15)
```

**Outline Orange — CTA on dark/navy surfaces**
```
Background:      transparent
Border:          1.5px solid #fb5535
Text:            #fb5535
Hover:           background rgba(251,85,53,0.10)
Active:          background rgba(251,85,53,0.18)
Focus ring:      0 0 0 3px rgba(251,85,53,0.25)
```

**Ghost — tertiary, low-emphasis**
```
Background:      transparent
Border:          none
Text:            #030f35 (light mode) / #ffffff (dark mode)
Hover:           background #f6f6fb (light) / rgba(255,255,255,0.08) (dark)
Active:          background #eeeff6 (light) / rgba(255,255,255,0.14) (dark)
Border-radius:   8px
```

**Destructive — delete / irreversible action**
```
Background:      #dc2626
Text:            #ffffff
Hover:           background #b91c1c
Focus ring:      0 0 0 3px rgba(220,38,38,0.25)
```

**Button Sizes:**
| Size | Height | Padding H | Font size | Icon |
|------|--------|-----------|-----------|------|
| XS | 28px | 12px | 12px | 14px |
| SM | 32px | 14px | 13px | 15px |
| MD (default) | 40px | 20px | 14px | 16px |
| LG | 44px | 24px | 15px | 17px |
| XL | 48px | 28px | 16px | 18px |
| Icon-SM | 32×32px | — | — | 16px |
| Icon-MD | 40×40px | — | — | 18px |
| Icon-LG | 48×48px | — | — | 20px |

### 4.2 Navigation

**Top Navigation (light mode)**
```
Background:              #ffffff
Height:                  64px
Border-bottom:           1px solid #eeeff6 (gray-100)
Logo:                    DQ wordmark in navy-950
Links font:              14px / 500 / gray-700 (#2e2e42)
Links hover:             navy-950 (#030f35), no underline
Active link:             orange-500 (#fb5535) or navy-950 with orange-500 underline
CTA button:              Primary Orange (right-aligned)
Secondary CTA:           Outline Navy
Sticky on scroll:        yes, with shadow-md applied
Max container width:     1280px, centered
```

**Top Navigation (dark/navy mode — used on dark hero pages)**
```
Background:              transparent (over navy hero)
Links:                   #ffffff / 500
Links hover:             orange-400 (#fc7256)
Active:                  orange-500 (#fb5535)
CTA button:              Primary Orange
Secondary CTA:           Outline Orange
Border-bottom:           1px solid rgba(255,255,255,0.10)
```

**Mega Menu / Dropdown**
```
Background:              #ffffff
Border:                  1px solid #d8d9e6 (gray-200)
Border-radius:           12px
Shadow:                  0 10px 25px rgba(3,15,53,0.12), 0 4px 8px rgba(3,15,53,0.06)
Category label:          11px / 600 / orange-500 / uppercase / 0.12em tracking (overline style)
Item label:              14px / 500 / gray-900
Item description:        12px / 400 / gray-500
Item hover background:   navy-50 (#f3f5fd)
Padding:                 24px
```

**Marketplace Sub-nav (Discern / Designs / Deploys / Dive tabs)**
```
Background:              #f6f6fb (gray-50)
Active tab:              white background, shadow-sm, navy-950 text
Inactive tab:            transparent, gray-600 text
Tab font:                14px / 600
Active indicator:        2px solid orange-500 (bottom border) OR navy-950 background
Height:                  48px
Border-bottom:           1px solid gray-200
```

### 4.3 Cards

**Base Card**
```
Background:      #ffffff (light) / navy surface-1 #060e44 (dark)
Border:          1px solid #d8d9e6 (light) / rgba(255,255,255,0.10) (dark)
Border-radius:   12px
Padding:         24px
Shadow resting:  0 1px 3px rgba(3,15,53,0.06), 0 1px 2px rgba(3,15,53,0.04)
Shadow hover:    0 8px 16px rgba(3,15,53,0.10), 0 2px 6px rgba(3,15,53,0.06)
Transition:      shadow 200ms ease, transform 200ms ease
Hover transform: translateY(-2px)
```

**Service Card (Marketplace)**
```
Inherits:        Base Card
Top accent:      4px solid orange-500 (#fb5535) at card top
Category tag:    overline style — 11px / 600 / orange-500 / uppercase
Title:           Heading 3 — 24px / 600 / navy-950
Description:     Body S — 14px / 400 / gray-700
Metadata row:    12px / 500 / gray-500 (audience, sector badges)
CTA:             Ghost or Outline Navy button, bottom of card
Related tags:    Label M badges (gray-100 bg, gray-700 text)
Min-height:      280px
```

**Product Card (DQ Ecosystem)**
```
Inherits:        Base Card
Logo/Icon area:  48×48px icon container, navy-50 background, navy-500 icon
Product code:    Label M — 12px / 600 / orange-500 (e.g. "DTMP", "DTO4T")
Title:           Heading 3 — navy-950
Tagline:         Body S — gray-700
Capability list: Body S / gray-600 with small check icons (orange-500)
CTA:             Primary Orange button
Border-top:      4px solid navy-500 (product palette variant)
```

**Insight Card (DTMI Hub)**
```
Inherits:        Base Card
Thumbnail:       16:9 aspect ratio, border-radius 8px top
Content type tag: overline — 11px / 600 / orange-500 / uppercase (e.g. "EXECUTIVE BRIEF")
6xD tag:         Label M pill — navy-100 bg / navy-700 text
Title:           Heading 4 — 20px / 600 / navy-950 (3 lines max, truncate)
Excerpt:         Body S — gray-600 (2 lines max)
Meta:            Caption — gray-400 (date, read time)
Author:          12px / 500 / gray-700 with avatar
CTA arrow:       16px icon, orange-500, bottom right
Hover title:     color shifts to orange-600
```

**Sector Card**
```
Inherits:        Base Card
Background on hover: navy-950
Icon:            48px, navy-500 (resting) / orange-500 (hover)
Title:           Heading 4 / navy-950 (resting) / white (hover)
Description:     Body S / gray-600 (resting) / navy-200 (hover)
Tag count:       Label M — "4 Services" / "7 Insights"
Hover transition: background, text, icon colour — 200ms ease
```

**Audience Card**
```
Similar to Sector Card
Icon:            Role icon (executive, architect, builder, etc.)
Role label:      Heading 4
Challenge text:  Body S / gray-600
Recommended path CTA: Label L / orange-500 / with arrow icon
```

**Statistic / Proof Point Card**
```
Background:      navy-950 (anchor section) or orange-500 (highlight)
Number:          Display M — 48px / 700 / #ffffff
Unit/Suffix:     Heading 2 / white at 70% opacity (e.g. "+", "%", "x")
Label:           Body S / white at 80% opacity
Padding:         32px 24px
Border-radius:   12px
Accent line:     3px solid orange-500 (when on navy bg) / 3px solid white (when on orange bg)
```

**Testimonial Card**
```
Background:      gray-50 (#f6f6fb) or navy-800 (dark variant)
Quote marks:     48px / orange-500 / 700 — decorative
Quote text:      Body L — 18px / 400 / gray-800 (light) / white (dark)
Attribution:     Label L / gray-900 — name; Caption / gray-500 — title, org
Avatar:          40px circle
Border-left:     4px solid orange-500
Padding:         32px
```

**Newsletter / CTA Block**
```
Background:      navy-950 (full-width section)
Title:           Heading 2 / white
Subtitle:        Body M / navy-200
Input:           see Inputs below, white bg
Submit button:   Primary Orange
Note text:       Caption / navy-300 (privacy note)
Max-width:       560px (centered content column)
Padding:         80px 0 (section vertical)
```

**Diagnostic Entry Block**
```
Background:      orange-50 (#fff5f2) with orange-100 border
Icon:            48px, orange-500
Title:           Heading 3 / navy-950
Description:     Body M / gray-700
Steps preview:   3-item ordered list / Body S / gray-600
CTA:             Primary Orange — "Begin Assessment"
Est. time:       Label M / gray-500 — "~5 minutes"
Border-radius:   16px
Border:          1px solid #fde5df (orange-100)
```

### 4.4 Inputs & Forms

**Text Input (default)**
```
Background:      #ffffff
Border:          1.5px solid #d8d9e6 (gray-200)
Border-radius:   8px
Height:          40px
Padding:         0 14px
Font:            14px / 400 / gray-900
Placeholder:     14px / 400 / gray-400
Focus border:    1.5px solid #030f35 (navy-950)
Focus ring:      0 0 0 3px rgba(3,15,53,0.12)
Error border:    1.5px solid #dc2626
Error ring:      0 0 0 3px rgba(220,38,38,0.15)
Disabled:        background gray-50, border gray-100, text gray-400
```

**Textarea**
```
Inherits Input styles
Min-height:      100px
Padding:         10px 14px
Resize:          vertical only
```

**Select**
```
Inherits Input styles
Trailing icon:   ChevronDown 16px / gray-400
Custom dropdown: Base Card style, max-height 280px, overflow-y scroll
Option hover:    background navy-50
Option selected: background navy-100, text navy-950, checkmark orange-500
```

**Form Label**
```
Font:            14px / 500 / gray-900
Margin-bottom:   6px
Required marker: " *" — orange-500
```

**Field Error Message**
```
Font:            12px / 400 / #dc2626
Margin-top:      4px
Icon:            AlertCircle 14px / #dc2626 (leading)
```

**Field Hint**
```
Font:            12px / 400 / gray-500
Margin-top:      4px
```

**Checkbox & Radio**
```
Size:            18×18px
Resting border:  1.5px solid gray-300
Checked bg:      navy-950 (checkbox) / orange-500 (radio)
Check icon:      white
Focus ring:      0 0 0 3px rgba(3,15,53,0.15)
Label:           14px / 400 / gray-800, 8px gap
```

**Toggle / Switch**
```
Track (off):     gray-200, 36×20px, radius 10px
Track (on):      orange-500
Thumb:           white circle, 16×16px, shadow-sm
Transition:      150ms ease
```

**Lead Capture Form (full)**
```
Layout:          2-column grid (md+), 1-column (mobile)
Max-width:       640px
Section label:   Heading 4 / navy-950
Field groups:    16px gap between fields
Submit:          Full-width Primary Orange on mobile, standard width on desktop
Consent note:    Caption / gray-500, below submit
```

### 4.5 Badges & Tags

**Status Badge**
```
Padding:         2px 8px
Border-radius:   9999px (pill)
Font:            12px / 600 / uppercase
Colour variants (bg / text):
  - Active:      green surface / green text (#15803d)
  - Pending:     warning surface / warning text
  - Error:       error surface / error text
  - Draft:       gray-100 / gray-600
  - New:         orange-100 / orange-800
```

**Category Tag (filtering)**
```
Padding:         4px 12px
Border-radius:   6px
Background:      gray-100 (#eeeff6)
Text:            12px / 500 / gray-700
Border:          1px solid gray-200
Hover:           background navy-50, text navy-950, border navy-200
Active/Selected: background navy-950, text #ffffff
```

**6xD Tag (insight taxonomy)**
```
Padding:         4px 10px
Border-radius:   6px
Background:      navy-100 (#e8edfb)
Text:            12px / 600 / navy-800
```

**Product Badge (DTMP, DTO4T, etc.)**
```
Padding:         3px 8px
Border-radius:   4px
Background:      orange-100 (#fde5df)
Text:            11px / 600 / orange-900 / uppercase / 0.06em tracking
```

### 4.6 Data Table

```
Container:       Base Card (padding 0, overflow hidden)
Header row:      background gray-50, border-bottom 2px solid gray-200
Header cell:     12px / 600 / gray-600 / uppercase / 0.06em (Label M overline style)
Cell padding:    12px 16px
Row border:      1px solid gray-100 (between rows)
Row hover:       background gray-50 / navy-50
Zebra stripe:    optional — gray-50 on even rows
Sort icon:       12px chevron, gray-400 / orange-500 (active)
Pagination:      Label M / ghost buttons, active page = navy-950 bg / white text
Empty state:     centered, 48px icon / Heading 4 / Body S / optional CTA
```

### 4.7 Tabs

```
Tab container:   border-bottom 1px solid gray-200
Tab item:        14px / 600 / gray-500
Active tab:      14px / 600 / navy-950, bottom border 2px solid orange-500
Tab hover:       text navy-950
Padding:         0 4px, height 48px
Gap:             0 (flush)
Panel:           padding-top 24px
```

### 4.8 Accordion

```
Item border:     1px solid gray-200 (between items)
Trigger padding: 16px 0
Trigger font:    16px / 600 / navy-950
Trigger icon:    ChevronDown 20px / gray-400, rotates 180° open
Content:         Body M / gray-700, padding 0 0 20px
Animation:       height 200ms ease
```

### 4.9 Modal & Dialog

```
Overlay:         rgba(3,15,53,0.70) (navy-tinted backdrop, not black)
Container:       Base Card, max-width 560px (sm) / 720px (md) / 960px (lg)
Header:          border-bottom 1px solid gray-100, padding 20px 24px
Title:           Heading 3 / navy-950
Close button:    Icon-MD ghost, top-right
Body:            padding 24px
Footer:          border-top 1px solid gray-100, padding 16px 24px, flex row gap-3
Animation:       opacity + translateY(8px) → 0 / 200ms ease
```

### 4.10 Toast & Notification

```
Max-width:       400px
Border-radius:   10px
Padding:         12px 16px
Shadow:          shadow-xl
Font:            14px / 500 / navy-950 (title) + 13px / 400 / gray-600 (body)
Icon:            20px, colour matches semantic (success/error/warning/info)
Close:           X icon / 16px / gray-400
Stack:           bottom-right, 8px gap between toasts
Animation:       slide in from right 300ms ease
Auto-dismiss:    5s (info/success), manual only (error)
```

### 4.11 Hero Blocks

**Marketing Hero (light)**
```
Background:      #ffffff
Max-width:       1280px container, content max-width 768px (left-aligned) or centered
Eyebrow:         overline — 11px / 600 / orange-500 / uppercase (e.g. "DIGITAL EXPERIENCE PLATFORM")
Headline:        Display XL — 72px / 700 / navy-950, negative letter-spacing −1.5px
Subheadline:     Body L — 18px / 400 / gray-600, max-width 540px
CTA group:       Primary Orange + Outline Navy, 12px gap
Social proof:    Caption / gray-400, below CTAs (e.g. "Trusted by 40+ enterprise clients")
Section padding: 120px top, 80px bottom
Right column:    Product screenshot / visual model / illustration
```

**Marketing Hero (dark/navy)**
```
Background:      navy-950 (#030f35)
Eyebrow:         orange-500
Headline:        Display XL / #ffffff
Subheadline:     Body L / navy-200 (#b5c5f7)
CTA group:       Primary Orange + Outline Orange
Decorative:      subtle grid or dot pattern at low opacity (rgba(255,255,255,0.03))
```

**Interior Hero (page header)**
```
Background:      navy-50 (#f3f5fd) or white
Breadcrumb:      Caption / gray-500, above heading
Title:           Heading 1 — 36px / 700 / navy-950
Description:     Body L / gray-600
Metadata row:    Label M / gray-400 (category, date, read time)
Section padding: 48px top, 40px bottom
Border-bottom:   1px solid gray-100
```

**Marketing Hero (dynamic — v1.2.0 additive-dynamic surface)**
```
Background:      navy-950 (#030f35) + var(--mesh-hero-dark) layered radial mesh
Eyebrow:         overline 11px / 600 / uppercase / orange-500 — fade up 250ms ease-out on mount
Headline:        Display XL — clamp(2.5rem, 4vw + 1rem, 4.5rem) / 700 / white / −1.5px / Plus Jakarta Sans
                 Word-stagger reveal on mount (70ms stagger, 350ms each word, ease-out)
                 Optional accent word in gradient text (var(--kinetic-gradient-text))
Subheadline:     Body L / navy-200 — fade-up 200ms after headline finishes
CTA group:       Primary Orange (with var(--glow-orange-md) glow halo) + Outline Orange
                 Magnetic hover ±6px on Primary Orange (motion-safe only)
Right column:    Floating dashboard mockup with parallax tilt on pointer move (rotateX/Y ±3deg max)
                 Internal progress bars animate on intersection (0 → target width, 800ms, ease-out, 80ms stagger)
Decoration:      dot pattern at rgba(255,255,255,0.06), unchanged from static dark hero
Reduced motion:  all motion disabled; values render statically; no tilt; no stagger; no fade
```

### 4.12 Filter Panel

```
Container:       sidebar card or horizontal bar
Search input:    full width (panel) or 240px (horizontal bar)
Filter group label: Label M / gray-500 / uppercase / tracking
Filter item:     Category Tag (see 4.5)
Active filter chip: selected state + X remove icon
Clear all:       12px / 500 / orange-500 / underline on hover
Applied count badge: orange-500 bg, white, 12px (pill)
Sticky on scroll (sidebar variant): position sticky, top 80px
```

### 4.13 Search Results Module

```
Result item:     horizontal card, border-bottom gray-100
Content type:    Product Badge (overline)
Title:           14px / 600 / navy-950, hover orange-600, underline
Excerpt:         13px / 400 / gray-600, 2 lines max, search term highlighted orange-100 bg
Meta:            Caption / gray-400 (date, type, sector)
Pagination:      see Data Table pagination
Empty state:     Heading 4 / navy-950 + Body M / gray-600 + suggested categories
```

### 4.14 Breadcrumb

```
Font:            12px / 400 / gray-400
Separator:       ChevronRight 12px / gray-300
Current page:    12px / 500 / gray-700 (no link)
Link hover:      navy-950, underline
Padding:         0 0 8px
```

### 4.15 Pagination

```
Page button:     32×32px, radius 6px, 13px / 500 / gray-600
Active:          navy-950 bg, white text
Hover:           gray-50 bg
Prev/Next:       Label M / gray-700 with icon
```

### 4.16 Avatar

```
Sizes:    SM 24px | MD 32px | LG 40px | XL 48px | 2XL 64px
Shape:    circle (9999px radius)
Fallback: initials, navy-100 bg, navy-800 text
Border:   2px solid white (when stacked/grouped)
```

### 4.17 Progress & Loading

**Progress Bar**
```
Track:      gray-100, height 6px, radius 9999px
Fill:       orange-500 (default) / green (#16a34a) (success) / navy-500 (neutral)
Label:      Caption / gray-600, right-aligned above bar
```

**Skeleton Loader**
```
Background:   linear-gradient(90deg, gray-100 25%, gray-50 50%, gray-100 75%)
Animation:    shimmer 1.5s infinite
Border-radius: matches target component
```

**Spinner**
```
Border:       3px solid gray-200 / 3px solid orange-500 (arc)
Size:         16px (inline) / 24px (button) / 40px (page)
```

### 4.18 Footer

**Full Footer (corporate)**
```
Background:      navy-950 (#030f35)
Logo:            DQ wordmark — white
Tagline:         Body S / navy-200 (max 2 lines)
Column headings: Label L / #ffffff / 600
Links:           14px / 400 / navy-300, hover white
Legal row:       Caption / navy-400, border-top 1px solid rgba(255,255,255,0.10)
Social icons:    20px, navy-300 resting, white hover
Padding:         64px top, 40px bottom (main), 24px vertical (legal row)
Column grid:     4-col (desktop), 2-col (tablet), 1-col (mobile)
Newsletter CTA:  embedded within footer, orange button on navy
```

---

## 5. Layout Principles

### Spacing Scale (8px base grid)

| Token | Value | Use |
|-------|-------|-----|
| `space-1` | 4px | Icon gap, tight inline |
| `space-2` | 8px | Inner padding tight, icon-text gap |
| `space-3` | 12px | Badge padding, dense list items |
| `space-4` | 16px | Base padding, card inner gap |
| `space-5` | 20px | Button padding H, form field gap |
| `space-6` | 24px | Card padding, section sub-gap |
| `space-8` | 32px | Section inner padding |
| `space-10` | 40px | Interior hero padding |
| `space-12` | 48px | Compact section spacing |
| `space-16` | 64px | Component group separation |
| `space-20` | 80px | Standard section vertical padding |
| `space-24` | 96px | Large section padding |
| `space-30` | 120px | Hero section top padding |
| `space-40` | 160px | Maximum hero breathing room |

### Container Widths

| Name | Max Width | Use |
|------|-----------|-----|
| Reading | 720px | Blog posts, insight articles, whitepapers |
| Content | 896px | Landing pages, forms, standard pages |
| Layout | 1152px | Multi-column pages |
| Wide | 1280px | Primary site layout |
| Full | 1536px | Full-bleed marketing sections |

All containers: `margin: 0 auto`, `padding-inline: 24px` (mobile), `32px` (tablet), `48px` (desktop).

### Grid System

**12-column grid (desktop):**
- Column gap: 24px (layout) / 32px (marketing)
- Common splits: 12 (full), 8+4, 6+6, 4+4+4, 3+3+3+3, 8 (centered content)

**Card Grids:**
| Context | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Service/Product marketplace | 3 columns | 2 columns | 1 column |
| Insight hub | 3 columns | 2 columns | 1 column |
| Sector cards | 4 columns | 2 columns | 1 column |
| Audience cards | 4 columns | 2 columns | 2 columns |
| Statistic cards | 4 columns | 2 columns | 2 columns |

### Section Structure

Every section follows this vertical rhythm:
```
Section padding-top: 80px (standard) / 120px (hero) / 48px (compact)
Eyebrow overline:    bottom margin 12px
Section heading:     bottom margin 16px
Section sub-copy:    bottom margin 48px
Content grid:        gap 24–32px
```

**Section alternation pattern (marketing site):**
```
Section 1: White background (hero)
Section 2: Gray-50 (#f6f6fb) background (feature grid)
Section 3: Navy-950 background (dark proof band)
Section 4: White background (content detail)
Section 5: Orange-50 background (CTA / diagnostic)
Section 6: Navy-950 background (footer)
```

### Border Radius Scale

| Token | Value | Use |
|-------|-------|-----|
| `radius-xs` | 2px | Minimal — progress bar ends |
| `radius-sm` | 4px | Tag pills compact, table cells |
| `radius-md` | 6px | Small chips, code blocks |
| `radius-lg` | 8px | **Default** — buttons, inputs, small cards |
| `radius-xl` | 12px | Cards, modals, dropdowns |
| `radius-2xl` | 16px | Feature cards, large containers |
| `radius-3xl` | 24px | Hero containers, callout blocks |
| `radius-full` | 9999px | Pills, avatars, status badges |

---

## 6. Depth & Elevation

### Shadow Scale (navy-tinted)

All shadows use the navy brand colour `rgba(3,15,53,…)` as the base — elevation feels on-brand.

| Level | Shadow | Use |
|-------|--------|-----|
| **0** | none | Flat — page background, inline elements |
| **SM** | `0 1px 2px rgba(3,15,53,0.05), 0 1px 3px rgba(3,15,53,0.08)` | Resting cards, subtle lift |
| **MD** | `0 4px 6px rgba(3,15,53,0.07), 0 2px 4px rgba(3,15,53,0.06)` | Card hover state, sticky nav |
| **LG** | `0 10px 15px rgba(3,15,53,0.10), 0 4px 6px rgba(3,15,53,0.07)` | Dropdowns, mega menus |
| **XL** | `0 20px 25px rgba(3,15,53,0.15), 0 10px 10px rgba(3,15,53,0.04)` | Modals, dialogs, popovers |
| **2XL** | `0 25px 50px rgba(3,15,53,0.25)` | Full-screen overlays, high-lift panels |
| **Inner** | `inset 0 2px 4px rgba(3,15,53,0.08)` | Pressed states, inset inputs |

**Focus Rings:**
```
Orange focus (primary CTAs):   0 0 0 3px rgba(251,85,53,0.30)
Navy focus (secondary/inputs): 0 0 0 3px rgba(3,15,53,0.18)
Error focus:                   0 0 0 3px rgba(220,38,38,0.20)
```

### Z-Index Scale

| Token | Value | Use |
|-------|-------|-----|
| `z-base` | 0 | Default document flow |
| `z-raised` | 10 | Sticky elements, raised cards |
| `z-dropdown` | 100 | Dropdowns, menus |
| `z-sticky` | 200 | Sticky nav, fixed headers |
| `z-overlay` | 300 | Modal overlay |
| `z-modal` | 400 | Modal / dialog |
| `z-toast` | 500 | Toast notifications |
| `z-tooltip` | 600 | Tooltips |

### Surface Hierarchy (light mode)

```
Level 0: page background      #ffffff
Level 1: card surface          #f6f6fb + shadow-sm
Level 2: elevated card         #ffffff + shadow-md
Level 3: dropdown / popover    #ffffff + shadow-lg
Level 4: modal                 #ffffff + shadow-xl + navy overlay
```

### Dark Mode Surface Hierarchy

```
Level 0: page background       #030f35 (navy-950)
Level 1: card surface          #060e44 + shadow-sm (navy-tinted)
Level 2: elevated card         #0a1a6e + shadow-md
Level 3: dropdown              #0d2199 + shadow-lg
Level 4: modal                 navy surface-2 + shadow-xl + rgba(3,15,53,0.85) overlay
```

---

## 6a. Glass & Glow Surfaces (v1.2.0)

### Glass surfaces

Translucent foreground content layered over mesh or photographic backgrounds. Use only when there is a busy background to layer on (mesh hero, photographic surface). Never on flat surfaces — looks washy.

| Token | Value | Use |
|-------|-------|-----|
| `--surface-glass-light`        | `oklch(1 0 0 / 0.65)` | Light-mode glass card on mesh |
| `--surface-glass-dark`         | `oklch(1 0 0 / 0.06)` | Dark-mode glass card on navy/mesh |
| `--surface-glass-border-light` | `oklch(0.86 0.010 264 / 0.55)` | Glass border on light |
| `--surface-glass-border-dark`  | `oklch(1 0 0 / 0.10)` | Glass border on dark |
| `--blur-sm` / `--blur-md` / `--blur-lg` | `8px` / `16px` / `24px` | Backdrop blur intensity |

Tailwind utilities: `.surface-glass-light`, `.surface-glass-dark` (apply background, border, and `backdrop-filter` together).

### Glow

Reserved for primary CTAs in dark contexts and elevated bento hero cards. Stacks with the existing shadow scale; never replace shadow with glow on cards — only on intent-emphasised elements.

| Token | Use |
|-------|-----|
| `--glow-orange-sm` / `--glow-orange-md` | Orange CTAs (sm = button, md = hero CTA + bento hero card) |
| `--glow-navy-md` | Navy elevated cards on light backgrounds |

Tailwind utilities: `.glow-orange`, `.glow-navy`.

### Mesh

| Token | Use |
|-------|-----|
| `--mesh-hero-light` | Light-mode hero background (low-saturation orange + navy radial overlay) |
| `--mesh-hero-dark`  | Dark-mode hero background (orange + navy radial overlay on navy-950) |
| `--mesh-cta-orange` | Full-width CTA / diagnostic / bento hero card background |

### Contrast guard rails

- Body text on glass requires contrast against the worst-case background sample (typically the mid-mesh).
- Glow halo MUST NOT interfere with neighbouring focus rings — minimum 4px gap between glow and any focus ring.
- Glass surfaces MUST have a visible border (`--surface-glass-border-*`) so they remain perceivable on busy backgrounds.

---

## 7. Do's and Don'ts

### Do

- Use `#030f35` navy for dark section backgrounds, hero bands, and primary headings on light surfaces
- Use `#fb5535` orange exclusively for primary CTAs, active states, and the highest-signal brand moments
- Keep all neutrals cool-leaning — every gray has a subtle navy undertone; no warm beige tones
- Apply navy-tinted shadows — `rgba(3,15,53,…)` — never generic gray or black shadows
- Use the 8px grid — space must be a multiple of 4px at minimum
- Maintain WCAG AA contrast (4.5:1 text, 3:1 UI) at minimum; push to AAA for body text
- Use Plus Jakarta Sans weight 700 for all display and heading text; weight 600 for all sub-headings
- Apply overlines (11px / 600 / uppercase / 0.12em) above section headings to label context
- Use the navy-50 (`#f3f5fd`) surface for subtle alternating section backgrounds on light mode
- In dark mode, let navy-950 BE the background — don't add another dark overlay on top
- Use orange-500 focus rings (`rgba(251,85,53,0.30)`) on primary buttons; navy rings on inputs
- Apply border-radius 8px to all interactive elements (buttons, inputs), 12px to cards
- Follow section alternation: white → gray-50 → navy-950 → white → orange-50 → navy-950 (footer)
- Every card must have a single clear CTA (from BRS business rule)
- Every insight card must include content type overline, 6xD tag, and next-step CTA

### Don't

- Don't use orange as a large surface background — it is for accents and CTAs, never section backgrounds (except orange-50 subtle surfaces)
- Don't use warm grays, beige, or cream tones — the neutral palette has a cool-navy undertone throughout
- Don't use pure black (`#000000`) for text — use `navy-950` (`#030f35`) or `gray-900` (`#111118`)
- Don't add decorative gradients on primary sections — depth comes from surface layering, not gradients
- Don't mix orange with destructive red — error/destructive states always use `#dc2626`, never orange
- Don't use border-radius below 6px on interactive elements — softness is core to the identity
- Don't apply shadow-xl or shadow-2xl to anything other than modals and full-screen overlays
- Don't use font weight below 400 for body text, or above 700 for display text
- Don't introduce saturated non-brand accent colours — the only chromatic colours are navy, orange, and the semantic set
- Don't put body text in all-caps — uppercase is reserved for overlines and Label M badges only
- Don't use more than 3 type sizes within a single component
- Don't create orphan CTAs with no supporting context — every CTA must follow headline + description
- Don't break the section alternation rhythm without strong reason

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Token |
|------|-------|-------|
| Mobile (xs) | < 480px | `xs` |
| Mobile (sm) | 480–767px | `sm` |
| Tablet | 768–1023px | `md` |
| Laptop | 1024–1279px | `lg` |
| Desktop | 1280–1535px | `xl` |
| Wide | ≥ 1536px | `2xl` |

### Touch Targets

- Minimum touch target: 44×44px for all interactive elements
- On mobile, increase button padding to ensure 44px height minimum
- Navigation links: 44px height with adequate horizontal spacing
- Card CTAs: treat entire card as touch target where appropriate

### Navigation Collapsing

```
Desktop (≥1024px): Full horizontal nav with mega menus
Tablet (768–1023px): Condensed nav, drop overflow items to "More" menu
Mobile (<768px): Hamburger menu, full-screen slide-in drawer
Drawer: navy-950 background, white links, orange active state, close X top-right
```

### Content Collapsing

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Hero | 2-col (text + visual) | 2-col (stack on sm) | 1-col stacked |
| Service cards | 3-col grid | 2-col grid | 1-col list |
| Insight cards | 3-col grid | 2-col grid | 1-col list |
| Sector cards | 4-col grid | 2-col grid | 1-col (or 2-col compact) |
| Statistic band | 4-col | 2×2 | 2×2 |
| Side filter + results | side-by-side | filter collapsible drawer | filter = drawer |
| Data table | full | scroll-x | scroll-x + priority columns |
| Footer columns | 4-col | 2-col | 1-col stacked |

### Typography Scaling

| Role | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| Display XL | 72px | 52px | 36px |
| Display L | 60px | 44px | 32px |
| Display M | 48px | 36px | 28px |
| Heading 1 | 36px | 30px | 26px |
| Heading 2 | 30px | 26px | 22px |
| Body L | 18px | 17px | 16px |
| Body M | 16px | 16px | 15px |

### Section Spacing Scaling

| Context | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Hero | 120px | 80px | 60px |
| Standard section | 80px | 60px | 48px |
| Compact section | 48px | 40px | 32px |
| Card grid gap | 32px | 24px | 16px |

---

## 9. Agent Prompt Guide

### Quick Color Reference

```
Primary dark (headings, dark surfaces): navy-950  #030f35
Primary CTA (all conversion buttons):  orange-500 #fb5535
White canvas (light-mode background):  #ffffff
Subtle surface tint:                   navy-50    #f3f5fd
Section divider background:            gray-50    #f6f6fb
Secondary text:                        gray-700   #2e2e42
Tertiary / muted text:                 gray-500   #5f607f
Default border:                        gray-200   #d8d9e6
Body text (primary):                   gray-900   #111118
Orange hover:                          orange-600 #f24c2a
Navy on dark (text):                   navy-200   #b5c5f7
Success:                               #16a34a
Error:                                 #dc2626
Warning:                               #d97706
```

### Font Quick Reference

```
Primary font:  Plus Jakarta Sans (variable 200–800)
Heading:       700 weight, negative letter-spacing at display sizes
Sub-heading:   600 weight
UI / Nav:      500 weight
Body:          400 weight
Code font:     JetBrains Mono 400 / 500
Overline:      11px / 600 / uppercase / 0.12em letter-spacing / gray-500 or orange-500

OpenType (always include on heading text):
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
OpenType (numeric data tables / stats):
  font-feature-settings: "kern" 1, "tnum" 1;
```

### Dark Mode Component Patterns

On navy-950 dark backgrounds:
- **Borders**: use `rgba(255,255,255,0.08)` (standard) or `rgba(255,255,255,0.05)` (subtle) — never solid dark borders on dark backgrounds
- **Card backgrounds**: `rgba(255,255,255,0.04)` to `rgba(255,255,255,0.06)` — translucent surface, not an arbitrary dark hex
- **Text hierarchy**: primary `#ffffff`, secondary `#b5c5f7` (navy-200), tertiary `#7a97ee` (navy-300), muted `#4468e3` (navy-400)
- **Elevation on dark**: increase background white-opacity: `0.04 → 0.06 → 0.08` per level — same principle as Linear's luminance stacking
- **Backdrop overlay for modals**: `rgba(3,15,53,0.80)` — navy-tinted, not pure black

### Example Component Prompts

**Marketing Hero (light):**
> "Create a hero section on `#ffffff`. Eyebrow overline: 11px / 600 / uppercase / `#fb5535` — 'DIGITAL EXPERIENCE PLATFORM'. Headline: 72px / 700 / `#030f35` / −1.5px letter-spacing / Plus Jakarta Sans. Subheadline: 18px / 400 / `#454560`. CTA group: orange button (`#fb5535` / white text / 8px radius) + navy outline button (`#030f35` border). Section padding: 120px top."

**Marketing Hero (dark navy):**
> "Create a hero section on `#030f35`. Eyebrow: 11px / 600 / uppercase / `#fb5535`. Headline: 72px / 700 / `#ffffff` / −1.5px letter-spacing. Subheadline: 18px / 400 / `#b5c5f7`. CTA: orange button + outline orange button (`#fb5535` border, `#fb5535` text). Subtle background texture: dot pattern at rgba(255,255,255,0.03)."

**Service Card:**
> "Create a service card on `#ffffff`, 1px solid `#d8d9e6` border, 12px radius, 24px padding, shadow `0 1px 3px rgba(3,15,53,0.06)`. Top accent: 4px solid `#fb5535`. Category overline: 11px / 600 / uppercase / `#fb5535` — 'DESIGN 4.0'. Title: 24px / 600 / `#030f35` / Plus Jakarta Sans. Description: 14px / 400 / `#2e2e42`. Footer: Label M tags on gray-100 bg + outline navy CTA. Hover: translateY(-2px), shadow increases."

**Insight Card:**
> "Create an insight card on `#ffffff`, 12px radius, 1px solid `#d8d9e6` border. Thumbnail top, 16:9, 8px radius. Below: content-type overline `#fb5535` uppercase. 6xD tag: navy-100 bg / navy-800 text pill. Title: 20px / 600 / `#030f35`, 3-line max. Excerpt: 14px / 400 / `#454560`, 2-line max. Footer: author avatar + name + date / read time. Bottom-right: arrow icon `#fb5535`."

**Product Card (DTMP style):**
> "Create a product card on `#ffffff`, 12px radius, border-top 4px solid `#1e45d4` (navy-500). Icon: 48px container navy-50 bg, navy icon. Product code badge: orange-100 bg / orange-900 text / 11px / uppercase — 'DTMP'. Title: 24px / 600 / `#030f35`. Tagline: 14px / 400 / `#454560`. 3 capability list items: 14px / gray-600 / orange-500 checkmarks. CTA: Primary Orange button."

**Dark Navy Band / Proof Section:**
> "Create a full-width section on `#030f35`. Centered heading: 48px / 700 / `#ffffff`. Sub-copy: 18px / 400 / `#b5c5f7`. Below: 4-column statistic grid. Each stat: number 48px / 700 / white, unit at 70% opacity, label 14px / 400 / `#b5c5f7`. Section padding: 80px vertical."

**CTA / Newsletter Band:**
> "Create a full-width CTA section on `#030f35`. Centered heading: 36px / 700 / white. Sub-copy: 18px / 400 / `#b5c5f7`. Email input: white bg / 1.5px white border / 8px radius / 40px height. Submit: Primary Orange button. Privacy note: 12px / `#7a97ee` below. Section padding: 80px vertical."

**Filter Bar (horizontal):**
> "Create a horizontal filter bar on gray-50 (`#f6f6fb`), border-bottom 1px `#eeeff6`. Left: search input 240px. Center: category tag pills (gray-100 bg, hover navy-50, active navy-950/white). Right: 'Clear filters' link in orange-500. Active filter count badge: orange-500 bg / white / 12px pill."

**Diagnostic Entry Block:**
> "Create a diagnostic entry card on `#fff5f2` (orange-50), 1px solid `#fde5df` border, 16px radius, 32px padding. Icon: 48px / orange-500. Title: 24px / 600 / `#030f35`. Description: 16px / 400 / `#2e2e42`. Ordered list: 3 short steps / 14px / `#454560`. CTA: Primary Orange — 'Begin Assessment'. Footer: 12px / gray-500 — '~5 minutes'."

**Navigation (light):**
> "Create a sticky top nav, 64px height, white background, border-bottom 1px `#eeeff6`, shadow on scroll `0 4px 6px rgba(3,15,53,0.07)`. Left: DQ wordmark `#030f35`. Center: nav links 14px / 500 / `#2e2e42`, hover `#030f35`. Right: outline navy button + orange primary button. Max-width 1280px container."

### Iteration Guide

1. Always specify surface first: "on `#ffffff`", "on `#030f35`", "on `#f6f6fb`"
2. Use token names + hex together: "navy-950 (`#030f35`)" — gives AI a semantic anchor and exact value
3. Navy for headings, orange ONLY for CTAs — never orange for decorative or body purposes
4. Specify shadow using exact rgba: `rgba(3,15,53,…)` not generic gray
5. Every section has an eyebrow overline — label it explicitly (uppercase, orange-500, 11px/600)
6. Apply negative letter-spacing explicitly at display sizes (72px → −1.5px)
7. "Plus Jakarta Sans weight 700" for all heading prompts — don't leave weight implied
8. For dark sections, use navy-200 (`#b5c5f7`) for secondary text — not gray
9. Focus rings: "orange focus ring `rgba(251,85,53,0.30)` 3px" on primary buttons; "navy ring `rgba(3,15,53,0.18)` 3px" on inputs
10. Keep card grids 3-column (desktop) / 2-column (tablet) / 1-column (mobile) by default

---

## 10. Design Tokens (CSS Custom Properties)

The following maps directly to Tailwind CSS v4 with OKLCH color space as used in the DQ DXP project.
These tokens override the scaffold defaults in `globals.css`.

```css
@layer base {
  :root {
    /* Brand */
    --color-brand-navy:    oklch(0.12 0.082 264);   /* #030f35 */
    --color-brand-orange:  oklch(0.65 0.208 29);    /* #fb5535 */

    /* Navy scale */
    --color-navy-950: oklch(0.12 0.082 264);
    --color-navy-900: oklch(0.14 0.100 264);
    --color-navy-800: oklch(0.18 0.120 264);
    --color-navy-700: oklch(0.22 0.140 264);
    --color-navy-600: oklch(0.28 0.155 264);
    --color-navy-500: oklch(0.35 0.160 264);
    --color-navy-400: oklch(0.48 0.130 264);
    --color-navy-300: oklch(0.63 0.090 264);
    --color-navy-200: oklch(0.78 0.055 264);
    --color-navy-100: oklch(0.92 0.025 264);
    --color-navy-50:  oklch(0.96 0.012 264);

    /* Orange scale */
    --color-orange-950: oklch(0.30 0.140 29);
    --color-orange-900: oklch(0.40 0.165 29);
    --color-orange-800: oklch(0.48 0.178 29);
    --color-orange-700: oklch(0.55 0.192 29);
    --color-orange-600: oklch(0.61 0.202 29);
    --color-orange-500: oklch(0.65 0.208 29);   /* #fb5535 brand */
    --color-orange-400: oklch(0.70 0.188 29);
    --color-orange-300: oklch(0.76 0.158 29);
    --color-orange-200: oklch(0.84 0.110 29);
    --color-orange-100: oklch(0.92 0.060 29);
    --color-orange-50:  oklch(0.97 0.020 29);

    /* Neutral (cool) */
    --color-gray-950: oklch(0.09 0.010 264);
    --color-gray-900: oklch(0.13 0.015 264);
    --color-gray-800: oklch(0.18 0.020 264);
    --color-gray-700: oklch(0.26 0.028 264);
    --color-gray-600: oklch(0.38 0.032 264);
    --color-gray-500: oklch(0.49 0.030 264);
    --color-gray-400: oklch(0.60 0.025 264);
    --color-gray-300: oklch(0.74 0.018 264);
    --color-gray-200: oklch(0.86 0.010 264);
    --color-gray-100: oklch(0.93 0.006 264);
    --color-gray-50:  oklch(0.97 0.004 264);

    /* Semantic */
    --color-success:        oklch(0.55 0.158 145);  /* #16a34a */
    --color-success-surface: oklch(0.95 0.060 145);
    --color-success-text:    oklch(0.48 0.145 145);
    --color-warning:        oklch(0.62 0.140 72);   /* #d97706 */
    --color-warning-surface: oklch(0.96 0.060 72);
    --color-warning-text:    oklch(0.54 0.130 72);
    --color-error:          oklch(0.55 0.195 25);   /* #dc2626 */
    --color-error-surface:  oklch(0.95 0.070 25);
    --color-error-text:     oklch(0.47 0.185 25);
    --color-info:           oklch(0.55 0.180 255);  /* #2563eb */
    --color-info-surface:   oklch(0.94 0.060 255);
    --color-info-text:      oklch(0.46 0.175 255);

    /* Surfaces (light mode) */
    --color-background:     oklch(1.00 0 0);        /* #ffffff */
    --color-surface-1:      oklch(0.97 0.004 264);  /* #f6f6fb */
    --color-surface-2:      oklch(1.00 0 0);        /* #ffffff + shadow */
    --color-border-subtle:  oklch(0.93 0.006 264);  /* gray-100 */
    --color-border-default: oklch(0.86 0.010 264);  /* gray-200 */
    --color-border-strong:  oklch(0.74 0.018 264);  /* gray-300 */

    /* Text (light mode) */
    --color-text-primary:   oklch(0.13 0.015 264);  /* gray-900 */
    --color-text-secondary: oklch(0.26 0.028 264);  /* gray-700 */
    --color-text-tertiary:  oklch(0.49 0.030 264);  /* gray-500 */
    --color-text-disabled:  oklch(0.60 0.025 264);  /* gray-400 */

    /* Typography */
    --font-sans: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, "SF Mono", monospace;

    /* Radius */
    --radius-xs:   2px;
    --radius-sm:   4px;
    --radius-md:   6px;
    --radius-lg:   8px;    /* default interactive */
    --radius-xl:   12px;   /* cards, modals */
    --radius-2xl:  16px;   /* feature cards */
    --radius-3xl:  24px;   /* hero containers */
    --radius-full: 9999px; /* pills, avatars */

    /* Shadows */
    --shadow-sm:  0 1px 2px rgba(3,15,53,0.05), 0 1px 3px rgba(3,15,53,0.08);
    --shadow-md:  0 4px 6px rgba(3,15,53,0.07), 0 2px 4px rgba(3,15,53,0.06);
    --shadow-lg:  0 10px 15px rgba(3,15,53,0.10), 0 4px 6px rgba(3,15,53,0.07);
    --shadow-xl:  0 20px 25px rgba(3,15,53,0.15), 0 10px 10px rgba(3,15,53,0.04);
    --shadow-2xl: 0 25px 50px rgba(3,15,53,0.25);
    --shadow-inner: inset 0 2px 4px rgba(3,15,53,0.08);
    --focus-ring-orange: 0 0 0 3px rgba(251,85,53,0.30);
    --focus-ring-navy:   0 0 0 3px rgba(3,15,53,0.18);
    --focus-ring-error:  0 0 0 3px rgba(220,38,38,0.20);

    /* Spacing (8px base) */
    --space-1:  4px;
    --space-2:  8px;
    --space-3:  12px;
    --space-4:  16px;
    --space-5:  20px;
    --space-6:  24px;
    --space-8:  32px;
    --space-10: 40px;
    --space-12: 48px;
    --space-16: 64px;
    --space-20: 80px;
    --space-24: 96px;
    --space-30: 120px;
    --space-40: 160px;

    /* Z-index */
    --z-base:     0;
    --z-raised:   10;
    --z-dropdown: 100;
    --z-sticky:   200;
    --z-overlay:  300;
    --z-modal:    400;
    --z-toast:    500;
    --z-tooltip:  600;
  }

  .dark {
    --color-background:     oklch(0.12 0.082 264);   /* navy-950 */
    --color-surface-1:      oklch(0.14 0.095 264);
    --color-surface-2:      oklch(0.18 0.120 264);
    --color-border-subtle:  rgba(255,255,255,0.06);
    --color-border-default: rgba(255,255,255,0.12);
    --color-border-strong:  rgba(255,255,255,0.22);
    --color-text-primary:   oklch(1.00 0 0);
    --color-text-secondary: oklch(0.78 0.055 264);   /* navy-200 */
    --color-text-tertiary:  oklch(0.63 0.090 264);   /* navy-300 */
    --color-text-disabled:  oklch(0.49 0.060 264);
  }
}
```

---

## 11. DQ Ecosystem Component Map

The following maps DXP sections (from BRS) to the component vocabulary defined above.

| DXP Section | Primary Components |
|-------------|--------------------|
| Homepage hero | Marketing Hero (dark or light), Statistic Band, Featured cards grid |
| Navigation | Top Navigation (mega menu), Marketplace Sub-nav |
| Service Marketplace | Service Cards (3-col), Category Tag filters, Filter Bar |
| Product Marketplace | Product Cards (3-col), Product Badge, Feature list |
| DTMI Insight Hub | Insight Cards (3-col), Filter Panel, Content type overlines, Search Results |
| DTMB Publication Hub | Insight Cards (portrait variant), Download CTA buttons |
| DTMA Academy entry | Feature Cards with step counters, Audience Cards, CTA blocks |
| Sector pages | Sector Cards (4-col), Interior Hero, Related content modules |
| Audience pages | Audience Cards (4-col), Recommended journey flows |
| Lead capture / Conversion | Lead Capture Forms, Modal (consultation), Newsletter Block |
| Diagnostics | Diagnostic Entry Block, Progress Bar, Multi-step Form |
| Search | Filter Bar, Search Results Module, Category Tags |
| About / Corporate | Marketing Hero (light), Testimonial Cards, Statistic Band, Team Avatars |
| Footer | Full Footer (navy) |

---

## 11a. Bento Grid (v1.2.0)

Webflow/Linear-style modular grid. Used for the DQ Ecosystem product showcase and any feature group where hierarchy is part of the message.

### Anatomy

- 4-col CSS grid on desktop (`lg:grid-cols-4`), 2-col on tablet (`md:grid-cols-2`), 1-col on mobile.
- Allowed spans: `1×1`, `2×1`, `1×2`, `2×2`. No greater spans (loses asymmetry).
- A bento section MUST contain at least one `2×*` "hero" card and at least two `1×1` cards. No bento with all uniform spans (defeats the purpose).
- Hero card is allowed to use `var(--mesh-cta-orange)` background and `--glow-orange-md` halo; supporting cards remain on white / surface-1 / navy surface-1.

### Content density

- Hero card: title (Heading 2 / 30px+), tagline, optional 3-feature list, primary orange CTA.
- Supporting cards: title (Heading 4 / 20px), tagline, secondary CTA OR feature highlight.
- Never overload a 1×1 with 5+ list items — collapses readability.

### Hover

- All cards inherit Base Card hover (`translateY(-2px)`, shadow MD→LG).
- Hero card adds gradient border on hover via masked pseudo-element (orange→navy at 135deg).
- Reduced motion: hover keeps colour and shadow; no transform.

### Accessibility

- Tab order follows DOM order, which should follow visual reading order (hero first).
- Each card MUST have a single primary action (no multi-CTA).
- Each card MUST be reachable by keyboard with a visible focus ring (DESIGN.md §14).

---

## 11b. Marquee (v1.2.0)

Logos, partners, secondary insights, or chip carousels.

### Anatomy

- Two rows of content, opposite directions, transform-only animation (`translateX 0% → -50%` looped over duplicated content).
- Speed bands: `--marquee-slow` (60s), `--marquee-mid` (35s, default), `--marquee-fast` (18s).
- Content density per row: 8–14 items. Below 8 the loop visually catches up; above 14 looks chaotic.
- Edge fade: 64px gradient mask on left and right edges (utility `.marquee-mask`) to prevent hard wrap-pop.

### Pause-on-hover

Required (`animation-play-state: paused` on hover/focus). Maintains scannability.

### Accessibility

- Under `prefers-reduced-motion: reduce`, marquee animation is disabled and content is rendered as a static, scrollable row (or hidden if non-essential decoration).
- Each marquee item MUST have an accessible label (logo `alt`, chip text content).
- Marquee containers receive `aria-label` describing the content set ("Trusted by enterprise clients").
- Focus moves item-by-item with Tab — focus must pause the animation and bring the focused item fully into view.

### Tokens

```css
--marquee-slow: 60s;
--marquee-mid:  35s;
--marquee-fast: 18s;
```

Utilities: `.marquee-track`, `.marquee-track-reverse`, `.marquee-mask`.

---

## 11c. Scroll Storytelling (v1.2.0)

Sticky-scroll feature reveal. Used for educational / "How it works" sections.

### Anatomy

- Two-column section: left column sticky (sticky list of 3–5 steps), right column scrolls through the same number of synced visual blocks.
- Section height = `(steps × 100vh)`. Each step block = `100vh`.
- Scroll-progress drives: which left-column step is "active" (color/opacity/border treatment) and which right-column visual is in view.
- Top of section snaps lightly (`scroll-snap-type: y proximity` on parent, optional).

### Content rules

- Never more than 5 steps (becomes scroll fatigue).
- Each step MUST read independently (no "see step 2" cross-references).
- Visuals on the right are first-class — don't make them placeholders. Each visual = 1 mockup, illustration, or chart.

### Accessibility

- Under `prefers-reduced-motion: reduce`, the section collapses to a normal stacked 3–5-block flow with no sticky/scroll-jacking behaviour.
- All steps MUST be keyboard-reachable; clicking a step jumps the right column to its visual.
- Provide a "skip section" link before the storytelling region.
- ARIA: `role="region"` + `aria-label` on the outer section; left-column step list `role="list"` with `role="listitem"` + `aria-current="step"` on the active one.

---

## 12. Iconography

### Icon Library

**Primary**: [Lucide React](https://lucide.dev/) — consistent 24px stroke icons, 1.5px stroke width, `currentColor` fill. Used for all UI chrome, navigation, form controls, and component decorations.

**Fallback**: [Phosphor Icons](https://phosphoricons.com/) — when Lucide lacks a semantic match. Use the `Regular` (outline) weight at the same hierarchy level.

**Never** use emoji as structural icons (`🚀`, `⚙️`, `📊`). Emoji are platform-dependent, unthemeable, and inaccessible.

### Icon Sizes

| Token | Size | Use |
|-------|------|-----|
| `icon-xs` | 12px | Inline badges, micro labels |
| `icon-sm` | 16px | Button icons, tag icons |
| `icon-md` | 20px | Default UI icon size |
| `icon-lg` | 24px | Feature icons, navigation |
| `icon-xl` | 32px | Card lead icons |
| `icon-2xl` | 48px | Section lead icons, empty states |
| `icon-3xl` | 64px | Hero decorative icons |

### Icon Rules

- **Stroke consistency**: 1.5px stroke throughout. Never mix 1px and 2px in the same component.
- **Style consistency**: Use outline (regular) icons at one hierarchy level. Filled icons are acceptable **only** for active/selected states (e.g., a filled bookmark when saved).
- **Color**: `currentColor` — icons inherit their parent's text color. Never hardcode icon colors separately from the text they accompany.
- **Touch targets**: Icon-only interactive elements must have a minimum 44×44px hit area (wrap in a 44px container even if the icon is 20px).
- **Contrast**: Icons must meet WCAG 3:1 contrast against their background minimum.
- **Alignment**: Align icons to text baseline or vertical-center. Use consistent gap (4px tight, 8px standard) between icon and label.

### Icon Usage in DQ Components

| Component | Icon | Size | Color |
|-----------|------|------|-------|
| Navigation arrow / chevron | `ChevronDown`, `ChevronRight` | icon-sm (16px) | gray-400 |
| CTA trailing arrow | `ArrowRight` | icon-sm (16px) | white or orange-500 |
| Form success / error | `CheckCircle`, `AlertCircle` | icon-sm (16px) | semantic color |
| Card hover arrow | `ArrowUpRight` | icon-sm (16px) | orange-500 |
| Search field | `Search` | icon-md (20px) | gray-400 |
| Close / dismiss | `X` | icon-md (20px) | gray-400 |
| Sector/audience cards | contextual | icon-2xl (48px) | navy-500 resting / orange-500 hover |
| Empty state | contextual | icon-3xl (64px) | gray-300 |
| Spinner | custom animated | 16/24/40px | orange-500 |

---

## 13. Motion & Animation

### Timing Scale

| Token | Duration | Use |
|-------|----------|-----|
| `duration-instant` | 75ms | Icon swaps, opacity flash |
| `duration-fast` | 150ms | Button press, micro-feedback |
| `duration-normal` | 200ms | Card hover, input focus ring |
| `duration-moderate` | 300ms | Toast entry, tab switch |
| `duration-slow` | 400ms | Modal open, drawer slide |
| `duration-very-slow` | 600ms | Page-level hero entrance |

All micro-interactions should stay within **150–300ms** (the skill's validated range for perceived responsiveness). Nothing under 75ms or over 600ms in standard UI.

### Easing Vocabulary

```css
--ease-default:  cubic-bezier(0.4, 0, 0.2, 1);  /* Material standard — for transforms, opacity */
--ease-out:      cubic-bezier(0, 0, 0.2, 1);     /* Enter — elements appearing */
--ease-in:       cubic-bezier(0.4, 0, 1, 1);     /* Exit — elements leaving */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1); /* Subtle overshoot — card hover lift, button press */
```

- **Enter animations**: use `ease-out` — feel responsive and decisive
- **Exit animations**: use `ease-in` and run **30% faster** than enter (exit should be imperceptible, not dramatic)
- **Hover states**: use `ease-spring` for card `translateY(-2px)` — the slight overshoot feels alive
- **Color/opacity transitions**: use `ease-default` — color doesn't need spring

### Standard Animation Patterns

```css
/* Card hover lift */
transition: transform 200ms var(--ease-spring), box-shadow 200ms var(--ease-default);
&:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

/* Button press */
transition: background 150ms var(--ease-default), transform 75ms var(--ease-default);
&:active { transform: translateY(1px); }

/* Input focus ring */
transition: box-shadow 150ms var(--ease-default), border-color 150ms var(--ease-default);

/* Modal open */
animation: modal-enter 300ms var(--ease-out) forwards;
@keyframes modal-enter {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Toast entry */
animation: toast-slide 300ms var(--ease-out) forwards;
@keyframes toast-slide {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Skeleton shimmer */
background: linear-gradient(90deg, var(--color-gray-100) 25%, var(--color-gray-50) 50%, var(--color-gray-100) 75%);
background-size: 200% 100%;
animation: shimmer 1.5s infinite;
@keyframes shimmer { to { background-position: -200% 0; } }
```

### Dynamic Motion Patterns (v1.2.0)

| Pattern | When | Library / Token | Reduced motion fallback |
|---------|------|-----------------|-------------------------|
| **Count-up stat** | Stats bands, KPI cards | framer-motion `useMotionValue` + `useSpring` + `useInView`; ~1.2s | Render final value statically |
| **Marquee** | Logos, chips, secondary insights | CSS `.marquee-track` utility (see §11b) | Disable animation; static row |
| **Sticky scroll storytelling** | Educational / "How it works" sections | framer-motion `useScroll` + `useTransform` (see §11c) | Collapse to normal stacked flow |
| **Magnetic hover** | Primary CTAs, sector cards | framer-motion `useMotionValue` translate ±6px | Hover behaves as today (color + shadow) |
| **Parallax tilt mockup** | Hero dashboard, product mockups | rotateX/Y from pointer position, max ±3deg | No tilt; static mockup |
| **Scroll-reveal** | Section headings, card grids on first view | framer-motion `whileInView` + `viewport: { once: true }` | No reveal; static render |
| **Progress fill on view** | Diagnostic ring, KPI bars | `IntersectionObserver` + animate width / `stroke-dashoffset` | Render at final values |
| **Word stagger reveal** | Hero headlines / kinetic surfaces only | framer-motion variants on per-word `<span>` | Static render |
| **Gradient text** | One accent word per page max | CSS `background-clip: text` (see §3a) | Unaffected (no motion) |
| **Stagger card grid entrance** | Service / insight / product card grids | framer-motion `staggerChildren` 80ms, `whileInView` | Static render |

All patterns MUST guard motion via the universal `prefers-reduced-motion: reduce` block in `app/globals.css`, the `motion-safe:` Tailwind variant, or framer-motion's `useReducedMotion` hook.

### Reduced Motion

**Always** respect `prefers-reduced-motion`. The DXP serves enterprise users including those with vestibular disorders.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This disables all motion while preserving functional color/opacity changes. Opacity-based show/hide is acceptable under reduced-motion; transform and layout shifts are not.

---

## 14. Accessibility

### WCAG Contrast Requirements

All color pairs must meet WCAG 2.1 AA minimum. Target AAA for body text.

| Pair | Ratio | Grade | Note |
|------|-------|-------|------|
| navy-950 on white | 17.9:1 | AAA | Primary headings on light |
| gray-900 on white | 15.1:1 | AAA | Body text on light |
| gray-700 on white | 7.3:1 | AAA | Secondary text on light |
| gray-500 on white | 4.6:1 | AA | Tertiary / muted text |
| orange-500 on white | 3.5:1 | AA (large) | Orange text — 18px+ only; never body text |
| white on navy-950 | 17.9:1 | AAA | Primary text on dark |
| navy-200 on navy-950 | 5.9:1 | AA | Secondary text on dark |
| navy-300 on navy-950 | 3.4:1 | AA (large) | Muted text on dark — 18px+ only |
| white on orange-500 | 3.5:1 | AA (large) | CTA button text — acceptable at 14px/500 |
| orange-500 on navy-950 | 6.0:1 | AA | Orange on dark — decorative and CTAs |

> **Orange-500 on white fails AA for small body text (ratio 3.5:1).** This is why orange is restricted to 18px+ display text, CTAs with white label, and decorative overlines — never inline body text.

### Focus Management

- Every interactive element must have a visible focus ring using `focus-visible` (not `focus`) — does not appear on mouse click, only keyboard navigation
- Focus ring style: `outline: 2px solid` + `outline-offset: 2px` **or** `box-shadow: 0 0 0 3px <ring-color>` (preferred — avoids border-radius clipping)
- Orange focus ring on CTAs: `0 0 0 3px rgba(251,85,53,0.35)`
- Navy focus ring on inputs: `0 0 0 3px rgba(3,15,53,0.20)`
- Never remove focus styles with `outline: none` unless replacing with an equally visible custom ring

### ARIA Patterns

| Component | Required ARIA |
|-----------|--------------|
| Navigation | `<nav aria-label="Main navigation">`, `aria-current="page"` on active link |
| Mega menu | `aria-haspopup="true"`, `aria-expanded`, `aria-controls` |
| Mobile drawer | `role="dialog"`, `aria-modal="true"`, focus trap |
| Accordion | `aria-expanded`, `aria-controls`, `id` linkage |
| Tabs | `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls` |
| Modal | `role="dialog"`, `aria-modal`, `aria-labelledby`, focus trap + restore |
| Toast | `role="status"` (info/success) or `role="alert"` (error) |
| Filter chips | `aria-pressed` on toggle buttons |
| Icons (decorative) | `aria-hidden="true"` |
| Icons (meaningful) | `aria-label` or accompanying visible label |
| Form inputs | `<label for>` + `aria-describedby` for hint/error |
| Loading spinner | `role="status"`, `aria-label="Loading"` |

### Keyboard Navigation

- Tab order must follow visual reading order
- Escape closes all overlays (modals, drawers, dropdowns)
- Arrow keys navigate within component groups (tabs, menu items, radio groups)
- Enter/Space activate buttons and toggles
- Home/End navigate to first/last item in lists and tabs
- Ensure no keyboard traps outside intentional modal focus traps

### Screen Reader Text

Use the visually-hidden utility for labels that must be present for screen readers but hidden from sighted users:

```css
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
```

Examples: icon button labels (`<span class="sr-only">Close</span>`), skip navigation links, supplementary context for charts.

### Motion Sickness & Vestibular Safety (v1.2.0)

Per skill UX guidance (severity High), parallax and scroll-jacking can induce nausea in users with vestibular sensitivities. Therefore:

- Every parallax, sticky-scroll, scroll-reveal, magnetic-hover, parallax-tilt, and word-stagger pattern MUST disable its transform under `prefers-reduced-motion: reduce`.
- Color and opacity changes are acceptable under reduced motion; layout, transform, and scroll-driven motion are not.
- Provide a "skip motion section" link before any sticky-scroll storytelling region.
- The universal kill switch in `app/globals.css` (`@media (prefers-reduced-motion: reduce)` block) is the floor; component-level motion MUST also opt-out via `useReducedMotion()` in framer-motion components.
- Hover-only motion (magnetic, tilt) is acceptable under reduced motion only when collapsed to color/opacity feedback; never to a transform.

---

*End of DESIGN.md — DigitalQatalyst DXP v1.2.0*
*Built on: Next.js 16 + Tailwind CSS v4 + Base-UI + shadcn/ui + CVA + OKLCH color space + framer-motion (additive-dynamic v1.2.0)*
*Font: Plus Jakarta Sans (variable 200–800) + JetBrains Mono — see §3*
*Tech stack reference: `dxp_fe_iac/` repo structure*
*References: Stripe, IBM Carbon, HashiCorp MDS, Linear, Vercel Geist, Webflow, Framer — awesome-design-md collection*

---

## Changelog

### 1.2.0 — 2026-04-28 (Additive-dynamic release)

- §1 — Added gradient mesh carve-out for hero, CTA, and diagnostic surfaces (navy/orange tokenised mesh only; no AI mauve).
- §3a (new) — Kinetic typography rules and tokens (word stagger, gradient text, fluid clamp scale).
- §4.11 — Added "Marketing Hero (dynamic)" variant alongside the existing light/dark variants.
- §6a (new) — Glass and glow surface tokens (`--surface-glass-*`, `--blur-*`, `--glow-orange-*`, `--glow-navy-md`, `--mesh-*`).
- §11a (new) — Bento Grid component spec.
- §11b (new) — Marquee component spec.
- §11c (new) — Scroll Storytelling component spec.
- §13 — Expanded with Dynamic Motion Patterns table covering count-up, marquee, sticky-scroll, magnetic hover, parallax tilt, scroll-reveal, progress fill, word stagger, gradient text, and grid stagger.
- §14 — Added Motion Sickness & Vestibular Safety subsection with explicit reduced-motion contracts.
- Tokens for the above mirrored into `app/globals.css` v1.2.0 (additive only — no v1.1.0 tokens removed).
- New dependency: `framer-motion` for animation primitives.

### 1.1.0 — 2026-04-28 (prior baseline)

- Original release. Brand identity, colour scales, typography rules, component vocabulary, layout, depth, ecosystem map, iconography, motion timing, accessibility.
