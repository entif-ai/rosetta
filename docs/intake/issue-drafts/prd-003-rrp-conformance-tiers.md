# PRD-003: ROCK-3111-C Conformance Tier Operational Definitions Missing

## Metadata

- **Type**: spec-gap
- **Status**: candidate
- **Priority**: medium
- **Labels**: rrp, conformance, spec-gap, pack
- **Depends on**: ROCK-3111-C draft (20260410 PRD revisions synthesis)
- **Confidence**: high

## Problem Statement

The ROCK-3111-C draft (RRP Pack Filesystem Contract v0.1.0) defines three conformance tiers:

- **RRP-Light**: entry-level conformance
- **RRP-Full**: complete conformance
- **RRP-Auditor**: auditor-level conformance

However, no operational definition is provided for what each tier **requires** or how conformance is **verified**. Without operational definitions, pack authors cannot know what they need to implement, and CI cannot know what to check.

## Evidence

From ROCK-3111-C draft (20260410 PRD revisions synthesis):
> "Conformance tiers: RRP-Light / RRP-Full / RRP-Auditor"

The spec lists the tiers but does not answer:
- What files/features are required at each tier?
- What is the verification mechanism (CI automation, manual audit, third-party attestation)?
- What happens when a pack claims RRP-Full but misses a requirement?

## Scope

1. **RRP-Light operational definition**: Minimum viable conformance. Likely: pack.json with required fields, at least one schema file, at least one passing test vector.
2. **RRP-Full operational definition**: Complete conformance. Likely: all required files present, all test vectors pass (positive and negative), SHACL shapes validate, vocab terms are complete.
3. **RRP-Auditor operational definition**: What does "auditor" mean operationally? Is it a human review process? A specific CI configuration? A third-party certification?
4. **Verification mechanism**: How does a pack prove conformance? Is there a `rosetta pack verify --tier=RRP-Full` command? A CI job? A self-certification checklist?
5. **Non-compliance path**: What happens when a pack that claims RRP-Full fails conformance checks? Is it an error? A warning? A hard block on publish?
6. **Tier inheritance**: Does RRP-Auditor imply RRP-Full implies RRP-Light? Or can a pack be RRP-Auditor without being RRP-Full?

## Implementation Notes

- ROCK-3111-C is currently a draft — this operational gap should be resolved before the spec advances to stable
- The conformance tier model is similar to TLS compliance levels or PCI-DSS tiers — look to those for reference implementations
- CI automation is likely the right mechanism for RRP-Light and RRP-Full; RRP-Auditor may require manual review or third-party audit

## Related

- ROCK-3111-C (RRP Pack Filesystem Contract)
- RRP conformance vectors
- RRP-Light, RRP-Full, RRP-Auditor tiers