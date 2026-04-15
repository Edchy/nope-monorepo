---
title: "Multiple git branches"
description: "Git lets you have multiple branches checked out at the same time. Here is how that works and when it's useful."
date: 2026-03-15
draft: false
---
Normally in Git, you can only be on one branch at a time. If you need to switch to something else, you have to set aside your current work first.

Git worktrees let you skip that.

---

## What a worktree is

Normally, a Git repo is like a desk. One surface. If you want to work on a different branch, you have to clear everything off first — stash your changes, switch branches, and try to remember what you were doing when you come back.

A worktree is like having a second desk that shares the same filing cabinet.

Same repo. Same history. Same commits. But now you've got two directories on your computer, each checked out to a different branch, both completely real and usable at the same time. Change something in one, it doesn't touch the other. Commit something in one, the other can pull it in whenever it's ready.

It's not a copy of your repo. There's no duplication happening. One repo, two windows into it. Simultaneously.

---

## When You'd Actually Use This

The classic scenario: you're deep in a feature branch. Something breaks in production. You need to hotfix `main` right now, but your working directory has half-finished changes.

Without worktrees: stash everything, switch to main, fix it, switch back, unstash, try to remember what state you were in.

With worktrees:

```bash
git worktree add ../hotfix main
```

That's it. You now have a second folder, `../hotfix`, checked out to `main`. You fix the bug there. Your feature branch, over in its original folder, hasn't moved. Go back to it whenever you want.

Other situations where this is useful:
- Running two versions of your app side-by-side to compare behavior
- Reviewing someone's PR without abandoning your own work
- Building or testing a branch without switching your main environment

---

## The Commands You Need

```bash
# Create a new worktree for an existing branch
git worktree add ../folder-name branch-name

# Create a new worktree and a new branch at the same time
git worktree add -b new-branch-name ../folder-name

# See all your active worktrees
git worktree list

# Clean up when you're done
git worktree remove ../folder-name
```

One thing to know: you can't check out the same branch in two worktrees at the same time. Git won't let you. This is Git being responsible for once.

---

## That's Pretty Much It

Worktrees sound more complicated than they are. You add a folder, it's a real checkout, you work in it, you remove it when you're done. Your original branch stays exactly as you left it.

Try it the next time you need to switch context mid-feature.
