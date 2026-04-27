# rosetta-cid

## Purpose

Provides content hashing and CID helper functions for Rosetta tiles.

## Working Today

- computes SHA-256 digests
- emits the current bootstrap CID string format
- compares content IDs for equality

## Fixture Status

- fully executable
- not fixture-backed

## Not Yet

- multibase and full IPLD-compatible CID encoding
- richer digest algorithm support

## Roadmap

- tighten CID format if Rosetta standardization demands stricter multiformats alignment
