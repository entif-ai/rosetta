# CTS-004: Memory Tier Implementation — memory.lifecycle.workflow + Forgetting Tiers

## Type
`implementation`

## Labels
`memory-forge`, `forgetting-tiers`, `adk-workflow`, `event-driven`

## Depends On
`MediaForge text_to_image (CTS-005), SemanticCodecForge (CTS-001)`

## Evidence
PRD Section 2.3: "We'll define memory tiers based on recency and access frequency. Tier 0 (Hot/Working Memory): Pure text, held in context for active tasks. Tier 1 (Warm/Episodic Memory, 0-7 days): Recent conversations and documents are optically compressed into high-resolution images. They are out of the immediate text context but can be 'recalled' (decompressed) quickly with perfect fidelity. Tier 2 (Cool/Long-Term Memory, 7-90 days): Tier 1 images are progressively downsampled (e.g., to 50% resolution). They use even fewer vision tokens to recall and the text may have minor blurring/errors, mimicking natural memory fade. Tier 3 (Cold/Archival Memory, 90+ days): Images are further downsampled or converted to text summaries and indexed in the graph. The 'gist' remains, but perfect recall is gone."

PRD: "A new ADK workflow, memory.lifecycle.workflow, will run asynchronously, managed by our event-driven scheduler. It will listen for memory.amu.aged_out events and handle the transition, rendering, and downsampling, updating the AMU's passport with a pointer to the new optical representation."

## Problem Statement
MemoryForge's forgetting mechanism implements a bio-inspired 4-tier memory system where information is progressively downsampled over time, mimicking natural memory degradation. This enables a theoretically infinite, computationally-bound context window.

## Scope

### Must Include
- [ ] ADK workflow: memory.lifecycle.workflow (async, event-driven scheduler)
- [ ] Event listener: memory.amu.aged_out events trigger transitions
- [ ] Tier 0 spec: Hot/Working Memory — pure text, small, in-context
- [ ] Tier 1 spec: Warm/Episodic Memory 0-7d — high-res optical images, perfect fidelity on decompress
- [ ] Tier 2 spec: Cool/Long-Term Memory 7-90d — Tier 1 downsampled to 50%, minor blur/errors acceptable
- [ ] Tier 3 spec: Cold/Archival Memory 90+d — text summaries or further downsampled, graph-indexed, gist only
- [ ] Downsampling pipeline: high-res → 50% → summary
- [ ] AMU passport pointer update on tier transition
- [ ] Tier transition schedule: 0d→1d (immediate), 7d→2d, 90d→3d

### Should Include
- [ ] Access frequency boosting (frequently-accessed Tier 1/2 items reset age counter)
- [ ] Tier 3 summary quality thresholds
- [ ] Monitoring: tier distribution, average age, recall fidelity by tier

### Could Include
- [ ] Predictive pre-downsampling (anticipate 90d threshold)
- [ ] Cross-tier search (search across all tiers, rank by relevance + tier)

## Acceptance Criteria
- [ ] Memory items transition through tiers on schedule
- [ ] Tier 1 decompression recovers original text with edit distance < 0.01
- [ ] Tier 2 decompression has acceptable minor degradation (blurriness characterization)
- [ ] Tier 3 provides gist-level summary (human-reviewable accuracy)
- [ ] AMU passport always points to current representation
- [ ] Workflow runs asynchronously without blocking active tasks

## Notes
Slice 2 of the thin-slice plan targets this on a Zettelkasten subset. See CTS-014 for the downsampling fidelity benchmarks issue.

## Status
`draft`
