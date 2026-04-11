---
title: "Design Token Naming: A Practical Guide"
description: "Learn how to name design tokens effectively for scalable design systems"
date: 2026-04-01
draft: false
---

Design tokens are the backbone of any design system. They keep your brand's visual style consistent and easy to manage.

## What Are Design Tokens?

Design tokens are reusable, named variables that store visual design attributes. Instead of hard-coding values like hex codes or pixel sizes, you define them once and reference them everywhere.

Think of design tokens as **nicknames for your design elements**.

```
// Instead of hard-coding everywhere:
button { background: #3B82F6; }
link { color: #3B82F6; }
icon { fill: #3B82F6; }

// Define once as a token:
--color-brand-primary: #3B82F6

// Then reference everywhere:
button { background: var(--color-brand-primary); }
link { color: var(--color-brand-primary); }
```

When the brand color changes, you update **one value** and it updates everywhere.

The concept originated with Salesforce's Design System in 2014. Now tokens are the smallest but most important part of any design system.

---

## The Token Hierarchy

Tokens flow through layers of abstraction — from raw values to themed UI.

### Level 1: Primitives (Raw Values)

Primitives are the foundational values in your design system. They are actual colors, sizes, and values with no meaning attached — just the building blocks.

**Good primitive name:** `blue-500` (describes the color itself)
**Not a primitive name:** `button-primary` (describes usage — that's semantic!)

#### Examples

| Category | Examples |
|----------|----------|
| Colors | `blue-500`, `gray-900`, `red-400` |
| Spacing | `space-1: 4px`, `space-2: 8px`, `space-4: 16px` |
| Typography | `font-size-sm: 14px`, `font-size-base: 16px` |

#### Color Scales

Colors are organized into scales from light to dark using numbers from 50 (lightest) to 950 (darkest), with 500 being the base color.

```
50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
↑                                    ↓
Lighter                          Darker
```

---

### Level 2: Semantic Tokens (Purpose)

Semantic tokens give primitive values meaning. Instead of saying "use blue-500", you say "use the primary action color". The code doesn't care what the color is, just what it's for.

**Pattern:** `[category]-[property]-[variant]`

#### Common Patterns

| Pattern | Examples |
|---------|----------|
| `color-background-*` | `primary`, `secondary`, `surface`, `overlay` |
| `color-text-*` | `primary`, `secondary`, `disabled`, `inverse` |
| `color-action-*` | `primary`, `secondary`, `danger`, `success` |
| `color-border-*` | `default`, `focus`, `error`, `success` |

#### The Theming Superpower

Semantic tokens unlock theming. The same token name can point to different primitives depending on the active theme:

| Token | Light Theme | Dark Theme |
|-------|-------------|------------|
| `color-text-primary` | `gray-900` | `gray-50` |
| `color-background` | `gray-50` | `gray-900` |
| `color-action-primary` | `blue-500` | `blue-400` |

---

### Level 3: Component Tokens (Specific)

Sometimes semantic tokens aren't specific enough. A button might need different hover colors than a card. That's where component tokens come in.

**Use component tokens when:**
- Components need unique states (hover, active, focus)
- Different components need different styling for the same "role"
- You want to change a component without affecting others
- Your design system has strict component guidelines

**Pattern:** `[component]-[variant]-[property]-[state]`

#### Examples

```
button-primary-background-hover
input-default-border-focus
card-elevated-shadow-default
badge-danger-text-default
```

#### Reference Chain

```
// Primitive
blue-600: #2563EB

// Semantic (references primitive)
color-action-primary-hover: {blue-600}

// Component (references semantic)
button-primary-background-hover: {color-action-primary-hover}
```

This chain means changing `blue-600` will update the semantic token, which updates the button token, which updates the actual button.

---

## Token References (Aliasing)

Tokens reference each other using curly braces: `{token-name}`. The system resolves these at build time or runtime.

```
Token definition:
color-text: {gray-900}

Resolved value:
color-text: #111827
```

### Avoiding Circular References

Circular references happen when tokens form a loop with no end point. The system can't resolve any value because each token depends on another that eventually points back.

```
Bad Example:
blue-500: {brand-blue}
brand-blue: {primary-color}
primary-color: {blue-500}  ← Circular!

Bad Example:
color-background-primary: {color-surface-default}
color-surface-default: {color-background-primary}  ← Circular!
```

**Rule:** Always ensure your reference chain ends at a primitive value (like `#3B82F6` or `16px`), not another reference.

**Tip:** Keep reference chains under 4 levels.

---

## Naming Patterns Reference

### Quick Reference

| Token Type | Pattern | Examples |
|------------|---------|----------|
| Primitives | `[color]-[shade]` | `blue-500`, `gray-900`, `red-400` |
| Semantic | `[category]-[property]-[variant]` | `color-background-primary`, `color-text-error` |
| Component | `[component]-[variant]-[property]-[state]` | `button-primary-background-hover` |

### Industry Examples

| System | Pattern | Examples |
|--------|---------|----------|
| **Material Design** | `md.sys.[category].[name]` | `md.sys.color.primary`, `md.sys.color.on-primary` |
| **Tailwind CSS** | `[category].[name].[variant]` | `colors.blue.500`, `colors.gray.900` |
| **IBM Carbon** | `$[element]-[variant]` | `$ui-background`, `$text-primary` |
| **Shopify Polaris** | `--p-[category]-[property]-[variant]` | `--p-color-bg-surface`, `--p-space-400` |

---

## Naming Principles

| Principle | Description |
|-----------|-------------|
| **Be Descriptive** | Names should explain purpose, not just appearance |
| **Be Consistent** | Use the same pattern throughout your system |
| **Be Predictable** | Others should guess token names correctly |
| **Be Concise** | Short enough to type, long enough to understand |

---

## Naming Checklist

Before finalizing any token name, verify:

- [ ] Does the name describe **what it's for**, not what it looks like?
- [ ] Does it follow your system's **established pattern**?
- [ ] Could someone **guess the name** without seeing documentation?
- [ ] Is it **specific enough** to avoid confusion?
- [ ] Does the reference chain end at a **primitive value**?
- [ ] Are reference chains **under 4 levels deep**?

---

## Common Token Categories

| Category | Properties |
|----------|------------|
| `color` | background, text, border, fill, stroke |
| `font` | family, size, weight, line-height |
| `space` | inset, margin, padding, gap |
| `border` | width, style, radius |
| `shadow` | elevation levels |
| `motion` | duration, easing |

---

## Real-World Examples

### Colors

```
color-background-primary
color-background-surface
color-background-overlay
color-text-primary
color-text-secondary
color-text-disabled
color-action-primary
color-action-danger
color-action-success
color-border-default
color-border-focus
```

### Typography

```
font-size-sm
font-size-base
font-size-lg
font-size-xl
font-weight-regular
font-weight-medium
font-weight-bold
line-height-tight
line-height-normal
```

### Spacing

```
space-1: 4px
space-2: 8px
space-4: 16px
space-8: 32px
space-12: 48px
space-16: 64px
```

### Component States

```
button-primary-background-default
button-primary-background-hover
button-primary-background-active
button-primary-background-disabled
input-default-border-default
input-default-border-focus
input-default-border-error
```

---

## Key Takeaways

1. **Primitives** describe what the value is (`blue-500`)
2. **Semantic tokens** describe purpose (`color-action-primary`)
3. **Component tokens** describe specific usage (`button-primary-background`)
4. Tokens reference each other using `{curly braces}`
5. Always end reference chains at primitive values
6. Keep chains under 4 levels to avoid complexity
7. Name for purpose, not appearance
