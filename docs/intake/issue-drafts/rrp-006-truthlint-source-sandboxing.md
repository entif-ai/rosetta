# RRP-006: Design Source Ingestion Sandboxing for TruthLint Before Shipping

## Type
security

## Summary

TruthLint's truth inspection pipeline accepts user-provided sources (URLs, PDFs, quotes) as evidence for claims. ROCK-31XX's threat model identifies "prompt injection via sources" as a critical risk: untrusted source text embedded in a prompt could attempt to manipulate or override system instructions, exfiltrate context, or trigger unintended tool calls.

The document explicitly flags this risk and states the mitigation ("treat sources as untrusted data; strip scripts; sandbox parsing; do not let source text steer system prompts") but does NOT specify the concrete implementation for source ingestion sandboxing. This must be designed before the claim extraction + source-attached features ship.

## Evidence

Source: `docs/governance/ROCK-31XX - Rosetta Pasigraphy Protocol - Provenance, Receipts, TruthLint - 20260224.md`, Threat Model section (lines ~682-944):

> "Prompt injection via sources. Mitigation: treat sources as untrusted data; strip scripts; sandbox parsing; do not let source text steer system prompts."

Related from Security section in OpenClaw/Berman prompts (precedent for solution shape):
> "Prompt injection defense (two-stage): deterministic sanitizer: regex detection of injection patterns (role markers like 'System:', 'ignore previous instructions', 'act as', directive patterns); model-based semantic scanner: use a separate LLM call to analyze suspicious content for attacks."

## Expected artifact

A source ingestion security design doc defining:
1. **Input classification**: which source inputs get sandboxed (URL fetcher results, PDF/text extractions, pasted quotes, uploaded files)
2. **Deterministic pass**: regex patterns for injection markers (role directives, ignore instructions, delimiter patterns)
3. **Structural sanitization**: strip `<script>`, `javascript:`, `data:` URLs, HTML comments, meta refresh redirects, embedded JSON with user-controlled keys
4. **LLM semantic scan** (optional but recommended for MVP1+): separate model call without system-context access to score source content for injection risk
5. **Content boundary**: source content must not appear in the same prompt context as the claim extraction system prompt. At minimum: pass source content as attached evidence tiles, not as inline prompt strings
6. **Audit logging**: log all source content and its classification/cleansing decisions for post-incident forensics
7. **Fetch-time security**: URL fetching must enforce scheme allowlist (http/https only), reject redirects beyond N hops, enforce size limits, block SSRF attempts (internal IP ranges)

## Priority
high (blocks feature: any TruthLint feature that attaches user-provided sources)

## Labels
- security
- prompt-injection
- source-ingestion

## Depends On
None — independent design work
