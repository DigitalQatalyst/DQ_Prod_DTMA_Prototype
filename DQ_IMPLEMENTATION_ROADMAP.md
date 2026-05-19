# DQ Design System Implementation Roadmap

## Quick Answer: Why Does DTMA Still Look the Same?

The `DESIGN.md` file is **only a reference document**. It's not connected to the codebase. Here's what's actually happening:

### The Problem
1. **Font:** Poppins is loaded, not Plus Jakarta Sans
2. **Colors:** 50+ hardcoded hex values instead of CSS variables
3. **Cards:** Border-radius is 16px instead of 12px
4. **Navy:** Multiple shades used inconsistently (#1e2348, #0B0C19, #030f35)
5. **Tokens:** `dq-design-tokens.css` exists but components don't use it

### The Fix (Priority Order)

#### STEP 1: Load Plus Jakarta Sans (1 hour)
**File:** `index.html`
```html
<!-- REMOVE THIS -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- ADD THIS -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet">
```

**File:** `tailwind.config.ts`
```typescript
// CHANGE THIS
fontFamily: {
  sans: ['Poppins', 'sans-serif'],
  display: ['Poppins', 'sans-serif'],
},

// TO THIS
fontFamily: {
  sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  display: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
},
```

---

#### STEP 2: Replace Hardcoded Colors (4-6 hours)

**Files to Update (in order of impact):**

1. `src/components/home/FacultySection.tsx`
   - Replace `#ff6b4d` → `var(--dq-orange-500)`
   - Replace `#0B0C19` → `var(--dq-navy-950)`
   - Replace `#4B5563` → `var(--dq-text-secondary)`
   - Replace `#1e2348` → `var(--dq-navy-950)`

2. `src/components/home/SixXDSection.tsx`
   - Same replacements as above

3. `src/pages/SixXD.tsx`
   - Same replacements as above

4. `src/pages/Testimonials.tsx`
   - Same replacements as above

5. `src/pages/personas/TransformationSpecialists.tsx`
   - Same replacements as above

6. `src/pages/personas/OrganizationalLeaders.tsx`
   - Same replacements as above

7. `src/pages/personas/DigitalWorkers.tsx`
   - Same replacements as above

8. `src/pages/dimensions/*.tsx` (6 files)
   - Same replacements as above

9. `src/components/home/HBSHeroSection.tsx`
   - Replace `#1e2348` → `var(--dq-navy-950)`
   - Keep gradient to orange (acceptable per v1.2.0)

10. `src/components/home/FeaturedCoursesSection2.tsx`
    - Already uses `var(--dq-*)` tokens — GOOD

---

#### STEP 3: Fix Card Styling (1-2 hours)

**File:** `src/components/home/FeaturedCoursesSection2.tsx`
```typescript
// CHANGE THIS
className="bg-white rounded-2xl overflow-hidden border border-[var(--dq-surface-border-default)]"

// TO THIS
className="bg-white rounded-xl overflow-hidden border border-[var(--dq-surface-border-default)]"

// AND CHANGE THIS
<div className="p-5">

// TO THIS
<div className="p-6">
```

**File:** `src/components/home/FacultySection.tsx`
```typescript
// For human faculty cards, CHANGE THIS
className="bg-white rounded-2xl overflow-hidden shadow-sm"

// TO THIS
className="bg-white rounded-xl overflow-hidden border border-[var(--dq-surface-border-default)] shadow-sm"

// For AI expert cards, CHANGE THIS
className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#ff6b4d]/20"

// TO THIS
className="bg-white rounded-xl overflow-hidden border border-[var(--dq-surface-border-default)] shadow-sm hover:shadow-lg transition-all duration-300 group"
```

---

#### STEP 4: Standardize Typography (1-2 hours)

**Add to `src/styles/dq-design-tokens.css`:**
```css
/* Overline component */
.overline {
  font-size: 11px;
  line-height: 1.40;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dq-text-tertiary);
}

.overline-orange {
  color: var(--dq-orange-500);
}

/* Heading letter-spacing */
h1 {
  letter-spacing: -0.54px;
}

h2 {
  letter-spacing: -0.30px;
}

h3 {
  letter-spacing: -0.24px;
}

h4 {
  letter-spacing: -0.20px;
}
```

**Update all overline elements:**
```typescript
// CHANGE THIS
<p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">

// TO THIS
<p className="overline overline-orange mb-4">
```

---

#### STEP 5: Verify and Test (1-2 hours)

1. **Visual Audit**
   - Check all colors are using tokens
   - Check all text is Plus Jakarta Sans
   - Check all cards have 12px radius
   - Check all spacing follows 8px grid

2. **Responsive Test**
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1440px)

3. **Accessibility Check**
   - WCAG AA contrast on all text
   - Focus-visible states on buttons
   - Semantic HTML

---

## Files Summary

### Must Change (Critical)
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

### Should Change (High Priority)
- `src/components/home/FeaturedCoursesSection2.tsx` — Card styling
- `src/components/layout/Navbar.tsx` — Verify colors

### Can Wait (Low Priority)
- Dashboard components
- Admin components
- CourseBuilder (semantic colors acceptable)

---

## Estimated Timeline

| Phase | Task | Hours | Status |
|-------|------|-------|--------|
| 1 | Load Plus Jakarta Sans | 1 | Ready |
| 2 | Replace hardcoded colors | 5 | Ready |
| 3 | Fix card styling | 1.5 | Ready |
| 4 | Standardize typography | 1.5 | Ready |
| 5 | Verify and test | 1.5 | Ready |
| **TOTAL** | | **10.5** | **Ready to Start** |

---

## Success Criteria

✓ All text renders in Plus Jakarta Sans  
✓ All colors use `var(--dq-*)` tokens  
✓ All cards have 12px border-radius  
✓ All headings have correct letter-spacing  
✓ Navy shade is consistent (#030f35)  
✓ Orange is used only for CTAs and accents  
✓ WCAG AA contrast on all text  
✓ Responsive design works on all breakpoints  

---

## Do NOT Change

- Business content
- Routing
- DTMA sections
- Component structure
- Functionality
- Existing DTMA features

---

**Ready to implement?** Proceed with Step 1 when approved.
