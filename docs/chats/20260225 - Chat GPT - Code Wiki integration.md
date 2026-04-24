# Code Wiki integration

**User:** Crates McD (mcdade@gmail.com)  
**Created:** 2025/11/17 17:07:57  
**Updated:** 2025/11/17 17:19:47  
**Exported:** 2026/2/25 8:04:18  
**Link:** [https://chatgpt.com/g/g-p-68113a0ebebc819183ea60319883eb09-entif-ai-engine/c/691b9cbd-b0ac-800f-8a83-dbb914e1e808](https://chatgpt.com/g/g-p-68113a0ebebc819183ea60319883eb09-entif-ai-engine/c/691b9cbd-b0ac-800f-8a83-dbb914e1e808)  

## Prompt:
I want to give some consideration to the newly-released Google CodeWiki tool, and think ahead to a time very soon when there will be a Gemini CLI extension that can access the information from this automatically-generated index and documentation around any source base ingested by it.

For context, I'm thinking about how this can directly enable the ability to source any module, component, presentation view, helper method, class, automation, schema or whatever form of code I want to repurpose for Entif and all of the projects and products attached to it, which are designed to avoid duplicating efforts for any use case that has already been fully or partially solved-for previously.

The main pain point of this approach is the ability to quickly, reliably and confidently identify which capabilities and features are already built, and to what degree of sophistication and utility each is presently at. My hope is that the addition of this service could facilitate this need completely, thereby empowering this aspect of my architectural designs with minimal additional effort needed on my end.

Have a look, and let me know what you think!

https://developers.googleblog.com/en/introducing-code-wiki-accelerating-your-code-understanding/

## Response:
Thought for 1m 38s

Short version: your instinct is dead-on. Code Wiki + the Gemini CLI extension is basically a “code awareness substrate” you can bolt under Entif so you stop re-inventing anything that already lives in one of your repos. It won’t _completely_ solve your “what already exists and how good is it?” problem on its own, but it removes a huge chunk of the grunt work you would otherwise have to build yourself.

Let me unpack it in Entif terms.

* * *

1\. What Code Wiki actually gives you
-------------------------------------

From the blog:

*   It keeps **a continuously updated, structured wiki per repo**, regenerated after each change.[Google Developers Blog](https://developers.googleblog.com/en/introducing-code-wiki-accelerating-your-code-understanding/)
*   That wiki feeds a **Gemini chat agent that is scoped to the repo**, not a generic model.[Google Developers Blog](https://developers.googleblog.com/en/introducing-code-wiki-accelerating-your-code-understanding/)
*   Every doc section and chat answer is **hyperlinked straight to files / classes / functions**.[Google Developers Blog](https://developers.googleblog.com/en/introducing-code-wiki-accelerating-your-code-understanding/)
*   It auto-generates **current architecture, class, and sequence diagrams** so you can visualize relationships that match the _actual_ code state.[Google Developers Blog](https://developers.googleblog.com/en/introducing-code-wiki-accelerating-your-code-understanding/)

Today that runs as a hosted public preview for public repos. The same post explicitly says they’re building a **Gemini CLI extension so teams can run the system locally on internal repos**.[Google Developers Blog+1](https://developers.googleblog.com/en/introducing-code-wiki-accelerating-your-code-understanding/)

Gemini CLI itself is:

*   An open-source AI agent in your terminal with built-in tools (search, shell, file ops, web fetch) and MCP support.[GitHub](https://github.com/google-gemini/gemini-cli?utm_source=chatgpt.com)
*   Using a ReAct loop with tools + local/remote MCP servers.[Google for Developers](https://developers.google.com/gemini-code-assist/docs/gemini-cli?utm_source=chatgpt.com)

So, fast-forward a tiny bit of time, you’ll have:

> `gemini codewiki` (or equivalent) in your CLI that:
> 
> *   indexes a repo,
> *   maintains a wiki/graph of the code,
> *   and is callable by other agents via MCP / shell.
>     

That’s the raw ore.

* * *

2\. How far does that get you on “What’s already built?”
--------------------------------------------------------

For a _single_ repo, Code Wiki plus the Gemini CLI extension should give you:

*   “What does this module/class do?” via chat scoped to the wiki.
*   “Where is X implemented?” via semantic search over the docs + cross-links.
*   “Show me how Y flows through the system” via generated diagrams.
*   “Explain these 3 files as a subsystem.”

That already covers:

*   Discovery: “Do we already have an OAuth client?”
*   Understanding: “Is this OAuth client generic enough to reuse?”
*   Navigation: “Where are all the call sites?”

Where it **doesn’t** fully solve your pain yet:

1.  **Cross-repo capability view**
    Code Wiki is repo-scoped. You want **“What are _all_ the auth implementations across Entif, VieDay, Mislead.Us, etc., and which is the canonical one?”**
2.  **Maturity / sophistication**
    You care about “how production-ready” each unit is:
    *   test coverage,
    *   recency,
    *   LOC/change churn,
    *   open bugs,
    *   “used in live system vs. abandoned experiment.”
    Code Wiki doesn’t talk about these; its job is understanding and navigation, not lifecycle & quality metrics (at least as currently described).[Google Developers Blog](https://developers.googleblog.com/en/introducing-code-wiki-accelerating-your-code-understanding/)
3.  **“Never build twice” enforcement**
    You eventually want the system, not just you, to say:
    > “This new ‘user preferences’ service you’re asking for already exists in `apps/profile-service` with 80% of what you just described. Extend, don’t rebuild.”
    That requires a **capability registry / graph** above the repo level plus some notion of equivalence / overlap. Code Wiki alone is a very smart per-repo encyclopedia, not that meta-layer.

So: Code Wiki is an extremely strong **per-repo lens**, but you still need Entif’s “brain” on top to:

*   unify across repos,
*   attach quality / status metadata,
*   and wire that into the planning loop so reuse is enforced, not just possible.

* * *

3\. How I’d wire this into Entif’s architecture
-----------------------------------------------

Mental model:

> **Code Wiki = “code-understanding backend per repo”**  
> **Entif = “cross-repo capability and decision engine”**

### 3.1. Treat Code Wiki as a Forge-adjacent provider

In your Entif 2.0 language, you can think of this as a new provider that sits between FileForge/VersionForge and the reasoning layer:

*   **FileForge / VersionForge** already care about artifacts and their history.
    Entif 2.0 - Comprehensive Actio…
*   Add a **CodeWikiForge adapter** that knows how to:
    *   call the Gemini CLI extension for a repo,
    *   fetch structured outputs (summaries, diagrams, section indices),
    *   normalize that into Entif’s internal schema (tiles / glyphs / capability nodes).

Concretely, CodeWikiForge would:

1.  Register each repo with Code Wiki (via CLI).
2.  On a schedule or on new commit:
    *   ask Code Wiki for top-level sections: components, services, APIs.
    *   pull structured summaries for each.
    *   pull any diagram metadata (nodes/edges) if exposed.
3.  Emit **“Capability tiles”**:
    *   `name` (canonical capability label, e.g. `user_auth.jwt_login`)
    *   `repo`, `path`, `language`
    *   `responsibilities` (what this module claims to do)
    *   `dependencies` (other modules/services used)
    *   `interfaces` (public methods, HTTP routes, events)
    *   `source_links` (wiki URLs, file paths)
    *   `provenance` (hashes, commit, Code Wiki snapshot time)

Those tiles slide neatly into your Cognitive Tiles / Swarm Gnosis style graph as code-backed tiles.

Cognitive Tiles and Swarm Gnosis

### 3.2. Build a “Capability Registry” across repos

On top of those tiles, a tiny Entif service:

*   `CapabilityRegistry` that:
    *   deduplicates capabilities with the same or similar name,
    *   groups tiles by semantic capability (not just repo path),
    *   stores maturity signals (more below),
    *   exposes an MCP tool: `search_capabilities`.

This is what the orchestrator calls whenever you request a new feature:

> “Design a multi-tenant billing subsystem with Stripe and usage-based pricing.”

Orchestrator → `search_capabilities` with that description →  
Registry:

1.  Calls Gemini (or your TRM/ROMA stack) to turn that description into a **capability query**:
    *   e.g. `{ core: ["billing", "stripe"], aspects: ["subscription", "usage-based"] }`
2.  Matches against tiles:
    *   maybe existing `billing/stripe` service in Repo A,
    *   a half-finished `usage-metrics` library in Repo B.
3.  Returns ranked candidates with:
    *   repo/path,
    *   summary,
    *   maturity tier,
    *   confidence that it covers your requested behavior.

The orchestrator then has something to reason with: “reuse A + extend B” instead of “start from scratch.”

* * *

4\. Where Code Wiki helps the quality question
----------------------------------------------

You still need to compute **“to what degree of sophistication and utility”** a given module is at. Code Wiki won’t give you that directly, but it enables some easy heuristics:

1.  **Structural richness, not just size**
    Use Code Wiki’s docs + diagrams to estimate:
    *   Is this a well-factored subsystem or a 2000-line blob?
    *   Does it expose clear interfaces?
    *   How many other components reference it (fan-in)?
    Those signals, combined, form a **“design maturity” score** for a tile.
2.  **Semantic fit**
    Because Code Wiki’s wiki is Gemini-aware, you can ask it:
    > “Does the `UserAuthService` support multi-tenant role hierarchies? Show evidence.”
    Your adapter can:
    *   query the Code Wiki chat for that capability,
    *   parse the answer & supporting links,
    *   and set a “supports\_feature\_X: true/false/uncertain” flag on the tile.
3.  **Alignment with desired patterns**
    You can also ask Code Wiki:
    > “Does this module follow our standard hexagonal architecture pattern?”  
    > “Does this service conform to our `StandardHttpService` interface?”
    This is where you inject your own norms: give Code Wiki the pattern once, then programmatically check modules against it via CLI calls.

So the picture is:

*   **Code Wiki**: “What’s here, what is it structured like, where does it live?”
*   **Entif**: “Does this match our capability spec, and is it good enough to reuse?”

* * *

5\. Wiring it into the planning loop
------------------------------------

To make this **actually prevent duplication**, not just assist manual browsing, I’d do:

1.  **Planning rule in ROMA / TRM:**
    Before any “new feature” implementation plan is accepted:
    *   auto-insert a step: `search_capabilities(feature_spec)`.
    *   if registry returns any candidate with `fit_score > threshold`, the plan must include a **Reuse vs Build justification** step.
2.  **Tooling in Gemini CLI:**
    Inside the CLI, define a subcommand or MCP server that does:
    ```
    gemini entif/search-capability "idempotent task queue with dead-letter handling"
    ```
    That would shell out to your `CapabilityRegistry` which in turn uses Code Wiki + Entif’s graph.
3.  **Receipts & “never build twice” metrics:**
    Extend your receipts so each significant new module includes:
    *   `capability_id`,
    *   `existing_candidates_considered: [ids]`,
    *   `decision: reused | extended | rebuilt`,
    *   `rationale`.
    That gives you an audit trail and eventually lets you mine “oops, we duplicated anyway” cases to improve matching.

* * *

6\. Limitations and gotchas to expect
-------------------------------------

A few practical caveats:

1.  **APIs and formats**
    We don’t yet know what structured outputs the Code Wiki CLI extension will expose. The blog only promises “run the same system locally and securely” with Gemini CLI.[Google Developers Blog](https://developers.googleblog.com/en/introducing-code-wiki-accelerating-your-code-understanding/)
    Worst case, you:
    *   use the CLI in non-interactive mode (`-p` flag) to ask for machine-readable summaries,
    *   define a convention like: “When I say `OUTPUT_JSON_ONLY`, you respond with a JSON description of all top-level components.”
    *   parse that in CodeWikiForge.
2.  **Multi-repo linking**
    Code Wiki is repo-local; cross-repo reasoning is your job. That’s fine: Entif is _already_ designed as the place where cross-system semantics live (GraphRAG + tiles). This just means you should not rely on Code Wiki to give you global answers; treat it as a fact provider per repo.
3.  **Latency & cost**
    For routine commands, you don’t want every “does this exist?” query to trigger a full Code Wiki refresh. So:
    *   keep your own **cached capability tiles** per repo,
    *   only re-hit Code Wiki when:
        *   the repo has new commits, or
        *   you need a deeper, one-off check about a specific feature.

* * *

7\. My honest verdict
---------------------

*   **Yes**, this is absolutely the right kind of primitive to lean on for your “stop re-building solved things” goal.
*   It **won’t** magically give you a cross-repo capability map or maturity scoring; but it removes ~70% of the grunt work:
    *   parsing trees,
    *   maintaining up-to-date diagrams,
    *   explaining weird corners of legacy code,
    *   answering “where the hell is X actually done?”

You let Google handle the per-repo understanding layer, then let Entif:

*   canonize that into tiles/capabilities,
*   track maturity and usage,
*   and enforce reuse in the planning pipeline.

If you like, next step we can sketch:

*   a first-pass JSON schema for those “capability tiles,” and
*   the `search_capabilities` MCP tool interface that both Entif and Gemini CLI could share.

That’s the piece that turns Code Wiki from “nice docs” into “hard guardrail against duplicating yourself.”

## Prompt:
Yes, please sketch both of those out next.

## Response:
Thought for 1m 52s

Got you. I’ll treat this as:

1.  A concrete schema for “capability tiles” (aligned with Cognitive Tiles).
2.  A tool / MCP-ish interface (`search_capabilities` + `get_capability`) that both Entif and a future Gemini CodeWiki CLI extension can share.

* * *

1\. Capability Tile schema
--------------------------

Cognitive Tiles are “header + payload” Merkle-DAG objects.

Cognitive Tiles and Swarm Gnosis

So I’ll define a _specialized_ tile shape for capabilities that still fits that pattern.

### 1.1 TypeScript-ish shape

You can easily JSON-Schema this, but this gives you the conceptual structure:

```
// Generic tile header (reused across tile types)
export interface TileHeader {
  tile_id: string;          // CID or stable UUID; content-addressed in full system
  tile_type: "capability";  // specialisation of generic tile
  title: string;            // human-readable capability name
  summary: string;          // 1–2 sentence what/why

  created_at: string;       // ISO 8601
  updated_at: string;       // ISO 8601
  created_by: string;       // identity key / email / handle
  updated_by?: string;

  license?: string;         // SPDX id, etc.
  tags?: string[];          // free-form + controlled vocab

  // Version graph hooks (compatible with the broader tile design)
  version: string;          // e.g. "1.0.3"
  prev?: string | null;     // parent tile_id (superseded)
  supersedes?: string[];    // other tile_ids this obsoletes
  deprecated?: boolean;
  deprecation_reason?: string;
}

// Capability-specific payload
export interface CapabilityTilePayload {
  // High-level classification
  kind:
    | "service"        // backend service / module
    | "view"           // UI screen / component
    | "job"            // batch job / cron / worker
    | "cli_command"    // CLI tool or subcommand
    | "schema"         // DB / event / config schema
    | "automation"     // workflow, n8n flow, pipeline
    | "library"        // shared lib / helper
    | "infrastructure" // IaC module / Terraform / etc.
    | "other";

  domain: string;      // "entif.memory", "vieday.ingest", etc.
  subdomain?: string;  // finer clustering if needed

  status:
    | "idea"
    | "prototyped"
    | "integrated"
    | "production"
    | "deprecated";

  maturity_level: 0 | 1 | 2 | 3 | 4 | 5;
  // 0 = stub, 1 = PoC, 2 = working but fragile,
  // 3 = “usable by me”, 4 = team-ready, 5 = hardened / prod

  owners: {
    team?: string;
    primary?: string;       // primary human owner
    stakeholders?: string[];
  };

  // What it does, in more detail
  problem_statement: string;   // why this exists
  detailed_description: string; // longer paragraph(s)
  non_goals?: string[];        // explicitly *not* doing X

  // Inputs / outputs abstracted over transport
  inputs?: Array<{
    name: string;
    description: string;
    type: string;            // “JSON”, “TS type: Foo”, “Event: UserCreated”
    required: boolean;
    shape_ref?: string;      // pointer into schema registry / tile
    example?: unknown;
  }>;

  outputs?: Array<{
    name: string;
    description: string;
    type: string;
    shape_ref?: string;
    example?: unknown;
  }>;

  // Side effects for safety and composability
  side_effects?: {
    reads_from?: string[];   // "postgres.main", "neo4j.ecgg"
    writes_to?: string[];
    external_apis?: string[]; // "stripe", "github", etc.
    idempotent?: boolean;
    transactional?: boolean;
  };

  // Implementation linkages (what CodeWiki will actually know about)
  implementation: {
    repos: Array<{
      provider: "github" | "gitlab" | "bitbucket" | "local" | "other";
      org?: string;
      repo: string;
      default_branch?: string;
    }>;

    primary_entrypoints: Array<{
      repo: string;
      path: string;        // "services/memory/ingest.ts"
      symbol?: string;     // "IngestVieDayLogsHandler"
      kind?: "function" | "class" | "module" | "component" | "workflow";
      language?: string;   // "ts", "py", etc.
      codewiki_page_id?: string;   // handle for CodeWiki index
    }>;

    related_files?: Array<{
      repo: string;
      path: string;
      purpose?: "config" | "migration" | "test" | "docs" | "script" | "other";
    }>;

    tests?: {
      has_unit_tests: boolean;
      has_integration_tests: boolean;
      coverage_pct?: number;      // 0–100
      key_test_paths?: string[];  // globs or specific files
    };
  };

  // Operational health / quality signals
  quality?: {
    reliability_score?: number;    // 0–1 or 0–100
    performance_notes?: string;
    known_limitations?: string[];
    todo_items?: string[];         // specific improvement tasks
    last_reviewed_at?: string;
    last_reviewed_by?: string;
  };

  // Usage signals for “is this real or just an experiment?”
  adoption?: {
    used_in_prod?: boolean;
    used_by_projects?: string[];   // "vieday-app", "entif-cli"
    usage_count_approx?: number;   // rough heuristic (events / day)
    example_call_sites?: Array<{
      repo: string;
      path: string;
      description?: string;
    }>;
  };

  // Dependency edges (for swarm/graph reasoning)
  dependencies?: Array<{
    capability_id: string;     // tile_id of another capability
    optional?: boolean;
    reason?: string;
  }>;

  dependents?: string[];       // reverse edges (can be filled by graph

  // Integration surface for humans
  interface?: {
    http_endpoints?: Array<{
      method: string;
      path: string;
      auth?: "public" | "user" | "service" | "admin";
      description?: string;
    }>;

    cli_commands?: Array<{
      command: string;         // "entif ingest-vieday"
      args_summary?: string;
      description?: string;
      example?: string;
    }>;

    ui_views?: Array<{
      route: string;           // "/vieday/logs"
      component?: string;      // "VieDayLogViewer"
      description?: string;
    }>;
  };

  // Entif-specific context hooks
  ecgg_links?: Array<{
    node_type: "Experience" | "Capability" | "Goal" | "Growth";
    node_id: string;         // id in Neo4j or KG
    relation?: string;       // "IMPLEMENTS", "SUPPORTS", etc.
  }>;

  telemetry?: {
    observability_tile_id?: string; // separate tile w/ dashboards, alerts, etc.
    logs_namespace?: string;
    metrics_namespace?: string;
    traces_namespace?: string;
  };
}

// Full capability tile
export interface CapabilityTile {
  header: TileHeader;
  payload: CapabilityTilePayload;
}
```

### 1.2 Canonical JSON example

Here’s a compact example of what you’d actually store / serve:

```
{
  "header": {
    "tile_id": "cap:entif.vieday.v1.ingest_journal_logs",
    "tile_type": "capability",
    "title": "VieDay Journal Log Ingestion",
    "summary": "Parses raw VieDay markdown logs into structured ECGG graph events.",
    "created_at": "2025-11-17T17:45:00Z",
    "updated_at": "2025-11-17T17:45:00Z",
    "created_by": "crates",
    "license": "Apache-2.0",
    "tags": ["vieday", "ingestion", "ecgg", "parser"],
    "version": "1.2.0",
    "prev": "cap:entif.vieday.v1.ingest_journal_logs@1.1.3",
    "supersedes": [],
    "deprecated": false
  },
  "payload": {
    "kind": "job",
    "domain": "entif.vieday",
    "subdomain": "ingestion",
    "status": "integrated",
    "maturity_level": 3,
    "owners": {
      "team": "entif-core",
      "primary": "crates",
      "stakeholders": ["entif-observability"]
    },
    "problem_statement": "We need to transform unstructured VieDay markdown into structured events for the ECGG graph.",
    "detailed_description": "This job scans local or remote VieDay markdown logs, parses time blocks and activities, and writes Experience and Capability nodes plus relationships into the ECGG knowledge graph.",
    "inputs": [
      {
        "name": "journal_paths",
        "description": "Glob patterns or explicit paths to VieDay markdown log files.",
        "type": "string[]",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "created_experiences",
        "description": "IDs of Experience nodes created in ECGG.",
        "type": "string[]"
      }
    ],
    "side_effects": {
      "reads_from": ["filesystem", "git.vieday.journals"],
      "writes_to": ["neo4j.ecgg"],
      "external_apis": [],
      "idempotent": true,
      "transactional": true
    },
    "implementation": {
      "repos": [
        {
          "provider": "github",
          "org": "entif-ai",
          "repo": "entif-core",
          "default_branch": "main"
        }
      ],
      "primary_entrypoints": [
        {
          "repo": "entif-core",
          "path": "services/vieday/ingest_journal_logs.ts",
          "symbol": "runVieDayIngestionJob",
          "kind": "function",
          "language": "ts",
          "codewiki_page_id": "entif-core/services/vieday/ingest_journal_logs.ts#runVieDayIngestionJob"
        }
      ],
      "related_files": [
        {
          "repo": "entif-core",
          "path": "tests/vieday/ingest_journal_logs.spec.ts",
          "purpose": "test"
        }
      ],
      "tests": {
        "has_unit_tests": true,
        "has_integration_tests": false,
        "coverage_pct": 78.3,
        "key_test_paths": ["tests/vieday/ingest_journal_logs.spec.ts"]
      }
    },
    "quality": {
      "reliability_score": 0.7,
      "performance_notes": "Currently processes ~5MB/min on dev hardware.",
      "known_limitations": [
        "Assumes a single timezone per file.",
        "Does not yet handle overlapping time blocks."
      ],
      "todo_items": [
        "Add support for timezone annotations per entry.",
        "Add integration tests with full ECGG graph."
      ],
      "last_reviewed_at": "2025-11-10T14:12:00Z",
      "last_reviewed_by": "crates"
    },
    "adoption": {
      "used_in_prod": true,
      "used_by_projects": ["vieday-app", "entif-daily-digest"],
      "usage_count_approx": 365,
      "example_call_sites": [
        {
          "repo": "entif-core",
          "path": "jobs/nightly_ingest_vieday.ts",
          "description": "Nightly ingestion cron job."
        }
      ]
    },
    "dependencies": [
      {
        "capability_id": "cap:entif.ecgg.v1.write_graph_events",
        "optional": false,
        "reason": "Persists parsed events into ECGG."
      }
    ],
    "dependents": ["cap:entif.vieday.v1.generate_daily_summary"],
    "interface": {
      "cli_commands": [
        {
          "command": "entif vieday ingest --glob \"logs/**/*.md\"",
          "args_summary": "--glob or --path is required",
          "description": "Ingest VieDay markdown logs into ECGG.",
          "example": "entif vieday ingest --glob \"~/VieDay/logs/*.md\""
        }
      ]
    },
    "ecgg_links": [
      {
        "node_type": "Capability",
        "node_id": "ecgg:capability:vieday_ingest",
        "relation": "IMPLEMENTS"
      }
    ]
  }
}
```

That’s the “single source of truth” object your index/search layer can target, regardless of whether the result came from manual cataloging, CodeWiki synthesis, or a mixed pipeline.

* * *

2\. Shared `search_capabilities` / `get_capability` interface
-------------------------------------------------------------

Now the “other half”: a tool contract that both Entif’s agents _and_ Gemini CLI (via an MCP server) can talk to.

### 2.1 Tool definitions (MCP-style)

At the MCP / tools layer you really only need two primitives:

1.  `search_capabilities` → find candidates.
2.  `get_capability` → fetch the full tile by id.

Everything else (ranking, explaining, suggesting reuse) is model-side behavior on top of those two calls.

**`search_capabilities` tool**

```
{
  "name": "search_capabilities",
  "description": "Search Entif capability tiles by natural language and structured filters.",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Natural language description of the desired capability or keywords. May be empty when using only filters."
      },
      "k": {
        "type": "integer",
        "description": "Maximum number of results to return.",
        "minimum": 1,
        "maximum": 100,
        "default": 20
      },
      "filters": {
        "type": "object",
        "description": "Optional structured filters applied in addition to the query.",
        "properties": {
          "kind": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Limit to specific kinds (service, view, job, cli_command, schema, automation, library, infrastructure)."
          },
          "status": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Limit by implementation status (idea, prototyped, integrated, production, deprecated)."
          },
          "min_maturity_level": {
            "type": "integer",
            "minimum": 0,
            "maximum": 5,
            "description": "Minimum maturity level to include."
          },
          "domain_prefix": {
            "type": "string",
            "description": "Prefix-match on payload.domain, e.g. 'entif.vieday'."
          },
          "tags": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Require that all of these tags are present."
          },
          "requires_tests": {
            "type": "boolean",
            "description": "If true, filter to capabilities that report unit or integration tests."
          },
          "requires_prod_usage": {
            "type": "boolean",
            "description": "If true, filter to capabilities marked used_in_prod."
          },
          "repo": {
            "type": "string",
            "description": "Limit to capabilities implemented in a specific repo name."
          }
        },
        "additionalProperties": false
      }
    },
    "required": [],
    "additionalProperties": false
  },
  "output_schema": {
    "type": "object",
    "properties": {
      "results": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "tile_id": { "type": "string" },
            "title": { "type": "string" },
            "summary": { "type": "string" },
            "domain": { "type": "string" },
            "kind": { "type": "string" },
            "status": { "type": "string" },
            "maturity_level": { "type": "integer" },
            "tags": {
              "type": "array",
              "items": { "type": "string" }
            },
            "owner": { "type": "string" },
            "used_in_prod": { "type": "boolean" },
            "primary_entrypoint": {
              "type": "object",
              "properties": {
                "repo": { "type": "string" },
                "path": { "type": "string" },
                "symbol": { "type": "string" },
                "codewiki_page_id": { "type": "string" }
              },
              "required": ["repo", "path"],
              "additionalProperties": false
            },
            "score": {
              "type": "number",
              "description": "Search relevance score (arbitrary scale, higher is better)."
            }
          },
          "required": [
            "tile_id",
            "title",
            "summary",
            "domain",
            "kind",
            "status",
            "maturity_level",
            "score"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": ["results"],
    "additionalProperties": false
  }
}
```

**`get_capability` tool**

```
{
  "name": "get_capability",
  "description": "Retrieve the full capability tile document for a given tile_id.",
  "input_schema": {
    "type": "object",
    "properties": {
      "tile_id": {
        "type": "string",
        "description": "The tile_id of the capability to fetch."
      }
    },
    "required": ["tile_id"],
    "additionalProperties": false
  },
  "output_schema": {
    "type": "object",
    "properties": {
      "capability": {
        "type": "object",
        "description": "The full CapabilityTile document.",
        "additionalProperties": true
      }
    },
    "required": ["capability"],
    "additionalProperties": false
  }
}
```

At runtime, both Entif agents and Gemini CLI can:

1.  Call `search_capabilities` to shortlist options.
2.  Call `get_capability` on promising `tile_id`s when they need the full header+payload document.

### 2.2 How this lines up with CodeWiki & Gemini CLI

CodeWiki (as announced) is essentially an automatically generated index / documentation surface for a repo, wired into Gemini Code Assist and a Gemini CLI extension.[Google for Developers+1](https://developers.google.com/gemini-code-assist/docs/overview?utm_source=chatgpt.com)

Where it plugs into this design:

*   **Indexing pipeline**
    *   CodeWiki builds per-symbol / per-file docs and embeddings.
    *   A small Entif-side “capability indexer” walks the CodeWiki index and:
        *   groups related symbols / files into capabilities,
        *   populates the `implementation` and `interface` sections of `CapabilityTilePayload`,
        *   fills in quality/adoption fields from tests, CI, telemetry, etc.
*   **Serving pipeline (MCP server)**
    *   You expose the capability registry as an MCP server that implements `search_capabilities` and `get_capability`.
    *   Internally, `search_capabilities` can:
        *   query a vector index (using CodeWiki embeddings),
        *   apply structured filters on the stored tiles,
        *   return the “summary slice” defined above.
*   **Gemini CLI / CodeWiki extension UX**  
    From the user’s perspective, in the future CodeWiki extension you’d get flows like:
    > “Find a production-ready capability that already parses markdown logs into ECGG nodes and show me its primary entrypoint.”
    Gemini CLI → calls `search_capabilities` (with `query` + `filters.requires_prod_usage = true`) → presents a short ranked list, including repo/path and maturity → calls `get_capability` for the selected tile to show full docs, call examples, and reuse notes.

* * *

If this matches what you meant by “both of those,” the next natural step would be:

*   a tiny in-repo `capabilities/` folder with a few hand-authored tiles,
*   a stub MCP server that just reads JSON files from there and implements these two tools,
*   then later swap the backend to “real” CodeWiki + graph/db once you’re happy with the ergonomics.



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)