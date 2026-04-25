# DF-014: MCP OAuth token refresh not validated against expiration time

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

MCP OAuth supports client_credentials and refresh_token flows with automatic token refresh. However, the refresh timing is not documented — specifically, it's unclear whether the system checks token expiration before refreshing, or blindly refreshes on a schedule. Preemptive refresh before expiration is best practice; reactive refresh after failure adds latency.

## Evidence

From MCP System section:
> "OAuth (HTTP/SSE): Supports token endpoint flows (`client_credentials`, `refresh_token`) with automatic token refresh + Authorization header injection"

No specifics on refresh window or expiration detection timing.

## Implications

- If refresh is reactive (refresh when request fails with 401), every expired token causes a failed request before refresh
- If refresh is too aggressive (refreshes before needed), it may hit rate limits on the OAuth server
- No visibility into token state — no logs or metrics on token age, refresh frequency, or expiration
- If the OAuth server is down during a reactive refresh, the MCP tool call fails entirely
- No handling of refresh token expiration (refresh tokens also expire)

## Best Practice

Preemptive OAuth refresh should:
1. Track token expiration time (exp claim in JWT or from token response)
2. Refresh when current time + buffer >= expiration time (buffer typically 5-10 minutes)
3. Use background refresh to avoid blocking requests

## Recommendations

1. Document the refresh strategy (preemptive vs reactive) clearly
2. Track token expiration time and refresh with a configurable buffer (e.g., 5 minutes before expiry)
3. Add logging for token refresh events (success, failure, timing)
4. Add metrics: token age at refresh, requests that hit expired token before refresh
5. Handle refresh token expiration as a distinct failure mode with clear error messaging
6. Consider caching the access token in memory to avoid unnecessary refresh calls

## Labels

mcp, oauth, token-refresh, expiration, security, http

## Status

issue-candidate