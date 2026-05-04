---
title: "Running AI on your own laptop is real now, but your laptop will remind you of its limits"
description: "Downloaded LM Studio today, tried a Google Gemma model, and immediately started wanting a bigger Mac."
date: 2026-05-01
tags: [ai, local-models, tools]
draft: false
---

Today I downloaded LM Studio and ran an AI model entirely on my MacBook Air. No internet required. No API. No subscription. Just my computer, doing the thing.

It's kind of wild that this is possible at all. (genuinely)

---

## What LM Studio is

LM Studio is a desktop app that lets you download and run open-source AI models locally. You open it, browse a list of models, click download, and start chatting. No terminal. No setup. It has a live memory monitor that tells you whether your machine can actually handle a given model before you commit to the download.

Think of it like a model launcher. The AI runs on your machine, not on a server somewhere. Your prompts never leave your computer.

**The good stuff:**
- Free. Once the model is downloaded, inference costs nothing.
- Private. Nothing leaves your machine.
- Works offline. Which is a weird thing to say about AI in 2026 but here we are.
- Easy to get started. No command line, no config files, no fuss.

**The not so good stuff:**
- Models take up a lot of disk space. We're talking several gigabytes each, sometimes tens of gigabytes. For me, on a MacBook Air that's already tight on space, this is a real problem.
- Smaller machines can only run smaller models. Which brings me to what I actually tried.

---

## What a model actually is

Before getting into specifics, it helps to understand what you're actually downloading.

A model is mostly just a very large file full of numbers. That's kind of it. Those numbers are the parameters — billions of tiny values that were adjusted over months of training on enormous amounts of text. The training process slowly tuned all those numbers until the model got good at predicting what comes next in a sentence. Which turns out to be the same thing as being good at answering questions, writing code, summarizing things, and so on.

Alongside the numbers there's some code that defines the structure — how information flows through the model, what happens at each layer. But the bulk of what you download is the parameters. A 4 billion parameter model is literally a file containing 4 billion numbers.

When you run a model, the whole thing gets loaded into memory. Not streamed, not fetched on demand. The entire file, sitting in RAM, waiting for your input. This is why memory is the hard limit for local models. If the model is 5GB, you need 5GB of RAM free just to hold it. Then your computer does a huge amount of math every time you type something, using all those numbers to figure out what word comes next, one token at a time.

That's why my MacBook Air took a moment to think before each response. It's not slow software. It's doing a genuinely enormous amount of computation on a consumer laptop.

---

## I tried google/gemma-4-e4b. What even is that.

The model I downloaded was `google/gemma-4-e4b`. Let me break that down.

**Google** made it. **Gemma** is their family of small, open-source models. And that word "small" is important. Gemma models are specifically built to run on limited hardware. Phones, tablets, edge devices. They're not Google's frontier AI (that's Gemini). Gemma is more like Google saying "here's a capable little model you can actually run yourself." So running it on a MacBook Air is actually quite fitting. This model was designed for exactly this kind of constrained environment.

**4** is the version. **4b** means 4 billion parameters. A parameter is one of those numbers I mentioned above. As for the **e**: I'm not 100% sure. It likely marks a specific efficient variant, tuned to run fast on limited hardware. The naming conventions in this space are a bit all over the place. (idk, someone smarter than me probably knows.)

What I can tell you is that it used about 5GB of my RAM and generated responses noticeably slower than Claude. Which makes sense. It's a small model on a consumer laptop doing billions of calculations per response.

---

## The size thing, and why it matters

Models come in different sizes, measured in parameter count, usually written in billions (B). A 4B model has 4 billion parameters. A 70B model has seventy billion. Bigger generally means smarter. Bigger also means more memory to run it, more disk space to store it, and slower generation on the same hardware.

There's a compression trick called quantization. Full precision models store each parameter as a large number. Quantization squashes them down to smaller numbers, making the whole file smaller and faster to run, at a tiny cost to quality. Most models you download through LM Studio are already quantized. A Q4 quantized model takes roughly 0.6 to 0.7GB per billion parameters. So a 4B model at Q4 is around 2.5GB on disk.

The model I ran was around 3GB on disk, 5GB in memory once loaded. That 5GB sits in RAM the entire time the model is running. On a 16GB MacBook Air, that leaves 11GB for everything else. Manageable, but you feel it.

The models that are actually getting close to cloud AI quality need 24GB, 64GB, more. My machine can run the Gemmas of the world. The interesting stuff is out of reach.

---

## I want a bigger Mac

Running a 4B Gemma model on a MacBook Air is a fine starting point. But the models worth getting excited about need real memory. A Mac Studio with 64GB is where things get good. 128GB lets you run genuinely impressive models. 512GB and you're running the biggest open-source models available, models that apparently beat Claude Opus 4.6 on coding benchmarks.

I can feel the ceiling on my machine. The models I can run are useful. The models I can't run are the ones I actually want to try.

For now: LM Studio is installed, Gemma is running slowly, and I'm looking at Mac Studio configs I can't justify yet.

That'll do for today.
