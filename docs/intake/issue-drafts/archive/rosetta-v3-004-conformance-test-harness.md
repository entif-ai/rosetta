# ROSETTA-v3-004: Conformance Test Harness Not Specified

**Type:** implementation  
**Priority:** P2  
**Source document:** `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`  
**Extraction date:** 2026-04-25  
**Confidence:** high  

## Summary

The spec defines four conformance profiles (Light/Full/Auditor/Forge) and recommends SHACL for validation, but does not specify a test harness, acceptance criteria, or certification process for profile compliance.

## Evidence

From § Profiles Definition:

> A node may be certified as e.g. "Rosetta 3.0 Full Profile Compliant" or "Rosetta 3.0 Light Profile (subset) Compliant" etc.

From § SHACL Use in Conformance:

> An implementation should run these shape validations on data either in real-time or offline.

No specification of how certification works, what pass/fail criteria are, or how profiles are tested.

## Problem

Without a conformance test harness:
- Implementations cannot self-validate before claiming compliance
- "Profile certified" has no verifiable meaning
- Interoperability between nodes claiming the same profile cannot be assured

## Recommendation

1. **Test oracle:** Define a machine-readable test suite covering all MUST/SHALL requirements
2. **Profile test matrices:** Map each requirement to the profile(s) it applies to
3. **Certification workflow:** Define the process for claiming and verifying compliance
4. **Conformance mark:** Specify a recognizable marker compliant implementations may use

## References

- Core Spine Spec § Profiles Definition
- Core Spine Spec § SHACL Use in Conformance
- Core Spine Spec § Conformance and Compliance

## GitHub Issue

(`rosetta-v3-004-conformance-test-harness.md` — draft)
