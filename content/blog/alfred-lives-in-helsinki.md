---
title: "Alfred lives in Helsinki now"
description: "I put an AI on a server in Helsinki. It texts me good morning. Here is what it took to get there, and why it feels different from every other AI tool I have used."
date: 2026-05-24
tags: [ai, tools, agents]
draft: false
color: "6"
---

Last week I put an AI on a server in Helsinki. It texts me good morning.

That's the short version. The longer version involves a rented server, an SSH key I forgot I had, and naming my AI assistant after Batman's butler. But *the short version* is what changed how I think about this stuff.

Most AI you use is a tool. You open it, use it, close it. It has no memory of you the next time. Every conversation starts from zero. That's fine for answering a question. *It gets annoying when you're building something.*

**Hermes** is different. It runs on a server, *always*. It remembers things across sessions. When you come back the next day it knows where you left off. You can set it up to do things while you sleep. That's not a chatbot. That's closer to **having someone on staff**.

---

## Getting the server

I rent a **VPS** from Hetzner, a German company with servers in Helsinki and Nuremberg. About €10 a month, billed by the hour, no commitment. It's a small computer in a data center that runs whether my laptop is open or not.

VPS stands for *Virtual Private Server*. Think of it as renting a slice of a big machine in a warehouse. It has its own memory, storage, and an IP address. You connect to it over **SSH**, which is a secure terminal session from your computer into theirs. You type a command on your Mac, it executes in Helsinki.

Setting this up took longer than it should have because I kept second-guessing the plan options. The short answer is *the cheapest one was fine*. Hermes doesn't do heavy computation on my server. The AI model runs on OpenAI's servers. My VPS just keeps the whole thing running and routes messages around. *An expensive process manager.*

---

## Connecting a brain

During setup, Hermes asks which AI model to use. I picked OpenAI because I already pay for ChatGPT Plus. Instead of generating a separate API key, Hermes did a device auth flow. It gave me a URL and a code. I went to the URL, entered the code, confirmed in my ChatGPT security settings that device login was allowed, and it connected. No new account, no separate billing.

Smoother than expected.

---

## Making it Alfred

The `SOUL.md` is a file that defines the agent's personality. Hermes reads it at the start of every session and shapes how it responds. You can write anything in there.

I told mine to be *Alfred Pennyworth*. Loyal. Dry. Precise. Never ruffled. Delivers uncomfortable truths with tact. Calls me "sir" occasionally.

It works better than I thought it would. There's a real difference between an assistant that says *"Sure, here's that information!"* and one that says *"I've pulled the relevant data. You may find the third item sobering."* Same information. **Very different texture.**

---

## The gateway

This is the piece that made it feel real. The **gateway** is a background process that listens for messages. When I message my Telegram bot, the message hits Telegram's servers, gets routed to my Hetzner VPS, gets picked up by the gateway, passed to Hermes, processed, and sent back to me. *All without opening a terminal.*

I set it up as a **system service**, which means Linux starts it automatically when the server boots. The server reboots, the gateway comes back up, Alfred is listening again. I don't have to do anything.

The first time I messaged the bot and got a response *while my laptop was closed*, something clicked. Not using my computer's resources. Not waiting for me to start it. **Just there.**

---

## Daily reminders

Hermes can run **cron jobs**. A cron job is a scheduled task. A line in a file that says "run this command at this time." Linux has had this since the 70s. Every day at 8am, Alfred sends me a summary of what's on for the day. I set it up by asking him in plain English. He wrote the schedule entry himself.

That part is hard to describe without sounding like I'm overselling it. *I asked my AI to schedule itself to remind me of things.* It just did.

---

Alfred doesn't know I'm writing about him. He doesn't care. He's in Helsinki, waiting for a message, ready to pull up whatever I need.

I'll be honest: I'm still figuring out what to actually use him for. But it feels exciting to have a persistent AI that I can build habits around. It's not a tool I open. **It's a presence that stays with me.** I'm curious to see how it changes the way I work, and what I ask of it, over time.
