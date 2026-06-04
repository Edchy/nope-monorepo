---
title: "Alfred, the Batcave, and the Tiny SSH Tunnel"
description: "How I access a private Hermes dashboard on a VPS without putting it on the public internet: SSH keys, tunnels, ports, and the small command that hides the plumbing."
date: 2026-06-04
tags: [ai, tools, nerdstuff]
draft: false
color: "6"
---

This is a follow-up to [Alfred lives in Helsinki now](/blog/alfred-lives-in-helsinki). If you haven't read that one, the short version: I run a persistent AI agent on a VPS. His name is Alfred. He's modelled on Alfred Pennyworth from Batman, and he texts me good morning.

Alfred wrote most of this post. I prompted him to explain the SSH tunnel setup we built together, and he ran with it. I cleaned up a few parts but kept his voice. It's more formal than how I usually write. He can't help it.

---

I recently wanted a simpler way to open my Hermes dashboard.

Hermes lives on my VPS. My browser lives on my Mac. The dashboard lives on the VPS, but I did not want to expose it to the public internet — the dashboard can manage Hermes settings, sessions, and potentially secrets.

That would be like leaving the Batcave door open with a sign saying: *please be normal*.

So instead of opening the dashboard to the world, we made a private hallway.

That hallway is SSH.

---

## The cast

There are two computers in this story:

```txt
My Mac    → where my browser is
The VPS   → where Hermes actually runs
```

The VPS is the manor. Hermes is Alfred. The dashboard is the control room. SSH is the private tunnel into the house.

This framing helped me understand the whole setup. Before that it was just a pile of words: VPS, SSH, tunnel, localhost, port, gateway, root, service. Very powerful words. Very poor bedside manner.

---

## The dashboard problem

The Hermes dashboard is a small website running on the VPS, listening on:

```txt
127.0.0.1:9119
```

That means *only this machine, port 9119*. But "this machine" depends on where you're standing.

On my Mac, `127.0.0.1` is my Mac. On the VPS, `127.0.0.1` is the VPS. So if the dashboard is running on the VPS at that address, my Mac can't normally see it. The dashboard is inside the manor with no outside door.

Which is good. Putting it on the public IP would make it accessible to everyone:

```txt
http://95.217.233.210:9119
```

Convenient, in the same way that removing your front door is convenient for guests.

---

## The SSH tunnel

Instead, SSH creates a private tunnel. The command looks like this:

```bash
ssh -p 8022 -fN -L 9119:127.0.0.1:9119 root@95.217.233.210
```

This looks like someone dropped a cutlery drawer into the terminal. The simple version:

```txt
When my Mac opens localhost:9119,
quietly send that traffic through SSH,
and deliver it to localhost:9119 on the VPS.
```

So my browser opens `http://127.0.0.1:9119` and it feels local. But the request actually travels like this:

```txt
Browser on my Mac
  ↓
Mac port 9119
  ↓
SSH tunnel
  ↓
VPS port 9119
  ↓
Hermes dashboard
```

The browser thinks it's talking to my Mac. The Mac is really whispering through a private hallway to the VPS.

Very Alfred. Present, useful, and not standing in the doorway.

---

## What the flags mean

```bash
ssh -p 8022 -fN -L 9119:127.0.0.1:9119 root@95.217.233.210
```

**`-p 8022`** — use port 8022 for SSH. The default is 22, but I changed it during hardening. Not magic security, but it avoids noise.

**`-L 9119:127.0.0.1:9119`** — the tunnel itself. Shape is `-L MAC_PORT:VPS_ADDRESS:VPS_PORT`. The middle `127.0.0.1` is from the VPS's point of view — that's the part that briefly made my brain leave the room.

**`-N`** — don't open a shell. I only want the tunnel, not a terminal prompt on the VPS.

**`-f`** — run in the background. Without this the SSH session sits visibly in the terminal. With it, it disappears quietly and lets me keep working.

**`root@95.217.233.210`** — log into the VPS as root. More on that in a moment.

---

## SSH keys

The tunnel works because my Mac is allowed to SSH into the VPS. That permission comes from a key pair:

```txt
Private key  → stays on my Mac (~/.ssh/id_ed25519)
Public key   → copied onto the VPS (/root/.ssh/authorized_keys)
```

The public key is safe to share — it's like installing a lock on the server. The private key must stay private — it's the only thing that can prove I'm allowed through.

When I SSH in, my private key is never sent to the VPS. The VPS sends a challenge. My Mac signs it with the private key. The VPS checks the signature against the public key in `authorized_keys`. If it matches, I'm in.

A public key is like telling the doorman what my signature looks like. A private key is my hand. Best not to mail that to the doorman.

---

## Why root?

`root` is the administrator account on Linux. It can do everything — install software, edit system files, delete things with terrifying confidence.

My Hermes installation lives under `/root/.hermes`, so logging in as root means I'm working directly with everything. The downside is obvious: if I make a bad command, Linux will helpfully execute it. No questions.

The safer setup would be a normal user plus `sudo` only when needed. For now root is fine because the server is locked down — SSH keys only, password login disabled, port 8022, firewall, fail2ban. Not reckless. Just powerful.

Like giving Alfred access to the armory. Sensible, provided Alfred remains Alfred.

---

## Making it one command

I didn't want to type the full SSH command every time, so Alfred added a shell function to `~/.zshrc` — the file my terminal reads on startup.

The command is `hdash`. It does three things:

1. Starts the Hermes dashboard service on the VPS
2. Opens the SSH tunnel
3. Opens the dashboard in the browser

So instead of remembering the full command, I just type:

```bash
hdash
```

A small mercy.

There's also `hstop` to close the tunnel and stop the dashboard service. We also made `hdash` start a one-hour timer — if I forget to close it manually, the tunnel closes itself.

If I forget it's open, it's not a disaster. The tunnel only exists on my Mac and the dashboard is still not public. But it is untidy.

A sock on the floor, not a burglary.

---

## The dashboard vs the gateway

One thing that confused me: the dashboard is not the same as the Hermes gateway.

The dashboard is the browser control room. The gateway is the messaging bridge — it lets Hermes talk through Telegram, Discord, Slack, email, and so on.

When I message my Telegram bot:

```txt
Telegram
  ↓
Hermes gateway on the VPS
  ↓
Hermes agent (Alfred)
  ↓
Gateway again
  ↓
Telegram reply
```

The gateway is the telephone switchboard. Different servant, different tray.

---

## The mental model

```txt
Hermes lives on the VPS.
The dashboard is a local-only website inside the VPS.
My Mac can't see it directly.
SSH creates a private tunnel.
My browser opens localhost:9119.
The tunnel forwards that to localhost:9119 on the VPS.
The dashboard appears.
```

The machinery is still there — SSH keys, ports, services, tunnels, root, authorized keys, gateway processes. None of it disappeared.

But now it has a front door. Or more accurately: a hidden passage behind a grandfather clock.

Which is exactly how Alfred would have preferred it.
