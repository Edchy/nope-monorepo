---
title: "How to Prompt"
description: "How to ask AI better questions — not vague, not clever, just specific and clear."
date: 2026-02-25
tags: [ai, prompting, workflow]
draft: false
---

Most people underuse AI because they ask bad questions. Not bad as in rude. Bad as in vague. The model cannot give you a useful answer if it does not know what useful means to you.

This is fixable.

---

## The core principle

Be explicit. The model is not guessing what you want. It is calculating the most statistically likely response given your words. More precise words produce more precise output.

You are not convincing it. You are shaping the conditions. The quality of what you get back is largely a function of what you put in.

---

## Tell it what role to take

If you want a specific kind of thinking, say so.

> "Act as a cynical venture capitalist and tell me why this app will fail."

> "Act as a senior developer reviewing a pull request. Be specific about what is wrong and why."

> "Act as a PM. Think through the requirements before writing anything."

This is not a trick. The model has patterns from millions of texts written by VCs, developers, and PMs. When you set the role, you activate those patterns. The output shifts accordingly.

---

## Tell it what not to do

Negative constraints are as useful as positive ones.

> "Don't code yet. Think through the requirements first."

> "Keep the explanation under three paragraphs."

> "Don't use bullet points. Write in prose."

Without constraints, the model defaults to what it has seen most often. That is usually fine. For specific tasks, it is not.

---

## Give it examples

If you know what good looks like, show it.

> "Here is an example of the output format I want: [example]. Now do the same for [my thing]."

Examples reduce ambiguity more reliably than descriptions. Describing what you want takes words. Showing it takes one example.

---

## Break it down

Trying to do ten things in one prompt usually produces mediocre output for all of them. Sequence your requests.

Start with the thinking, then the structure, then the execution.

For a coding task:

1. "Explore the codebase and describe what you find."
2. "Now write a PRD for the feature I described."
3. "Implement the PRD as a static frontend."

Each step builds on the last. Each prompt is focused enough to get a good answer.

---

## Use the right model for the task

Not every task needs the most powerful (and most expensive) model.

**For complex decisions** — architecture, product requirements, hard technical design — use the strongest model available. Claude Opus, GPT-4o, o3. The extra cost is worth it. Bad decisions made here cost more downstream.

**For repetitive tasks** — generating variations, processing data, drafting standard responses — use a fast, cheap model. Claude Haiku, Gemini Flash. You will run these hundreds of times. Cost adds up.

Using Opus to write a hundred similar emails is wasteful. Using Haiku to design your database schema is false economy.

---

## Useful prompts, ready to use

**To stress-test an idea:**
> "I have an idea for [X]. Act as a cynical VC and tell me why this will fail."

**To get unconventional suggestions:**
> "What is the single most radically useful addition you could make to this plan? Think outside what has been done before."

**To map a codebase:**
> "Explore this repo as a software architect, developer, and product manager. Compile your findings into a markdown file. Use Mermaid diagrams where helpful."

**To write a PRD:**
> "Act as a PM. Don't code yet. Think through which requirements we need and how the page should operate. Write detailed user stories in a PRD markdown file."

**To build:**
> "Fully implement the PRD as an MVP. Static frontend with dummy data only. Backend comes later."

---

## What makes a prompt fail

Vagueness: "Make it better." Better how?

Too many things at once: "Write the PRD, implement it, add tests, deploy it." Each of these is its own task.

No context: Asking for help with code without sharing the code. Asking for advice on a decision without explaining the situation.

No format specified: If you need a table, ask for a table. If you need bullet points, say so. If you need a formal document, specify that. The model will default to whatever it has seen most often, which may not be what you need.

---

## The honest summary

Prompting is not a dark art. It is communication. Be specific about what you want, give the relevant context, constrain the scope, and specify the output format. The model will do the rest.

That is all there is to it.
