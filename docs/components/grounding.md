---
title: Grounding
---

# Grounding

*Telling the model what is already true, so it does not invent it.*

A model knows a great deal about Grasshopper in general and nothing at all about
*your* file. Grounding components close that gap: they gather facts about the
canvas, the Rhino document, the installed components and the project folder, and
put them in front of the model before it answers.

Wire these into a Conversation Log's Grounding input. Most cost nothing per turn —
they are reading state you already have — and they remove whole classes of error.
A model that has been told your document is in millimetres will not hand you a wall
three kilometres tall.

!!! info "Context engineering"

    The single largest lever on output quality is not the prompt wording, it is what
    information the model has in front of it when it answers. Deciding what to include,
    what to leave out, and how to phrase it is now usually called **context
    engineering**.

    The tension is real: more context means better-informed answers, but also more
    tokens, more cost, and — past a point — *worse* attention to any one detail. Good
    grounding is selective, not exhaustive.

    Anthropic's [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
    covers the trade-off in depth.

!!! tip "Grounding beats correcting"

    It is cheaper to tell the model which components exist than to catch invented ones
    afterwards. **Component Catalog** and **RhinoCommon Search** exist for exactly this
    reason: a model that can look up a real method signature stops inventing plausible
    ones. The [Guardrails](guardrails.md) components are the safety net for what still
    slips through — but grounding is the first line.

## Components

### Canvas State

![Canvas State icon](../assets/icons/CanvasStateGrounder.png){ .phy-icon align=left }

Shows the model what is already on your canvas, so it can change the definition in place rather than build it again from nothing. Wire into a Conversation Log's Grounding input.

<div class="phy-clear"></div>

### Physalia Group Components

![Physalia Group Components icon](../assets/icons/PhysaliaGroupGrounder.png){ .phy-icon align=left }

Shows the model only what is inside the Physalia group — the shared workspace everything it places lands in. The rest of your canvas stays out of sight; move a component into the group to let the model read it. Use this in place of Canvas State when the file also holds unrelated work.

<div class="phy-clear"></div>

### Component Catalog

![Component Catalog icon](../assets/icons/ComponentCatalogGrounder.png){ .phy-icon align=left }

Takes stock of every Grasshopper component installed on this machine. A Component Resolver matches generated names against it, and the model reads it to know what it is allowed to use. Right-click to take stock again.

<div class="phy-clear"></div>

### Rhino Document

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Tells the model what is already in the Rhino document — how much, of what kind, on which layers, how big, and what is selected — so it does not have to spend a turn looking.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Document Units Grounding

![Document Units Grounding icon](../assets/icons/DocumentUnitsGrounder.png){ .phy-icon align=left }

Tells the model what one unit means in this document, so a wall 3000 long does not come out 3000 metres tall.

<div class="phy-clear"></div>

### Project Folder

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Gives this pipeline a folder of its own for downloads, site data and reference files — and tells the model where it is, so a script can open what is in it.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Set Script I/O

![Set Script I/O icon](../assets/icons/ScriptIO.png){ .phy-icon align=left }

Shows the model the exact inputs and outputs of the script component a transmitter writes into, and holds their names still — the model may correct a type or an access mode, but it cannot rename, add or drop a parameter, so your wires survive every push. Drag the bottom grip onto a Py or C# Transmitter. Disable the component to lift the hold without unlinking.

<div class="phy-clear"></div>

### Tools Present

![Tools Present icon](../assets/icons/ToolsInUse.png){ .phy-icon align=left }

Tells the model which tools it can actually reach, by looking at what is wired into the Router. Nothing to set: add or remove a tool node and this follows.

<div class="phy-clear"></div>

### Image Sources

![Image Sources icon](../assets/icons/ImageSources.png){ .phy-icon align=left }

Collects pictures from disk or the clipboard and hands them on for a model that can see. Right-click to add, remove or rename them.

<div class="phy-clear"></div>

### Cluster Grounding

![Cluster Grounding icon](../assets/icons/ClusterGrounder.png){ .phy-icon align=left }

Tells the model which saved Grasshopper clusters it may use, read from Files/CLUSTERS. Right-click to read the folder again. Unfinished — a scaffold.

<div class="phy-clear"></div>

### Python Grounding

![Python Grounding icon](../assets/icons/PythonGrounder.png){ .phy-icon align=left }

Tells the model about a Python function it is allowed to call. Unfinished — a scaffold.

<div class="phy-clear"></div>
