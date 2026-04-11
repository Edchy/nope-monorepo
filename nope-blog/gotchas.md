# Gotchas

Lessons learned, mistakes made, and things to remember for this project.

---

## Format

Each entry should include:
- **Date**
- **What happened**
- **Why it happened**
- **How to avoid it next time**

---

## Entries

### 2026-04-11: Full-screen gallery routes need their own exit chrome

**What:** The gallery used a fixed full-viewport wrapper, which made the normal site navigation effectively unavailable once you entered the route.

**Why:** Immersive canvas pages sit above the regular shell unless they provide their own persistent controls or intentionally preserve the shell layer.

**Fix:** Keep an explicit back path and pause/resume controls inside the gallery chrome whenever a route takes over the viewport.

### 2026-04-02: Initial Setup

**What:** Started project without design tokens. Hardcoded values in global.css.

**Why:** Moved fast without setting up foundations first.

**Fix:** Setting up design tokens now as part of kickoff. In future, always set up tokens before writing any component styles.

---

*Add new entries above this line*
