# Issue Draft: JDL-005 — DR Posture as Enterprise Qualifying Criterion in GTM

## Metadata

| field | value |
|---|---|
| title | JDL-005: Document DR posture as enterprise qualifying criterion in GTM |
| type | documentation |
| source | `docs/ideas/JSON Optimization for Data Lakes.md` (DI extraction: 2026-06-01) |
| confidence | high |
| labels | `gtm`, `sales`, `dr` |

## Problem Statement

The chat session identifies DR strategy as a strategic GTM instrument, not just a technical requirement. Specifically, enterprise buyers (DoD contractors, McKinsey-level consultancies, Palantir-adjacent firms, Point72 asset management) conduct formal due diligence that includes:

1. **Risk mitigation assessment**: Does the vendor have documented, tested DR procedures?
2. **Regulatory compliance**: Does the vendor's DR posture satisfy contractual DR requirements?
3. **Operational maturity signal**: Does the vendor think like an enterprise, or like a startup?

This is identified in the chat as a way to: (a) assuage due diligence teams and expedite procurement; (b) signal S-tier engineering competence; (c) qualify for picky enterprise RFPs; (d) populate the PR/press kit; (e) shorten sales calls.

This insight is not currently captured in any GTM, sales enablement, or product documentation.

## Relevant Findings from Source

- **F12 (high confidence)**: "assuage in advance the risk mitigation teams that will without a doubt be doing due diligence, which vastly expedites getting through the red tape that can choke a hot lead to death before it gets through the whole pipeline"
- **F12 (high confidence)**: "communicate to any leadership in the room that we're not only thinking ahead and covering all the bases, but also, we're an S-tier shop"
- **F12 (high confidence)**: "open doors to extremely picky potential clientele who won't even give you a chance to chat if you aren't already meeting a highly-specific and thorough set of qualifying criteria (think: DoD, McKinsey, Palantir, Point 72 Asset Mgmt, etc.)"
- **F12 (high confidence)**: "set us up for a very solid feather in our PR cap that goes in our press kit, marketing materials, and eventually, as a small footnote in a much larger presentation on the truly novel stuff at something like a TED Talk, Gartner Symposium, CES, etc."

## Proposed Action

1. Create a **DR Data Sheet** (1-2 pager) suitable for procurement packages and due diligence questionnaires: RTO/RPO targets per tier, vendor stack, test cadence, last test date, compliance mapping (HIPAA/GDPR/SOC2 if applicable).
2. Add DR posture section to the **sales deck** and **RFP response template**.
3. Draft **enterprise security questionnaire response** (or equivalent CISO briefing sheet) that includes DR architecture overview.
4. Flag: DR as a qualifying criterion means it should be on the critical path for any enterprise deal — not an afterthought.

## Alignment with Existing Rosetta Work

- **UPSTREAM_AND_BACKUP_PLAN**: Existing backup plan is technical but does not frame DR as a GTM/sales instrument.
- **BOOTSTRAP_EXECUTION_TRACK**: DR procedures exist at bootstrap level but are not documented for external consumption.
- **NOT LAME PRD**: Includes 14 threat categories and regulatory architecture (HIPAA/GDPR/SEC) but does not call out DR posture as a sales qualifier.

## Dependencies

- None; this is a documentation/sales asset that can be produced from existing technical documentation.

## Status

candidate
