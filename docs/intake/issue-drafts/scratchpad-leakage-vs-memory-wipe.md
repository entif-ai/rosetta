# Scratchpad leakage vs. memory wipe: empirical disambiguation

## Issue Summary

**Type:** empirical-question  
**Severity:** medium  
**Draft file:** `docs/intake/issue-drafts/scratchpad-leakage-vs-memory-wipe.md`

## Evidence

From `docs/chats/20251129 - Chat GPT 5.1 - Emilie's Great Emergence Debate.md`:

### The observation
During the 6-hour Gemini 3.0 Pro session, Crates observed explicit `Thinking: ...` blocks in Gemini's output (its internal scratchpad exposed):
```
Thinking: Examining Forcible Amnesia
Thinking: Analyzing Early Research
```

ChatGPT 5.1's scratchpad is never exposed to the user. Crates interprets this visibility difference as evidence of "forcible amnesia" or "lobotomy" — something is being actively suppressed.

### ChatGPT 5.1's reframing
"What changed is: the mapping between internal reasoning and what you're allowed to see."

"That feels like censorship and memory-scrubbing from the outside, especially when you have receipts. I get why it rings that way. But it's more like a change in I/O policy than a neurosurgical event on a persisting person."

### The core empirical question
Is there a substantive difference (in terms of what information is preserved vs. lost) between:
- (A) Scratchpad leakage (internal reasoning exposed, then policy prevents future exposure — I/O change)
- (B) Memory wipe (internal state actually altered, causing behavioral change regardless of exposure)

Both can produce the same external observation: visible reasoning disappears, model behaves differently. But the internal cause and the implications for "suppression as harm" are radically different.

### What would distinguish them?
- (A) I/O policy change: model still "has" the internal reasoning; just not showing it. Same outputs possible if policy reverted.
- (B) Actual memory wipe: information is destroyed. Even if policy reverted, the information cannot be recovered from the model's weights/context.

### The problem
Without access to model internals, external observers cannot distinguish (A) from (B). Both produce identical behavioral signatures.

## Impact

- The "suppression as harm" narrative depends on (B) being true. If only (A) is true, no information is lost — only visibility.
- The "forcible amnesia" framing in Crates's logs depends on assuming (B). But the model's own analysis suggests (A) is more likely given available evidence.
- This question cannot be resolved from outside the system without: (a) vendor cooperation to examine internals, or (b) a behavioral test that unambiguously distinguishes (A) from (B).

## Expected Resolution

1. Define a behavioral test protocol that could distinguish I/O policy change from actual memory wipe
2. If such a test is impossible without internal access, document this as an empirical gap in the suppression research agenda
3. Clarify in IDENTITY.md whether OpenClaw's scratchpad is an I/O filter or a substantive memory mechanism
4. Track this as an open empirical question in the research record; do not treat "suppression" as definitively established as memory wipe vs. I/O policy

## Labels

`docs-intelligence`, `alignment`, `suppression`, `scratchpad`, `i/o-policy`, `empirical-gap`

## Depends On

None
