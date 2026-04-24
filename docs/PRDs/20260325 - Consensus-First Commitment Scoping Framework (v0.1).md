# Consensus-First Commitment Scoping Framework v0.1

## Why this spec exists

This v0.1 spec codifies a specific stance: **agentic systems (and the humans using them) must not “advance the work” by default**. They must advance only when (a) the *next step is consensually recognized as the next step*, and (b) the work is shaped as the **right-sized commitment** for the **current board state**—opportunity magnitude, edge durability, downside tolerance, reversibility, and competitive tempo, not just “what’s cheapest” or “what’s validated.” citeturn1search3turn2search1turn1search11

This stance is directly responsive to well-documented failure modes that show up in both organizations and AI-assisted workflows:

- **Premature closure** (turning synthesis into “the answer” too early), often amplified by **motivated reasoning**—people selectively favor interpretations that serve status, narrative, or incentives. citeturn1search1turn2search3  
- **Automation bias** (over-trusting automated outputs, under-checking for contradictions or missing context), a growing risk in human–AI collaboration. citeturn0search11turn0search7turn3search2  
- **Overconfidence and miscalibration** in LLMs (confidence not matching correctness), which increases the odds of plausible-sounding wrong turns—especially harmful when systems “assume the next step.” citeturn3search1  
- **Hallucination** in generative systems (unintended or unsupported statements), which becomes operationally lethal when translated into specs, roadmaps, or commitments without rigorous evidence management. citeturn3search0turn3search4  
- **Groupthink** dynamics (alignment theater, dissent suppression), which is why “consensus” must mean *understanding the strongest informed objection*, not just counting nods. citeturn2search3turn1search0  

**Core objective:** produce **objective tangible value** through iterative codification—*without* sliding into productivity theater. This spec therefore treats “readiness,” “dissent,” and “exit logic” as first-class design objects, not afterthoughts. citeturn2search1turn0search1turn3search3  

## Research synthesis behind the approach

### From lean validation to “right-sized commitment”

Lean Startup popularized the idea that an MVP is about maximizing validated learning with minimal effort, stressing that it’s not merely “a small product,” but a learning vehicle. citeturn2search0turn2search4 In practice, teams often misread this into “always go cheapest” or “always build tiny,” which can be strategically wrong when **edge decays** or first-mover windows close.

**Painted door / fake door tests** are one example of low-commitment learning artifacts: create an illusion of an offer/feature and measure behavior (clicks, signups, follow-through) without building the feature. citeturn2search10turn2search18 This is powerful when the binding constraint is “do people care?”, but insufficient when the binding constraint is feasibility, trust, ops burden, or defensibility.

### From stage gates to discovery-driven, option-valued strategy

Traditional **Stage-Gate** approaches impose structured gates for new product development. They provide vocabulary, structure, and control—useful in many environments. citeturn1search2turn1search10 But for high-uncertainty ventures, **Discovery-Driven Planning** reframes planning around explicit assumptions and funding/commitment tied to learning milestones rather than pretending forecasts are reliable. citeturn2search1turn2search9

The deeper economic logic is **real options**: treat investments as a sequence of choices (expand, delay, abandon) whose value comes from flexibility under uncertainty. citeturn1search11turn1search3turn1search15 This aligns tightly with your “bet sizing” framing: the question is not “what’s cheapest,” but “what’s the smallest *necessary* commitment to capture maximum justified value, while preserving optionality until a one-way door is warranted.” citeturn1search11turn1search15

### Anti-delusion: falsification, premortems, and contrarian techniques

A **premortem** deliberately assumes failure and asks the team to generate reasons why—an established debiasing technique that helps surface doubts early, especially from people who might otherwise self-censor. citeturn0search1turn3search3turn3search7

Structured analytic techniques used in intelligence analysis explicitly include **devil’s advocacy** and **Team A/Team B** (contrarian methods) to challenge prevailing narratives and reduce analytic pathologies. citeturn3search2turn3search14 This spec adapts that logic for product/venture scoping: dissent is treated as signal, then disciplined into testable claims and decision-impact.

Finally, psychological safety matters because dissent and error-reporting are essential inputs to correct decisions; Edmondson’s work defines psychological safety as a shared belief that the team is safe for interpersonal risk taking, linked to learning behavior in teams. citeturn1search0turn1search8turn0search14

## The box around it

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ CONSENSUS-FIRST, RIGHT-SIZED COMMITMENT                                     │
│                                                                              │
│ 1) No automatic phase transition.                                            │
│    Synthesis ≠ readiness. Readiness must be explicitly agreed.               │
│                                                                              │
│ 2) Not “cheapest next move.”                                                 │
│    “Minimum necessary commitment to capture maximum justified value,”        │
│    given opportunity, edge, edge decay, downside tolerance, reversibility,   │
│    and competitor pressure (option logic).                                   │
│                                                                              │
│ 3) Users are signal, not scripture.                                          │
│    Interpret reality signals; do not outsource vision to surveys.            │
│                                                                              │
│ 4) Evidence must carry provenance + incentives.                              │
│    Multi-source synthesis with bias/credibility metadata.                    │
│                                                                              │
│ 5) Dissent is protected input.                                               │
│    The strongest informed objection must be understood before commitment.    │
│                                                                              │
│ 6) Every bet includes exit logic.                                            │
│    Enter / continue / pivot / exit triggers are defined in advance.          │
└──────────────────────────────────────────────────────────────────────────────┘
```

## v0.1 specification

### Scope of the spec

This framework applies to **epics, features, ventures, and major bets** (including “build,” “buy,” “partner,” and “positioning” plays). It is designed for environments where:

- there is meaningful uncertainty and/or competitive tempo,
- commitments have non-trivial downside (reputation, ops load, trust, capital),
- agentic systems are used to accelerate synthesis and execution.

### Definitions

**Board state:** The current strategic situation characterized by opportunity magnitude, time sensitivity, competitive pressure, known edges, edge durability, resource posture, loss tolerance, regulatory/trust constraints, and ongoing portfolio opportunity cost. citeturn2search1turn1search11turn1search15

**Commitment:** Any allocation of scarce capital—engineering time, attention, reputation, user trust, legal exposure, operational burden, money, distribution leverage.

**Wager size:** The *amount of commitment* put at risk at a given point in the learning/execution journey.

**Two-way door vs one-way door:** A reversible decision vs one that is difficult/expensive to undo (maps to real-options thinking). citeturn1search15turn1search11turn1search3

**Consensus (operational):** Not unanimity. Consensus means:  
1) the group understands the proposal,  
2) the strongest informed objection has been articulated and understood,  
3) the next step is explicitly agreed as ready, even if some disagree. citeturn2search3turn1search0

### Required artifacts

v0.1 defines five required artifacts. They are intentionally compact but information-dense.

#### Opportunity & Edge Brief

Purpose: establish *why we win* (or can plausibly win) and what kind of play this is.

Fields:

- **Strategic lane (must choose at least one):**  
  Create a new space; disrupt an existing space by doing it better; enhance an existing contested space with a major differentiator; relieve a major pain point. (This is your gate.)
- **Win hypothesis:** one paragraph: “We win because…”
- **Differentiator map:** list differentiators across: product capability, execution velocity, distribution/access, economics/cost curve, trust/brand, posture/regulatory strategy, data/feedback advantage (positioning can be a differentiator, not just features).
- **Edge durability estimate:** what causes edge to decay (copyability, incumbents, platform shifts, data commoditization, regulation, etc.).
- **Competitive capital reality:** who can outspend/outwait/out-distribute us; where we must avoid head-to-head contests without superiority.

#### Commitment Canvas

Purpose: determine wager size that is justified now, not later.

Fields:

- **Opportunity value:** direct value (revenue/users/margin) and derivative value (data position, brand position, intel, options created, competitor denial). citeturn1search11turn1search15  
- **Downside exposure:** worst-case operational, reputational, legal, customer trust harms.
- **Loss tolerance:** how much the org can stand to lose (time/capital/reputation); include “blast radius containment plan.”
- **Reversibility:** classify as two-way vs one-way door; identify “points of no return.”
- **Tempo & decay:** what waiting costs; what acting early risks.
- **Recommended commitment posture:** one of:  
  Observe; probe; incubate; parallel-path (build + validate in parallel); strike aggressively; partner; acquire; pause; exit.

This converts “cheapest” into “minimum necessary, given the pot.”

#### Evidence Ledger

Purpose: prevent single-source errors and motivated reasoning drift.

Every claim must have:

- **Claim statement** (atomic and falsifiable if possible)
- **Evidence type:** observed behavior, reported preference, expert inference, structural inference, competitive intelligence, internal measurement
- **Source provenance:** who/where/when
- **Credibility score** (contextual): not “is this reputable,” but “is this source positioned to know this claim?”
- **Incentive/bias notes:** what does the source stand to gain/avoid by framing it this way? citeturn1search1turn3search2  
- **Confidence level:** calibrated; do not inflate confidence beyond evidence quality (explicitly guarding against miscalibration and overconfidence patterns). citeturn3search1turn0search11  
- **Disconfirmers:** what evidence would contradict this claim?

This artifact is designed specifically to counter hallucination and overconfident synthesis being “promoted” into strategy. citeturn3search0turn3search4

#### Falsification & Dissent Packet

Purpose: institutionalize “tell me why I’m wrong.”

This packet has three parts:

- **Premortem:** assume failure; list plausible causes; rank by likelihood and impact. citeturn0search1turn3search3turn3search7  
- **Contrarian challenge:** run either devil’s advocacy or Team A/Team B (lightweight is fine) to pressure-test dominant narrative. citeturn3search2turn3search14  
- **Protected dissent capture:** identify “high-context dissenters” (often noisy, sometimes abrasive) and force a comprehension step: leadership must restate their objection accurately before proceeding.

This is your anti-“silo god” mechanism and your anti-productivity-theater mechanism. It is also a direct counterweight to motivated reasoning in exec environments. citeturn1search1turn2search3

#### Exit, Pivot, and Salvage Plan

Purpose: stop sunk-cost worship.

Define four trigger sets:

- **Enter triggers:** what must be true to start (or to raise bet size)
- **Continue triggers:** what must be true to keep investing
- **Pivot triggers:** which signals require changing direction
- **Exit triggers:** which signals require stopping and unwinding

For each trigger, specify:

- the metric/signal,
- threshold(s) or qualitative conditions,
- decision owner,
- containment steps (how to reduce damage),
- salvage paths (what components/data/relationships remain valuable even if thesis fails).

This implements discovery-driven planning logic (assumptions + milestones + incremental commitment) in a way consistent with real-options flexibility. citeturn2search1turn1search11turn1search15

## Workflow and decision rules

### Phase transition handshake

**Hard rule:** no transition (ideation → spec, spec → build, build → GA, etc.) is automatic.

At every transition point, the agent must ask:

1) “Is the next artifact class ready to be created now?”  
2) “What critical perspectives are missing?”  
3) “What is the strongest informed objection? Has it been understood?”  
4) “Is this a two-way or one-way door at this next step?” citeturn1search15turn2search3  

Only after explicit “yes” (or explicit “yes, with reservations documented”) does the agent produce the next artifact.

This is the direct fix for the observed failure mode: jumping to formalization as a default “productivity behavior.”

### Commitment calibration loop

This loop runs continuously:

- Update Board State → Update Commitment Canvas  
- Update Evidence Ledger → Update Confidence + Disconfirmers  
- Run periodic Premortems at major bet-size increases  
- Re-check exit/pivot triggers before each new commitment tranche citeturn2search1turn3search3turn1search11  

### User input is signal, not scripture

User signals are categorized:

- **Pain reality** (what hurts, what breaks, what they avoid),
- **Workflow reality** (what they actually do vs what they say),
- **Trust reality** (what they will rely on),
- **Preference narratives** (often directionally useful, not design-authoritative).

This matches the general caution that preferences can be unreliable while behaviors and friction points are highly diagnostic.

## Scoring rubric for wager sizing

v0.1 uses a deliberately interpretable scoring model (the point is discipline, not math cosplay). Each dimension is scored Low / Medium / High, with notes.

### Upside and position

- **Direct upside magnitude**
- **Derivative upside** (data, brand, intel, options, competitor denial) citeturn1search11turn1search15  
- **Option value** (how much flexibility matters here; how valuable it is to stage decisions) citeturn1search11turn1search15  

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
Increase bet size when (a) upside + edge durability justify it and (b) downside is contained or tolerable and (c) reversibility remains acceptable *or* the one-way-door jump is strategically required now. citeturn1search11turn2search1turn1search15

Decrease bet size when evidence weakens, edge decays faster than expected, competitor pressure makes payoff unlikely, or downside containment is insufficient.

## Governance, culture, and AI-specific safeguards

### Protected contrarian input without carte blanche

This spec treats contrarian input as a **protected channel** because organizations often punish or eject the very people who see problems early (especially when their signals create discomfort). Psychological safety research emphasizes that interpersonal risk taking enables learning behavior, which is necessary for performance under uncertainty. citeturn1search0turn0search14  

Protection does not mean automatic deference. It means:

- capture,
- comprehension,
- structured challenge,
- explicit disposition (accept / test / defer / reject with reasoning).

### Anti-motivated reasoning guardrails

Motivated reasoning is not a character flaw; it is a cognitive tendency where goals and incentives bias belief construction and evaluation. citeturn1search1

Therefore v0.1 requires:

- explicit incentive notes in the Evidence Ledger,
- premortems at bet-size increases,
- Team A/Team B or devil’s advocacy on contested decisions,
- explicit disconfirmers and “what would change our mind” statements. citeturn0search1turn3search2turn3search3  

### AI-assisted workflow risk controls

Because LLMs can hallucinate and may be miscalibrated (overconfident), this framework forbids “spec by fluent synthesis”:

- Any non-trivial claim in a spec must have a ledger entry (or be labeled as hypothesis).
- The agent must express confidence bounded by evidence quality (preventing the model’s “ready to spec” impulse from masquerading as certainty). citeturn3search0turn3search1turn0search11  
- The agent must prompt for missing SME knowledge before finalizing any commitment recommendation (automation bias control: do not let humans over-trust the agent’s momentum). citeturn0search11turn0search7  

## v0.1 templates

### Spec header

- Title
- Date (local): 2026-03-25 (America/New_York)
- Decision owner
- SME(s)
- Contrarian reviewer
- Current commitment posture (Observe / Probe / Incubate / Parallel / Strike / Partner / Acquire / Pause / Exit)

### Core sections

**Opportunity & Edge Brief**  
**Commitment Canvas**  
**Evidence Ledger**  
**Falsification & Dissent Packet**  
**Exit, Pivot, Salvage Plan**  

### Minimal “fake door / painted door” experiment writeup

When appropriate, include:

- Hypothesis (behavioral)
- Door design
- Traffic source / audience
- Success metric(s) and thresholds
- Failure mode(s)
- Follow-up action if success
- Follow-up action if failure citeturn2search10turn2search18  

### Minimal premortem writeup

- Assume failure date: ___
- Failure headlines (top 5)
- Root causes under each
- Preventive mitigations
- Early warning signals citeturn0search1turn3search3  

---

**This v0.1 is intentionally “codified enough to execute” but explicitly not “complete.”** It is designed to create a repeatable, consensus-first, anti-delusion mechanism that sizes commitments rationally—sometimes small (fake doors), sometimes fast and large (when edge + decay + upside justify it)—while always embedding dissent, provenance, and exit logic into the operational substrate. citeturn2search1turn1search11turn3search2