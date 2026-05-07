# Exact Changes Required for DQ Compliance

## 1. Font Changes

### File: `index.html`
```html
<!-- REMOVE -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- ADD -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap" rel="stylesheet">
```

### File: `tailwind.config.ts`
```typescript
// CHANGE FROM
extend: {
  fontFamily: {
    sans: ['Poppins', 'sans-serif'],
    display: ['Poppins', 'sans-serif'],
  },

// CHANGE TO
extend: {
  fontFamily: {
    sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
    display: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  },
```

---

## 2. Color Token Replacements

### Global Find & Replace

| Find | Replace | Occurrences |
|------|---------|-------------|
| `#ff6b4d` | `var(--dq-orange-500)` | 50+ |
| `#0B0C19` | `var(--dq-navy-950)` | 30+ |
| `#4B5563` | `var(--dq-text-secondary)` | 20+ |
| `#1e2348` | `var(--dq-navy-950)` | 15+ |
| `#2a3058` | `var(--dq-navy-800)` | 10+ |
| `#9CA3AF` | `var(--dq-gray-400)` | 5+ |

### Files Affected (in priority order)
1. `src/components/home/FacultySection.tsx`
2. `src/components/home/SixXDSection.tsx`
3. `src/pages/SixXD.tsx`
4. `src/pages/Testimonials.tsx`
5. `src/pages/personas/TransformationSpecialists.tsx`
6. `src/pages/personas/OrganizationalLeaders.tsx`
7. `src/pages/personas/DigitalWorkers.tsx`
8. `src/pages/dimensions/DigitalEconomy.tsx`
9. `src/pages/dimensions/DigitalCognitiveOrganisation.tsx`
10. `src/pages/dimensions/DigitalBusinessPlatform.tsx`
11. `src/pages/dimensions/DigitalTransformation.tsx`
12. `src/pages/dimensions/DigitalWorkerWorkspace.tsx`
13. `src/pages/dimensions/DigitalAccelerators.tsx`
14. `src/components/home/HBSHeroSection.tsx`

---

## 3. Card Styling Changes

### File: `src/components/home/FeaturedCoursesSection2.tsx`

**Line ~60 (Course Cards):**
```typescript
// CHANGE FROM
<Link
  key={course.id}
  to={`/courses/${course.id}`}
  className="bg-white rounded-2xl overflow-hidden border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-all group"
>

// CHANGE TO
<Link
  key={course.id}
  to={`/courses/${course.id}`}
  className="bg-white rounded-xl overflow-hidden border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-all group"
>
```

**Line ~75 (Card Content):**
```typescript
// CHANGE FROM
<div className="p-5">

// CHANGE TO
<div className="p-6">
```

---

### File: `src/components/home/FacultySection.tsx`

**Line ~130 (Human Faculty Cards):**
```typescript
// CHANGE FROM
<div
  key={faculty.name}
  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
>

// CHANGE TO
<div
  key={faculty.name}
  className="bg-white rounded-xl overflow-hidden border border-[var(--dq-surface-border-default)] shadow-sm hover:shadow-lg transition-all duration-300 group"
>
```

**Line ~180 (AI Expert Cards):**
```typescript
// CHANGE FROM
<div
  key={expert.dimension}
  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#ff6b4d]/20"
>

// CHANGE TO
<div
  key={expert.dimension}
  className="bg-white rounded-xl overflow-hidden border border-[var(--dq-surface-border-default)] shadow-sm hover:shadow-lg transition-all duration-300 group"
>
```

---

## 4. Typography Changes

### File: `src/styles/dq-design-tokens.css`

**Add at the end of the file:**
```css
/* ─── OVERLINE COMPONENT ─── */
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

.overline-navy {
  color: var(--dq-navy-950);
}

/* ─── HEADING LETTER-SPACING ─── */
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

---

## 5. Overline Component Updates

### All Files with Overlines

**Pattern to Replace:**
```typescript
// CHANGE FROM
<p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
  {label}
</p>

// CHANGE TO
<p className="overline overline-orange mb-4">
  {label}
</p>
```

**Files with Overlines:**
- `src/components/home/FeaturedCoursesSection2.tsx` — "COURSES FOR YOU"
- `src/components/home/FacultySection.tsx` — "MEET YOUR TRAINERS"
- `src/components/home/SixXDSection.tsx` — "THE 6 DIMENSIONS OF DIGITAL"
- `src/pages/SixXD.tsx` — Multiple overlines
- `src/pages/Testimonials.tsx` — "HEAR FROM OUR LEARNERS"
- All persona pages — Various overlines
- All dimension pages — Various overlines

---

## 6. Gradient Updates

### File: `src/components/home/HBSHeroSection.tsx`

**Line ~30 (Gradient Overlay):**
```typescript
// CURRENT (acceptable per v1.2.0 carve-out, but verify contrast)
<div className="absolute inset-0 bg-gradient-to-br from-[#1e2348] via-[#1e2348] via-70% to-[#ff6b4d] opacity-90 z-0"></div>

// RECOMMENDED (use tokens)
<div className="absolute inset-0 bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-950)] via-70% to-[var(--dq-orange-500)] opacity-90 z-0"></div>
```

---

## 7. Verification Checklist

After making changes, verify:

- [ ] All text renders in Plus Jakarta Sans (not Poppins)
- [ ] All colors use `var(--dq-*)` tokens (no hardcoded hex)
- [ ] All cards have `rounded-xl` (12px) border-radius
- [ ] All cards have `p-6` (24px) padding
- [ ] All cards have 1px border
- [ ] All headings have letter-spacing applied
- [ ] All overlines use `.overline` class
- [ ] Navy shade is consistent (#030f35)
- [ ] Orange is only used for CTAs and accents
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] WCAG AA contrast on all text
- [ ] Focus-visible states on buttons

---

## 8. Testing Commands

```bash
# Check for remaining hardcoded colors
grep -r "#ff6b4d" src/
grep -r "#0B0C19" src/
grep -r "#4B5563" src/
grep -r "#1e2348" src/

# Check for Poppins references
grep -r "Poppins" src/

# Check for rounded-2xl (should be rounded-xl)
grep -r "rounded-2xl" src/

# Check for p-5 on cards (should be p-6)
grep -r "className.*p-5" src/
```

---

## 9. Rollback Plan

If issues arise:
1. Git revert to previous commit
2. Re-apply changes in smaller batches
3. Test after each batch

---

## 10. Timeline

| Task | Time | Status |
|------|------|--------|
| Font changes | 15 min | Ready |
| Color replacements | 3-4 hours | Ready |
| Card styling | 30 min | Ready |
| Typography updates | 30 min | Ready |
| Overline updates | 30 min | Ready |
| Testing & verification | 1-2 hours | Ready |
| **TOTAL** | **6-7 hours** | **Ready** |

---

## Notes

- All changes are **non-breaking** — no functionality changes
- All changes are **reversible** — can be undone with git revert
- No new dependencies required
- No routing changes
- No business logic changes
- No component structure changes

---

**Ready to implement?** Start with font changes, then proceed with color replacements.
