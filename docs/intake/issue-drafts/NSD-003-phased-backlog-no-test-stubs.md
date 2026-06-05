# [NSD-003] Phased Backlog v0.1 not expressed as failing tests / package stubs

**Priority:** P2  
**Status:** open  

## Summary
Doctrine v0.2 Section 10, Directive #5 states implementation must be driven from the phased backlog, expressed as failing tests and targeted package stubs wherever possible. No such artifacts appear in the docs-intake corpus for the backlog items referenced in the doctrine's authority hierarchy.

## Evidence
- Doctrine v0.2, Section 10, Directive #5
- Authority hierarchy (Section 1.2) references "Phased Backlog v0.1" as implementation authority
- No test stubs or package stub artifacts found in docs-intake inventory for backlog items

## Acceptance Criteria
- [ ] Backlog items identified and mapped to package names / test targets
- [ ] Each meaningful backlog item has a corresponding failing test or stub that encodes its acceptance criteria
- [ ] The backlog is navigable and machine-readable

## Labels
- implementation
- backlog
- testing