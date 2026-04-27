# EML-004: Content-Risk Middleware Generalizes Beyond Email — Skill-Pack Modularization Needed

**Status:** issue-candidate
**Priority:** HIGH
**Type:** architecture/reusability
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F004

---

## Problem Statement

The same defensive pattern (normalize → enrich with provenance → score across multiple risk dimensions → route by policy → only then allow downstream model consumption) is applicable across multiple channels:

1. **Email** — primary use case
2. **Repository-hosted skill/instruction markdown** (e.g., ClawHub) — files that mix documentation, executable commands, tool wiring, agent directives, and hidden/encoded directives
3. **Forum posts and private messages** (e.g., MoltBook) — with scoring for coordinated persuasion, reputation laundering, cross-post repetition
4. **Fetched web pages** — pre-screening before sending to cheaper model for token parsimony
5. **Attached documents** — PDFs, Office files, archives
6. **Internal knowledge objects** — prompt templates, tool specs

The content-risk scoring layer should be modularized as reusable skills applicable across all channels.

## Recommended Action

Build the following as modular, reusable pack families (see also EML-006):

- `ingress.*` — channel-specific adapters that normalize content into Rosetta-native observations
- `risk.*` — reusable scoring layer (content-risk, SE-risk, anomaly, provenance-risk, small-model suitability)
- `truthlint.*` — claim extraction, assumption surfacing, source/evidence scoring
- `rrp.*` — receipts, bundles, provenance-pathing

For skill markdown specifically, screen for:
- Attempts to redefine system boundaries
- Instructions to ignore host constraints
- Covert escalation language
- Hidden/encoded directives
- References to unrestricted tool use
- Suspicious external fetch instructions

## Notes

The document frames this as: "a reusable content-risk middleware layer that sits in front of any downstream model or agentic workflow, with channel-specific adapters on the front and policy-specific executors on the back."
