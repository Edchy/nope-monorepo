---
title: "What AI Actually Is"
description: "Most people treat AI like it's a person. They say please and thank you, apologize when they interrupt it, and feel slightly unsettled when it says something strange. This is understandable. It is also a bad mental model that will make you worse at using it."
date: 2025-10-15
tags: [ai, fundamentals]
draft: false
---

Most people treat AI like it's a person. They say please and thank you, apologize when they interrupt it, and feel slightly unsettled when it says something strange. This is understandable. It is also a bad mental model that will make you worse at using it.

AI is not a person. It is a prediction machine.

Here is what that means.

---

## A machine that completes sentences

An AI language model — the kind behind ChatGPT, Claude, and the rest — was trained by reading a huge amount of text. Books, websites, code, articles. Enormous amounts of it.

While reading, it learned one thing: given a sequence of words, what word comes next?

That is the whole trick. Predict the next word. Do that billions of times. The result, when it works well, is something that sounds remarkably like a thinking person.

But it is not thinking. It is calculating probabilities.

When you ask it a question, it does not look up the answer. It generates the most statistically likely response given your question and everything it has seen during training. The output looks like understanding. It is actually very sophisticated pattern-matching.

---

## Why this matters

Once you know this, a few things make sense.

It can be wrong with total confidence. A person who does not know something will often say so. The prediction machine does not have that instinct. It will produce a plausible-sounding answer whether or not a plausible answer exists. This is called hallucination. It is not a bug to be fixed. It is a feature of how the system works.

The same question can get different answers. Because the model is sampling from probabilities, not retrieving a fixed answer, it will sometimes say different things to the same question. The output is not deterministic. You are not getting truth. You are getting the most likely response, with some randomness built in.

Your phrasing changes the output. If you think of it as a conversation, you ask questions and hope for good answers. If you think of it as steering probabilities, you understand that the words you use, the context you provide, the structure of your request — all of it shifts what gets generated. Better input, better output.

---

## Three layers worth knowing

There is a useful distinction between the raw model and the things built on top of it.

The **raw model** is just the neural network. A file (a very large file) of numbers that transform input into output. It has no internet access. It does not remember previous conversations. It knows nothing about you. It is, essentially, a brain in a jar — capable, but completely disconnected from the world.

The **app** is what you actually use. ChatGPT, Claude.ai, Gemini. These are products built around the model. They add memory, tools, a user interface. The model inside is still doing the same probability calculations. The app makes it useful.

**Tools and plugins** are what let the model reach into the world. By default, a model cannot browse the web, run code, or check your calendar. Tools give it those abilities. The model decides when to use them. The result of using them gets fed back into the model's context, and then the model generates a response that incorporates what the tool returned.

---

## The right mental model

You are not having a conversation. You are steering a probability machine.

This sounds cold. In practice, it is freeing. It means you are in control. The quality of what you get back is largely a function of what you put in. There is no relationship to manage. There is no ego to navigate. There is just signal in, signal out.

Treat it like a tool. A very good one.
