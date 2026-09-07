---
title: I/O
---

# I/O

*Getting data in and out of a harness, and calling one from another.*

A harness is a container on the canvas, and these four components are its ports.
**Harness In** and **Harness Out** connect it to the rest of your Grasshopper
definition — place one and a matching grip appears on the harness node, which you
wire up like any other input or output.

**Task In** and **Task Out** are different: they make a harness *callable by another
harness*. Put a Task In inside one and it becomes something a Delegate tool can hand
work to.

!!! info "Sub-agents, and why they help"

    Delegation is not only tidiness. A sub-pipeline gets its own conversation, so the
    back-and-forth of a side task — the failed attempts, the tool output, the debris —
    never enters the parent's context. The parent asks a question and receives an
    answer.

    That keeps the main conversation short, which keeps it cheap and keeps the model's
    attention on the actual job. It is the orchestrator–workers pattern described in
    [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents),
    and it is the standard fix for a pipeline whose context fills up with detail nobody
    needs afterwards.

    Use **Delegate** (in [LLM Tools](llm-tools.md)) on the calling side, and these two
    on the receiving side.

## Components

### Harness In

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Brings data from your canvas into the harness. Putting one in grows an input on the left edge of the harness node; whatever you wire into it out there arrives here, branches and all. Rename this node's output to label that input.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Harness Out

![Harness Out icon](../assets/icons/HarnessOut.png){ .phy-icon align=left }

Sends data out of the harness and into something on your canvas — a component input, a floating parameter, a panel. Drag the matching grip on the harness node onto the input it should feed, exactly as you would connect an ordinary output. Rename this node's input to label that grip.

<div class="phy-clear"></div>

### Task In

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Where a task handed over by another pipeline's Delegate tool arrives. Putting one in a harness is what makes that harness callable. Wire its Signal into a Conversation Log's Prompt Signal input.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Task Out

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

The end of a callable harness: what reaches here is what the Delegate tool that called it gets back. Images the signal carries go back too.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>
