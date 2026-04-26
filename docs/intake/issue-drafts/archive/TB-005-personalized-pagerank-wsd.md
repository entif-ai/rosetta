# Issue Draft

## Title
Personalized PageRank (PPR) prior: implement seeded PageRank for WSD disambiguation over concept graph

## Type
issue-candidate

## Labels
`ppr` `wsd` `graph-algorithms` `disambiguation` `rpp`

## Depends On
`rpp/wsd` module

## Evidence
Source: `docs/chats/20260225 - Chat GPT - Token boundaries explained.md`, response Section 7.7

Reference code:

```python
import networkx as nx, numpy as np

def ppr_prior(G, seeds, alpha=0.85, max_iter=50, tol=1e-6):
    # seeds: dict {node: weight}
    n = G.number_of_nodes()
    nodes = list(G.nodes()); idx = {n:i for i,n in enumerate(nodes)}
    A = nx.to_scipy_sparse_matrix(G, nodelist=nodes, weight='w', dtype=float)
    row_sums = np.array(A.sum(1)).flatten()
    row_sums[row_sums==0] = 1.0
    Dinv = 1.0/row_sums
    P = A.multiply(Dinv[:,None])  # row-normalized
    s = np.zeros(n)
    for k,v in seeds.items():
        if k in idx: s[idx[k]] = v
    r = s.copy()
    for _ in range(max_iter):
        r_new = (1-alpha)*s + alpha*(P.T @ r)
        if np.linalg.norm(r_new - r, 1) < tol: break
        r = r_new
    return nodes, np.asarray(r).flatten()
```

## Description

Implement `rpp/wsd/ppr.py` — the Personalized PageRank prior calculator for WSD. The module must:

1. Accept a NetworkX graph G with weighted edges and a seeds dict {concept_id: prior_weight}
2. Compute PPR via power iteration with restart: π = (1-α)s + αPᵀπ
3. Use row-normalized adjacency matrix
4. Return (node_list, probability_vector) for use as prior in MCDA scoring
5. Cache results by lemma for performance
6. Handle sparse adjacency efficiently
7. Include unit tests

## Success Criteria
- PPR weights sum to 1.0 (normalized probability distribution)
- Convergence tolerance 1e-6 achieved within 50 iterations
- Same seeds produce identical output (deterministic)
- Cache hit returns immediately without recomputation
- Tests pass: `python -m pytest tests/unit/test_ppr.py`

## Priority
P0

## Notes
PPR is the primary mechanism for injecting context into disambiguation. Seeds are lexical anchors from the input text.
