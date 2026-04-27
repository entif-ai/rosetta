# Issue Draft

## Title
CLIP image prototypes ETL: generate CLIP vectors for 100 imageable WordNet synsets

## Type
issue-candidate

## Labels
`multimodal` `clip` `image-encoder` `prototypes` `rpp`

## Depends On
`rpp/modal/image` module

## Evidence
Source: `docs/chats/20260225 - Chat GPT - Token boundaries explained.md`, response Section G.5

> "Simple ETL producing CLIP vectors for 100 imageable concepts and YAMNet vectors for 50 audio events; link to concept URIs; retrieval demo."

CLIP (OpenAI) maps images and text to a joint embedding space — used for image↔text cross-modal retrieval.

## Description

Implement `rpp/modal/image/etl.py` — ETL pipeline for image prototype generation.

The module must:
1. Select top 100 high-frequency imageable WordNet noun synsets (e.g., dog.n.01, car.n.01, cat.n.01)
2. For each synset, generate a text prototype (gloss + example) and encode via CLIP ViT-B/32
3. Store CLIP vectors (512-dim) keyed by concept URI in `data/clip_prototypes.npz`
4. Include metadata: synset ID, label, CLIP vector, modality=image
5. Provide a retrieval function: given a query image or text, return top-k matching concept URIs
6. Be CPU-compatible for MVP (no GPU required)

## Success Criteria
- 100 synsets selected with rationale documented
- CLIP vectors saved to NPZ with nodes (synset IDs) and vecs arrays
- `retrieve(query_text_or_image, topk=5)` returns ranked concept URIs with cosine scores
- Cross-modal retrieval: dog image + "animal" query returns dog.n.01 in top-3
- Tests pass: `python -m pytest tests/unit/test_clip.py`

## Priority
P1

## Notes
CLIP enables image↔text retrieval in the multimodal RPP demo. The 100 synset scope is MVP scope; full coverage is post-MVP.
