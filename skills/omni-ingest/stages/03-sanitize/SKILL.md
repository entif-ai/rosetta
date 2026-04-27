---
name: omni-ingest-stage-03
description: |
  Stage 3 (Sanitize) of the omni-ingest pipeline. Deterministic hygiene gate — no LLM,
  no sub-agents, no network calls. Pure functions only.
  
  Runs in order: utf8_normalize → emoji_strip → malware_heuristics → spam_score → quality_gate.
  Verdict: benign (pass to Stage 4) | quarantine (pause for human review) | reject (terminate).
category: omni-ingest
---

# Stage 3: Sanitize — Deterministic Hygiene Gate

## Purpose

Stage 3 is the **first cognitive gate** — the deterministic filter before any expensive
LLM work begins. It must run in under 30 seconds with no external dependencies.

## Principles

1. **Pure functions** — no side effects, no network, no sub-processes (except Python stdlib)
2. **No LLM calls** — this is the gate that prevents garbage from reaching expensive cognition
3. **Fail-closed** — any malware hit → reject immediately
4. **Deterministic** — same input → same output every time

## Checks (in order)

| Check | Purpose | Blocks On |
|-------|---------|-----------|
| `utf8_normalize` | Remove ZWSP/bidi, validate Latin-1 subset | >5% non-Latin-1 chars |
| `emoji_strip` | Remove emoji/symbol density, score content | >10% emoji |
| `malware_heuristics` | Scan for known malicious patterns | Any malware hit (fail) |
| `spam_score` | Bayesian word freq, caps ratio, URL density | Score ≥0.6 |
| `quality_gate` | Reject garbage (<10 words, >80% non-alpha) | <10 words or >80% non-alpha |

## Verdict Logic

```
if malware_heuristics == fail → reject
elif malware_heuristics == warn OR any other check == fail → quarantine
elif any other check == warn → benign (log warn)
else → benign
```

## Running Stage 3

```bash
# Standalone
cd ~/.hermes/skills/omni-ingest
python -m stages.03_sanitize.sanitize <workflow_id>

# Via pipeline (called by orchestrator)
```

## Output

Writes to `bus/sanitization.<workflow_id>.json`:
```json
{
  "verdict": "benign",
  "checks": {
    "utf8Normalize": {"status": "pass", "score": 0.0, "notes": []},
    "emojiStrip": {"status": "pass", "score": 0.0, "notes": []},
    "malwareHeuristics": {"status": "pass", "score": 0.0, "notes": []},
    "spamScore": {"status": "pass", "score": 0.1, "notes": []},
    "qualityGate": {"status": "pass", "score": 0.0, "notes": ["1240 words, alpha ratio 91.2%"]}
  },
  "notes": []
}
```

## Adding a new check

1. Write a pure function `def my_check(text: str) -> CheckResult:` in `sanitize.py`
2. Add it to the `CHECKS` list at the bottom of `sanitize.py`
3. Update verdict logic if the check should have blocking semantics
4. Add test in `tests/test_sanitize.py`

## Testing

```bash
cd ~/.hermes/skills/omni-ingest
python -m pytest tests/test_sanitize.py -v
```
