---
title: "The AI Ecosystem"
description: "There are a lot of AI tools. Most of them are wrappers around the same handful of underlying models. Some of them are genuinely useful. Here is the map."
date: 2026-02-04
tags: [ai, ecosystem, tools]
draft: false
---

There are a lot of AI tools. Most of them are wrappers around the same handful of underlying models. Some of them are genuinely useful. Here is the map.

---

## The main AI assistants

**ChatGPT** — OpenAI's product. The one that started the mainstream wave in November 2022. Supports GPT-4o (their main model), the o-series reasoning models, image generation, code execution, and web browsing. The most recognized AI product in the world.

**Claude.ai** — Anthropic's product. Strong at nuanced reasoning, long documents, and writing. If you need an AI to handle a large PDF, write carefully, or work through a subtle problem without confidently saying the wrong thing, Claude is usually the better choice.

**Perplexity** — An AI search engine. Ask a question, get an answer with real sources cited. Think Google, but instead of a list of links, you get a synthesized answer. Useful for research where you want to verify what the AI is saying.

**Google Gemini** — Google's model and app. Integrated into Google Workspace — Docs, Gmail, Drive. If you live in Google's ecosystem, Gemini is where AI assistance shows up.

**NotebookLM** — A Google tool that analyzes your own documents. Upload PDFs, notes, videos. Ask questions about them. Get a podcast-style audio summary. Remarkable for synthesizing large amounts of material. If you are doing research and have a pile of sources, this is useful.

---

## No-code and low-code app builders

These tools let you build functional web apps by describing what you want, without writing code yourself.

**Lovable** — Describe your app. It builds it using React and Supabase under the hood. Good for MVPs and prototypes. Hits limits on complex apps.

**Bolt** — Similar to Lovable. Builds apps in the browser from a description.

**Replit** — A cloud IDE with AI features. You can build and deploy an app entirely in the browser without installing anything locally.

All three use frontier models (Claude, GPT-4) under the hood. They are useful for getting something working quickly. If you are learning to build with AI, starting with one of these to see what is possible before moving to a more controlled workflow is reasonable.

---

## Workflow automation

**N8N** — Open-source workflow automation. Connect APIs, databases, AI models, and services together into automated pipelines. An event triggers a workflow. The workflow runs. Like Zapier, but self-hostable and more flexible. Useful for building AI pipelines that do not need a developer in the loop every time.

---

## Running models locally

**Ollama** — One command installs an open-source model on your Mac or Linux machine. No internet required. No cost per query after setup. Fully private. The limit is your hardware — smaller models (7 billion parameters and below) run well on most laptops. Larger ones need more.

If privacy matters or you want to experiment with models for free, Ollama is where to start.

---

## Finding and routing models

**HuggingFace** — The central repository for open-source AI models and datasets. Thousands of models available. Demos you can run in a browser. The place to go when you are looking for a model for a specific task: a fine-tuned coding model, a small image classifier, a translation model.

**OpenRouter** — A single API that routes to dozens of different model providers. GPT-4o, Claude, Mistral, Llama, and others through one API key. Useful if you are building something and want to be able to swap models without rewriting your integration.

---

## Voice input

**Wispr Flow** — AI voice dictation for your computer. Speak anywhere, it types. Useful for prompting without typing. Worth trying if you find yourself typing long prompts repeatedly.

---

## Chinese models and tools

Worth paying attention to. This part of the landscape is moving fast.

**DeepSeek** — Models from a Chinese quantitative finance firm. DeepSeek R1, released in early 2025, matched GPT-4 class performance at a fraction of the cost to run. Open-source. Significant.

**Qwen** (Alibaba) — Strong open-source models, particularly good at code. Competitive with the best Western open-source options.

**Kimi** (Moonshot AI) — Specializes in very large context windows.

**ByteDance** (TikTok's parent company) — Produces Doubao and other models.

**Zhipu AI** — Chinese research lab with strong academic backing.

The quality gap between Chinese and Western frontier models has largely closed. If you are choosing an open-source model, Qwen and DeepSeek are legitimate options alongside Llama and Mistral.

---

## Social media automation

**OpenClaw** — AI-powered tool for automating social media content. Useful if you are posting content regularly and want to reduce the manual work of scheduling and publishing.

---

## The honest picture

Most of these tools are useful for specific things. None of them are magic. The underlying models are doing the same work whether you access them through ChatGPT, Lovable, or a raw API call.

The question is always: what is the right interface for the task? For building apps, a CLI agent. For research, Perplexity or NotebookLM. For running experiments cheaply, Ollama. For automating pipelines, N8N.

Pick the right tool. Ignore the rest.
