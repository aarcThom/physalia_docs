---
title: Tokens & Compaction
---

# Tokens & Compaction

*Keeping a long conversation inside the model's limit.*

Conversations only grow. Every reply, every tool result and every screenshot is
added to the record that gets re-sent next turn, so a long session eventually runs
into the model's context limit — and gets slower and more expensive on the way
there.

**Compaction** is the fix: shorten the conversation without losing what matters.
Physalia offers four ways to do it, from the blunt to the careful, plus the
components that measure when it is needed.

The usual arrangement is a **Token Threshold** watching the conversation, sending it
straight to the model while it fits and through a compactor once it does not.

!!! info "What a token actually is"

    Models do not read characters or words. Text is first broken into **tokens** —
    common chunks of characters, where a frequent word may be one token and an unusual
    one several. English runs at roughly ¾ of a word per token; code and JSON are less
    efficient, and a screenshot can be worth well over a thousand.

    Tokens are the unit of everything that matters: the context limit is in tokens, and
    so is the bill. Different model families tokenize differently, which is why
    **Tokenization Techniques** lets you choose between a fast estimate and an exact
    count.

    OpenAI's [tiktoken](https://github.com/openai/tiktoken) is the reference
    implementation, and its README shows how the splitting works.

!!! info "Choosing a compactor"

    The four compactors trade fidelity against cost:

    - **Sliding Window** — keep the last *n* turns. Cheapest, and forgets the brief.
    - **Token Window** — keep as many recent turns as fit a token budget. The honest
      version of the same idea, since it measures rather than counts.
    - **Anchored Window** — keep both ends, drop the middle. The original instructions
      survive, which is usually what you want.
    - **Content Pruner** — keep every turn but strip the bulk out of them: images,
      finished tool exchanges, feedback already acted on.
    - **Summarizer** — have a model read the old part and write it up. The only one that
      costs a call, and the only one that can keep what actually mattered.

    These combine. Pruning images out first and then windowing is often better than
    either alone.

## Components

### Token Estimator

![Token Estimator icon](../assets/icons/TokenEstimator.png){ .phy-icon align=left }

Counts the tokens in a conversation, a set of instructions, or a piece of text — so you can see how close a conversation is running to the model's limit.

<div class="phy-clear"></div>

### Tokenization Techniques

![Tokenization Techniques icon](../assets/icons/TokenizationTechniques.png){ .phy-icon align=left }

Chooses how tokens get counted: a quick local estimate, a real tiktoken table, or asking the provider for an exact figure. Everything that measures a conversation takes its method from here.

<div class="phy-clear"></div>

### Token Threshold

![Token Threshold icon](../assets/icons/TokenThreshold.png){ .phy-icon align=left }

Watches how large the conversation has grown and forks the path: while it still fits, it goes straight to the model; once it is too big, it goes through a compactor first.

<div class="phy-clear"></div>

### Sliding Window

![Sliding Window icon](../assets/icons/SlidingWindow.png){ .phy-icon align=left }

Shortens the conversation to its most recent turns and drops the rest. The bluntest trim there is, and the cheapest — nothing is sent anywhere to do it.

<div class="phy-clear"></div>

### Token Window

![Token Window icon](../assets/icons/TokenWindow.png){ .phy-icon align=left }

Shortens the conversation to as many recent turns as will fit a token budget. A Sliding Window counts turns; this one measures them, which is the honest way to hit a context limit.

<div class="phy-clear"></div>

### Anchored Window

![Anchored Window icon](../assets/icons/AnchoredWindow.png){ .phy-icon align=left }

Shortens the conversation by keeping both ends and dropping the middle — the original brief stays, the work in hand stays, the sprawl between them goes. Nothing is sent anywhere to do it.

<div class="phy-clear"></div>

### Content Pruner

![Content Pruner icon](../assets/icons/ContentPruner.png){ .phy-icon align=left }

Shortens the conversation by throwing out the bulky parts rather than whole turns: pictures, finished tool exchanges, feedback already acted on, runaway text. Every turn survives; some just get lighter.

<div class="phy-clear"></div>

### Summarizer

![Summarizer icon](../assets/icons/Summarizer.png){ .phy-icon align=left }

Shortens the conversation by having a model read the older part and write it up as a single turn, leaving the recent turns word for word. The only compactor that costs a call, and the only one that can keep what actually mattered.

<div class="phy-clear"></div>
