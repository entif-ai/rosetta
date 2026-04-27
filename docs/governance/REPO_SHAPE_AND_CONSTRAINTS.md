# Repo Shape And Constraints

## Shape

- `apps/`
  - `rosetta-cli`: bootstrap demo and local verification entrypoint
  - `rosetta-api`: lightweight inspection API for health, registry, and demo output
  - `rosetta-operator`: future shell surface only
- `packages/`
  - Rosetta kernel: `rosetta-canon`, `rosetta-cid`, `rosetta-core`, `rosetta-schemas`, `rosetta-receipts`, `rosetta-tapestry`, `rosetta-store`, `rosetta-guard`
  - Source intelligence: `source-substrate`, `source-registry`
  - Intake and projections: `ingress-refinery`, `canonical-cache`, `projection-adapters`
- `packs/`
  - `rrp`
  - `stdpack-source-substrate`
  - `vocabpack-source-taxonomy`
- `docs/`
  - governance, backlog, and pack indexes

## Constraints

- Use Nx CLI and official Nx plugins for workspace structure and sync behavior.
- Do not import the donor tarball into this repository.
- Preserve parse-only ingress until the canonical cache is the active source of truth.
- Treat source system, record, manifestation, package, acquisition, identity, rights, lifecycle, and evaluation as separate modeled layers.
- Keep all OB1, Prism, and Mission Control integrations read-only until constitutional contracts harden further.
