# Issue Draft

## Title
OpenAI function-call codec: bundle→function-call JSON adapter and reverse

## Type
issue-candidate

## Labels
`codec` `openai` `function-calls` `rpp`

## Depends On
`rpp/codec/openai` module

## Evidence
Source: `docs/chats/20260225 - Chat GPT - Token boundaries explained.md`, response Section 7.10

Reference code:

```python
def bundle_to_funcall(bundle: dict) -> dict:
    return {
      "name": "commit_concept_decision",
      "arguments": {
        "concept": bundle["core"]["concept"],
        "explain": bundle.get("explain",""),
        "halo": bundle["halo"]
      }
    }

def funcall_to_bundle(fc: dict, original_input: dict) -> dict:
    return {
      "package":"ros://bundle",
      "core":{"concept": fc["arguments"]["concept"]},
      "halo": fc["arguments"].get("halo", []),
      "input": original_input,
      "trace":{"codec":"minimal-0.1"}
    }
```

## Description

Implement `rpp/codec/openai/minimal.py` — the OpenAI function-call codec adapter.

Must:
1. `bundle_to_funcall(bundle)` → transforms a validated RPP bundle into OpenAI function-call JSON format
2. `funcall_to_bundle(function_call_json, original_input)` → reverse transformation
3. Handle the full bundle schema including halo, scores, explain, and trace
4. Map RPP concept URIs to OpenAI function parameter types
5. Support streaming mode: yield partial bundles as decoding proceeds
6. Include round-trip tests: bundle → funcall → bundle should be lossless for core fields

## Success Criteria
- bundle_to_funcall produces valid OpenAI function-call JSON
- funcall_to_bundle reconstructs bundle with identical core concept
- Halo and trace preserved through round-trip (lossless)
- OpenAI API integration test passes (mock or live)
- Tests pass: `python -m pytest tests/unit/test_openai_codec.py`

## Priority
P1

## Notes
One of two host codecs required for the skateboard demo cross-model agreement check.
