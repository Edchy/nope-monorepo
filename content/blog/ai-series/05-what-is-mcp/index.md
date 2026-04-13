---
title: "What is MCP"
description: "By default, an AI model knows a lot but can do nothing. It cannot check the weather, read your files, look something up, or call an API. It is a brain in a jar: smart, but disconnected from the world. MCP is how you give it access."
date: 2025-12-03
tags: [ai, mcp, technical]
draft: false
---

By default, an AI model knows a lot but can do nothing. It cannot check the weather, read your files, look something up, or call an API. It is a brain in a jar: smart, but disconnected from the world.

MCP is how you give it access.

---

## The problem it solves

Before MCP, if you wanted to connect an AI to an external tool — say, a calendar, a database, or a web API — you had to build a custom integration. Different apps built different integrations in different ways. Nothing was portable. If you built something for ChatGPT, it would not work with Claude. Everything had to be rebuilt from scratch.

MCP (Model Context Protocol) is an open standard that defines a single way for AI models to talk to external tools. Build a tool once, using the MCP format, and any AI client that supports MCP can use it.

Think of it like USB. Before USB, every device had its own connector. You needed a different cable for everything. USB standardized the interface. MCP does the same thing, but for AI and tools.

---

## How it works

An MCP server is a small program that wraps some functionality and describes it to the AI.

Say you want an AI to know what time it is. The AI itself has no clock. But you can build a small MCP server that:

1. Wraps a time function (or an API that returns the time)
2. Describes that function to the AI in a standard format: "I have a tool called `getTime`. It returns the current time. It takes no parameters."
3. Listens for the AI to call that function

When you ask the AI what time it is, it sees the available tools, decides to use `getTime`, sends a request to the MCP server, gets the result back, and incorporates it into its response.

The AI does not need to know how the time server works. It just needs to know the tool exists and what it does.

---

## A concrete example

Here is the simplest possible MCP server, in JavaScript:

```bash
mkdir mcp-time-server
cd mcp-time-server
npm init -y
npm install @modelcontextprotocol/sdk
```

```js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "time-server", version: "1.0.0" },
  {
    tools: {
      getTime: {
        description: "Returns the current date and time",
        parameters: {},
        execute: async () => {
          return { result: new Date().toISOString() };
        },
      },
    },
  }
);

const transport = new StdioServerTransport();
server.connect(transport);
```

That is the whole thing. A name, a description, a function. The SDK handles the communication protocol.

To connect this to an AI app (like ChatGPT Desktop), you add a config file that tells the app where to find your server:

```json
{
  "servers": {
    "time-server": {
      "command": "node",
      "args": ["/path/to/time-server/server.js"]
    }
  }
}
```

Now the AI can tell the time.

---

## MCP servers you should know about

**Context7** — Feeds the AI up-to-date documentation for any programming library. When you ask for help with a framework, it retrieves the current docs and puts them in context. This is useful because the AI's training data has a cutoff date.

**GitHub MCP** — Lets the AI interact with GitHub repositories: read issues, open pull requests, check code. Useful for AI-assisted development workflows.

These are small examples. The pattern scales. Any API, any database, any local tool can be wrapped in an MCP server and made available to any AI that supports the standard.

---

## The bigger picture

MCP is not magic. It is a protocol. A standard format for describing tools and passing results between an AI and the outside world.

But it is significant. Before it, AI was isolated. After it, AI can reach into the real world in a standardized, composable way. You build the bridge once. Every model can cross it.

That is useful.
