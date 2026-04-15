---
title: "How LLMs Work"
description: "Tokens, context windows, temperature, attention — the basics of how a language model actually works, without the hype."
date: 2025-11-05
tags: [ai, technical, llm]
draft: false
---

You do not need to understand what is happening inside an AI model to use one well. But knowing the basics changes how you think about what the model can and cannot do. Here is what is actually going on.

---

## What the model is, physically

An LLM is a file. A very large file.

More precisely, it is a collection of numbers — billions of them, sometimes trillions — stored as floating-point values. These numbers are called parameters or weights. They are arranged in layers, and together they form a neural network.

When you run the model, those numbers are loaded into GPU memory (the same kind of hardware that renders video games, repurposed for matrix multiplication). Your text goes in. The network performs calculations using those billions of numbers. Text comes out.

The critical thing: the model does not store knowledge the way a database stores knowledge. You cannot open it up and find where "Paris is the capital of France" is saved. That fact is encoded diffusely, spread across billions of values, as a statistical pattern. The model will produce the right answer because the pattern points there, not because there is a file entry that says so.

---

## Tokens

The model does not process words. It processes tokens.

A token is a chunk of text. Roughly speaking, one token is about three-quarters of a word in English. The word "hamburger" might be two tokens. A space counts. A punctuation mark counts. Code is usually more token-dense than plain prose.

Everything is measured in tokens. The cost of using a model is calculated in tokens. The limits of a conversation are measured in tokens. When someone says a model has a large "context window," they mean it can hold a lot of tokens at once.

---

## The context window

The context window is the model's working memory.

It is the total number of tokens the model can see at one time. Everything in the conversation, including your message, the model's previous responses, and any system instructions, has to fit within this window. When something falls outside the window, the model has no awareness of it. It is simply gone.

Here is the part that surprises most people: every time you send a new message, the entire conversation is re-sent from the beginning as the model's input. The model does not remember previous messages. It re-reads all of them, every time. You are not talking to something that remembers. You are repeatedly giving it the full transcript and asking it to respond to the latest entry.

This has practical implications. Long conversations cost more, because each message processes more tokens. And there is a hard limit to how long a conversation can get before it runs out of context.

---

## Why writing costs more than reading

When you use an AI, you are charged differently for text you send versus text the model generates. Input is cheaper. Output costs more.

The reason is computational.

Reading your message (input) requires one pass through the network. Fast.

Generating a response (output) requires the model to produce one token at a time. For each token, it does a full pass through the network, samples from a probability distribution, and feeds the result back in to generate the next token. A 500-word response might require 600 or 700 individual forward passes. Reading 500 words takes one pass.

It is the difference between reading a book and writing one.

---

## Temperature and randomness

LLMs are not deterministic. Ask the same question twice and you may get different answers. This is by design.

When the model generates each token, it is not simply picking the single most likely next word. It is sampling from a probability distribution. The model might assign 40% probability to one word, 25% to another, 15% to a third, and so on. It draws from that distribution. This is what makes the output feel natural rather than robotic.

A setting called temperature controls how much randomness is introduced.

At temperature zero, the model always picks the most probable token. Responses are consistent and predictable. At temperature one, it samples more freely from the distribution. Responses are more varied and sometimes more creative. Above one, things get chaotic.

Most applications set temperature somewhere between 0.5 and 1, depending on what they need.

---

## Attention

The mechanism that made modern LLMs possible is called attention.

Before the Transformer architecture (the design underlying all modern language models), models processed language sequentially. They would often lose track of earlier parts of a sentence by the time they reached the end.

Attention changed this. It lets the model, when generating each token, look at every other token in the context and decide how much weight to give each one. It can connect a pronoun at the end of a paragraph to the noun it refers to near the beginning. It gives the model long-range understanding.

This is why large models can reason across long documents in a way earlier models could not.

---

## RAG: giving the model access to new knowledge

A model's training data has a cutoff date. Anything that happened after training is unknown to it. You cannot add new knowledge to a model without retraining it, and retraining is enormously expensive.

RAG — Retrieval Augmented Generation — is the solution.

Instead of baking new facts into the model, you store documents in a database. When a question comes in, the relevant documents are retrieved and injected into the context window alongside the question. The model answers using that retrieved information.

The model does not gain new knowledge. It gains access to information placed in its context. The distinction matters: it can use what is in front of it, but it is still the same model.

RAG is how AI tools can be up to date on recent information without constant retraining.
