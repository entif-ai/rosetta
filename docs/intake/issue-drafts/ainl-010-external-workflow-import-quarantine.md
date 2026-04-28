# AINL-010: Quarantine external workflow and agent imports before certification

## Title

Quarantine external workflow and agent imports before Rosetta certification.

## Source Evidence Link/Path

- AINL repository README: https://github.com/sbhooley/ainativelang
- AINL whitepaper: https://www.ainativelang.com/whitepaper
- Existing related draft: `docs/intake/issue-drafts/archive/skillpack-importer-quarantine-flow.md`
- Local synthesis: `docs/intake/competitor-intelligence/ainativelang-2026-04-28.md`

## Existing Representation Check

Likely already represented by `skillpack-importer-quarantine-flow` and related skill safety issues. Keep this local unless external workflow formats are excluded from that importer scope.

## Entif/Rosetta Mapping

AINL's importers for external workflow/agent Markdown imply a Rosetta need:

- parse external workflow or agent artifacts into inert candidate records
- classify source type and declared capabilities
- quarantine until schemas, policy, guard posture, and provenance pass
- certify only into packs/skills/workflow bundles with receipts
- preserve source provenance and non-vendoring boundary

## Priority

P2 - important supply-chain hygiene, but probably a refinement of existing importer quarantine work.

## Rationale

Rosetta will see pressure to import external agent workflows, skills, and prompt bundles. The safe posture is not "no import"; it is parse, classify, quarantine, certify, promote. This lets Rosetta learn from ecosystem formats without trusting them.

## Acceptance Criteria

- [ ] Confirm whether `skillpack-importer-quarantine-flow` covers external workflow and agent Markdown formats.
- [ ] If not covered, extend scope to include workflow and agent import candidates.
- [ ] Require source URL/path, license/provenance note, capability claims, side-effect posture, and generated Rosetta candidate artifact refs.
- [ ] Ensure imported artifacts cannot execute until certification passes.
- [ ] Add negative fixtures for hidden instructions, destructive commands, missing provenance, and overbroad capabilities.

## Test Strategy

- Add parse-only importer fixtures with no network required.
- Add quarantine tests that reject execution before certification.
- Add supply-chain tests for suspicious instructions and missing source metadata.

## Non-Goals

- Do not vendor competitor source code or skills.
- Do not execute imported workflows during parsing.
- Do not bypass pack/skill certification.
