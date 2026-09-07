---
title: Signals
---

# Signals

*The things that travel down the wires, and how to take them apart.*

Physalia does not pass text along its wires. It passes **signals** — small bundles
carrying a conversation, a system prompt, images, a tool request, or whatever else a
step needs to hand to the next one. A signal is also what makes a step happen:
components fire when a signal arrives, not when Grasshopper recomputes.

Most of the time you never open one. These components are for the times you need to
build a signal by hand, or look inside one to work out why a run did something
surprising.

!!! info "The three voices in a conversation"

    Conversations sent to a model are a list of turns, and each turn is labelled with
    who is speaking:

    - **system** — the standing instructions, which apply to the whole conversation
    - **user** — you, and also anything the harness reports back, such as tool results
    - **assistant** — the model

    That labelling is not cosmetic. Models are trained to weight these differently, and
    putting text under the wrong role is a common cause of a model ignoring an
    instruction. The [Messages API](https://docs.claude.com/en/api/messages) shows the
    structure directly.

    **Message Compositor** builds one such turn; **Conversation Compositor** builds a
    list of them.

!!! tip "Deconstruct Signal is your debugger"

    Every other component consumes a signal when it reads one. **Deconstruct Signal**
    does not, so you can hang one anywhere on the canvas to watch what is passing
    without altering the run. When a pipeline misbehaves, this is the first thing to
    reach for.

## Components

### Construct Signal

![Construct Signal icon](../assets/icons/ConstructSignal.png){ .phy-icon align=left }

Makes a signal by hand, one per button press. This is the one place an ordinary Grasshopper button is allowed to drive a Physalia pipeline.

<div class="phy-clear"></div>

### Deconstruct Signal

![Deconstruct Signal icon](../assets/icons/DeconstructSignal.png){ .phy-icon align=left }

Opens a signal up so you can see what is inside it. Looking is free: unlike every other component, this one never uses the signal up, so you can tap it anywhere to see what is going on.

<div class="phy-clear"></div>

### Message Compositor

![Message Compositor icon](../assets/icons/MessageCompositor.png){ .phy-icon align=left }

Makes one conversation turn out of a speaker and some text.

<div class="phy-clear"></div>

### Message Decompositor

![Message Decompositor icon](../assets/icons/MessageDecompositor.png){ .phy-icon align=left }

Splits one conversation turn back into who spoke and what they said.

<div class="phy-clear"></div>

### Conversation Compositor

![Conversation Compositor icon](../assets/icons/ConversationCompositor.png){ .phy-icon align=left }

Builds a conversation out of separate turns, for assembling context by hand instead of letting a Conversation Log gather it.

<div class="phy-clear"></div>

### Instructions Compositor

![Instructions Compositor icon](../assets/icons/InstructionsCompositor.png){ .phy-icon align=left }

Pairs a conversation with a system prompt to make the single bundle an LLM Call reads.

<div class="phy-clear"></div>

### Instructions Decompositor

![Instructions Decompositor icon](../assets/icons/InstructionsDecompositor.png){ .phy-icon align=left }

Splits a bundle of instructions back into its system prompt and its turns, so you can see what a signal is about to send.

<div class="phy-clear"></div>

### Construct Tool Call

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Calls a tool node yourself, one press at a time, without going through the model. The tool does its work and fills its own outputs; nothing is said to the model about it.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>
