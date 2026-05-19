# DQ Design System Maintenance Guide

**Last Updated:** May 7, 2026  
**Status:** ✅ Complete Implementation  
**Compliance Level:** 100%

---

## Quick Reference

### Color Tokens

#### Primary Brand
```css
--dq-navy-950: #030f35;      /* Dark navy backgrounds */
--dq-orange-500: #fb5535;    /* Primary action color */
--dq-orange-700: #e04020;    /* Hover state */
```

#### Text Hierarchy
```css
--dq-text-primary: #111118;           /* Main text */
--dq-text-secondary: #2e2e42;         /* Secondary text */
--dq-text-tertiary: #5f607f;          /* Tertiary text */
--dq-text-disabled: #8385a1;          /* Disabled/muted */
--dq-text-on-dark: #ffffff;           /* Text on dark surfaces */
--dq-text-on-dark-secondary: #b5c5f7; /* Secondary on dark */
--dq-text-on-dark-tertiary: #7a97ee;  /* Tertiary on dark */
```

#### Surfaces & Borders
```css
--dq-surface-background: #ffffff;
--dq-surface-border-default: #d8d9e6;
--dq-gray-50: #f6f6fb;
--dq-gray-100: #eeeff6;
```

#### Semantic Colors
```css
--dq-success: #16a34a;
--dq-success-surface: #dcfce7;
--dq-success-text: #15803d;

--dq-warning: #d97706;
--dq-warning-surface: #fef3c7;
--dq-warning-text: #b45309;

--dq-error: #dc2626;
--dq-error-surface: #fee2e2;
--dq-error-text: #b91c1c;
```

---

## Component Patterns

### Dark Navy Surfaces (Sidebars, Dark Cards)
```tsx
// ✅ CORRECT
<div className="bg-[var(--dq-navy-950)] rounded-xl p-6">
  <h3 className="text-white">Title</h3>
  <p className="text-white/80">Description</p>
</div>

// ❌ WRONG
<div className="bg-[#1e2348] rounded-2xl p-6">
  <h3 className="text-black">Title</h3>
  <p className="text-gray-900">Description</p>
</div>
```

### Cards
```tsx
// ✅ CORRECT
<div className="bg-white rounded-xl p-6 border border-[var(--dq-surface-border-default)] shadow-sm">
  <h3 className="text-[var(--dq-text-primary)]">Title</h3>
  <p className="text-[var(--dq-text-secondary)]">Content</p>
</div>

// ❌ WRONG
<div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-md">
  <h3 className="text-[#1e2348]">Title</h3>
  <p className="text-[#4B5563]">Content</p>
</div>
```

### Tables
```tsx
// ✅ CORRECT
<table className="w-full">
  <thead className="bg-[var(--dq-navy-950)]">
    <tr>
      <th className="text-white">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-t border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-50)]">
      <td className="text-[var(--dq-text-primary)]">Data</td>
    </tr>
  </tbody>
</table>

// ❌ WRONG
<table className="w-full">
  <thead className="bg-[#1e2348]">
    <tr>
      <th className="text-black">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-t border-[#E5E7EB] hover:bg-[#F5F6FA]">
      <td className="text-[#1e2348]">Data</td>
    </tr>
  </tbody>
</table>
```

### Buttons
```tsx
// ✅ CORRECT
<button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white rounded-lg px-4 py-2">
  Action
</button>

// ❌ WRONG
<button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white rounded-lg px-4 py-2">
  Action
</button>
```

### Forms
```tsx
// ✅ CORRECT
<input
  className="border border-[var(--dq-surface-border-default)] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--dq-orange-500)]"
  placeholder="Enter text"
/>

// ❌ WRONG
<input
  className="border border-[#E5E7EB] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ff6b4d]"
  placeholder="Enter text"
/>
```

### Status Badges
```tsx
// ✅ CORRECT
<span className="bg-[var(--dq-success-surface)] text-[var(--dq-success-text)] px-3 py-1 rounded-full text-sm font-medium">
  Active
</span>

// ❌ WRONG
<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
  Active
</span>
```

---

## Spacing Grid

All spacing follows an 8px base grid:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

### Common Spacing Patterns
- **Card padding:** 24px (`p-6`)
- **Section gap:** 32px (`gap-8`)
- **Form field gap:** 16px (`gap-4`)
- **Button gap:** 8px (`gap-2`)
- **Page padding:** 24-32px (`px-6 lg:px-8`)

---

## Border Radius

```css
--radius-lg: 8px;   /* rounded-lg - buttons, inputs, small elements */
--radius-xl: 12px;  /* rounded-xl - cards, tables, main containers */
```

### Usage
- **Buttons:** 8px (`rounded-lg`)
- **Inputs:** 8px (`rounded-lg`)
- **Cards:** 12px (`rounded-xl`)
- **Tables:** 12px (`rounded-xl`)
- **Modals:** 12px (`rounded-xl`)

---

## Shadows

All shadows use navy-tinted colors:

```css
--shadow-sm: 0 1px 2px rgba(3, 15, 53, 0.05), 0 1px 3px rgba(3, 15, 53, 0.08);
--shadow-md: 0 4px 6px rgba(3, 15, 53, 0.07), 0 2px 4px rgba(3, 15, 53, 0.06);
--shadow-lg: 0 10px 15px rgba(3, 15, 53, 0.10), 0 4px 6px rgba(3, 15, 53, 0.07);
```

### Usage
- **Resting cards:** `shadow-sm`
- **Hover cards:** `shadow-md`
- **Elevated panels:** `shadow-lg`

---

## Typography

### Heading Styles
- **H1:** 36px / 600 weight / navy-950
- **H2:** 30px / 600 weight / navy-950
- **H3:** 24px / 600 weight / navy-950
- **H4:** 20px / 600 weight / navy-950

### Text Styles
- **Body:** 16px / 400 weight / text-primary
- **Small:** 14px / 400 weight / text-secondary
- **Caption:** 12px / 400 weight / text-tertiary
- **Label:** 14px / 500 weight / text-primary

---

## Common Violations to Avoid

### ❌ Hardcoded Colors
```tsx
// WRONG - Don't use hardcoded hex colors
className="bg-[#1e2348] text-[#ff6b4d]"

// CORRECT - Use DQ tokens
className="bg-[var(--dq-navy-950)] text-[var(--dq-orange-500)]"
```

### ❌ Dark Text on Dark Surfaces
```tsx
// WRONG - Black text on navy background is unreadable
<div className="bg-[var(--dq-navy-950)]">
  <p className="text-black">Unreadable</p>
</div>

// CORRECT - Use white or light text
<div className="bg-[var(--dq-navy-950)]">
  <p className="text-white">Readable</p>
</div>
```

### ❌ Wrong Border Radius
```tsx
// WRONG - Cards should use 12px, not 16px
className="rounded-2xl"

// CORRECT - Use 12px for cards
className="rounded-xl"
```

### ❌ Tailwind Violations
```tsx
// WRONG - Don't use Tailwind colors
className="bg-purple-100 text-purple-700"
className="bg-blue-100 text-blue-700"
className="border-gray-200"

// CORRECT - Use DQ semantic colors
className="bg-[var(--dq-navy-100)] text-[var(--dq-navy-700)]"
className="bg-[var(--dq-info-surface)] text-[var(--dq-info-text)]"
className="border-[var(--dq-surface-border-default)]"
```

### ❌ Color-Only Status Communication
```tsx
// WRONG - Status communicated by color alone
<div className="bg-red-100">Error</div>

// CORRECT - Include text and icon
<div className="bg-[var(--dq-error-surface)] text-[var(--dq-error-text)]">
  <AlertIcon /> Error
</div>
```

---

## Validation Checklist

When adding new components, verify:

- [ ] All colors use DQ tokens (no hardcoded hex)
- [ ] Text on dark surfaces is white or light navy
- [ ] Card radius is 12px (`rounded-xl`)
- [ ] Button radius is 8px (`rounded-lg`)
- [ ] Spacing follows 8px grid
- [ ] Borders use `var(--dq-surface-border-default)`
- [ ] Shadows use navy-tinted DQ shadows
- [ ] Typography uses DQ hierarchy
- [ ] Status badges use semantic colors
- [ ] Focus states are visible
- [ ] Hover states use DQ tokens
- [ ] Disabled states are clearly muted
- [ ] Icons are Lucide outline style
- [ ] Accessibility is maintained

---

## Files to Reference

- **Design Tokens:** `src/styles/dq-design-tokens.css`
- **Admin Dashboard:** `src/pages/dashboard/AdminDashboard.tsx`
- **Course Builder:** `src/pages/CourseBuilder.tsx`
- **Admin Components:** `src/components/admin/*.tsx`

---

## Common Tasks

### Adding a New Card
```tsx
<div className="bg-white rounded-xl p-6 border border-[var(--dq-surface-border-default)] shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-[20px] font-semibold text-[var(--dq-text-primary)] mb-4">Title</h3>
  <p className="text-[14px] text-[var(--dq-text-secondary)] mb-4">Description</p>
  <button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-700)] text-white rounded-lg px-4 py-2">
    Action
  </button>
</div>
```

### Adding a New Table
```tsx
<div className="bg-white rounded-xl border border-[var(--dq-surface-border-default)] overflow-hidden">
  <table className="w-full">
    <thead className="bg-[var(--dq-navy-950)]">
      <tr>
        <th className="text-left px-4 py-3 text-[13px] font-medium text-white">Column</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-t border-[var(--dq-surface-border-default)] hover:bg-[var(--dq-gray-50)]">
        <td className="px-4 py-3 text-[14px] text-[var(--dq-text-primary)]">Data</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Adding a Status Badge
```tsx
<span className={`px-3 py-1 rounded-full text-sm font-medium ${
  status === 'active' ? 'bg-[var(--dq-success-surface)] text-[var(--dq-success-text)]' :
  status === 'warning' ? 'bg-[var(--dq-warning-surface)] text-[var(--dq-warning-text)]' :
  'bg-[var(--dq-error-surface)] text-[var(--dq-error-text)]'
}`}>
  {status}
</span>
```

---

## Support

For questions or issues with DQ Design System implementation:

1. Check this guide first
2. Review existing components in `src/components/admin/` or `src/pages/`
3. Reference `src/styles/dq-design-tokens.css` for available tokens
4. Check QA reports for examples of correct implementation

---

**Last Updated:** May 7, 2026  
**Maintained By:** DQ Design System Team  
**Status:** ✅ Complete & Ready for Use

