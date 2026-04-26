# Issue Draft

## Title
Path2Vec trainer: implement graph-first sense embedding with MSE loss, neighbor regularization, and negative sampling

## Type
issue-candidate

## Labels
`graph-embeddings` `path2vec` `pytorch` `rpp`

## Depends On
`rpp/embed` module

## Evidence
Source: `docs/chats/20260225 - Chat GPT - Token boundaries explained.md`, response Section 7.3

Reference code block:

```python
# file: rpp/embed/train_path2vec.py
import torch, torch.nn as nn, numpy as np
from tqdm import tqdm

class Lookup(nn.Module):
    def __init__(self, n, d=256):
        super().__init__()
        self.E = nn.Embedding(n, d)
        nn.init.xavier_uniform_(self.E.weight)
    def forward(self, i, j):
        a = self.E(i); b = self.E(j)
        return (a*b).sum(-1)  # dot

def load_pairs(path, nodes):
    idx = {n:i for i,n in enumerate(nodes)}
    X=[]
    with open(path) as f:
        for line in f:
            a,b,s = line.strip().split("\t")
            if a in idx and b in idx:
                X.append((idx[a], idx[b], float(s)))
    return X

if __name__ == "__main__":
    nodes = sorted(set([p[0] for p in pairs_raw]+[p[1] for p in pairs_raw]))
    idx = {n:i for i,n in enumerate(nodes)}
    triples = [(idx[a], idx[b], float(s)) for a,b,s in pairs_raw]
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = Lookup(len(nodes), d=256).to(device)
    opt = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)
    loss_fn = nn.MSELoss()
    torch.manual_seed(42)
    for epoch in range(10):
        np.random.shuffle(triples)
        loss_epoch = 0.0
        for k in range(0, len(triples), 1024):
            batch = triples[k:k+1024]
            i = torch.tensor([t[0] for t in batch], dtype=torch.long, device=device)
            j = torch.tensor([t[1] for t in batch], dtype=torch.long, device=device)
            s = torch.tensor([t[2] for t in batch], dtype=torch.float32, device=device)
            opt.zero_grad()
            pred = model(i,j)
            loss = loss_fn(pred, s)
            loss.backward(); opt.step()
            loss_epoch += loss.item()*len(batch)
        print(f"epoch {epoch}: mse={loss_epoch/len(triples):.6f}")
    E = model.E.weight.detach().cpu().numpy()
    np.savez("artifacts/graph_only.npz", nodes=np.array(nodes), vecs=E)
```

## Description

Implement `rpp/embed/train_path2vec.py` — a PyTorch module that trains sense embeddings to predict WordNet graph proximities using the Path2Vec objective. The module must:

1. Load training pairs from `artifacts/path2vec_pairs.tsv` (format: `source_id\t target_id\t similarity_score`)
2. Build a `Lookup` embedding table (num_nodes × embedding_dim)
3. Train with MSE loss on predicted dot product vs. target similarity
4. Use neighbor regularization and negative sampling
5. Save embeddings to `artifacts/graph_only.npz` with `nodes` and `vecs` arrays
6. Be CPU-compatible (GPU optional)
7. Include unit tests with fixed seeds

## Success Criteria
- Training completes without errors on a 200-node WordNet subgraph sample
- Embeddings saved as NPZ with correct shape (n_nodes × 256)
- Dot product of known similar pairs produces higher score than random pairs (spot check)
- Tests pass in CI with `python -m pytest tests/unit/test_path2vec.py`

## Priority
P0

## Notes
Corresponds to RPP Phase 2 (Graph & Embeddings) and is prerequisite for Procrustes alignment.
