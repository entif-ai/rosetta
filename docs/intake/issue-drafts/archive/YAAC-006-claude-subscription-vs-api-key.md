# YAAC-006: Claude API key vs subscription for OpenClaw

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** anthropic, api-key, openclaw, terms  
**Depends On:** —  
**Evidence:** `docs/chats/20260226 - Chat GPT - YT, Agents, Auth and Cache.md`

## Summary

Clarify the policy boundary between Claude subscription (for interactive use) and Anthropic API key (for OpenClaw automation), given documented enforcement of OAuth token restrictions.

## The Policy Reality

### Current official docs state:
- OAuth tokens from Free/Pro/Max are intended exclusively for Claude Code and claude.ai
- Using those tokens in any other product or service, explicitly including the Agent SDK, is not permitted
- Third-party devs may not offer Claude.ai login or route requests through consumer plan credentials on behalf of users
- Anthropic reserves right to enforce without notice

### Tariq (Anthropic) clarification:
- Max subscriptions can still use Agent SDK for local development and experimentation
- Should use API key for "building a business on top" of Agent SDK
- Docs cleanup caused confusion; "nothing is changing" about Max + Agent SDK for local dev

## Why "Wrap SDK to Pipe Requests" Doesn't Work

1. **Policy violation:** Converting subscription auth into automated calls through third-party tool = exactly the behavior prohibited
2. **SDK design:** Agent SDK is designed around API-key (usage-based) authentication, not subscription passthrough
3. **Enforcement risk:** Reports of OAuth tokens rejected in third-party clients; some account actions taken

## Practical Path Forward

| Use Case | Authentication Method |
| --- | --- |
| Interactive coding (Claude Code) | Claude subscription (Pro/Max) |
| Analysis/planning in claude.ai | Claude subscription |
| OpenClaw automation | Anthropic API key (usage-based) |
| Local agent lab experimentation | Either, but separate subscription from automation by design |

## Cost Management

- Use API key auth for OpenClaw automation
- Use prompt caching where available (API-only feature)
- Prefer cheaper models (Haiku) for high-volume ingestion; reserve Sonnet/Opus for complex tasks
- Cap max output tokens aggressively
- Monitor usage.cached_tokens per call

## Recommendation for Entif/OpenClaw Setup on Mac Studio

1. **Interactive work:** Claude subscription for Claude Code
2. **Automation:** API key auth in OpenClaw provider config
3. **Do not attempt:** Subscription passthrough or "harness" wrapping to avoid API billing

## Status

Open.
