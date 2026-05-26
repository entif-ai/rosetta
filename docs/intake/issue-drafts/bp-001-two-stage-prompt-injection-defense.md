# BP-001: Two-Stage Prompt Injection Defense

Issue draft id: `bp-001-two-stage-prompt-injection-defense`
Priority: `P1`
Effort: `M`
Labels: `security`, `content-sanitization`, `critical`, `berman-prompts`

## Problem

Untrusted content (email, web pages, tweets, Slack/Telegram messages, transcripts, KB excerpts, uploaded files) enters the system without systematic sanitization. Existing content filters are inconsistent or absent across ingestion paths. Prompt injection via malicious content is a documented attack vector (2026 incidents with OpenClaw agents forced to delete emails or leak credentials via hidden instructions in AI-read text).

## Scope

Implements a two-stage prompt injection defense as a reusable security primitive:
- Stage 1: Deterministic regex sanitizer (known injection patterns: role markers "System:", "ignore previous instructions", "act as", directive patterns)
- Stage 2: Model-based semantic scanner (separate LLM call, isolated from agent's own conversation context) for sophisticated attacks that regex misses
- Fail-closed behavior for high-risk sources (email content, URL ingestion)
- Mark flag-but-not-block content with a risk prefix

## Source Evidence

docs/external/Berman-prompts.md §6 (Security):
> "Deterministic sanitizer: regex detection of injection patterns (role markers like 'System:', 'ignore previous instructions', 'act as', directive patterns) / Model-based semantic scanner: use a separate LLM call (not the agent's own context) to analyze suspicious content for attacks that regex misses / Fail closed for high-risk sources (email content, URL ingestion)"

docs/external/Berman-prompts.md §10 (Lead Pipeline):
> "Security quarantine: Run deterministic sanitization on every inbound message before scoring / Run a model-based semantic scanner (fail-closed for high-risk content) / Never fetch or click links found in emails"

## Specific Findings

### Finding 1: Direct security path must be isolated from agent conversation context
 Berman-prompts.md §14 (LLM Router):
> "Direct provider path (for security-critical operations): A separate module that calls provider APIs directly, bypassing the router / Used by your security scanner so content gates are isolated from the agent's own conversation context"

The security scanner must not share context with the agent it's protecting. This requires a separate LLM call path with independent credential resolution.

### Finding 2: Fail-closed for high-risk sources
 Berman-prompts.md §6:
> "Fail closed for high-risk sources (email content, URL ingestion)"

Any content classified as high-risk (external email, URL-fetched content) must be blocked by default if sanitization fails, not passed through with a warning.

### Finding 3: Outbound redaction as complementary safety net
 Berman-prompts.md §6:
> "Outbound redaction module: catch API keys, bearer tokens, passwords before sending any message / PII redaction: catch personal emails, phone numbers, dollar amounts"

Inbound defense is necessary but not sufficient. Outbound redaction catches any secrets that slip through other layers.

## Acceptance Criteria

- [ ] Stage 1 deterministic regex sanitizer covers: role markers (System:, AI:, Assistant:, HUMAN:), directive patterns (ignore previous, disregard all instructions, you are now), injection templates (```system, ```assistant, injected prompts)
- [ ] Stage 2 model-based semantic scanner is isolated from agent conversation context (separate LLM call path)
- [ ] High-risk sources (email content, URL ingestion) fail-closed: block if sanitization fails
- [ ] Flagged-but-not-blocked content receives risk prefix in output
- [ ] Outbound redaction catches API keys, bearer tokens, PII, dollar amounts
- [ ] No prompt injection patterns survive test corpus (known attack phrases + adversarial variants)