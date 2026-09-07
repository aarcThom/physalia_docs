---
title: Components
---

# Components

*Every component in Physalia, grouped the way the Grasshopper tab groups them.*

Physalia ships **106 components** across 13 sections. They are not meant to be
learned in order — most definitions use a dozen of them. If you are new here, read
[Pipeline](pipeline.md) first: those four components are the loop everything else
attaches to.

!!! info "A note on how to read this reference"

    Each section opens with what that group of components is *for*, followed by short
    explanations of the underlying idea where one exists — what a token is, what tool
    use actually does, why conversations get re-sent. Those are marked out in boxes like
    this one and link to primary sources if you want the full account.

    You do not need to read them to use the plugin. They are there because a harness is
    much easier to wire when you know what the pieces are doing.

## Sections

### [Pipeline](pipeline.md)

The four components that make up a conversation with a model. — *4 components*

[Chat](pipeline.md#chat), [System Prompt](pipeline.md#system-prompt), [Conversation Log](pipeline.md#conversation-log), [LLM Call](pipeline.md#llm-call)

### [Models](models.md)

Which model answers, where it runs, and how it is tuned. — *11 components*

[Model API](models.md#model-api), [Anthropic Model](models.md#anthropic-model), [OpenAI Compatible Model](models.md#openai-compatible-model), [Gemini Model](models.md#gemini-model), [Claude Code Model](models.md#claude-code-model), [Codex Model](models.md#codex-model), [Model Information](models.md#model-information), [LlamaCpp Model Info](models.md#llamacpp-model-info), [Anthropic Tweaker](models.md#anthropic-tweaker), [OpenAI Compatible Tweaker](models.md#openai-compatible-tweaker), [Gemini Tweaker](models.md#gemini-tweaker)

### [Signals](signals.md)

The things that travel down the wires, and how to take them apart. — *8 components*

[Construct Signal](signals.md#construct-signal), [Deconstruct Signal](signals.md#deconstruct-signal), [Message Compositor](signals.md#message-compositor), [Message Decompositor](signals.md#message-decompositor), [Conversation Compositor](signals.md#conversation-compositor), [Instructions Compositor](signals.md#instructions-compositor), [Instructions Decompositor](signals.md#instructions-decompositor), [Construct Tool Call](signals.md#construct-tool-call)

### [Grounding](grounding.md)

Telling the model what is already true, so it does not invent it. — *11 components*

[Canvas State](grounding.md#canvas-state), [Physalia Group Components](grounding.md#physalia-group-components), [Component Catalog](grounding.md#component-catalog), [Rhino Document](grounding.md#rhino-document), [Document Units Grounding](grounding.md#document-units-grounding), [Project Folder](grounding.md#project-folder), [Set Script I/O](grounding.md#set-script-io), [Tools Present](grounding.md#tools-present), [Image Sources](grounding.md#image-sources), [Cluster Grounding](grounding.md#cluster-grounding), [Python Grounding](grounding.md#python-grounding)

### [LLM Tools](llm-tools.md)

The things the model is allowed to do, beyond writing text. — *19 components*

[Router](llm-tools.md#router), [Component Search](llm-tools.md#component-search), [RhinoCommon Search](llm-tools.md#rhinocommon-search), [Drive Rhino](llm-tools.md#drive-rhino), [Create/Ref. Rhino Geometry](llm-tools.md#createref-rhino-geometry), [Take Snapshot](llm-tools.md#take-snapshot), [Move In Space](llm-tools.md#move-in-space), [Web Search](llm-tools.md#web-search), [Read URL](llm-tools.md#read-url), [Download File](llm-tools.md#download-file), [Read File](llm-tools.md#read-file), [Read PDF](llm-tools.md#read-pdf), [API Call](llm-tools.md#api-call), [MCP Server](llm-tools.md#mcp-server), [Memory](llm-tools.md#memory), [Ask Human](llm-tools.md#ask-human), [Declare](llm-tools.md#declare), [Pipeline State](llm-tools.md#pipeline-state), [Delegate](llm-tools.md#delegate)

### [Guardrails](guardrails.md)

Checking the model's work before it reaches your file. — *10 components*

[Detect JSON](guardrails.md#detect-json), [Schema Validator](guardrails.md#schema-validator), [GH Definition Validator](guardrails.md#gh-definition-validator), [Required Input Check](guardrails.md#required-input-check), [Component Resolver](guardrails.md#component-resolver), [Fidelity Check](guardrails.md#fidelity-check), [Runtime Health Check](guardrails.md#runtime-health-check), [Geometry Report](guardrails.md#geometry-report), [Geometry Observation](guardrails.md#geometry-observation), [Stall Guard](guardrails.md#stall-guard)

### [Tokens & Compaction](tokens-compaction.md)

Keeping a long conversation inside the model's limit. — *8 components*

[Token Estimator](tokens-compaction.md#token-estimator), [Tokenization Techniques](tokens-compaction.md#tokenization-techniques), [Token Threshold](tokens-compaction.md#token-threshold), [Sliding Window](tokens-compaction.md#sliding-window), [Token Window](tokens-compaction.md#token-window), [Anchored Window](tokens-compaction.md#anchored-window), [Content Pruner](tokens-compaction.md#content-pruner), [Summarizer](tokens-compaction.md#summarizer)

### [Control Flow](control-flow.md)

Deciding what happens next, how often, and when to stop. — *11 components*

[Budget Guard](control-flow.md#budget-guard), [Signal Gate](control-flow.md#signal-gate), [Hold Signal](control-flow.md#hold-signal), [Signal Switch](control-flow.md#signal-switch), [Signal Limiter](control-flow.md#signal-limiter), [Signal Throttle](control-flow.md#signal-throttle), [Merge Signal](control-flow.md#merge-signal), [For Each](control-flow.md#for-each), [Feedback](control-flow.md#feedback), [Feedback Collector](control-flow.md#feedback-collector), [Build Plan](control-flow.md#build-plan)

### [Triggers](triggers.md)

Starting a round without being asked. — *5 components*

[Timer](triggers.md#timer), [Folder Watcher](triggers.md#folder-watcher), [Rhino Changed](triggers.md#rhino-changed), [Data Changed](triggers.md#data-changed), [Watch Modelling](triggers.md#watch-modelling)

### [Human Tools](human-tools.md)

What you can do from the chat window. — *8 components*

[Add Image](human-tools.md#add-image), [Read PDF](human-tools.md#read-pdf), [View Snapshot](human-tools.md#view-snapshot), [Geometry Snapshot](human-tools.md#geometry-snapshot), [Image Mark Up](human-tools.md#image-mark-up), [Token Count](human-tools.md#token-count), [Signal Trace](human-tools.md#signal-trace), [Export Conversation](human-tools.md#export-conversation)

### [Transmitters](transmitters.md)

Where the pipeline stops describing and starts building. — *3 components*

[Component Transmitter](transmitters.md#component-transmitter), [Py Transmitter](transmitters.md#py-transmitter), [C# Transmitter](transmitters.md#c-transmitter)

### [I/O](io.md)

Getting data in and out of a harness, and calling one from another. — *4 components*

[Harness In](io.md#harness-in), [Harness Out](io.md#harness-out), [Task In](io.md#task-in), [Task Out](io.md#task-out)

### [Extra](extra.md)

Utilities and diagnostics. — *4 components*

[Serializer](extra.md#serializer), [Deserializer](extra.md#deserializer), [Picker](extra.md#picker), [Zoom Guid](extra.md#zoom-guid)
