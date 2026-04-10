# DTMA Typography Scale

**Font Family:** Poppins  
**Scale Type:** 1.25 (Major Third)  
**Base Size:** 16px

## Type Scale Reference

| Style Name | Font Size | Line Height | Font Weight | Usage | Tailwind Classes |
|------------|-----------|-------------|-------------|-------|------------------|
| **Display / XL** | 40px | 48px | 600 | Hero headings | `text-[40px] leading-[48px] font-semibold` |
| **Heading / H1** | 32px | 40px | 600 | Page titles | `text-[32px] leading-[40px] font-semibold` |
| **Heading / H2** | 28px | 36px | 600 | Section titles | `text-[28px] leading-[36px] font-semibold` |
| **Heading / H3** | 24px | 32px | 500 | Subsections | `text-[24px] leading-[32px] font-medium` |
| **Heading / H4** | 20px | 28px | 500 | Card titles | `text-[20px] leading-[28px] font-medium` |
| **Body / Large** | 18px | 28px | 400 | Important text | `text-[18px] leading-[28px] font-normal` |
| **Body / Default** | 16px | 24px | 400 | Main body text | `text-[16px] leading-[24px] font-normal` |
| **Body / Small** | 14px | 20px | 400 | Secondary text | `text-[14px] leading-[20px] font-normal` |
| **Label** | 12px | 16px | 500 | Inputs, captions | `text-[12px] leading-[16px] font-medium` |
| **Micro** | 10px | 14px | 500 | Tags, metadata | `text-[10px] leading-[14px] font-medium` |

## Color Palette

- **Primary Orange:** #ff6b4d
- **Primary Navy:** #1e2348
- **Text Primary:** #1e2348
- **Text Secondary:** #6B7280 (gray-600)
- **Text Muted:** #9CA3AF (gray-400)

## Usage Examples

### Page Title
```tsx
<h1 className="text-[32px] leading-[40px] font-semibold text-[#1e2348]">
  Apply to Become a DTMA Instructor
</h1>
```

### Section Title
```tsx
<h2 className="text-[28px] leading-[36px] font-semibold text-[#1e2348]">
  Create your instructor account
</h2>
```

### Body Text
```tsx
<p className="text-[16px] leading-[24px] font-normal text-gray-600">
  Join our community of digital transformation experts
</p>
```

### Form Label
```tsx
<label className="text-[12px] leading-[16px] font-medium text-[#1e2348]">
  Email Address
</label>
```

### Button Text
```tsx
<button className="text-[16px] leading-[24px] font-semibold">
  Submit Application
</button>
```
