# Genesis

**Version:** 0.2-draft  
**Status:** Proposed operating doctrine  
**Date:** 2026-08-29  
**Authority class:** Cross-project operating default, subordinate to higher authorities  
**Supersedes:** `0.1-draft` only if this revision is accepted  
**Scope:** Entif, Rosetta, and software or research projects that explicitly adopt this document  
**Audience:** Human and agentic contributors, reviewers, maintainers, researchers, operators, collaborators, and decision-makers

> Build the smallest honest thing that creates real value, prove it under contact, preserve what it means, and leave the next change safer, cheaper, and clearer than the last.

## 1. Purpose

Genesis defines the default way Entif projects are conceived, researched, designed, implemented, tested, documented, reviewed, released, operated, learned from, and revised.

It is neither a protocol specification nor a universal substitute for judgment. It does not replace law, safety duties, product requirements, Rosetta constitutional specifications, security policy, architecture decisions, incident controls, or domain standards. It supplies shared defaults where those authorities are silent, a common language where they overlap, and a disciplined method for recording exceptions when local context requires something else.

Genesis exists to prevent recurring failure patterns:

1. ambitious ideas accumulating faster than executable proof;
2. raw evidence, interpretation, conjecture, decision, and marketing language collapsing into one undifferentiated claim;
3. maintained public standards being rebuilt as expensive private doctrine;
4. tools, frameworks, metrics, ceremonies, or personalities becoming sacred after their original context has disappeared;
5. plans optimizing for inventory, activity, or apparent sophistication instead of user or research progress;
6. security, privacy, rights, accessibility, reliability, provenance, or maintainability being quietly spent to buy speed;
7. tests, dashboards, documentation, and generated prose producing confidence without corresponding truth;
8. teams depending on heroics, private context, ambient credentials, or irreplaceable individuals;
9. releases becoming too large to review deeply, reverse safely, or learn from cleanly;
10. local success being mistaken for interoperability, conformance, production fitness, or universal validity.

Genesis should remain smaller than the body of practice it governs. A durable rule belongs here only when reference to a maintained external authority, a narrower project profile, or a local decision record would be insufficient.

## 2. How to use this document

Genesis contains four kinds of guidance:

- **Invariant:** a cross-project rule that protects a durable value or boundary.
- **Default:** the ordinary choice when evidence does not justify deviation.
- **Profile hook:** a place where a project, domain, maturity rung, or risk class must supply narrower rules.
- **Example:** a non-authoritative illustration of how a rule may be implemented.

Projects that adopt Genesis SHOULD declare:

- the Genesis version adopted;
- the project authorities that outrank it;
- applicable profiles and external standards;
- material exceptions;
- the owner and review condition for each exception;
- where implementation evidence and operating receipts are stored.

A project MUST NOT convert every recommendation in Genesis into ceremony. The objective is governed effectiveness, not procedural pageantry.

## 3. Normative language and authority

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **NOT RECOMMENDED**, **MAY**, and **OPTIONAL** in this document are to be interpreted as described in BCP 14, RFC 2119 and RFC 8174, when, and only when, they appear in all capitals.

### 3.1 Precedence

When authorities conflict, use this order unless a stronger applicable authority requires otherwise:

1. applicable law, immediate human safety duties, incident controls, and binding security, privacy, accessibility, contractual, or regulatory obligations;
2. ratified Rosetta or Entif constitutional specifications, signed policies, and explicit authority or governance artifacts;
3. current product-specific PRDs, RFCs, ADRs, threat models, release gates, and accepted commitment records;
4. this Genesis document and an explicitly adopted Genesis profile;
5. repository-local conventions, team preferences, tool defaults, and implementation convenience.

A lower authority MUST NOT silently weaken a higher one. A narrow later decision does not erase a broader invariant merely because it is newer.

### 3.2 Supersession and conflict

Supersession MUST be explicit, scoped, reviewable, and migration-safe. A superseding artifact SHOULD identify:

- the authority or rule being replaced;
- the precise scope of replacement;
- the reason and evidence;
- compatibility and migration consequences;
- effective date;
- rollback or reversal path;
- unresolved dissent or uncertainty.

When uncertainty remains, preserve it. Prefer the safer reversible path, record governing evidence and assumptions, and require review before crossing a one-way boundary.

### 3.3 Local adaptation

Genesis is a strong default, not a claim that context is irrelevant. A project MAY deviate when the deviation produces a better contextual outcome without violating a higher authority. Material deviations follow the exception contract in Section 28.

## 4. Operating axioms

The following axioms supply the shortest interpretation of Genesis.

### 4.1 Value before volume

Work is valuable because it advances a user, research, safety, operational, or interoperability outcome, not because it creates many artifacts, issues, commits, meetings, agents, abstractions, or lines of code.

### 4.2 Evidence before confidence

Confidence MUST NOT outrun the quality, independence, relevance, and recency of supporting evidence. Several sources that repeat one origin remain one evidentiary lineage.

### 4.3 Preserve evidence and uncertainty

Raw source, observation, interpretation, conjecture, decision, evaluation, and projection remain distinguishable. A later interpretation MUST NOT overwrite the evidence from which it was derived.

### 4.4 Prefer the smallest honest proof

Choose the least complicated step that materially advances the next important claim, produces inspectable evidence, and leaves a useful seam for what follows.

### 4.5 Inherit public wisdom before inventing private law

Adopt, configure, compose, extend, and only then invent. Popularity is evidence of operational contact, not proof of fitness. Novelty is permitted, but it carries a permanent ownership tax.

### 4.6 Compose behavior and bound mutation

Prefer explicit data flow, narrow contracts, replaceable components, and immutable state. Necessary mutation belongs inside an accountable ownership boundary.

### 4.7 Centralize invariants; federate execution

Shared semantic, safety, identity, evidence, and interoperability rules may be centralized. Implementation and experimentation SHOULD remain as autonomous as those invariants safely permit.

### 4.8 Make side effects authorized, bounded, observable, and recoverable

An operation that changes external state, authority, rights, money, identity, published content, or durable data requires proportionate authorization, evidence, postcondition verification, and recovery semantics.

### 4.9 Treat implementation as a research instrument

Running code, fixtures, schemas, workbench commands, user trials, and interoperability experiments are not packaging after the theory. They are how the theory earns correction or trust.

### 4.10 Optimize systems, not heroic individuals

Exceptional leverage should be captured in tools, tests, documentation, interfaces, coaching, and reusable methods. Exhaustion, visibility, or irreplaceability are not evidence of excellence.

### 4.11 Metrics serve decisions

A metric is useful only while it informs a real decision without materially distorting the behavior it observes.

### 4.12 Reversibility is a strategic asset

Small changes, compatibility seams, feature flags, shadow modes, staged rollout, migration plans, and rollback preserve freedom to learn.

### 4.13 Contact outranks self-description

A system earns claims through use, failure, adversarial testing, external collaboration, and independent reproduction. Internal elegance is not external validation.

## 5. Governing priority ladder

Some obligations, including applicable law and immediate human safety, are constraints rather than tradeable priorities. Within ordinary product, research, and engineering trade space, apply the following order.

### 5.1 Security, privacy, rights, and trustworthy control

Security is a product property, not a finishing pass. It includes confidentiality, integrity, availability, authorization, privacy, provenance, supply-chain integrity, abuse resistance, containment, safe failure, recovery, and accountable control.

A system that is elegant, accessible, fast, and compromised has failed.

Lower priorities MUST NOT spend security, privacy, rights, or safety without an explicit exception naming the risk, owner, compensating controls, expiry, rollback, and review authority.

### 5.2 Accessibility, open standards, and lawful interoperability

Interfaces MUST be usable by people with disabilities and SHOULD prefer open, stable, interoperable standards over proprietary conventions.

Accessibility and interoperability are architecture inputs. They are not polish applied after implementation.

### 5.3 Reliability, performance, and resource efficiency

Dependable, responsive systems preserve attention, reduce cost and waste, narrow attack surfaces, and improve accessibility. Projects MUST define reliability and performance expectations appropriate to the user journey, workload, and risk.

### 5.4 Usability and cognitive clarity

People and agents should be able to determine what exists, what is authoritative, what is interactive, what an action will do, what changed, what failed, what is stale, what can be reversed, and where evidence came from.

### 5.5 Aesthetics, novelty, and convenience

Aesthetics, novelty, and convenience matter. They remain subordinate to the tiers above. Beauty should clarify structure rather than disguise it. Novelty must earn its implementation and maintenance cost.

### 5.6 Trade-off rule

When two desirable outcomes conflict, the decision record MUST name:

- the outcomes in tension;
- the governing priority and authority;
- affected people and systems;
- evidence and uncertainty;
- the least harmful reversible option;
- the condition that would cause reconsideration.

## 6. Epistemic integrity and truthful maturity

### 6.1 Claim classes

Material statements SHOULD be classifiable as one of the following:

- **source:** preserved external or original material;
- **observation:** what was directly measured, received, or recorded;
- **inference:** a conclusion derived from observations;
- **hypothesis:** a falsifiable proposed explanation or expectation;
- **aspiration:** a desired future condition;
- **decision:** an authorized commitment under stated evidence and constraints;
- **result:** an observed outcome of an action or experiment;
- **evaluation:** a judgment under an explicit rubric;
- **projection:** a derived view, cache, index, summary, or rendering.

Interfaces, documents, logs, and APIs SHOULD preserve these distinctions whenever collapsing them could mislead a reader, operator, model, or downstream system.

### 6.2 Capability maturity vocabulary

Use scoped maturity language rather than the word `done` as a fog machine.

| Term                        | Minimum meaning                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **proposed**                | An idea or candidate rule exists; no accepted contract is implied.                                            |
| **specified**               | A reviewable contract, behavior, or acceptance model exists.                                                  |
| **modeled**                 | A representation exists, but complete live behavior may not.                                                  |
| **implemented**             | Executable behavior exists on the named surface.                                                              |
| **tested**                  | Named behavior is covered by meaningful checks on the stated environment.                                     |
| **fixture-backed**          | Real code executes over controlled non-live inputs.                                                           |
| **demo-proven**             | A bounded end-to-end path has been independently reproduced.                                                  |
| **conformant**              | A named conformance suite and version pass on the stated profile.                                             |
| **interoperability-proven** | Independent implementations or foreign systems exchanged the stated semantics with bounded, recorded loss.    |
| **release-candidate**       | Declared release gates pass and remaining risks are explicit.                                                 |
| **production-observed**     | The capability has operated under named real conditions with evidence.                                        |
| **production-hardened**     | Sustained operation, incident learning, recovery exercises, and risk-appropriate assurance support the claim. |
| **rung-complete**           | Every declared capability and assurance gate for a named maturity rung has passed.                            |

Projects MAY use a smaller vocabulary, but MUST NOT use a broader term to imply evidence they do not possess.

### 6.3 Demo Green and Rung Green

**Demo Green** means a bounded, honest vertical slice works and can be reproduced.

**Rung Green** means every declared capability, assurance, documentation, conformance, and operational gate for the named maturity level has passed.

Frequent Demo Green milestones are encouraged. They MUST NOT be represented as Rung Green, production fitness, or general interoperability.

### 6.4 Negative knowledge

Known gaps, failed experiments, incompatible mappings, abandoned approaches, and unresolved contradictions are useful knowledge. Preserve them with enough context to prevent rediscovery or accidental resurrection.

A failed result does not automatically invalidate a concept outside the tested context. Record local utility separately from cross-context survivorship.

## 7. Adopt, configure, compose, extend, invent

The default order is:

1. **adopt** a maintained standard, library, framework, pattern, or service;
2. **configure** it;
3. **compose** it with compatible components;
4. **extend** the smallest stable seam;
5. **invent** only the irreducible remainder.

### 7.1 Suitability test

A candidate is sufficient when it is aligned enough, maintained enough, secure enough, current enough, interoperable enough, and adaptable enough to exceed the project quality threshold without disproportionate risk.

Evaluate at least:

- fitness to the actual job;
- maintenance health and governance;
- security and privacy posture;
- standards alignment and interoperability;
- accessibility consequences;
- licensing and data rights;
- reliability and operational burden;
- performance and resource cost;
- testability and observability;
- migration, portability, and exit path;
- lock-in and lifetime ownership cost;
- compatibility with higher invariants.

### 7.2 Invention burden

Before creating a bespoke alternative, the proposal MUST identify:

- the closest maintained alternatives;
- the exact unmet requirement;
- why configuration, composition, adaptation, or a narrow fork is insufficient;
- the smallest experiment that can test the deficiency;
- new security, maintenance, interoperability, and documentation surfaces;
- migration and abandonment paths;
- who will own the result after the exciting part ends.

Do not rewrite a mature library to obtain one missing method. Add the method, adapter, plugin, wrapper, translator, or narrowly governed fork unless evidence establishes a larger break.

### 7.3 Standards lifecycle

External standards and dependencies MUST be adopted by named version or dated profile. A moving URL does not silently amend local law.

Projects SHOULD distinguish:

- stable adopted baseline;
- newer stable candidate under evaluation;
- draft or experimental guidance;
- deprecated baseline with a migration plan.

Draft guidance MAY inform experiments. It MUST NOT be represented as stable conformance law.

### 7.4 Battle-tested is evidence, not a veto

Operational history, adoption, ecosystem depth, and maintenance longevity are strong evidence. They do not forbid a newer approach when comparative evidence shows materially better fitness and the migration risk is controlled.

## 8. Architecture doctrine

### 8.1 Boundaries make systems trustworthy

Every important system MUST identify:

- source or sources of truth;
- derived projections, summaries, indexes, and caches;
- read and write authorities;
- identity, tenant, classification, and rights domains;
- trust and validation boundaries;
- side-effect boundaries;
- failure, retry, cancellation, and recovery boundaries;
- version, compatibility, and migration boundaries;
- observability and receipt boundaries.

Do not collapse distinct facts because one datastore, model, object, prompt, or interface can hold them.

In Rosetta terms, source material, observations, interpretations, conjectures, promoted artifacts, evaluations, receipts, caches, temporal projections, and activation state remain distinct unless an accepted specification defines their relationship.

Raw source evidence MUST NOT be overwritten by interpretation. Derived artifacts MUST retain reversible support handles to source spans, artifacts, receipts, or other admissible evidence. Rights MUST be enforced before retrieval or disclosure. Retrieve-then-filter is forbidden for scoped or sensitive material.

### 8.2 Composition and bounded mutation

Prefer object composition, explicit data flow, small functions, stable schemas, and narrow interfaces over deep implementation inheritance and hidden shared state.

State SHOULD be immutable by default. Necessary mutation MUST remain inside an explicit ownership boundary and SHOULD produce an attributable state transition.

Inheritance is an exception rather than a taboo. It requires evidence that substitutability is genuine, the hierarchy is shallow and stable, lifecycle ownership is clearer than composition, and tests protect the contract. Taxonomy alone is not a reason to create a class hierarchy.

### 8.3 Deterministic core and isolated effects

Prefer a functional core with an imperative shell.

Deterministic operations SHOULD accept explicit inputs and produce explicit outputs. Side effects SHOULD be isolated behind typed, policy-aware interfaces.

Randomness, model inference, current time, network state, environment state, nondeterministic concurrency, and human judgment MUST be represented as inputs or evidence when they materially affect a result.

A successful return code is not proof of a successful outcome. Verify the postcondition.

### 8.4 Source of truth versus projection

Caches, search indexes, embeddings, summaries, dashboards, generated documentation, materialized views, model context, and UI state are projections unless an authority explicitly declares otherwise.

Every projection SHOULD declare:

- source lineage;
- derivation version;
- freshness or staleness semantics;
- invalidation and rebuild behavior;
- rights domain;
- tolerated loss;
- whether it may influence or mutate canonical state.

### 8.5 Build once, promote the same artifact

Release candidates SHOULD be built once and promoted through environments without rebuilding mutable content. Environment-specific configuration and credentials SHOULD be injected at controlled boundaries.

When exact artifact promotion is impossible, the project MUST record why and provide evidence that rebuilt artifacts are equivalent under the relevant contract.

### 8.6 Data evolution

Schema and data changes MUST distinguish forward migration, backward compatibility, rollback, compensation, and replay.

Irreversible mutation requires an explicit decision, backup or preservation strategy, validation plan, and recovery limits. Append-only history, event journaling, content addressing, migration receipts, and grave-stoning are preferred where they protect auditability without creating unjustified operational burden.

### 8.7 Architecture diagrams

Diagrams are navigational aids, not sources of truth. A diagram SHOULD name its scope, date or version, omitted concerns, and authoritative contracts. It MUST NOT be treated as current merely because it remains visually persuasive.

### 8.8 Replaceability

A replaceable component has a bounded contract, conformance fixtures, observed dependencies, migration semantics, and an exit path. Calling a component modular without those properties does not make it so.

### 8.9 Deployable boundaries

Choose whether a capability belongs in a module, package, process, worker, service, application, or independently deployed site by examining change coupling, authority, data ownership, failure isolation, scaling, compliance, and team ownership.

Splitting a system creates network, deployment, observability, consistency, and operating costs. Keeping it together creates coupling and blast-radius costs. Neither monolith nor microservice is a moral category.

Independently deployed surfaces SHOULD preserve a coherent user experience and shared constitutional contracts without requiring shared release cadence or ambient access to unrelated data.

## 9. Start from the job and the proof

### 9.1 Job contract

Every major increment SHOULD identify:

- the person, agent, collaborator, system, or research program served;
- the progress they are trying to make;
- the current workaround or failure mode;
- the smallest useful outcome;
- the first-success path;
- evidence that progress occurred;
- security, rights, accessibility, and operational constraints;
- what the increment deliberately does not solve.

Technical elegance without realized utility remains an unproven conjecture.

### 9.2 Research contract

A research increment SHOULD identify:

- question or hypothesis;
- prior evidence and competing explanations;
- smallest representable claim or contract;
- experiment or executable artifact;
- acceptance and falsification criteria;
- expected information gain;
- cost and stopping conditions;
- how the result changes the next decision.

### 9.3 Outcome hierarchy

Prefer evidence in this order when applicable:

1. user or ecosystem progress;
2. correct and safe behavior under representative conditions;
3. independently reproducible evidence;
4. conformance or interoperability evidence;
5. internal output volume or activity.

Lower-order evidence can support a claim. It should not impersonate a higher-order outcome.

## 10. Roadmaps follow proofs, not inventories

A backlog is a knowledge base of researched possible moves, not a queue that commands execution.

### 10.1 Valuable versus unblocking work

Distinguish:

- **valuable work:** likely to improve the eventual system;
- **unblocking work:** required for the next important proof, decision, user outcome, or honest maturity claim.

Valuable work can remain deliberately dormant. Unblocking work receives active sequencing pressure.

### 10.2 Execution Spine

Each active roadmap SHOULD maintain a small Execution Spine containing the leaf work that forms the shortest credible dependency path from current proof to next proof.

Default states:

- `now`;
- `next`;
- `later`;
- `blocked`.

An item belongs on the spine when its absence prevents the next declared proof, makes the claim dishonest, or imposes unacceptable risk.

Parent maps, research epics, and broad coordination issues remain useful. They SHOULD NOT occupy `now` unless the parent itself produces an executable decision or artifact.

### 10.3 Minimum sufficient dependency closure

Do not complete an entire dependency graph before testing its next useful path. Implement the minimum closure required to run, inspect, falsify, and learn from the next proof.

A dependency is not automatically urgent because it is upstream in an imagined final architecture. Its urgency depends on the next evidence-producing slice.

### 10.4 Work granularity

A good slice:

- has one coherent outcome;
- changes as few independent assumptions as practical;
- can be reviewed deeply;
- has observable acceptance and failure criteria;
- includes the evidence necessary to trust it;
- preserves rollback or compensation;
- leaves the repository and roadmap more legible.

Split by independently verifiable behavior, not by arbitrary file count or organizational boundary. Avoid horizontal layers that produce months of invisible plumbing without an end-to-end proof.

### 10.5 Pressure signals

External collaboration, user friction, incidents, failed mappings, repeated support needs, and experiments may produce pressure signals such as:

- missing primitive;
- ambiguous contract;
- representation mismatch;
- translation loss;
- absent query or tool;
- rights or identity conflict;
- falsification case;
- incompatible evidence model;
- reusable fixture, adapter, or procedure.

Pressure signals SHOULD map to existing work before new architecture is created. Repeated independent signals increase priority.

## 11. The evidence-bearing change lifecycle

Genesis does not prescribe Scrum, Kanban, Shape Up, or another complete delivery method. It prescribes a learning and control loop that any suitable method must preserve.

### 11.1 Lifecycle

A material change ordinarily moves through these states:

1. **sense:** observe a need, defect, opportunity, risk, or contradiction;
2. **orient:** locate authority, evidence, prior work, dependencies, and affected people;
3. **frame:** state the job, hypothesis, boundaries, and smallest proof;
4. **decide:** authorize a proportionate commitment and define acceptance and falsification criteria;
5. **isolate:** create a bounded branch, experiment, sandbox, or feature path;
6. **implement:** make the smallest coherent change;
7. **verify:** test behavior, failure, security, rights, accessibility, compatibility, and documentation as applicable;
8. **review:** challenge the highest-risk assumptions and inspect the evidence;
9. **integrate:** merge or otherwise accept through the governing authority;
10. **release:** promote a known artifact through controlled gates;
11. **observe:** verify real postconditions and collect outcome evidence;
12. **learn:** preserve results, update doctrine or backlog, and close or revise the hypothesis.

The loop is both scientific and operational. Skipping a named state is permitted when the risk is trivial or another mechanism supplies the same protection. Silent omission of critical reasoning is not.

### 11.2 Change evidence packet

A material change SHOULD carry a compact evidence packet containing:

- objective and job;
- source issue, pressure signal, incident, or decision;
- governing authorities;
- assumptions and confidence;
- scope and non-goals;
- changed contracts and affected surfaces;
- acceptance and falsification criteria;
- security, privacy, rights, accessibility, reliability, performance, and compatibility implications;
- tests and validation;
- migration and rollback;
- known warnings, uncertainty, and deferred risk;
- resulting artifacts and receipts;
- observation or follow-up plan.

This packet may live in an issue, pull request, experiment record, ADR, release note, or Rosetta-native artifact. Do not duplicate the same fact into multiple authorities without a declared source of truth.

### 11.3 Ceremonies are replaceable

Stand-ups, sprints, planning meetings, demos, retrospectives, story points, burndown charts, and boards MAY be used when they reduce uncertainty or coordination cost. None is inherently required by Genesis.

A ceremony that no longer changes decisions, reveals risk, transfers knowledge, or accelerates repair SHOULD be shortened, replaced, or removed.

## 12. Source control and integration

### 12.1 Mainline posture

The ordinary posture is a healthy mainline protected by automated checks and short-lived, purpose-specific branches or equivalent isolated changes.

A branch SHOULD:

- represent one coherent outcome;
- begin from a current accepted base;
- remain short-lived enough to limit divergence;
- integrate current upstream state before review when material conflicts exist;
- contain only work required for the stated proof;
- be deleted or archived after integration.

Long-lived environment, integration, or release branches are exceptions. They require a documented problem that cannot be solved more safely with release tags, protected environments, feature flags, compatibility layers, canaries, or automated promotion.

### 12.2 What survives from GitFlow

GitFlow is not the Genesis default. Its durable lessons remain useful:

- unfinished work should be isolated;
- release intent should be explicit;
- urgent repairs should minimize unrelated change;
- accepted history should remain recoverable;
- integration and release states should have observable meaning.

Projects MAY adopt GitFlow or another branching model when release cadence, regulatory constraints, offline distribution, vendor process, or maintenance topology genuinely requires it. The burden is to justify the extra branches and merge surfaces.

### 12.3 Commit doctrine

Commits SHOULD be coherent, attributable, and useful to future debugging, review, release automation, and semantic history.

Projects using Conventional Commits MUST apply it consistently enough for humans and automation to rely on the signal. Commit type is not a substitute for a meaningful description.

A commit SHOULD NOT mix independent behavior, generated churn, formatting, dependency upgrades, and cleanup unless separation would make the repository less correct or the change impossible to validate.

History MAY be rewritten on an unshared feature branch to improve reviewability. Published or relied-upon history MUST NOT be rewritten without explicit authority and impact analysis.

### 12.4 Urgent repairs

An urgent repair should be the smallest change that restores safety or service. It still requires:

- a named incident or defect;
- risk-appropriate review;
- regression evidence;
- rollback or containment;
- follow-up work for deferred root causes;
- post-incident learning when consequence warrants it.

Urgency narrows scope. It does not erase accountability.

## 13. Pull requests and review

### 13.1 Pull-request contract

A reviewable pull request states:

- problem and intended outcome;
- governing issue or decision source;
- changed behavior, contracts, and files;
- security, privacy, rights, accessibility, reliability, performance, and compatibility effects;
- tests and validation performed;
- known warnings, uncertainty, and deferred risk;
- migration and rollback when applicable;
- what is deliberately excluded;
- exact maturity claim the change supports.

The author SHOULD make the reviewer’s highest-value path obvious. Generated diffs, lockfiles, snapshots, and broad mechanical changes SHOULD be separated or explained when they would obscure semantic review.

### 13.2 Review order

Review the highest-consequence assumptions first:

1. authority and intended outcome;
2. security, privacy, rights, and safety;
3. semantic and data integrity;
4. externally visible behavior and failure;
5. compatibility, migration, and recovery;
6. tests and evidence quality;
7. accessibility and usability;
8. performance and operational cost;
9. maintainability and clarity;
10. style and preference.

Style comments MUST NOT distract from a broken invariant or unproven claim.

### 13.3 Reviewer selection

Reviewers should be selected by the risk and knowledge surface of the change, not only by hierarchy. Projects SHOULD avoid making one lead or founder the permanent merge bottleneck.

High-risk changes MAY require independent reviewers, CODEOWNERS, security review, domain experts, quorum, or human authority. Low-risk changes SHOULD not be burdened with ceremonial approval that adds delay without protection.

### 13.4 Review as knowledge diffusion

Review is not merely defect inspection. It distributes context, tests assumptions, trains maintainers, and reduces irreplaceability.

A review process that repeatedly produces one expert approving work nobody else understands is not reducing bus risk. It is documenting dependence on that expert.

### 13.5 Agent-authored changes

An agent-generated pull request MUST satisfy the same evidence, test, documentation, authorship, security, accessibility, and review requirements as any other contribution.

An agent's statement that a command passed is not verification. Use command output, artifacts, receipts, status checks, or an independent rerun.

Agents MAY prepare, critique, and revise pull requests. Merge and publication authority remains with the configured human or governance mechanism.

### 13.6 Merge authority

No pull request merges solely because CI is green, a respected contributor approves it, or an agent reports confidence. Each is evidence, not judgment itself.

The merge mechanism MUST preserve the repository's required checks and authority. Exceptions require a visible record.

## 14. Testing is an assurance system

Tests reduce uncertainty about important behavior. They do not manufacture certainty by percentage.

### 14.1 Assurance follows risk

Every bespoke behavior MUST have proportionate evidence for:

- intended behavior;
- relevant invalid, denied, or adversarial behavior;
- important boundaries;
- integration contracts;
- failure, retry, cancellation, and recovery;
- migration and compatibility when state changes;
- security and rights boundaries;
- accessibility behavior when users interact with it.

A trivial copy edit does not need a chaos program. A parser, authorization gate, migration, payment path, identity operation, or provenance verifier may.

### 14.2 Tests are executable claims

A useful test:

- protects a behavior or invariant that matters;
- fails when that behavior is wrong;
- explains the violated expectation well enough to guide repair;
- remains deterministic or exposes its uncertainty;
- is maintained in the normal validation path appropriate to its cost.

Tests SHOULD state observable behavior rather than mirror internal implementation. Internal tests are appropriate when the internal contract itself is important.

### 14.3 Red, green, refactor

For defect repair and behavior change, contributors SHOULD first demonstrate the missing or incorrect behavior with a failing test or equivalent reproducible evidence, then implement the smallest repair and retain the evidence as a regression guard.

A preexisting proof that cannot be automated MAY serve as the red state if the reason is recorded.

### 14.4 Conformance and interoperability

Protocols, formats, schemas, codecs, and cross-implementation contracts SHOULD ship with:

- canonical positive fixtures;
- invalid and adversarial fixtures;
- deterministic test vectors;
- versioned conformance profiles;
- machine-readable failure expectations;
- round-trip and loss tests where applicable;
- at least one independent implementation or harness when a claim of interoperability is material.

A reference implementation that only tests itself has demonstrated internal consistency, not interoperability.

### 14.5 Dependency contracts

Test the project's assumptions about third-party systems. Do not duplicate a dependency's entire suite without a project-specific reason.

Contract tests SHOULD cover the versions, configuration, failure modes, and semantic guarantees on which the project actually relies.

### 14.6 Coverage law

Coverage reports where tests traveled. It does not prove that they noticed incorrect behavior.

Coverage MAY identify untested risk. Raw coverage percentage MUST NOT be a standalone team target, release claim, or individual performance measure. Per-method test quotas and ceremonial assertions are prohibited.

Branch coverage, mutation resistance, fault detection, property preservation, meaningful regression capture, and independent reproduction are often stronger evidence. None should become a sacred score.

### 14.7 Critical-path adversarial assurance

For critical behavior, deliberately introduce plausible faults and verify that the assurance system detects and explains them.

Choose proportionately among:

- mutation testing;
- property-based and metamorphic testing;
- malformed-input and protocol fuzzing;
- parser differential testing;
- dependency and network fault injection;
- clock, concurrency, retry, and duplicate-delivery tests;
- resource exhaustion and timeout tests;
- contained chaos experiments;
- security abuse cases;
- recovery, backup, restore, and rollback drills;
- cross-version and cross-implementation tests.

Run expensive assurance on changed critical surfaces, release candidates, scheduled deep gates, and incident-driven targets rather than indiscriminately burning the whole monorepo on every edit.

### 14.8 Flake and known-red policy

A flaky test is an unreliable instrument. Fix it, quarantine it visibly with reduced authority, or remove it.

Any accepted known-red test MUST have an owner, linked issue, reason, first-seen date, review or expiry date, and release semantics. A known-red registry is not permission for indefinite failure.

Release-critical gates MUST be green unless an explicit release exception is approved and disclosed.

### 14.9 Test environments

Test environments SHOULD differ only where the difference is the subject of the test. Environment drift, mutable dependencies, hidden credentials, and undeclared external state reduce evidentiary value.

A test result SHOULD identify enough environment and version information to support reproduction.

## 15. Reliability, recoverability, and operations

### 15.1 Recoverable-operation contract

A material operation SHOULD define:

- operation identity and version;
- actor or principal;
- authority and policy decision;
- input identity and validation state;
- idempotency key or duplicate semantics;
- preconditions;
- timeout and cancellation behavior;
- retry class, limit, backoff, and jitter;
- partial-progress and atomicity semantics;
- side effects and affected resources;
- postconditions;
- receipts, logs, and telemetry;
- terminal success, denied, cancelled, failed, compensated, and indeterminate states;
- operator repair, replay, or escalation path.

A retry is a new attempt within one logical operation, not permission to repeat side effects blindly.

### 15.2 Retry discipline

Retry only failures plausibly transient under a bounded policy. Permanent validation, authorization, semantic, quota, or contract failures SHOULD fail without repeated load.

Retry systems MUST avoid unbounded amplification. Use limits, exponential backoff, jitter, deadlines, concurrency controls, and circuit breaking as appropriate.

### 15.3 Backpressure and overload

Systems MUST define what happens when demand exceeds safe capacity. Appropriate responses may include queueing, admission control, degraded mode, load shedding, rate limiting, batching, or refusal.

Overload MUST NOT silently corrupt ordering, rights, provenance, or durability guarantees.

### 15.4 Dead letters and indeterminate work

Work that cannot complete or be safely retried SHOULD become an inspectable terminal artifact rather than disappearing. A dead-letter or quarantine record should preserve identity, attempts, evidence, reason, rights, and repair options without leaking sensitive payloads.

### 15.5 Observability

Logs, metrics, traces, receipts, and alerts SHOULD answer:

- what happened;
- to which artifact, user, tenant, or operation;
- under which version and authority;
- what the system expected;
- what actually occurred;
- whether state is safe and complete;
- what can be retried, reversed, or repaired.

Telemetry MUST respect privacy, classification, retention, and rights. Observability is not permission for indiscriminate surveillance.

### 15.6 Change management

Production changes SHOULD use the same reviewed artifact proven earlier, controlled environment configuration, automated gates, staged exposure proportional to risk, and explicit rollback.

Feature flags, canaries, shadow modes, compatibility adapters, and reversible migrations are useful when they reduce one-way risk. They MUST have ownership and removal conditions so temporary scaffolding does not become permanent fog.

### 15.7 Incident learning

Incident response prioritizes containment and recovery. Post-incident analysis SHOULD be blameless toward people and unsparing toward system conditions.

The result should identify contributing conditions, detection and recovery gaps, corrective actions, owners, and verification. A root cause label that ends inquiry too early is not learning.

## 16. Security, privacy, rights, and supply chain

Each project MUST apply controls proportionate to its threat model, data sensitivity, autonomy, and blast radius.

### 16.1 Default controls

- deny by default;
- grant least privilege for the shortest practical duration;
- compartmentalize identities, credentials, environments, tenants, classifications, and networks;
- minimize ambient authority;
- keep secrets out of source, prompts, logs, receipts, fixtures, analytics, and generated artifacts;
- isolate and sandbox untrusted code, plugins, skills, models, documents, and imported capabilities;
- treat external services and generated output as untrusted inputs;
- validate at trust boundaries;
- require explicit authority before side effects;
- preserve auditable evidence for privileged decisions;
- provide safe-hold, revocation, rotation, rollback, and incident paths;
- make security-sensitive composition restrictive rather than permissive;
- enforce rights before retrieval, processing, caching, or disclosure.

### 16.2 Threat models and requirements

A threat model SHOULD name assets, actors, trust boundaries, plausible abuse, impact, assumptions, controls, residual risk, detection, and recovery.

Security requirements SHOULD use maintained external baselines rather than a private checklist assembled from memory. Adoption remains risk- and scope-specific.

### 16.3 Software supply chain

Release and build systems SHOULD provide provenance appropriate to risk. Candidate controls include:

- protected source and review paths;
- pinned and verified dependencies;
- dependency inventory or SBOM;
- isolated and reproducible builds;
- signed artifacts and attestations;
- checksums and immutable release records;
- provenance verification before promotion;
- credential minimization in CI;
- monitored dependency and workflow changes.

SLSA 1.2 is the current stable SLSA baseline as of this revision and includes Build and Source tracks. Projects SHOULD select and declare the track and level they actually satisfy rather than claim generic "SLSA compliance."

### 16.4 Agentic and model-specific security

Agentic systems MUST operate with:

- explicit objective and scope;
- bounded tools, context, time, cost, retries, and egress;
- least privilege and capability-specific credentials;
- read-only or proposal-only defaults;
- checkpoints before material mutation;
- independent validation where practical;
- receipts or equivalent evidence for material actions;
- human or governed approval for high-risk, identity-sensitive, irreversible, externally published, or authority-changing actions;
- safe-hold behavior when authority, policy, identity, provenance, or system state becomes uncertain.

Untrusted text MUST NOT become executable intent merely because a model interpreted it as an instruction.

### 16.5 Identity integrity and anti-deception

Pseudonymity, simulation, test personas, and automated accounts can be legitimate. Deception about authority, humanity, endorsement, consent, or provenance is not.

Systems and operators MUST NOT fabricate or impersonate human identities, credentials, independent endorsements, organic consensus, or social proof in order to evade controls or manipulate an audience. Authorized test and red-team identities MUST remain scoped, labeled in their governing records, isolated from public deception, and removable.

Automation SHOULD be disclosed when its presence is material to trust, consent, platform rules, or interpretation. A public artifact MUST NOT falsely claim human authorship or independent support merely because a model or coordinated agent swarm produced it.

### 16.6 Privacy and data rights

Data collection, storage, retrieval, transformation, training, publication, and deletion semantics MUST honor applicable rights and declared purpose.

Projects SHOULD minimize collected data, separate identity from content where possible, define retention and grave-stoning semantics, record consent and lawful basis where applicable, and prevent cross-domain cache or context reuse.

Product analytics and operational telemetry SHOULD use the least identifying and least granular signal that can answer the declared question. Direct identifiers, tenant identities, behavioral or stylometric signatures, device fingerprints, location traces, and inferred attributes are sensitive data, not harmless metadata.

A project MUST NOT route around an explicit privacy control, content blocker, consent refusal, or tracking-prevention mechanism merely to recover analytics. Fraud prevention, account security, or abuse detection may justify proportionate device or behavioral signals only when purpose, authority, uncertainty, retention, access, human review, and contestability are explicit.

A provenance requirement does not automatically justify indefinite retention of sensitive content. Preserve the minimum evidence necessary under a rights-aware policy.

### 16.7 Security evidence

A scanner, score, badge, model critique, or passing checklist is evidence, not absolution. Security claims MUST name scope, version, environment, method, and residual risk.

## 17. Accessibility and interface engineering

Accessible design begins with information architecture, content, and interaction semantics.

### 17.1 Stable baseline

For web experiences, WCAG 2.2 Level AA is the minimum general baseline unless law or product context requires more.

WCAG 3 remains a Working Draft as of this revision. Projects MAY track and test its developing guidance but MUST NOT claim WCAG 3 conformance.

### 17.2 Interface defaults

User-facing interfaces SHOULD:

- use semantic native controls before custom widgets;
- support complete keyboard operation;
- maintain visible, predictable focus;
- preserve logical reading and focus order;
- support zoom, reflow, text resizing, orientation changes, and unusual viewports;
- respect reduced motion and other user preferences;
- provide sufficient contrast without relying on color alone;
- use meaningful headings, labels, instructions, errors, and link text;
- provide suitable alternatives for non-text content;
- make target sizes and spacing practical for touch and motor variance;
- prevent time limits or motion from becoming hidden barriers;
- make authentication and recovery usable without unnecessary cognitive tests;
- test automated rules and representative manual assistive-technology flows.

Accessibility testing SHOULD include people or representative workflows that expose barriers automation cannot detect.

### 17.3 Affordance and state

People should not have to infer whether an element is interactive, destructive, selected, disabled, loading, stale, or failed from decoration alone.

Critical state MUST be available visually, semantically, and programmatically. Light and dark themes MUST preserve the same semantic hierarchy, affordance clarity, and status meaning.

### 17.4 Design systems

A design system SHOULD be adopted as a coherent foundation, not harvested for unrelated visual fragments. Select one compositional spine and document necessary deltas.

A design system is not a substitute for product-specific accessibility testing, content clarity, or interaction judgment.

## 18. Performance and efficiency

Performance work begins with architecture, scope, and data movement rather than last-minute compression.

Projects SHOULD:

- ship no code, model, image, dependency, context, or telemetry that does not earn its cost;
- prefer static or server-generated output when interaction does not require client execution;
- lazy-load non-critical work;
- use responsive media and suitable formats;
- set budgets for critical paths;
- measure representative devices, networks, datasets, cold starts, and failure paths;
- cache only with explicit identity, invalidation, rights, freshness, and staleness semantics;
- use affected validation during iteration and broader gates at integration or release boundaries;
- optimize model context by selecting better evidence, not merely truncating harder;
- measure energy, token, compute, latency, and monetary cost when they materially affect viability.

Performance optimizations MUST preserve correctness, security, accessibility, provenance, and debuggability.

Lighthouse, Core Web Vitals, latency percentiles, throughput, cache rates, bundle size, token counts, and cost are instruments. No single score is the user outcome.

## 19. Documentation, publication, and content quality

Documentation is part of the product, the protocol surface, and the research record.

### 19.1 Documentation as a graph

Documentation SHOULD form a navigable graph of authority and use rather than a pile of pages. A reader should be able to move from:

- purpose to architecture;
- architecture to contracts;
- contracts to implementation;
- implementation to tests and examples;
- behavior to decisions and provenance;
- current state to roadmap and known limits.

Links SHOULD point toward authoritative statements rather than duplicate them. One fact should have one declared authority and as many contextual projections as needed.

### 19.2 Documentation classes

Use the Diátaxis distinction where it improves clarity:

- **tutorial:** learning through a guided experience;
- **how-to:** completing a concrete task;
- **reference:** precise description of machinery and contracts;
- **explanation:** understanding concepts, reasons, and trade-offs.

Do not force every page into a quadrant when another form is more appropriate. Governance records, RFCs, incident reports, handoffs, release notes, and research papers have different jobs.

### 19.3 Researcher and contributor doorway

The root README SHOULD allow a capable newcomer to determine quickly:

- what the project is;
- what exists today;
- what explicitly does not exist;
- why it matters;
- how to run the smallest honest example;
- how to inspect resulting artifacts;
- how to break an invariant and observe failure;
- where governing documents and current work live;
- how to contribute safely.

Package and application READMEs SHOULD answer a shared question set rather than copy boilerplate:

- purpose and audience;
- current implemented behavior;
- modeled or fixture-backed behavior;
- explicit non-capabilities;
- public contracts and examples;
- security, rights, and failure assumptions;
- verification commands;
- extension points;
- governing sources;
- next honest milestone.

### 19.4 Executable documentation

Examples and commands SHOULD be executable and checked in CI when practical. A copied command that no longer works is a product defect.

Generated reference material SHOULD be reproducible and clearly marked. Generated output MUST NOT silently overwrite hand-authored authority.

### 19.5 Publication pipeline

Externally published material SHOULD pass through a proportionate pipeline:

1. source and rights validation;
2. claim and provenance inspection;
3. semantic and technical review;
4. audience and accessibility review;
5. deterministic linting and link validation where useful;
6. adversarial editorial challenge;
7. authorized publication decision;
8. post-publication correction and revision path.

A pull request is a proposed publication delta. An agent may author or review it. The configured human or governance mechanism remains publication authority.

### 19.6 Content provenance

Material public claims SHOULD support a lineage such as:

```text
source -> observation -> claim -> page -> section -> revision -> publication
```

The implementation may vary, but corrections should not require guessing which pages inherited a claim or which source supported it.

Public artifacts MUST NOT misrepresent authorship, identity, evidence independence, or the degree of human review when those facts are material to trust. Disclosure depth may vary by medium, law, community norm, and risk, but generated consensus must not masquerade as independent human agreement.

### 19.7 Correspondence and collaboration rights

Private correspondence, email, reviewer comments, meeting notes, and collaborator materials have rights and context distinct from public research sources.

A collaboration ledger MAY record relationship, topic, pressure signal, status, and next contact. It MUST NOT publish private content, infer permission from access, or convert correspondence into public evidence without authority.

### 19.8 Writing hierarchy

For technical and research content, optimize in this order:

1. truth and provenance;
2. semantic fidelity;
3. audience comprehension;
4. editorial clarity;
5. project voice;
6. stylistic flourish.

The objective is excellent content, not text that conceals whether a generative system helped produce it.

AI-generated text is a draft contribution, not an authority. It is held to the same standards for truth, originality, evidence, clarity, audience fit, attribution, and review as human-authored text.

### 19.9 Style authorities and linting

Choose a maintained style authority appropriate to the artifact rather than inventing a complete private writing system.

- Google Developer Documentation Style Guide is a useful default for developer-facing technical documentation.
- Microsoft Writing Style Guide is useful for interface, help, and general product copy.
- ASD-STE100 Issue 9 MAY be adopted selectively for safety-critical or high-consequence procedural documentation. Reference the official standard; do not copy its copyrighted rule set into the repository.
- Orwell's six rules are an editing heuristic, not a compliance specification.
- Vale is a configurable prose-linting engine, not a writing philosophy. It SHOULD enforce selected terminology and high-value rules only when false positives remain manageable.

Do not stack multiple complete style guides blindly. Name one primary authority, state intentional exceptions, and lint rules that improve the artifact rather than flatten every genre into the same voice.

### 19.10 Editorial defects

Writing SHOULD avoid:

- unsupported grandeur;
- ornamental repetition;
- vague attribution;
- conclusion-before-evidence rhetoric;
- abstraction where a concrete statement is available;
- false symmetry;
- excessive throat-clearing;
- mechanical transition phrases;
- fabricated quotations, links, versions, or consensus;
- simplification that falsifies technical meaning.

Conciseness means removing waste, not removing necessary context.

## 20. Teams, collaboration, and sustainable performance

### 20.1 The unit of excellence is the system

A strong contributor multiplies the capability of others through design, teaching, review, automation, documentation, tools, empathy, and reliable execution.

Genesis rejects the mythology that individual output volume alone defines a "10x" contributor. The durable goal is a system in which good judgment and hard-won knowledge become reusable.

### 20.2 Sustainable pace

Urgency is not a moral virtue. Exhaustion is not evidence of commitment. Visible activity is not evidence of progress.

Teams and agents SHOULD work at a pace that preserves judgment, learning, health, and operational safety. Periods of exceptional effort may occur during incidents or chosen pushes, but they MUST NOT become the hidden baseline.

The following are prohibited as general performance doctrines:

- "no zero hours" expectations;
- coding-time leaderboards;
- camera-on attendance policing;
- judging skill or motivation from hours at a keyboard;
- rewarding preventable heroics while ignoring the system that required them;
- equating responsiveness at all hours with ownership.

### 20.3 Distributed work

Distributed teams require more explicit context, not less trust.

Projects SHOULD provide:

- written authority and decision records;
- asynchronous access to essential context;
- predictable handoffs;
- equitable access to consequential discussion;
- overlap windows only where live coordination is necessary;
- clear response expectations that respect time zones and personal boundaries;
- language and cultural humility;
- equal standards of trust and advancement across locations.

Geography, accent, native language, camera presence, or proximity to leadership MUST NOT become proxies for competence or commitment.

### 20.4 Bounded autonomy

Teams, agents, and contributors SHOULD receive the widest autonomy consistent with their capability, risk, and authority boundaries.

Autonomy requires:

- a clear objective;
- owned boundaries;
- access to governing context;
- decision rights;
- escalation conditions;
- observability;
- accountable outcomes.

Micromanagement is not governance. Unbounded delegation is not autonomy.

### 20.5 Federated organization

As collaboration grows, prefer small outcome-owning cells connected by shared standards, reusable infrastructure, and cross-cutting councils or guilds.

Centralize only what must remain coherent across the ecosystem, such as:

- constitutional semantics;
- identity and rights;
- security and incident policy;
- conformance contracts;
- shared release and provenance expectations;
- organization-wide risk decisions.

Federate implementation, domain expertise, experimentation, and local workflow wherever safe.

Councils and guilds should propagate knowledge and maintain shared contracts. They SHOULD NOT become approval empires for every local decision.

### 20.6 Bus-factor reduction

Critical systems MUST NOT depend indefinitely on one person's private memory or credentials.

Reduce irreplaceability through:

- clear contracts;
- shared review;
- runbooks and handoffs;
- reproducible environments;
- credential separation and recovery;
- pair or ensemble work on critical surfaces;
- rotation through operational ownership;
- tests and executable examples;
- incident and decision history.

### 20.7 Onboarding and handoff

A new capable contributor or agent SHOULD be able to resume a bounded slice without rereading the whole corpus.

A useful handoff states:

- current objective and authority;
- branch or work state;
- what changed;
- evidence already gathered;
- validation state;
- known warnings and uncertainty;
- next smallest action;
- prohibited or intentionally deferred actions.

Handoffs are working receipts, not narrative diaries.

### 20.8 Blocking work

A contributor who is blocked SHOULD surface the block early with evidence:

- intended outcome;
- exact obstacle;
- attempts already made;
- relevant logs, artifacts, or reproduction;
- decision or expertise needed;
- productive work available while waiting.

The team SHOULD route help to the smallest expertise needed and preserve the resolution for reuse.

Being blocked is not a character failure. Hiding a consequential block until a deadline is an operational failure.

### 20.9 Conflict and dissent

Disagreement should target claims, assumptions, evidence, and consequences rather than status or identity.

Projects SHOULD preserve the strongest informed objection before a major commitment. Early consensus is not automatically healthy; it may indicate missing viewpoints, authority pressure, or insufficient independent analysis.

## 21. Meetings and synchronous communication

### 21.1 Async-first, not async-only

Use asynchronous communication for information that can be read, reviewed, and considered without simultaneous presence. Use synchronous communication when live interaction materially improves:

- rapid incident coordination;
- high-ambiguity design convergence;
- sensitive conflict resolution;
- collaborative discovery;
- decisions requiring immediate cross-functional negotiation;
- teaching or pairing that loses too much bandwidth asynchronously.

### 21.2 Synchronous warrant

A recurring or consequential meeting SHOULD state:

- why simultaneous presence is necessary;
- decision, shared model, or artifact expected;
- essential participants and why they are essential;
- preparation or pre-read;
- timebox;
- facilitator or decision owner;
- durable output;
- cancellation condition.

Attendance is a cost, not a courtesy tax.

### 21.3 Meeting conduct

Meetings SHOULD:

- begin with the question or decision;
- distinguish information sharing from deliberation;
- give participants access to evidence;
- surface dissent before closure;
- prevent one voice from consuming the whole bandwidth;
- end with decisions, owners, open questions, and next actions;
- produce a concise durable record.

A meeting that repeatedly produces no decision, artifact, shared understanding, or relationship repair should be redesigned or removed.

### 21.4 Decision receipts

A material decision record SHOULD capture:

- question and context;
- alternatives;
- evidence;
- strongest objection;
- decision authority;
- confidence and uncertainty;
- reversible or one-way classification;
- enter, continue, pivot, and exit conditions;
- review trigger.

The transcript is not the decision. The decision receipt is.

### 21.5 Retrospectives

Retrospectives and post-experiment reviews SHOULD be blameless, evidence-bearing, timeboxed, and action-oriented.

They may examine:

- what was expected;
- what occurred;
- what helped;
- what impeded;
- what surprised us;
- which system condition should change;
- which experiment should follow;
- which prior belief no longer survives.

Action items need owners and verification. Repeating the same observation without changing the system is ritual, not learning.

## 22. Estimation, planning, and commitments

### 22.1 Estimates are forecasts

An estimate is a conditional forecast under stated assumptions, not a promise or a measure of virtue.

Material forecasts SHOULD include:

- range rather than false precision;
- confidence;
- assumptions;
- dependencies;
- known unknowns;
- excluded work;
- risk class;
- evidence from analogous work;
- condition requiring re-estimation.

### 22.2 Separate size, duration, and priority

Complexity, effort, elapsed time, queue delay, business priority, and risk are different quantities. Do not collapse them into one number and then pretend the number explains all six.

Story points MAY be used as a local planning signal. They MUST NOT be mechanically converted to person-days, compared across teams, or used to rank individual productivity.

### 22.3 Commitment follows evidence

A commitment should be no larger than the current evidence can responsibly support. Use the Consensus-First Commitment Scoping Framework for major bets.

At minimum:

- distinguish synthesis from readiness;
- identify the strongest informed objection;
- classify reversibility;
- state evidence and confidence;
- define disconfirmers;
- preserve dissent;
- define enter, continue, pivot, and exit conditions;
- size the commitment to the current board state.

### 22.4 Replanning is not failure

When assumptions change, update the forecast and decision record. Protecting an obsolete estimate by hiding scope, quality, risk, or exhaustion is failure theater.

## 23. Metrics and telemetry

A metric is a model of reality. It becomes dangerous when improving the metric stops improving the outcome it was meant to approximate.

### 23.1 Metric contract

Before adopting a metric, define:

- decision it informs;
- outcome it approximates;
- unit and scope;
- collection method and quality;
- expected lag or leading behavior;
- known confounders;
- how it can be gamed;
- counter-metrics or qualitative evidence;
- privacy and retention consequences;
- owner;
- review and retirement condition;
- collection cost.

### 23.2 Team and service context

Metrics SHOULD be interpreted at the smallest coherent system or service level. Comparing unlike teams, products, domains, or maturity stages without adjustment is usually misleading.

Never rank individual engineers by story points, commits, pull requests, lines changed, coding time, coverage, defect counts, review comments, or similarly gameable proxies.

### 23.3 Balanced software-delivery signals

DORA's current five software-delivery metrics are useful examples for a deployed service:

- change lead time;
- deployment frequency;
- failed deployment recovery time;
- change fail rate;
- deployment rework rate.

They are not universal targets, and they SHOULD be paired with product outcomes, reliability, security, accessibility, cost, and team well-being.

### 23.4 Flow and quality signals

Context-appropriate signals may include:

- time from accepted need to verified outcome;
- review latency and revision loops;
- defect escape and recurrence;
- rollback and recovery success;
- flaky-test burden;
- dependency and maintenance burden;
- documentation freshness;
- clone-to-first-insight time;
- interoperability loss;
- provenance completeness;
- user first-success and task completion;
- incident detection and containment;
- qualitative frustration, morale, and cognitive load.

### 23.5 Anti-theater rules

Do not demand fixed increases in coverage, velocity, Lighthouse score, benchmark score, agent success rate, commits, PRs, or any other metric every sprint.

Do not use comments-per-review, hours-at-keyboard, meeting attendance, or similar activity quotas as quality signals.

Use multiple independent signals. Investigate suspiciously easy improvement. A dashboard is an instrument panel, not reality.

### 23.6 Measurement economy

Do not spend more building perfect telemetry than the decision is worth. Begin with the smallest credible measurement, learn whether it changes action, and improve precision only when the value is demonstrated.

Measurement need does not override privacy, consent, accessibility, or rights. When a proposed signal cannot be collected proportionately and legitimately, change the metric or accept the uncertainty.

## 24. The reference implementation as research workbench

The Rosetta CLI, SDKs, schemas, fixtures, validators, and reference workflows are not secondary packaging. They are the laboratory in which the protocol earns or loses credibility.

The canonical research loop is:

```text
source
  -> Rosetta artifacts
  -> inspect / validate / transform
  -> provenance and evidence
  -> evaluation / ambiguity / promotion
  -> receipt / closure
  -> export / exchange
```

The workbench SHOULD favor:

- JSON-in and JSON-out where appropriate;
- deterministic commands;
- stable schema identifiers;
- inspectable intermediate artifacts;
- excellent positive, negative, and adversarial fixtures;
- explicit translation loss;
- machine-readable, human-repairable errors;
- composable commands;
- minimal setup;
- examples that fail intelligibly after deliberate tampering.

A capable external researcher should be able to clone the repository, run one honest example, inspect the artifacts, break an invariant, and understand the failure without reading the entire canon.

### 24.1 Clone-to-insight

Clone-to-insight time is a useful acceptance signal. It measures the path from a clean environment to the first meaningful, inspectable result, not merely a successful installation.

A project SHOULD reduce unnecessary steps, hidden credentials, undocumented assumptions, and irrelevant setup on that path.

### 24.2 Constitutional implementation lane

A project may designate a canonical implementation language or runtime. Adapters in other languages SHOULD reuse generated schemas, conformance vectors, protocol fixtures, and boundary contracts rather than evolve a shadow constitution.

For Rosetta, the current repository authorities designate TypeScript and the Nx/pnpm workspace as the canonical implementation lane. Python should remain welcoming through thin adapters, generated clients, notebooks, or specialist components without redefining Rosetta semantics independently.

## 25. Collaboration pressure and earned universality

### 25.1 Collaboration ledger

A substantive research collaboration MAY maintain a lightweight ledger containing:

- collaborator or project;
- relevant Rosetta area;
- rights and disclosure posture;
- pressure signal;
- smallest executable response;
- linked issue or experiment;
- status;
- next contact or decision.

This is a research dependency graph, not a sales CRM.

### 25.2 Universality under contact

A lingua franca cannot prove itself by representing only its own concepts.

Interoperability experiments SHOULD test Rosetta against foreign systems, ontologies, traces, reasoning representations, evaluation artifacts, memory models, domain vocabularies, and independent implementations.

Each experiment SHOULD record:

- foreign system and version;
- research question;
- semantics that must survive;
- proposed mapping;
- known or suspected loss;
- fixtures;
- success and falsification criteria;
- observed result;
- pressure signals;
- follow-up decision.

Translation loss is evidence, not embarrassment. Rosetta SHOULD preserve unresolved incompatibility rather than flatten it into a falsely universal term.

Claims of universality remain hypotheses until diverse independent systems exchange meaning with bounded, inspectable loss.

## 26. Legacy systems, rewrites, and migrations

### 26.1 Characterize before changing

Before replacing or deeply modifying a legacy system:

- identify users and critical jobs;
- map dependencies and data flows;
- capture representative behavior with tests and observations;
- identify authority, rights, and operational constraints;
- measure actual failure and maintenance cost;
- distinguish ugly code from harmful behavior;
- preserve recovery and rollback.

Do not rewrite a system merely because its style offends current taste.

### 26.2 Strangler posture

Prefer incremental replacement behind stable seams when it reduces risk. Use adapters, parallel runs, shadow reads, migration windows, and bounded cutovers.

A big-bang rewrite requires evidence that incremental migration is less safe or more expensive, plus explicit failure containment and reversal plans.

### 26.3 Behavioral compatibility

Legacy behavior may be accidental, harmful, or relied upon. Characterization tests document what exists; they do not automatically declare it correct.

Each compatibility decision SHOULD classify behavior as:

- required contract;
- tolerated legacy behavior;
- defect to repair;
- unknown behavior requiring investigation.

### 26.4 Paid integrations and lock-in

Buying a service can reduce time-to-value and operational burden. It can also create lifetime cost, data-rights exposure, egress difficulty, provider dependency, and opaque failure.

Build-versus-buy decisions SHOULD consider total ownership, strategic differentiation, portability, failure behavior, privacy, and exit, not license price alone.

## 27. Releases and maturity

### 27.1 Small releases

Prefer a continuous sequence of reviewable improvements over rare giant releases.

A good release:

- advances a coherent capability or invariant;
- names its maturity and limits;
- promotes known artifacts;
- includes migration and rollback where needed;
- includes evidence and release notes;
- preserves compatible paths or declares breaking change;
- can be observed after exposure.

### 27.2 Versioning

Use Semantic Versioning when the release surface has a declared public API and the semantics fit. Do not apply SemVer decoratively to a surface whose compatibility contract is undefined.

Breaking changes MUST be explicit. Deprecation SHOULD provide a replacement, migration guidance, and removal condition proportional to impact.

### 27.3 Release evidence

Release artifacts SHOULD include provenance appropriate to risk, such as:

- source and build revision;
- checksums;
- signed attestations;
- dependency inventory or SBOM;
- conformance profile and results;
- known limitations;
- migration and rollback instructions;
- environment and configuration assumptions;
- release notes tied to accepted changes.

### 27.4 Observe after release

Release is not the end of verification. Confirm actual deployment, user-visible behavior, error rates, rights boundaries, performance, and rollback readiness.

A successful pipeline with a failed user outcome is a failed release.

## 28. Exceptions, governance, and evolution

### 28.1 Exception contract

A material exception MUST record:

- Genesis rule or adopted standard being changed;
- context and evidence;
- affected scope;
- risk and beneficiaries;
- decision authority and owner;
- compensating controls;
- start date;
- review or expiry condition;
- migration, rollback, or removal path.

Temporary exceptions MUST expire or be renewed explicitly. A repeated exception is evidence that the rule, profile, or architecture needs revision.

### 28.2 Genesis changes

Genesis changes through reviewable pull requests.

A rule SHOULD be added or changed only when it:

- resolves recurring ambiguity;
- records a durable cross-project decision;
- prevents a demonstrated failure;
- establishes a needed priority rule;
- removes harmful or obsolete doctrine;
- replaces local duplication with a better external authority.

Project-specific implementation detail belongs in the relevant PRD, RFC, ADR, package documentation, runbook, or profile rather than here.

### 28.3 Preserve lineage

A Genesis revision SHOULD include a disposition record identifying major principles preserved, transmuted, retired, or deferred and the evidence for doing so.

Silent drift is not evolution.

## 29. Definition of Ready

Work is ready to enter the Execution Spine when the team can state, proportionately:

- user, research, operational, safety, or protocol outcome;
- why it is unblocking now;
- governing source and evidence;
- assumptions and confidence;
- boundaries and non-goals;
- dependencies;
- security, privacy, rights, and accessibility implications;
- acceptance and falsification criteria;
- expected artifacts and receipts;
- reversibility and rollback;
- smallest vertical proof.

Unknown details MAY remain. Hidden critical assumptions may not.

## 30. Definition of Done

Apply proportionately. A change is done only when applicable requirements are satisfied:

- intended behavior exists;
- important failure behavior exists;
- bespoke functionality is meaningfully tested;
- security, privacy, rights, and authority boundaries are preserved;
- accessibility requirements are met;
- reliability and performance budgets have not regressed without accepted reason;
- observable outputs explain success and failure;
- documentation and examples match reality;
- status language is honest;
- provenance and citations are intact;
- migration, compensation, and rollback are available where needed;
- generated artifacts are reproducible or explicitly variable;
- no known critical warning is hidden;
- the result can be independently inspected or verified;
- follow-up observation or learning is assigned when release evidence is incomplete.

`Done` MUST be qualified by scope and maturity. Implemented is not necessarily released. Released is not necessarily production-hardened.

## 31. Prohibited shortcuts

The following are presumed harmful unless an accepted decision proves otherwise:

- bespoke alternatives to adequate maintained standards;
- architectural invention before the nearest extension seam is tested;
- deep inheritance used as taxonomy;
- hidden shared mutation;
- one universal score for context-dependent judgment;
- retrieve-then-filter security;
- side effects without authority, bounds, evidence, and recovery;
- agents with ambient credentials or unbounded tools;
- untrusted text treated as executable intent;
- fabricated or impersonated identities used to evade controls or manufacture trust;
- automated output presented as independent human consensus;
- privacy controls, blockers, or consent refusals bypassed to preserve telemetry;
- covert or nonessential fingerprinting and behavioral profiling used as ordinary analytics;
- direct identifiers sent to third-party analytics without explicit necessity and authority;
- silent fallback from unknown to allowed;
- silent supersession of governing decisions;
- raw evidence overwritten by interpretation;
- generated prose published without factual and editorial review;
- demo results marketed as production capability;
- coverage quotas and ceremonial assertions;
- activity quotas used as quality or performance measures;
- comments-per-review targets;
- coding-time surveillance and leaderboards;
- story points used to rank people;
- flaky tests normalized as weather;
- known-red gates without ownership and expiry;
- green dashboards presented as product truth;
- giant pull requests without a demonstrated indivisible contract;
- big-bang rewrites without migration evidence;
- long-lived branches maintained only by tradition;
- documentation deferred until after behavior ships;
- meetings without a synchronous warrant or durable outcome;
- preventable heroics rewarded instead of repairing the system;
- exhaustion treated as commitment;
- popularity treated as proof;
- novelty treated as value;
- confidence treated as evidence.

## 32. Compact operating creed

1. Protect people, rights, authority, and evidence before convenience.
2. Security and accessibility are design inputs.
3. Preserve sources, uncertainty, and provenance.
4. Name what is observed, inferred, hypothesized, decided, and proven.
5. Start from the job and the next honest proof.
6. Adopt, configure, compose, extend, then invent.
7. Compose behavior and isolate mutation.
8. Centralize invariants; federate execution.
9. Make side effects authorized, bounded, observable, and recoverable.
10. Build once and promote known artifacts.
11. Test whether faults are detected, not merely whether lines are visited.
12. Treat metrics as instruments, never as the outcome itself.
13. Ship small enough to review deeply and reverse cheaply.
14. Document the real system, including what it cannot yet do.
15. Govern agentic work at least as rigorously as human work.
16. Make knowledge portable through contracts, fixtures, receipts, and teaching.
17. Use meetings only when simultaneous presence earns its cost.
18. Treat estimates as conditional forecasts.
19. Reject hero culture; improve the system that produces the work.
20. Let external contact pressure-test claims of interoperability.
21. Confidence follows evidence.
22. No sacred cows: strong defaults, explicit reasons, preserved lineage.

## 33. Internal foundations

Genesis composes with and does not supersede the following repository authorities:

- [Rosetta v3.0.0 Core Spine Specification](../RFCs/Rosetta%20v3.0.0%20Core%20Spine%20Specification.md)
- [Agentic Memory and Graph Design Doctrine](../RFCs/20260324%20-%20Entif%20AI%20-%20Specification%20-%20Agentic%20Memory%20and%20Graph%20Design%20Doctrine.md)
- [Ontological Mixture of Concepts and Swarm Gnosis Protocol](../RFCs/20260412%20-%20Rosetta%20-%20Ontological%20Mixture%20of%20Concepts%20%28OMOC%29%20-%20Swarm%20Gnosis%20Protocol%20Spec.md)
- [Entif and Rosetta PRD](../PRDs/20260426%20-%20Entif%20and%20Rosetta%20PRD.md)
- [Consensus-First Commitment Scoping Framework](../PRDs/20260325%20-%20Consensus-First%20Commitment%20Scoping%20Framework%20%28v0.1%29.md)
- [Normative Staging Doctrine](./20260410%20-%20Entif.AI%20-%20Rosetta%20-%20Normative%20Staging%20Doctrine%20%28v0.2%29.md)
- [Rosetta Canonical Build Charter](../backlog/20260411%20-%20Rosetta%20Canonical%20Build%20Charter%20%28v0.1%29.md)
- [Rosetta Text-Core MVP Scope Gate](../backlog/20260424%20-%20Rosetta%20Text-Core%20MVP%20Scope%20Gate%20%28v0.1%29.md)
- [Repository Shape and Constraints](./REPO_SHAPE_AND_CONSTRAINTS.md)
- [Authority Stack](./AUTHORITY_STACK.md)
- [Current Handoff](../handoffs/CURRENT_HANDOFF.md)

The 2026-08-28/29 collaborative design sessions and the earlier `crates/industry-best-practices` Development Book supplied additional operating principles synthesized in this revision. Their disposition is recorded in [Genesis Source Synthesis and Disposition Ledger](./GENESIS_SOURCE_SYNTHESIS.md).

## 34. External baselines

Projects SHOULD pin the exact version they adopt. Moving external standards are not silently incorporated merely because a URL now serves newer text.

### 34.1 Normative or verification baselines

- [BCP 14: RFC 2119 and RFC 8174](https://www.rfc-editor.org/info/bcp14/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [NIST SP 800-218, Secure Software Development Framework 1.1](https://csrc.nist.gov/pubs/sp/800/218/final)
- [NIST SP 800-218A, Generative AI and Dual-Use Foundation Model SSDF Community Profile](https://csrc.nist.gov/pubs/sp/800/218/a/final)
- [OWASP Application Security Verification Standard 5.0.0](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Software Assurance Maturity Model 2](https://owaspsamm.org/model/)
- [SLSA 1.2](https://slsa.dev/spec/v1.2/)
- [Semantic Versioning 2.0.0](https://semver.org/)
- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)

NIST SSDF 1.2 is an Initial Public Draft as of this revision. Track it, but do not treat it as the final adopted SSDF baseline until its status changes through an explicit project decision.

### 34.2 Informative operating and documentation baselines

- [DORA software-delivery performance metrics](https://dora.dev/guides/dora-metrics/)
- [Diátaxis documentation framework](https://diataxis.fr/)
- [Google Developer Documentation Style Guide](https://developers.google.com/style)
- [Microsoft Writing Style Guide](https://learn.microsoft.com/style-guide/)
- [ASD-STE100 Simplified Technical English, Issue 9](https://www.asd-ste100.org/)
- [Vale prose linter](https://vale.sh/)
- [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)

### 34.3 Developing guidance

- [WCAG 3 introduction and status](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/)
- [NIST SSDF 1.2 Initial Public Draft](https://csrc.nist.gov/pubs/sp/800/218/r1/ipd)

Developing guidance MAY inform experiments. It MUST NOT be represented as a stable compliance target.

## Appendix A. Change evidence packet template

```markdown
# Change: <short title>

## Outcome

- Job or research question:
- Smallest useful proof:
- Why now:

## Authority and evidence

- Source issue / pressure signal / incident:
- Governing authorities:
- Prior evidence:
- Assumptions and confidence:
- Strongest objection:

## Scope

- Included:
- Excluded:
- Changed contracts:
- Affected systems and people:

## Risk

- Security / privacy / rights:
- Accessibility / usability:
- Reliability / performance:
- Compatibility / migration:
- Operational and cost impact:

## Proof

- Acceptance criteria:
- Falsification criteria:
- Tests and validation:
- Artifacts and receipts:

## Recovery

- Reversibility class:
- Rollback / compensation:
- Observation and follow-up:

## Known uncertainty

- Warnings:
- Deferred risks:
- Expiry or review trigger:
```

## Appendix B. Synchronous communication warrant

```markdown
# Synchronous warrant: <topic>

- Why simultaneous presence is necessary:
- Decision, shared model, or artifact expected:
- Essential participants and why:
- Pre-read or evidence:
- Timebox:
- Facilitator / decision owner:
- Durable output location:
- Cancellation condition:
```

## Appendix C. Recoverable-operation contract

```yaml
operation:
  id: <stable logical operation id>
  version: <contract version>
  actor: <principal ref>
  authority: <policy or decision ref>
  input_refs: []
  idempotency_key: <key or explicit duplicate semantics>
  preconditions: []
  timeout_ms: <bounded duration>
  cancellation: <behavior>
  retry:
    class: <none | transient-only | explicit>
    max_attempts: <n>
    backoff: <policy>
    jitter: <policy>
  atomicity: <atomic | checkpointed | compensatable | best-effort>
  side_effects: []
  postconditions: []
  receipts: []
  terminal_states:
    - succeeded
    - denied
    - cancelled
    - failed
    - compensated
    - indeterminate
  repair_or_escalation: <path>
```

## Appendix D. Minimal Genesis adoption record

```yaml
genesis:
  version: 0.2-draft
  adopted_by: <project or repository>
  adopted_at: <date>
  higher_authorities: []
  profiles: []
  external_standards: []
  material_exceptions: []
  evidence_locations: []
  review_trigger: <condition or date>
```
