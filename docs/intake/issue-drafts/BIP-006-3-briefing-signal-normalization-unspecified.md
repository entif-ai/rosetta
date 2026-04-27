# BIP-006-3 — Signal Normalization Layer Is Underspecified

**Use Case:** BIP-006 (Nightly Business Briefing)
**Confidence:** HIGH
**Type:** spec-gap

## Description

The spec normalizes signals from heterogeneous sources into a standard schema `{source, signal_name, value, confidence, direction, category}` but provides no specification for how to perform that normalization. Each data source (YouTube, CRM, project backlog, email, calendar) has a completely different data shape. Building the normalization layer is the majority of the engineering work and is left entirely unspecified.

## Specific Problems

1. **No normalization transform per source:** The spec names example sources but does not describe how to extract or map fields from any of them. For example, YouTube's API returns nested JSON with `items[].statistics.viewCount`; the spec requires `{signal_name, value, confidence, direction}`. The mapping function is unspecified.
2. **Confidence scoring is subjective:** "Confidence 0–100" is required for each signal, but no methodology for computing it is given. Is it based on sample size? Historical accuracy? Data freshness?
3. **Direction assignment is manual:** "up/down/flat" for each signal requires comparing current to historical values, but no comparison window is defined. "Flat" could mean within 1% or within 20%.
4. **Source catalog is incomplete:** The spec lists example sources but does not enumerate all possible sources or how new sources are added to the system.

## Expected Behavior

Provide a normalization specification per source type:
- For each named source, define the extraction query, the field mapping to the signal schema, and the confidence/direction computation logic
- Define a confidence scoring methodology (e.g., based on sample_size / expected_sample_size, capped at 100)
- Define the comparison window for direction (e.g., compare to 7-day average for flat/up/down)

## Source Reference

BIP-006, "Signal collection" section: "pull data from whatever systems you use. Normalize each signal into: {source, signal_name, value, confidence (0-100), direction (up/down/flat), category}"
