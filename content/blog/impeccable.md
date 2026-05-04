---
title: "Your agent doesn't know what good looks like"
description: "Skills are portable instruction sets for AI coding agents. Here is why that matters, and one skill that actually gets design right."
date: 2026-04-25
tags: [ai, tools, design]
draft: false
---

A skill is a set of instructions you install into an AI coding agent. Not a plugin. Not a model change. Just a structured brief that tells the agent how to think about a specific domain.

Most of them are forgettable. One is not.

---

## What skills are

AI coding tools like Claude Code, Cursor, Codex, and Gemini CLI are general-purpose. They write code, fix bugs, explain things. What they do not do, by default, is know anything specific about your project, your conventions, or your craft.

Skills change that. A skill lives in your project directory and loads into the agent's context at the start of every session. It can define terminology, enforce patterns, add commands, or teach the model how to reason about a domain it would otherwise approach generically.

The format is simple. The effect is not.

---

## The design problem

Left to its own devices, an AI coding agent will give you purple gradients, nested cards, and text nobody can read. This is not a failure of the model. It is what happens when you point a prediction machine at a design problem without telling it what good design is.

Most developers accept this. They use the AI for logic and fix the visuals themselves. The two jobs stay separate.

That assumption is what Impeccable challenges.

---

## What Impeccable does

[Impeccable](https://impeccable.style/) is an open-source design skill for AI coding agents. You install it with one command:

```
npx skills add pbakaus/impeccable
```

Then you run `/impeccable teach`. That command scans your project, reads your existing design tokens and components, and gives the agent a working understanding of your system. Not a generic understanding. Yours.

After that, twenty-three commands become available. `/polish` refines a component. `/audit` finds problems. `/critique` gives an honest read. `/typeset` handles type decisions. `/animate` adds motion without the usual chaos.

These are not just shortcuts. They are a shared vocabulary between you and the model. When you say `/audit`, the agent knows what audit means in the context of your system, not in the abstract.

---

## The anti-pattern list

Impeccable ships with a catalog of twenty-five deterministic design mistakes: things the model is statistically likely to do wrong. Bad contrast. Misused spacing. Typography that ignores hierarchy. Layout that looks assembled, not designed.

The skill catches these before they ship. There is also a Chrome extension that runs the same checks visually, on any webpage, if you want to audit something outside your codebase.

---

## Live mode

The most interesting feature is still in alpha. Live Mode lets you select elements in the browser, drop a design note, and receive three production-quality variants rendered in place. You pick one. It writes back to your source files through HMR.

This is not a mockup workflow. It is not a prototype. It is design iteration that ends in committed code.

---

## Why it matters

Skills are not magic. They do not make a bad model good or turn a vague request into a precise one. What they do is narrow the gap between what you mean and what the model produces.

Design is where that gap is widest. Most models have read enough code to be useful on logic. They have not been taught to see the difference between a layout that works and one that just compiles.

Impeccable fills that gap. It is free, Apache 2.0, and works across every major AI coding tool.

That is the whole thing. Install it and see what your agent does differently.
