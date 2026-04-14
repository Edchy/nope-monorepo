# Design Principles Reference

The aesthetic anchor for this skill is the International Typographic Style (Swiss Style): grid-based, typographically led, functional, minimal. Design serves communication. Every decision is a choice, and choices should be deliberate.

---

## Typography

Type is the primary tool. Get it right and the design is mostly done.

**Scale**
Use a modular scale — a consistent ratio between type sizes. Common ratios: 1.25 (Major Third), 1.333 (Perfect Fourth), 1.5 (Perfect Fifth). Apply the scale to: body, small/caption, subheading, heading, display.

Example at 1.333 ratio with 16px base:
- Caption: 12px
- Body: 16px
- Subheading: 21px
- Heading: 28px
- Display: 37px

**Weight**
Two weights cover most cases. Use weight contrast to establish hierarchy before reaching for size or color. A bold heading and regular body is the clearest pattern.

**Line height (leading)**
- Body text: 1.5 to 1.6 — text needs room to breathe
- Headings: 1.1 to 1.3 — tighter, more monumental
- Captions: 1.4 — slightly tighter than body

Too tight: text feels cramped, hard to read. Too loose: text loses cohesion, feels scattered.

**Letter spacing (tracking)**
- Body: 0 or slightly negative (−0.01em) — normal reading
- All-caps labels or small UI text: +0.05em to +0.1em — adds legibility at small sizes
- Large display type: slightly negative (−0.02em to −0.04em) — removes the optical gaps that appear at large sizes

**Line length (measure)**
60–75 characters per line for body text. Too wide and the eye struggles to find the next line. Too narrow and the reading feels choppy.

**Font choice**
When not specified, defaults that fit the Swiss aesthetic:
- Sans-serif: Inter, DM Sans, Geist, IBM Plex Sans
- Monospace (for code): JetBrains Mono, IBM Plex Mono

Avoid mixing more than two type families. One is better than two.

---

## Hierarchy

Hierarchy tells the reader what to look at first, second, third. Without it, everything competes and nothing wins.

**Tools for hierarchy, in order of preference:**
1. Size — the most powerful signal
2. Weight — bold vs. regular
3. Spacing — what's grouped together reads as related
4. Color — use sparingly; don't rely on it as the primary differentiator

**The three-level test**
Every layout should have a clear primary, secondary, and tertiary level. If you can't identify these three levels, the hierarchy is broken.

- Primary: what the user should read or do first (one per screen/section)
- Secondary: supporting information that elaborates the primary
- Tertiary: metadata, labels, footnotes, supplementary detail

**Common hierarchy mistakes:**
- Everything the same size — no hierarchy at all
- Everything bold — bold loses meaning
- Too many levels — more than 4–5 levels is visual noise
- Color as the only differentiator — fails accessibility and prints badly

---

## Spacing and the Base Unit

Establish a base unit and derive everything from it. 4px or 8px are standard. Using multiples (4, 8, 12, 16, 24, 32, 48, 64) creates a naturally harmonious rhythm.

**Proximity principle**
Elements that are related should be closer together. Elements that are unrelated should be farther apart. Spacing communicates structure before the user reads a word.

**Whitespace is active**
Whitespace is not the absence of design. It creates breathing room, draws attention to what remains, and signals quality. Crowded layouts feel cheap and anxious. Airy layouts feel considered.

**Vertical rhythm**
All vertical spacing should feel consistent reading top to bottom. Achieve this by:
1. Setting a baseline unit (often line-height × body font size = e.g. 24px)
2. Making all vertical spacing a multiple of that unit
3. This creates a "pulse" to the layout that feels ordered even if the viewer can't name why

**Padding vs. margin**
- Padding: internal space within a component
- Margin: external space between components
Be consistent: if a card has 24px padding, all cards have 24px padding.

---

## Color

Use color with restraint and intention. The Swiss tradition often uses black, white, and one strong accent.

**Color roles**
Define roles before defining colors. A palette should have:
- **Background**: the base (almost always near-white or white, or very dark for dark mode)
- **Surface**: slightly elevated from background (cards, modals)
- **Text primary**: high contrast on background
- **Text secondary**: reduced contrast for supporting text
- **Accent/Primary**: action color (links, buttons, highlights) — one color
- **Semantic**: success (green), warning (amber), error (red)

**Contrast**
- Text on background: minimum 4.5:1 contrast ratio (WCAG AA)
- Large text / UI components: minimum 3:1
- Don't rely on color alone to communicate state — always pair with shape, icon, or text

**Color temperature**
Avoid using pure black (#000000) or pure white (#FFFFFF). Off-black (#0F0F0F, #1A1A1A) and off-white (#FAFAFA, #F5F5F5) feel more refined and are easier on the eyes.

**When to add a color**
Ask: what problem does this color solve? If the answer is "it looks nice" — remove it and prove it needs to be there.

---

## Grid and Layout

The grid is the invisible structure everything else sits on. It creates alignment, rhythm, and a sense of order.

**Column grids**
- 12 columns is the most flexible (divisible by 2, 3, 4, 6)
- For simpler layouts: 4 or 6 columns
- Gutters (space between columns): typically 16–32px

**Alignment**
Every element should align to something — a column, a shared edge, a baseline. Random alignment feels careless even when viewers can't articulate why.

**Common grid patterns:**
- Full-width header, content in center columns (e.g. 8 of 12)
- Two-column layout: content (8) + sidebar (4)
- Card grids: 3 or 4 columns with consistent gutters

**Responsive behavior**
Grid collapses: 12 col → 4 col → 1 col. Content that spans multiple columns on desktop should stack gracefully on mobile.

---

## Proportion and the Golden Ratio

The golden ratio (1:1.618) and related proportional systems (rule of thirds, Fibonacci sequence) are guides, not rules. They describe proportions that feel naturally balanced.

**Practical applications:**
- Width to height ratio for containers, images, cards
- Font size scaling (the 1.333 and 1.5 ratios above are approximations of musical interval ratios)
- Spacing relationships: if body padding is 24px, card padding might be 24 × 1.618 ≈ 40px

**The rule of thirds**
Divide any space into thirds horizontally and vertically. Place key elements at the intersections. This creates more dynamic, interesting compositions than centered everything.

**Don't force it**
Proportional systems are a starting point for intuition. If something looks right, it looks right. Adjust.

---

## Balance and Composition

Visual weight is the sense that some elements feel "heavier" than others — large elements, dark colors, and busy textures feel heavier than small, light, minimal ones.

**Symmetrical balance**: Mirror layout left/right. Formal, stable, authoritative. Works well for headers, hero sections.

**Asymmetric balance**: Different elements on each side, but visual weight is equal. More dynamic, modern. Harder to execute well but more interesting.

**Visual tension**
Some tension is good — it creates energy and draws attention. All perfectly centered, perfectly balanced layouts can feel inert. A slightly off-center headline, a large image with negative space — these create interest.

---

## Minimalism

Minimalism is not a style, it's a discipline. The question is always: what can be removed?

**The elimination test**
For every element: if removing it makes the design cleaner without losing information or function — remove it.

Apply to:
- Borders (are they defining structure, or just decorating?)
- Shadows (are they establishing depth, or just adding noise?)
- Background colors (is the differentiation necessary, or is whitespace enough?)
- Icons (does the icon add meaning, or is the label sufficient?)
- Animations (does this animation help the user understand what happened, or is it just motion?)

**What remains after elimination**
A minimal design is one where every element is load-bearing. The result feels inevitable — you couldn't remove anything without the design losing meaning. That's the goal.

---

## Visual Verification Checklist

Use this when reviewing any design output:

**Typography**
- [ ] Is there a clear three-level hierarchy (primary, secondary, tertiary)?
- [ ] Are font sizes from a consistent scale?
- [ ] Is line-height appropriate for body text (1.5+) and headings (1.1–1.3)?
- [ ] Is line length within 60–75 characters for body text?

**Spacing**
- [ ] Is all spacing derived from a consistent base unit?
- [ ] Does proximity correctly group related elements?
- [ ] Is there enough whitespace — does the layout breathe?
- [ ] Is vertical rhythm consistent?

**Color**
- [ ] Does every color have a defined role?
- [ ] Is contrast sufficient (4.5:1 for body text)?
- [ ] Is color used as the only differentiator anywhere (if so, add a secondary signal)?

**Layout**
- [ ] Does everything align to a grid or shared axis?
- [ ] Are there any elements that seem to float without alignment?

**Minimalism**
- [ ] Are there decorative elements that could be removed without losing meaning?
- [ ] Is the layout adding visual noise, or only what the content needs?
