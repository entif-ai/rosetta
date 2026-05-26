const fs = require('fs');
const path = 'docs/intake/docs-intelligence/KNOWLEDGE_GRAPH.yaml';
let content = fs.readFileSync(path, 'utf8');

const newConceptsYaml = `- id: normative-staging-doctrine
  name: Normative Staging Doctrine v0.2
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: Governing build constitution: authority hierarchy, three-rung staircase, Receipt Law as first-class gate, 14 binding ADRs, storage-by-phase trajectory.
  extends:
  - text-core-mvp
  - receipt-law
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
- id: three-rung-staircase
  name: Three-Rung Staircase Model
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: Bootstrap Rung A (proof), Text-Core Rung B (useful), MVP Alpha RC Rung C (ratified). Old alpha demoted to bootstrap proof.
  extends: []
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
- id: authority-hierarchy-doctrine
  name: Authority Hierarchy
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: Constitutional > Implementation > Expansion > Design Donors. Chronology is tie-breaker only. Silent drift is not supersession.
  extends: []
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
- id: adr-register-nsd
  name: ADR Register (ADR-0001 through ADR-0014)
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: 14 binding Accepted ADRs. Individual ADR files do not yet exist at docs/adr/.
  extends:
  - receipt-law
  - three-rung-staircase
  - text-core-mvp
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
  note: NSD-001 tracks authoring individual ADR files
- id: ingress-refinery-pillar-zero
  name: Ingress Refinery as Pillar Zero
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: Mandatory cheap deterministic work before semantic hydration: normalization, hashing, dedupe, revision detection, source typing, metadata extraction, policy/safety screening, promotion gating, candidate-tapestry planning.
  extends:
  - text-core-mvp
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
- id: tool-budget-doctrine
  name: Tool-Budget Doctrine (ADR-0013)
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: Tool budgets defined per role/session; tool-surface size is measurable systems concern; routing ambiguity and context waste treated as regressions.
  extends: []
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
- id: pruning-law
  name: Pruning Law
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: Never delete truth-store tiles to simulate forgetting. Prune indexes, caches, activation priorities. Long-tail may cool but must not silently disappear from constitutional truth layer.
  extends:
  - memory-sovereignty-map
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
- id: ob1-assimilation-process-law
  name: OB1 Assimilation as Process-Law Augmentation
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: OB1 Assimilation Addendum is process-law augmentation not constitutional rewrite. Governs contribution grammar, workflow recipes, AI-readable repo habits. Cannot import ontology or platform gravity.
  extends: []
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
- id: ambiguity-law
  name: Ambiguity Law
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: Ambiguity must produce conjectures, alternatives, or pending-confirmation artifacts rather than fake certainty. Anti-hallucination safeguard.
  extends: []
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
- id: ai-readable-repo-rule
  name: AI-Readable Repo Rule
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: Every important package, pack, recipe, skill must be: machine-legible, explicit about prerequisites, explicit about acceptance conditions, example-rich, narrow in purpose. Structural requirement.
  extends: []
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
- id: supersession-rule
  name: Doctrine Supersession Rule
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: Doctrine superseded only by later doctrine artifact with explicit migration-safe changes, or individual ADRs that modify specific sections without reopening whole constitution. Silent drift is NOT a supersession mechanism.
  extends: []
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
- id: python-specialist-lane-doctrine
  name: Python Specialist Lane Doctrine (ADR-0011)
  introduced_by: docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  introduced_at: '2026-05-26'
  definition: Python allowed for eval harnesses, OCR/ASR, embeddings/ML, corpus utilities, graph experimentation. Python must NOT become shadow constitution for core runtime, guard, receipt, or tapestry law.
  extends: []
  referenced_by:
  - docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
  status: active
`;

// Find the concepts: line and insert after it
const lines = content.split('\n');
let insertAfter = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'concepts:') {
    insertAfter = i;
    break;
  }
}

if (insertAfter >= 0) {
  lines.splice(insertAfter + 1, 0, newConceptsYaml);
  fs.writeFileSync(path, lines.join('\n'));
  console.log('Updated KG - inserted ' + newConceptsYaml.split('\n').length + ' lines of new concepts');
} else {
  console.log('Could not find concepts: marker');
}