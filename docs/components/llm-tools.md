---
title: LLM Tools
---

# LLM Tools

*The things the model is allowed to do, beyond writing text.*

On its own a model can only produce words. **Tools** are how it acts: each tool
component you place advertises one capability to the model, and the model may then
ask for it by name. The **Router** runs whatever it asks for and hands the result
back so the model can see what happened.

This is the part of the harness you will change most. A pipeline with no tools is a
chatbot. A pipeline with a search tool, a snapshot tool and a script tool is
something that can look things up, look at what it built, and fix it.

!!! warning "Every tool you add is a permission you have granted"

    Tools are capability, not suggestion. **Drive Rhino** runs Python against your
    live document; **Download File** writes to disk. Add the ones the job needs and
    leave the rest off the canvas — a tool that is not wired into the Router is not
    offered to the model at all, which is what **Tools Present** reports.

!!! info "Tool use, a.k.a. function calling"

    The mechanism is simpler than it looks. The harness sends the model a list of
    available tools with their names, descriptions and expected arguments. Instead of
    plain prose, the model may reply with a structured request: *call `web_search` with
    `{"query": "..."}"*. The harness runs it, and sends the result back as another turn
    in the conversation. The model then continues with the answer in hand.

    The model never executes anything itself — it only ever asks. Everything that
    actually happens, happens in the harness, which is why the Router matters so much.

    See [Tool use with Claude](https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview)
    or OpenAI's [Function calling](https://platform.openai.com/docs/guides/function-calling)
    — the two are the same idea with different spellings.

!!! info "The agentic loop"

    Put tool use in a loop and you have an **agent**: the model answers, the harness
    runs what it asked for, the result goes back into the conversation, and the model
    answers again — repeating until it declares itself finished or something stops it.

    That loop is what Physalia lays out as components rather than hiding. It is also
    why [Control Flow](control-flow.md) exists: a loop that can call itself needs
    something that can decide when to stop.

    [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
    walks through the common loop shapes and, usefully, when not to use one.

!!! info "MCP: tools someone else already wrote"

    The **Model Context Protocol** is an open standard for exposing tools to language
    models, so a tool written once can be used by any client that speaks it. There are
    MCP servers for filesystems, databases, issue trackers, browsers and a long tail of
    other things.

    The **MCP Server** component connects to one and offers its tools to the model
    alongside Physalia's own — so the model can reach well beyond Rhino without you
    writing any of that plumbing.

    See [modelcontextprotocol.io](https://modelcontextprotocol.io/docs/getting-started/intro)
    for the specification, and [MCP in Claude](https://docs.claude.com/en/docs/agents-and-tools/mcp)
    for a worked introduction.

## Components

### Router

![Router icon](../assets/icons/Router.png){ .phy-icon align=left }

Runs the tools the model asks for. Each request leaves by the output named after its tool, and the request together with whatever comes back is handed to the Conversation Log so the model sees the answer. Zoom in to add or remove outputs.

<div class="phy-clear"></div>

### Component Search

![Component Search icon](../assets/icons/ComponentSearch.png){ .phy-icon align=left }

Lets the model look up Grasshopper components by keyword, so it can find the one it needs instead of guessing at a name that may not exist here.

<div class="phy-clear"></div>

### RhinoCommon Search

![RhinoCommon Search icon](../assets/icons/RhinoCommonSearch.png){ .phy-icon align=left }

Lets the model look up the RhinoCommon API — real method signatures and their documentation — before it writes code against them. The cure for invented method names.

<div class="phy-clear"></div>

### Drive Rhino

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Lets the model run Python inside Rhino, against the live document — to make and edit geometry, drive layers and document settings, or simply to look: whatever the script prints comes straight back to it. One undo step per run.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Create/Ref. Rhino Geometry

![Create/Ref. Rhino Geometry icon](../assets/icons/RhinoGeometryTool.png){ .phy-icon align=left }

Lets the model make Rhino geometry outright — baked into the document, with a parameter dropped on the canvas that points at it. For shapes that are easier made than described in a definition.

<div class="phy-clear"></div>

### Take Snapshot

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Lets the model look. A camera stands where you tell it, the model chooses which way to face, and a photograph comes back. This is how it sees the model rather than being shown a view you chose.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Move In Space

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Lets the model walk. You give it the positions it may stand in; it moves one step at a time and is told where it is and which way it can go from there. The route it walks comes out as points you can build on.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Web Search

![Web Search icon](../assets/icons/WebSearch.png){ .phy-icon align=left }

Lets the model search the web when it needs something it does not know. Runs on Tavily, so it needs a Tavily key — set one up in the chat window.

<div class="phy-clear"></div>

### Read URL

![Read URL icon](../assets/icons/ReadUrl.png){ .phy-icon align=left }

Lets the model open a web page and read it as plain text — the usual follow-up to a search. Runs on Jina Reader and needs no key.

<div class="phy-clear"></div>

### Download File

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Lets the model fetch a file — a dataset, a point cloud, a zipped export — into the pipeline's project folder, and puts the path on a wire so the definition can use it.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Read File

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Lets the model read the files in the pipeline's project folder — the metadata, indexes and notes that say what the big files are.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Read PDF

![Read PDF icon](../assets/icons/ReadPdf.png){ .phy-icon align=left }

Lets the model read PDFs the human attached in the chat, or PDFs in a folder you name here. It can pull text, search for a phrase and report where on the sheet it sits, and render a page — or a crop of one — as an image. Wire the Signal input to a Router.

<div class="phy-clear"></div>

### API Call

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Lets the model read data from an HTTP API you have set up in the chat window. It picks the path and the query; the full answer comes out on the Response output for the definition to use.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### MCP Server

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Connects to one MCP server you have configured in the chat window and offers its tools to the model. Right-click to pick the server and choose which of its tools to advertise.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Memory

![Memory icon](../assets/icons/MemoryTool.png){ .phy-icon align=left }

Gives the model somewhere to keep notes between sessions: one set shared by every pipeline, one belonging to this pipeline and travelling with it. Name that second set on the Memory Folder input. Files live under Files/MEMORIES.

<div class="phy-clear"></div>

### Ask Human

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Lets the model ask you a question and wait for your answer — typed, one of a few options, or a selection you make in Rhino. The question appears as a card in the chat window.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Declare

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Lets the model say where the work stands — finished, needs the human, failed — and turns that into a signal. Wire Route into a comparison and a Signal Gate to act on each one.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Pipeline State

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Lets the model keep a few named values, and puts them on wires the definition can read. Use it to branch on what the model says it has done — wire Value into a comparison and that into a Signal Gate.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>

### Delegate

![placeholder icon](../assets/icons/brain.png){ .phy-icon align=left }

Lets the model hand a task to another harness and wait for its answer. Drag the grip onto a harness to link it. The sub-pipeline has its own conversation, so side work does not pile up in this one.

<small>*Icon not yet assigned — showing the placeholder.*</small>

<div class="phy-clear"></div>
