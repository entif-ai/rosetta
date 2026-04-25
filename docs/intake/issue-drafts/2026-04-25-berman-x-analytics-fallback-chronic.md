# X/Twitter analytics fallback to public_metrics — no alerting if chronic

## Metadata

- **Draft created**: 2026-04-25
- **Source**: docs/external/Berman-PRD.md §Tools — Social Tracker
- **Extraction**: docs/intake/docs-intelligence/2026-04-25-berman-prd.md
- **Labels**: x-analytics, social-tracker, monitoring

## Summary

X/Twitter per-post analytics uses dual tracking: `public_metrics.impression_count` (always available, stored in `x_posts.view_count`) and the analytics endpoint `impressions` (richer metrics, 30-day window, stored in hourly `x_post_stats` snapshots). The PRD documents that it "falls back to public_metrics when analytics unavailable" but there is no alerting mechanism when the fallback becomes chronic (i.e., when the analytics endpoint is consistently unavailable for extended periods, suggesting a deeper auth or API issue).

## Evidence

- `Dual collection — public_metrics.impression_count stored in x_posts.view_count (always available), plus impressions from analytics endpoint in hourly snapshots (richer metrics, 30-day window). Falls back to public_metrics when analytics unavailable.`
- No alerting, monitoring, or chronic-fallback detection documented

## Risk

- If X/Twitter OAuth 1.0a credentials expire or become invalid, `x_collect.py` silently falls back to public_metrics with no alert
- Matt loses visibility into richer engagement metrics (likes, retweets, bookmarks, shares, follows, media views, URL clicks, profile clicks) without knowing
- The `x_post_stats` hourly snapshots would have null/missing data for the richer metrics, which might not be visible in normal query output
- Could go undetected for days or weeks if not manually checked

## Recommended Action

1. Add a monitoring check in `x_collect.py` — if analytics endpoint returns errors for N consecutive collections, send Telegram alert
2. Add a `last_analytics_success` timestamp to the database and surface it in `x_query.py summary`
3. Add `x-analytics-fallback-active` flag to the social-tracker health output
4. Document the fallback behavior in the social-tracker health check

## Priority

medium