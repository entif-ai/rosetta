# rosetta-receipts

## Purpose

Implements Rosetta Receipt Pack mechanics for receipt creation, signing, bundling, and verification.

## Working Today

- creates receipts as Rosetta tiles
- derives digests from tile canonical bodies
- generates Ed25519 keypairs
- signs receipt CIDs
- verifies signed receipts cryptographically
- builds receipt bundles and verifies bundle closure against a tile store

## Fixture Status

- executable
- used by fixture-backed refinery/demo flows, but the signing and verification mechanics themselves are real

## Not Yet

- deep semantic verification of evidence claims
- revocation, key rotation, and trust-chain management
- external policy resolution

## Roadmap

- harden receipt verification beyond structural closure
- connect policy artifacts and evidence semantics more deeply
