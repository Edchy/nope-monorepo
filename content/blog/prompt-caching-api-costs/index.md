---
title: "Why the Cheap AI Model Can Still Cost More"
description: "A simple explanation of API billing, prompt caching, and why a subscription model can feel much cheaper than pay-per-token OpenRouter usage."
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

On paper, Qwen looked much cheaper.

The output price for GPT was around `$30 per million tokens`.

The output price for Qwen was around `$3.74 per million tokens`.

So Qwen should have felt cheaper.

But it did not.

I spent real dollars on Qwen through OpenRouter, while GPT barely moved my weekly ChatGPT usage limit.

At first this felt backwards. Then I realised I was comparing two very different things.

---

## The short version

OpenRouter is usually closer to this:

```txt
You used this many tokens.
Here is the bill.
```

ChatGPT or Codex subscription usage is closer to this:

```txt
You have a weekly allowance.
You used a bit of it.
```

Those are not the same kind of meter.

One is a taxi meter.

The other is a gym membership with a bouncer.

Both involve limits. Only one gives you an itemised bill every time you move.

---

## What Hermes actually sends

When I type a small message into Hermes, Hermes does not only send that one sentence to the model.

It may also send things like:

```txt
system instructions
personality instructions
memory
user preferences
tool descriptions
skill descriptions
conversation history
file or terminal output
my actual message
```

So the message may look small to me.

But to the model provider, it may be a large package.

That package is called the prompt.

The prompt is not just what I typed. It is everything the model needs in order to answer properly.

This matters because AI APIs usually charge by tokens.

---

## What are tokens?

Tokens are small chunks of text.

A token can be a word, part of a word, punctuation, or whitespace.

For example, this sentence:

```txt
Hello Edward, good morning.
```

might become something like:

```txt
Hello | Edward | , | good | morning | .
```

That is not exactly how every tokenizer works, but it is close enough.

When an AI provider charges for usage, it usually counts:

```txt
input tokens  = what you send to the model
output tokens = what the model writes back
```

In a tool-heavy AI agent, input tokens can be the expensive part.

Even if the answer is short, the model may have read a great deal first.

A butler may only say, "Very good, sir," but he has still read the household ledger.

---

## Why output price can be misleading

It is tempting to compare only the output price:

```txt
GPT output:  $30 / million tokens
Qwen output: $3.74 / million tokens
```

That makes Qwen look much cheaper.

But if Hermes sends a huge prompt every turn, input cost matters a lot.

A single turn might look like this:

```txt
50,000 input tokens
500 output tokens
```

In that case, the model mostly spent time reading.

So the real question is not:

```txt
Which model has cheaper output?
```

The better question is:

```txt
How many total tokens am I being billed for, and at what rate?
```

Especially input tokens.

---

## Where prompt caching fits in

Prompt caching is one of the reasons this gets confusing.

Imagine Hermes sends this to the provider:

```txt
same system instructions
same tool descriptions
same memory
same conversation so far
new user message
```

A lot of that prompt is the same from one turn to the next.

Prompt caching means the provider says:

```txt
I have already processed this repeated beginning recently.
I can reuse some of that work instead of doing it again from scratch.
```

The important part:

Prompt caching usually happens at the provider level.

Not inside Hermes.

Not inside the model as memory.

The rough path looks like this:

```txt
Hermes
  ↓
OpenAI / OpenRouter / provider API
  ↓
request checks, billing, routing, tokenisation
  ↓
prompt-cache lookup
  ↓
model computation
  ↓
answer
```

So Hermes sends the prompt to the provider API.

The provider infrastructure may then notice that the beginning of the prompt matches a recent request.

If it does, it can reuse cached computation.

That can make repeated large prompts faster, cheaper, or both.

---

## A very simple example

Without caching:

```txt
Turn 1: 50,000 input tokens billed normally
Turn 2: 50,000 input tokens billed normally
Turn 3: 50,000 input tokens billed normally
```

Total:

```txt
150,000 full-price input tokens
```

With caching:

```txt
Turn 1: 50,000 input tokens billed normally
Turn 2: 45,000 repeated tokens get a cache discount, 5,000 are new
Turn 3: 47,000 repeated tokens get a cache discount, 3,000 are new
```

That can be much cheaper.

Same conversation. Same apparent use. Very different bill.

Naturally, the invoice does not explain this with the tenderness one might hope for.

---

## Is the API reading my prompt first?

Sort of, but not like a person reading an essay.

The provider API receives the request before the model generates an answer.

It has to do several practical things:

```txt
check your API key
check the model name
count or process tokens
route the request
apply safety and billing rules
look for cache matches
send work to model servers
```

For prompt caching, the provider is usually looking for matching token sequences.

It is more like:

```txt
Have I seen these first 40,000 tokens recently?
```

Not:

```txt
What a charming paragraph about Alfred and the manor.
```

The model is not learning from the cache. The cache is temporary reused computation.

That distinction matters.

Prompt caching is not memory.

It is not training.

It is not the AI remembering you.

It is the provider avoiding repeated work.

---

## Why GPT through a subscription can feel like a bargain

If I use GPT through ChatGPT or Codex, I may not be paying raw API prices directly.

Instead, I am using part of a subscription allowance.

So I might see:

```txt
2% of weekly limit used
```

That does not mean:

```txt
2% of $20 was spent
```

It means:

```txt
2% of whatever usage allowance OpenAI gives this plan was used
```

That allowance may be subsidised. It may use internal pricing. It may benefit from caching and other optimisations that I never see.

OpenRouter, on the other hand, shows the money leaving the room.

This makes GPT through a subscription feel like an excellent deal for heavy daily agent work.

And it probably is.

At least while the quota lasts.

---

## So should I stop using OpenRouter?

No.

But I should use it deliberately.

GPT through Codex or ChatGPT subscription is probably better for:

```txt
long Hermes sessions
coding work
tool-heavy tasks
server work
lots of back-and-forth
large context
```

OpenRouter is still useful for:

```txt
trying different models
using Qwen when I prefer its style
backup when GPT limits run low
short direct prompts
model comparisons
special tasks where another model is better
```

The mistake is using pay-per-token OpenRouter casually for the same giant agent sessions when a subscription model is available and working well.

That is like paying hotel laundry prices while there is a perfectly good washing machine downstairs.

Occasionally necessary. Rarely economical.

---

## The mental model I now use

There are three different things:

```txt
Hermes = the harness
Provider API = the front desk and routing system
LLM = the engine that generates the answer
```

Hermes prepares the prompt.

The provider API receives it, checks it, tokenises it, may cache parts of it, bills it, and routes it.

The LLM processes what it needs to process and writes the answer.

So when costs look strange, I should not only ask:

```txt
Which model is cheaper per output token?
```

I should ask:

```txt
How much context am I sending?
How much of it is cached?
Am I paying raw API prices or using a subscription allowance?
Am I comparing dollars to quota percentages?
```

That last one is the trap.

A dollar bill and a usage percentage are not the same creature.

They merely both have numbers on them, because apparently that was allowed.

---

## Final takeaway

A model can look cheaper on paper and still cost more in practice.

Not because the price chart is lying.

Because the chart is only one piece of the story.

The real cost depends on:

```txt
input tokens
output tokens
prompt caching
provider billing
subscription allowances
how much context the agent sends every turn
```

For big agentic work, GPT through a subscription can be a very good deal.

For experiments, backups, and specific model preferences, OpenRouter is still worth having.

The trick is knowing which meter is running.
