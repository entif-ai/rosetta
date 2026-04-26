# Issue Draft

## Title
Orthogonal Procrustes alignment: implement SVD-based alignment between host embedding space and RPP prototype space

## Type
issue-candidate

## Labels
`procrustes` `alignment` `embeddings` `rpp`

## Depends On
`rpp/align` module

## Evidence
Source: `docs/chats/20260225 - Chat GPT - Token boundaries explained.md`, response Section 7.6

Reference code:

```python
import numpy as np
from numpy.linalg import svd

def orthogonal_procrustes(X, Y):
    # X: n x d1 (host space), Y: n x d2 (rosetta space, same n)
    # If dims differ, pre-project X to Y dims using PCA beforehand.
    U, _, Vt = svd(X.T @ Y)
    R = U @ Vt  # d x d, orthonormal
    return R

def fit_map(X_anchors, Y_targets):
    # mean-center and whiten
    X = X_anchors - X_anchors.mean(0, keepdims=True)
    Y = Y_targets - Y_targets.mean(0, keepdims=True)
    R = orthogonal_procrustes(X, Y)
    return R, X.mean(0), Y.mean(0)

def apply_map(x, R, mx, my):
    return (x - mx) @ R + my
```

## Description

Implement `rpp/align/procrustes.py` — the orthogonal Procrustes alignment module that maps any encoder's embedding space into RPP concept space without retraining the host model.

The module must:
1. Implement `orthogonal_procrustes(X, Y)` via SVD of XᵀY with orthonormality constraint RᵀR = I
2. Implement `fit_map(X_anchors, Y_targets)` returning (R, mean_X, mean_Y) with whitening
3. Implement `apply_map(x, R, mx, my)` for projecting new points
4. Handle dimension mismatch: if d1 ≠ d2, pre-project host space to target dims via PCA first
5. Produce alignment diagnostics: residual error, condition number
6. Include unit tests

## Success Criteria
- Orthonormality check passes: R.T @ R ≈ I (within 1e-6 tolerance)
- fit_map/apply_map round-trip produces near-identical vectors (cosine ≥ 0.999)
- Diagnostic output includes fit quality metrics
- Tests pass: `python -m pytest tests/unit/test_procrustes.py`

## Priority
P0

## Notes
This is the core cross-vendor interop mechanism. Once aligned, any model can project to RPP space for comparison.
