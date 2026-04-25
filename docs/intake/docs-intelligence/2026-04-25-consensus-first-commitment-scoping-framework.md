# Extraction: Consensus-First Commitment Scoping Framework v0.1

**Source:** `docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md`
**Extracted:** 2026-04-25
**Branch:** `docs-intelligence/consensus-first-commitment-scoping`
**Session:** heartbeat-cycle
**Authority tier:** PRD — governance/planning framework
**Word count:** ~312
**Freshness:** 2026-03-25

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

This PRD establishes a governance/planning methodology for sizing commitments in agentic and venture contexts. It defines five structured artifacts, a phase-transition handshake protocol, a commitment calibration loop, and AI-specific safeguards against hallucination and miscalibration.

---

## Summary

This PRD codifies a stance that agentic systems and humans must not advance work by default: transitions require consensual recognition of readiness, and commitment sizing must be "right-sized" given board state (opportunity magnitude, edge durability, downside tolerance, reversibility, competitive tempo). It addresses five documented failure modes: premature closure, automation bias, overconfidence in LLMs, hallucination in generative outputs, and groupthink. It synthesizes lean validation, real-options theory, discovery-driven planning, falsification techniques, and psychological safety research into a six-box operational framework. Five required artifacts codify the discipline: Opportunity & Edge Brief, Commitment Canvas, Evidence Ledger, Falsification & Dissent Packet, Exit/Pivot/Salvage Plan. A phase-transition handshake is the hard-gate mechanism preventing automatic advancement. The spec is explicitly v0.1 (intentionally incomplete, codified enough to execute).

---

## Goals And Intent

- Prevent premature closure and productivity theater in agentic and organizational workflows
- Replace "cheapest next move" logic with "minimum necessary commitment to capture maximum justified value"
- Counter automation bias and LLM overconfidence/miscalibration in synthesis and recommendation
- Protect dissent as a first-class input to decision-making, not a nuisance
- Embed exit logic and reversibility into every commitment as a first-class design object
- Provide five compact-but-information-dense artifacts that enforce discipline without becoming bureaucratic overhead
- Enable "fake door" / "painted door" experiments for low-commitment learning where appropriate
- Create a repeatable, consensus-first anti-delusion mechanism for venture/product scoping

---

## Research Synthesis

### Lean Validation → Right-Sized Commitment

Lean Startup popularized MVP as a learning vehicle (not merely "a small product") to maximize validated learning with minimal effort. Teams frequently misread this as "always go cheapest" or "always build tiny," which can be strategically wrong when edge decays or first-mover windows close. Painted door / fake door tests create an illusion of an offer/feature and measure behavior (clicks, signups, follow-through) without building the feature—powerful when the binding constraint is "do people care?" but insufficient when feasibility, trust, ops burden, or defensibility are the binding constraints.

### Stage Gates → Discovery-Driven Planning + Real Options

Traditional Stage-Gate approaches impose structured gates for new product development, providing vocabulary, structure, and control in many environments. For high-uncertainty ventures, Discovery-Driven Planning reframes planning around explicit assumptions and funding/commitment tied to learning milestones rather than pretending forecasts are reliable. The deeper economic logic is real options: treating investments as a sequence of choices (expand, delay, abandon) whose value comes from flexibility under uncertainty. This aligns with the "bet sizing" framing: the question is not "what's cheapest" but "what's the smallest necessary commitment to capture maximum justified value while preserving optionality until a one-way door is warranted."

### Anti-Delusion: Falsification, Premortems, Contrarian Techniques

A premortem deliberately assumes failure and asks the team to generate reasons why—an established debiasing technique that surfaces doubts early, especially from people who might otherwise self-censor. Structured analytic techniques from intelligence analysis explicitly include devil's advocacy and Team A/Team B (contrarian methods) to challenge prevailing narratives and reduce analytic pathologies. Psychological safety matters because dissent and error-reporting are essential inputs to correct decisions; Edmondson's work defines psychological safety as a shared belief that the team is safe for interpersonal risk taking, linked to learning behavior in teams.

---

## The Six-Box Framework Summary

```
CONSENSUS-FIRST, RIGHT-SIZED COMMITMENT

1) No automatic phase transition.
   Synthesis ≠ readiness. Readiness must be explicitly agreed.

2) Not "cheapest next move."
   "Minimum necessary commitment to capture maximum justified value,"
   given opportunity, edge, edge decay, downside tolerance, reversibility,
   and competitor pressure (option logic).

3) Users are signal, not scripture.
   Interpret reality signals; do not outsource vision to surveys.

4) Evidence must carry provenance + incentives.
   Multi-source synthesis with bias/credibility metadata.

5) Dissent is protected input.
   The strongest informed objection must be understood before commitment.

6) Every bet includes exit logic.
   Enter / continue / pivot / exit triggers are defined in advance.
```

---

## Scope Of The Spec

This framework applies to **epics, features, ventures, and major bets** (including "build," "buy," "partner," and "positioning" plays). It is designed for environments where:
- there is meaningful uncertainty and/or competitive tempo
- commitments have non-trivial downside (reputation, ops load, trust, capital)
- agentic systems are used to accelerate synthesis and execution

---

## Definitions

| Term | Definition |
|---|---|
| **Board state** | The current strategic situation characterized by opportunity magnitude, time sensitivity, competitive pressure, known edges, edge durability, resource posture, loss tolerance, regulatory/trust constraints, and ongoing portfolio opportunity cost |
| **Commitment** | Any allocation of scarce capital—engineering time, attention, reputation, user trust, legal exposure, operational burden, money, distribution leverage |
| **Wager size** | The amount of commitment put at risk at a given point in the learning/execution journey |
| **Two-way door** | A reversible decision (maps to real-options thinking) |
| **One-way door** | A decision that is difficult/expensive to undo (maps to real-options thinking) |
| **Consensus (operational)** | Not unanimity. Consensus means: (1) the group understands the proposal, (2) the strongest informed objection has been articulated and understood, (3) the next step is explicitly agreed as ready, even if some disagree |

---

## Required Artifacts (Five)

### 1. Opportunity & Edge Brief

Purpose: establish *why we win* (or can plausibly win) and what kind of play this is.

Fields:
- **Strategic lane** (must choose at least one): Create a new space; disrupt an existing space by doing it better; enhance an existing contested space with a major differentiator; relieve a major pain point (this is the gate)
- **Win hypothesis:** one paragraph: "We win because…"
- **Differentiator map:** list differentiators across: product capability, execution velocity, distribution/access, economics/cost curve, trust/brand, posture/regulatory strategy, data/feedback advantage (positioning can be a differentiator, not just features)
- **Edge durability estimate:** what causes edge to decay (copyability, incumbents, platform shifts, data commoditization, regulation, etc.)
- **Competitive capital reality:** who can outspend/outwait/out-distribute us; where we must avoid head-to-head contests without superiority

### 2. Commitment Canvas

Purpose: determine wager size that is justified now, not later.

Fields:
- **Opportunity value:** direct value (revenue/users/margin) and derivative value (data position, brand position, intel, options created, competitor denial)
- **Downside exposure:** worst-case operational, reputational, legal, customer trust harms
- **Loss tolerance:** how much the org can stand to lose (time/capital/reputation); include "blast radius containment plan"
- **Reversibility:** classify as two-way vs one-way door; identify "points of no return"
- **Tempo & decay:** what waiting costs; what acting early risks
- **Recommended commitment posture:** one of: Observe; Probe; Incubate; Parallel-path (build + validate in parallel); Strike aggressively; Partner; Acquire; Pause; Exit

### 3. Evidence Ledger

Purpose: prevent single-source errors and motivated reasoning drift.

Every claim must have:
- **Claim statement** (atomic and falsifiable if possible)
- **Evidence type:** observed behavior, reported preference, expert inference, structural inference, competitive intelligence, internal measurement
- **Source provenance:** who/where/when
- **Credibility score** (contextual): not "is this reputable," but "is this source positioned to know this claim?"
- **Incentive/bias notes:** what does the source stand to gain/avoid by framing it this way?
- **Confidence level:** calibrated; do not inflate confidence beyond evidence quality (explicitly guarding against miscalibration and overconfidence patterns)
- **Disconfirmers:** what evidence would contradict this claim?

This artifact is designed specifically to counter hallucination and overconfident synthesis being "promoted" into strategy.

### 4. Falsification & Dissent Packet

Purpose: institutionalize "tell me why I'm wrong."

Three parts:
- **Premortem:** assume failure; list plausible causes; rank by likelihood and impact
- **Contrarian challenge:** run either devil's advocacy or Team A/Team B (lightweight is fine) to pressure-test dominant narrative
- **Protected dissent capture:** identify "high-context dissenters" (often noisy, sometimes abrasive) and force a comprehension step: leadership must restate their objection accurately before proceeding

### 5. Exit, Pivot, and Salvage Plan

Purpose: stop sunk-cost worship.

Four trigger sets with per-trigger specifications:
- **Enter triggers:** what must be true to start (or to raise bet size)
- **Continue triggers:** what must be true to keep investing
- **Pivot triggers:** which signals require changing direction
- **Exit triggers:** which signals require stopping and unwinding

For each trigger: metric/signal, threshold(s) or qualitative conditions, decision owner, containment steps, salvage paths.

---

## Workflow and Decision Rules

### Phase Transition Handshake

**Hard rule:** no transition (ideation → spec, spec → build, build → GA, etc.) is automatic.

At every transition point, the agent must ask:
1. "Is the next artifact class ready to be created now?"
2. "What critical perspectives are missing?"
3. "What is the strongest informed objection? Has it been understood?"
4. "Is this a two-way or one-way door at this next step?"

Only after explicit "yes" (or explicit "yes, with reservations documented") does the agent produce the next artifact.

### Commitment Calibration Loop

Runs continuously:
- Update Board State → Update Commitment Canvas
- Update Evidence Ledger → Update Confidence + Disconfirmers
- Run periodic Premortems at major bet-size increases
- Re-check exit/pivot triggers before each new commitment tranche

### User Input is Signal, Not Scripture

User signals are categorized:
- **Pain reality** (what hurts, what breaks, what they avoid)
- **Workflow reality** (what they actually do vs what they say)
- **Trust reality** (what they will rely on)
- **Preference narratives** (often directionally useful, not design-authoritative)

---

## Scoring Rubric For Wager Sizing

Each dimension scored Low / Medium / High with notes.

### Upside and position
- **Direct upside magnitude**
- **Derivative upside** (data, brand, intel, options, competitor denial)
- **Option value** (how much flexibility matters here; how valuable it is to stage decisions)

### Truth and conviction
- **Empirical evidence strength** (behavioral > stated; costly signals > cheap signals)
- **Structural thesis strength** (substrate shifts, cost curves, platform changes)
- **Positional thesis strength** (unique right to win: distribution, talent, access)

### Risk and constraints
- **Downside severity**
- **Loss tolerance**
- **Reversibility / one-way door risk**
- **Edge decay rate**
- **Competitor response intensity**

**Decision rule (plain English):**
Increase bet size when (a) upside + edge durability justify it and (b) downside is contained or tolerable and (c) reversibility remains acceptable *or* the one-way-door jump is strategically required now.

Decrease bet size when evidence weakens, edge decays faster than expected, competitor pressure makes payoff unlikely, or downside containment is insufficient.

---

## Governance, Culture, and AI-Specific Safeguards

### Protected Contrarian Input Without Carte Blanche

Contrarian input is a protected channel because organizations often punish or eject the people who see problems early (especially when their signals create discomfort). Protection does not mean automatic deference. It means: capture, comprehension, structured challenge, explicit disposition (accept / test / defer / reject with reasoning).

### Anti-Motivated Reasoning Guardrails

Motivated reasoning is not a character flaw; it is a cognitive tendency where goals and incentives bias belief construction and evaluation. Therefore v0.1 requires: explicit incentive notes in the Evidence Ledger, premortems at bet-size increases, Team A/Team B or devil's advocacy on contested decisions, explicit disconfirmers and "what would change our mind" statements.

### AI-Assisted Workflow Risk Controls

Because LLMs can hallucinate and may be miscalibrated (overconfident), this framework forbids "spec by fluent synthesis":
- Any non-trivial claim in a spec must have a ledger entry (or be labeled as hypothesis)
- The agent must express confidence bounded by evidence quality
- The agent must prompt for missing SME knowledge before finalizing any commitment recommendation (automation bias control)

---

## v0.1 Templates

### Spec Header Fields
- Title, Date (local): 2026-03-25 (America/New_York), Decision owner, SME(s), Contrarian reviewer, Current commitment posture

### Minimal "Fake Door / Painted Door" Experiment Writeup
- Hypothesis (behavioral), Door design, Traffic source / audience, Success metric(s) and thresholds, Failure mode(s), Follow-up action if success, Follow-up action if failure

### Minimal Premortem Writeup
- Assume failure date: ___, Failure headlines (top 5), Root causes under each, Preventive mitigations, Early warning signals

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Why this spec exists | governance, commitment-scoping, anti-delusion | premature-closure, automation-bias, llm-overconfidence, hallucination, groupthink | requirement | Five distinct failure modes are explicitly named and addressed: premature closure (with motivated reasoning amplifier), automation bias in human-AI collaboration, LLM overconfidence/miscalibration, generative hallucination in specs/roadmaps/commitments, groupthink dynamics (alignment theater, dissent suppression) | "This stance is directly responsive to well-documented failure modes..." | Each failure mode should have a corresponding guardrail in the commitment workflow; confirm that Rosetta's agentic workflows implement these guardrails | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Why this spec exists | governance, commitment-scoping | productivity-theater | requirement | "Readiness," "dissent," and "exit logic" are treated as first-class design objects, not afterthoughts. Core objective is "objective tangible value through iterative codification—without sliding into productivity theater." | "This spec therefore treats 'readiness,' 'dissent,' and 'exit logic' as first-class design objects, not afterthoughts" | Rosetta agentic workflows should implement explicit readiness gates, dissent capture, and exit-logic as first-class elements | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Research synthesis | governance, commitment-scoping, real-options | real-options, discovery-driven-planning, stage-gates | decision | Real options theory provides the economic logic: investments are a sequence of choices (expand, delay, abandon) whose value comes from flexibility under uncertainty. This reframes "cheapest" as "minimum necessary commitment to capture maximum justified value while preserving optionality." | "The deeper economic logic is real options: treat investments as a sequence of choices (expand, delay, abandon) whose value comes from flexibility under uncertainty." | Rosetta's commitment sizing should implement real-options logic: two-way-door reversible bets for early-stage, one-way-door大步 only when strategically required | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Research synthesis | governance, fake-door, painted-door | fake-door-test, painted-door-test, lean-validation | decision | Painted door / fake door tests create an illusion of an offer/feature and measure behavior without building the feature. This is powerful when binding constraint is "do people care?" but insufficient when binding constraint is feasibility, trust, ops burden, or defensibility. | "This is powerful when the binding constraint is 'do people care?', but insufficient when the binding constraint is feasibility, trust, ops burden, or defensibility." | Rosetta should support fake-door experimentation for low-commitment learning; confirm that this capability is planned or implemented | medium |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | The box around it | governance, consensus, dissent | consensus-definition, dissent-protection, phase-transition | requirement | Box item 1: No automatic phase transition. Synthesis ≠ readiness. Readiness must be explicitly agreed. Box item 5: Dissent is protected input. The strongest informed objection must be understood before commitment. | "Consensus-First, Right-Sized Commitment: 1) No automatic phase transition. 5) Dissent is protected input." | Rosetta agentic workflows must implement explicit readiness-gated phase transitions; dissent capture should be documented as a required step before commitment | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | The box around it | governance, evidence, provenance | evidence-provenance, bias-metadata, incentive-notes | requirement | Box item 4: Evidence must carry provenance + incentives. Multi-source synthesis with bias/credibility metadata. This directly counters motivated reasoning in evidence construction. | "Evidence must carry provenance + incentives." | Rosetta evidence artifacts should require provenance fields and incentive/bias annotations for every claim | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | The box around it | governance, exit-logic | exit-logic, enter-continue-pivot-exit, sunk-cost | requirement | Box item 6: Every bet includes exit logic. Enter / continue / pivot / exit triggers are defined in advance. This implements discovery-driven planning logic with real-options flexibility. | "Every bet includes exit logic. Enter / continue / pivot / exit triggers are defined in advance." | Rosetta commitment artifacts should require enter/continue/pivot/exit triggers as first-class fields | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | v0.1 specification / Definitions | governance, board-state | board-state-definition, strategic-situation | requirement | Board state is defined as the current strategic situation characterized by opportunity magnitude, time sensitivity, competitive pressure, known edges, edge durability, resource posture, loss tolerance, regulatory/trust constraints, and ongoing portfolio opportunity cost. | "Board state: The current strategic situation characterized by opportunity magnitude..." | Rosetta's planning context should track and update board-state dimensions before every commitment sizing decision | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | v0.1 specification / Definitions | governance, consensus, dissent | consensus-operational, objection-comprehension | requirement | Consensus operational definition: (1) group understands the proposal, (2) strongest informed objection has been articulated and understood, (3) next step is explicitly agreed as ready, even if some disagree. This is NOT unanimity. | "Consensus (operational): Not unanimity. Consensus means: 1) the group understands the proposal, 2) the strongest informed objection has been articulated and understood, 3) the next step is explicitly agreed as ready, even if some disagree." | Rosetta's consensus-gathering should enforce all three elements; dissent suppression should be detectable as a process violation | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Required artifacts / Evidence Ledger | governance, evidence, hallucination | evidence-ledger, hallucination-prevention, miscalibration | requirement | The Evidence Ledger is explicitly designed to counter hallucination and overconfident synthesis being "promoted" into strategy. Every claim must have: claim statement, evidence type, source provenance, credibility score (contextual), incentive/bias notes, confidence level (calibrated, not inflated), disconfirmers. | "This artifact is designed specifically to counter hallucination and overconfident synthesis being 'promoted' into strategy." | Rosetta should implement a mandatory Evidence Ledger for all non-trivial claims in specs and commitments; confirm this is part of the planning artifact schema | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Required artifacts / Evidence Ledger | governance, credibility-score | credibility-scoring, contextual-reputation, source-positioning | open-question | Credibility score is defined as contextual: not "is this reputable" but "is this source positioned to know this claim?" This is a more epistemically precise framing than general reputation scoring. No explicit scoring rubric or scale is defined in v0.1. | "Credibility score (contextual): not 'is this reputable,' but 'is this source positioned to know this claim?'" | Rosetta should define a concrete credibility-scoring rubric for the Evidence Ledger; the current v0.1 leaves this underspecified | medium |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Required artifacts / Evidence Ledger | governance, calibration | calibration, overconfidence, miscalibration | requirement | Confidence level must be calibrated; do not inflate confidence beyond evidence quality. This explicitly guards against miscalibration and overconfidence patterns documented in LLM literature. | "Confidence level: calibrated; do not inflate confidence beyond evidence quality (explicitly guarding against miscalibration and overconfidence patterns)." | Rosetta agents should implement confidence calibration bounded by evidence quality; LLM-native confidence scores should not be accepted without evidence-level mapping | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Required artifacts / Falsification & Dissent Packet | governance, dissent, premortem, contrarian | premortem, devil-advocacy, team-a-team-b, dissent-protection | requirement | Falsification & Dissent Packet has three parts: (1) Premortem—assume failure, list plausible causes, rank by likelihood and impact; (2) Contrarian challenge—devil's advocacy or Team A/Team B; (3) Protected dissent capture—identify high-context dissenters, force leadership to restate their objection accurately before proceeding. | "This is your anti-'silo god' mechanism and your anti-productivity-theater mechanism." | Rosetta should support structured premortem and contrarian challenge workflows; protected dissent capture requires a comprehension step that should be formally tracked | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Required artifacts / Exit, Pivot, Salvage Plan | governance, exit-logic, sunk-cost | exit-triggers, pivot-triggers, salvage-paths, sunk-cost-worship | requirement | Four trigger sets (enter/continue/pivot/exit) each require: metric/signal, threshold(s), decision owner, containment steps, salvage paths. This is explicitly designed to stop sunk-cost worship. | "Purpose: stop sunk-cost worship." | Rosetta commitment artifacts should include a formal Exit/Pivot/Salvage Plan with all four trigger sets and all five per-trigger fields | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Workflow / Phase Transition Handshake | governance, phase-transition | phase-transition-gate, readiness-gate, synthesis-rejection | requirement | Hard rule: no transition (ideation → spec, spec → build, build → GA) is automatic. At every transition, the agent must ask four questions: readiness, missing perspectives, strongest objection, two-way/one-way door. Only after explicit "yes" (or "yes with reservations documented") does the agent produce the next artifact. | "Hard rule: no transition...is automatic." | Rosetta's workflow engine should implement a formal phase-transition handshake with four mandatory questions before advancing; synthesis outputs should not auto-escalate to spec without explicit readiness confirmation | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Workflow / Commitment Calibration Loop | governance, calibration-loop | calibration-loop, board-state-update, evidence-update | requirement | Commitment calibration loop runs continuously: Update Board State → Update Commitment Canvas; Update Evidence Ledger → Update Confidence + Disconfirmers; Run periodic Premortems at major bet-size increases; Re-check exit/pivot triggers before each new commitment tranche. | "This loop runs continuously" | Rosetta should implement a calibration loop trigger that runs before any commitment size increase; confirm this is automatable or requires human orchestration | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Workflow / User input is signal, not scripture | governance, user-signal | user-signal, preference-narratives, behavioral-diagnostics | requirement | User signals are categorized: Pain reality, Workflow reality, Trust reality, Preference narratives. "Preferences can be unreliable while behaviors and friction points are highly diagnostic." | "This matches the general caution that preferences can be unreliable while behaviors and friction points are highly diagnostic." | Rosetta's user research artifacts should distinguish signal categories; stated preferences should be flagged as lower-fidelity vs behavioral evidence | medium |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Scoring rubric | governance, wager-sizing, scoring | wager-sizing, scoring-rubric, upside, risk | requirement | Deliberately interpretable scoring model: each dimension scored Low/Medium/High with notes. Upside/position dimensions: direct upside magnitude, derivative upside, option value. Truth/conviction: empirical evidence strength, structural thesis strength, positional thesis strength. Risk/constraints: downside severity, loss tolerance, reversibility, edge decay rate, competitor response intensity. | "v0.1 uses a deliberately interpretable scoring model (the point is discipline, not math cosplay)." | Rosetta's commitment sizing should implement this rubric or a compatible equivalent; Low/Medium/High scoring is more tractable than continuous scores for this use case | medium |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Scoring rubric / Decision rule | governance, decision-rule, commitment-sizing | decision-rule, increase-bet, decrease-bet | requirement | Increase bet size when: (a) upside + edge durability justify it AND (b) downside is contained or tolerable AND (c) reversibility remains acceptable OR one-way-door jump is strategically required now. Decrease bet size when evidence weakens, edge decays faster than expected, competitor pressure makes payoff unlikely, or downside containment is insufficient. | "Decision rule (plain English)" section | Rosetta's automated commitment recommendations should implement this three-condition AND logic for bet-size increases; confirm this is encoded in the commitment canvas | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Governance / Protected contrarian input | governance, dissent, psychological-safety | psychological-safety, contrarian-protection, dissent-capture | requirement | Contrarian input is a protected channel because organizations often punish or eject people who see problems early. Protection means: capture, comprehension, structured challenge, explicit disposition (accept/test/defer/reject with reasoning). | "Protection does not mean automatic deference. It means: capture, comprehension, structured challenge, explicit disposition." | Rosetta should implement a protected dissent channel with comprehension-step tracking; high-context dissenters should be identifiable and their objections formally restated before proceeding | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Governance / Anti-motivated reasoning guardrails | governance, motivated-reasoning | motivated-reasoning, debiasing, incentive-notes | requirement | Motivated reasoning is defined as a cognitive tendency (not a character flaw) where goals and incentives bias belief construction. Guardrails required: explicit incentive notes in Evidence Ledger, premortems at bet-size increases, Team A/Team B or devil's advocacy on contested decisions, explicit disconfirmers and "what would change our mind" statements. | "Motivated reasoning is not a character flaw; it is a cognitive tendency where goals and incentives bias belief construction and evaluation." | Rosetta should enforce anti-motivated-reasoning guardrails as mandatory fields in the Evidence Ledger and Falsification Packet; the "what would change our mind" statement should be a required field | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Governance / AI-specific safeguards | governance, ai-safeguards, hallucination | ai-safeguards, hallucination, automation-bias, spec-by-fluent-synthesis | requirement | Framework forbids "spec by fluent synthesis": any non-trivial claim must have a ledger entry or be labeled as hypothesis; agent must express confidence bounded by evidence quality; agent must prompt for missing SME knowledge before finalizing any commitment recommendation. | "This framework forbids 'spec by fluent synthesis'" | Rosetta agents should be prohibited from generating fluent synthesis as spec without corresponding Evidence Ledger entries; SME prompt-out should be a required step before commitment finalization | high |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | v0.1 templates | governance, templates | templates, fake-door-template, premortem-template | technology | Minimal fake door / painted door experiment writeup template has seven fields: hypothesis (behavioral), door design, traffic source/audience, success metrics/thresholds, failure modes, follow-up action if success, follow-up action if failure. Minimal premortem writeup has five fields: assume failure date, failure headlines top 5, root causes, preventive mitigations, early warning signals. | Template sections at end of document | Rosetta should provide canonical template artifacts for these writeup formats; confirm they are part of the artifact schema | medium |
| 2026-04-25 | docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md | Why this spec exists | governance, v0.1-status | v0.1-status, intentional-incompleteness | decision | v0.1 is described as "intentionally 'codified enough to execute' but explicitly not 'complete.'" The spec is designed to create a repeatable, consensus-first, anti-delusion mechanism that sizes commitments rationally—sometimes small (fake doors), sometimes fast and large (when edge + decay + upside justify it)—while always embedding dissent, provenance, and exit logic into the operational substrate. | "This v0.1 is intentionally 'codified enough to execute' but explicitly not 'complete.'" | This PRD should be treated as a living spec with planned evolution; v0.1 completeness gaps (e.g., credibility scoring rubric, commitment posture decision logic) should be tracked as open questions | high |

---

## Components And Technologies

- **Commitment Canvas artifact** — structured wager-sizing instrument with eight fields covering opportunity value, downside exposure, loss tolerance, reversibility, tempo & decay, and commitment posture recommendation
- **Evidence Ledger artifact** — seven-field per-claim structured ledger designed to counter hallucination and miscalibration in LLM synthesis
- **Falsification & Dissent Packet artifact** — three-part debiasing instrument: premortem, contrarian challenge, protected dissent capture
- **Exit/Pivot/Salvage Plan artifact** — four-trigger-set instrument with five fields per trigger
- **Opportunity & Edge Brief artifact** — five-field strategic positioning instrument
- **Phase Transition Handshake protocol** — four-question gate that prevents automatic advancement between workflow phases
- **Commitment Calibration Loop** — continuous update cycle for board state, evidence, premortems, and exit triggers
- **Scoring Rubric** — Low/Medium/High dimensional model for wager sizing

---

## Conceptual Claims

1. Premature closure is the primary failure mode in agentic and organizational workflows; synthesis outputs are routinely treated as "the answer" without explicit readiness confirmation.
2. LLM overconfidence and miscalibration make "spec by fluent synthesis" operationally lethal; confidence must be bounded by evidence quality, not by model's native fluency.
3. Consensus is operationalized as three-part: understanding, objection comprehension, explicit agreement—not unanimity.
4. The correct unit of commitment sizing is "minimum necessary commitment to capture maximum justified value given board state," not "cheapest next move."
5. Real-options logic (two-way vs one-way door framing) is the correct economic model for commitment sizing under uncertainty.
6. Dissent is an information input, not a social friction; protecting it requires structural capture, comprehension steps, and explicit disposition.
7. Motivated reasoning is a cognitive tendency requiring structural countermeasures, not a character flaw requiring moral persuasion.
8. "Users as signal, not scripture" recognizes that stated preferences are lower-fidelity than observed behaviors and friction points.
9. Every commitment bet must have enter/continue/pivot/exit triggers defined in advance to prevent sunk-cost worship.
10. The Commitment Calibration Loop must run continuously; static commitments become sunk costs absent ongoing evidence updating.

---

## Dependencies And Sequencing

- This PRD establishes a methodology that should inform all Rosetta venture/product scoping and commitment sizing workflows. It is a governance document that may apply across multiple packages/epics.
- It references but is not dependent on specific NOT LAME PRD components (write-admission gate, receipt law); it operates at a higher planning layer.
- It may be informed by the Bootstrap Execution Track state (what has landed, what is deferred) but does not directly depend on it.
- The Evidence Ledger component is potentially compatible with/extends the RRP receipt model (evidence with provenance, credibility scoring); cross-reference recommended.
- The scoring rubric and commitment posture taxonomy (Observe/Probe/Incubate/etc.) may be usable as a Rosetta planning dimension without full artifact adoption.

---

## Contradictions Or Supersession

- No direct contradictions with existing extracted documents identified. This PRD operates at the governance/planning layer and does not overlap with technical architecture specs already extracted.
- This PRD's "consensus-first" approach may be in creative tension with speed-oriented execution tracks that prioritize rapid iteration over explicit readiness confirmation. The phase-transition handshake should be evaluated for fit with Bootstrap's "thin vertical slices" approach.
- The "minimum necessary commitment" framing could be misused as a cost-cutting rationalization rather than a genuine board-state-informed sizing decision; the framework's six-box summary and decision rule guard against this but do not eliminate the risk.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| Implement Evidence Ledger artifact schema | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-evidence-ledger-schema.md` | governance, evidence, artifacts | — | Evidence Ledger requires seven fields per claim (statement, evidence type, provenance, credibility, incentive/bias, confidence level, disconfirmers); no equivalent schema exists in current Rosetta artifact inventory |
| Implement Phase Transition Handshake protocol | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-phase-transition-handshake.md` | governance, workflow, phase-transition | — | Phase Transition Handshake requires four mandatory questions at every transition gate; no equivalent mechanism exists in Rosetta workflow engine |
| Define credibility scoring rubric for Evidence Ledger | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-credibility-scoring-rubric.md` | governance, evidence, open-question | Evidence Ledger schema | v0.1 defines credibility score as contextual ("is source positioned to know this claim?") but provides no explicit scale or rubric; this gap needs resolution before operationalization |
| Implement Falsification & Dissent Packet with protected dissent capture | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-falsification-dissent-packet.md` | governance, dissent, debiasing | Phase Transition Handshake | Falsification Packet has three parts (premortem, contrarian challenge, protected dissent capture); protected dissent capture requires a comprehension step that must be formally tracked |
| Implement Exit/Pivot/Salvage Plan with four trigger sets | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-exit-pivot-salvage-plan.md` | governance, exit-logic, sunk-cost | Phase Transition Handshake | Exit/Pivot/Salvage Plan requires four trigger sets each with five per-trigger fields (metric, thresholds, decision owner, containment, salvage); no equivalent artifact exists |
| Implement Commitment Canvas artifact with eight fields | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-commitment-canvas.md` | governance, artifacts, commitment-sizing | Evidence Ledger schema | Commitment Canvas has eight fields covering opportunity value, downside exposure, loss tolerance, reversibility, tempo & decay, and commitment posture |
| Implement Opportunity & Edge Brief artifact | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-opportunity-edge-brief.md` | governance, artifacts, strategic-positioning | Phase Transition Handshake | Opportunity & Edge Brief has five fields; this is the upstream artifact that feeds the Commitment Canvas |
| Define "spec by fluent synthesis" prohibition enforcement | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-no-fluent-synthesis-rule.md` | governance, ai-safeguards, hallucination | Evidence Ledger schema, SME prompt-out | Framework forbids "spec by fluent synthesis" without ledger entries; this prohibition needs an enforcement mechanism (lint rule, receipt requirement, or guard token) |
| Implement SME prompt-out requirement before commitment finalization | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-sme-prompt-out.md` | governance, ai-safeguards, automation-bias | Phase Transition Handshake | Agent must prompt for missing SME knowledge before finalizing any commitment recommendation; this automation-bias control needs workflow integration |
| Implement Commitment Calibration Loop automation | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-calibration-loop.md` | governance, workflow, calibration | Commitment Canvas, Evidence Ledger, Exit Plan | Calibration loop runs continuously: Board State → Commitment Canvas update, Evidence update → confidence update, Premortems at bet-size increases, Exit/Pivot trigger re-check |
| Anti-motivated-reasoning guardrails enforcement | issue-candidate | `docs/intake/issue-drafts/2026-04-25-consensus-first-motivated-reasoning-guardrails.md` | governance, debiasing, motivated-reasoning | Evidence Ledger schema, Falsification Packet | Anti-motivated-reasoning guardrails require: explicit incentive notes in Evidence Ledger, premortems at bet-size increases, Team A/Team B or devil's advocacy on contested decisions, "what would change our mind" statement |

---

## Project Board Suggestions

- **Area:** Governance / Planning Methodology
- **Cycle:** This PRD is cross-cutting; it applies to all venture/product scoping workflows, not a single epic
- **Status:** Active — ready for requirements extraction and issue creation
- **Blocked by:** None — this is a top-level governance document
- **Parallelization notes:** This PRD can be processed independently of current technical implementation tracks; its output issues are governance/planning layer and may inform multiple epics simultaneously. The 11 issue-candidate drafts should be evaluated for prioritization; several can be implemented in parallel (Evidence Ledger schema + Commitment Canvas + Opportunity & Edge Brief share conceptual lineage; Phase Transition Handshake + Falsification Packet + Exit Plan form a workflow gate set).

---

## Open Questions

1. **Credibility scoring rubric:** v0.1 defines the concept but not the scale. What Low/Medium/High or numeric rubric should Rosetta use for contextual credibility scoring in the Evidence Ledger?
2. **Commitment posture decision logic:** The nine postures (Observe/Probe/Incubate/Parallel/Strike/Partner/Acquire/Pause/Exit) are listed but no decision matrix maps board-state dimensions to posture recommendation. How should the scoring rubric outputs map to posture recommendations?
3. **"Minimum necessary commitment" abuse vector:** The framing "minimum necessary commitment to capture maximum justified value" could be captured by cost-cutting advocates who ignore edge durability and competitive tempo. What prevents this misuse?
4. **Two-way/one-way door classification reliability:** Who has authority to classify a decision as two-way vs one-way door? Is this a unilateral agent call or a consensus-gated determination? What prevents premature one-way-door escalation?
5. **AI "express confidence bounded by evidence quality":** How is "bounded by evidence quality" operationalized for an LLM? Is there a mechanical check (e.g., confidence score must not exceed lowest evidence quality score across claims)?
6. **Fake door / painted door experiment lifecycle:** When does a successful fake door graduate to a real commitment? What is the criteria? Who approves?
7. **"High-context dissenter" identification:** Who designates a participant as a "high-context dissenter"? Is this self-identified, peer-identified, or lead-identified? What prevents abuse (dismissive labeling of legitimate critics)?
8. **Premortem cadence:** "Run periodic premortems at major bet-size increases" — what constitutes "major"? Is there a threshold (dollar amount, engineering weeks, strategic significance)?
9. **Consensus "explicit agreement" mechanism:** How is "explicit agreement" recorded? Is this a sign-off receipt? A thumbs-up in the artifact? A guard token?
10. **Applicability boundary:** The spec applies to "epics, features, ventures, and major bets" — does this apply to minor bug fixes, routine maintenance, documentation updates, or only strategic commitments? What is the threshold?
