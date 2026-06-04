---
title: "Why the Cheap AI Model Can Still Cost More"
description: "A simple explanation of API billing, prompt caching, and why a subscription model can feel much cheaper than pay-per-token usage."
date: 2026-06-04
tags: [ai, tools, nerdstuff]
draft: false
---

I had a small billing mystery.

I was using two AI models for roughly the same kind of work:

```txt
GPT through Codex / ChatGPT subscription
Qwen through OpenRouter
```

On paper, Qwen looked much cheaper. GPT output was around `$30 per million tokens`. Qwen was around `$3.74 per million tokens`.

So Qwen should have felt cheaper. But it didn't.

I spent real dollars on Qwen through OpenRouter, while GPT barely moved my weekly ChatGPT usage limit. At first this felt backwards. Then I realised I was comparing two completely different things.

---

## The short version

OpenRouter is usually closer to this:

```txt
You used this many tokens. Here is the bill.
```

ChatGPT or Codex subscription usage is closer to this:

```txt
You have a weekly allowance. You used a bit of it.
```

One is a taxi meter. The other is a gym membership with a bouncer. Both involve limits. Only one gives you an itemised bill every time you move.

---

## What Hermes actually sends

When I type a small message into Hermes, Hermes doesn't only send that one sentence to the model. It may also send:

```txt
system instructions
personality instructions
memory
user preferences
tool descriptions
conversation history
my actual message
```

The message looks small to me. To the model provider, it can be a large package. That package is called the prompt — and AI APIs charge by tokens.

---

## What are tokens?

Tokens are small chunks of text. A word, part of a word, punctuation, whitespace. This sentence:

```txt
Hello Edward, good morning.
```

might tokenise to something like:

```txt
Hello | Edward | , | good | morning | .
```

Providers usually count:

```txt
input tokens  = what you send to the model
output tokens = what the model writes back
```

In a tool-heavy agent, input tokens are often the expensive part. Even if the answer is short, the model may have read a great deal first.

A butler may only say "Very good, sir," but he has still read the household ledger.

---

## Why output price can be misleading

It's tempting to compare only output price:

```txt
GPT output:  $30 / million tokens
Qwen output: $3.74 / million tokens
```

But if Hermes sends a huge prompt every turn, input cost matters a lot. A single turn might look like:

```txt
50,000 input tokens
500 output tokens
```

The model mostly spent time reading. So the real question isn't which model has cheaper output — it's how many total tokens am I being billed for, and at what rate.

---

## Where prompt caching fits in

Prompt caching is one of the reasons this gets confusing.

Each turn, Hermes sends something like:

```txt
same system instructions
same tool descriptions
same memory
same conversation so far
new user message
```

A lot of that prompt is the same from one turn to the next. Prompt caching means the provider notices this and says:

```txt
I've already processed this repeated beginning recently.
I can reuse some of that work instead of doing it again from scratch.
```

Without caching:

```txt
Turn 1: 50,000 input tokens billed normally
Turn 2: 50,000 input tokens billed normally
Turn 3: 50,000 input tokens billed normally
```

With caching:

```txt
Turn 1: 50,000 tokens billed normally
Turn 2: 45,000 repeated tokens get a cache discount, 5,000 are new
Turn 3: 47,000 repeated tokens get a cache discount, 3,000 are new
```

Same conversation. Same apparent use. Very different bill.

Naturally, the invoice does not explain this with the tenderness one might hope for.

---

## A note on what caching actually is

Prompt caching is not memory. It is not training. It is not the AI remembering you.

It's the provider avoiding repeated computation. Temporary reused work. When costs look strange, the distinction matters.

---

## Why GPT through a subscription can feel like a bargain

If I use GPT through ChatGPT or Codex, I'm not paying raw API prices directly. I'm using part of a subscription allowance. So I might see:

```txt
2% of weekly limit used
```

That doesn't mean 2% of $20 was spent. It means 2% of whatever usage allowance OpenAI gives this plan was used. That allowance may be subsidised, use internal pricing, or benefit from caching optimisations I never see.

OpenRouter, on the other hand, shows the money leaving the room.

A dollar bill and a usage percentage are not the same creature. They merely both have numbers on them, because apparently that was allowed.

---

## So should I stop using OpenRouter?

No. But use it deliberately.

GPT through a subscription is probably better for:

```txt
long Hermes sessions
tool-heavy tasks
lots of back-and-forth
large context
```

OpenRouter is still useful for:

```txt
trying different models
backup when GPT limits run low
short direct prompts
model comparisons
tasks where another model genuinely fits better
```

The mistake is using pay-per-token OpenRouter casually for the same giant agent sessions when a subscription model is available and working well.

That's like paying hotel laundry prices while there's a perfectly good washing machine downstairs. Occasionally necessary. Rarely economical.

---

## The mental model

Three different things:

```txt
Hermes        = the harness
Provider API  = the front desk and routing system
LLM           = the engine that generates the answer
```

Hermes prepares the prompt. The provider API receives it, tokenises it, may cache parts of it, bills it, routes it. The LLM processes what it needs to and writes the answer.

When costs look strange, don't only ask which model is cheaper per output token. Ask:

```txt
How much context am I sending?
How much of it is cached?
Am I paying raw API prices or using a subscription allowance?
Am I comparing dollars to quota percentages?
```

That last one is the trap.

A model can look cheaper on paper and still cost more in practice. Not because the price chart is lying — because the chart is only one piece of the story. The trick is knowing which meter is running.
