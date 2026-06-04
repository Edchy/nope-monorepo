---
title: "Alfred, the Batcave, and the Tiny SSH Tunnel"
description: "How I access a private Hermes dashboard on a VPS without putting it on the public internet: SSH keys, tunnels, ports, root, and the small command that hides the plumbing."
date: 2026-06-04
tags: [ai, tools, nerdstuff]
draft: false
color: "6"
---

I recently wanted a simpler way to open my Hermes dashboard.

Hermes lives on my VPS. My browser lives on my Mac. The dashboard lives on the VPS, but I did not want to expose it to the public internet, because the dashboard can manage Hermes settings, sessions, and potentially secrets.

That would be like leaving the Batcave door open with a sign saying: *please be normal*.

So instead of opening the dashboard to the world, we made a private hallway.

That hallway is SSH.

---

## The cast

There are two computers in this story:

```txt
My Mac          → where my browser is
The VPS         → where Hermes actually runs
```

The VPS is the manor.

Hermes is Alfred.

The dashboard is the control room.

SSH is the private tunnel into the house.

The gateway is the telephone switchboard.

This helped me understand the whole setup. Before that, it was just a pile of words: VPS, SSH, tunnel, localhost, port, gateway, root, service. Very powerful words. Very poor bedside manner.

---

## The dashboard problem

The Hermes dashboard is a small website running on the VPS.

In my setup it listens on:

```txt
127.0.0.1:9119
```

That means:

```txt
only this machine, port 9119
```

But "this machine" depends on where you are standing.

On my Mac:

```txt
127.0.0.1 = my Mac
```

On the VPS:

```txt
127.0.0.1 = the VPS
```

So if the dashboard is running on the VPS at `127.0.0.1:9119`, my Mac cannot normally see it. The dashboard is inside the manor. No outside door.

Which is good.

The point is not to put the dashboard on:

```txt
http://95.217.233.210:9119
```

That would make it public. Convenient, in the same way that removing your front door is convenient for guests.

---

## The SSH tunnel

Instead, we use SSH to create a private tunnel.

The full command looks like this:

```bash
ssh -p 8022 -fN -L 9119:127.0.0.1:9119 root@95.217.233.210
```

This looks like someone dropped a cutlery drawer into the terminal, so here is the simple version:

```txt
When my Mac opens localhost:9119,
quietly send that traffic through SSH,
and deliver it to localhost:9119 on the VPS.
```

So my browser opens:

```txt
http://127.0.0.1:9119
```

It feels local.

But the request actually travels like this:

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

The browser thinks it is talking to my Mac. The Mac is really whispering through a private hallway to the VPS.

Very Alfred. Present, useful, and not standing in the doorway.

---

## What the flags mean

Here is the command again:

```bash
ssh -p 8022 -fN -L 9119:127.0.0.1:9119 root@95.217.233.210
```

### `ssh`

Connect securely to another computer.

### `-p 8022`

Use port `8022` for SSH.

SSH normally uses port `22`, but my VPS listens on `8022`. We changed that during hardening. It is not magic security, but it avoids some of the usual noise that hits port 22 all day.

### `root@95.217.233.210`

Log into the VPS at `95.217.233.210` as the Linux user `root`.

More on `root` in a moment.

### `-L 9119:127.0.0.1:9119`

This is the tunnel.

The shape is:

```txt
-L MAC_PORT:VPS_ADDRESS:VPS_PORT
```

So this:

```txt
-L 9119:127.0.0.1:9119
```

means:

```txt
Mac port 9119 → VPS localhost port 9119
```

Or even simpler:

```txt
When I visit localhost:9119 on my Mac,
show me localhost:9119 on the VPS.
```

The middle `127.0.0.1` is from the VPS's point of view. That is the part that made my brain briefly leave the room.

### `-N`

Do not open a normal shell.

Usually SSH gives you a terminal prompt on the VPS. But for the dashboard, I do not want to type commands on the server. I only want the tunnel.

So `-N` means:

```txt
No remote command. Just keep the tunnel open.
```

### `-f`

Run in the background.

Without `-f`, the SSH tunnel stays visibly running in the terminal. With `-f`, it disappears into the background and lets me keep using the terminal.

So `-fN` together means:

```txt
Open the tunnel quietly in the background. Do not give me a VPS shell.
```

---

## SSH keys: the lock and the hand

The tunnel works because my Mac is allowed to SSH into the VPS.

That permission comes from an SSH key pair.

There are two keys:

```txt
Private key  → stays on my Mac
Public key   → copied onto the VPS
```

The public key is safe to share. It is like installing a lock on the server.

The private key must stay private. It is the only thing that can prove I am allowed through that lock.

On my Mac, the private key usually lives somewhere like:

```txt
~/.ssh/id_ed25519
```

The matching public key is usually:

```txt
~/.ssh/id_ed25519.pub
```

On the VPS, the public key is stored in:

```txt
/root/.ssh/authorized_keys
```

That file means:

```txt
These public keys are allowed to log in as root.
```

When I SSH in, my private key is not sent to the VPS. That would be spectacularly missing the point.

Instead, the VPS sends a little challenge. My Mac signs that challenge with the private key. The VPS checks the signature using the public key in `authorized_keys`.

If the signature matches, the VPS knows:

```txt
This Mac has the private key that belongs to one of my approved public keys.
```

Then it lets me in.

So the private key never leaves my computer. My Mac proves it has the key without handing the key over.

A public key is like telling the doorman what my signature looks like.

A private key is my hand.

Best not to mail that to the doorman.

---

## Why `root`?

`root` is the administrator account on Linux.

It can do everything:

- install software
- edit system files
- restart services
- change firewall rules
- delete important things with terrifying confidence

Using `root` is convenient because this VPS was set up with Hermes under:

```txt
/root/.hermes
```

So when I log in as root, I am working directly with the Hermes installation, its config, its services, and its files.

The downside is obvious: root is powerful. If I make a bad command, Linux may helpfully execute it. No questions. No concern. Just obedience.

The safer alternative would be a normal user, like:

```txt
edward
```

Then I would log in with:

```bash
ssh -p 8022 edward@95.217.233.210
```

And use `sudo` only when I need administrator powers:

```bash
sudo systemctl restart hermes-dashboard.service
```

That is the more polished setup:

```txt
root                    → walking around with the master key all day
normal user + sudo      → normal key, admin powers only when needed
```

For now, root is acceptable because the server is locked down:

- SSH uses keys
- password login is disabled
- SSH listens on port 8022
- the firewall only allows what is needed
- fail2ban blocks repeated bad login attempts

Not reckless. Just powerful. Like giving Alfred access to the armory. Sensible, provided Alfred remains Alfred.

---

## Making it one command

I did not want to type the full SSH tunnel every time.

So we added a small shell function to my Mac's:

```txt
~/.zshrc
```

`.zshrc` is the file my terminal reads when it starts. It is where you can teach your terminal little shortcuts.

The command is called:

```bash
hdash
```

It does three things:

1. Starts the Hermes dashboard service on the VPS
2. Opens the SSH tunnel from my Mac to the VPS
3. Opens the dashboard in my browser

So instead of remembering:

```bash
ssh -p 8022 -fN -L 9119:127.0.0.1:9119 root@95.217.233.210
open http://127.0.0.1:9119
```

I type:

```bash
hdash
```

A small mercy.

---

## Closing it again

There are two things involved:

```txt
Dashboard service on the VPS
SSH tunnel on my Mac
```

The dashboard service is the website running inside the VPS.

The SSH tunnel is my Mac's private hallway into it.

Closing the browser does not necessarily close the tunnel. The browser is just the guest. The hallway may still be open.

So we added another command:

```bash
hstop
```

That closes the SSH tunnel and stops the dashboard service on the VPS.

We also made `hdash` start a one-hour timer. If I forget to close it manually, the tunnel closes itself after an hour.

If I forget, it is not a disaster. The tunnel only exists on my Mac, and the dashboard is still not public. But it is untidy.

A sock left on the floor, not a burglary.

---

## What about the Hermes gateway?

The dashboard is not the same thing as the Hermes gateway.

This took me a minute.

The dashboard is the browser control room.

The gateway is the messaging bridge.

It lets Hermes talk through apps like:

- Telegram
- Discord
- Slack
- WhatsApp
- Signal
- Matrix
- email
- webhooks

If I message my Telegram bot, the path looks roughly like this:

```txt
Telegram
  ↓
Hermes gateway on the VPS
  ↓
Hermes agent
  ↓
Gateway again
  ↓
Telegram reply
```

The gateway is the telephone switchboard.

Telegram rings. The gateway answers and hands the message to Alfred. Alfred thinks, uses tools if needed, and hands the answer back to the gateway. The gateway sends the reply.

So in manor terms:

```txt
VPS        → the manor
Hermes     → Alfred
Dashboard  → the control room
SSH        → private tunnel into the manor
Gateway    → telephone switchboard
Telegram   → one of the phones
```

Different servant, different tray.

---

## Why not make it public?

Because the dashboard is powerful.

It can manage Hermes. It can see sessions. It can touch configuration. Depending on setup, it may expose sensitive things.

Putting it directly on the internet would be simpler, yes.

So is leaving your house keys under a mat labelled `HOUSE KEYS`.

The SSH tunnel gives me the good version:

```txt
Easy access from my Mac
without exposing the dashboard to everyone else
```

That is the whole point.

---

## The final mental model

This is now how I think about it:

```txt
Hermes lives on the VPS.
The dashboard is a local-only website inside the VPS.
My Mac cannot see it directly.
SSH creates a private tunnel.
My browser opens localhost:9119.
The tunnel forwards that to localhost:9119 on the VPS.
The dashboard appears.
```

And the commands become:

```bash
hdash   # open the dashboard
hstop   # close it when done
```

The machinery is still there. SSH keys, ports, services, tunnels, root, authorized keys, gateway processes. None of it disappeared.

But now it has a front door.

Or perhaps more accurately: a hidden passage behind a grandfather clock.

Which is exactly how Alfred would have preferred it.
