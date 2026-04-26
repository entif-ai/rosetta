# Issue Draft

## Title
YAMNet audio prototypes ETL: generate YAMNet vectors for 50 audio event concepts

## Type
issue-candidate

## Labels
`multimodal` `yamnet` `audio-encoder` `prototypes` `rpp`

## Depends On
`rpp/modal/audio` module

## Evidence
Source: `docs/chats/20260225 - Chat GPT - Token boundaries explained.md`, response Section G.5

> "Simple ETL producing CLIP vectors for 100 imageable concepts and YAMNet vectors for 50 audio events; link to concept URIs; retrieval demo."

YAMNet (Google/TensorFlow) is a deep net producing 521-dim logits over AudioSet event classes.

## Description

Implement `rpp/modal/audio/etl.py` — ETL pipeline for audio event prototype generation.

The module must:
1. Select 50 high-value AudioSet/YAMNet audio event classes (e.g., "Dog bark", "Car engine", "Rain")
2. Map each audio event to a WordNet synset URI where applicable
3. Generate a text prototype (event label + description) and encode via YAMNet
4. Store 521-dim YAMNet vectors keyed by concept URI in `data/audio_prototypes.npz`
5. Include metadata: event label, YAMNet class index, concept URI
6. Provide a retrieval function: given audio snippet or text query, return top-k matching concept URIs

## Success Criteria
- 50 events selected with rationale documented
- YAMNet vectors saved to NPZ with nodes (event labels) and vecs arrays
- `retrieve(query_text_or_audio, topk=5)` returns ranked event concepts
- Audio event "Dog bark" maps to wn:dog.n.01 or equivalent concept
- Tests pass: `python -m pytest tests/unit/test_yamnet.py`

## Priority
P1

## Notes
YAMNet provides audio↔text cross-modal anchoring for RPP. 50 events is MVP scope; full AudioSet has 521 classes.
