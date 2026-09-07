---
icon: lucide/rocket
title: Get started
---

# Physalia

*Build Grasshopper definitions by talking to an LLM — and customise how the LLM
works, not just what it writes.*

Physalia is a Rhino 8 plugin for composing agentic loops where the tool surface is
the Grasshopper document itself. Most AI plugins give you a chat box and a black box
behind it. Physalia gives you the loop as Grasshopper components, so you can see
each step, reorder it, gate it, or swap the model driving it.

!!! warning "These docs are under construction"

    Physalia has not been released yet, and this site is being written alongside it.
    The [component reference](components/index.md) is complete and generated from the
    source. Everything on *this* page is a placeholder and will change — installation
    in particular is not yet written, because the packaging is not yet decided.

---

## What it does

<div class="grid cards" markdown>

- **Generation**

    Writes Python and C# script components with the right inputs and outputs from a
    plain description, and places node-based definitions on your canvas. Detects its
    own runtime errors and fixes them. Stages larger builds incrementally rather than
    emitting everything at once.

- **Context and tools**

    Reads your canvas, your Rhino document and your units, so it edits what is there
    instead of rebuilding from nothing. Connects to [MCP](https://modelcontextprotocol.io/)
    servers, reads PDFs, searches the web, and can look at what it built.

- **Models**

    Anthropic, OpenAI, Google Gemini, or anything speaking the OpenAI protocol —
    OpenRouter, DeepSeek, Groq and others. Local models via Ollama with no key and no
    internet. The Claude Code and Codex CLIs, if you already have them.

- **Control**

    Budgets, guardrails, validation loops and compaction are components on the canvas,
    not settings in someone else's product. Rewire the loop and the behaviour changes.

</div>

---

## Requirements

- **Rhino 8**, on **Windows**
- One of:
    - an API key for at least one provider, **or**
    - [Ollama](https://ollama.com) installed locally, **or**
    - the Claude Code or Codex CLI installed and signed in

---

## Installation

!!! info "Not written yet"

    Installation instructions are still to come — they depend on whether Physalia
    ships through [Yak](https://developer.rhino3d.com/guides/yak/) (a one-line
    install) or as a manual `.gha` drop (which needs the Windows unblock step
    spelled out).

    Until then, build from source: [github.com/aarcThom/Physalia](https://github.com/aarcThom/Physalia)

---

## Configuration

API keys live in `Files/API_KEY_CONFIG.YAML`. Copy the example and fill in the
providers you intend to use:

```console
$ cp Files/API_KEY_CONFIG.YAML.example Files/API_KEY_CONFIG.YAML
```

MCP servers are configured the same way, via `Files/MCP_SERVERS.YAML`:

```console
$ cp Files/MCP_SERVERS.YAML.example Files/MCP_SERVERS.YAML
```

!!! danger "Neither file is tracked by git"

    Do not commit your keys. Keys set through the chat window never appear on the
    canvas and are never written into your `.gh` file.

---

## Your first pipeline

1. **Open the chat window.** The Physalia critter sits on the Grasshopper canvas as
   a widget — click it. Drag it wherever you like; it stays put across restarts.

2. **Place a harness.** The window opens on **Home**, which offers *Place predefined
   harness* and *Place empty harness*. Take a predefined one to start — it arrives
   wired and working.

    A **harness** is a single proxy node on your canvas holding a pipeline inside it.
    A document can hold as many as you like, one per line of work.

3. **Say something.** Type into the prompt box and send. That starts a run: the
   conversation goes to the model, the reply comes back streaming, and anything the
   model asked to do happens through the components inside the harness.

4. **Look inside.** Double-click the harness node to open it. This is the part that
   matters — everything that just happened is components and wires, and all of it is
   yours to change.

!!! tip "Start by changing one thing"

    The fastest way to understand a harness is to break it deliberately. Pull the
    [Runtime Health Check](components/guardrails.md#runtime-health-check) out of the
    loop and watch errors stop coming back. Swap the
    [Model](components/models.md) component for a local one. Add a
    [Web Search](components/llm-tools.md#web-search) tool and watch it appear in what
    the model is offered.

---

## How it fits together

Every pipeline is the same short loop, and the rest is what you hang off it:

``` mermaid
graph LR
  SP[System Prompt] --> CL[Conversation Log]
  GR[Grounding] --> CL
  CL --> LC[LLM Call]
  LC --> GD[Guardrails]
  GD -->|passes| TX[Transmitters]
  GD -->|fails| CL
  LC --> RT[Router]
  RT --> TL[LLM Tools]
  TL --> CL
  TX --> CL
```

A **System Prompt** sets the standing instructions. **Grounding** tells the model
what is already true about your file. The **Conversation Log** keeps the record and
sends it off. An **LLM Call** gets one reply. **Guardrails** check it — and a failed
check goes back into the conversation rather than stopping the run. The **Router**
runs whatever tools the model asked for. **Transmitters** put the result on your
canvas.

[Read the component reference :material-arrow-right:](components/index.md){ .md-button .md-button--primary }

---

## Licence and issues

Physalia is a free, auditable alternative to paid LLM plugins for Grasshopper. It is
licensed [AGPL-3.0](https://github.com/aarcThom/Physalia/blob/main/LICENSE), which
means it stays open — any fork that ships must stay open too.

Bug reports and feature requests are welcome via
[GitHub Issues](https://github.com/aarcThom/Physalia/issues).
