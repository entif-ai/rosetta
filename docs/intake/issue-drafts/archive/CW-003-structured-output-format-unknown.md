# CW-003: Structured output format for CodeWiki CLI unknown

**Type:** issue-candidate  
**Confidence:** high  
**Source:** `docs/chats/20260225 - Chat GPT - Code Wiki integration.md` §6

## Problem

The CodeWiki CLI extension (planned/in development by Google as of Nov 2025) has no publicly documented machine-readable output format. The blog post only promises "run the same system locally and securely" without specifying API shape.

## Evidence

> "We don't yet know what structured outputs the Code Wiki CLI extension will expose. The blog only promises 'run the same system locally and internally' with Gemini CLI."

## Required

1. Monitor CodeWiki CLI extension release notes / documentation
2. Define fallback parsing strategy: `OUTPUT_JSON_ONLY` convention or screen-scrape if no structured output available
3. Design adapter so output-format changes are isolated (don't let unknown format bleed into capability registry)

## Notes

- No dependency on other issues; monitoring task
- If Google publishes API spec before Entif needs to build: this issue can be closed
- Risk: if structured output is not available, CodeWikiForge indexing cost increases significantly
