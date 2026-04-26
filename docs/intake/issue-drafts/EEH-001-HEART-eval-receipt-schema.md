# EEH-001: HEART Evaluation Receipt Schema

## Type
implementation

## Status
issue-candidate

## Priority
HIGH

## Evidence
docs/intake/docs-intelligence/2026-04-25-empathy-eval-harness.md — Finding 1

## Problem Statement

If HEART (Human alignment, Empathic responsiveness, Attunement, Resonance, Task-following) is to serve as a calibration instrument for Entif's behavioral surface, every eval must be stored as a signed receipt enabling longitudinal tracking across model versions, personas, domains, and safety profiles. No canonical schema currently exists in Rosetta/Entif artifact ecosystem for HEART eval receipts.

## Detail

From Finding 1:
- Input: (dialogue history, candidate response, role/scope constraints)
- Output: {H,E,A,R,T} + overall preference score + rationale tags
- Storage: every eval as a signed "receipt" for longitudinal tracking

The schema must capture:
1. Input tuple: dialogue history reference, candidate response reference, role/scope constraints
2. Output vector: {H, E, A, R, T} each as numeric score
3. Overall preference score
4. Rationale tags (structured labels for why each axis scored as it did)
5. Timestamp
6. Evaluator version (to track schema evolution)

## Implementation Notes

- Schema should live in Rosetta artifact registry (PostgreSQL canonical per NOT LAME PRD)
- Receipt must be signed (hash of input+output+constraints) to prevent tampering
- Must support versioning so old receipts can be re-evaluated against new schema
- Should support both batch eval (multiple candidate responses) and live eval (single response)

## Dependencies
- NOT LAME PostgreSQL schema (currently candidate)
- Receipt Law (per BOOTSTRAP_EXECUTION_TRACK)
- Adapter certification harness (per NOT LAME)

## Labels
empathy-eval, HEART, schema, receipts, longitudinal-tracking