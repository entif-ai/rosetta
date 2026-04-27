# EntAffirm Alignment Oracle

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** safety, entaffirm, alignment, governance
**Depends on:** autobiographical-memory-three-store.md

## Problem Statement

"EntAffirm verifies the content against known facts and policies to catch hallucinations or violations" and serves as "gatekeeper for slow-tier commits and self-modifications" — but no interface, no verification methodology, no pass/fail criteria, and no appeal/rejection flow defined.

## Specific Findings from Extraction

- **F-ENTAF-001** (confidence: high): EntAffirm described as gatekeeper but no API, no input/output schema, no pass criteria
- **F-ENTAF-002** (confidence: high): "Known facts and policies" — no defined knowledge base or policy document format
- **F-ENTAF-003** (confidence: high): Gatekeeper for slow-tier commits means EntAffirm failure blocks memory consolidation; no fallback or escalation defined
- **F-ENTAF-004** (confidence: medium): "Self-modifications" gated by EntAffirm — what class of modifications? Any weight change? Any prompt injection? No scope defined
- **F-ENTAF-005** (confidence: medium): No hallucination detection methodology specified (retrieval augmented? model-based? symbolic?)

## Action Required

1. Define EntAffirm API (input schema, verification method, output schema with confidence scores)
2. Define the "known facts and policies" knowledge base format and initialization strategy
3. Specify fail/reject/escalate behavior when EntAffirm blocks a commit
4. Scope what counts as "self-modification" requiring EntAffirm gate
5. Specify hallucination detection methodology
