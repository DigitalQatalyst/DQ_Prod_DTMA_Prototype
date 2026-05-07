# DQ Design System Implementation Plan

## Overview
This document outlines the comprehensive implementation of the DQ Design System (v1.2.0) across all 5 stages of the DTMA LMS application.

**Status:** Foundation Created ✅  
**Design Tokens CSS:** `src/styles/dq-design-tokens.css` ✅  
**Global Import:** Added to `src/App.tsx` ✅

---

## Design System Baseline

### Primary Colors
- **Navy (Primary Dark):** `#030f35` (DQ Navy 950)
- **Orange (Primary CTA):** `#fb5535` (DQ Orange 500)
- **White (Canvas):** `#ffffff`

### Typography
- **Font Family:** Plus Jakarta Sans (weights: 200–800)
- **Display:** 72px / 700 / −1.5px letter-spacing
- **Heading 1:** 36px / 700 / −0.54px letter-spacing
- **Heading 2:** 30px / 600 / −0.30px letter-spacing
- **Heading 3:** 24px / 600 / −0.24px letter-spacing
- **Body:** 16px / 400 / 1.65 line-height
- **Caption:** 12px / 400

### Spacing
- **Base Grid:** 8px
- **Card Padding:** 24px (p-6)
- **Section Spacing:** 64–80px (py-16 lg:py-20)
- **Gap:** 24px (gap-6)

### Components
- **Border Radius:** 12px for cards (radius-xl), 8px for interactive (radius-lg)
- **Shadows:** Navy-tinted (rgba(3, 15, 53, ...))
- **Buttons:** Primary Orange, Secondary Navy, Outline, Ghost variants

---

## Implementation Phases

### Phase 1: Foundation ✅ COMPLETE
- [x] Create DQ design tokens CSS file
- [x] Import tokens globally in App.tsx
- [x] Define color palette
- [x] Define typography scale
- [x] Define spacing system
- [x] Define shadow system

### Phase 2: Stage 00 - Home/Landing Page
**Files to Update:**
- `src/pages/Index.tsx`
- `src/components/home/HBSHeroSection.tsx`
- `src/components/home/FeaturedCoursesSection2.tsx`
- `src/components/home/SixXDSection.tsx`
- `src/components/home/FacultySection.tsx`
- `src/components/home/BenefitsSection.tsx`
- `src/components/home/TestimonialsSection.tsx`
- `src/components/home/StartNowSection.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`

**Key Changes:**
- Replace all color values with DQ tokens
- Apply Plus Jakarta Sans with proper weights
- Standardize spacing to 8px grid
- Update button styles to DQ variants
- Ensure card styling: 12px radius, proper shadows
- Update typography to DQ scale

**Estimated Effort:** 4-6 hours

### Phase 3: Stage 01 - Learner Dashboard
**Files to Update:**
- `src/pages/dashboard/LearnerDashboard.tsx`
- `src/components/dashboard/ProfileManagement.tsx`
- `src/components/dashboard/ProgressTracking.tsx`
- `src/components/dashboard/AssignmentsCredentials.tsx`
- `src/components/dashboard/CertificatesBadges.tsx`
- `src/components/dashboard/CollaborationTools.tsx`
- `src/components/dashboard/LiveClassesNotifications.tsx`
- `src/components/dashboard/GamificationFeatures.tsx`

**Key Changes:**
- Replace sidebar navy `#1e2348` → `#030f35`
- Replace background `#E9EBF8` → `#f6f6fb`
- Remove gradient sidebar, use solid navy
- Apply Plus Jakarta Sans globally
- Standardize spacing to 8px multiples
- Update all color references to DQ tokens
- Implement DQ button variants
- Use DQ shadow system
- Update badge colors to DQ semantic palette

**Estimated Effort:** 5-7 hours

### Phase 4: Stage 02 - Course Learning Page
**Files to Update:**
- `src/pages/CourseLearning.tsx`
- `src/components/learning/CourseModuleNavigator.tsx`
- `src/components/learning/Module1Resource.tsx`
- `src/components/learning/Module2Resource.tsx`
- `src/components/learning/Module3Resource.tsx`
- `src/components/mentor/CourseTutorAI.tsx`

**Key Changes:**
- Replace all color references with DQ tokens
- Update background to `#ffffff` or `#f6f6fb`
- Ensure all CTAs use DQ Orange `#fb5535`
- Apply Plus Jakarta Sans with DQ weights
- Standardize spacing to 8px grid
- Update quiz styling to match DQ card system
- Implement DQ badge variants for resource types
- Use DQ progress bar styling
- Update all text colors to DQ hierarchy

**Estimated Effort:** 5-7 hours

### Phase 5: Stage 03 - Course Builder
**Files to Update:**
- `src/pages/CourseBuilder.tsx`
- `src/components/admin/CourseCreationFlow.tsx`
- `src/components/admin/CreateCourseModal.tsx`
- `src/components/admin/CoursePreviewModal.tsx`

**Key Changes:**
- Replace sidebar navy `#1e2348` → `#030f35`
- Update background to exact DQ value `#f6f6fb`
- Apply Plus Jakarta Sans globally
- Standardize all font weights to DQ scale
- Update all color references to DQ tokens
- Implement DQ form component styling
- Use DQ button variants throughout
- Standardize spacing to 8px grid
- Update step indicator styling
- Ensure all text uses DQ typography scale

**Estimated Effort:** 4-6 hours

### Phase 6: Stage 04 - Admin Dashboard
**Files to Update:**
- `src/pages/dashboard/AdminDashboard.tsx`
- `src/components/admin/AIUsageMonitoringDashboard.tsx`
- `src/components/admin/InviteManagement.tsx`
- `src/components/admin/WhatsAppAdminTab.tsx`
- `src/components/admin/WhatsAppAnalyticsDashboard.tsx`

**Key Changes:**
- Replace all navy references `#1e2348` → `#030f35`
- Update status badge colors to DQ semantic palette
- Apply Plus Jakarta Sans globally
- Standardize all font weights to DQ scale
- Update all color references to DQ tokens
- Implement DQ badge variants for roles/statuses
- Use DQ button variants throughout
- Standardize spacing to 8px grid
- Update table styling to match DQ system
- Ensure all text uses DQ typography scale

**Estimated Effort:** 4-6 hours

### Phase 7: Polish & Refinement
- Implement dark mode using DQ dark palette
- Verify WCAG AA contrast ratios
- Test responsive design across all breakpoints
- Performance optimization
- Cross-browser testing

**Estimated Effort:** 3-4 hours

---

## Color Replacement Reference

### Critical Replacements
```
OLD → NEW
#1e2348 → #030f35 (Navy - most common)
#E9EBF8 → #f6f6fb (Background)
#ff6b4d → #fb5535 (Orange - verify, very close)
#2a3058 → #030f35 (Dark navy)
#E5E7EB → #d8d9e6 (Border)
#F5F6FA → #f6f6fb (Light background)
```

### Text Color Hierarchy
```
Primary text:   #111118 (gray-900)
Secondary text: #2e2e42 (gray-700)
Tertiary text:  #5f607f (gray-500)
Muted text:     #8385a1 (gray-400)
```

### Semantic Colors
```
Success:  #16a34a (green)
Warning:  #d97706 (amber)
Error:    #dc2626 (red)
Info:     #2563eb (blue)
```

---

## Typography Implementation

### Font Import
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&family=JetBrains+Mono:wght@400;500&display=swap');
```

### Font Weight Usage
- **700 (Bold):** Display headings, H1
- **600 (SemiBold):** H2, H3, H4, H5, labels
- **500 (Medium):** Button text, nav links, UI labels
- **400 (Normal):** Body text, captions

### Letter Spacing
- Display (72px): −1.5px
- Display L (60px): −1.2px
- Display M (48px): −0.96px
- Heading 1 (36px): −0.54px
- Heading 2 (30px): −0.30px
- Heading 3 (24px): −0.24px
- Heading 4 (20px): −0.20px
- Body & below: 0

---

## Button Variants

### Primary (Orange)
```
Background: #fb5535
Text: white
Hover: #f24c2a
Active: #e04020
Focus ring: rgba(251, 85, 53, 0.30)
```

### Secondary (Navy)
```
Background: #030f35
Text: white
Hover: #050e4a
Active: #0a1a6e
Focus ring: rgba(3, 15, 53, 0.18)
```

### Outline (Navy)
```
Background: transparent
Border: 1.5px solid #030f35
Text: #030f35
Hover: background #f3f5fd
```

### Ghost
```
Background: transparent
Border: none
Text: #030f35
Hover: background #f6f6fb
```

---

## Component Styling

### Cards
```
Background: #ffffff
Border: 1px solid #d8d9e6
Border-radius: 12px
Padding: 24px
Shadow: 0 1px 2px rgba(3,15,53,0.05), 0 1px 3px rgba(3,15,53,0.08)
Hover shadow: 0 4px 6px rgba(3,15,53,0.07), 0 2px 4px rgba(3,15,53,0.06)
Hover transform: translateY(-2px)
```

### Badges
```
Success: bg-#dcfce7, text-#15803d
Warning: bg-#fef3c7, text-#b45309
Error: bg-#fee2e2, text-#b91c1c
Info: bg-#dbeafe, text-#1d4ed8
```

### Form Inputs
```
Border: 1.5px solid #d8d9e6
Border-radius: 8px
Padding: 10px 16px
Focus border: #fb5535
Focus ring: rgba(251, 85, 53, 0.30)
```

---

## Testing Checklist

### Color Compliance
- [ ] All navy references updated to #030f35
- [ ] All orange references verified as #fb5535
- [ ] All text colors use DQ hierarchy
- [ ] All backgrounds use DQ palette
- [ ] All borders use DQ palette
- [ ] Semantic colors applied correctly

### Typography Compliance
- [ ] Plus Jakarta Sans applied globally
- [ ] Font weights follow DQ scale (700/600/500/400)
- [ ] Letter spacing applied to display text
- [ ] Line heights match DQ scale
- [ ] Font sizes match DQ scale

### Spacing Compliance
- [ ] All spacing uses 8px multiples
- [ ] Card padding: 24px
- [ ] Section spacing: 64–80px
- [ ] Gap: 24px
- [ ] Border radius: 12px (cards), 8px (interactive)

### Component Compliance
- [ ] Buttons use DQ variants
- [ ] Cards use DQ styling
- [ ] Badges use DQ semantic colors
- [ ] Shadows use DQ system
- [ ] Focus rings visible and correct

### Accessibility
- [ ] WCAG AA contrast ratios verified
- [ ] Focus states visible
- [ ] Color not sole indicator
- [ ] Semantic HTML used

### Responsive Design
- [ ] Mobile (< 480px) tested
- [ ] Tablet (768–1023px) tested
- [ ] Desktop (≥ 1024px) tested
- [ ] Touch targets ≥ 44px

---

## Quick Reference: CSS Variables

```css
/* Colors */
--dq-navy-950: #030f35;
--dq-orange-500: #fb5535;
--dq-gray-50: #f6f6fb;
--dq-gray-100: #eeeff6;
--dq-gray-200: #d8d9e6;
--dq-gray-600: #454560;
--dq-gray-700: #2e2e42;
--dq-gray-900: #111118;

/* Typography */
--font-sans: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-weight-bold: 700;
--font-weight-semibold: 600;
--font-weight-medium: 500;
--font-weight-normal: 400;

/* Spacing */
--space-6: 24px;
--space-16: 64px;
--space-20: 80px;

/* Radius */
--radius-lg: 8px;
--radius-xl: 12px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(3, 15, 53, 0.05), 0 1px 3px rgba(3, 15, 53, 0.08);
--shadow-md: 0 4px 6px rgba(3, 15, 53, 0.07), 0 2px 4px rgba(3, 15, 53, 0.06);
```

---

## Next Steps

1. **Immediate:** Foundation phase complete ✅
2. **Next:** Begin Phase 2 (Home/Landing Page)
3. **Then:** Proceed through phases 3-6 sequentially
4. **Final:** Phase 7 (Polish & Refinement)

**Total Estimated Time:** 25-36 hours

---

## Notes

- All changes are non-breaking and additive
- Design tokens CSS provides fallback values
- Existing components can be updated incrementally
- No database changes required
- All changes are visual/styling only
- Git commits recommended after each phase

---

**Last Updated:** 2026-05-07  
**Version:** 1.0  
**Status:** Ready for Implementation
