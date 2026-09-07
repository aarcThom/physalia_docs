---
title: Triggers
---

# Triggers

*Starting a round without being asked.*

Everything else in Physalia waits for you to send a message. Triggers do not: they
start a round when a folder changes, when the Rhino document is edited, when data on
the canvas moves, or simply on a clock.

This is what turns a pipeline you drive into one that runs on its own — a definition
that reacts to a file landing in a folder, or re-checks a model after every edit.

!!! warning "Read this before arming anything"

    An armed trigger means the pipeline can call a model with nobody watching. Three
    consequences worth internalising:

    1. **Spend is unbounded** unless you bound it. Fit a **Budget Guard**.
    2. **Feedback loops are easy to build by accident.** If the pipeline changes the
       thing the trigger watches, every round starts the next one — for ever. This is
       the failure mode to check for first.
    3. **Triggers are always disarmed when a file opens.** This is deliberate: nothing
       starts running because someone opened your definition.

    Arm them with right-click → Armed, and only once the guards are in place.

!!! info "Autonomy is a spectrum, not a switch"

    There is a real ladder here, and it is worth climbing deliberately: a model that
    only answers; one that can use tools; one that loops until it is finished; one that
    starts itself. Each rung adds capability and removes a place where you would have
    noticed a mistake.

    The practical advice in
    [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
    is to use the simplest rung that solves the problem — most tasks that look like they
    need autonomy do not.

## Components

### Timer

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Starts a round on a clock, for as long as it is armed. Right-click and tick Armed to switch it on — it is always off when a file opens, so nothing runs on a machine nobody is watching.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Folder Watcher

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Starts a round when files in a folder appear, change or go away. Right-click and tick Armed to switch it on — it is always off when a file opens. The paths come out on Changed Files so the definition can read what arrived.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Rhino Changed

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Starts a round when the Rhino document changes — geometry edited, the selection changed, layers added. Right-click and tick Armed to switch it on; it is always off when a file opens.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Data Changed

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Starts a round when the data wired into it changes. Right-click and tick Armed to switch it on. Take care what you wire in: if the pipeline itself affects this data, every round will start the next one.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Watch Modelling

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Records what you do in Rhino and hands the procedure to the model so it can repeat it. Right-click and tick Recording, model the thing once, then untick it — that is what sends it.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>
