# DTMA DQ Design System Audit — Executive Summary

## The Core Issue

**The DESIGN.md file exists but is NOT implemented in the codebase.**

The page looks the same because:
1. The design system file is purely informational (sitting in `public/design system/`)
2. Components use hardcoded colors instead of DQ tokens
3. Poppins font is loaded instead of Plus Jakarta Sans
4. Card styling doesn't match DQ specifications

---

## Compliance Score: 35/100

| Category | Score | Status |
|----------|-------|--------|
| Design System File Usage | 20/100 | ✗ FAIL — File exists but not connected |
| Brand Colour Implementation | 40/100 | ✗ FAIL — Hardcoded colors, inconsistent navy |
| Typography Implementation | 30/100 | ✗ FAIL — Poppins instead of Plus Jakarta Sans |
| Card Implementation | 35/100 | ✗ FAIL — Wrong border-radius, inconsistent styling |
| Button Implementation | 80/100 | ✓ MOSTLY PASS — Buttons follow DQ pattern |
| Layout & Spacing | 70/100 | ✓ PASS — 8px grid mostly followed |
| **OVERALL** | **35/100** | **CRITICAL** |

---

## What's Actually Implemented vs. What Should Be

### ✓ What's Working
- Footer uses DQ Navy correctly
- Buttons follow DQ color pattern (orange for primary, navy for secondary)
- Spacing follows 8px grid
- Responsive layout structure is correct
- `dq-design-tokens.css` file is comprehensive and imported

### ✗ What's Broken
- **Font:** Poppins instead of Plus Jakarta Sans (entire site)
- **Colors:** 50+ hardcoded hex values instead of CSS variables
- **Navy:** Multiple shades used inconsistently (#1e2348, #0B0C19, #030f35)
- **Cards:** Border-radius 16px instead of 12px
- **Typography:** No letter-spacing on headings
- **Overlines:** Not standardized

---

## Critical Issues (Must Fix)

| Issue | Impact | Effort |
|-------|--------|--------|
| Plus Jakarta Sans not loaded | Entire visual identity wrong | 1 hour |
| Hardcoded hex colors | No centralized color management | 5 hours |
| Card border-radius 16px | Visual inconsistency | 1 hour |
| Navy shade inconsistency | Brand identity diluted | 1 hour |
| No letter-spacing on headings | Typography not DQ-compliant | 1 hour |

**Total Effort to Fix:** 9-10 hours

---

## Implementation Priority

### Phase 1: Foundation (1 hour)
- Load Plus Jakarta Sans in `index.html`
- Update `tailwind.config.ts` to use Plus Jakarta Sans

### Phase 2: Colors (5 hours)
- Replace `#ff6b4d` → `var(--dq-orange-500)` (50+ occurrences)
- Replace `#0B0C19` → `var(--dq-navy-950)` (30+ occurrences)
- Replace `#4B5563` → `var(--dq-text-secondary)` (20+ occurrences)
- Replace `#1e2348` → `var(--dq-navy-950)` (15+ occurrences)

### Phase 3: Components (2 hours)
- Fix card border-radius from 16px to 12px
- Fix card padding from 20px to 24px
- Add letter-spacing to headings
- Standardize overline styling

### Phase 4: Verification (1-2 hours)
- Visual audit
- Responsive testing
- Accessibility check

---

## Files That Need Changes

**High Priority (Must Change):**
- `index.html` — Font import
- `tailwind.config.ts` — Font family
- `src/components/home/FacultySection.tsx` — Colors + card styling
- `src/components/home/SixXDSection.tsx` — Colors
- `src/pages/SixXD.tsx` — Colors
- `src/pages/Testimonials.tsx` — Colors
- `src/pages/personas/*.tsx` — Colors (3 files)
- `src/pages/dimensions/*.tsx` — Colors (6 files)
- `src/components/home/HBSHeroSection.tsx` — Colors
- `src/styles/dq-design-tokens.css` — Add overline + letter-spacing

**Medium Priority (Should Change):**
- `src/components/home/FeaturedCoursesSection2.tsx` — Card styling
- `src/components/layout/Navbar.tsx` — Verify colors

---

## Why This Happened

1. **Design System File Added But Not Integrated**
   - `DESIGN.md` was added to `public/design system/` as reference
   - No build process or component generator uses it
   - No import in any component

2. **Tokens File Exists But Not Used**
   - `dq-design-tokens.css` is comprehensive and imported
   - But components use hardcoded hex values instead of `var(--dq-*)`

3. **Font Not Updated**
   - `index.html` still loads Poppins
   - `tailwind.config.ts` still specifies Poppins
   - `dq-design-tokens.css` defines Plus Jakarta Sans but it's never imported

4. **Components Built Before Design System**
   - Components were built with inline styles
   - Design system was added later as reference
   - No refactoring was done to use tokens

---

## What Needs to Happen

### To Make DTMA Fully DQ-Compliant:

1. **Load Plus Jakarta Sans** (1 hour)
   - Update `index.html` and `tailwind.config.ts`

2. **Replace All Hardcoded Colors** (5 hours)
   - Use find-and-replace to swap hex values for CSS variables
   - Verify each replacement is correct

3. **Fix Card Styling** (1 hour)
   - Update border-radius from 16px to 12px
   - Update padding from 20px to 24px

4. **Add Typography Details** (1 hour)
   - Add letter-spacing to headings
   - Standardize overline component

5. **Test & Verify** (1-2 hours)
   - Visual audit
   - Responsive testing
   - Accessibility check

---

## Success Criteria

When complete, DTMA will:
- ✓ Use Plus Jakarta Sans globally
- ✓ Use DQ Navy (#030f35) consistently
- ✓ Use DQ Orange (#fb5535) only for CTAs and accents
- ✓ Use CSS variables for all colors (no hardcoded hex)
- ✓ Have 12px border-radius on all cards
- ✓ Have proper letter-spacing on headings
- ✓ Follow 8px spacing grid
- ✓ Pass WCAG AA accessibility
- ✓ Match DESIGN.md specifications

---

## Next Steps

1. **Review this audit** — Confirm findings are accurate
2. **Approve implementation plan** — Decide on timeline
3. **Execute Phase 1** — Load Plus Jakarta Sans
4. **Execute Phase 2** — Replace hardcoded colors
5. **Execute Phase 3** — Fix components
6. **Execute Phase 4** — Verify and test

---

## Key Takeaway

**The design system file is a reference document, not an implementation.**

To make DTMA truly DQ-compliant, the codebase must be updated to:
- Use Plus Jakarta Sans (not Poppins)
- Use CSS variables (not hardcoded hex colors)
- Follow DQ component specifications (card radius, padding, etc.)
- Apply typography rules (letter-spacing, overlines, etc.)

This is a **code refactoring task**, not a design task. The design is already defined in DESIGN.md; it just needs to be implemented in the React components.

---

**Audit Date:** May 7, 2026  
**Status:** Ready for Implementation  
**Estimated Effort:** 9-10 hours  
**Complexity:** Medium (straightforward find-and-replace + component updates)
