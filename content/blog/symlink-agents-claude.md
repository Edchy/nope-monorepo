---
title: "Two copies of the same folder, because AI tools can't agree on where to put things"
description: "Claude uses .claude/. Other agents use .agents/. Nobody agreed on this. Here's how to stop duplicating files."
date: 2026-05-01
tags: [ai, tools, dev]
draft: false
---

I've been keeping two copies of the same folder.

One at `.claude/skills` for Claude. One at `.agents/skills` for other tools like OpenCode. Same files, duplicated, slowly drifting out of sync. Every time I updated a skill in one place I'd forget to update the other. (classic.)

---

## The actual problem

The AI tooling world hasn't agreed on where to put shared configuration. `.agents/` is where some tools have landed, but it's not an official standard anyone signed off on. Claude uses `.claude/` because Anthropic built their own thing before the conversation about shared conventions really started.

Nobody's wrong exactly. The ecosystem is just young and a bit fragmented, and the tools haven't sorted it out yet.

---

## The fix: a symlink

Today I fixed it with a symlink. A symlink is a filesystem shortcut. It looks like a real folder, but it just points somewhere else. So `.claude/skills` now points to `.agents/skills`. One source of truth. Both tools see the same thing.

Run this from your project root:

```bash
mkdir -p .agents/skills
mkdir -p .claude
ln -s ../.agents/skills .claude/skills
```

The `ln -s` command creates the symlink. It's saying: make `.claude/skills` a shortcut that points to `../.agents/skills`.

Your folder structure ends up looking like this:

```
your-project/
  .agents/
    skills/
      your-skill/
        SKILL.md
  .claude/
    skills -> ../.agents/skills
```

When you add a skill to `.agents/skills/your-skill/SKILL.md`, Claude sees it automatically at `.claude/skills/your-skill/SKILL.md`. Nothing to sync. Nothing to duplicate.

To verify it worked:

```bash
ls -la .claude
ls .claude/skills
```

The first command will show `skills -> ../.agents/skills` next to the folder, which confirms the symlink is there. The second will list whatever is actually inside `.agents/skills`.

If you ever need to remove just the shortcut without touching your real files:

```bash
rm .claude/skills
```

That removes the symlink only. Your `.agents/skills` folder stays untouched.

---

## This is a workaround, not a solution

The symlink works for now. But if these tools start diverging on what goes inside those folders, different config formats, different structures, the fix gets messier. For today, it's fine.

"I found a fix for a fragmented tooling ecosystem that probably won't stay fixed" is a more honest description of today than "I learned a neat trick."

Still. Took ten seconds to set up. Should have done it weeks ago.
