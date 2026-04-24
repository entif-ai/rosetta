# Choose NERDm JSON-LD context and schema version

Issue draft id: `omc-nerdm-jsonld-context-version`
Priority: `P3`
Effort: `S`
Labels: `omc`, `nerdm`, `json-ld`, `metadata`

## Problem

The OMC research spec names the NERDm pattern, but does not choose a JSON-LD context document or schema version.

## Scope

Select or explicitly defer the metadata context and version expected by any NERDm-style adapter.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-ontological-mixture-of-concepts-research-spec.md` - Issue Candidates row for NERDm adapter schema/version.
- Source spec section cited there: Section 7.4 designates NERDm pattern but no specific schema version or context document.

## Specific Findings

### Finding 1: Adapter output cannot be validated without a versioned context

The extraction identifies a schema-selection gap that will block validation and fixture generation.

## Acceptance Criteria

- [ ] Identify the target JSON-LD context or document why it is deferred.
- [ ] Define schema version pinning behavior.
- [ ] Add example adapter metadata with provenance.
- [ ] Define compatibility behavior for future schema upgrades.
