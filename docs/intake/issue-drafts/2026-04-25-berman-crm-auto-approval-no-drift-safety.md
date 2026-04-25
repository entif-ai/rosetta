# CRM auto-approval drift safety — no mechanism if pattern-learner degrades

## Metadata

- **Draft created**: 2026-04-25
- **Source**: docs/external/Berman-PRD.md §CRM System — Contact Discovery
- **Extraction**: docs/intake/docs-intelligence/2026-04-25-berman-prd.md
- **Labels**: crm, intelligence, safety

## Summary

The CRM learning system (`pattern-learner.js`) builds skip patterns from approve/reject decisions and suggests auto-add mode after 50 decisions. Once auto-add is enabled, new contacts matching learned patterns are automatically added without human review. There is no documented drift detection — the system has no mechanism to detect if the pattern learner begins degrading (e.g., due to a shift in email patterns, a new newsletter source being absorbed, or the decision criteria drifting over time).

## Evidence

- `Learning system (pattern-learner.js): builds skip patterns from approve/reject decisions, suggests auto-add mode after 50 decisions`
- No drift detection, periodic review, or override mechanism documented

## Risk

- Auto-add could begin absorbing low-quality contacts (newsletters, mass emails, misclassified senders) without Matt noticing
- After 50 decisions, the threshold for auto-add is relatively low — could be triggered quickly with consistent usage
- No way to revert auto-add mode once enabled without manually editing the learning state
- No visibility into what patterns have been learned — opacity makes drift hard to detect

## Recommended Action

1. Add a periodic review of learned patterns (e.g., weekly digest to Telegram showing top patterns learned, number of auto-adds, false positive rate estimation)
2. Add a manual override/disable for auto-add mode with a single command (e.g., "disable auto-add")
3. Add a "confidence threshold" for auto-add — only auto-add when pattern confidence exceeds a set threshold (e.g., 90%)
4. Store pattern-learner version/history so drift can be tracked over time

## Priority

medium