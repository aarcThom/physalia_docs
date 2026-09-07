---
title: Pipeline
---

# Pipeline

*The four components that make up a conversation with a model.*

Every Physalia definition is built around the same short loop: something to say, a
record of what has been said, and a call that asks the model for the next reply.
These four components are that loop. Start here — nothing else in the plugin makes
much sense until this part does.

The shape is always the same. A **System Prompt** sets the standing instructions. A
**Conversation Log** holds the running record. An **LLM Call** sends that record off
and streams a reply back. **Chat** is where you type.

!!! info "What is a harness?"

    A language model on its own is a function: text in, text out. It remembers nothing
    between calls and can't do anything except produce words. A **harness** is the
    scaffolding around it — the code that decides what the model is told, what it is
    allowed to do, what happens to its answer, and whether to call it again.

    Almost every AI product you have used is a harness around a model. Physalia's
    difference is that the harness is not hidden in someone else's source code; it is
    the Grasshopper components on your canvas, and you rewire it.

    Anthropic's [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
    is the best short introduction to how these loops are put together and when a
    simple one beats a clever one.

!!! info "Why the whole conversation is sent every time"

    The model has no memory. Each call is answered by a model that has never seen your
    previous messages — the only reason it appears to remember is that the harness
    re-sends the entire conversation, every turn, as part of the next request.

    That is what the Conversation Log is for, and it is also why conversations get
    expensive and eventually hit a ceiling: everything the model is allowed to know has
    to fit in its **context window**, measured in tokens. See
    [Context windows](https://docs.claude.com/en/docs/build-with-claude/context-windows)
    for how that limit behaves, and [Tokens & Compaction](tokens-compaction.md) for what
    Physalia does when a conversation outgrows it.

## Components

### Chat

![Chat icon](../assets/icons/Chat.png){ .phy-icon align=left }

Your end of the conversation. Double-click the harness holding this node to open the chat window; sending a message from there starts a run.

<div class="phy-clear"></div>

### System Prompt

![System Prompt icon](../assets/icons/SystemPrompt.png){ .phy-icon align=left }

Writes the standing instructions the model is given on every turn: a preamble, the JSON shape its answers must take, and any extra wording you add. Wire the result into a Conversation Log.

<div class="phy-clear"></div>

### Conversation Log

![Conversation Log icon](../assets/icons/ConversationLog.png){ .phy-icon align=left }

Keeps the conversation. Everything the model is told arrives here — instructions, what you typed, what it said, what came back from tools and checks — and every time your side gains a turn the whole thing goes out for another reply.

<div class="phy-clear"></div>

### LLM Call

![LLM Call icon](../assets/icons/LlmCall.png){ .phy-icon align=left }

Asks the model for one reply and streams it into the chat window as it arrives. One reply per arriving signal — nothing repeats or retries on its own.

<div class="phy-clear"></div>
