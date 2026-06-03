# Issue Draft: VM-004 — Style Mirroring vs Creator Impersonation Guardrail Is Policy Without Technical Enforcement

## Metadata

| Field | Value |
|---|---|
| Issue ID | VM-004 |
| Type | governance |
| Status | draft |
| Source doc | docs/ideas/Entif Viral Media Mirror Systems Diagram.md |
| Extraction date | 2026-06-01 |
| Confidence | high |

## Problem

The VMM document lists as its first guardrail:

> "Distinguish style mirroring from creator impersonation."

This is a policy statement. The document simultaneously describes "counter-meme" as a synthesis variant type, which inherently involves creating content that references or responds to a specific creator's work or persona.

No technical mechanism for this distinction is described. No policy enforcement path, no detection method, no admission gate criteria.

In the absence of technical enforcement, a system that synthesizes counter-meme variants of viral content will either (a) produce creator impersonation and violate its own stated guardrail, or (b) produce content so generic it fails the synthesis quality bar.

## Evidence

**Guardrails section (full):**
```
Guardrails & Ethics
- Distinguish style mirroring from creator impersonation.
- Respect platform policies and rightsholder licenses.
- Watermark synthetic variants; log provenance.
- Opt‑out registry and cohort‑level constraints.
```

**Synthesis variants explicitly include counter-meme:**
```
Variants: mirror • homage • mutation • counter‑meme
```

Counter-meme synthesis is defined as creating content that responds to or opposes a specific meme/creator archetype. This is functionally creator-adjacent content and crosses the impersonation line if not technically distinguished.

**Related context — personhood correlation risk (DI-012, SSP-010):**
The governance addendum on personhood provenance and cognitive twin risk (PR #1190) establishes that quasi-biometric signal extraction from a person's content is a regulated risk. Synthesis that uses creator style to generate impersonation-adjacent content may trigger personhood correlation concerns.

## Missing Technical Specifications

1. **Style fingerprint definition:** What constitutes "style" vs "identity"? At what point does style become a quasi-biometric signal?
2. **Impersonation detection policy:** Named-entity policy? Voice biometric policy? Face-matching policy? Visual similarity threshold?
3. **Counter-meme admission criteria:** What makes counter-meme a permissible variant vs an impermissible impersonation?
4. **Write admission gate integration:** How does the 9-step write admission gate evaluate impersonation risk for a given synthesis plan?

## Recommendation

1. Produce a StyleVsImpersonationPolicy technical spec defining the boundary operationally
2. Define impersonation detection criteria per modality (text: named entities + voice similarity; image: face matching; video: deepfake detection thresholds)
3. Add counter-meme variant type to write admission gate with explicit admission criteria
4. Add quasi-biometric signal extraction prohibition as a constitutional constraint (cross-ref DI-012)
5. Link to rights-scoped retrieval so that impersonation-risk synthesis cannot access creator identity signals

## Labels

- governance
- guardrails
- impersonation
- personhood-correlation
- write-admission-gate

## Depends On

- NOT LAME write-admission gate (TC-005)
- DI-012 (anti-personhood-correlation governance)
- VM-005 (attribution enforcement hardening)
