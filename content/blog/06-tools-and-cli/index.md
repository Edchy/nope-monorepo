---
title: "Tools and the CLI"
description: "IDE extensions like Copilot versus terminal agents like Claude Code — what they are and when to use each."
date: 2025-12-17
tags: [ai, tools, cli]
draft: false
---

There are two main ways to work with AI on code: through an IDE (a visual code editor), and through the terminal. Understanding the difference matters, because the terminal approach changed how software gets built.

---

## What an IDE is

An IDE — Integrated Development Environment — is a desktop application for writing code. VS Code is the most popular one. It gives you a file tree on the left, a code editor in the middle, syntax highlighting, error detection, debugging tools, and a terminal at the bottom.

For most of the history of software development, this was how you wrote code. You opened a file, typed, saved, ran.

AI was added to IDEs in the form of extensions. An extension is a plugin that adds new functionality to the editor. The first major one was GitHub Copilot, released in 2021. Copilot watches as you type and autocompletes your code inline — it suggests the next line, or the next function, and you hit Tab to accept.

Copilot was significant because it moved AI from a tool you went to separately into the editor where you already worked. You did not have to break your flow to ask a question.

**Cursor** is a VS Code fork — built on top of VS Code but with AI integrated more deeply. You can use Copilot inside Cursor too. Most developers who use Cursor use it instead of VS Code, not alongside it.

---

## What the CLI is

CLI stands for Command Line Interface. The terminal. The black box where you type commands.

In 2024 and 2025, a new category emerged: CLI-native AI coding agents. These are tools that run in your terminal and can operate on your entire project autonomously. They can:

- Read any file in your project
- Write and edit code
- Run tests and interpret results
- Commit to Git
- Search the internet
- Call external APIs via MCP

The main ones:

| Tool | By |
|------|----|
| Claude Code | Anthropic |
| Codex | OpenAI |
| Gemini CLI | Google |
| Qwen Code | Alibaba |
| OpenCode | Community / open-source |
| Warp | Warp (AI-native terminal) |

These tools do not need a GUI. They read your files, figure out what to do, do it, and report back. For the right tasks, they are faster and more capable than doing the same thing with a chat interface.

---

## Do you still need an IDE?

Probably yes, but the balance has shifted.

IDEs are still useful for exploring a codebase visually. File trees, jump-to-definition, debugging tools — these are things a terminal agent cannot easily replicate. If you are trying to understand a large unfamiliar codebase, an IDE is useful.

But for building things, especially from scratch or with a clear direction, a CLI agent is often faster. You describe what you want. It writes the code, runs the tests, fixes the errors, commits the result. You review the output. You do not have to open a file.

In practice, most people who use CLI agents also keep an IDE open. The IDE is for review and exploration. The agent is for execution.

---

## The right tool for the task

For **autocomplete as you type** — GitHub Copilot in VS Code or Cursor.

For **asking questions about your code** — Cursor's chat panel, or Claude.ai with files attached.

For **building features autonomously** — Claude Code, Codex, or Gemini CLI in your terminal.

For **running locally without an internet connection** — Ollama with a local model, piped into a CLI setup.

You do not have to pick one. These tools compose.
