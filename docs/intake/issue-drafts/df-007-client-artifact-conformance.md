# DF-007: Embedded client artifact return not covered by conformance tests

## Meta

- Drafted: 2026-04-25
- Source: docs/external/DeerFlow Architecture.md
- Extraction: 2026-04-25-deerflow-architecture.md

## Summary

Gateway conformance tests (TestGatewayConformance) only cover dict-returning methods. Methods returning non-dict types (e.g., get_artifact returns tuple of bytes) are not tested for schema alignment with Gateway responses. This creates a drift risk where Gateway could change artifact handling and embedded client would silently break.

## Evidence

From Embedded Client section:
> "Gateway Conformance Tests (`TestGatewayConformance`): Validate that every dict-returning client method conforms to the corresponding Gateway Pydantic response model"
> "Covers: `ModelsListResponse`, `ModelResponse`, `SkillsListResponse`, `SkillResponse`, `SkillInstallResponse`, `McpConfigResponse`, `UploadResponse`, `MemoryConfigResponse`, `MemoryStatusResponse`"

get_artifact returns `(bytes, mime_type)` not a dict — not covered.

## Implications

- If Gateway changes how it serializes artifacts (e.g., different mime type, different compression), embedded client would not catch this in CI
- The embedded client's artifact handling could diverge from Gateway's over time
- No schema validation for the non-dict return path

## Specific Gap

```python
# Gateway returns HTTP Response with bytes + content-type header
# Embedded client returns (bytes, mime_type) tuple
# These are not validated against each other
```

## Recommendations

1. Add conformance test for get_artifact that validates (bytes, mime_type) against what Gateway would return for the same request
2. Add a test that runs both Gateway and embedded client against the same artifact and compares outputs
3. Add mime type validation to ensure embedded client recognizes all mime types that Gateway produces
4. Consider making artifact return a typed response object instead of a raw tuple, aligned with Gateway's Response model
5. Add this test to the CI pipeline for every PR

## Labels

testing, client, conformance, embedded-client, artifact, drift

## Status

issue-candidate