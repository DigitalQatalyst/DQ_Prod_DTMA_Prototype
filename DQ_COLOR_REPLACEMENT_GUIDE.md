# DQ Design System Color Replacement Guide

## Quick Reference: Find & Replace

Use these mappings to update all hardcoded colors to DQ tokens.

### Hex Color Replacements

| Old Color | Hex | New Token | DQ Hex | Files |
|-----------|-----|-----------|--------|-------|
| Old Navy | #1e2348 | var(--dq-navy-950) | #030f35 | 6 files |
| Old Orange | #ff6b4d | var(--dq-orange-500) | #fb5535 | 8+ files |
| Light Gray | #F5F6FA | var(--dq-surface-1) | #f6f6fb | 2 files |
| Border Gray | #E5E7EB | var(--dq-surface-border-default) | #d8d9e6 | 1 file |
| Dark Gray | #0B0C19 | var(--dq-text-primary) | #111118 | 2 files |
| Medium Gray | #4B5563 | var(--dq-text-secondary) | #2e2e42 | 2 files |
| Light Gray | #9CA3AF | var(--dq-text-disabled) | #8385a1 | 1 file |

### Tailwind Gradient Replacements

| Old Gradient | New Gradient | Use Case |
|--------------|--------------|----------|
| from-blue-50 to-blue-100 | from-[var(--dq-navy-100)] to-[var(--dq-navy-50)] | Navbar dropdown, course cards |
| from-purple-50 to-purple-100 | from-[var(--dq-navy-100)] to-[var(--dq-navy-50)] | Navbar dropdown, course cards |
| from-green-50 to-green-100 | from-[var(--dq-navy-100)] to-[var(--dq-navy-50)] | Navbar dropdown, course cards |
| from-pink-50 to-pink-100 | from-[var(--dq-navy-100)] to-[var(--dq-navy-50)] | Navbar dropdown, course cards |
| from-red-50 to-red-100 | from-[var(--dq-navy-100)] to-[var(--dq-navy-50)] | Navbar dropdown, course cards |

### Semantic Color Replacements

| Old Color | New Token | DQ Hex | Use Case |
|-----------|-----------|--------|----------|
| bg-green-600 | var(--dq-success) | #16a34a | KHDA badge, verified status |
| text-green-600 | var(--dq-success) | #16a34a | Verified text |
| bg-red-50 | var(--dq-warning-surface) | #fef3c7 | Limited availability badge |
| text-red-700 | var(--dq-warning-text) | #b45309 | Limited availability text |

### Tailwind Class Replacements

| Old Class | New Class | Reason |
|-----------|-----------|--------|
| rounded-2xl | rounded-xl | DQ standard is 12px, not 16px |
| bg-red-50 | bg-[var(--dq-warning-surface)] | Use DQ semantic colors |
| text-red-700 | text-[var(--dq-warning-text)] | Use DQ semantic colors |
| bg-green-600 | bg-[var(--dq-success)] | Use DQ semantic colors |
| text-green-600 | text-[var(--dq-success)] | Use DQ semantic colors |

---

## File-by-File Changes

### 1. index.html

**FIND:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**REPLACE WITH:**
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

### 2. tailwind.config.ts

**FIND:**
```typescript
fontFamily: {
  sans: ['Poppins', 'sans-serif'],
  display: ['Poppins', 'sans-serif'],
},
```

**REPLACE WITH:**
```typescript
fontFamily: {
  sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  display: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SF Mono', 'monospace'],
},
```

**ADD to colors section:**
```typescript
colors: {
  // ... existing colors ...
  'dq-navy': {
    950: 'var(--dq-navy-950)',
    900: 'var(--dq-navy-900)',
    800: 'var(--dq-navy-800)',
    700: 'var(--dq-navy-700)',
    600: 'var(--dq-navy-600)',
    500: 'var(--dq-navy-500)',
    400: 'var(--dq-navy-400)',
    300: 'var(--dq-navy-300)',
    200: 'var(--dq-navy-200)',
    100: 'var(--dq-navy-100)',
    50: 'var(--dq-navy-50)',
  },
  'dq-orange': {
    950: 'var(--dq-orange-950)',
    900: 'var(--dq-orange-900)',
    800: 'var(--dq-orange-800)',
    700: 'var(--dq-orange-700)',
    600: 'var(--dq-orange-600)',
    500: 'var(--dq-orange-500)',
    400: 'var(--dq-orange-400)',
    300: 'var(--dq-orange-300)',
    200: 'var(--dq-orange-200)',
    100: 'var(--dq-orange-100)',
    50: 'var(--dq-orange-50)',
  },
  'dq-gray': {
    950: 'var(--dq-gray-950)',
    900: 'var(--dq-gray-900)',
    800: 'var(--dq-gray-800)',
    700: 'var(--dq-gray-700)',
    600: 'var(--dq-gray-600)',
    500: 'var(--dq-gray-500)',
    400: 'var(--dq-gray-400)',
    300: 'var(--dq-gray-300)',
    200: 'var(--dq-gray-200)',
    100: 'var(--dq-gray-100)',
    50: 'var(--dq-gray-50)',
  },
},
```

---

### 3. src/components/home/HBSHeroSection.tsx

**FIND:**
```typescript
<div className="absolute inset-0 bg-gradient-to-br from-[#1e2348] via-[#1e2348] via-70% to-[#ff6b4d] opacity-90 z-0"></div>
```

**REPLACE WITH:**
```typescript
<div className="absolute inset-0 bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-950)] via-70% to-[var(--dq-orange-500)] opacity-90 z-0"></div>
```

**FIND:**
```typescript
<p className="text-[12px] leading-[16px] font-medium text-[#ff6b4d] mb-6 tracking-wide uppercase">
```

**REPLACE WITH:**
```typescript
<p className="text-[12px] leading-[16px] font-medium text-[var(--dq-orange-500)] mb-6 tracking-wide uppercase">
```

**FIND:**
```typescript
<MessageSquare className="w-5 h-5 text-[#ff6b4d] flex-shrink-0" />
```

**REPLACE WITH:**
```typescript
<MessageSquare className="w-5 h-5 text-[var(--dq-orange-500)] flex-shrink-0" />
```

**FIND:**
```typescript
<div className="flex items-center gap-2 px-4 py-2 bg-[#ff6b4d] hover:bg-[#e56045] rounded-lg transition-colors cursor-pointer">
```

**REPLACE WITH:**
```typescript
<div className="flex items-center gap-2 px-4 py-2 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] rounded-lg transition-colors cursor-pointer">
```

**FIND:**
```typescript
<Button variant="hero" size="lg" className="px-8 py-6 bg-[#ff6b4d] hover:bg-[#e56045] text-white text-[16px] leading-[24px] font-normal" style={{ border: '1.5px solid transparent' }}>
```

**REPLACE WITH:**
```typescript
<Button variant="hero" size="lg" className="px-8 py-6 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white text-[16px] leading-[24px] font-normal" style={{ border: '1.5px solid transparent' }}>
```

---

### 4. src/components/home/TestimonialsSection.tsx

**FIND:**
```typescript
<p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
```

**REPLACE WITH:**
```typescript
<p className="text-sm font-semibold text-[var(--dq-orange-500)] uppercase tracking-wide mb-4">
```

**FIND:**
```typescript
className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow flex items-center justify-center text-[#4B5563] hover:text-[#ff6b4d] z-10"
```

**REPLACE WITH:**
```typescript
className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow flex items-center justify-center text-[var(--dq-text-secondary)] hover:text-[var(--dq-orange-500)] z-10"
```

**FIND:**
```typescript
className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow flex items-center justify-center text-[#4B5563] hover:text-[#ff6b4d] z-10"
```

**REPLACE WITH:**
```typescript
className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow flex items-center justify-center text-[var(--dq-text-secondary)] hover:text-[var(--dq-orange-500)] z-10"
```

**FIND:**
```typescript
<div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F5F6FA] shadow-md">
```

**REPLACE WITH:**
```typescript
<div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[var(--dq-surface-1)] shadow-md">
```

**FIND:**
```typescript
<p className="text-xl md:text-2xl font-medium text-[#0B0C19] leading-relaxed">
```

**REPLACE WITH:**
```typescript
<p className="text-xl md:text-2xl font-medium text-[var(--dq-text-primary)] leading-relaxed">
```

**FIND:**
```typescript
<p className="text-base text-[#4B5563]">
```

**REPLACE WITH:**
```typescript
<p className="text-base text-[var(--dq-text-secondary)]">
```

**FIND:**
```typescript
<p className="text-sm text-[#9CA3AF] mt-1">
```

**REPLACE WITH:**
```typescript
<p className="text-sm text-[var(--dq-text-disabled)] mt-1">
```

**FIND:**
```typescript
<Link
  to="/testimonials"
  className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b4d] hover:bg-[#e56045] text-white rounded-lg font-medium transition-colors"
>
```

**REPLACE WITH:**
```typescript
<Link
  to="/testimonials"
  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white rounded-lg font-medium transition-colors"
>
```

**FIND:**
```typescript
className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
  index === currentIndex 
    ? 'bg-[#ff6b4d] w-8' 
    : 'bg-[#E5E7EB] hover:bg-[#9CA3AF]'
}`}
```

**REPLACE WITH:**
```typescript
className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
  index === currentIndex 
    ? 'bg-[var(--dq-orange-500)] w-8' 
    : 'bg-[var(--dq-surface-border-default)] hover:bg-[var(--dq-text-disabled)]'
}`}
```

---

### 5. src/components/home/BenefitsSection.tsx

**FIND:**
```typescript
<p className="text-sm font-semibold text-[var(--dq-orange-500)] uppercase tracking-wide mb-4">
```

Already correct ✅

**FIND:**
```typescript
className="flex flex-col items-start p-6 bg-[var(--dq-gray-50)] rounded-2xl hover:shadow-lg transition-shadow duration-300"
```

**REPLACE WITH:**
```typescript
className="flex flex-col items-start p-6 bg-[var(--dq-gray-50)] rounded-xl hover:shadow-lg transition-shadow duration-300"
```

---

### 6. src/components/home/FeaturedCoursesSection2.tsx

**FIND:**
```typescript
<div className="flex items-center gap-1 px-3 py-1.5 bg-green-600 rounded-full w-fit">
```

**REPLACE WITH:**
```typescript
<div className="flex items-center gap-1 px-3 py-1.5 bg-[var(--dq-success)] rounded-full w-fit">
```

**FIND:**
```typescript
className="bg-white rounded-2xl overflow-hidden border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-all group"
```

**REPLACE WITH:**
```typescript
className="bg-white rounded-xl overflow-hidden border border-[var(--dq-surface-border-default)] hover:shadow-lg transition-all group"
```

---

### 7. src/components/home/SixXDSection.tsx

**FIND:**
```typescript
const dimensions = [
  {
    title: "Digital Economy (DE)",
    subtitle: "Why should organisations change?",
    description: "The digital economy is redrawing industries, value chains, and competitive dynamics. Gain clarity to read these shifts and position your organisation for Economy 4.0.",
    color: "#1e2348", // DTMA Navy Blue
    link: "/dimensions/digital-economy",
  },
  // ... more items with color: "#1e2348"
];
```

**REPLACE WITH:**
```typescript
const dimensions = [
  {
    title: "Digital Economy (DE)",
    subtitle: "Why should organisations change?",
    description: "The digital economy is redrawing industries, value chains, and competitive dynamics. Gain clarity to read these shifts and position your organisation for Economy 4.0.",
    color: "var(--dq-navy-950)", // DQ Navy
    link: "/dimensions/digital-economy",
  },
  // ... more items with color: "var(--dq-navy-950)"
];
```

**FIND:**
```typescript
className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
```

**REPLACE WITH:**
```typescript
className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
```

---

### 8. src/components/home/HowItWorksSection.tsx

**FIND:**
```typescript
const personas = [
  {
    heading: "Digital Workers",
    description: "Learn how a Digital Cognitive Organization operates and what your role within it demands. Build the competencies to collaborate, adapt, and deliver in a digital-first environment.",
    link: "/personas/digital-workers",
    color: "#ff6b4d", // DTMA Orange
  },
  // ... more items with color: "#ff6b4d"
];
```

**REPLACE WITH:**
```typescript
const personas = [
  {
    heading: "Digital Workers",
    description: "Learn how a Digital Cognitive Organization operates and what your role within it demands. Build the competencies to collaborate, adapt, and deliver in a digital-first environment.",
    link: "/personas/digital-workers",
    color: "var(--dq-orange-500)", // DQ Orange
  },
  // ... more items with color: "var(--dq-orange-500)"
];
```

**FIND:**
```typescript
<p className="text-[12px] leading-[16px] font-medium text-[#ff6b4d] uppercase tracking-wide mb-4">
```

**REPLACE WITH:**
```typescript
<p className="text-[12px] leading-[16px] font-medium text-[var(--dq-orange-500)] uppercase tracking-wide mb-4">
```

**FIND:**
```typescript
<h2 className="text-[28px] leading-[36px] font-semibold text-[#0B0C19] mb-6">
```

**REPLACE WITH:**
```typescript
<h2 className="text-[28px] leading-[36px] font-semibold text-[var(--dq-text-primary)] mb-6">
```

**FIND:**
```typescript
<div
  key={index}
  className="bg-[#F5F6FA] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col"
>
```

**REPLACE WITH:**
```typescript
<div
  key={index}
  className="bg-[var(--dq-surface-1)] rounded-xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col"
>
```

**FIND:**
```typescript
<h3 className="text-[20px] leading-[28px] font-medium text-[#0B0C19] mb-4">
```

**REPLACE WITH:**
```typescript
<h3 className="text-[20px] leading-[28px] font-medium text-[var(--dq-text-primary)] mb-4">
```

**FIND:**
```typescript
<p className="text-[14px] leading-[20px] font-normal text-[#4B5563] mb-6 flex-grow">
```

**REPLACE WITH:**
```typescript
<p className="text-[14px] leading-[20px] font-normal text-[var(--dq-text-secondary)] mb-6 flex-grow">
```

---

### 9. src/components/home/StartNowSection.tsx

**FIND:**
```typescript
<section className="py-20 bg-gradient-to-br from-[#1e2348] via-[#1e2348] via-70% to-[#ff6b4d]">
```

**REPLACE WITH:**
```typescript
<section className="py-20 bg-gradient-to-br from-[var(--dq-navy-950)] via-[var(--dq-navy-950)] via-70% to-[var(--dq-orange-500)]">
```

**FIND:**
```typescript
<p className="text-sm font-semibold text-[#ff6b4d] uppercase tracking-wide mb-4">
```

**REPLACE WITH:**
```typescript
<p className="text-sm font-semibold text-[var(--dq-orange-500)] uppercase tracking-wide mb-4">
```

**FIND:**
```typescript
<Button
  className="px-8 py-6 bg-[#ff6b4d] hover:bg-[#e56045] text-white border-transparent text-base gap-2"
>
```

**REPLACE WITH:**
```typescript
<Button
  className="px-8 py-6 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white border-transparent text-base gap-2"
>
```

---

### 10. src/components/layout/Footer.tsx

**FIND:**
```typescript
className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] flex items-center justify-center transition-colors"
```

Already correct ✅

**FIND:**
```typescript
className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center"
>
  <Award className="w-6 h-6 text-[var(--dq-orange-500)]" />
```

Already correct ✅

---

### 11. src/components/layout/Navbar.tsx

**FIND:**
```typescript
<div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-all">
```

**REPLACE WITH:**
```typescript
<div className="bg-gradient-to-br from-[var(--dq-navy-100)] to-[var(--dq-navy-50)] rounded-xl p-6 hover:shadow-lg transition-all">
```

**FIND:**
```typescript
<div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-all">
```

**REPLACE WITH:**
```typescript
<div className="bg-gradient-to-br from-[var(--dq-navy-100)] to-[var(--dq-navy-50)] rounded-xl p-6 hover:shadow-lg transition-all">
```

**FIND:**
```typescript
<div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-all">
```

**REPLACE WITH:**
```typescript
<div className="bg-gradient-to-br from-[var(--dq-navy-100)] to-[var(--dq-navy-50)] rounded-xl p-6 hover:shadow-lg transition-all">
```

**FIND:**
```typescript
<div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 hover:shadow-lg transition-all">
```

**REPLACE WITH:**
```typescript
<div className="bg-gradient-to-br from-[var(--dq-navy-100)] to-[var(--dq-navy-50)] rounded-xl p-6 hover:shadow-lg transition-all">
```

**FIND:**
```typescript
<div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 hover:shadow-lg transition-all">
```

**REPLACE WITH:**
```typescript
<div className="bg-gradient-to-br from-[var(--dq-navy-100)] to-[var(--dq-navy-50)] rounded-xl p-6 hover:shadow-lg transition-all">
```

**FIND:**
```typescript
<h2 className="text-2xl font-semibold text-[#1e2348] mb-2">6XD Framework Courses</h2>
```

**REPLACE WITH:**
```typescript
<h2 className="text-2xl font-semibold text-[var(--dq-navy-950)] mb-2">6XD Framework Courses</h2>
```

**FIND:**
```typescript
<h3 className="text-lg font-semibold text-[#1e2348] mb-2 group-hover:text-[var(--dq-orange-500)] transition-colors">
```

Already correct ✅

**FIND:**
```typescript
<Link to="/courses" className="text-[#ff6b4d] hover:text-[#e56045] font-medium text-sm transition-colors inline-flex items-center gap-2">
```

**REPLACE WITH:**
```typescript
<Link to="/courses" className="text-[var(--dq-orange-500)] hover:text-[var(--dq-orange-600)] font-medium text-sm transition-colors inline-flex items-center gap-2">
```

**FIND:**
```typescript
<div className="w-8 h-8 rounded-full bg-[#1e2348] flex items-center justify-center text-xs font-semibold text-white">
```

**REPLACE WITH:**
```typescript
<div className="w-8 h-8 rounded-full bg-[var(--dq-navy-950)] flex items-center justify-center text-xs font-semibold text-white">
```

**FIND:**
```typescript
<Button 
  variant="hero" 
  size="sm" 
  onClick={handleSignIn}
  className="px-6 bg-[#ff6b4d] hover:bg-[#e56045] text-white border-transparent"
>
```

**REPLACE WITH:**
```typescript
<Button 
  variant="hero" 
  size="sm" 
  onClick={handleSignIn}
  className="px-6 bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white border-transparent"
>
```

---

## Summary

**Total replacements needed:**
- 7 hex color replacements
- 5 gradient replacements
- 3 semantic color replacements
- 1 border radius fix (rounded-2xl → rounded-xl)
- 2 font updates (index.html + tailwind.config.ts)

**Estimated time:** 2–3 hours for all changes + 1 hour for testing = 3–4 hours total.
