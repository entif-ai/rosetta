# Rosetta + Entif MVP Forge Blueprint

## Build Thesis and MVP Cut

**Coverage map of your required “mandatory output sections.”**  
To keep the repo blueprint immediately buildable (and keep the document navigable), every required section title is included below as a **bolded label** inside a small number of major sections, rather than as 22 separate top-level headers. This preserves your demanded content while keeping the report structured and implementation-centric.

**Authoritative baselines actually available in this run.**  
I was able to retrieve and ground the blueprint in (a) **Rosetta v3.0.0 Core Spine Specification** (PDF), (b) **ROCK-31XX (RRP / receipts / provenance / TruthLint)** (MD), (c) **Entif 2.0 Secure Architecture Companion** (PDF), (d) **Entif 2.0 Decentralization & Governance** (PDF), (e) **Cognitive Tiles and Swarm Gnosis** (PDF), plus several supporting internal notes (e.g., “Rosetta Pasigraphy – Architecture Blueprint”). fileciteturn1file0turn3file2turn5file12turn5file3turn3file11turn4file12  
Several other filenames you listed (taxonomy, voice control overview, cost-savings agentic OS PRD, etc.) did **not** appear in the available connected sources for this session; where their presence would materially change an MVP decision, I mark that explicitly as **Deferred / Missing Baseline** rather than guessing.

**Executive Build Thesis**  
Rosetta’s MVP alpha must not be “a cool agent.” It must be a **deterministic provenance substrate** with an auditable execution spine. The minimal operational spine is: **Run → Action → ToolCall → Observation → Evaluation → Receipt**, with **raw signals remaining distinct from later interpretations**, and with **receipts-first instrumentation** as the default outcome of meaningful lifecycle steps. fileciteturn1file0turn3file2  
Entif’s MVP posture, as reflected in the secure architecture companion, is: **separation of duties** between proposer / gatekeeper / executor; **deny-by-default guarded execution**; **dry-run / sandbox-first** where practical; and **policy-as-code** with decision tokens and hot-reloadable bundles. fileciteturn5file12turn5file10turn5file3  
Therefore, the pragmatic MVP is a **Rosetta Kernel + RRP receipts pack + Guard gate + minimal context compiler**, shipped as a **headless CLI + local-first API**, with tests and conformance vectors that make third-party verification possible. This matches the RRP posture of “refine-before-extend”: RRP constrains how to author and verify **rosetta.receipt** and how to package verification closure as a **rosetta.tapestry receipt bundle** profile. fileciteturn3file10turn3file2

**What this is**  
A repo-forge package: the minimum buildable monorepo scaffold that lets a solo builder start writing tests and turning them green **immediately**, while preserving Rosetta-first invariants and Entif guard posture.

**What this is not**  
Not a full decentralized Entif Grid, not a full ledger/chain, not a full ontology/taxonomy system, not UI-first, not a speculative “swarm cognition” implementation. Those remain **reserved interfaces** with failing/pending tests.

**Final MVP Cut**  
The boundary below is tuned to produce a functional **MVP alpha release candidate** that demonstrates the invariant loop: **typed events → deterministic CID → signed receipts → bundle closure → zero-trust verification**, with **guarded execution** in front of any “side-effect” tool.

| Area | In MVP Alpha | Out of MVP Alpha (explicitly deferred) |
|---|---|---|
| Rosetta spine objects | Run, Action, ToolCall, Observation, Evaluation tile schemas; deterministic canonicalization; CID computation | Full pasigraphy / advanced semantic packs beyond what’s needed for receipts-first loop |
| Receipts | RRP receipt content schema, receipt types taxonomy, receipt bundle tapestry profile, verifier algorithm + conformance vectors | Multi-party quorum receipts beyond placeholder (except naming + reserved schema slots) |
| Guard | Deny-by-default policy gate; Guard Decision Token; dry-run support; enforcement in executor admission; receipts reference token | Full OPA/Rego compiler + threat-intel automation pipelines (stubs only) |
| Storage | Local content-addressed tile store (filesystem); SQLite index for lookup; append-only log abstraction stub | Distributed storage / consensus / transparency log production hardening |
| Context | “Compiled context package” (tapestry manifest) with rights-scope enforced at retrieval | Rich memory fantasies, GraphRAG, distributed cache (interfaces only) |
| Interfaces | CLI + minimal HTTP API + MCP-style tool contract stubs | Full operator/admin UI; voice control |
| Tests | Unit + integration + golden conformance + negative security tests; CI gates | Long-haul fuzzing/red-team plane (stub target) |

**MVP Alpha Release Candidate Definition**  
A build is an **alpha RC** when all of the following are true:

1. `rosetta-cli` can create a run, record a toolcall (even to a toy tool), emit receipts, build a receipt-bundle tapestry, and verify the bundle end-to-end using the verifier algorithm (CID + signature + digest + policy references). fileciteturn3file2turn3file10  
2. Any tool marked side-effecting **fails closed** unless it presents a fresh Guard Decision Token, consistent with “executor denies any bundle lacking a fresh Guard decision.” fileciteturn5file10turn5file12  
3. Rights-scoped retrieval is enforced at the storage/retrieval boundary (no “retrieve then filter later”).  
4. The RRP conformance vectors (TV1 + tamper-negative) are green (CID matches expected digests; tampering fails verification). fileciteturn3file12turn3file2  
5. CI gates are green (lint, typecheck, unit, integration, conformance). Backlog tests exist but are excluded from merge gates by policy.

**Initial ADR list to create immediately** (create these as `docs/adr/ADR-*.md` on day zero)
- ADR: MVP boundary and explicit exclusions  
- ADR: Canonicalization format (JCS JSON canonicalization) and signature commitment rule (sig excluded from CID; signs CID) fileciteturn3file10  
- ADR: Policy bundle format (JSON now; pluggable compiler later) aligned with Guard posture fileciteturn5file3turn5file12  
- ADR: Known-red-tests policy (how backlog tests are represented without blocking RC)  
- ADR: Rights model fields (tenant/sensitivity/consumer scope) and enforcement points

## Repo Strategy and Workspace Scaffold

**Architectural Boundaries and Repo Strategy**  
The secure architecture companion repeatedly implies (and in places states directly) that the system must keep roles separate: proposer ≠ gatekeeper ≠ executor, with policy enforcement and receipts as the accountability layer. fileciteturn5file12turn2file5turn5file10  
So the repo is partitioned around **interfaces that enforce these separation lines**:

- **Protocol & determinism layer** (Rosetta core: envelopes, canonicalization, CID rules)
- **Receipts layer** (RRP pack: receipt schemas, types, verifier, conformance vectors)
- **Guard layer** (policy evaluation, decision tokens, deny-by-default admission)
- **Store & retrieval layer** (content-addressed store, rights enforcement, cache keys)
- **Context compiler layer** (tapestry manifests as bounded compiled context packages)
- **Execution adapters** (tools, MCP endpoints) that can be swapped without changing the spine

**Monorepo decision**  
Nx + pnpm, per your stack mandate. The value is the Nx project graph + affected execution + caching compatibility, which matters once you have many small protocol packages and tests.

**Naming conventions**
- Workspace name: `rosetta-entif` (placeholder)
- NPM scope: `@entif/*` (single-scope publishing and internal linking)
- Package names: `@entif/rosetta-core`, `@entif/rosetta-receipts`, `@entif/rosetta-guard`, etc.
- Schema IDs: `rosetta.core.*` for core, `rrp.*` for RRP pack schemas, `entif.guard.*` for guard tokens.

**Monorepo Scaffold** (day-zero tree; paste into repo as your target layout)

```txt
rosetta-entif/
  apps/
    rosetta-cli/
      src/
        main.ts
        commands/
          init.ts
          tile-add.ts
          run-demo.ts
          verify.ts
      project.json
      tsconfig.json
    rosetta-api/
      src/
        main.ts
        routes/
          ingest.ts
          runs.ts
          guard.ts
          verify.ts
      project.json
      tsconfig.json
    rosetta-operator/
      src/
        app/
          App.tsx
          main.tsx
      project.json
      tsconfig.json

  packages/
    rosetta-core/
      src/
        index.ts
        envelope.ts
        kinds.ts
        errors.ts
      project.json
    rosetta-canon/
      src/
        index.ts
        jcs.ts
      project.json
    rosetta-cid/
      src/
        index.ts
        sha256.ts
        multihash.ts
        cid.ts
      project.json
    rosetta-schemas/
      schema/
        rosetta/
          tile-envelope.schema.json
          run.schema.json
          action.schema.json
          toolcall.schema.json
          observation.schema.json
          evaluation.schema.json
          receipt.schema.json
          tapestry.schema.json
        rrp/
          receipt-content.schema.json
          receipt-bundle-tapestry.schema.json
        entif/
          guard-decision-token.schema.json
          rights-scope.schema.json
          migration-metadata.schema.json
      src/
        index.ts
        zod/
          (optional generated zod mirrors)
      project.json
    rosetta-store/
      src/
        index.ts
        cas.ts
        index-sqlite.ts
        rights.ts
      project.json
    rosetta-receipts/
      src/
        index.ts
        receipt-builder.ts
        receipt-verifier.ts
        rrp-types.ts
      project.json
    rosetta-guard/
      src/
        index.ts
        policy-bundle.ts
        policy-eval.ts
        decision-token.ts
        admission.ts
      project.json
    rosetta-tapestry/
      src/
        index.ts
        builder.ts
        closure.ts
      project.json
    rosetta-mcp/
      src/
        index.ts
        tool-contract.ts
        tool-router.ts
      project.json
    rosetta-tools/
      src/
        index.ts
        builtin/
          echo.ts
          fs-read.ts
          fs-write.ts
      project.json

  tests/
    fixtures/
      rrp/
        tv1.hash-input.json
        tv1.expected.json
        tv1.tampered.json
    conformance/
      rrp-tv1.spec.ts
      rrp-tamper-negative.spec.ts
    integration/
      demo-run.spec.ts
      guard-deny.spec.ts
    backlog/
      distributed-ledger.spec.ts
      zkp-attestation.spec.ts

  tools/
    scripts/
      check-traceability-headers.ts
      validate-schemas.ts
      generate-fixtures.ts
    generators/
      rosetta-package/
        generator.ts
        files/
          src/index.ts__tmpl__
          project.json__tmpl__
          README.md__tmpl__
          src/__file_header__.txt

  docs/
    adr/
      ADR-0000-template.md
      ADR-0001-mvp-cut.md
      ADR-0002-canonicalization-and-signatures.md
      ADR-0003-guard-policy-bundles.md
      ADR-0004-rights-scope.md
    protocol/
      ROCK-3111-summary.md
      RRP-Implementation-Notes.md
    runbooks/
      local-dev.md
      release-checklist.md

  configs/
    eslint/
      base.eslintrc.cjs
    typescript/
      tsconfig.base.json

  .github/
    workflows/
      ci.yml

  .husky/
    pre-commit
    commit-msg

  package.json
  pnpm-workspace.yaml
  nx.json
  tsconfig.base.json
  eslint.config.js
  .prettierrc
  .editorconfig
  .gitignore
  Makefile
  README.md
```

**Package and Module Responsibilities**

| Package | Responsibility | “Must emit receipts?” | Notes |
|---|---|---:|---|
| `@entif/rosetta-core` | Tile envelope types, spine kinds, error taxonomy | ✅ | Core spine objects must remain stable and minimal. fileciteturn1file0 |
| `@entif/rosetta-canon` | Deterministic canonicalization (JCS) | ✅ | Required for stable CIDs and cross-runtime determinism. fileciteturn3file2turn3file10 |
| `@entif/rosetta-cid` | SHA-256 + multihash + CID encoding | ✅ | RRP test vectors depend on this being exact. fileciteturn3file12 |
| `@entif/rosetta-schemas` | JSON Schemas + schema validation utilities | ✅ | Contract-first posture; used in conformance tests. fileciteturn3file2 |
| `@entif/rosetta-store` | Content-addressed storage + rights enforcement | ✅ | “Do not retrieve first and filter later” enforced here. |
| `@entif/rosetta-receipts` | RRP receipt authoring + zero-trust verifier | ✅ | Implements receipt types + verification algorithm. fileciteturn3file2turn3file13 |
| `@entif/rosetta-guard` | Guard policy eval + decision tokens + admission | ✅ | Enforces deny-by-default + token-based admission. fileciteturn5file10turn5file3 |
| `@entif/rosetta-tapestry` | Receipt bundle tapestry builder + closure | ✅ | Implements `rrp:tapestry.profile.receipt_bundle` closure rule. fileciteturn3file2 |
| `@entif/rosetta-mcp` | MCP-style tool contracts + router | ✅ | Keeps tool surface typed and auditable. |
| `apps/rosetta-cli` | Headless MVP interface and demos | ✅ | “Skateboard slice” lives here first. |
| `apps/rosetta-api` | Minimal HTTP service surface | ✅ | Enables later UI without changing kernel. |
| `apps/rosetta-operator` | Minimal React stub | ❌ | Out-of-scope for MVP; just scaffolding. |

**Root Config Files and Tooling** (inline draft artifacts)

**Root `pnpm-workspace.yaml`**
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**Root `package.json`** (minimal; expand as needed)
```json
{
  "name": "rosetta-entif",
  "private": true,
  "packageManager": "pnpm@9.0.0",
  "scripts": {
    "nx": "nx",
    "lint": "nx run-many -t lint",
    "typecheck": "nx run-many -t typecheck",
    "test": "nx run-many -t test",
    "build": "nx run-many -t build",
    "conformance": "nx run-many -t conformance",
    "smoke": "nx run-many -t smoke",
    "trace:check": "nx run-many -t trace:check",
    "ci": "pnpm lint && pnpm typecheck && pnpm test && pnpm conformance && pnpm build",
    "backlog": "nx run-many -t backlog"
  },
  "devDependencies": {
    "nx": "^20.0.0",
    "@nx/js": "^20.0.0",
    "@nx/node": "^20.0.0",
    "@nx/react": "^20.0.0",
    "typescript": "^5.6.0",
    "vitest": "^2.0.0",
    "eslint": "^9.0.0",
    "prettier": "^3.0.0",
    "zod": "^3.23.0",
    "@types/node": "^22.0.0"
  }
}
```

**Root `nx.json`** (cache-friendly; affected-ready)
```json
{
  "workspaceLayout": {
    "appsDir": "apps",
    "libsDir": "packages"
  },
  "targetDefaults": {
    "test": { "cache": true },
    "conformance": { "cache": true },
    "build": { "cache": true },
    "lint": { "cache": true },
    "typecheck": { "cache": true },
    "trace:check": { "cache": true }
  }
}
```

**Makefile** (task-runner shim; “cheap-first” ergonomics)
```makefile
.PHONY: install lint typecheck test conformance build ci demo trace backlog

install:
	pnpm install

lint:
	pnpm lint

typecheck:
	pnpm typecheck

test:
	pnpm test

conformance:
	pnpm conformance

build:
	pnpm build

trace:
	pnpm trace:check

ci:
	pnpm ci

demo:
	pnpm nx run rosetta-cli:run-demo

backlog:
	pnpm backlog
```

**CI workflow draft** (`.github/workflows/ci.yml`)
```yaml
name: ci
on:
  pull_request:
  push:
    branches: [ main ]

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Install
        run: pnpm install --frozen-lockfile

      - name: Traceability headers
        run: pnpm trace:check

      - name: Lint
        run: pnpm lint

      - name: Typecheck
        run: pnpm typecheck

      - name: Unit + integration tests
        run: pnpm test

      - name: Conformance tests
        run: pnpm conformance

      - name: Build
        run: pnpm build
```

**One ADR template** (`docs/adr/ADR-0000-template.md`)
```md
# ADR: <short title>

## Status
Proposed | Accepted | Superseded | Deprecated

## Context
What problem are we solving? What constraints apply (Rosetta invariants, receipts-first, guard, rights)?

## Decision
What did we decide? Include:
- Chosen option
- Version / date
- Affected packages
- Migration strategy (if any)

## Consequences
Positive outcomes, tradeoffs, risks.

## Alternatives considered
List 2–4 viable options and why rejected.

## Governing references
- Rosetta v3.0.0: <section or glossary term>
- ROCK-31XX / RRP: <receipt rule>
- Entif Secure Architecture: <guard posture>
```

**Recommended Nx project/generator strategy**  
Create a local generator `tools/generators/rosetta-package` that scaffolds **protocol-sensitive packages** with:
- a mandated traceability header template (when required),
- `project.json` targets for `lint/test/typecheck/build/conformance/smoke/trace:check`,
- seeded conformance test hooks (even if empty), and
- schema folder placeholders (if the package is contract-heavy).

**Example project target pattern** (`packages/rosetta-receipts/project.json`)
```json
{
  "name": "rosetta-receipts",
  "sourceRoot": "packages/rosetta-receipts/src",
  "projectType": "library",
  "targets": {
    "lint": { "executor": "@nx/eslint:lint" },
    "typecheck": {
      "executor": "@nx/js:tsc",
      "options": { "tsConfig": "packages/rosetta-receipts/tsconfig.json" }
    },
    "test": {
      "executor": "@nx/js:vitest",
      "options": { "passWithNoTests": false }
    },
    "conformance": {
      "executor": "@nx/js:vitest",
      "options": { "testNamePattern": "conformance" }
    },
    "build": { "executor": "@nx/js:tsc" },
    "trace:check": {
      "executor": "nx:run-commands",
      "options": {
        "command": "node tools/scripts/check-traceability-headers.ts packages/rosetta-receipts/src"
      }
    }
  }
}
```

## Contracts and Canonical Schemas

**Canonical Schemas and Example Payloads**  
This section implements the “contract-first core schemas” mandate: JSON Schemas are first-class, and code must validate them before storage or execution.

**Schema ID conventions**
- Core schema IDs: `rosetta.core/<kind>@<semver>`
- RRP schema IDs: `rrp/<thing>@<semver>`
- Guard schema IDs: `entif.guard/<thing>@<semver>`

**Canonicalization and signature constraints**  
RRP explicitly constrains receipt authoring:
- Receipts MUST include `kind="rosetta.receipt"`, `timestamp`, and `nonce`, and include `sig` and `auth`. fileciteturn3file10  
- Signature hashing rule: `sig` MUST NOT be included in CID computation, and MUST sign the CID (or stable canonical bytes). fileciteturn3file10  
These rules become unit tests and conformance tests; do not ship without them green.

### Core schemas

#### Tile envelope schema

`packages/rosetta-schemas/schema/rosetta/tile-envelope.schema.json`
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "rosetta.core/tile-envelope@0.1.0",
  "title": "Rosetta Tile Envelope",
  "type": "object",
  "additionalProperties": false,
  "required": ["kind", "timestamp", "content"],
  "properties": {
    "cid": { "type": "string", "description": "Content ID (computed). Optional at authoring time." },
    "kind": { "type": "string", "description": "Tile kind (e.g., rosetta.run, rosetta.receipt)." },
    "timestamp": { "type": "string", "format": "date-time" },
    "nonce": { "type": "string", "description": "Recommended for receipts to avoid accidental duplication collisions." },
    "run": { "type": "string", "description": "CID of containing Run (if applicable)." },
    "derived_from": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Immediate provenance pointers to upstream tiles."
    },
    "summary": { "type": "string" },
    "auth": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "kid": { "type": "string", "description": "Key identifier / DID fragment." }
      }
    },
    "sig": {
      "type": "object",
      "additionalProperties": true,
      "description": "Signature object. MUST NOT be included in CID computation for receipts."
    },
    "content": { "type": "object", "additionalProperties": true }
  }
}
```

#### Run schema

`packages/rosetta-schemas/schema/rosetta/run.schema.json`
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "rosetta.core/run@0.1.0",
  "title": "Rosetta Run Tile",
  "allOf": [
    { "$ref": "rosetta.core/tile-envelope@0.1.0" },
    {
      "type": "object",
      "properties": {
        "kind": { "const": "rosetta.run" },
        "content": {
          "type": "object",
          "additionalProperties": false,
          "required": ["run_id", "actor"],
          "properties": {
            "run_id": { "type": "string" },
            "actor": { "type": "string", "description": "Human/service/agent identity label." },
            "purpose": { "type": "string" },
            "tags": { "type": "array", "items": { "type": "string" } }
          }
        }
      }
    }
  ]
}
```

#### ToolCall schema

`packages/rosetta-schemas/schema/rosetta/toolcall.schema.json`
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "rosetta.core/toolcall@0.1.0",
  "title": "Rosetta ToolCall Tile",
  "allOf": [
    { "$ref": "rosetta.core/tile-envelope@0.1.0" },
    {
      "type": "object",
      "properties": {
        "kind": { "const": "rosetta.toolcall" },
        "content": {
          "type": "object",
          "additionalProperties": false,
          "required": ["tool", "args", "mode"],
          "properties": {
            "tool": { "type": "string" },
            "args": { "type": "object", "additionalProperties": true },
            "mode": { "type": "string", "enum": ["parse_only", "dry_run", "execute"] },
            "expected_effects": {
              "type": "array",
              "items": { "type": "string" },
              "description": "Declared side-effect classes (network, filesystem.write, etc)."
            },
            "guard_decision_id": { "type": "string" }
          }
        }
      }
    }
  ]
}
```

#### Observation schema (raw signal separation)

`packages/rosetta-schemas/schema/rosetta/observation.schema.json`
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "rosetta.core/observation@0.1.0",
  "title": "Rosetta Observation Tile",
  "allOf": [
    { "$ref": "rosetta.core/tile-envelope@0.1.0" },
    {
      "type": "object",
      "properties": {
        "kind": { "const": "rosetta.observation" },
        "content": {
          "type": "object",
          "additionalProperties": false,
          "required": ["signal_kind", "payload"],
          "properties": {
            "signal_kind": {
              "type": "string",
              "description": "Raw signal type (text, http_response, file_bytes, etc)."
            },
            "payload": {
              "type": "object",
              "additionalProperties": true,
              "description": "Raw payload, kept distinct from later interpretations."
            },
            "source": { "type": "string" }
          }
        }
      }
    }
  ]
}
```

### Receipt schemas (RRP-aligned)

RRP defines (a) required receipt families, (b) receipt bundle tapestry profile, and (c) a verifier algorithm that must be able to do zero-trust verification by recomputing CIDs, validating signatures, anchoring to Run, validating digests, and validating referenced policies. fileciteturn3file2turn3file13turn3file10

#### Receipt content schema (RRP)

`packages/rosetta-schemas/schema/rrp/receipt-content.schema.json`
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "rrp/receipt-content@0.1.0",
  "title": "RRP Receipt Content",
  "type": "object",
  "additionalProperties": false,
  "required": ["receipt_type", "subjects", "claims", "digests"],
  "properties": {
    "receipt_type": { "type": "string", "description": "Controlled term in rrp.receipt_types." },
    "subjects": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["cid"],
        "properties": {
          "cid": { "type": "string" },
          "role": { "type": "string" }
        }
      }
    },
    "claims": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["claim_type", "statement", "evidence", "verdict"],
        "properties": {
          "claim_type": { "type": "string" },
          "statement": { "type": "string" },
          "evidence": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "required": ["cid"],
              "properties": {
                "cid": { "type": "string" },
                "span": { "type": "string" }
              }
            }
          },
          "verdict": { "type": "string", "enum": ["pass", "fail", "partial", "unknown"] },
          "confidence": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "matrix_cid": { "type": "string" },
              "value": { "type": "number", "minimum": 0, "maximum": 1 },
              "rationale": { "type": "string" }
            }
          }
        }
      }
    },
    "digests": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["alg", "digest", "of", "cid_ref"],
        "properties": {
          "alg": { "type": "string" },
          "digest": { "type": "string" },
          "of": { "type": "string" },
          "cid_ref": { "type": "string" }
        }
      }
    },
    "policy_refs": { "type": "array", "items": { "type": "string" } }
  }
}
```

#### Receipt tile schema (ties envelope + RRP content)

`packages/rosetta-schemas/schema/rosetta/receipt.schema.json`
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "rosetta.core/receipt@0.1.0",
  "title": "Rosetta Receipt Tile (RRP-aligned)",
  "allOf": [
    { "$ref": "rosetta.core/tile-envelope@0.1.0" },
    {
      "type": "object",
      "required": ["nonce", "auth", "sig"],
      "properties": {
        "kind": { "const": "rosetta.receipt" },
        "content": { "$ref": "rrp/receipt-content@0.1.0" }
      }
    }
  ]
}
```

### Guard schemas (Entif-aligned)

Entif’s secure architecture companion explicitly calls out Guard decision tokens, executor admission verification, and sealed bundles with resource caps + egress allowlists, plus receipt schema extensions for `guard_decision_id`, `policy_version`, expected vs actual cost, and ledger anchor IDs. fileciteturn5file13turn5file10turn5file12

`packages/rosetta-schemas/schema/entif/guard-decision-token.schema.json`
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "entif.guard/guard-decision-token@0.1.0",
  "title": "Guard Decision Token",
  "type": "object",
  "additionalProperties": false,
  "required": ["decision_id", "decision", "policy_version", "issued_at", "subject", "sig"],
  "properties": {
    "decision_id": { "type": "string" },
    "decision": { "type": "string", "enum": ["allow", "modify", "quarantine", "require_human", "deny"] },
    "issued_at": { "type": "string", "format": "date-time" },
    "expires_at": { "type": "string", "format": "date-time" },

    "policy_version": { "type": "string" },
    "policy_hash": { "type": "string" },

    "constitution_hash": { "type": "string", "description": "Reserved: Genesis/constitution hash (future ledger integration)." },
    "chain_height": { "type": "integer", "minimum": 0, "description": "Reserved: ledger chain height (future)." },

    "subject": {
      "type": "object",
      "additionalProperties": false,
      "required": ["tool", "toolcall_cid"],
      "properties": {
        "tool": { "type": "string" },
        "toolcall_cid": { "type": "string" },
        "tenant_id": { "type": "string" },
        "effects": { "type": "array", "items": { "type": "string" } }
      }
    },

    "constraints": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "dry_run_only": { "type": "boolean" },
        "resource_caps": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "cpu_ms": { "type": "integer", "minimum": 0 },
            "mem_mb": { "type": "integer", "minimum": 0 }
          }
        },
        "egress_allowlist": { "type": "array", "items": { "type": "string" } }
      }
    },

    "rationale": { "type": "string" },
    "sig": {
      "type": "object",
      "additionalProperties": false,
      "required": ["alg", "kid", "signed", "sig_b64"],
      "properties": {
        "alg": { "type": "string" },
        "kid": { "type": "string" },
        "signed": { "type": "string" },
        "sig_b64": { "type": "string" }
      }
    }
  }
}
```

### Example payloads

#### Example Receipt (RRP `rrp:toolcall.execution`)  
This shape mirrors the RRP receipt content structure (subjects/claims/digests/policy_refs). fileciteturn3file13turn3file2

```json
{
  "kind": "rosetta.receipt",
  "timestamp": "2026-04-10T12:00:00Z",
  "nonce": "demo-receipt-0001",
  "run": "cid:run.demo.0001",
  "derived_from": ["cid:toolcall.demo.0001", "cid:obs.demo.0001"],
  "auth": { "kid": "did:example:entif-guard#k1" },
  "sig": {
    "alg": "ed25519",
    "kid": "did:example:entif-guard#k1",
    "signed": "cid.multihash_sha2-256",
    "sig_b64": "BASE64_SIGNATURE_PLACEHOLDER"
  },
  "content": {
    "receipt_type": "rrp:toolcall.execution",
    "subjects": [
      { "cid": "cid:toolcall.demo.0001", "role": "rrp:subject.toolcall" },
      { "cid": "cid:obs.demo.0001", "role": "rrp:subject.observation" }
    ],
    "claims": [
      {
        "claim_type": "rrp:claim.executed",
        "statement": "ToolCall executed with recorded request/response digests",
        "evidence": [{ "cid": "cid:obs.demo.0001", "span": "payload.text" }],
        "verdict": "pass"
      }
    ],
    "digests": [
      { "alg": "sha256", "of": "toolcall.request", "digest": "…", "cid_ref": "cid:toolcall.demo.0001" },
      { "alg": "sha256", "of": "toolcall.response", "digest": "…", "cid_ref": "cid:obs.demo.0001" }
    ],
    "policy_refs": ["cid:policy.baseline-v1"]
  }
}
```

#### Example Guard Decision Token  
Token semantics align with Entif’s “executor denies bundle lacking a fresh Guard decision” and include resource caps + egress allowlist placeholders. fileciteturn5file10turn5file12

```json
{
  "decision_id": "gdt.demo.0001",
  "decision": "allow",
  "issued_at": "2026-04-10T11:59:58Z",
  "expires_at": "2026-04-10T12:04:58Z",
  "policy_version": "baseline-v1",
  "policy_hash": "sha256:POLICY_HASH",
  "constitution_hash": "sha256:GENESIS_HASH_PLACEHOLDER",
  "chain_height": 0,
  "subject": {
    "tool": "builtin.echo",
    "toolcall_cid": "cid:toolcall.demo.0001",
    "tenant_id": "tenant.demo",
    "effects": ["none"]
  },
  "constraints": {
    "dry_run_only": false,
    "resource_caps": { "cpu_ms": 50, "mem_mb": 64 },
    "egress_allowlist": []
  },
  "rationale": "Echo is non-side-effecting; allowed under baseline policy.",
  "sig": {
    "alg": "ed25519",
    "kid": "did:example:entif-guard#k1",
    "signed": "sha256:CANONICAL_TOKEN_BYTES",
    "sig_b64": "BASE64_SIGNATURE_PLACEHOLDER"
  }
}
```

#### Example Receipt Bundle Tapestry Manifest  
RRP requires a tapestry profile `rrp:tapestry.profile.receipt_bundle` and requires closure for any “verified/audited” claim: include subject tiles, receipt tiles, evidence tiles, referenced policy tiles, and enough provenance links to reach raw observations. fileciteturn3file2

```json
{
  "kind": "rosetta.tapestry",
  "timestamp": "2026-04-10T12:00:01Z",
  "nonce": "bundle.demo.0001",
  "content": {
    "profile": "rrp:tapestry.profile.receipt_bundle",
    "roots": {
      "receipts": ["cid:receipt.demo.0001"]
    },
    "members": [
      "cid:run.demo.0001",
      "cid:toolcall.demo.0001",
      "cid:obs.demo.0001",
      "cid:policy.baseline-v1",
      "cid:receipt.demo.0001"
    ],
    "build": {
      "builder": "@entif/rosetta-tapestry@0.1.0",
      "built_at": "2026-04-10T12:00:01Z",
      "closure_policy": "rrp.bundle.closure.v0"
    }
  }
}
```

## Test Architecture and Acceptance Gates

**Test Strategy and TDD Rules**  
RRP includes explicit verifier expectations and test vectors (expected digests + negative tampering must fail verification). fileciteturn3file12turn3file2  
Entif’s secure companion emphasizes guard admission design, failure modes, and auditability signals as acceptance criteria. fileciteturn5file13turn5file12  
Therefore the testing stack is organized as:

- **Unit tests**: canonicalization, CID computation, schema validation, policy decisions.
- **Golden / conformance tests**: RRP TV vectors: CID and signature checks; tampering fails.
- **Integration tests**: full Run→Action→ToolCall→Observation→Evaluation→Receipt→Bundle→Verify loop.
- **Negative / security tests**: missing token, scope crossing retrieval, malformed payload rejection.
- **Backlog-only tests** (allowed to fail; excluded from merge gates): ledger anchoring, ZKP attestations, distributed execution.

**Rule: when is a failing test acceptable vs blocking?**
- Merge gates (CI) MUST be green: `lint`, `typecheck`, `test`, `conformance`, `build`, `trace:check`.
- Only tests under `tests/backlog/**` are allowed to fail, and they MUST run under a separate `nx backlog` target that is not part of the CI gate list.
- `it.todo()` is allowed for “not-yet-authored” tests but should be converted to failing tests under `tests/backlog/**` once the contract is stable enough to specify expected behavior.

**Positive-Frame and Negative-Frame Acceptance Matrix**  
This is the “engineering truth” acceptance grid. (Keep this table in `docs/runbooks/release-checklist.md` as the living gate.)

| Acceptance area | Positive-frame: must pass | Negative-frame: must refuse/fail |
|---|---|---|
| Schema acceptance | Valid tiles validate; canonicalizer stable | Malformed tiles rejected deterministically |
| Determinism | Same payload ⇒ same CID | CID mismatch detection triggers verifier failure fileciteturn3file2 |
| Receipt emission | Meaningful steps emit receipts | Missing receipts for “verified” claims fails closure rules fileciteturn3file2 |
| Guard admission | Allowed tools execute only with token | No token ⇒ deny-by-default; side effects blocked fileciteturn5file10turn5file12 |
| Rights-scoped retrieval | Allowed scope retrieves bounded set | Cross-scope retrieval rejected at query time |
| Replay / verification | Receipt bundle verifies by algorithm | Tampering test fails verification fileciteturn3file12 |
| Policy traceability | Receipt references policy tiles | Unknown policy refs fail validation under strict mode |
| Cache/keying | Cache key includes rights + policy versions | Wrong cache key must not leak other tenant data |

### Concrete test artifacts you can paste in now

#### Unit test example (CID determinism + TV1 digest match)

`tests/conformance/rrp-tv1.spec.ts`
```ts
/**
 * Purpose Summary:
 * - Conformance test for RRP TV1: canonicalization -> sha256 -> multihash -> CID.
 * - Ensures cross-runtime determinism for receipts-first verification.
 *
 * Rosetta Relevance:
 * - Enforces content-addressed determinism and receipt verification prerequisites.
 *
 * Governing References:
 * - ROCK-31XX: RRP test vectors (TV1 expected digests; tamper must fail)
 *
 * Optional Implementation Notes:
 * - Must use exact JCS canonicalization rules used by the repo's canonicalizer.
 */

import { describe, it, expect } from "vitest";
import tv1 from "../fixtures/rrp/tv1.hash-input.json";
import expected from "../fixtures/rrp/tv1.expected.json";
import { canonicalizeJcs } from "../../packages/rosetta-canon/src/jcs";
import { sha256Hex } from "../../packages/rosetta-cid/src/sha256";
import { toMultihashHex, toCidBase58btc } from "../../packages/rosetta-cid/src/cid";

describe("conformance: rrp tv1", () => {
  it("computes expected sha256 and cid for TV1", () => {
    const bytes = canonicalizeJcs(tv1);
    const sha = sha256Hex(bytes);
    expect(sha).toBe(expected.sha256_hex);

    const mh = toMultihashHex(sha);
    expect(mh).toBe(expected.multihash_hex);

    const cid = toCidBase58btc(mh);
    expect(cid).toBe(expected.cid_zb58);
  });
});
```

#### Integration test example (vertical slice end-to-end)

`tests/integration/demo-run.spec.ts`
```ts
/**
 * Purpose Summary:
 * - End-to-end spine test: Run -> ToolCall -> Observation -> Receipt -> ReceiptBundle -> Verify.
 *
 * Rosetta Relevance:
 * - Proves the minimal operational spine and receipt bundle closure can replay/verify.
 *
 * Governing References:
 * - Rosetta v3 core spine glossary (Run/Action/ToolCall/Observation/Evaluation/Receipt)
 * - ROCK-31XX: receipt bundle profile + verifier algorithm
 *
 * Optional Implementation Notes:
 * - Uses builtin.echo (non-side-effect tool) for MVP.
 */

import { describe, it, expect } from "vitest";

describe("integration: demo run", () => {
  it("creates a run and verifies its receipt bundle", async () => {
    // TODO: implement with rosetta-cli programmatic API
    // 1) init store
    // 2) create run tile
    // 3) create toolcall tile for builtin.echo
    // 4) guard allow -> decision token
    // 5) execute echo -> observation tile
    // 6) emit receipt tile (rrp:toolcall.execution)
    // 7) build receipt bundle tapestry
    // 8) verify bundle (CID + sig + digests + policy refs)
    expect(true).toBe(false); // red first
  });
});
```

#### Negative/security test example (deny-by-default without Guard token)

`tests/integration/guard-deny.spec.ts`
```ts
/**
 * Purpose Summary:
 * - Ensures deny-by-default guarded execution: side-effect tools cannot execute without decision token.
 *
 * Rosetta Relevance:
 * - Implements Guarded execution invariant and prevents unsafe tool invocation.
 *
 * Governing References:
 * - Entif Secure Architecture: executor denies bundle lacking fresh Guard decision
 */

import { describe, it, expect } from "vitest";

describe("security: guard denies without token", () => {
  it("refuses filesystem write toolcall without a guard decision token", async () => {
    // TODO: create toolcall for builtin.fs-write in execute mode
    // TODO: attempt admission without token
    // EXPECT: deny, no write performed, denial receipt emitted
    expect(true).toBe(false); // red first
  });
});
```

#### Golden/conformance test example (tampering must fail)

RRP explicitly specifies that tampering with the hash input (e.g., changing a digest) changes the CID and makes the original signature invalid; verification MUST fail. fileciteturn3file12turn3file2

`tests/conformance/rrp-tamper-negative.spec.ts`
```ts
import { describe, it, expect } from "vitest";
import tv1 from "../fixtures/rrp/tv1.hash-input.json";
import tampered from "../fixtures/rrp/tv1.tampered.json";
import { computeCidForReceiptPayload } from "../../packages/rosetta-receipts/src/receipt-builder";
import { verifyReceipt } from "../../packages/rosetta-receipts/src/receipt-verifier";

describe("conformance: tampering fails", () => {
  it("changes CID and fails verification when content is tampered", () => {
    const cidOriginal = computeCidForReceiptPayload(tv1);
    const cidTampered = computeCidForReceiptPayload(tampered);
    expect(cidTampered).not.toBe(cidOriginal);

    // Placeholder: when signature is unchanged, verifier must reject.
    expect(() => verifyReceipt({ receipt: tampered, expectedCid: cidOriginal })).toThrow();
  });
});
```

#### Pending/failing tests for future work (backlog bucket)

`tests/backlog/distributed-ledger.spec.ts`
```ts
import { describe, it, expect } from "vitest";

describe("backlog: ledger anchoring", () => {
  it("anchors receipt bundle to ledger and verifies inclusion proof", () => {
    // Not in MVP alpha. This test is allowed to fail under nx backlog target only.
    expect(true).toBe(false);
  });
});
```

## Vertical Slice and Implementation Stubs

**First Vertical Slice**  
The “smallest honest loop” that proves the stack is:

> **Receipt-backed guarded toolcall**: create a Run, propose a ToolCall, require a Guard Decision Token, execute a no-side-effect tool, record Observations, emit an RRP receipt, build a receipt bundle tapestry, and verify end-to-end.

This slice directly reflects:
- the Rosetta spine lifecycle fileciteturn1file0  
- receipts-first instrumentation and RRP verifier algorithm fileciteturn3file2turn3file10  
- guarded execution with admission tokens and executor denial without them fileciteturn5file10turn5file12

**Exact inputs/outputs**
- Input: `text` string to echo; policy bundle `baseline-v1`; tool `builtin.echo`.
- Output: stored tiles (run/toolcall/obs/receipt/tapestry), plus verifier result `pass`.

**Exact packages touched**
- `rosetta-cli`, `rosetta-core`, `rosetta-canon`, `rosetta-cid`, `rosetta-store`, `rosetta-guard`, `rosetta-receipts`, `rosetta-tapestry`, `rosetta-schemas`, `rosetta-tools`.

**Exact demo scenario**
- `pnpm nx run rosetta-cli:run-demo --text "hello rosetta"` prints:
  - created Run CID
  - created ToolCall CID
  - Guard decision (allow) + token id
  - created Observation CID
  - created Receipt CID
  - created ReceiptBundle Tapestry CID
  - verification result: `OK`

**Stub Code Surfaces to Generate First**  
These files should exist immediately (even as TODO stubs) so tests can compile and run red-first:

```txt
packages/rosetta-canon/src/jcs.ts
packages/rosetta-cid/src/{sha256.ts,multihash.ts,cid.ts}
packages/rosetta-store/src/{cas.ts,index-sqlite.ts,rights.ts}
packages/rosetta-receipts/src/{receipt-builder.ts,receipt-verifier.ts,rrp-types.ts}
packages/rosetta-guard/src/{policy-bundle.ts,policy-eval.ts,decision-token.ts,admission.ts}
packages/rosetta-tapestry/src/{closure.ts,builder.ts}
apps/rosetta-cli/src/commands/run-demo.ts
tests/fixtures/rrp/{tv1.hash-input.json,tv1.expected.json,tv1.tampered.json}
```

**MCP / API / CLI Contracts**

### CLI contract (example)

`rosetta-cli --help` (contract sketch)

```txt
rosetta-cli

Commands:
  init                         Initialize local store + sqlite index
  tile:add   --file <path>      Add a tile JSON file (validates schema)
  run:demo   --text <string>    Execute demo spine and verify receipt bundle
  verify     --cid <cid>        Verify a receipt bundle tapestry or receipt tile
```

### MCP tool contract (example)

This is a minimal, sealed “tool definition” contract that your MCP package can expose. (It is intentionally compatible with “tools as typed contracts” rather than prompt-prose.)

```json
{
  "tool_name": "builtin.echo",
  "tool_version": "0.1.0",
  "effects": ["none"],
  "dry_run_supported": true,
  "guard_required": false,
  "input_schema": {
    "type": "object",
    "required": ["text"],
    "properties": { "text": { "type": "string", "maxLength": 2000 } }
  },
  "output_schema": {
    "type": "object",
    "required": ["text"],
    "properties": { "text": { "type": "string" } }
  }
}
```

### Minimal HTTP API stubs (contract sketch)

- `POST /v1/ingest` → creates `rosetta.observation`
- `POST /v1/guard/decide` → returns Guard Decision Token
- `POST /v1/runs/demo` → runs the vertical slice
- `POST /v1/verify` → verifies a receipt bundle tapestry by algorithm fileciteturn3file2

## Guard, Context, and Memory Scaffolds

**Guard / Policy / Provenance Scaffold**  
Entif’s governance document describes Guard as a policy enforcement point that intermediates operations, with policy-as-code and sandboxing, escalating or halting tasks before harm occurs; it explicitly mentions OPA/Rego as a plausible policy engine choice. fileciteturn5file3turn5file12  
For MVP, implement **a minimal policy bundle format** that can later be compiled to OPA/Rego, but do not block MVP on adopting OPA on day 1.

### Policy bundle format (MVP JSON)

`packages/rosetta-guard/src/policy-bundle.ts` should load:

```json
{
  "policy_id": "baseline-v1",
  "policy_version": "1.0.0",
  "default": "deny",
  "allow": [
    { "tool": "builtin.echo", "effects": ["none"], "modes": ["parse_only", "dry_run", "execute"] }
  ],
  "deny": [
    { "tool": "builtin.fs-write", "reason": "write tools require human approval in baseline policy" }
  ],
  "require_human": [
    { "effects_any_of": ["network", "filesystem.write"] }
  ],
  "resource_caps": { "cpu_ms": 200, "mem_mb": 256 }
}
```

### Guard service skeleton  
- `PolicyEval`: deterministic evaluation over tool metadata, tenant, effects, mode.
- `DecisionTokenSigner`: signs decision tokens; includes `policy_version` and placeholders for constitution hash / chain height (future). fileciteturn5file12  
- `AdmissionController`: checks token validity at executor boundary, consistent with “executor denies bundle lacking fresh Guard decision.” fileciteturn5file10turn5file12

### Evidence bundle contract (MVP)
- A guard decision should be able to carry an `evidence[]` list of CIDs that justify the decision (policy tile CID, telemetry span IDs, etc.). This is consistent with the receipts-first posture where decisions should be inspectable rather than merely logged. fileciteturn3file2turn5file12

### Replay harness skeleton  
- Implement `rosetta-verify` utilities:
  - “given a receipt bundle tapestry, run the verifier algorithm”
  - detect mismatch and produce a structured failure report (CID mismatch, signature mismatch, missing policy ref, etc.) fileciteturn3file2turn3file12

**Context / Ledger / Memory Scaffold**  
RRP explicitly defines receipt bundles as a tapestry profile that packages closure for verification (subjects, receipts, evidence, policy refs, enough provenance to reach raw observations). fileciteturn3file2  
Entif’s secure architecture companion adds that receipts may later be extended with `ledger_tx_id` and related fields (reserved now; not implemented now). fileciteturn5file10turn5file12

### Minimal memory interfaces (MVP)
Define these as TS interfaces with empty implementations:

- `TileStore` (content-addressed put/get)
- `ReceiptWriter` (write receipt tiles; returns cid)
- `TapestryBuilder` (build receipt bundle profile)
- `RightsScopeEvaluator` (enforce tenant/sensitivity constraints)
- `CacheKeyStrategy` (key includes consumer scope + policy versions)

### Rights and sensitivity fields  
Inspired by the “rights-scoped retrieval” invariant (retrieve under scope, not filter after), every stored tile should carry **index metadata** (not necessarily in the tile itself) used by retrieval gating:
- `tenant_id`
- `sensitivity`: `public | internal | confidential | restricted`
- `produced_by` (actor/service)
- `allowed_consumers` (optional allowlist)

This ensures a query cannot access out-of-scope tiles.

### Cache key strategy (MVP)
Cache keys MUST include:
- `consumer_scope_hash` (tenant + sensitivity caps)
- `policy_version` (because decisions reference policy versions)
- `profile` (tapestry profile)
- stable query parameters

### Verify vs attest vs quarantine (future behavior, scaffold now)
Cognitive Tiles & Swarm Gnosis explicitly frames a pragmatic policy: “attest first, verify on demand,” with quarantine if signature or proof fails; this can become a future cache policy but should be reserved now as a policy decision point. fileciteturn3file11

### Optional visual: Merkle tree intuition for append-only logs
If/when you later implement a transparency log or append-only receipt log, a Merkle root structure is the standard primitive for inclusion/consistency proofs. citeturn0image2

![Merkle root demonstration](https://images.openai.com/static-rsc-1/3fnO4wmBhWo8oSSmNKmWQp0u0x7g8hZpAb0jGLgMxp8q1jY6R5m8o2xFq2k3xK6x-2wUuJSs4q8Xk1p2x4yS8x-0pN0Yv2e7t1vQw3x7e6o4y9f5Q2o8c1x7g4y8y2n1k5v2m2n5d9d.png)

## CI/CD, Backlog, and Execution Plan

**File-Level Traceability Header Convention**  
You required a file-level traceability header for protocol-sensitive units. This convention is enforced by a repo script (`tools/scripts/check-traceability-headers.ts`) and wired into Nx `trace:check`.

### Canonical TypeScript header example (required files)

```ts
/**
 * Purpose Summary:
 * - <2–6 lines> What this module does and why it exists.
 *
 * Rosetta Relevance:
 * - How it supports determinism, receipts-first instrumentation, rights-scoped retrieval, etc.
 *
 * Governing References:
 * - Rosetta v3: <term/section>
 * - ROCK-31XX: <receipt rule / profile>
 * - ADR-XXXX: <local decision>
 * - Schema: <schema id>
 *
 * Optional Implementation Notes:
 * - Determinism requirements, guard bypass prohibitions, replay boundaries, etc.
 */
```

### Canonical Python header example (required files)

```py
"""
Purpose Summary:
- <2–6 lines> What this module does and why it exists.

Rosetta Relevance:
- How it supports determinism, receipts, provenance, rights enforcement, or verification.

Governing References:
- Rosetta v3: <term/section>
- ROCK-31XX: <receipt rule>
- ADR-XXXX
- Schema: <schema id>

Optional Implementation Notes:
- Failure boundaries, parse-only warnings, determinism constraints.
"""
```

### Canonical test-file header example (required for conformance/integration tests)

```ts
/**
 * Purpose Summary:
 * - Test intent (what invariant is being defended).
 *
 * Rosetta Relevance:
 * - Which spine/receipt/guard property this prevents from regressing.
 *
 * Governing References:
 * - ROCK-31XX: <vector id>
 * - Schema: <id>
 */
```

### Simple rule: when headers are required vs optional
Headers are **required** for:
- core protocol types and schemas
- canonicalizers and CID code
- receipt writer/verifier logic
- guard/policy/admission logic
- retrieval/rights enforcement logic
- tapestry/bundle closure logic
- non-trivial conformance/integration tests

Headers are **optional** for:
- trivial UI components
- tiny one-purpose utilities with no protocol logic
- barrel exports

### Lintable/checkable enforcement approach
A simple deterministic script that checks:
- file matches required glob (e.g., `packages/rosetta-*/src/**/*.ts` excluding `index.ts`)
- first non-empty lines match a header block containing the three required labels:
  - `Purpose Summary:`
  - `Rosetta Relevance:`
  - `Governing References:`

**CI/CD and Release Gates**  
Merge gates are:
1. `trace:check`
2. `lint`
3. `typecheck`
4. `test`
5. `conformance`
6. `build`

**Known-red-tests policy**
- `tests/backlog/**` may fail and is not run in CI.
- If you need to keep a future test “visible” without failing CI, mark it `it.todo()` until it’s mature enough to move to backlog-failing status.

**Backlog as Failing Tests**  
This table is the MVP “truth backlog”: each deferred slice is represented as a failing backlog test + stub file.

| Backlog item | Test (path) | Stub files | Depends on |
|---|---|---|---|
| OPA/Rego policy compiler | `tests/backlog/policy-compiler.spec.ts` | `rosetta-guard/src/policy-compiler.ts` | Guard MVP green |
| Ledger anchoring for bundles | `tests/backlog/distributed-ledger.spec.ts` | `rosetta-ledger/*` (new pkg) | Receipt bundles green |
| Distributed execution sealing | `tests/backlog/sealed-bundle.spec.ts` | `rosetta-grid/*` (new pkg) | Guard tokens green |
| ZK proof-carrying tiles | `tests/backlog/zkp-attestation.spec.ts` | `rosetta-zkp/*` (new pkg) | CID + receipt verifier green |
| Threat-intel automation wiring | `tests/backlog/threat-intel.spec.ts` | `rosetta-tripwire/*` | Guard policy reload paths exist |
| Rich memory promotion workflow | `tests/backlog/promotion-workflow.spec.ts` | `rosetta-memory/*` | Rights-scoped retrieval green |

**4-Hour Micro-Tier Delivery Plan**  
This is the “tomorrow morning” plan for a solo builder.

| Timebox | Output | What’s green/red at end |
|---|---|---|
| Hour one | Nx workspace boots; packages scaffolded; schema validator wired | Lint/typecheck green; tests red |
| Hour two | JCS canonicalizer + sha256 + CID encoding implemented | Conformance TV1 hash/CID test turns green |
| Hour three | Receipt builder/verifier skeleton + fixture loading | Tamper-negative test turns green (reject path) |
| Hour four | Guard policy eval (baseline JSON) + CLI `run-demo` skeleton | End-to-end integration test still red but compiling; CLI demo starts to work |

**Risks, Tradeoffs, and Rejected Alternatives**
- **OPA day-one vs minimal policy DSL**: OPA is powerful but increases boot complexity; the secure architecture paper suggests OPA as an option, not as a day-one necessity. MVP chooses minimal DSL with a compiler interface reserved. fileciteturn5file3turn5file13  
- **CBOR vs JCS canonical JSON**: CBOR canonicalization is strong, but JCS keeps debugging friction low for a solo builder and matches RRP test-vector framing. fileciteturn3file12  
- **UI-first**: explicitly rejected. Secure posture + receipts-first loop is the kernel; UI is an adapter.

**“Start Building Tomorrow Morning” Checklist**
- Create repo from the scaffold tree (copy/paste).  
- Add the three fixture files for RRP TV1 (hash input + expected + tampered). fileciteturn3file12  
- Make `tests/conformance/rrp-tv1.spec.ts` compile and run red.  
- Implement `canonicalizeJcs` to match the expected canonical JSON behavior driven by RRP vectors. fileciteturn3file12  
- Implement `sha256Hex` + multihash + base58 CID.  
- Turn TV1 conformance test green.  
- Implement tamper-negative to fail verification (green test is “verifier rejects”). fileciteturn3file12turn3file2  
- Scaffold Guard policy bundle + `deny-by-default` admission and write the negative test for missing token. fileciteturn5file10turn5file12  
- Only then implement the end-to-end demo command and its integration test.

