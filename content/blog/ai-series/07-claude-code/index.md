---
title: "Claude Code"
description: "Claude Code is Anthropic's terminal-based AI coding agent. It runs in your terminal, reads your project, and writes code. It can also run tests, commit to Git, search the web, and call external tools. You do not need a GUI."
date: 2026-01-07
tags: [ai, claude-code, tools]
draft: false
---

Claude Code is Anthropic's terminal-based AI coding agent. It runs in your terminal, reads your project, and writes code. It can also run tests, commit to Git, search the web, and call external tools. You do not need a GUI.

This post covers how it works and how to use it well.

---

## How to start

You install Claude Code via npm, then type `claude` in your terminal to start an interactive session. Or you can give it a task immediately:

```bash
claude "add a dark mode toggle to the settings page"
```

It will explore your codebase, figure out what needs to change, make the changes, and report back. You review. You ask follow-up questions. You iterate.

---

## Key commands

| Command | What it does |
|---------|--------------|
| `claude` | Start an interactive session |
| `claude "task"` | Run a one-time task and exit |
| `claude -p "query"` | Ask a one-off question, then exit |
| `claude -c` | Continue the most recent conversation |
| `claude commit` | Create a Git commit |
| `/clear` | Clear the conversation history |
| `/help` | Show available commands |
| `exit` or Ctrl+C | Exit |

---

## Keyboard shortcuts and modes

Inside a session:

| Shortcut | What it does |
|----------|--------------|
| `/init` | Creates a CLAUDE.md file in your project (more on this below) |
| `Tab` | Triggers extended thinking — Claude reasons more carefully before responding |
| Double `ESC` | Rewinds to a previous point in the session |
| `Shift + Tab` | Toggles between plan mode and auto-accept mode |
| `@filename` | Give a specific file as context |
| `Ctrl + O` | Verbose mode — shows more detail about what Claude is doing |

**Plan mode** is worth knowing. When you toggle it with `Shift + Tab`, Claude shows you its plan before doing anything. Review it, adjust if needed, then let it run. Useful when you want control over a complex task.

---

## CLAUDE.md

CLAUDE.md is a markdown file you put at the root of your project. Claude reads it every time it starts a session in that project.

Put anything Claude should always know in here:

- What the project is and what it does
- The tech stack
- How the project is structured
- Rules it should follow (never edit this file, always run tests before committing, etc.)
- What is off-limits

This is the single most useful thing you can do to improve Claude Code's performance on your project. A good CLAUDE.md is worth more than a good prompt.

Create it with `/init` and fill it in.

---

## Thinking mode

By default, Claude generates responses without pausing to reason step by step. For complex problems — architecture decisions, tricky bugs, multi-file changes — you can ask it to think harder.

Trigger it with keywords in your message: "think", "think hard", or "ultrathink."

Or enable it permanently in settings:

```json
{
  "alwaysThinkingEnabled": true
}
```

This makes Claude more reliable on harder problems. It also uses more tokens and costs more. Worth it for decisions that matter.

---

## Permissions

Claude Code asks before doing anything risky. But you can control exactly what it is and is not allowed to do via a settings file at `.claude/settings.json`.

You can set allow lists (commands it can always run) and deny lists (things it should never touch). Protect sensitive files like `.env`. Block certain shell commands if you want.

If you are running it in a context where mistakes are expensive, set restrictive permissions.

---

## Subagents

For complex tasks, Claude can delegate subtasks to fresh instances of itself — called subagents. The subagent starts with a clean context, does the assigned work, and returns a summary.

This is useful when a task has multiple independent parts. The subagent does not carry the baggage of the full conversation, which can actually make it more focused.

One thing to be aware of: the subagent starts fresh, so it may not have context about decisions made earlier in the session. Give it the relevant context explicitly.

---

## Working in isolation

The `--worktree` flag runs Claude in an isolated Git worktree. This means it cannot affect your main branch while working. All changes happen in a separate copy of the repo. You review and merge when you are satisfied.

This is the right approach when you want to let Claude run autonomously without the risk of it touching production code.

---

## The honest summary

Claude Code is genuinely useful for building software. It is not magic. It makes mistakes. It will occasionally misunderstand your intent or make a change that breaks something else. You have to review its work.

But when the task is clear and the context is good, it can do in minutes what used to take hours. That is worth learning.
