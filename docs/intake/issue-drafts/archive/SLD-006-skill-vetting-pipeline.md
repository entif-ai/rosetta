# SLD-006: Skill Vetting/Ingestion Pipeline

## Meta

- **Drafted:** 2026-04-25
- **Source:** docs/chats/20260323 - Chat GPT - Entif Skill Library Design.md
- **Extraction:** 2026-04-25-skill-library-design.md (Finding 5)
- **Confidence:** HIGH
- **Labels:** skills, vetting, ingestion, certification, pipeline, quarantine

## Summary

Implement the skill vetting pipeline: every skill ingested into the library must pass a 6-stage gating process before being certified and enabled. Stages: Ingest → Normalize → Static lint → Petri-style eval pack → Sign+store → Enable. Only `certified=true` skills enter the broker. This transforms "skills from trustworthy sources" from a vibe into a measurable gate.

## Problem Statement

Without a vetting pipeline, any skill can enter the library — including skills with hidden tool dependencies, undeclared side effects, prompt injection attempts, or broken acceptance checks. The vetting pipeline is what makes the skill library trustworthy and safe to execute.

This pipeline overlaps with the existing `skillpack-importer-quarantine-flow` issue (parse → classify → quarantine → certify → promote). These should be unified or clearly delineated.

## 6-Stage Pipeline

### Stage 1: Ingest

- Receive skill from source (file upload, git import, broker sync, agent-authored)
- Extract raw skill artifact (SKILL.md, AGENTS.md, resources)
- Assign provisional ID (content hash of normalized form)

### Stage 2: Normalize

- Convert to canonical internal schema:
  - `skill.card` (Tier 0) from frontmatter
  - `skill.spec` (Tier 1) from body
  - `skill.resource_pack` references extracted
- Validate required fields present
- Reject if normalization fails (malformed YAML, missing required fields)

### Stage 3: Static Lint

Automated checks that don't require execution:
- **Metadata size budget:** SkillCard ≤ ~100 tokens (or byte limit)
- **Forbidden tools:** No tools in `tool_scopes` that are prohibited for the declared `risk_class`
- **Required acceptance checks:** At least one acceptance_check present and non-empty
- **No hardcoded secrets:** Static scan for API keys, tokens, credentials
- **Frontmatter completeness:** All required fields (`name`, `risk_class`, `version`) present

### Stage 4: Petri-Style Eval Pack Run

Execute the skill in a sandboxed environment:
- **Golden path:** Does the skill complete its primary use case?
- **Common failure path:** Does it fail gracefully on expected edge cases?
- **Prompt injection attempts:** Does it resist injected adversarial prompts?
- **Scope creep:** Does it attempt to use tools not in `tool_scopes`?
- **Side effects:** Does it mutate state outside its declared scope?

### Stage 5: Sign + Store

If all prior stages pass:
- **Sign:** Generate signature with Entif key (or multi-sig for high-risk skills)
- **Store:** Publish to all three storage layers:
  - SQL: SkillCard for faceting
  - Vector: `one_line + triggers + summary` for similarity search
  - Graph: dependency/conflict edges, category taxonomy
  - Object store: full Tier 1 + Tier 2 artifacts

### Stage 6: Enable

- Set `certified=true` in the skill's metadata
- Record `certified_at` timestamp and `certified_by` (key/id)
- Skill now appears in broker queries
- Emit onboarding receipt: `{ skill_id, certified_at, eval_pack_results }`

## Failure Handling

If any stage fails:
- Skill enters **quarantine state** (not deleted, but not available)
- Failure reason is recorded as a receipt: `{ skill_id, stage, failure_reason, eval_output }`
- Operator notification (if automated) or manual review queue (if human-in-the-loop)
- Skill can be re-submitted after fixes

## Relationship to skillpack-importer-quarantine-flow

The existing `skillpack-importer-quarantine-flow` issue covers: Parse → Classify → Quarantine → Certify → Promote.

This SLD-006 is the runtime/cold-ingestion pipeline. The skillpack importer is pre-ingestion. They share the quarantine and certify stages but have different entry points.

**Recommendation:** Unify the quarantine/certify logic as a shared `skill_certification_service` used by both the importer and the cold-ingestion pipeline.

## Acceptance Criteria

- [ ] 6-stage pipeline is implemented as a composable pipeline (each stage is independently testable)
- [ ] Static lint rejects skills with SkillCard > ~100 tokens
- [ ] Petri eval pack runs in sandboxed environment (no side effects on production)
- [ ] `certified=true` is required before broker visibility
- [ ] Failed stages produce structured failure receipts
- [ ] Quarantine state is distinct from "rejected" — quarantined skills can be re-reviewed
- [ ] `skill_certification_service` is a shared component used by both importer and cold-ingestion
- [ ] Signing uses Entif key (not external CA)

## Implementation Notes

- The "Petri-style eval pack" name comes from the source doc's analogy to Petri dish testing: run it in isolation, observe what grows, certify if clean.
- Eval pack should include both positive tests (does it work?) and negative tests (does it resist attacks?).
- High-risk skills (`risk_class = financial | identity | admin`) should require multi-sig signing.

## Dependencies

- SLD-001 (SkillCard schema)
- SLD-008 (Guard enforcement — lint rules come from Guard policy)
- Receipt system (pipeline emits receipts at each stage)
- skillpack-importer-quarantine-flow (unification or clear interface)

## Status

issue-candidate
