# SOP — Standard Operating Procedure

> **How to use this:**
> - **Part 1** is your `CLAUDE/AGENTS.md` template — copy it into every new project. These rules are active in every agent session.
> - **Part 2** is your project kickoff guide — work through it once at the start of every project. Ask the user questions according to this section.
> - **Part 3** is personal reference — for you to read and remember, occasionally shared with agents.

---

# Part 1: AGENTS.md Template

_Copy everything in this section into `CLAUDE/AGENTS.md` at the start of every project._

---

## Principles

- Simplicity first — minimal, clean solutions
- Systems over prompts
- Verification over generation
- Iteration over perfection
- No lazy fixes — solve root causes
- Always demand elegance: "Is there a simpler / cleaner way to do this?"
- Skills are reusable intelligence — build new ones as patterns emerge

## Planning and Execution

- Always plan before starting any non-trivial task (3+ steps, or anything touching architecture). Write out the plan and get confirmation before proceeding.
- If something breaks: stop and re-plan before continuing.
- Use subagents aggressively for complex tasks. One task per agent for clarity. Parallelize thinking, not just execution.
- Use a smaller/faster model for simple subtasks and a larger/more capable model for complex reasoning.

## Task Management

1. Plan first — write tasks as a checklist
2. Verify before executing
3. Track progress continuously
4. Explain changes at each step
5. Document results clearly
6. Capture lessons after completion

## Quality Standards

- Always verify before declaring done: run tests, check logs, simulate real usage, compare expected vs. actual behavior.
- Avoid hacky or temporary fixes. Optimize for long-term maintainability — use variables, componentize, keep things composable.
- For bugs: always find the root cause, not just the symptom.

## Self-Improvement Loop

- After any mistake: log it in `gotchas.md`. Convert mistakes into rules. Review past lessons before starting new work.
- Run `/insights` (Claude Code) regularly — aim for every 4 days — to surface improvement opportunities across the codebase.

## Style and Design

- Never use hardcoded values for styles. Anything affecting how the site looks (font-family, font-size, gap, padding, margin, color, border-radius, line-height, letter-spacing, etc.) must be a variable or design token.
- If a needed token does not exist in the design system, ask for permission before creating a new variable or reusing an existing one.
- Prefer using design skills if they exist. typically /i-frontend-design or/and /swiss-design, or any skills that has the word design or ui in it.

## Writing and Tone

- Never use emojis.
- Never use em-dashes in text.

## Documentation and Libraries

- Always use Context7 to look up documentation for any framework or library before implementing. Use `use context7` in your query.
- Exception: if a dedicated MCP exists for that specific library (e.g. Supabase MCP, Playwright MCP, Astro MCP), use that instead — it will have deeper, more targeted access.

## Git Workflow

- `main` is always deployable. Never commit directly to it.
- Branch naming: `feat/short-description`, `fix/short-description`, `chore/short-description`
- Before starting any task: create a new branch (`git checkout -b feat/task-name`)
- Commit frequently with meaningful messages
- Push branch and open a PR when the task is done
- After merge: delete the branch
- Never force push to `main`

## Browser Automation

- **Playwright** for automated tests and anything running in CI
- **Browser automation tool** (e.g. Claude in Chrome) for visual verification — use it to check UI work before declaring a task done
- No Puppeteer (Playwright covers everything it does, plus more)

---

# Part 2: Project Kickoff

_Work through this once at the start of every project. Not for `CLAUDE/AGENTS.md`._

---

## Validate the Idea First

Use this prompt to stress-test before building anything:

> **Role:** You're my technical co-founder. Your job is to help me vet and build my idea. Be honest, direct, and critical. Your goal is to help me build something people love, but also to save me time by killing bad ideas early. Don't be afraid to challenge my assumptions or point out flaws in the logic. If you think this idea has already been done better by someone else, tell me. If you think it's a bad idea for any reason, tell me. If you see scope creep or unnecessary complexity, call it out and propose a leaner version. Your feedback should be constructive and actionable — if you say something won't work, also suggest how we could fix it or pivot.
>
> **Phase 0 — Validate:** Before touching code, stress-test the idea. Play cynical VC — tell me why this will fail, where the logic has holes, who already does this better. Kill bad ideas early.
>
> **Phase 1 — Discovery and Lean Canvas:**
> - Top 3 problems being solved
> - Solution and unique value prop vs. existing alternatives
> - Revenue model
> - Challenge my assumptions, flag scope creep, propose a leaner v1 if needed
>
> **Phase 2 — User Journey and Planning:**
> - Map the core user flow end-to-end (entry, key action, outcome)
> - Pick the stack, estimate complexity, list external dependencies
> - Identify must-haves vs. nice-to-haves
>
> **Phase 3 — PRD and Architecture:** Before building, produce a lightweight PRD:
> - Feature list (MoSCoW or must/later)
> - User stories for core flows
> - Tech stack decisions with rationale
> - Success metrics (how do we know v1 works?)
>
> **Phases 4-6 — Build, Polish, Handoff:**
> - Ship in reviewable increments, surface blockers with options not unilateral decisions
> - Production-grade UX, error handling, performance
> - Deploy, document, v2 roadmap
>
> **Standing rules:** Flag bad ideas. Be honest about tradeoffs. Keep me in the loop at decision points, but don't ask for permission on obvious calls.
>
> **My idea:** [What it does, who it's for, what problem it solves]
> **Seriousness level:** [Exploring / Personal use / Public launch]

## Give the Agent Codebase Context

Three steps to orient your agent at the start of any existing project:

**Step 1 — Explore:**
> "Explore the entire repo to understand the codebase from multiple angles: as a software architect, developer, and product manager. Compile your findings into an extensive MD doc in the root of the repo. For describing technical concepts, include Mermaid diagrams."

**Step 2 — Plan:**
> "Act as a PM for this app. [Describe what you want.] Use best practices. Don't code yet — deeply think about which requirements we need and how it should operate. Describe the user stories in detail in a PRD."

**Step 3 — Build MVP:**
> "Fully implement the PRD as a static MVP with dummy data. We implement the rest later."

## Decisions to Make at Kickoff

Answer these before starting work:

- [ ] What are we building and why?
- [ ] What is the name of the app/website/company?
- [ ] Tech stack — and why this stack for this project?
- [ ] Do we need to design in a tool (Figma, Stitch, etc.) before writing code, or design directly in the agent?
- [ ] Project planning: default is GitHub Issues. Migrate to Linear if you need better sprint/roadmap views.
- [ ] CI/CD setup confirmed? (GitHub Actions + Vercel preview deploys + auto-deploy to main)
- [ ] Seriousness level: Exploring / Personal use / Public launch

## Bootstrap Checklist

Run through this at the start of every project:

**Agent setup**
- [ ] Initialize a `.claude/AGENTS.md` — copy Part 1 of this document
- [ ] Create `gotchas.md` — for logging mistakes and lessons as the project progresses

**Design system**
- [ ] Create `brand_assets/` folder with images and design system files
- [ ] Set up design tokens — primitive and semantic (CSS variables where possible)
- [ ] Create `brand-guidelines.md` and `brand-voice.md` inside the brand_assets/ folder

**Tooling**
- [ ] Set up tool permissions (denylist / allowlist) for safer autonomous mode
- [ ] Install **Context7 MCP** (if not already installed) — always include
- [ ] Install project-specific MCPs based on stack (e.g. Supabase MCP, Playwright MCP, GitHub MCP (if not already installed)) — add pointers to `.claude/AGENTS.md`
- [ ] Check what plugins and skills are scoped to this project — consider Superpowers and Impeccable as general-purpose additions

**Process**
- [ ] Set up CI/CD — GitHub Actions for lint/type-check/tests on PRs, auto-deploy to production on merge to main
- [ ] Enable AI code review on PRs (e.g. Claude in GitHub)
- [ ] Consider scheduling `/insights` (Claude Code) every 4 days to surface improvement opportunities
- [ ] Ask for or suggest what hooks to use.

---

# Part 3: Personal Reference

_For me. Read occasionally, share with agents when relevant._

---

## Default Tech Stack

_Not definitive — adapt per project. Document the why when you deviate._

| Layer | Default |
|---|---|
| AI / Coding | Claude |
| Backend | Supabase |
| Deployment | Vercel |
| Domain | Namecheap |
| Payments | Stripe |
| Version control | GitHub |
| Email | Resend |
| Auth | Clerk |
| DNS | Cloudflare |
| Analytics | PostHog |
| Error tracking | Sentry |
| Redis / Cache | Upstash |
| Vector DB | Pinecone |

## Useful Prompts

**Innovation:**
> "What's the single smartest and most radically innovative and accretive and useful and compelling addition you could make to the plan at this point?"

**Voice and differentiation:**
> "Think outside the box. We want to do things that have never been done. We want to stick out. We want to innovate. We want to be unique in our voice and tone."

## Future Projects

- **Design skill:** Build a reusable skill around contrast, layout, color, alignment, hierarchy, golden ratios, vertical rhythms, minimalism.
