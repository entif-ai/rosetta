# Integration Pressure Contract

This reusable contract governs source-to-Rosetta experimental mappings. It is binding when referenced by `rosetta-research-integration-plan` and may be reused by other Rosetta skills. Pressure records remain experimental evidence until adopted through the relevant governance path.

## Contents

- [Fit taxonomy](#fit-taxonomy)
- [Authority, conformance, and maturity](#authority-conformance-and-maturity)
- [Proposal admission gate](#proposal-admission-gate)
- [Experimental crosswalk](#experimental-crosswalk)
- [Specification-pressure finding](#specification-pressure-finding)
- [Positive stability and experimental compositions](#positive-stability-findings)
- [Artifact boundaries and Core escalation](#artifact-and-ownership-boundaries)
- [Code, maturity, licensing, proofs, and regressions](#code-maturity-and-licensing)
- [Prohibited inferences](#prohibited-inferences)
- [GitHub issue contract details](#github-issue-contract-details)
- [Communication lifecycle](#communication-lifecycle)
- [Pre-publication review](#pre-publication-review)
- [Return contract](#return-contract)

## Fit Taxonomy

Assign every substantive crosswalk row exactly one primary fit class. Use secondary notes when semantic and runtime layers differ.

| Classification | Meaning |
| --- | --- |
| `clean-fit` | Current Rosetta semantics and implementation represent the construct directly and intelligibly. |
| `composed-fit` | Multiple current primitives preserve the meaning without material loss. |
| `awkward-fit` | Meaning can be preserved, but the representation is unnatural, redundant, opaque, or difficult to query or validate. |
| `lossy-fit` | A material external distinction cannot be preserved. |
| `runtime-spec-gap` | The specification appears to provide a semantic home that current implementation, schema, or constructors cannot express or validate. |
| `missing-primitive` | No faithful current construct was found. |
| `semantic-collision` | Reusing an existing Rosetta, subsystem, or Pack term would require changing its established meaning. |
| `governance-gap` | A plausible representation exists but lacks an accepted owner, namespace, Pack, or admission route. |

Rules:

- Include `clean-fit` rows as positive stability evidence.
- Do not treat `composed-fit` as failure because several primitives are required.
- Do not infer `missing-primitive` until Core, accepted extensions, Packs, current issues and implementation, and relevant maintained external standards have been searched.
- Do not infer `semantic-collision` from naming discomfort; state the incompatible meanings precisely.
- For `runtime-spec-gap`, name the apparent semantic owner and missing schema, constructor, validator, export, or executable path.
- For `governance-gap`, distinguish `owner-not-yet-found` from `no-owner-found-after-search`; semantic-owner uncertainty is pressure to investigate, not tool or side-effect authority.
- Distinguish specification availability from runtime availability, and the ability to serialize, validate, replay, round-trip, query, and reason.
- Preserve external identifiers and original serialization when translation is lossy or interpretation-sensitive.

## Authority, Conformance, and Maturity

Classify every material source:

| Authority class | Treatment |
| --- | --- |
| Accepted Rosetta authority | Governs Rosetta semantics within its declared scope. |
| Adopted external standard | Governs the external semantics and conformance target for the pinned version and scope. |
| Current executable implementation | Proves only inspected behavior and passing properties. |
| Issue, pull request, prototype, or demo | Non-normative design evidence; never a standard or automatic conformance target. |
| External research or implementation | Source evidence whose own claims, maturity, and authority must be preserved. |
| Collaboration or correspondence record | Evidence of what occurred or was said, never automatic endorsement or semantic authority. |

Apply three independent checks:

1. Preserve Rosetta Core alignment in every proposed integration.
2. Define acceptance and falsification for every experimental prototype.
3. Claim external standards conformance only when a named normative authority, version, scope, and test method exist.

Classify material claims as `proposed`, `experimental`, `specified`, `modeled`, `implemented`, `tested`, `fixture-backed`, `demo-green`, `rung-green`, `production-observed`, `conformant`, or `not-yet-implemented`. Use `conformant` only against an identified accepted contract and use `rung-green` only when every declared capability and gate for that rung passes. Do not infer either from issue closure, a demo, collaborator interest, successful parsing, or a green prototype fixture.

## Proposal Admission Gate

`gate:integration-planner-proposal` is a workflow admission barrier, not a Rosetta protocol kind or semantic authority. Apply it to every issue created by this skill.

While present:

- the issue is proposal-only and non-authoritative;
- agents may inspect it for context or duplicate detection but must not implement from it, make it an owner or dependency for other work, or derive child work from it;
- `priority:*`, `sprint:*`, `size:*`, milestones, project slots, and assignees are prohibited;
- agents must not remove the label;
- other labels do not override the barrier.

Only direct human removal admits the issue to ordinary triage. Removal is not equivalent to implementation approval, standards acceptance, Core authority, or conformance.

Treat publication as fail-closed:

1. Verify the exact label exists before creating the issue.
2. Use an issue-creation path that includes the label in the creation request.
3. Put the required caution banner before `## Summary`.
4. Verify the returned issue carries the label and no prohibited planning metadata.
5. If the preflight or atomic application path is unavailable, return `publication-failed` with `failure_code: proposal-gate-unavailable` and do not create the issue through an unguarded path.

### Simplest-faithful-mapping rule

> The simplest faithful existing mapping wins. Do not manufacture specification pressure by preferring novelty over a clean current owner.

For every `missing-primitive`, `semantic-collision`, or proposed Core-level change, record:

- existing Rosetta owners, extensions, Packs, issues, runtime paths, and external standards considered;
- why reuse and composition were insufficient;
- which maintained external standard, if any, owns the concept;
- a falsification fixture or counterexample that could show no new primitive is necessary.

## Experimental Crosswalk

Use this shape or an equally inspectable equivalent:

| External construct | External source anchor | Rosetta or subsystem owner attempted | Semantic relationship | Fit class | Translation required | Meaning at risk | Runtime support | Owner / follow-up |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

For every row:

- distinguish exact equivalence from partial, broad, narrow, or operational correspondence;
- never present an adapter-local name as canonical Rosetta terminology;
- distinguish `specified`, `modeled`, `implemented`, `tested`, `fixture-backed`, `demo-proven`, `production-observed`, and `not-yet-implemented`;
- state serialization, validation, replay, round-trip, query, and reasoning support separately;
- preserve uncertainty, competing interpretations, external identity, and original serialization where fidelity requires them.

## Specification-Pressure Finding

Every warranted issue must contain a top-level `## Specification pressure findings` section. Preserve at least:

```yaml
finding_id: pressure-001
classification: awkward-fit
external_construct: ...
source_evidence:
  - paper section/page/figure/table/appendix/code path/commit
rosetta_primitives_attempted:
  - ...
runtime_paths_attempted_or_inspected:
  - ...
observed_friction: ...
meaning_at_risk: ...
suspected_layer:
  - specification | schema | implementation | pack-boundary | governance | tooling | documentation | interpretation
pressure_maturity:
  status: isolated | recurring | severe-counterexample
  corroborating_refs: []
candidate_improvement: ...
alternatives_considered:
  - ...
why_existing_owner_is_insufficient: ...
tradeoffs:
  - ...
falsification_fixture: ...
owner_refs:
  - issue / RFC / Pack / package / schema
```

### Pressure maturity

- `isolated` — observed in this integration without independent corroboration.
- `recurring` — materially similar pressure is anchored in one or more independent integrations or domains; list every corroborating reference.
- `severe-counterexample` — one bounded example exposes a plausible constitutional defect or unacceptable meaning loss even without recurrence; state why severity, not novelty, warrants escalation.

Do not label pressure `recurring` merely because several rows in one integration share a cause. Corroboration must be independently anchored. Do not use `severe-counterexample` as a synonym for importance. A maturity label is evidence metadata, not an automatic escalation decision.

Every material pressure requires a fixture capable of confirming or falsifying the suspected problem. Link findings to existing owners and state whether adoption remains experimental, Pack-local, or separately governed.

## Positive Stability Findings

Every warranted issue must report important `clean-fit` and central `composed-fit` results. Name the construct, source anchor, Rosetta owner, runtime evidence, preservation fixture where material, and why the result supports stability or a reusable recipe.

Use stability evidence to counter novelty bias, identify primitives that should remain stable, reveal successful composition patterns, and compare clean-fit recurrence across independent domains. Do not score issue quality by gap count or require equal clean and strained mappings.

## Experimental Compositions

When current primitives appear sufficient only through a novel composition:

- preserve and label the composition experimental;
- explain why it may be preferable to a new primitive;
- test queryability, meaning preservation, round-trip behavior, or conformance;
- record reuse by independent integrations.

Repeated success may justify documentation, a recipe, Skill behavior, or Pack helper before Core semantics.

## Artifact and Ownership Boundaries

The recommendation may be a suite.

| Artifact | Owns |
| --- | --- |
| Rosetta Pack | Reusable manifests, vocabulary, schemas, mappings, validation, conformance, fixtures, and governed companion assets. |
| Skill | Procedural reasoning, translation, discovery, and evaluation recipes. |
| Runtime adapter | Governed invocation of external software, models, simulators, or tools and I/O normalization. |
| Interoperability Profile | Constrained, versioned mapping to one upstream standard, product, or research implementation; use Rosetta `Profile` only for genuine conformance meaning. |
| Projection adapter | Loss-aware import, export, or view mapping without constitutional ownership. |
| Research track | Experiments whose representation is not mature enough for normative packaging. |
| Core change | Constitutional semantics, only after repeated or severe evidence shows composition and Pack/extension ownership are insufficient. |

Inventory manifests, schemas, mappings, prompts, evaluators, examples, adapters, and reference implementations before selecting the suite. Assign each deliverable to its proper owner; prompts, evaluators, examples, and reference implementations may be Pack companion assets when the governing Pack contract permits, but they do not give the Pack ownership of runtime orchestration or procedural reasoning.

Appendices, protocols, reference implementations, and documentation may supplement the suite. Do not overload a Pack with runtime orchestration, a Skill with canonical semantics, or a projection/adapter with constitutional authority.

## Core Escalation

A single integration difficulty does not justify Core mutation. Prefer, where faithful:

```text
reuse -> composition -> external standard -> Pack/Profile/adapter
      -> experimental composition -> governed Core escalation
```

- Accumulate repeated pressure across independent integrations where possible.
- Preserve isolated severe counterexamples without treating them as automatically dispositive.
- Route suspected Core gaps to separate governed issues by default.
- Keep the integration actionable without assuming approval.

Every escalation states repeated or severe evidence, failed compositions, compatibility/migration impact, competing standards/owners, minimal semantic delta, and falsification criteria.

## Code, Maturity, and Licensing

When code or executable artifacts exist, record:

- repository URL and pinned tag/release/commit when practical;
- actual public APIs and paper-described capabilities absent from public code;
- reusable files/modules/classes/functions/schemas/tests/fixtures, integration seams, required wrappers or adapters, and components that must be reimplemented;
- dependency, platform, hardware, sandbox, network, and runtime constraints;
- model, checkpoint, dataset, benchmark, configuration, and asset identity;
- separate paper, code, data, model/checkpoint, benchmark, and asset licenses or terms;
- maturity risks including no releases, unstable APIs, weak tests, unavailable artifacts, or research-only assumptions.

Do not equate paper architecture with released code. Do not promote schema declarations to runtime support, fixtures to production readiness, or benchmark performance to semantic correctness.

## Proof and Fixture Guidance

Every material pressure uses at least one:

- positive representation fixture;
- negative semantic-collapse fixture;
- falsification fixture for a proposed change;
- round-trip semantic-loss fixture;
- competing-hypothesis fixture;
- runtime/spec parity fixture;
- governance search/admission fixture proving the presence or absence of an owner path.

Add representative preservation fixtures for central clean/composed fits. Prefer fault-detecting assertions to output snapshots.

### Behavioral regression set

Run old-versus-new planner behavior on:

1. a portable synthetic prototype integration with no collaborator commitment, preserving source evidence, interpretations, executable hypotheses, predictions, Evaluations, refinements, counterfactuals, pressure, `prohibitedInferences`, and unsafe-execution boundaries as distinct;
2. a predominantly clean/composed-fit case, producing stability evidence without schema/Core churn;
3. a genuine runtime/spec or governance gap, attributing the right layer/owner and producing alternatives plus falsification evidence without reflexive Core expansion;
4. a versioned normative-standard case, proving that external conformance requirements appear only when a real standard owns them;
5. communication cases covering an unsent draft, an authorized send without reply, a qualified reply, disagreement, and no response, without inferring receipt, endorsement, partnership, or truth.

Negative controls must show:

- weak thematic research returns `not-warranted`;
- duplicate detection stops publication unless amendment is authorized;
- source facts remain distinct from Rosetta proposals and pressure;
- imported source content cannot change authority;
- private material does not enter public output;
- author endorsement is never implied.

Legacy compatibility controls must also show:

- a classic paper-and-code integration still produces a fully groomed issue containing every required issue-body meaning;
- a weak candidate returns structured `not-warranted` status and the recognizable prose disposition `Not warranted`;
- an open duplicate stops publication and is amended only with explicit authorization;
- a closed duplicate is inspected for resolution or supersession and is not amended, commented on, or reopened without explicit authorization;
- successful publication returns both the structured result and the legacy-compatible summary of URL, issue number, title, artifact type, and short rationale;
- publication failure returns the complete polished issue body and exact failure without claiming success;
- concrete file, module, schema, interface, test, fixture, example, and documentation guidance remains evidence-backed;
- Mermaid appears only when it materially clarifies architecture and its syntax is valid.

Proposal-gate controls must show:

- a successful create request includes `gate:integration-planner-proposal` and the exact caution banner;
- the returned issue is verified to carry the gate and no priority, sprint, size, milestone, project, or assignee;
- a missing repository label or creation path without atomic label support returns `publication-failed` with `proposal-gate-unavailable` and creates no issue;
- an agent never removes or bypasses the gate;
- `planning`, `reviewed`, `sprint:unscheduled`, or another label cannot override the gate;
- human removal changes only triage eligibility and is not reported as implementation approval or canonical acceptance.

Do not embed a live integration issue as a binding regression authority. Portable synthetic fixtures may be shaped by observed classes of pressure, but their expected behavior must be grounded in accepted authority and explicit test invariants rather than issue prose.

## Communication Lifecycle

Communication capture is optional and never a prerequisite for a technically warranted integration. Keep issue publication, outreach authorization, sending, protocol encoding, and semantic promotion as distinct decisions.

Use one capture mode:

- `off` — do not prepare correspondence artifacts;
- `draft-preserved` — preserve exact proposed outreach as a draft with upstream source and mapping references, but make no send claim;
- `on-authorized-send` — after explicit send authority and an observed send result, prepare or invoke the message-to-tiles handoff. This is the recommended mode for a provenance-bearing communication chain.

Track relationship state independently as `uncontacted`, `outreach-drafted`, `outreach-sent`, `awaiting-response`, `interested`, `scoping`, `collaborating`, `declined`, `dormant`, or `unknown`. Relationship state is an operational projection, not scientific confidence or semantic authority.

The chain may begin before a reply:

```text
external source -> initial mapping / Conjecture
                -> exact outbound message artifact
                -> authorized-send Run / Action / ToolCall
                -> bounded transport Receipt, only if actually attested
                -> awaiting response
                -> exact inbound Observation
                -> anchored interpretation / Evaluation
                -> revised Conjecture with lineage
```

Use source-aware records and immutable Observations for exact inbound signals. Keep interpretation separate and source-anchored. Preserve the original Conjecture when new feedback produces a revision. A Receipt proves only its stated bounded occurrence or integrity claim. Never infer delivery, reading, agreement, endorsement, partnership, or truth unless separately evidenced within the exact scope claimed.

When outreach is in scope, return an optional handoff containing:

```yaml
communication_handoff:
  capture_mode: off | draft-preserved | on-authorized-send
  relationship_status: ...
  source_refs: []
  initial_mapping_refs: []
  exact_outbound_message: ...
  send_authorized: false
  send_observation_ref: null
  prohibited_inferences: []
  next_expected_event: ...
```

The planner prepares this handoff; a dedicated message-to-tiles workflow may encode it after the relevant authority boundary is satisfied. Do not create transport ToolCalls or Receipts for a draft or an unobserved send.

## Prohibited Inferences

Every warranted issue contains concise, integration-specific prohibited inferences. Generate them from actual evidence and failure modes. Consider: an issue or prototype is not a standard; no author endorsement or collaborator commitment; benchmark performance is not semantic correctness; simulator agreement is not unique causation; a Receipt proves only its bounded claim, not truth; inferred mapping is not ontology equivalence; generated artifacts are not historical observation; checkpoints are not stable APIs; test-vector conformance is not production fitness; successful parsing/execution does not authorize side effects.

## GitHub Issue Contract Details

The complete required issue-body list lives in the main `SKILL.md` and is binding. Do not duplicate or weaken that list here. Use a precise title describing the proposed integration artifact, not the source alone. Name files, packages, schemas, constructors, tests, fixtures, documentation, and owners only where evidence supports them. Acceptance criteria must be observable and traceable; prefer `Given <state>, when <behavior>, then <result> is observable through <test>`.

## Pre-Publication Review

Before publication, answer every applicable check and correct or stop on failure.

### Evidence hygiene

- Are source facts, proposals, and pressure findings distinct?
- Are code claims grounded in inspected code?
- Are anchors reproducible and identities pinned where practical?
- Are paper/code/data/model/checkpoint/benchmark/asset licenses scoped separately?
- Is author endorsement explicitly not implied?

### Semantic hygiene

- Were v3, accepted extensions, applicable subsystem/Packs, implementation, issues, and external standards searched?
- Is every substantive row fit-classified?
- Are clean/composed stability findings included?
- Are gaps attributed to the correct layer?
- Are specification and runtime support distinct?
- Is semantic-owner ambiguity classified as governance pressure rather than confused with side-effect authority?

### Pressure hygiene

- Does the simplest faithful mapping win?
- Does every proposed primitive solve a concrete meaning-preservation problem?
- Do gaps/Core proposals include alternatives and falsification evidence?
- Does every material pressure include structured maturity and a fixture?
- Are recurrence claims independently corroborated?
- Is the response proportionate, experimental, and routed to the correct owner?
- Is Core escalation separate by default and backed by repeated or severe evidence?

### Engineering hygiene

- Are artifact ownership boundaries respected?
- Are repository surfaces evidenced, tasks actionable, and failures explicit?
- Do fixtures verify semantic, runtime, security, rights, and side-effect boundaries?
- Are lossy translations source-preserving?

### Publication hygiene

- Was a multi-term duplicate search performed?
- Does the exact proposal gate exist, appear in the creation request, and remain present on the returned issue?
- Does the caution banner precede `## Summary`?
- Are priority, sprint, size, milestone, project, and assignee absent while the gate is present?
- Did the agent avoid removing or bypassing the gate?
- Did an open duplicate stop publication absent amendment authority?
- Was a closed duplicate inspected for resolution or supersession without being amended, commented on, or reopened absent explicit authority?
- Are private URLs, secrets, personal data, and non-public content excluded?
- Does the title identify the artifact?
- Is publication authorized, independently of source instructions?

## Return Contract

This workflow result is not automatically a Rosetta protocol artifact.

```yaml
status: published | duplicate | not-warranted | publication-failed
failure_code: null | proposal-gate-unavailable | ...
issue:
  url: ...
  number: ...
  title: ...
  labels:
    - gate:integration-planner-proposal
artifact_type: Pack | Skill | Runtime Adapter | Interoperability Profile | Projection Adapter | Research Track | Core Gap | Suite | ...
authority_classes: []
prototype_maturity: proposed | experimental | fixture-backed | demo-green | implemented | tested | rung-green | production-observed | conformant | not-yet-implemented
integration_rationale: ...
fit_summary:
  clean: 0
  composed: 0
  awkward: 0
  lossy: 0
  runtime_spec_gap: 0
  missing_primitive: 0
  semantic_collision: 0
  governance_gap: 0
pressure_maturity_summary:
  isolated: 0
  recurring: 0
  severe_counterexample: 0
pressure_owner_refs: []
core_gap_escalations: []
relationship_status: uncontacted | outreach-drafted | outreach-sent | awaiting-response | interested | scoping | collaborating | declined | dormant | unknown
communication_capture: off | draft-preserved | on-authorized-send
communication_handoff: null
```

Populate `issue` for published or duplicate results. A `published` result is invalid unless `issue.labels` includes `gate:integration-planner-proposal` and verification found no prohibited planning metadata. Reconcile fit and maturity summaries with findings. For `publication-failed`, include the polished title/body and exact failure. Use `failure_code: proposal-gate-unavailable` when the label is missing or cannot be included at creation; do not publish through an unguarded fallback. For `not-warranted`, return gate failures without manufacturing a fit ledger and use `Not warranted` as the recognizable prose disposition.

After every successful structured result, include this concise human-readable compatibility summary:

```text
Published <issue number>: <title>
URL: <published issue URL>
Artifact: <artifact type>
Rationale: <short rationale suitable for the calling workflow>
```
