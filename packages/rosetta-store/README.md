# rosetta-store

## Purpose

Provides a simple in-memory tile store with rights checks.

## Working Today

- stores tiles by CID
- guards reads by rights scopes
- resolves multiple tiles by CID

## Fixture Status

- executable
- in-memory only

## Not Yet

- persistence
- indexing beyond direct CID lookup
- audit logging

## Roadmap

- replace or sit in front of durable storage once the canonical corpus cache grows past bootstrap scope
