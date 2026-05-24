---
title: "The agent is not the harness"
description: "Two words that appear constantly in AI writing and almost never get explained. Here is what they actually mean and why the difference matters."
date: 2026-05-24
tags: [ai, agents, tools]
draft: false
color: "5"
---

## The agent is not the harness

These two words appear constantly in AI writing and almost never get explained. That's annoying. Here is what they actually mean.

**Start with the LLM**

An LLM (large language model) is a text predictor. You give it words, it gives you more words back. That's genuinely all it does at the core. It doesn't remember anything, can't access the internet, can't run code. It just completes text, very cleverly.

Claude, GPT-4o, Llama. All LLMs at their base.

**What an agent is**

An agent is an LLM that can take actions.

Instead of just answering a question, it can search the web, write a file, run code, send a message. It can also loop: take an action, look at the result, decide what to do next, take another action. This observe-reason-act loop is what makes something an agent rather than a chatbot.

The word "agent" describes a behavior. An AI that perceives something, decides something, and does something. That loop.

**What a harness is**

A harness is the code wrapped around an LLM that makes it act like an agent.

The LLM on its own can't browse the web or run code. The harness is what gives it tools, manages the loop, keeps track of what's happened, and decides when to stop. It converts a text predictor into something that can actually do work.

Here is the analogy that made it click for me. An LLM is a very capable person locked in a room. They can only communicate by passing notes under the door. On their own, they can answer questions. But they have no way to look anything up, no memory of yesterday, and no way to act on anything outside the room.

The harness is everything outside that room. It slips relevant information under the door. It hands in tools the person can use. It reads what comes back and decides what to do with it. It keeps a log of the whole exchange. When the task is done, it knows to stop knocking.

The agent is what you get when you combine the person and all that infrastructure and point them at a problem.

**Why this matters**

When someone says "I'm building an agent," they usually mean they're building a harness. The LLM already exists. What they're writing is the scaffolding that makes it useful.

When you use Claude Code, Hermes, or Cursor, you're using a harness someone else built. The LLM is the brain. The harness is everything that makes the brain do something useful with your files and your questions.

This is also why two tools running the same underlying model can feel completely different. Same brain, different harness. One has better memory management. One gives the model better tools. One loops more carefully. The harness shapes how the intelligence gets applied.

**Three layers**

LLM: predicts text.

Agent: takes actions using an LLM.

Harness: the code that makes an LLM act like an agent.

They're not interchangeable words for the same thing. They're three layers of the same stack. Once you see the stack, the words make sense. And you stop being impressed by people who use them like they're all pointing at the same thing.
