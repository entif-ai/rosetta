# rosetta-canon

## Purpose

Provides deterministic normalization helpers for Rosetta artifacts.

## Working Today

- canonicalizes JSON by recursively sorting object keys before stringifying
- normalizes plain text by collapsing line endings and whitespace

## Fixture Status

- fully executable
- not fixture-backed

## Not Yet

- RFC 8785-grade canonical JSON
- media-aware normalization beyond plain text
- streaming normalization for large payloads

## Roadmap

- upgrade canonicalization rigor if cross-language interoperability requires it
- add normalization profiles for HTML, Markdown, and PDF-extracted text
