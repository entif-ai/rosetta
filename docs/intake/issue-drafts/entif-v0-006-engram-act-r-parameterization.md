# ENTIF-v0-006: ACT-R Parameterization for Engram Base-Level Activation Unspecified

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-006 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #8 in ledger |
| Confidence | `high` |

---

## Problem Statement

The engram schema includes:

```json
"activation": {
  "base_level": 1.12,
  "decay_d": 0.5,
  "last_accessed_at": "2026-03-24T19:20:11Z",
  "access_count": 1
}
```

The spec cites ACT-R base-level activation and states "ACT-R base-level activation provides a practical lever: engrams accessed frequently/recently stay 'active' and resist decay."

**But the ACT-R parameterization is not provided.** The canonical ACT-R base-level activation formula is:

```
B = ln(Σ t_i^(-d))
```

Where:
- `t_i` = time since the i-th occurrence of the trace
- `d` = decay rate parameter (typically 0.2–0.5 in ACT-R literature)

The spec uses `decay_d: 0.5` in the example but does not specify:
- What time unit is used for `t_i` (seconds? minutes? days?)
- Whether traces are weighted equally or with recency bias
- How the summation window works (all historical traces, or a recent window?)
- What the expected range of `base_level` values is (so implementers can calibrate alarms)

---

## Evidence

The spec says "ACT-R base-level activation provides a practical lever" with citations (turn2search0, turn2search3) but provides no parameter table or formula instantiation.

The example value `base_level: 1.12` appears without explanation of how it was computed or what it means relative to other engrams.

---

## Impact

- Engram activation scores will be incomparable across implementations that parameterize ACT-R differently
- Memory tier promotion/demotion rules (which depend on activation scores) cannot be defined without a reference formula
- The decay mechanism cannot be tested without known input/output pairs for the activation formula

---

## Dependencies

- None (this is foundational to the memory plane)

---

## Suggested Resolution

1. Specify the full ACT-R parameterization:
   - `d` = 0.5 (as in example; confirm this is the intended value)
   - Time unit = seconds since Unix epoch (so `t_i` = `now - trace_timestamp_i`)
   - Window = all historical traces (no decay window cutoff)
   - Weighting = equal weight per trace (no recency bias in base-level; recency bias comes from time since last trace)
2. Provide a reference implementation of the base-level computation in pseudocode
3. Provide test vectors: given N traces at specific timestamps, the expected `base_level` output
4. Define the base_level range convention: higher = more active; threshold for tier promotion/demotion to be defined in ENTIF-v0-007

---

## Open Questions

- Should the base-level formula use a decay buffer (ignore traces older than X days)?
- Should traces from different source domains receive different weights?
- Should the identity of the accessing agent affect activation (a persona's repeated access to its own engrams = higher activation)?