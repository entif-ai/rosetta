# BIP-006-1 — Policy Table Weight Update Mechanism Not Specified

**Use Case:** BIP-006 (Nightly Business Briefing)
**Confidence:** HIGH
**Type:** spec-gap

## Description

The priority formula uses weights `(impact × 0.4) + (confidence × 0.35) + ((100 - effort) × 0.25)` stored in a "policy table" that is "updated via feedback over time." The mechanism for collecting feedback, computing new weights, and updating the policy table is entirely unspecified.

## Specific Problems

1. **No feedback collection mechanism:** How is feedback provided? By the user explicitly rating recommendation quality? By tracking whether recommendations were acted on? By comparing predicted vs. actual outcomes?
2. **No weight update algorithm:** What optimization algorithm updates the weights? Gradient descent? Bayesian updating? Heuristic hill climbing? Manual override?
3. **No convergence criteria:** How does the system know when weights are "good enough"? No target metric is described.
4. **Policy table location:** Is this a SQLite table? A JSON config file? An environment variable? The persistence layer is unspecified.
5. **No learning rate or update frequency:** How often are weights updated? After every recommendation? Weekly? With what damping or momentum?

## Expected Behavior

Define:
1. Feedback signal source (e.g., did the user act on recommendation within 7 days? Did it succeed?)
2. Weight update algorithm (e.g., weighted least squares regression on historical recommendation outcomes)
3. Update frequency and damping (e.g., weekly with 0.1 learning rate to prevent oscillation)
4. Policy table schema and persistence

## Source Reference

BIP-006, "Ranking" section: "Default weights: w1=0.4, w2=0.35, w3=0.25. Store weights in a policy table and update via feedback over time."
