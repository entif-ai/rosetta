# Authority Stack

## Source

- Path: `docs/governance/AUTHORITY_STACK.md`
- Title: Authority Stack
- Date evidence: No date in document; references April 12, 2026 added authorities
- Authority tier: governance (Tier 1)
- Freshness: current
- Word count: ~200
- Extractor: Emilie (OpenClaw docs-intelligence agent)
- Extraction date: 2026-04-24

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

Defines the governing authority hierarchy for the Rosetta bootstrap: which external documents are authoritative over repo decisions, which local execution constraints are binding, and what the repo itself serves as receipt for. Key finding: Rosetta is constitutionally scoped to internal meaning and provenance only — OB1 and Prism are external donor systems, not Rosetta's responsibility. Also: large-scale ingest is explicitly blocked until both Ingress Refinery and canonical corpus cache are present, which aligns with but adds Node-version specificity (Node 24.14.1 pinned) not found in other docs.

---

## Goals And Intent

- Establish which external documents have authority over the repo's design decisions
- Define binding local execution constraints
- Serve as a receipt for what the repo workspace contains at bootstrap time

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-24T21:00 | `docs/governance/AUTHORITY_STACK.md` | Primary Authorities | `governance` | authority hierarchy, bootstrap chain | `decision` | Authority hierarchy is explicit: (1) NEXT-SESSION-BOOTSTRAP-v0.1.md, (2) prerequisite Markdown authorities listed in that bootstrap doc, (3) three added April 12 authorities: ontologies/dataset repos doc, source substrate addendum, source registry annex | "This repository treats the local handoff corpus as the governing design record" | note: bootstrap doc chain is external to this repo; track as dependency | high |
| 2026-04-24T21:00 | `docs/governance/AUTHORITY_STACK.md` | Primary Authorities | `governance` | bootstrap prerequisites | `ablation` | The bootstrap prerequisites referenced by NEXT-SESSION-BOOTSTRAP-v0.1.md are NOT in the repo docs/ folder — they live in ~/open-brain/ or similar external path. This creates a bootstrapping gap: agents need access to an external doc chain to fully understand the authority hierarchy. | "/Users/emilie/.openclaw/workspace/open-brain/NEXT-SESSION-BOOTSTRAP-v0.1.md" | ask orchestrator: should bootstrap prerequisites be mirrored into the repo? | medium |
| 2026-04-24T21:00 | `docs/governance/AUTHORITY_STACK.md` | Local Execution Constraints | `governance` | node version pin, constitutional boundaries | `decision` | Node 24.14.1 is explicitly pinned as the maintenance lane for this bootstrap — stronger/more specific than "Node 24" references elsewhere | "Node `24.14.1` is the pinned maintenance lane" | add to implementation constraints | high |
| 2026-04-24T21:00 | `docs/governance/AUTHORITY_STACK.md` | Local Execution Constraints | `governance` | OB1, Prism, Mission Control boundaries | `decision` | Rosetta stays constitutional for internal meaning and provenance. OB1 is an already-live donor sidecar (external). Prism is evaluated in shadow mode only (not yet live). Mission Control is an operator shell candidate, not a semantic authority. | "Rosetta stays constitutional for internal meaning and provenance. OB1 remains an already-live donor sidecar. Prism is evaluated in shadow mode only." | align with architecture doc: OB1/Prism are projection-adapters (read-only); Mission Control is rosetta-operator (future) | high |
| 2026-04-24T21:00 | `docs/governance/AUTHORITY_STACK.md` | Local Execution Constraints | `governance` | ingest gate | `decision` | Large-scale corpus ingest stays paused until Ingress Refinery AND canonical corpus cache are BOTH present | "Large-scale corpus ingest stays paused until the Ingress Refinery and canonical corpus cache are both present" | consistent with other docs; adds dual-gate framing (both required, not either) | high |
| 2026-04-24T21:00 | `docs/governance/AUTHORITY_STACK.md` | Repo Receipts | `governance` | bootstrap artifacts, Nx version | `decision` | Repo receipts: Nx 22.6.x workspace via official CLI, core packages present, parse-only ingress default, Tier 0/1 registry modeled | "Nx `22.6.x` workspace generated through official Nx CLI and plugins" | note Nx version is 22.6.x (not latest); align with package manager constraints | high |
| 2026-04-24T21:00 | `docs/governance/AUTHORITY_STACK.md` | Repo Receipts | `governance` | parse-only posture | `decision` | Parse-only ingress preserved as default posture — consistent across all governance docs | "Parse-only ingress preserved as the default posture" | no action; already governing | high |
| 2026-04-24T21:00 | `docs/governance/AUTHORITY_STACK.md` | Overall | `governance` | authority chain vs repo docs | `open-question` | The authority stack points to external docs outside the repo. If those external docs are lost or mutated, the repo's governing authority chain is broken. No mechanism currently documented for ensuring authority doc integrity. | "This repository treats the local handoff corpus as the governing design record" + external paths | ask orchestrator: should authority docs be committed into the repo for integrity? | medium |

---

## Components And Technologies

- **Node:** 24.14.1 (pinned maintenance lane — specific version)
- **Nx:** 22.6.x (official CLI workspace)
- **Authority source:** external docs at ~/open-brain/ (not in repo)
- **OB1:** donor sidecar (already-live, external to Rosetta)
- **Prism:** shadow mode evaluation only
- **Mission Control:** operator shell candidate (rosetta-operator future app)

---

## Conceptual Claims

- Rosetta is constitutionally scoped to "internal meaning and provenance" — explicit boundary statement
- OB1 is a live external donor system, not Rosetta's constitutional responsibility
- Prism is not yet live — shadow mode evaluation only
- Mission Control is an operator shell surface, not a semantic authority
- The repo itself serves as a receipt for what was bootstrapped, not as the primary authority

---

## Dependencies And Sequencing

- Authority stack is foundational — governs all other docs and implementation
- External bootstrap chain (NEXT-SESSION-BOOTSTRAP-v0.1.md) must be accessible for full authority resolution
- Large-scale ingest blocked until both Ingress Refinery AND canonical cache are present (dual-gate, not either/or)

---

## Contradictions Or Supersession

- No direct contradictions within this doc
- One tension: Prism is described as "shadow mode only" here, while the architecture doc lists it as a read-only projection-adapter (projection-adapters package). These are consistent if shadow mode = read-only evaluation before full projection-adapter implementation.

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- |
| Mirror authority bootstrap docs into repo | governance | `governance` | None | External ~/open-brain/ docs are authoritative but not in repo; integrity risk if external docs are lost or mutated |
| Confirm Prism shadow mode = projection-adapter read-only equivalence | issue-candidate | `governance`, `prism` | None | Authority Stack says "shadow mode"; architecture says "read-only projections" — same thing? |
| Lock Node 24.14.1 in repo root config | implementation | `governance` | None | Explicitly pinned in Authority Stack; verify .nvmrc or package.json reflects this |

---

## Project Board Suggestions

- **Area:** `governance`
- **Cycle:** discovery
- **Status:** active extraction
- **Blocked by:** none
- **Parallelization notes:** governance docs can be processed in parallel with other batches; authority stack is foundational

---

## Open Questions

- Should the external bootstrap chain (NEXT-SESSION-BOOTSTRAP-v0.1.md and prerequisites) be committed to the repo for integrity, or kept external?
- Are the three added April 12 authority docs accessible and still current?
- Is Prism's "shadow mode" status still accurate, or has it progressed since this was written?
- Does Mission Control have a separate spec, or is it defined entirely by "operator shell candidate"?