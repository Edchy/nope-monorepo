---
title: "Git Is Just Text Files Pointing at Other Text Files"
description: "Git looks complicated from the outside. Inside, it's just a bunch of small text files pointing at each other."
date: 2026-03-10
draft: false
---
Git has a reputation for being complicated. There are books about it. People get nervous when they have to rebase in front of others. "Detached HEAD" sounds like something that happens to you when the build pipeline fails hard enough.

But once you look inside Git's guts, most of it is just text files. Small ones. Pointing at each other. Organized into a surprisingly elegant little database.

That's it. That's the magic trick.

---

## The `.git` Folder Is the Actual Repo

When you run `git init`, Git creates a hidden `.git` folder. Your project files sit outside it. The `.git` folder is where Git lives.

```
project/
├─ index.js
├─ package.json
└─ .git/         ← here
```

Inside `.git`, the important stuff:

```
.git/
├─ HEAD
├─ refs/
├─ objects/
└─ config
```

Your code is just Git's working copy. The `.git` folder is the real repository. That `objects/` folder in particular is where things get interesting.

---

## Git Is a Small Database of Objects

Most people picture Git storing "versions of files," like a series of snapshots in a photo album. That's not quite right.

Git stores a database of objects. Three kinds:

```
blob    → file contents
tree    → directory structure
commit  → snapshot + metadata
```

Everything lives in `.git/objects/`. Let's go through each one.

### Blobs: the actual file contents

A blob is just the raw contents of a file. Nothing else. No filename, no path, no metadata.

Take a file called `hello.txt` containing `Hello world`. Git stores that text as a blob and gives it a hash:

```
e965047ad7c57865823c7d992b1d046ea66edf78
```

That hash is calculated from the content of the file. Change one character, you get a completely different hash. The hash *is* the identity of the blob.

Inside `.git/objects/` it appears as:

```
.git/objects/e9/65047ad7c57865823c7d992b1d046ea66edf78
```

Git splits the hash into a two-character folder to keep the directory manageable. Practical, if inelegant.

### Trees: directory structure

A tree represents a folder. It maps filenames to blob hashes (and to other trees, for nested folders).

For a project like this:

```
project/
├─ README.md
└─ src/
    └─ app.js
```

Git creates:

```
root tree
├─ README.md → blob abc123
└─ src → tree
          └─ app.js → blob def456
```

Trees connect names to content. Blobs don't know their own names. Trees are what give blobs their place in the world.

### Commits: a snapshot, not a diff

Here's where a lot of people have the wrong mental model. A commit doesn't store changes. It stores a pointer to a tree.

A commit object looks like this:

```
commit
tree   7f8a3c...
parent a91c0e...
author Eddie
message "add login"
```

The `tree` field points to the root tree for that snapshot. That tree points to all the folders and blobs. The full picture of "what the project looked like at this commit" is: commit points to root tree, root tree points to everything else.

The `parent` field is what creates history. Each commit points backward to the one before it:

```
A <- B <- C <- D <- E
```

---

## Why This Design Is Surprisingly Clever

### No duplication

Because blobs are identified by their content hash, Git reuses them automatically.

Say you have two commits, and `README.md` didn't change between them. Git doesn't store `README.md` twice. Both commits' trees point to the same blob. One copy, referenced from multiple places.

Only changed files produce new blobs:

```
Commit 1: README.md + old app.js
Commit 2: README.md + new app.js

blobs stored:
blob1 → README.md contents     (shared by both commits)
blob2 → old app.js contents
blob3 → new app.js contents
```

The more your files stay the same across commits, the more Git deduplicates. A 1000-commit project isn't storing 1000 full copies of your codebase.

### History is immutable by design

A commit's hash is calculated from its contents, which include the parent hash, the tree hash, the author, the timestamp, and the message.

Change anything in a commit and you get a completely different hash. And since every child commit includes the parent hash, changing one commit invalidates every commit that comes after it. You can't quietly edit history without the hashes giving you away.

This is why commit hashes are a reliable way to refer to a specific state of the code. The hash *is* the proof.

### Corruption gets caught automatically

Because every object is hashed, Git can check its own work. If a file on disk doesn't match its expected hash, Git knows something went wrong. There's no separate integrity check. The whole system is one giant integrity check.

### Cloning is straightforward

When you clone a repo, Git downloads all the objects. Once you have them, you can reconstruct every commit because they all reference each other by hash. Nothing is missing. Nothing is ambiguous. The objects are self-contained.

### This idea turns out to be pretty important

Git basically built a content-addressed storage system before most people knew that phrase. The same core idea shows up in Docker (image layers), IPFS (distributed file storage), and Nix (reproducible builds). All of them store content by hash, reference by pointer, and deduplicate automatically.

Git got there first. By accident, while trying to version-control the Linux kernel.

---

## Branches and HEAD Are Also Just Files

Back to the `.git` folder. The `refs/` directory holds your branches:

```
.git/refs/heads/main
.git/refs/heads/dev
.git/refs/heads/feature-login
```

Open any of them. You'll find one thing: a commit hash.

```
a1b93f4c9a3c2c6e7...
```

That's a branch. A single-line text file pointing to a commit. This is why creating a branch is instant: Git writes one file with one line. No duplication, no copying, no waiting.

`HEAD` works the same way. Open `.git/HEAD` and you'll see:

```
ref: refs/heads/main
```

That's how Git knows which branch you're on. HEAD points to a branch file, which points to a commit. Two hops.

When you make a new commit, Git creates the commit object, then updates the branch file to contain the new hash. That's the whole "branch moved forward" operation.

---

## Checkout Changes HEAD (and Loads Files)

When you run `git checkout dev`, Git rewrites `.git/HEAD`:

```
ref: refs/heads/dev
```

Then it reads the commit that branch points to, reads the tree from that commit, and loads those files into your working directory. Checkout is: update one pointer, then sync your files to match.

---

## Detached HEAD Is a Scary Name for a Simple Thing

If you run `git checkout a1b93f4` (a specific commit hash instead of a branch name), HEAD stops pointing at a branch file and points directly at a commit:

```
ref: refs/heads/main   ← normal
a1b93f4               ← detached
```

This is "detached HEAD state," which sounds like a medical emergency. It just means you're parked at a commit with no branch label. If you make commits here, they won't be attached to any branch. They'll exist in the objects database, but nothing points to them, so Git will eventually garbage-collect them.

The fix: `git checkout -b new-branch-name`. That creates a branch file pointing to where you are. HEAD has something to point to again. You're back on the map.

---

## Where Worktrees Fit In

Normally there's one `HEAD` file. That's why you can only be on one branch at a time.

Worktrees get around this by creating additional HEAD files:

```
.git/worktrees/hotfix/HEAD
.git/worktrees/feature/HEAD
```

Each worktree has its own pointer into the same objects database. Multiple branches checked out simultaneously, no duplication, no conflict. The objects are shared. Only the pointers multiply.

---

## The Mental Model

```
blob     = file contents (named by hash)
tree     = directory structure (maps names to blobs)
commit   = snapshot (points to a tree + its parent)
branch   = a label (one file, one commit hash)
HEAD     = which label you're using right now
checkout = move the pointer, sync the files
```

Once this settles in, Git stops feeling like a mysterious black box. It's a database of hashed objects, linked by pointers, with a few text files on top to track where you are.

The design is more elegant than it has any right to be for something that started as a side project to manage Linux kernel patches.

---

*If you want to poke around the object database yourself, look up `git cat-file`. It lets you read commits, trees, and blobs directly by their hash. Once you've done that, Git feels genuinely less mysterious. Worth ten minutes.*
