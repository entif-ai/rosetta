# Issue Draft

## Title
Bundle validator and explainer: implement jsonschema validation and per-criterion explanation for meaning bundles

## Type
issue-candidate

## Labels
`bundle` `validation` `jsonschema` `explainability` `rpp`

## Depends On
`rpp/bundle` module

## Evidence
Source: `docs/chats/20260225 - Chat GPT - Token boundaries explained.md`, response Section 7.9

Reference code:

```python
import json, jsonschema

BUNDLE_SCHEMA = {
  "type":"object",
  "required":["package","core","halo","trace"],
  "properties":{
    "package":{"const":"ros://bundle"},
    "core":{"type":"object","required":["concept"],"properties":{"concept":{"type":"string"}}},
    "halo":{"type":"array"},
    "trace":{"type":"object"}
  }
}

def validate_bundle(bundle):
    jsonschema.validate(bundle, BUNDLE_SCHEMA)
    return True
```

## Description

Implement `rpp/bundle/validate.py` and `rpp/bundle/explain.py` — the bundle validation and explanation layer.

validate.py must:
1. Validate incoming bundles against the full RPP bundle schema (not just stub)
2. Reject bundles missing required fields: package (const=ros://bundle), core.concept, halo, trace
3. Verify halo entries each have a scores object with proto_cos, ppr_prior, role_fit, gloss_overlap, antonym_gap, entropy_penalty
4. Provide descriptive validation errors

explain.py must:
1. Take a validated bundle and return a human-readable narrative
2. Return a machine-readable table of per-criterion scores
3. Show why the core concept won (top score vs second-best gap)
4. Include the full criterion vector for replay

## Success Criteria
- validate_bundle() returns True for valid bundles, raises ValidationError otherwise
- explain() produces both narrative (string) and table (dict) outputs
- explain() computes and reports the margin between top-2 halo scores
- Tests pass: `python -m pytest tests/unit/test_bundle.py`

## Priority
P0

## Notes
Bundle auditability is a core RPP invariant — every disambiguation decision must be explainable.
