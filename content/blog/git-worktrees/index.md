---
title: "Git Has Been Lying to You About How Many Branches You Can Work On At Once"
date: 2026-04-10
draft: true
---
You know that thing where you're halfway through a feature, something urgent breaks in production, and Git expects you to either commit half-finished garbage or stash everything and hope for the best?

Git worktrees fix that. And they do it in a way that feels slightly illegal once you understand it.

---

## Your Repo Is Haunted (In a Good Way)

Normally, a Git repo is like a desk. One desk. One surface. If you want to work on a different branch, you have to clear everything off the desk first — stash your changes, switch branches, and then try to remember what you were doing when you come back.

A worktree is like summoning a second desk that shares the same filing cabinet.

Same repo. Same history. Same commits. But now you've got two directories on your computer, each checked out to a different branch, both completely real and usable at the same time. Change something in one, it doesn't touch the other. Commit something in one, the other can pull it in whenever it's ready.

It's not a copy of your repo. There's no duplication happening. It's more like... one repo, two windows into it. Simultaneously. Without you having to do anything weird.

---

## When Would You Actually Use This

The classic scenario: you're deep in a feature branch. Something breaks in production. You need to hotfix `main` right now, but your working directory looks like a crime scene.

Without worktrees: stash everything, switch to main, fix it, switch back, unstash, try to remember what state you were in. You will forget something. This is law.

With worktrees:

```bash
git worktree add ../hotfix main
```

That's it. You now have a second folder — `../hotfix` — checked out to `main`. You fix the bug there. Your feature branch, over in its original folder, hasn't moved a single pixel. Go back to it whenever you want.

Other situations where this is great:
- Running two versions of your app side-by-side to compare behavior
- Reviewing someone's PR without abandoning your own work
- Building/testing a branch without switching your main environment

---

## The Commands You Need

```bash
# Create a new worktree for an existing branch
git worktree add ../folder-name branch-name

# Create a new worktree AND a new branch at the same time
git worktree add -b new-branch-name ../folder-name

# See all your active worktrees
git worktree list

# Clean up when you're done
git worktree remove ../folder-name
```

One thing to know: you can't check out the same branch in two worktrees at the same time. Git won't let you. This is Git being responsible for once.

---

## That's Pretty Much It

Worktrees are one of those features that sounds more complicated than it is. You add a folder, it's a real checkout, you work in it, you remove it when you're done. Your brain keeps working on the first thing the whole time.

The filing cabinet metaphor holds up better than most Git metaphors, which is saying something, because most Git metaphors fall apart immediately upon contact with reality.

Try it the next time you need to context-switch mid-feature. You will feel like you've been doing things the hard way for years.

Because you have.
