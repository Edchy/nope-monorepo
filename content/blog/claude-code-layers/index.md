---
title: "Understanding Claude Code's Context Layers"
date: 2026-04-10
draft: true
---
When you use Claude Code, there is not just one thing telling Claude how to behave. There is a whole stack of instructions layered on top of each other, and knowing how they work saves you a lot of confusion.

Here is the full picture.

---

## The Layers, From Bottom to Top

### 1. Anthropic's Base System Prompt

This is the foundation. Anthropic injects a system prompt into every Claude Code session covering things like how to handle file edits, tool usage, safety rules, and general behavior. You never see it, and you cannot change it. It is just always there.

### 2. Plugin Instructions

When you install a Claude Code plugin like Superpowers, it injects its own instructions into the context alongside Anthropic's. This is how the plugin's skills and slash commands actually work. Again, this happens automatically when a plugin is installed. You do not write it yourself.

### 3. Your Global CLAUDE.md

Located at `~/.claude/CLAUDE.md`, this file is your personal layer. It loads in every Claude Code session regardless of what project you are in. Think of it as your standing preferences: how you like responses formatted, coding conventions you always follow, things you never want Claude to do.

### 4. Your Project CLAUDE.md

Located at the root of a project (or inside `.claude/CLAUDE.md`), this one is project-scoped. It only loads when you are working inside that specific project. This is where you put things like architecture decisions, project-specific conventions, or notes about the codebase that Claude should always keep in mind.

### 5. The Conversation Itself

Finally, whatever you actually type. Your messages, the files Claude reads, tool outputs, everything that happens during the session.

---

## Who Wins When Layers Conflict?

This is where it gets interesting. Say your global `CLAUDE.md` says:

> "Always say apple before you start each answer."

And your project `CLAUDE.md` says:

> "Never say apple, ever."

What happens? Honestly: it depends, and the result is not always predictable.

Claude is not a rules engine that resolves conflicts deterministically. It is a language model that reads all the instructions at once and tries to make sense of them. When instructions contradict each other, Claude will generally try to find a middle ground or lean toward whichever instruction feels more specific or more recent in the context.

In practice, the rough priority order looks like this:

```
Anthropic's base prompt     highest priority, always wins
Plugin instructions         very high, baked into the session
Project CLAUDE.md           takes precedence over global
Global CLAUDE.md            lower, more general
Your conversation           can override anything above in the moment
```

So a project-level instruction usually wins over a global one, because it is more specific. And anything Anthropic has hardcoded wins over everything.

But here is the catch: Claude will not throw an error when it sees a conflict. It will just... try its best. If two instructions directly contradict each other and neither is clearly more specific, the outcome is somewhat unpredictable. You might get inconsistent behavior between sessions, or Claude might silently pick one and ignore the other.

The practical takeaway is: do not rely on conflict resolution to do the right thing. If your project needs an exception to your global rules, make the exception explicit in the project `CLAUDE.md` rather than just overriding it and hoping for the best.

---

## The Full Stack Visualized

```
Anthropic's Claude Code system prompt   <-- you cannot touch this
Plugin instructions (e.g. Superpowers)  <-- injected when installed
~/.claude/CLAUDE.md                     <-- your global preferences
<project>/CLAUDE.md                     <-- project-specific rules
Your conversation                       <-- what you actually type
```

Each layer is visible to Claude at the same time. There is no inheritance or cascading in the CSS sense. Claude reads all of it and tries to follow all of it, resolving conflicts with judgment rather than rules.

---

## Practical Tips

**Use the global CLAUDE.md sparingly.** The more you put there, the more likely something will conflict with a project-level instruction you write later. Keep it to true universals: things like your preferred language, formatting preferences, or a standing instruction to always ask before deleting files.

**Be explicit in project CLAUDE.md.** If a project needs Claude to behave differently from your global setup, say so directly. Something like "Override global preference: do not add TypeScript types in this project" is clearer than just writing the opposing instruction and hoping Claude figures it out.

**You can override anything in the moment.** If you just tell Claude something in the conversation directly, that will usually win over CLAUDE.md instructions for the duration of that session. Context is powerful.
