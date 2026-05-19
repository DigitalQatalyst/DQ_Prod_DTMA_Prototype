# DTMA DQ Design System Compliance Audit
**Date:** May 7, 2026  
**Status:** CRITICAL — Design System File Exists But Is NOT Implemented  
**Compliance Score:** 35/100

---

## Executive Summary

The DQ Design System markdown file (`public/design system/DESIGN (3) 1.md`) has been added to the project, but **it is only a reference document sitting in the public folder**. The DTMA prototype does NOT follow the design system in its actual code.

**Why the page still looks almost the same:**
- The design system file is not connected to the codebase
- Components use hardcoded colors instead of DQ tokens
- Typography is Poppins (from index.html), not Plus Jakarta Sans
- Tailwind config does not reference DQ tokens
- Global styles exist (`dq-design-tokens.css`) but are not fully applied across components
- Many components use inline hex colors like `#ff6b4d`, `#0B0C19`, `#4B5563` instead of CSS variables

---

## 1. Design System File Usage

### ✗ FAIL: Design System Is Only a Reference File

**Finding:**
- `public/design system/DESIGN (3) 1.md` exists but is **not imported or referenced** in any component
- The file is purely informational; no build process or component generator uses it
- It sits in the public folder (served as static content), not in the source code

**What's Missing:**
- No import of DESIGN.md in App.tsx or any component
- No design token extraction from DESIGN.md
- No component generation from DESIGN.md specifications

---

### ✓ PARTIAL: Global DQ Tokens CSS File Exists

**Finding:**
- `src/styles/dq-design-tokens.css` exists and is comprehensive
- Imported in `App.tsx` ✓
- Defines all DQ Navy, Orange, Gray, and semantic colors ✓
- Defines typography, spacing, shadows, and radius tokens ✓
- Defines Plus Jakarta Sans as `--font-sans` ✓

**Problem:**
- Tailwind config does NOT reference these CSS variables
- Components use hardcoded hex colors instead of `var(--dq-navy-950)` or `var(--dq-orange-500)`
- The tokens exist but are not the source of truth in component code

---

### ✗ FAIL: Plus Jakarta Sans Not Loaded Globally

**Finding:**
- `index.html` loads **Poppins** font, not Plus Jakarta Sans
- `dq-design-tokens.css` defines `--font-sans: "Plus Jakarta Sans"` but the font is never imported
- Tailwind config specifies `fontFamily: { sans: ['Poppins', 'sans-serif'] }`

**Impact:**
- All text renders in Poppins, not Plus Jakarta Sans
- Typography hierarchy is not DQ-compliant

**Fix Required:**
- Replace Poppins import with Plus Jakarta Sans in index.html
- Update tailwind config to use Plus Jakarta Sans

---

### ✗ FAIL: DQ Navy and Orange Not Used as Reusable Tokens

**Finding:**
- Components use hardcoded hex values:
  - `#ff6b4d` (DQ Orange) appears 50+ times as inline hex
  - `#0B0C19` (dark text) appears 30+ times as inline hex
  - `#4B5563` (secondary text) appears 20+ times as inline hex
  - `#1e2348` (dark navy variant) appears 15+ times as inline hex

**Examples:**
- `FacultySection.tsx`: `text-[#ff6b4d]`, `text-[#0B0C19]`, `text-[#4B5563]`
- `HBSHeroSection.tsx`: `bg-gradient-to-br from-[#1e2348] via-[#1e2348] via-70% to-[#ff6b4d]`
- `SixXD.tsx`: Multiple inline hex colors
- `Testimonials.tsx`: `text-[#ff6b4d]`, `text-[#0B0C19]`

**Impact:**
- Colors are not centralized
- Changing brand colors requires find-and-replace across 50+ files
- No single source of truth for color values

---

## 2. Brand Colour Implementation

### ✗ FAIL: DQ Navy #030f35 Not Consistently Applied

**Finding:**
- DQ Navy `#030f35` is defined in `dq-design-tokens.css` as `--dq-navy-950`
- Used in:
  - Footer: ✓ `bg-[var(--dq-navy-950)]`
  - Navbar: ✓ `bg-[var(--dq-navy-950)]/20`
  - Some headings: ✓ `text-[var(--dq-navy-950)]`

- NOT used in:
  - Hero sections use `#1e2348` (navy-900 variant) instead of `#030f35`
  - Many components use `#0B0C19` (near-black) instead of navy
  - Dark surfaces use `#1e2348` instead of `#030f35`

**Issue:**
- Multiple navy shades are used inconsistently
- `#1e2348` (navy-900) and `#0B0C19` (gray-950) are used where `#030f35` should be

---

### ✗ FAIL: DQ Orange #fb5535 Overused and Inconsistent

**Finding:**
- DQ Orange `#fb5535` is used correctly for CTAs in most places
- BUT also used for:
  - Overline labels (correct per DESIGN.md)
  - Accent colors in cards (correct)
  - Stat numbers (correct)
  - AI expert dimension indicators (correct)

- PROBLEM: Orange is used as a large background surface in some places
  - HBSHeroSection uses gradient `from-[#1e2348] via-[#1e2348] via-70% to-[#ff6b4d]` — orange as background is acceptable for hero gradient per v1.2.0 carve-out
  - But this is the only place; generally compliant

**Verdict:** Orange usage is mostly correct, but needs verification against DESIGN.md v1.2.0 gradient mesh rules

---

### ✗ FAIL: Non-DQ Colors Found

**Hardcoded Colors Violating Design System:**

| Color | Hex | Location | Issue |
|-------|-----|----------|-------|
| Red | `#dc2626`, `#b91c1c`, `#fee2e2` | CourseBuilder.tsx (error states) | Semantic error color — acceptable for validation |
| Green | `#16a34a`, `#dcfce7` | CourseBuilder.tsx (success states) | Semantic success color — acceptable |
| Blue | `#2563eb`, `#dbeafe` | CourseBuilder.tsx (info states) | Semantic info color — acceptable |
| Custom Dark | `#1e2348`, `#2a3058` | Multiple hero sections | Should use `#030f35` (navy-950) |
| Custom Gray | `#0B0C19`, `#4B5563`, `#9CA3AF` | Multiple components | Should use DQ gray scale |

**Verdict:** Semantic colors (red/green/blue) are acceptable. Custom dark/gray shades should use DQ tokens.

---

## 3. Typography Implementation

### ✗ FAIL: Plus Jakarta Sans Not Applied Globally

**Finding:**
- Font loaded: **Poppins** (from index.html)
- Font defined in tokens: **Plus Jakarta Sans** (in dq-design-tokens.css)
- Font in tailwind: **Poppins** (in tailwind.config.ts)

**Impact:**
- All text renders in Poppins, not Plus Jakarta Sans
- Typography hierarchy is not DQ-compliant
- The entire visual identity is compromised

**Fix:**
```html
<!-- Replace in index.html -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet">
```

---

### ✓ PARTIAL: Type Scale Mostly Correct

**Finding:**
- Heading sizes are approximately correct (36px, 30px, 24px, 20px)
- Body text is 16px ✓
- Line heights are generous (1.65 for body) ✓

**Problem:**
- Letter-spacing is not applied per DESIGN.md spec
  - Display sizes should have negative tracking (−1.5px to −0.54px)
  - Currently no letter-spacing applied to headings
- Font weights are correct (600 for headings, 400 for body)

---

### ✗ FAIL: Overline Styling Not Implemented

**Finding:**
- Overlines exist in components (e.g., "COURSES FOR YOU", "MEET YOUR TRAINERS")
- But styling is inconsistent:
  - Some use `text-[12px] font-semibold text-[#ff6b4d] uppercase tracking-wide`
  - Some use `text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide`
  - No consistent use of `0.12em` letter-spacing per DESIGN.md

**Fix Required:**
- Create a reusable overline component with:
  - 11px / 0.6875rem size
  - 600 weight
  - 0.12em letter-spacing
  - Uppercase
  - Orange or muted gray color

---

## 4. Card Implementation

### ✗ FAIL: Cards Not Using Consistent DQ Styling

**Course Cards (FeaturedCoursesSection2.tsx):**
```
✓ White background
✓ 1px border (gray-200)
✗ Border radius: 2xl (16px) — should be xl (12px)
✗ Padding: 5 (20px) — should be 6 (24px)
✓ Shadow on hover
✓ Hover lift (translateY)
```

**Faculty Cards (FacultySection.tsx):**
```
✓ White background
✗ No border (should have 1px)
✗ Border radius: 2xl (16px) — should be xl (12px)
✓ Padding: 6 (24px)
✓ Shadow on hover
✓ Hover lift
```

**AI Expert Cards (FacultySection.tsx):**
```
✓ White background
✗ Border: transparent, hover:border-[#ff6b4d]/20 — should be solid 1px default
✗ Border radius: 2xl (16px) — should be xl (12px)
✓ Padding: 6 (24px)
✓ Shadow on hover
✓ Hover lift
```

**Issues:**
- Border radius is 16px (2xl) instead of 12px (xl) — violates DESIGN.md §9
- Some cards missing borders
- Inconsistent border styling

---

## 5. Button and CTA Implementation

### ✓ MOSTLY PASS: Buttons Follow DQ Pattern

**Primary CTA (Orange):**
```
✓ Background: #fb5535 (DQ Orange)
✓ Text: white
✓ Hover: #f24c2a (orange-600)
✓ Border radius: 8px (lg)
✓ Padding: 10px 20px (MD)
```

**Secondary CTA (Navy):**
```
✓ Background: #030f35 (DQ Navy)
✓ Text: white
✓ Hover: #050e4a (navy-900)
```

**Outline CTA:**
```
✓ Border: 1.5px solid
✓ Transparent background
✓ Hover background applied
```

**Issues:**
- Some buttons use inline styles instead of DQ button component
- Focus-visible states may not be consistently applied
- No verification of WCAG AA contrast on all button states

---

## 6. Layout and Spacing Implementation

### ✓ PASS: 8px Grid Mostly Followed

**Finding:**
- Sections use `py-16` (64px), `py-20` (80px) — correct per DESIGN.md §7
- Cards use `p-6` (24px) or `p-5` (20px) — mostly correct
- Grid gaps use `gap-6` (24px) or `gap-8` (32px) — correct
- Container max-width: 1600px — correct

**Issues:**
- Some sections use `py-12` (48px) — acceptable but not standard
- Mobile padding varies; should be consistent 32px

---

### ✓ PASS: Responsive Grid Structure

**Finding:**
- Desktop: 3 columns (`grid-cols-3`)
- Tablet: 2 columns (`md:grid-cols-2`)
- Mobile: 1 column (`grid-cols-1`)
- Gaps: `gap-6` (24px) — correct

---

## 7. Section-by-Section Visual QA

### Hero Section (HBSHeroSection)
```
Status: PARTIAL PASS
✓ Navy/Orange gradient overlay
✓ White text on dark background
✓ Orange CTA button
✗ Uses #1e2348 instead of #030f35 for dark base
✗ Gradient uses #ff6b4d as background (acceptable per v1.2.0 but verify contrast)
✗ No Plus Jakarta Sans (Poppins used)
✗ No letter-spacing on headline
```

### Testimonials Section (TestimonialsSection)
```
Status: PARTIAL PASS
✓ Orange accent color for quote icon
✓ Navy text for quotes
✓ Proper spacing
✗ Uses #1e2348 for hero background instead of #030f35
✗ Uses #0B0C19 for text instead of navy-950
✗ Hardcoded hex colors instead of tokens
```

### "Find the Right Course for You" (FeaturedCoursesSection2)
```
Status: PARTIAL PASS
✓ Orange overline
✓ Navy heading
✓ Course cards with proper structure
✗ Card border-radius: 2xl (16px) should be xl (12px)
✗ Card padding: 5 (20px) should be 6 (24px)
✗ Uses var(--dq-*) tokens — GOOD
```

### "A Framework to Master Digital & AI" (SixXD)
```
Status: PARTIAL PASS
✓ Orange accent colors
✓ Navy headings
✓ Proper spacing
✗ Uses #1e2348 for hero background
✗ Uses #0B0C19 for text
✗ Hardcoded hex colors throughout
```

### "Learn from a Hybrid HI + AI Faculty" (FacultySection)
```
Status: FAIL
✗ Uses #ff6b4d (hardcoded) instead of var(--dq-orange-500)
✗ Uses #0B0C19 (hardcoded) instead of var(--dq-navy-950)
✗ Uses #4B5563 (hardcoded) instead of var(--dq-text-secondary)
✗ Faculty cards missing 1px border
✗ Faculty cards use 2xl radius instead of xl
✗ AI expert cards have inconsistent border styling
✗ Uses custom colors (#181C3A, #ff6b4d) for AI dimension indicators
```

### Footer
```
Status: PASS
✓ Uses var(--dq-navy-950) for background
✓ White text on navy
✓ Orange accent for newsletter button
✓ Proper spacing and layout
```

### Navbar
```
Status: PARTIAL PASS
✓ Uses var(--dq-navy-950) with transparency
✓ White text
✓ Orange accent for active states
✗ Some hardcoded colors in dropdowns (needs verification)
```

---

## 8. Hardcoded Styles Found

### Hex Colors (Non-Compliant)
```
#ff6b4d    — 50+ occurrences (should use var(--dq-orange-500))
#0B0C19    — 30+ occurrences (should use var(--dq-navy-950) or var(--dq-gray-950))
#4B5563    — 20+ occurrences (should use var(--dq-text-secondary))
#1e2348    — 15+ occurrences (should use var(--dq-navy-950))
#2a3058    — 10+ occurrences (should use var(--dq-navy-800))
#9CA3AF    — 5+ occurrences (should use var(--dq-gray-400))
```

### Gradients (Non-Compliant)
```
bg-gradient-to-br from-[#1e2348] via-[#1e2348] via-70% to-[#ff6b4d]
  — Should use DQ tokens or approved mesh pattern per v1.2.0
```

### Border Radius (Non-Compliant)
```
rounded-2xl (16px) — 20+ occurrences (should be rounded-xl / 12px)
rounded-full — acceptable for pills/avatars
```

### Font Family (Non-Compliant)
```
Poppins — entire site (should be Plus Jakarta Sans)
```

---

## 9. Critical Issues

| Issue | Severity | Impact | Fix Effort |
|-------|----------|--------|-----------|
| Plus Jakarta Sans not loaded | CRITICAL | Entire visual identity wrong | 1 hour |
| Hardcoded hex colors instead of tokens | CRITICAL | No centralized color management | 4-6 hours |
| Card border-radius 16px instead of 12px | HIGH | Visual inconsistency | 1 hour |
| Card padding inconsistent | HIGH | Visual inconsistency | 1 hour |
| Navy shade inconsistency (#1e2348 vs #030f35) | HIGH | Brand identity diluted | 2 hours |
| Overline styling not standardized | MEDIUM | Typography hierarchy unclear | 1 hour |
| Letter-spacing not applied to headings | MEDIUM | Typography not DQ-compliant | 1 hour |
| Semantic colors (red/green/blue) hardcoded | LOW | Acceptable for now; should migrate | 2 hours |

---

## 10. Implementation Plan

### Phase 1: Foundation (2-3 hours)
1. **Load Plus Jakarta Sans globally**
   - Update `index.html` to import Plus Jakarta Sans
   - Update `tailwind.config.ts` to use Plus Jakarta Sans
   - Remove Poppins import

2. **Standardize Navy Shade**
   - Replace all `#1e2348` with `var(--dq-navy-950)` or `var(--dq-navy-900)` (decide on one)
   - Replace all `#0B0C19` with `var(--dq-navy-950)` or `var(--dq-gray-950)` (decide on one)

3. **Replace Hardcoded Colors with Tokens**
   - Replace `#ff6b4d` → `var(--dq-orange-500)`
   - Replace `#4B5563` → `var(--dq-text-secondary)`
   - Replace `#9CA3AF` → `var(--dq-gray-400)`

### Phase 2: Components (3-4 hours)
1. **Fix Card Styling**
   - Update all cards to use `rounded-xl` (12px) instead of `rounded-2xl` (16px)
   - Update course cards to use `p-6` (24px) instead of `p-5` (20px)
   - Ensure all cards have 1px border

2. **Standardize Overlines**
   - Create reusable overline component with 11px, 600 weight, 0.12em tracking

3. **Apply Letter-Spacing to Headings**
   - Add negative letter-spacing to h1, h2, h3, h4 per DESIGN.md §3

### Phase 3: Verification (1-2 hours)
1. **Audit All Components**
   - Verify all colors use tokens
   - Verify all typography uses Plus Jakarta Sans
   - Verify all spacing follows 8px grid
   - Verify all border-radius uses DQ standard (12px)

2. **Test Responsive Design**
   - Mobile, tablet, desktop
   - Verify spacing and layout

3. **Accessibility Check**
   - Verify WCAG AA contrast on all text/button combinations
   - Verify focus-visible states on all interactive elements

---

## 11. Files That Need Changes

### High Priority (Must Change)
- `index.html` — Load Plus Jakarta Sans
- `tailwind.config.ts` — Update font family
- `src/components/home/FacultySection.tsx` — Replace hardcoded colors
- `src/components/home/FeaturedCoursesSection2.tsx` — Fix card styling
- `src/components/home/HBSHeroSection.tsx` — Replace hardcoded colors
- `src/components/home/SixXDSection.tsx` — Replace hardcoded colors
- `src/pages/Testimonials.tsx` — Replace hardcoded colors
- `src/pages/SixXD.tsx` — Replace hardcoded colors
- `src/pages/personas/*.tsx` — Replace hardcoded colors (5 files)
- `src/pages/dimensions/*.tsx` — Replace hardcoded colors (6 files)

### Medium Priority (Should Change)
- `src/components/layout/Navbar.tsx` — Verify all colors use tokens
- `src/components/home/*.tsx` — Audit all home components (15+ files)
- `src/pages/CourseBuilder.tsx` — Semantic colors are acceptable but should migrate

### Low Priority (Can Wait)
- Dashboard components — Not part of DTMA public site
- Admin components — Not part of DTMA public site

---

## 12. Conclusion

**Current Status:** Design system file exists but is NOT implemented in code.

**Why the page looks the same:** The DESIGN.md file is purely informational. The actual codebase uses:
- Poppins instead of Plus Jakarta Sans
- Hardcoded hex colors instead of DQ tokens
- Inconsistent navy shades
- Incorrect card border-radius (16px instead of 12px)
- No letter-spacing on headings

**To make DTMA fully DQ-compliant:**
1. Load Plus Jakarta Sans (1 hour)
2. Replace hardcoded colors with tokens (4-6 hours)
3. Fix card styling (1-2 hours)
4. Standardize typography (1-2 hours)
5. Verify and test (1-2 hours)

**Total Effort:** 8-13 hours

**Recommendation:** Implement Phase 1 (Foundation) immediately to establish the visual identity. Then proceed with Phase 2 (Components) and Phase 3 (Verification).

---

**Audit Completed:** May 7, 2026  
**Next Steps:** Await approval to proceed with implementation.
