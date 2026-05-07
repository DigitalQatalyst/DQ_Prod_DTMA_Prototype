# Phase 2 Fixes - Quick Reference Guide

## Bulk Replacements for Dashboard Components

### Color Token Replacements (Apply to all remaining files)

```
#ff6b4d                    → var(--dq-orange-500)
#e56045                    → var(--dq-orange-600)
#1e2348                    → var(--dq-navy-950)
#2a3058                    → var(--dq-navy-950)
#E9EBF8                    → var(--dq-gray-50)
```

### Background Color Replacements

```
bg-[#ff6b4d]               → bg-[var(--dq-orange-500)]
bg-[#1e2348]               → bg-[var(--dq-navy-950)]
bg-[#ff6b4d]/10            → bg-[var(--dq-orange-50)]
bg-[#1e2348]/10            → bg-[var(--dq-navy-50)]
bg-green-500/10            → bg-[var(--dq-success-surface)]
bg-amber-500/10            → bg-[var(--dq-orange-50)]
```

### Text Color Replacements

```
text-[#ff6b4d]             → text-[var(--dq-orange-500)]
text-[#1e2348]             → text-[var(--dq-navy-950)]
text-muted-foreground      → text-[var(--dq-text-tertiary)]
text-foreground            → text-[var(--dq-text-primary)]
text-green-500             → text-[var(--dq-success)]
text-amber-500             → text-[var(--dq-orange-500)]
```

### Icon Color Replacements

```
<Icon className="w-5 h-5 text-[#ff6b4d]" />
→ <Icon className="w-5 h-5 text-[var(--dq-orange-500)]" />

<Icon className="w-5 h-5 text-[#1e2348]" />
→ <Icon className="w-5 h-5 text-[var(--dq-navy-950)]" />
```

### Border Radius Replacements

```
rounded-2xl                → rounded-xl
rounded-xl (on icons)      → rounded-lg
```

### Button Replacements

```
className="bg-[#ff6b4d] hover:bg-[#e56045] text-white"
→ className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white"

className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]"
→ className="hover:bg-[var(--dq-orange-50)] hover:text-[var(--dq-orange-500)] hover:border-[var(--dq-orange-500)]"
```

### Badge Replacements

```
<Badge className="bg-[#ff6b4d] text-white">
→ <Badge className="bg-[var(--dq-orange-500)] text-white">

<Badge className="bg-[#1e2348] text-white">
→ <Badge className="bg-[var(--dq-navy-950)] text-white">

<Badge className="bg-green-500/10 text-green-600 border-green-500/20">
→ <Badge className="bg-[var(--dq-success-surface)] text-[var(--dq-success-text)] border-[var(--dq-success)]/20">
```

### Avatar Fallback Replacements

```
<AvatarFallback className="bg-[#1e2348] text-white">
→ <AvatarFallback className="bg-[var(--dq-navy-950)] text-white">

<AvatarFallback className={msg.isInstructor ? 'bg-[#ff6b4d] text-white' : 'bg-[#1e2348] text-white'}>
→ <AvatarFallback className={msg.isInstructor ? 'bg-[var(--dq-orange-500)] text-white' : 'bg-[var(--dq-navy-950)] text-white'}>
```

---

## Files to Fix (in order of priority)

### Priority 1 (Most Violations)
1. **GamificationFeatures.tsx** - 18 violations
2. **CollaborationTools.tsx** - 15 violations
3. **LiveClassesNotifications.tsx** - 12 violations

### Priority 2 (Medium Violations)
4. **ProgressTracking.tsx** - 8 violations
5. **AssignmentsCredentials.tsx** - 8 violations

### Priority 3 (Fewer Violations)
6. **LearningPlayer.tsx** - 5 violations
7. **CertificatesBadges.tsx** - 6 violations
8. **ProfileManagement.tsx** - 2 violations (partially done)

---

## Validation Checklist for Each File

After fixing each file, verify:

- [ ] No `#ff6b4d` remaining
- [ ] No `#1e2348` remaining
- [ ] No `#2a3058` remaining
- [ ] No `#E9EBF8` remaining
- [ ] No `rounded-2xl` on standard cards
- [ ] No custom color backgrounds on icons
- [ ] All buttons use DQ tokens
- [ ] All badges use DQ tokens
- [ ] All text colors use DQ tokens
- [ ] No TypeScript errors: `npm run build`

---

## Testing After Phase 2

1. Visual comparison with DQ Design System preview
2. Check all dashboard tabs render correctly
3. Verify all buttons and CTAs work
4. Test dark mode (if applicable)
5. Check responsive design on mobile
6. Verify accessibility (keyboard navigation, focus states)

---

## Estimated Time per File

- GamificationFeatures.tsx: 30 min
- CollaborationTools.tsx: 25 min
- LiveClassesNotifications.tsx: 20 min
- ProgressTracking.tsx: 15 min
- AssignmentsCredentials.tsx: 15 min
- LearningPlayer.tsx: 10 min
- CertificatesBadges.tsx: 10 min
- ProfileManagement.tsx: 5 min

**Total Phase 2 Time:** ~2.5 hours

---

## Key Principles

1. **Token-First:** Always use DQ tokens, never hardcoded colors
2. **Consistency:** Match the LearnerDashboard.tsx style exactly
3. **Spacing:** Maintain 8px rhythm throughout
4. **Typography:** Use Plus Jakarta Sans and DQ type scale
5. **Accessibility:** Ensure all text has sufficient contrast
6. **Testing:** Build and verify after each file

---

## Common Patterns to Watch

### Pattern 1: Icon with Background
```tsx
// ❌ WRONG
<div className="w-10 h-10 bg-[#ff6b4d]/10 rounded-xl flex items-center justify-center">
  <Icon className="w-5 h-5 text-[#ff6b4d]" />
</div>

// ✅ CORRECT
<div className="w-10 h-10 bg-[var(--dq-orange-50)] rounded-lg flex items-center justify-center">
  <Icon className="w-5 h-5 text-[var(--dq-orange-500)]" />
</div>
```

### Pattern 2: Button with Hover
```tsx
// ❌ WRONG
<Button className="bg-[#ff6b4d] hover:bg-[#e56045] text-white">

// ✅ CORRECT
<Button className="bg-[var(--dq-orange-500)] hover:bg-[var(--dq-orange-600)] text-white">
```

### Pattern 3: Badge
```tsx
// ❌ WRONG
<Badge className="bg-[#1e2348] text-white">

// ✅ CORRECT
<Badge className="bg-[var(--dq-navy-950)] text-white">
```

### Pattern 4: Avatar Fallback
```tsx
// ❌ WRONG
<AvatarFallback className="bg-[#1e2348] text-white">

// ✅ CORRECT
<AvatarFallback className="bg-[var(--dq-navy-950)] text-white">
```

---

## Success Criteria

✅ All 74 violations fixed  
✅ All files build without errors  
✅ Visual QA passes against DQ Design System  
✅ All dashboard features work correctly  
✅ Accessibility standards met  
✅ Stage 02 achieves 100% DQ compliance  

---

**Ready to proceed with Phase 2?**  
Start with GamificationFeatures.tsx for maximum impact.
