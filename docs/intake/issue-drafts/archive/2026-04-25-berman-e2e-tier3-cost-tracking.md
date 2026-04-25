# E2E Tier 3 cost tracking missing — ~$2-3/run could reach $100-150/month

## Metadata

- **Draft created**: 2026-04-25
- **Source**: docs/external/Berman-PRD.md §Cron Jobs — E2E Tests
- **Extraction**: docs/intake/docs-intelligence/2026-04-25-berman-prd.md
- **Labels**: testing, cost, e2e

## Summary

E2E Tier 3 runs weekly and costs ~$2-3 per run. Tier 2 also runs weekly (~$1-2/run). Combined, E2E testing costs ~$3-5/week = $12-20/month for Tier 2, and potentially additional for Tier 3. The `model-usage-tracker` skill exists and logs to `~/.openclaw/logs/model-usage.jsonl`, but there is no documented budget cap, alerts when E2E costs exceed a threshold, or cost tracking attribution (so E2E costs can be distinguished from other LLM usage).

## Evidence

- `E2E Tests: Tier 2 (Weekly) — agent turns with live LLMs, costs ~$1-2`
- `E2E Tests: Tier 3 (Weekly) — full pipeline with Telegram round-trip, costs ~$2-3`
- `model-usage-tracker` exists: `./log-usage.js <model> <tokens_in> <tokens_out> <task_type> <description>` with JSONL log at `~/.openclaw/logs/model-usage.jsonl`

## Risk

- E2E costs accumulate silently; no budget visibility
- If test frequency increases or test scope expands, costs could exceed expectations without warning
- `model-usage-tracker` logs data but the E2E tests don't appear to explicitly call `log-usage.js` with a `task_type=e2e-test` — costs may not be attributed correctly
- No alerting if monthly E2E cost exceeds a threshold (e.g., $50/month)

## Recommended Action

1. Ensure E2E test scripts (Tier 2 and Tier 3) explicitly log to model-usage.jsonl with `task_type=e2e-tier-2` and `task_type=e2e-tier-3`
2. Add a monthly E2E cost report to the financials topic or a dedicated monitoring channel
3. Add a budget threshold alert: if E2E costs exceed X in a month, send Telegram alert
4. Document the expected monthly E2E cost range in the test infrastructure documentation

## Priority

low