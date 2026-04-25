# Instagram token refresh — no advance reminder before 60-day expiry

## Metadata

- **Draft created**: 2026-04-25
- **Source**: docs/external/Berman-PRD.md §Tools — Social Tracker — Instagram
- **Extraction**: docs/intake/docs-intelligence/2026-04-25-berman-prd.md
- **Labels**: instagram, social-tracker, auth

## Summary

Instagram analytics collection uses a Meta Graph API long-lived token that must be refreshed every 60 days via `ig_collect.py --refresh`. The token refresh updates both the local `.env` and the canonical `~/.openclaw/.env`. However, there is no advance reminder (e.g., 7-day warning) before the token nears expiry. If the token expires without refresh, Instagram per-post analytics collection stops silently, and the social-tracker health check has no awareness of token expiry state.

## Evidence

- `Instagram via Meta Graph API long-lived token (~/.openclaw/.env, refresh every 60 days with ig_collect.py --refresh)`
- `Run with --refresh to extend token (updates both local and canonical .env)`
- No reminder system documented

## Risk

- Token could expire without notice — Instagram analytics collection silently stops
- No alerting if Instagram token is within 7 days of expiry
- The social-tracker health check (cron health check every 30 min) does not check token expiry dates
- If Matt misses the 60-day window, Instagram analytics would need manual re-authentication

## Recommended Action

1. Add a token expiry check to the weekly social-tracker health report
2. Send a Telegram reminder 7 days before the token expires (check the token's `expires_at` field or track last refresh date)
3. Document the token refresh command and deadline in the social-tracker README
4. Add `ig_token_expiry` field to the social-tracker database so health checks can surface it

## Priority

medium