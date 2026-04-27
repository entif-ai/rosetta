# Issue: skillpack-importer-quarantine-flow

## Metadata

- ID: skillpack-importer-quarantine-flow
- Title: Skillpack Importer — Parse → Classify → Quarantine → Certify → Promote
- Type: implementation
- Severity: high
- Tags: skillpack-importer, quarantine, skills-portability, claude-skills, openclaw-skills, adapter-certification
- Created: 2026-04-24
- Source: docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md

## Summary

Skills written for Claude/Codex/OpenClaw must be absorbed via a dedicated SkillPack importer with quarantine, not direct execution. The four-phase flow is: Parse → Classify → Quarantine → Certify → Promote. No direct writes on import.

## The Problem

Crates wants "the ability to absorb skills written for Claude/Codex/OpenClaw without risk." This is a legitimate need: the skill ecosystem is rich, but importing raw skill files directly risks:
- Undeclared tool dependencies
- Hidden side effects
- Scope creep (skill that claims to need minimal permissions actually needs more)
- State mutation surfaces not declared
- Skills written for a different execution model being forced into this one

This is "the sort of thing VersionForge and pack-oriented Rosetta design are meant to support: semver, compatibility reports, policy-bound packs, and extensible namespaces without polluting core semantics."

## The Four-Phase Flow

### Phase 1: Parse

Convert skill representation to neutral internal format:
- SKILL.md → structured skill manifest
- AGENTS.md → agent role definition
- Prompt bundles → prompt templates with trigger conditions
- OpenClaw-style skill files → normalized skill spec

Output: normalized skill manifest with:
- declared capabilities
- required tools
- trigger conditions
- expected outputs
- declared permissions scope
- version information

### Phase 2: Classify

Identify:
- Required tools (what tools does this skill call?)
- Required permissions (what permissions does it claim to need?)
- Side effects (what state does it mutate outside its declared scope?)
- Expected outputs (what does it produce?)
- Hidden assumptions (what does it assume about the environment, model capabilities, or other skills?)
- State mutation surfaces (what persistent state does it touch?)

This is where skills get scrutinized. A skill that says "just uses the file system" might actually need write access to canonical state. A skill that says "read-only" might actually mutate session state.

### Phase 3: Quarantine

Run the skill in:
- Dry-run mode: execute the skill's logic without applying any side effects
- Sandboxed test fixtures: mock all external dependencies (filesystem, network, tools)
- Capped budgets: token budget, time budget, tool call budget
- Explicit policy scopes: limit what the skill can see and do during quarantine

During quarantine:
- Log every attempted tool call
- Log every attempted state mutation
- Log every side effect
- Compare actual behavior vs. declared behavior
- Flag discrepancies

If a skill attempts to:
- Access tools not declared in Phase 2
- Mutate state outside its declared scope
- Exceed budget
- Behave differently in quarantine than declared

→ it fails quarantine and is NOT promoted.

### Phase 4: Certify

A skill only gets certified if:
1. It emits valid receipts during quarantine (no receipts = suspicious)
2. It respects all declared scopes
3. It passes all fixture tests
4. It has no undeclared side effects
5. It behaves consistently across multiple quarantine runs

Certification is not one-time. A skill can be re-certified on update, and continuous behavior monitoring can trigger de-certification.

### Phase 5: Promote

Only after passing all four phases does a skill enter the trusted internal pack registry.

Promotion means:
- Skill gets a pack ID under the VersionForge schema
- Skill is registered in the capability plane
- Skill is available for composition with other skills
- Skill behavior is continuously monitored for drift from certified behavior

## Resolution Required

1. Design the neutral internal skill manifest format
2. Build the parser for SKILL.md, AGENTS.md, prompt bundles, OpenClaw-style files
3. Build the classifier: tool detection, permission mapping, side effect analysis
4. Build the quarantine runner: dry-run, sandboxing, budget capping, scope enforcement
5. Build the certification engine: receipt validation, scope compliance, fixture tests
6. Build the promotion workflow: pack ID assignment, registry entry, capability plane registration

## VersionForge Integration

The skillpack importer fits directly into VersionForge:
- Pack categories include: skills, agents, connectors, memory adapters
- Each pack has: manifest, version, compatibility report, policy scope
- Extensible namespaces without polluting core semantics
- semver for skill version tracking

## Related Issues

- adapter-certification-eight-test-classes
- memory-adapter-certification-harness
- sovereign-kernel-vs-harness-proof-architecture
