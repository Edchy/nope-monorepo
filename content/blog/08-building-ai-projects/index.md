---
title: "Building AI Projects"
description: "The hardest part of building software with AI is not the code. It is knowing what to build, and having a clear enough brief that the AI can actually help you build it. Here is a workflow that works."
date: 2026-01-21
tags: [ai, workflow, building]
draft: false
---

The hardest part of building software with AI is not the code. It is knowing what to build, and having a clear enough brief that the AI can actually help you build it. Here is a workflow that works.

---

## Before you write a single line of code

Stress-test the idea first.

Use Claude or ChatGPT and ask:

> "I have an idea for [your app]. Act as a cynical venture capitalist and tell me why this will fail."

This is not pessimism. It is cheap. Finding holes in your logic now, in a chat window, costs nothing. Finding them after three months of building costs a lot.

When the cynical VC critique stops surprising you, the idea is probably solid enough to proceed.

---

## Step 1: Lean Canvas

A Lean Canvas is a one-page business plan. Not a 20-page document. One page. It forces clarity.

Cover four things:

**Problem** — what are the top three problems your app solves?

**Solution** — how exactly does it solve them?

**Unique value** — why would someone use your app instead of something that already exists?

**Revenue** — how does money come in?

If you cannot answer these four things in a few sentences each, you do not understand the idea well enough yet. That is fine. Figure it out here, not in code.

---

## Step 2: User journey

Map the path a user takes through your app. Not every feature. The main path: from landing on the page to doing the core thing the app does.

Example:

1. User lands on the homepage
2. Signs up with Google
3. Lands on the dashboard
4. Creates their first item
5. Shares it

Tools like Whimsical or Relume can generate flowcharts from a description. Or sketch it by hand. The output does not matter as much as the thinking.

---

## Step 3: PRD

A PRD — Product Requirements Document — is the source of truth for what gets built. Not every product needs a formal one. But having something written down prevents the AI from making assumptions, and it prevents you from changing the spec halfway through a build without realizing it.

A useful PRD includes:

- Feature list: must-haves vs. nice-to-haves
- User stories: "As a user, I want to [action] so that [reason]"
- Tech stack: what language, database, hosting
- Success metrics: how do you know it's working?

Use a strong model for this. Claude Opus or OpenAI's o1 series. These decisions affect everything downstream. The extra cost is worth it.

The prompt that works:

> "Act as a PM for this app. [Describe what you want]. Use best practices. Don't code yet. Think deeply about which requirements we need and how the page should operate. Write the user stories in detail in a PRD markdown file."

---

## Step 4: Set up the project

In Claude Code:

```bash
/init
```

This creates a CLAUDE.md file in your project root. Fill it in with:

- What the app is and what it does
- The tech stack
- Folder structure
- Coding conventions
- What is off-limits (never touch `.env`, never commit directly to main)

A good CLAUDE.md is the most important setup step. It is what Claude reads every time it starts a new session. Invest ten minutes in it.

---

## Step 5: Give the AI a mental model of the codebase

Before asking the AI to build anything, ask it to understand what already exists.

> "Explore the entire repo to understand the codebase from multiple angles: as a software architect, developer, and product manager. Compile your findings into a markdown file at the root of the repo. Include Mermaid diagrams for any technical concepts."

This does two things. It surfaces any existing structure the AI should know about. And it forces a documented overview that will be useful throughout the project.

---

## Step 6: Build incrementally

Start with a static frontend. Dummy data. No backend, no database.

> "Fully implement the PRD as an MVP. Static frontend with dummy data only. We add the backend later."

The goal is to see the thing working in a browser as fast as possible. Static first means you can validate the UX before building the plumbing. Iterate on what is visible before investing in what is not.

When the frontend is right, add the backend. When the backend is stable, add auth. When auth is solid, add payments. One layer at a time.

---

## Git hygiene

Always work in branches. Never let the agent commit directly to main.

Use `--worktree` to give the agent an isolated copy of the repo to work in. Review diffs before merging.

Set up GitHub Actions to run tests automatically on every pull request. Claude Code can create pull requests directly with `claude commit`.

---

## The key insight

The AI is good at execution once it knows what to build. Your job is to know what to build. The workflow above is mostly about generating clarity before asking the AI to do anything. The better the brief, the better the output. This is true whether you are working with an AI or a human developer.

Garbage in. That'll do out.
