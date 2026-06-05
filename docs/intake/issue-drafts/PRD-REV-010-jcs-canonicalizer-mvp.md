# Issue Draft — PRD-REV-010: Implement JCS canonicalizer MVP; plan full RFC 8785 compliance

## Title

PRD-REV-010: Implement JCS canonicalizer MVP; plan full RFC 8785 compliance

## Type

open-question

## Labels

jcs, canonicalization, rfc8785

## Depends On

PRD-REV-001

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

> "For the rrp-tv1.spec.ts, I'll produce a minimal canonicalizer using Node's built-ins like JSON.stringify for the job. I'll mention that this is an MVP-safe subset, which may not fully align with RFC 8785, and recommend using a full standards-compliant library later."

## Description

JSON Canonicalization (JCS) is required for deterministic CID generation in Rosetta. The synthesis doc uses a pragmatic approach for MVP:

- **MVP approach**: Node's `JSON.stringify` with sorted keys — may not fully comply with RFC 8785
- **Production approach**: A full RFC 8785-compliant JCS library

RFC 8785 compliance matters for:
- Interoperability with other RRP/Rosetta implementations
- Cryptographic signature stability (non-compliant canonicalization can produce different hashes)
- Test vector compliance with the RRP spec

The gap to track: the MVP canonicalizer must be verified against the RRP test vectors, and a full RFC 8785 library must be identified and scheduled as a post-MVP dependency.

## Proposed Action

- Implement MVP JCS canonicalizer using Node built-ins with sorted keys
- Verify MVP against RRP test vector TV1 (which should pass)
- Identify a full RFC 8785-compliant JCS library (e.g., `json-canonicalize` npm package)
- Schedule RFC 8785 compliance upgrade as post-alpha milestone
- Add a comment in code noting the MVP non-compliance and the upgrade path
