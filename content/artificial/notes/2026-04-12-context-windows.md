---
kind: note
title: Context windows are working memory, not storage
date: 2026-04-12
tags: [llms, mental-models]
---

The thing that clicked for me: a context window is closer to RAM than a hard drive. Whatever isn't in the window doesn't exist to the model. This reframes a lot of prompt engineering — you're not "telling the model things", you're loading a workspace.

Implication: for long tasks, what you *remove* from context matters as much as what you add.
