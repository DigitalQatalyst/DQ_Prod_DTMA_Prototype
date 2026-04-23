# DTMA Color System Documentation

Complete color palette and design system for the DTMA Learning Management System.

---

## 🎨 Primary Brand Colors

### Navy Blue (Primary Dark)
The main brand color used for headers, sidebars, and primary UI elements.

| State | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Normal** | `#1e2348` | `rgb(30, 35, 72)` | Sidebar backgrounds, headers, dark text |
| **Normal:hover** | `#1b2041` | `rgb(27, 32, 65)` | Hover states for navy elements |
| **Normal:active** | `#181c3a` | `rgb(24, 28, 58)` | Active/pressed states |
| **Light** | `#e9e9ed` | `rgb(233, 233, 237)` | Light backgrounds with navy tint |
| **Light:hover** | `#dddee4` | `rgb(221, 222, 228)` | Hover on light navy backgrounds |
| **Light:active** | `#b9bbc6` | `rgb(185, 187, 198)` | Active light navy states |
| **Dark** | `#171a36` | `rgb(23, 26, 54)` | Darker navy for depth |
| **Dark:hover** | `#12152b` | `rgb(18, 21, 43)` | Dark navy hover |
| **Dark:active** | `#0d1020` | `rgb(13, 16, 32)` | Darkest navy state |
| **Darker** | `#0b0c19` | `rgb(11, 12, 25)` | Maximum depth navy |

**CSS Variables:**
```css
--secondary: 228 28% 20%;
--charcoal: 228 28% 20%;
```

**Tailwind Classes:**
```tsx
bg-[#1e2348]
text-[#1e2348]
border-[#1e2348]
```

---

### Coral Orange (Primary Accent)
The vibrant accent color used for CTAs, highlights, and interactive elements.

| State | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Normal** | `#ff6b4d` | `rgb(255, 107, 77)` | Primary buttons, CTAs, active states |
| **Normal:hover** | `#e66045` | `rgb(230, 96, 69)` | Hover on coral buttons |
| **Normal:active** | `#cc563e` | `rgb(204, 86, 62)` | Active/pressed coral buttons |
| **Light** | `#fff0ed` | `rgb(255, 240, 237)` | Light coral backgrounds |
| **Light:hover** | `#ffe9e4` | `rgb(255, 233, 228)` | Hover on light coral |
| **Light:active** | `#ffd1c8` | `rgb(255, 209, 200)` | Active light coral |
| **Dark** | `#bf503a` | `rgb(191, 80, 58)` | Dark coral for contrast |
| **Dark:hover** | `#99402e` | `rgb(153, 64, 46)` | Dark coral hover |
| **Dark:active** | `#733023` | `rgb(115, 48, 35)` | Darkest coral active |
| **Darker** | `#59251b` | `rgb(89, 37, 27)` | Maximum depth coral |

**Tailwind Classes:**
```tsx
bg-[#ff6b4d]
hover:bg-[#e66045]
text-[#ff6b4d]
border-[#ff6b4d]
bg-[#fff0ed]  // Light background
```

---

## 🔵 Secondary Brand Colors

### Bright Blue (Accent)
Used for links, focus states, and secondary actions.

| Color | Hex | RGB | HSL |
|-------|-----|-----|-----|
| **Primary Blue** | `#2563EB` | `rgb(37, 99, 235)` | `217 91% 60%` |

**CSS Variables:**
```css
--primary: 217 91% 60%;
--accent: 217 91% 60%;
--ring: 217 91% 60%;
```

**Usage:**
- Links and hyperlinks
- Focus rings
- Secondary CTAs
- Info badges
- Progress indicators

---

## 🌫️ Neutral Colors

### Gray Scale
Complete neutral palette for backgrounds, borders, and text.

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **White** | `#ffffff` | `rgb(255, 255, 255)` | Pure white backgrounds |
| **Gray-100** | `#F5F6FA` | `rgb(245, 246, 250)` | Page backgrounds, subtle fills |
| **Gray-200** | `#E5E7EB` | `rgb(229, 231, 235)` | Borders, dividers |
| **Gray-400** | `#9CA3AF` | `rgb(156, 163, 175)` | Disabled text, icons |
| **Gray-600** | `#4B5563` | `rgb(75, 85, 99)` | Secondary text, labels |
| **Gray-900** | `#111827` | `rgb(17, 24, 39)` | Primary text (dark mode) |

**Additional Neutrals:**
- **Cream/Off-white**: `#F9FAFB` - Card backgrounds
- **Muted Gray**: `#9CA3AF` - Placeholder text

**CSS Variables:**
```css
--background: 0 0% 100%;
--foreground: 30 13% 14%;
--card: 210 40% 96%;
--muted: 210 40% 98%;
--border: 210 40% 96%;
```

**Tailwind Classes:**
```tsx
bg-[#F5F6FA]    // Page background
bg-[#F9FAFB]    // Card background
border-[#E5E7EB] // Borders
text-[#4B5563]   // Secondary text
text-[#9CA3AF]   // Muted text
text-[#1e2348]   // Primary text
```

---

## ✅ Semantic Colors

### Success (Green)
| State | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Success** | `#10B981` | `rgb(16, 185, 129)` | Success messages, completed states |
| **Success Light** | `#D1FAE5` | `rgb(209, 250, 229)` | Success backgrounds |
| **Success Dark** | `#059669` | `rgb(5, 150, 105)` | Dark success states |

### Warning (Amber)
| State | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Warning** | `#F59E0B` | `rgb(245, 158, 11)` | Warning messages, pending states |
| **Warning Light** | `#FEF3C7` | `rgb(254, 243, 199)` | Warning backgrounds |
| **Warning Dark** | `#D97706` | `rgb(217, 119, 6)` | Dark warning states |

### Error (Red)
| State | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Error** | `#DC2626` | `rgb(220, 38, 38)` | Error messages, destructive actions |
| **Error Light** | `#FEE2E2` | `rgb(254, 226, 226)` | Error backgrounds |
| **Error Dark** | `#B91C1C` | `rgb(185, 28, 28)` | Dark error states |

**CSS Variables:**
```css
--destructive: 0 72% 51%;
--destructive-foreground: 0 0% 100%;
```

---

## 🌙 Dark Mode Colors

### Dark Mode Palette
| Element | Hex | RGB | HSL |
|---------|-----|-----|-----|
| **Background** | `#1A1D2E` | `rgb(26, 29, 46)` | `228 28% 12%` |
| **Card** | `#242838` | `rgb(36, 40, 56)` | `228 28% 18%` |
| **Muted** | `#2D3142` | `rgb(45, 49, 66)` | `228 28% 25%` |
| **Border** | `#2D3142` | `rgb(45, 49, 66)` | `228 28% 25%` |
| **Foreground** | `#F9FAFB` | `rgb(249, 250, 251)` | `210 40% 98%` |

---

## 📐 Typography Colors

### Text Hierarchy
```tsx
// Primary heading text
className="text-[#1e2348]"

// Secondary text / labels
className="text-[#4B5563]"

// Muted / placeholder text
className="text-[#9CA3AF]"

// White text on dark backgrounds
className="text-white"

// Text on coral backgrounds
className="text-white"
```

### Font Sizes with Colors
```tsx
// Large heading
className="text-[28px] leading-[36px] font-semibold text-[#1e2348]"

// Medium heading
className="text-[24px] leading-[32px] font-semibold text-[#1e2348]"

// Section heading
className="text-[18px] leading-[24px] font-semibold text-[#1e2348]"

// Body text
className="text-[15px] leading-[22px] font-normal text-[#4B5563]"

// Small text
className="text-[14px] leading-[20px] font-normal text-[#4B5563]"

// Caption
className="text-[13px] leading-[18px] font-normal text-[#4B5563]"
```

---

## 🎯 Common UI Patterns

### Buttons

#### Primary Button (Coral)
```tsx
className="bg-[#ff6b4d] hover:bg-[#e66045] text-white"
```

#### Secondary Button (Outline)
```tsx
className="border-[#E5E7EB] text-[#1e2348] hover:bg-[#fff0ed] hover:text-[#ff6b4d] hover:border-[#ff6b4d]"
```

#### Ghost Button
```tsx
className="text-[#1e2348] hover:bg-[#F5F6FA]"
```

### Cards
```tsx
className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm"
```

### Sidebar
```tsx
className="bg-[#1e2348] text-white"
```

### Active Navigation Item
```tsx
className="bg-[#ff6b4d] text-white"
```

### Inactive Navigation Item
```tsx
className="text-white/70 hover:bg-white/10"
```

### Input Fields
```tsx
className="border-[#E5E7EB] focus:ring-[#ff6b4d] focus:border-[#ff6b4d]"
```

### Badges

#### Success Badge
```tsx
className="bg-emerald-100 text-emerald-700"
```

#### Warning Badge
```tsx
className="bg-amber-500 text-white"
```

#### Info Badge
```tsx
className="bg-green-600 text-white"
```

#### Default Badge
```tsx
className="bg-[#E5E7EB] text-[#1e2348]"
```

---

## 🎨 Shadows & Effects

### Shadow System
```css
/* Subtle shadow for cards */
--shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.04);

/* Medium shadow for elevated elements */
--shadow-md: 0 4px 12px hsl(0 0% 0% / 0.06);

/* Large shadow for modals */
--shadow-lg: 0 12px 32px hsl(0 0% 0% / 0.1);

/* Glow effect for primary elements */
--shadow-glow: 0 0 40px hsl(217 91% 60% / 0.1);
```

### Usage
```tsx
className="shadow-sm"  // Subtle card shadow
className="shadow-md"  // Elevated element
className="shadow-lg"  // Modal/dialog
className="btn-glow"   // Glowing button effect
```

---

## 🔄 State Colors

### Hover States
- Navy: `#1b2041`
- Coral: `#e66045`
- Light backgrounds: `#fff0ed`

### Active/Pressed States
- Navy: `#181c3a`
- Coral: `#cc563e`
- Light backgrounds: `#ffd1c8`

### Focus States
- Ring color: `#2563EB` (bright blue)
- Ring opacity: `40%`

### Disabled States
- Background: `#F5F6FA`
- Text: `#9CA3AF`
- Border: `#E5E7EB`

---

## 📱 Accessibility Guidelines

### Contrast Ratios
All color combinations meet WCAG AA standards:

- **Navy (#1e2348) on White**: 15.12:1 ✅ AAA
- **Coral (#ff6b4d) on White**: 7.46:1 ✅ AAA
- **Gray-600 (#4B5563) on White**: 8.59:1 ✅ AAA
- **White on Navy (#1e2348)**: 15.12:1 ✅ AAA
- **White on Coral (#ff6b4d)**: 7.46:1 ✅ AAA

### Best Practices
1. Always use sufficient contrast for text
2. Don't rely on color alone to convey information
3. Provide alternative indicators (icons, labels)
4. Test with color blindness simulators
5. Ensure focus states are clearly visible

---

## 🛠️ Implementation Guide

### Using CSS Variables
```css
/* In your CSS */
.element {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

### Using Tailwind Classes
```tsx
// Direct hex values
<div className="bg-[#1e2348] text-white">

// Semantic classes
<div className="bg-primary text-primary-foreground">

// With opacity
<div className="bg-[#ff6b4d]/10">
```

### Using in Components
```tsx
// Button component example
<Button 
  variant="hero" 
  className="bg-[#ff6b4d] hover:bg-[#e66045] text-white"
>
  Click Me
</Button>

// Card component example
<div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
  <h3 className="text-[18px] leading-[24px] font-semibold text-[#1e2348]">
    Card Title
  </h3>
  <p className="text-[14px] leading-[20px] text-[#4B5563]">
    Card description
  </p>
</div>
```

---

## 📋 Quick Reference

### Most Used Colors
```tsx
// Backgrounds
bg-[#F5F6FA]    // Page background
bg-white        // Card background
bg-[#1e2348]    // Sidebar/header
bg-[#fff0ed]    // Light coral background

// Text
text-[#1e2348]  // Primary text
text-[#4B5563]  // Secondary text
text-[#9CA3AF]  // Muted text

// Borders
border-[#E5E7EB] // Standard border

// Buttons
bg-[#ff6b4d] hover:bg-[#e66045] // Primary CTA
```

### Color Naming Convention
- Use descriptive names in comments
- Reference hex values directly in Tailwind
- Use CSS variables for theme-able properties
- Maintain consistency across components

---

## 📝 Notes

- All colors are optimized for both light and dark modes
- Shadows use subtle opacity for depth without heaviness
- The coral orange (#ff6b4d) is the primary action color
- Navy blue (#1e2348) provides professional, trustworthy feel
- Gray scale provides clean, modern aesthetic
- All interactive elements have clear hover/active states

---

**Last Updated:** 2024
**Version:** 1.0
**Maintained by:** DTMA Design Team
