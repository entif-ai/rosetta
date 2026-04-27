
# OB1 Assimilation Addendum v0.1
**Title:** Process-Architecture Assimilation Addendum for OB1-Derived Methodologies  
**Status:** Draft, approved as a design-donor addendum  
**Date:** 2026-04-10  
**Depends on:** Doctrine v0.2; ROCK-3111-C; 2026-04-10 consolidated blueprint

---

## 0. Scope and anti-confusion clause

This addendum approves selected methodological imports from the OB1 / Open Brain project family.

It does **not**:
- adopt OB1’s ontology as Rosetta’s ontology
- adopt OB1’s storage gravity as constitutional law
- adopt OB1’s platform assumptions as mandatory
- adopt license-sensitive code or text as derivative product material

It **does**:
- import repo morphology instincts
- import contribution grammar
- import AI-readable repo habits
- import tool-budget doctrine
- import deterministic dedupe / schema-aware routing patterns
- import quiet retrieval behavior as a behavior-layer design principle

The rule is simple:

**OB1 influences our process architecture far more than our semantic constitution.**

---

## 1. Imported principles

## 1.1 Contribution grammar
Approved contribution classes:

- `core/` or `packages/rosetta-*` for constitutional logic
- `packs/` for governed pack families
- `primitives/` for reusable low-level implementation patterns
- `recipes/` for standalone compositional workflows
- `integrations/` for source adapters and tool-connectors
- `skills/` for reusable agent/operator behaviors
- `dashboards/` for human inspection and mission-control surfaces
- `apps/` or `verticals/` for reference implementations

### Consequence
This lets the repo distinguish law, substrate, workflow, integration, and reference application instead of dumping everything into packages or apps.

---

## 1.2 Progressive learning path
The build path should teach by compounding verticals rather than dumping abstractions.

Approved Rosetta-native progression:

1. canonicalization + CID
2. receipt authoring + bundle verification
3. guarded no-side-effect toolcall
4. deterministic ingress refinery
5. schema-aware routing
6. tapestry compilation
7. temporal memory sidecar
8. activation memory sidecar
9. TruthLint / provenance publication workflows
10. broader mission-control and external verticals

### Consequence
Docs, examples, recipes, and reference apps should be ordered this way whenever possible.

---

## 1.3 AI-readable repo rule
Every important package, pack, recipe, skill, and integration should be understandable by:
- a human developer skimming quickly
- a coding agent asked to work within bounds
- CI systems and validators

Each contribution should therefore be:
- stepwise
- explicit about prerequisites
- explicit about success conditions
- explicit about allowed actions
- explicit about where humans click and where agents act
- accompanied by minimal examples

---

## 1.4 Tool-budget doctrine
Tool surfaces are not free. They consume context, introduce routing ambiguity, and increase accidental misuse.

### Mandatory rules
1. each agent role SHOULD have an explicit hot-tool budget
2. near-identical tools SHOULD be consolidated when sensible
3. routing ambiguity tests SHOULD exist for tool-rich roles
4. tool-surface growth SHOULD be treated as a measurable regression

### Default hot-tool budgets
| Role | Hot-tool budget | Notes |
|---|---:|---|
| Bootstrap orchestrator | 4-6 | keep the golden path narrow |
| Ingest refiner | 4 | deterministic surfaces only |
| Guard service | 2-3 | policy eval + token issue/verify |
| Inspector / mission control | 0-2 | mostly read/query surfaces |
| Recipe executor | 6-8 | bounded workflow lane |
| Research / eval harness | 4-6 | explicit non-prod lane |

### Recommended consolidation pattern
Prefer:
- one typed capability tool with `action`
over:
- six nearly identical table-shaped or source-shaped tools

Example:
```json
{
  "tool": "artifact.store",
  "action": "put|get|list|verify|delete_cache_only"
}
```

---

## 1.5 Deterministic dedupe belongs low in the stack
Imported rule:
- normalize first
- hash first
- detect duplicates before expensive reasoning
- revision-detect before reinterpreting
- make imports idempotent

### Rosetta-native translation
Add to Pillar Zero:
- normalization fingerprints
- revision fingerprints
- duplicate suppression
- replay-safe upserts
- dedupe receipts

---

## 1.6 Schema-aware routing
Imported rule:
- raw input always preserved
- metadata drives routing
- additional writes are conditional
- ambiguity is flagged, not guessed

### Rosetta-native translation
For every ingress event:
1. preserve source episode
2. mint source/observation material
3. extract metadata
4. run routing policy
5. promote derived artifacts conditionally
6. emit conjecture or pending-confirmation when ambiguity remains

This applies especially to:
- entity resolution
- author identity uncertainty
- document type classification
- revision/supersession mapping
- action-item extraction

---

## 1.7 Quiet live retrieval
Imported behavior:
- be silent on miss
- be brief on hit
- log and tune retrieval quality
- surface context during work without smothering the user

### Rosetta-native translation
Live retrieval should sit on:
- Rosetta truth/provenance
- temporal state/history memory
- activation/relevance memory
- tapestry assembly

Human-visible retrieval behavior should be:
- scoped
- explainable
- terse
- refusal-safe when policy scope blocks disclosure

---

## 2. Repo morphology and contribution contract

## 2.1 Standard contribution folder contract
Every non-core contribution SHOULD contain:

```txt
README.md
metadata.json
acceptance.md
examples/
tests/
```

When relevant, add:
```txt
policy-scope.json
receipts-fixtures/
CHANGELOG.md
```

### `metadata.json` recommended fields
```json
{
  "id": "recipe.ingest.arxiv",
  "title": "ArXiv text ingest recipe",
  "kind": "recipe",
  "version": "0.1.0",
  "owner": "entif",
  "depends_on": ["packages/ingest-core", "packages/refinery-routing"],
  "human_summary": "Ingest arXiv paper text into Rosetta source/observation/tapestry flow.",
  "agent_hints": {
    "safe_default": "dry-run",
    "required_examples": true
  },
  "status": "draft"
}
```

---

## 2.2 Contribution-specific expectations

### Recipes
A recipe is a reusable workflow. It SHOULD include:
- goal
- prerequisites
- typed inputs
- steps
- receipts emitted
- failure/refusal paths
- acceptance checks

### Skills
A skill is a reusable behavioral bundle. It SHOULD include:
- role
- trigger conditions
- allowed actions
- refusal conditions
- examples
- notes on context/tape budget

### Integrations
An integration SHOULD include:
- source system
- auth assumptions
- normalization rules
- provenance fields captured
- idempotency key
- backoff/retry policy
- parse-only vs side-effecting mode distinction

### Dashboards
A dashboard SHOULD state:
- intended operator
- read/write scope
- refresh cadence
- canonical data queries
- security posture

---

## 3. First approved Rosetta-native recipe set

The following should be the initial recipe wave:

1. `recipe.provenance.bundle.verify`
2. `recipe.ingest.chatlog`
3. `recipe.ingest.arxiv`
4. `recipe.ingest.journal`
5. `recipe.ingest.youtube-transcript`
6. `recipe.ingest.social-thread`
7. `recipe.refinery.dedupe-revision`
8. `recipe.route.schema-aware`
9. `recipe.tapestry.compile`
10. `recipe.truthlint.publish-dry-run`

Each should be dry-run-first and receipt-bearing.

---

## 4. First approved Rosetta-native skill set

1. `skill.receipt-author`
2. `skill.guard-admission`
3. `skill.schema-router`
4. `skill.dedupe-reconciler`
5. `skill.tapestry-assembler`
6. `skill.run-inspector`
7. `skill.retrieval.brief-on-hit`
8. `skill.migration.translator-check`

These are not “persona souls.”  
They are behavior packs.

---

## 5. Ingress refinery upgrades approved by this addendum

The following are upgraded from good ideas to approved implementation targets:

- content fingerprinting
- revision chain detection
- raw-source preservation
- metadata-first routing
- pending-confirmation states
- replay-safe import semantics
- source-type-specific receipt emission
- candidate-tapestry planning

---

## 6. Tool-budget and routing eval requirements

Every hot-tool role SHOULD eventually ship:
- routing ambiguity tests
- false-positive tool selection tests
- context-budget snapshots
- refusal tests for out-of-budget or out-of-scope actions

Recommended metrics:
- number of hot tools
- prompt/tool schema token count
- routing disagreement rate
- misfire rate
- average tool-selection latency
- context consumed by tool manifests

A PR that materially increases tool-surface size SHOULD explain why consolidation was not appropriate.

---

## 7. What not to import from OB1

We explicitly do **not** import:
- central “thoughts table” gravity as constitutional model
- storage stack as mandatory law
- MCP edge-function assumptions as mandatory
- license-sensitive direct code/text transplantation
- any ontology that displaces Rosetta/ROCK pack law

---

## 8. Interaction with Graphiti-style and Muninn-style patterns

### Temporal plane
Approved imports:
- episodic ingest
- time-aware edges
- evolving-state handling
- hybrid retrieval over time + text + graph proximity

### Activation plane
Approved imports:
- recency/frequency/association scoring
- confidence modulation
- total-recall preservation
- trigger-style activation semantics

These remain planes and adapters, not constitutional replacements.

---

## 9. CI hooks and enforcement

### Recommended validators
- manifest presence checker
- metadata schema validator
- acceptance doc presence checker
- example existence checker
- tests existence checker
- tool-budget snapshot checker for tool-heavy roles

### Merge refusal conditions
A contribution SHOULD refuse merge when:
- `README.md` is absent
- `metadata.json` is absent or invalid
- examples are missing
- acceptance conditions are not defined
- a tool-heavy contribution expands the tool surface without an explicit budget note

---

## 10. Immediate implementation actions

1. create top-level `recipes/`, `skills/`, `integrations/`, `dashboards/`, `primitives/`
2. add contribution metadata schema to repo validators
3. scaffold first recipe pack wave
4. scaffold first skill wave
5. add tool-budget checks to CI/eval
6. implement deterministic dedupe and schema-aware routing in Pillar Zero packages
7. treat quiet retrieval behavior as a requirement for future operator-facing context surfacing

This addendum is now the approved bridge from OB1’s best process instincts into Rosetta/Entif’s own ecosystem.
