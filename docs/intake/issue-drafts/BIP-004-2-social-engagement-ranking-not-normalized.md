# BIP-004-2 — Engagement Ranking Ignores Follower Count Normalization

**Use Case:** BIP-004 (Social Media Research System)
**Confidence:** MEDIUM
**Type:** correctness

## Description

Results are ranked by raw engagement score (likes + retweets + replies). This biases toward high-follower accounts. A tweet with 1,000 interactions from an account with 2 million followers represents a very different signal than a tweet with 1,000 interactions from an account with 500 followers.

## Specific Problem

1. **High-follower amplification:** A viral tweet from a major account at 1% engagement rate gets ranked the same as an obscure but highly relevant thread at 50% engagement rate.
2. **No normalized engagement rate:** Engagement rate = interactions / followers. A 100-interaction tweet from a 100-follower account (100% rate) is far more resonant within its community than a 100-interaction tweet from a 1M-follower account (0.01% rate).
3. **Manipulation vulnerability:** Bad actors can artificially inflate engagement metrics without corresponding follower counts, or target low-follower high-engagement accounts for suppression.

## Expected Behavior

Ranking should use engagement rate or a similar normalization:
1. **Engagement rate:** `(likes + retweets + replies) / max(follower_count, 1)` — captures relative resonance
2. **Follower-tier bucketing:** Separate ranking pools by follower count tier (nano < 10K, micro < 100K, mid < 1M, macro > 1M)
3. **Combined score:** Raw engagement × engagement_rate as a composite signal

At minimum, follower count should be displayed alongside raw engagement to allow human judgment.

## Source Reference

BIP-004, "Filtering" section: "Rank by engagement (likes + retweets + replies)."
