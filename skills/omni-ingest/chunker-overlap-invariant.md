# Chunker Overlap Invariant — Critical Design Decision

## The Conflict

Two invariants are mutually exclusive in naive sliding-window chunking:

1. **No content duplication** — every line appears in exactly one chunk
2. **Overlap** — adjacent chunks share boundary lines

With `step = chunk_size - overlap` (e.g., 480 with size=500, overlap=20):
- Lines 1-500 → Chunk 1
- Lines 481-980 → Chunk 2 (shares 20 lines with Chunk 1)
- Line 481 appears in BOTH Chunk 1 and Chunk 2 → **invariant 1 violated**

You cannot guarantee both simultaneously with a sliding window that steps less than `chunk_size`.

## The Resolution

Use **non-overlapping contiguous chunks**:

```python
for start in range(0, len(lines), chunk_size):
    end = min(start + chunk_size, len(lines))
    chunk_lines = lines[start:end]
```

Each line appears in exactly one chunk. Boundary context (the semantic bridge between chunks) is handled by the **orchestrator**, not by duplicating content:

- Pass adjacent chunk boundaries as metadata to sub-agents
- Sub-agents receive `chunk_lines`, `line_start`, `line_end`, and `neighbors: {prev_line_end, next_line_start}` 
- This preserves "exactly once" while still giving sub-agents boundary awareness

## Why This Matters

Many chunking implementations silently violate "exactly once" with small overlap values (10-20 lines), creating:
- Duplicate processing of overlapped lines
- Inconsistent results when those lines contain key entities or relationships
- Non-deterministic RAG if the same document chunk can appear in multiple query contexts

The fix requires choosing contiguity over overlap, and compensating at the orchestration layer.

## Verification

```python
# Verify no duplicates, no gaps
covered = set()
for chunk in chunks:
    for line in chunk['chunk_lines']:
        assert line['line_num'] not in covered, f"Duplicate: {line['line_num']}"
        covered.add(line['line_num'])

assert covered == set(range(1, total_lines + 1)), "Gaps detected"
```

## Status

- **Implemented**: `stages/04-classify-mine/chunker.py` — step=chunk_size
- **Tests**: 23/23 passing in `tests/test_chunker.py`
- **SKILL.md note**: overlap field retained in spec for metadata purposes, but actual content overlap is disabled
