# PRS-005: Alpha RC Staircase Tracking — RC-0 Through RC-4 Gates

## Metadata

| Field | Value |
| --- | --- |
| Title | Alpha RC Staircase Tracking — RC-0 Through RC-4 Gates |
| Type | implementation |
| Status | candidate |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Extraction | `2026-06-05-entif-rosetta-prds-revisions-synthesis.md` |
| Labels | build-order, alpha-rc, milestone, tracking |
| Confidence | high |

## Problem

The synthesis produces a clear 4-stage Alpha RC staircase (RC-0 through RC-4) with explicit gate criteria, but there is no existing tracking mechanism for this progression. It needs to be integrated into the project's build tracking system alongside or in replacement of the existing TC-001 through TC-007 tracking.

## Alpha RC Staircase Definition

### RC-0: Nx Workspace Bootstrap
**Gate**: Nx workspace boots cleanly; `canon`, `cid`, `validate` packages exist; TV1 and tamper-negative tests compile red (failing as expected)
**Criteria**:
- [ ] `nx graph` shows `rosetta-canon`, `rosetta-cid`, `rosetta-validate` as workspace projects
- [ ] `pnpm build` succeeds for all packages
- [ ] TV1 test vector compiles and fails (expected failure for untested code)
- [ ] Tamper-negative test compiles and fails

### RC-1: JCS/CID Conformance
**Gate**: JCS/CID deterministic conformance green; `rosetta.receipt` schema green; `rosetta.tapestry` receipt-bundle schema green
**Criteria**:
- [ ] RFC 8785 JCS compliance verified (or JCS gap tracked per PRS-004)
- [ ] CID generation produces deterministic output across runs
- [ ] `rosetta.receipt` schema validates against RRP receipt schema
- [ ] `rosetta.tapestry` schema validates receipt-bundle tapestry

### RC-2: Guard Admission and Builtin Echo
**Gate**: Guard denies missing/expired/mismatched tokens; `builtin.echo` vertical slice passes end-to-end; receipt bundle verifies successfully
**Criteria**:
- [ ] `admit()` denies MISSING_DECISION_TOKEN when no token provided
- [ ] `admit()` denies POLICY_VERSION_MISMATCH
- [ ] `admit()` denies TOOL_MISMATCH
- [ ] `admit()` denies DECISION_EXPIRED
- [ ] `builtin.echo` passes full guard/receipt/tapestry loop
- [ ] Receipt bundle verifies against tapestry closure policy

### RC-3: Code Scaffold Dry Run
**Gate**: `code.scaffold --dry-run` reuses same constitutional loop; no real side effects; CLI/API both green
**Criteria**:
- [ ] `code.scaffold --dry-run` calls guard admission
- [ ] No file system mutations occur in dry-run mode
- [ ] CLI surface available: `rosetta code scaffold --dry-run <args>`
- [ ] API surface available for programmatic use

### RC-4: Local CAS + Rights-Scoped Retrieval
**Gate**: Local CAS + SQLite query surfaces stable; rights-scoped retrieval enforced; operator UI stub non-gating
**Criteria**:
- [ ] CAS stores content and returns stable CIDs
- [ ] SQLite index supports CID lookup and metadata query
- [ ] Rights-scoped retrieval enforces access constraints
- [ ] `rosetta-operator` UI stub exists but does not gate alpha
- [ ] All RC-0 through RC-3 gates remain green

## Relationship to Existing Tracking

The Alpha RC staircase (PRS-005) and TC-001 through TC-007 are tracking different things:
- **TC-001 through TC-007**: Text-Core MVP scope gate, 3-rung build (Bootstrap → Text-Core MVP → Alpha RC)
- **RC-0 through RC-4**: Within Alpha RC — specific implementation gates

Alpha RC is the top of the 3-rung staircase, so PRS-005 sits at the intersection of TC-005 (Promotion state machine) and the broader Alpha RC work.

## Integration

This staircase should be tracked in the project board as a sequential milestone chain. Each RC gate should have:
- A GitHub Milestone or project board column
- Explicit test criteria (as listed above)
- Sign-off requirement from architecture owner

## Dependencies

- PRS-001 (ROCK-3111-C): defines RRP schemas required for RC-1
- PRS-004 (JCS gap): affects RC-1 canonicalization compliance
- TC-005: Promotion state machine must integrate with these RC gates

## Open Questions

- Should RC-0 through RC-4 replace or augment TC-005 tracking?
- Should each RC gate have its own branch/PR workflow or are they consolidated into one PR?
- Does the operator UI stub in RC-4 require a separate tracker or is it included in PRS-005?