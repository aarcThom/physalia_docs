---
title: Extra
---

# Extra

*Utilities and diagnostics.*

Odds and ends. The two serialization components are genuinely useful for
understanding the plugin: `.ghjson` is the format Physalia uses to describe a
definition to a model, so writing a definition you built by hand out to it shows you
exactly what the model sees and produces.

**Picker** you will meet without placing it — several components drop one beside
themselves automatically. **Zoom Guid** is a test tool.

!!! tip "Reading .ghjson is the fastest way to understand generation"

    Select a small definition you built yourself, run it through **Serializer**, and
    read the file. That is the vocabulary the model is being asked to write in, and the
    thing every [Guardrail](guardrails.md) is checking. **Deserializer** goes the other
    way and places one on the canvas.

## Components

### Serializer

![Serializer icon](../assets/icons/Serializer.png){ .phy-icon align=left }

Writes a selection of Grasshopper objects out to a .ghjson file — the same format Physalia uses to describe a definition to the model.

<div class="phy-clear"></div>

### Deserializer

![Deserializer icon](../assets/icons/Deserializer.png){ .phy-icon align=left }

Reads a .ghjson file and places the components it describes on the canvas, just to the right of this node.

<div class="phy-clear"></div>

### Picker

![Picker icon](../assets/icons/Picker.png){ .phy-icon align=left }

Offers whatever choices the component it feeds knows about, and passes back the one you pick. Several Physalia components place one of these beside themselves automatically.

<div class="phy-clear"></div>

### Zoom Guid

![Zoom Guid icon](../assets/icons/ZoomGuid.png){ .phy-icon align=left }

Zooms the Perspective viewport onto the geometry coming out of a linked component. Drag the bottom grip onto whichever component you want to look at. A test tool.

<div class="phy-clear"></div>
