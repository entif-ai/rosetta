# Model AiiDA-WorkGraph infrastructure dependencies before borrowing execution patterns

Issue draft id: `aiida-workgraph-infrastructure-dependencies`
Priority: `P2`
Effort: `S`
Labels: `infrastructure`, `dependencies`, `rabbitmq`, `postgresql`, `workflow`

## Problem

AiiDA-WorkGraph depends on the broader AiiDA stack. The extraction flags PostgreSQL plus RabbitMQ as relevant infrastructure, while Rosetta's current Text-Core planning names PostgreSQL and pgvector but does not establish a message broker requirement.

## Scope

Decide whether any Rosetta workflow or adapter-certification design that borrows from AiiDA also needs to model a broker-backed execution queue.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-25-aiida-workgraph.md` - Issue Candidates row: "AiiDA dependency chain (PostgreSQL + RabbitMQ) must be explicitly modeled in Rosetta infrastructure requirements."
- `docs/external/AiiDA-WorkGraph.md` - Installation and dependency notes.

## Acceptance Criteria

- [ ] Document whether RabbitMQ or an equivalent broker is in scope for Rosetta workflow execution.
- [ ] If out of scope, note which WorkGraph execution patterns are reference-only.
- [ ] If in scope, create a follow-up implementation issue with package and deployment boundaries.
