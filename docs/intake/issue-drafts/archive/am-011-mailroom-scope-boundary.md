# AM-011: Mailroom Scope — Bus Ingress vs General Rosetta Ingress Pattern

## Status

draft — `docs/intake/issue-drafts/am-011-mailroom-scope-boundary.md`

## Metadata

- **Type:** open-question
- **Priority:** P2
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 6, Section 1
- **Confidence:** medium

## Problem

The spec describes the mailroom as "the only default ingress beyond the outer perimeter" (Section 6), but the scope of "ingress" is ambiguous. The spec is titled "Agentic Messaging" and focuses on inter-agent message exchange — but does the mailroom apply only to messages on the inter-agent bus, or does it define a general Rosetta ingress pattern for all external inputs?

Potential inputs to Rosetta that might need mailroom-style processing:
- Skillpack imports (tarballs, zip archives) via the skillpack importer
- Human messages (Telegram, Slack, Discord) received via connector adapters
- Tool call results from external systems
- File imports (PDF, DOCX, Markdown)
- Git push events (code commits as evidence sources)

If the mailroom is only for the inter-agent bus, the other ingress paths need their own security boundaries. If it is a general pattern, it should be documented as such and aligned with NOT LAME PRD's "skillpack importer" (parse→normalize→quarantine→certify→promote) and the ingest/refinery pipeline.

## Evidence

> "The ingest/mailroom worker is the only default ingress beyond the outer perimeter." — Section 6

> Non-goal: "Defining specific workflows or tasks" — Section 1 (implies scope is limited to messaging, not all ingress)

> Section 6.1 Stage 3 "Quarantine Raw" is structurally identical to the NOT LAME skillpack importer's quarantine stage

## Open Questions

1. Is the mailroom specific to the inter-agent message bus, or is it a general Rosetta ingress boundary?
2. If general: should skillpack imports, human messages, and tool call results also go through the mailroom pipeline?
3. If specific: do other ingress paths need their own quarantine/certification stages?
4. Can the mailroom pipeline be generalized as a reusable Rosetta ingress pattern (with typed ingest handlers per input type)?
5. How does the mailroom interact with the NOT LAME skillpack importer quarantine flow — same system, different systems, or unified?

## Required Deliverables

1. **Scope decision document:** formally define what does and does not go through the mailroom
2. **If mailroom = general pattern:** architectural decision record (ADR) proposing mailroom as the universal Rosetta ingress boundary
3. **Integration with skillpack importer:** map the mailroom's 6 stages against the skillpack importer's parse→normalize→quarantine→certify→promote flow; identify overlap and gaps
4. **Human message ingress:** if Telegram/Slack/Discord messages go through mailroom, what is the envelope for a human-originated message?
5. **Documentation:** update SPEC or architecture docs to clarify mailroom scope after decision

## Acceptance Criteria

- [ ] Mailroom scope is formally defined (not ambiguous)
- [ ] All external input paths have documented security boundaries
- [ ] Mailroom and skillpack importer quarantine flows are reconciled (same system, explicit interface, or documented as separate)
- [ ] Human message envelope format is defined if humans are in scope

## Dependencies

- AM-002 (quarantine storage — likely shared with skillpack importer)
- NOT LAME PRD skillpack importer definition

## Labels

`agentic-messaging`, `architecture`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` Section 1, 6
- Related: NOT LAME PRD skillpack importer, ingest/refinery pipeline
