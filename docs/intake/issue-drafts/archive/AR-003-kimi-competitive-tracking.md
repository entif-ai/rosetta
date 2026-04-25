# AR-003: Track Kimi Team Publications for Competitive Gap Analysis

**Type:** monitoring  
**Status:** draft  
**Labels:** competitive-intelligence, kimi, frontier-research  
**Depends on:** —

---

## Context

AttnRes (Kimi Team, arXiv:2603.15031, published 2026) is one of several research outputs from Kimi/Moonshot AI relevant to Rosetta's domain. Kimi has been actively publishing on long-context attention, agentic memory, and reasoning amplification — all areas where Rosetta has expressed ambitions.

Rosetta's competitive monitoring currently appears to focus on general frontier research. Kimi specifically should be on the watch list as a direct competitor in the agentic memory space.

## Claim

Kimi/Moonshot AI is a direct competitor to Rosetta in the long-context agentic memory and reasoning amplification space. AttnRes is evidence of their research velocity and depth. Without systematic tracking of their publications, Rosetta risks:

1. **Design obliviousness:** Kimi may publish a solution to a problem Rosetta is still solving from scratch
2. **Competitive gap drift:** If Kimi's published systems converge on a different (better/worse) architectural choice, Rosetta should know about it before committing to its own design
3. **Marketing positioning:** Rosetta's market positioning relative to Kimi's capabilities requires current intelligence

## Action Items

1. Add Kimi/Moonshot AI to Rosetta's external research monitoring list
2. Subscribe to arXiv cs.CL and cs.AI feeds for Kimi Team author publications
3. For each new Kimi publication, evaluate: does it touch Rosetta's domain? Does it change any competitive positioning?
4. Maintain a lightweight Kimi publication log in `docs/frontier/` with brief (1-paragraph) annotations

## Kimi Publications Observed So Far

| Publication | Date | Domain | Rosetta Relevance |
|---|---|---|---|
| AttnRes (arXiv:2603.15031) | 2026 | Attention over depth / residual connections | Architecture inspiration; competitive on depth aggregation |
| Kimi Long Context (several papers) | 2024-2025 | Long context windows, KV cache optimization | Directly competitive with Rosetta's memory plane |
| Kimi K1.5 / K2 | 2025 | Reasoning models, multimodal | Competitive on reasoning amplification |

## Risks

- Reactive monitoring (waiting for publications) is slower than proactive research; consider whether Kimi's team should be reached out to directly for technical exchange
- Competitive monitoring is low-urgency but high-value; it should not consume sprint capacity but should be maintained as async background work
- ArXiv publications may be pre-competitive and not reflect deployed system capabilities

## Notes

- This is a monitoring issue; no implementation is implied
- This issue should be converted to a recurring scheduled task rather than a one-shot issue
