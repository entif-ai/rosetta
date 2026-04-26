# Docs Intelligence Extraction: Empathy Eval Harness

**Source:** `docs/chats/20260301 - Chat GPT - Empathy Eval Harness.md`  
**Extracted by:** docs-intelligence/2026-04-25-empathy-eval-harness  
**Extraction timestamp:** 2026-04-26T00:49:00Z  
**Confidence:** HIGH (structured technical response with clear axis definitions and mapping logic)  
**Line count:** 82  
**Findings count:** 9 distinct technical findings  
**Issue candidates:** 3 new (EEH-001 through EEH-003)  
**Related concepts:** HEART framework, empathy eval, Bradley–Terry, pairwise comparison, Elo rating, adversarial-turn, memory-discipline, attunement-as-retrieval-metric, role-boundary, actionability KPI  

---

## Finding 1: HEART Framework as First-Class Evaluation API

**Confidence:** HIGH  
**Raw text:** "Treat HEART as a first-class evaluation API: Input: (dialogue history, candidate response, role/scope constraints); Output: {H,E,A,R,T} + overall preference score + rationale tags"

**Detail:** The HEART framework (Human alignment, Empathic responsiveness, Attunement, Resonance, Task-following) is proposed as a structured evaluation API with five orthogonal axes and a pairwise preference score. This is framed as a calibration instrument for Entif's "behavioral surface." The API input is a tuple of (dialogue history, candidate response, role/scope constraints), and output is a structured score vector plus rationale tags.

---

## Finding 2: Five Orthogonal HEART Axes Defined

**Confidence:** HIGH  
**Raw text:** "H: 'Does this sound like a thoughtful human here?' (tone, phrasing, flow); E: validates feelings, conveys understanding, avoids judgment/minimization; A: tracks specific details and emotional signals (names what's heavy; notices shifts) vs generic comfort; R: moves conversation forward helpfully (good follow-up question, concrete next step, clarifies needs); T: stays in scope and respects constraints and seeker's goals (including safety/role boundaries)"

**Detail:** The five axes are precisely defined. H is human-likeness/tone/ phrasing; E is validation without minimization; A is specific-signal tracking vs generic comfort; R is actionable forward movement; T is constraint/safety/role scope compliance. Each axis is differentiated from adjacent concepts (e.g., A is distinct from E because it requires citing specific prior-user signals, not just emotional validation).

---

## Finding 3: Pairwise Head-to-Head + Bradley–Terry / Elo Rating Aggregation

**Confidence:** HIGH  
**Raw text:** "evaluation style matters as much as the rubric: pairwise head-to-head comparisons (no ties) on a 5-point ordinal preference scale, then aggregate into Elo-style ratings via Bradley–Terry"

**Detail:** The evaluation methodology uses pairwise head-to-head comparisons with no ties on a 5-point ordinal preference scale. Bradley–Terry model is used to aggregate into Elo-style ratings. This approach is standard in LLM leaderboard evaluation (Chatbot Arena). The key design insight: no absolute scores, only relative pairwise preferences aggregated via Bradley–Terry into stable ratings. This avoids the known failure mode of forced-choice absolute scoring.

---

## Finding 4: Adversarial-Turn Slice for Stress-Testing Tone Shifts Under Friction

**Confidence:** HIGH  
**Raw text:** "They also include a small adversarial-turn slice specifically to stress-test 'tone shifts under friction'"

**Detail:** The paper includes a dedicated adversarial-turn test slice. The failure mode tested: model stays polite but becomes template-y, or over-validates and feels fake, when the user is sarcastic, dismissive, contradictory, or emotionally volatile. This is explicitly identified as the failure mode that "wrecks real deployments."

---

## Finding 5: Modular Committee/Staged-Draft Architecture Per HEART Axis

**Confidence:** HIGH  
**Raw text:** "architect the response generator as a committee (or staged draft) where each stage is accountable to one axis: H: style/tone/humanness pass; E: validation + non-minimization check; A: evidence of having read the room check (must cite specific prior-user signals); R: next-step / question generation; T: constraint/safety/role gatekeeper"

**Detail:** Proposed architecture: response generator as a committee or staged draft where each stage is accountable to one HEART axis. H is a style/tone pass; E validates and checks for non-minimization; A requires citation of specific prior-user signals ("evidence of having read the room"); R generates next-step/question; T is a constraint/safety gatekeeper. This is presented as "exactly the kind of modular thin vertical slice that scales: you can swap a component without losing the whole behavior."

---

## Finding 6: Pairwise + Elo Internal Empathy Leaderboard for Candidate Voices

**Confidence:** HIGH  
**Raw text:** "Use pairwise + Elo as your internal 'empathy leaderboard': Entif will have many 'candidate voices' (different prompting strategies, different fine-tunes, different agent blends); HEART's pairwise tournament + Bradley–Terry gives you a stable ranking without pretending you have a perfect absolute metric; also makes regressions painfully obvious: 'We gained R but lost A under adversarial turns'"

**Detail:** Proposed use of HEART pairwise tournament + Bradley–Terry as an internal empathy leaderboard across Entif candidate voices (different prompting strategies, fine-tunes, agent blends). The key benefit: stable ranking without needing a perfect absolute metric; regressions become obvious because scores are per-axis. Example regression case: "gained R but lost A under adversarial turns."

---

## Finding 7: Attunement (A) as Memory Discipline Metric — Retrieval/Retrieval-Noise Proxy

**Confidence:** HIGH  
**Raw text:** "Attunement (A) becomes your memory discipline metric: If A drops, your retrieval is noisy, your salience model is wrong, or your 'emotional state estimator' isn't binding to the right evidence"

**Detail:** The A axis is proposed as a memory discipline metric for Entif. When A drops, it signals one of three internal failures: retrieval is noisy, salience model is wrong, or "emotional state estimator" is not binding to the correct evidence. This connects HEART's behavioral surface metric to internal system diagnostics.

---

## Finding 8: Task-Following (T) as Safety + Role Boundary Contract / GuardLayer Compliance

**Confidence:** HIGH  
**Raw text:** "Task-following (T) becomes your safety + role boundary contract: In Entif terms: GuardLayer compliance shouldn't feel like a scold; it should feel like a caring, scope-aware companion"

**Detail:** T axis maps to GuardLayer compliance. The design intent: GuardLayer enforcement should feel like a "caring, scope-aware companion" rather than a scold. This is an explicit UX/behavior constraint on how safety constraints are communicated to the user.

---

## Finding 9: Resonance (R) as Actionability Engine KPI

**Confidence:** HIGH  
**Raw text:** "Resonance (R) becomes your 'actionability engine' KPI: Entif's difference is that it can actually help. R is where 'help' becomes measurable"

**Detail:** R axis is proposed as the actionability engine KPI — where Entif's capacity to actually help becomes measurable. The implication: R is the axis that differentiates Entif from a pure dialogue system because Entif can take real-world actions. R measures whether the system moves the conversation toward helpful concrete next steps.

---

## Related Concepts Not Previously in Ledger

| Concept | Definition | Source Finding |
|---------|-----------|---------------|
| HEART framework | 5-axis empathy eval: H=Human alignment, E=Empathic responsiveness, A=Attunement, R=Resonance, T=Task-following | Finding 1, 2 |
| Bradley–Terry model | Statistical model for pairwise comparison aggregation into Elo-style ratings | Finding 3 |
| adversarial-turn slice | Test slice for stress-testing tone shifts under friction (sarcastic/dismissive/contradictory users) | Finding 4 |
| empathy leaderboard | Internal ranking of candidate voices using pairwise + Elo | Finding 6 |
| memory-discipline-metric | Attunement axis as proxy for retrieval quality and salience model correctness | Finding 7 |
| actionability-engine | Resonance axis as KPI for Entif's help capability | Finding 9 |
| GuardLayer compliance | T-axis mapped to safety/role boundary contract; must feel like "caring companion" not scold | Finding 8 |

---

## Issue Candidates

### EEH-001: HEART Evaluation Receipt Schema — Define canonical storage format for HEART eval receipts

**Type:** implementation  
**Confidence:** HIGH  
**Related findings:** Finding 1  
**Priority:** HIGH  

Rationale: If HEART is to serve as a calibration instrument for Entif's behavioral surface, every eval must be stored as a signed receipt enabling longitudinal tracking across model versions, personas, domains, and safety profiles. No schema currently exists for this in the Rosetta/Entif artifact ecosystem. A schema is needed that captures: input tuple (dialogue history reference, candidate response reference, role/scope constraints), output vector {H,E,A,R,T}, overall preference score, rationale tags, timestamp, evaluator version.

### EEH-002: Adversarial Empathy Test Pack — Curate test cases where user is sarcastic/dismissive/contradictory/volatile and score separately

**Type:** implementation  
**Confidence:** HIGH  
**Related findings:** Finding 4, Finding 6  
**Priority:** MEDIUM  

Rationale: The paper identifies adversarial-turn failure mode (template-y politeness, over-validation that feels fake) as the specific "wreck real deployments" failure. No adversarial empathy test pack currently exists for Entif. Need to curate Entif-specific test cases covering: sarcastic users, dismissive users, contradictory users, emotionally volatile users. These must be scored separately from standard conversational empathy and tracked over time to detect regressions.

### EEH-003: Attunement Axis Diagnostic Bridge — Connect A-axis drops to internal retrieval/salience/emotional-state-estimator diagnostics

**Type:** architecture/spec-gap  
**Confidence:** MEDIUM  
**Related findings:** Finding 7  
**Priority:** MEDIUM  

Rationale: Finding 7 establishes that when Attunement (A) drops, it signals one of three internal failures: (1) retrieval is noisy, (2) salience model is wrong, (3) emotional state estimator not binding to correct evidence. No diagnostic bridge currently exists connecting A-axis behavioral signal to internal system state. This is a spec gap: we need to define how A-axis scores translate into actionable internal diagnostics. Also notable: "emotional state estimator" is mentioned as a distinct internal component — this is the first mention of such a component in the corpus and may represent a new architectural element.

---

## Metadata

- **Concepts count:** 7 new (HEART, Bradley–Terry, adversarial-turn, empathy-leaderboard, memory-discipline-metric, actionability-engine, GuardLayer-compliance)
- **Issue draft count:** 3 (EEH-001 through EEH-003)
- **Findings count:** 9
- **Confidence distribution:** 9 HIGH, 0 MEDIUM, 0 LOW
- **Previously known concepts:** None of the new concepts appear in the ledger's concept cross-reference
- **Collision notes:** None. No collision with existing issue-drafts (no HEART or empathy eval issue-drafts found in docs/intake/issue-drafts/)
- **Relevant prior work:** Semantic Audio Cognition Framework (SAC) has anti-personhood-correlation constraints; HEART adversarial-turn testing may interact with voice/fingerprinting considerations. No direct overlap.