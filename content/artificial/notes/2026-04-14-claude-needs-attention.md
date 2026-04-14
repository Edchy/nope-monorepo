---
title: I added a hook for when Claude needs attention
date: 2026-04-14
tags: [claude-code, setup, workflow]
---

I added a custom hook in `~/.claude/settings.json` to notify me when Claude needs attention. Small change, big difference.

The point is reducing background uncertainty. If the agent is waiting on approval, blocked on a tool, or just needs me, I want that surfaced immediately instead of discovering it by accident ten minutes later.
