---
title: "The Model Landscape"
description: "There are a lot of AI models. The names blend together quickly. Here is a map."
date: 2025-11-19
tags: [ai, models]
draft: false
---

There are a lot of AI models. The names blend together quickly. Here is a map.

---

## What a model is

A model is a trained neural network. It is a file of numbers — billions or trillions of them — that transforms text input into text output. Different models were trained on different data, at different scales, with different goals. The result is different strengths.

Some models are fast and cheap. Some are slow and expensive but better at complex reasoning. Some are good at code. Some are good at following instructions. Some are good at talking through subtle topics without confidently saying wrong things.

---

## The main families

**OpenAI** makes the GPT family. GPT-4o is their main model for most tasks. The "o" series (o1, o3) are reasoning models — they spend extra time thinking through problems before answering, which makes them better at math and complex logic. GPT-4.1 is their latest general model.

**Anthropic** makes Claude. The naming follows three tiers: Haiku (fast and cheap), Sonnet (balanced), Opus (most capable). Anthropic's focus is on making models that are honest and reliable. Claude is widely considered the best for writing and nuanced reasoning.

**Google** makes Gemini. Flash is fast and affordable. Pro and Ultra are stronger but more expensive. Gemini is deeply integrated into Google's products and has some of the largest context windows available.

**Meta** makes Llama. Open-source. The weights are publicly available — you can download them and run them yourself. Llama models are competitive with commercial models and have become the foundation for a huge number of derivative projects.

**Mistral** is a French AI lab that produces efficient, high-quality open-source models. Mistral 7B can run on a laptop. Mixtral is a larger architecture that punches above its weight.

**Chinese models** — DeepSeek, Qwen (Alibaba), Kimi (Moonshot), ByteDance's Doubao — are advancing fast and increasingly competitive with Western models. DeepSeek in particular shocked the industry in early 2025 by matching GPT-4 class performance at a fraction of the cost to run.

---

## Open-source vs. proprietary

**Proprietary models** (GPT, Claude, Gemini) are closed. You access them via an API or a product. The company controls access, sets pricing, and does not release the underlying weights. You cannot run them yourself.

**Open-source models** (Llama, Mistral, Qwen) have publicly released weights. You can download and run them on your own hardware. You can modify them, fine-tune them for specific tasks, and inspect how they work. The trade-off: the most capable models are still proprietary.

---

## Cloud vs. local

**Cloud models** run on the company's servers. You send a request, they process it, you get a response. No hardware requirement on your end. Always the latest version. Costs money per token. Your data leaves your device.

**Local models** run on your own machine. A tool called Ollama makes this easy — one command installs a model and runs it on your Mac or Linux machine. Private. Free after setup. Works without internet. The limit is your hardware. A laptop cannot run a 70 billion parameter model well. Smaller models (7B, 13B parameters) run fine.

---

## Why models cost money

Running a large model requires enormous GPU infrastructure. Each response involves billions of matrix calculations on expensive specialized hardware. The cost per token you pay is a fraction of what the provider spends on electricity and hardware.

Smaller models cost less because they require fewer calculations. Haiku and Flash cost less per token than Opus or GPT-4o for this reason.

---

## API vs. subscription

**Subscription**: Pay a flat monthly fee. Use the model through a web interface. There are usage limits but no per-message billing. ChatGPT Plus and Claude Pro work this way.

**API**: Pay per token. Send requests programmatically. Build your own interface, or integrate the model into an app you are building. More flexible. Can be cheaper or more expensive than a subscription depending on how much you use it.

---

## Why some models are free

Because the company's business model does not require charging users directly. They make money through API access, enterprise contracts, or using the free product to funnel people toward paid plans. Free tiers almost always use smaller, cheaper models.

---

## How models are trained

Training happens in stages.

First, the model reads an enormous amount of text from the internet — books, code, articles, websites. It learns to predict the next word in a sequence. This is called pre-training. It is unsupervised and very expensive.

Second, the model is trained further on curated examples of good responses to questions and instructions. This is called fine-tuning or supervised fine-tuning. It teaches the model to be helpful rather than just a text predictor.

Third, human raters evaluate outputs and the model learns to produce responses humans prefer. This is called RLHF — reinforcement learning from human feedback.

Anthropic uses a variation called Constitutional AI, where the model evaluates its own responses against a set of principles rather than relying only on human raters.

The result of all three stages is the model you use.
