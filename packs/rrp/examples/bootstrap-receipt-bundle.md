# Bootstrap Receipt Bundle

The bootstrap demo uses RRP to prove a small but real chain:

1. A Rosetta run and action are created
2. A source-aware artifact is refined through parse-only ingress
3. A receipt is issued over the resulting evidence
4. A bundle closes over receipt, subject, evidence, and policy references
5. The bundle can be verified without trusting the emitter
