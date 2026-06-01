# SDF-011: Privacy / Anti-Surveillance Governance for Guardian Mode

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — "The system knows what is happening without storing who did it." Guardian Mode design axiom: "default evaporation." SSIE schema enforces `no_identity_claim: true` and `one_time_open: true`.

## Summary
Define the constitutional-style privacy constraints for Guardian Mode that prevent it from becoming a surveillance infrastructure. These are governance requirements that cannot be overridden by operational convenience.

## Key Privacy Constraints

### Hard Constraints (cannot be overridden)
1. `no_identity_claim: true` must be enforced at the schema level in SSIE; no identity fields permitted
2. Raw audio/video never written to disk; only anonymized feature tensors
3. Events are unlinkable unless explicitly escalated via quorum
4. Ring buffer TTL enforced at the OS/ingestion layer; no bypass mechanism

### Quorum-Gated Soft Constraints (overrideable with multi-party approval)
1. SSIE one_time_open: envelope destroyed after first read unless legal hold
2. TTL_hours: auto-shred if quorum not reached within window
3. No cross-session tracking: device identifiers rotatated per-session or per-event

### Audit Requirements
- Every unseal attempt emits a Rosetta audit receipt
- Every quorum vote is logged (not the vote content, but the fact of participation)
- No audit log suppression; tamper-evident logging

## Competitive Positioning

- Palantir / China / "Old Guard" surveillance: "record everything, filter later"
- Guardian Mode: "record nothing until necessary, then record the minimum"

This is the "Anti-Panopticon" / "Blind Watchman" value proposition: safety without surveillance.

## Business Model Alignment

Sell to:
- Governments (who need efficiency and liability protection): they get threat location, not crowd video
- Enterprises (venues, transit authorities): they get safety compliance, not citizen tracking
- Citizens (who demand privacy): the system is designed for their protection, not their surveillance

## Open Questions

- How is `no_identity_claim` technically enforced if a device's UWB MAC is visible in ranging frames?
- Can an SSIE be retroactively deanonymized via timing correlation with other sealed envelopes?
- What is the minimum viable quorum composition to prevent insider abuse?
- How does Guardian Mode comply with GDPR, CCPA, EU AI Act requirements for automated decision-making in public spaces?

## Labels
`sdf`, `guardian-mode`, `privacy`, `anti-panopticon`, `governance`, `constitutional`

## Depends On
SDF-001 (Guardian Mode), SDF-003 (SSIE schema)
