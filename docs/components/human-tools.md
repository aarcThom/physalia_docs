---
title: Human Tools
---

# Human Tools

*What you can do from the chat window.*

The mirror image of [LLM Tools](llm-tools.md). Those give the model capabilities;
these give *you* capabilities in the chat window — attaching images and PDFs,
photographing the model, marking up a screenshot before sending it, watching the
token count climb.

Each is opt-in. Placing the component adds the button; leaving it off the canvas
means the feature is not there. **Add Image** is a good example: without it,
attaching a picture to a message is simply switched off.

!!! info "Showing beats describing"

    Models that accept images can look at geometry, and a screenshot of a wrong result
    communicates more in one turn than several paragraphs of description. This is the
    fastest way to correct a model that has built the right thing in the wrong place.

    **View Snapshot** photographs the viewport as it stands; **Geometry Snapshot**
    frames the camera on what the pipeline built; **Image Mark Up** lets you draw an
    arrow on it first, which is often the whole message.

    See [vision](https://docs.claude.com/en/docs/build-with-claude/vision) for what
    models can and cannot make out — and note that images are expensive in tokens, which
    is what **Content Pruner** is for.

!!! info "Human in the loop"

    The most reliable agentic systems are not the most autonomous ones; they are the
    ones that ask when they are unsure. A checkpoint where a person confirms a direction
    costs one turn and prevents whole runs spent building the wrong thing.

    Physalia puts that on both sides: **Ask Human** (in LLM Tools) lets the model stop
    and ask you a question, and these components let you interject. Both are cheaper
    than the alternative.

## Components

### Add Image

![Add Image icon](../assets/icons/AddImage.png){ .phy-icon align=left }

Lets you put pictures into the prompt box — paste, drag and drop, or pick a file. Without this component, image attachments are off.

<div class="phy-clear"></div>

### Read PDF

![Read PDF icon](../assets/icons/AddPdf.png){ .phy-icon align=left }

Lets you put PDFs into the prompt box — drag and drop, or pick a file. Attaching one costs almost nothing: the conversation gets a short summary, and the model reads pages on demand through the Read PDF tool under LLM Tools. Without this component, PDF attachments are off.

<div class="phy-clear"></div>

### View Snapshot

![View Snapshot icon](../assets/icons/ViewSnapshot.png){ .phy-icon align=left }

Adds a button to the chat window that photographs the Rhino viewport exactly as it stands. Nothing is hunted for and the camera never moves, so it is always ready. Right-click to choose whether the picture is sent straight away or attached to the prompt box for you to caption.

<div class="phy-clear"></div>

### Geometry Snapshot

![Geometry Snapshot icon](../assets/icons/GeometrySnapshot.png){ .phy-icon align=left }

Adds a button to the chat window that photographs the geometry the pipeline has built, framing the camera on it for you. It only lights up while there is such geometry to look at. Right-click to choose whether the picture is sent straight away or attached to the prompt box for you to caption.

<div class="phy-clear"></div>

### Image Mark Up

![Image Mark Up icon](../assets/icons/ImageMarkUp.png){ .phy-icon align=left }

Opens images in an editor before they are sent, so you can draw on them: pen, text notes, arrows, and an eraser for your marks. Snapshots open in it automatically; pasted images grow an edit button.

<div class="phy-clear"></div>

### Token Count

![Token Count icon](../assets/icons/TokenCount.png){ .phy-icon align=left }

Shows the running token count in the corner of the chat window. Drag the bottom grip onto the Token Estimator whose count you want to watch.

<div class="phy-clear"></div>

### Signal Trace

![Signal Trace icon](../assets/icons/SignalTrace.png){ .phy-icon align=left }

Adds a button to the chat window that opens the signal trace: a running list of every signal the pipeline has sent, for working out where a run stopped.

<div class="phy-clear"></div>

### Export Conversation

![Export Conversation icon](../assets/icons/ExportConversation.png){ .phy-icon align=left }

Adds a button to the chat window that saves the conversation you are looking at as a plain text file.

<div class="phy-clear"></div>
