---
title: Transmitters
---

# Transmitters

*Where the pipeline stops describing and starts building.*

Everything upstream produces a description. Transmitters make it real: they place
components on your canvas, wire them up, and write generated code into script
components.

There are three, one per kind of output — a whole definition, Python, or C#. All
three report back what happened, and that report is the important part. A
transmitter that writes a script and returns the interpreter's complaints has closed
the loop: the model can now see its own syntax error and fix it.

!!! info "Why the error message goes back to the model"

    A model writing code without seeing it run is guessing. A model that gets the
    compiler output back is doing something much closer to what you do — write, run,
    read the error, fix.

    That return path is what makes generated scripts converge instead of needing to be
    right first time. Pair a transmitter with **Set Script I/O** (in
    [Grounding](grounding.md)) and the model can correct its code freely while your
    existing wires stay connected, because the input and output names are held still.

## Components

### Component Transmitter

![Component Transmitter icon](../assets/icons/ComponentTransmitter.png){ .phy-icon align=left }

Builds what the model designed: components and wires placed on your canvas, or edits made to the ones already there. This is where the pipeline stops describing and starts changing your file.

<div class="phy-clear"></div>

### Py Transmitter

![Py Transmitter icon](../assets/icons/PyTransmitter.png){ .phy-icon align=left }

Writes the model's Python into a script component on your canvas and reports back whatever it complains about. Right-click and choose Link to Script Component to say which one, or drag the harness's \"py\" grip onto it.

<div class="phy-clear"></div>

### C# Transmitter

![C# Transmitter icon](../assets/icons/CsTransmitter.png){ .phy-icon align=left }

Writes the model's C# into a Rhino 8 script component on your canvas and reports back whatever it complains about. Right-click and choose Link to Script Component to say which one, or drag the harness's \"C#\" grip onto it.

<div class="phy-clear"></div>
