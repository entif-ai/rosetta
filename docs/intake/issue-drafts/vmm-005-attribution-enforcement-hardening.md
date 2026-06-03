# Issue Draft: VM-005 — Attribution Enforcement Too Weak for Synthesized Variant Governance

## Metadata

| Field | Value |
|---|---|
| Issue ID | VM-005 |
| Type | governance |
| Status | draft |
| Source doc | docs/ideas/Entif Viral Media Mirror Systems Diagram.md |
| Extraction date | 2026-06-01 |
| Confidence | high |

## Problem

The VMM Governance layer handles attribution via:
- "attribution hints"
- "policy checks"
- "reviewer console"

For a system that synthesizes variants of potentially rights-protected viral content, "hints" and "checks" are not sufficient enforcement. The document explicitly synthesizes derivative content (homage, counter-meme, mutation variants) from source artifacts without specifying how attribution is maintained through the synthesis pipeline.

This is a legal and reputational risk for any production deployment.

## Evidence

**Governance & Guardrails section:**
```
[Governance & Guardrails]
  ├─ Attribution • licensing • consent
  ├─ Safety filters (harm • deception • IP)
  └─ Human‑in‑the‑loop review queues
```

**Governance & Ethics:**
```
- Respect platform policies and rightsholder licenses.
- Watermark synthetic variants; log provenance.
```

**Problematic specifics:**
- "Attribution hints" — hints can be ignored by downstream distributors
- "Policy checks" — policy without enforcement is policy theater
- No cryptographic attestation of attribution
- No link to rights-scoped retrieval
- No receipt for attribution chain through synthesis iterations

## Current Attribution Flow (Implicit)

```
Source artifact → normalize to glyphs + affect trace
                    ↓
              [attribution lost here?]
                    ↓
              Synthesis plan uses glyphs
                    ↓
              Variant rendered from prompts
                    ↓
              Attribution hints applied to output
```

The attribution path through the pipeline is not traced. Glyphs are tagged with provenance, but the document does not specify that provenance tags survive through synthesis.

## Recommendation

1. Add AttributionChain receipt type: for each synthesis variant, trace source artifact → glyphs used → affect traces used → variant output
2. Hard-code attribution into variant output metadata (not just hints)
3. Link to rights-scoped retrieval: synthesis plan can only use glyphs from artifacts with sufficient rights clearance
4. Add attribution correctness to the Evaluation KPIs: measure correct attribution vs missed attribution rate
5. Cross-reference with the Source Substrate provenance spec (SSP docs) for provenance lane requirements

## Labels

- governance
- attribution
- provenance
- rights

## Depends On

- VM-003 (cadence emulator interface — attribution chain receipts)
- VM-004 (impersonation guardrail — attribution and impersonation overlap)
- SSP provenance specs (Source Registry and Repository Profile Annex)
