# BP-002: LLM Router with OAuth Token Resolution and Smoke Test

Issue draft id: `bp-002-llm-router-oauth-smoke-test`
Priority: `P1`
Effort: `L`
Labels: `llm-router`, `platform-config`, `critical`, `berman-prompts`

## Problem

LLM calls are made directly against provider APIs with inconsistent credential handling, no provider fallback, no call logging, and no smoke test to catch credential failures before expensive calls. Silent auth failures go undetected until a full request fails mid-session.

## Scope

Implements a unified LLM router as a core platform component:
- Single entry point `runLlm({model, prompt, options})` with auto-detect provider from model name
- OAuth token resolution: CLAUDE_CODE_OAUTH_TOKEN env var first, then .env file, error if ANTHROPIC_API_KEY also set (conflict detection)
- Startup smoke test on first call: sends "Reply with exactly AUTH_OK" and validates response contains AUTH_OK (20s timeout, disableable via env var)
- Direct security path for security-critical operations (calls provider APIs directly, bypassing router, isolated from agent context)
- Prompt caching for repeated system prompts
- Fire-and-forget call logging to interaction store

## Source Evidence

docs/external/Berman-prompts.md §14 (LLM Router):
> "Single callLlm interface / Auto-detect provider from model name (anthropic, openai, google, etc.) / Route to appropriate SDK or API client / Direct provider path for security-critical operations: calls provider APIs directly, bypassing the router / Used by security scanner so content gates are isolated from the agent's own conversation context / Startup smoke test"

docs/external/Berman-prompts.md §23 (Claude Agents SDK Migration):
> "OAuth token resolution: Check CLAUDE_CODE_OAUTH_TOKEN env var first / Fall back to parsing from .env file / If ANTHROPIC_API_KEY is also set, throw an error (they conflict in OAuth-only mode) / Startup smoke test: send 'Reply with exactly AUTH_OK' / Validate response contains AUTH_OK"

docs/external/Berman-prompts.md §12 (LLM Usage and Cost Tracking):
> "logLlmCall(): fire-and-forget insert. Truncate prompt/response to 10K chars. Redact API keys/bearer tokens before storing"

## Specific Findings

### Finding 1: Conflict detection prevents credential model confusion
 Berman-prompts.md §23:
> "If ANTHROPIC_API_KEY is also set, throw an error (they conflict in OAuth-only mode)"

Simultaneous API key and OAuth credential presence indicates misconfiguration. The system must error rather than silently default to one or the other.

### Finding 2: Smoke test must be blocking on first call, not optional
 Berman-prompts.md §23:
> "Startup smoke test: send 'Reply with exactly AUTH_OK' / Validate response contains AUTH_OK / 20-second timeout, can be disabled via env var"

The smoke test runs once per process on first call and blocks until AUTH_OK or timeout. This prevents expensive calls from being made with bad credentials.

### Finding 3: Direct security path isolation is architectural
 Berman-prompts.md §14:
> "Direct provider path (for security-critical operations): A separate module that calls provider APIs directly, bypassing the router / Used by your security scanner so content gates are isolated from the agent's own conversation context"

The security scanner calling the same LLM router it protects creates a feedback loop vulnerability. Direct path is not an optimization — it is a security architecture requirement.

## Acceptance Criteria

- [ ] `runLlm({model, prompt})` accepts model name string, auto-detects provider, returns `{text, provider, durationMs}`
- [ ] OAuth token resolution: check env var first, then .env, throw error on API key + OAuth conflict
- [ ] Smoke test fires on first call: "Reply with exactly AUTH_OK" → validate AUTH_OK in response (20s timeout, env-var-disableable)
- [ ] Security scanner uses direct provider path, not main router
- [ ] Fire-and-forget logging to interaction store (provider, model, tokens, cost estimate, duration, ok/error)
- [ ] Prompt caching for repeated system prompts reduces cost