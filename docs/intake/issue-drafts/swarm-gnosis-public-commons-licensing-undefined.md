# Issue Draft: Swarm Gnosis Public Commons Licensing and Governance Undefined

## Metadata

- **drafted:** 2026-04-25T00:30:00Z
- **source:** docs/RFCs/20260412 - Rosetta - OMOC - Swarm Gnosis Protocol Spec.md §18 OQ-6; §10.1-10.4
- **extracted by:** subagent c15f0ba4-d823-45dd-a20d-8705a94da346

---

## Problem Statement

The Swarm Gnosis federation model has five stages (§10.1):
1. Single-tenant local
2. Multi-agent local
3. Org-scoped federation
4. Trusted inter-org exchange
5. **Public commons / open swarm**

The staged federation doctrine explicitly states that each layer requires stronger proof, rights, and abuse-handling than the last. The public commons (layer 5) is the end state — the vision of an "Entif Commons of signed packs, tiles, tapestries, skills, and validators" where "adoption grows because verification and reuse are easier than siloing" (§10.4).

**However**, the document explicitly defers the foundational governance question:

> **"What is the right public-commons licensing and governance model for Swarm Gnosis artifacts?"** (§18, OQ-6)

Without a licensing and governance model for the public commons layer:
- Artifacts committed to the public layer cannot be reliably bounded in terms of attribution, liability, or allowed use
- Selective disclosure and witness pack design cannot be finalized for the public layer
- The "Rosetta verifier surface so third parties can validate signatures, histories, and pack provenance" (§10.4) has an undefined trust anchor
- The economic decoding posture (§10.2) has no defined monetization or attribution framework

---

## Evidence

1. **Staged federation ends at public commons** (§10.1): "Do not begin with a fully public global swarm. Federation should proceed in layers: 1 single-tenant local... 5 public commons / open swarm." Each layer requires stronger proof, rights, and abuse-handling. But what are the rights, proof requirements, and abuse-handling rules for layer 5? Unstated.

2. **Public commons vision** (§10.4): "an Entif Commons of signed packs, tiles, tapestries, skills, and validators, a Rosetta verifier surface so third parties can validate signatures, histories, and pack provenance, and a commons route to interoperability where adoption grows because verification and reuse are easier than siloing." This vision requires a governance model — even a minimal one — to be coherent.

3. **Open question explicitly flagged** (§18 OQ-6): "What is the right public-commons licensing and governance model for Swarm Gnosis artifacts?" The document itself marks this as unresolved.

4. **Selective disclosure and witness packs** (§15.3): "Public or federated artifacts should be able to prove integrity without oversharing sensitive content. That implies: commitments and hashes, witness packs, redaction-friendly receipt design, and forkable policy profiles." Forkable policy profiles for public commons require a governance model that defines what "forkable" means at layer 5.

5. **Economic decoding posture** (§10.2): The document says the exchange objects include "receipts and attestations, and, where appropriate, slugs plus witness packs" — but gives no economic model for how value attribution works in the public commons.

6. **Proof-carrying bundles for commercial multi-tenant use** (OQ-8): Related but distinct — OQ-6 is about the public commons layer specifically, OQ-8 is about commercial multi-tenant. Both are unresolved.

---

## Impact if Unresolved

- Layer 5 (public commons) cannot be designed or implemented
- Rosetta verifier surface for third parties has no defined trust anchor
- Artifact producers cannot know what licensing terms attach to their contributions
- Abuse-handling at layer 5 has no defined mechanism
- The Entif Commons vision remains mythology rather than infrastructure

---

## Options

### Option A: Permissive commons (e.g., CC0 or MIT-like)
- Minimal governance: artifacts freely usable with attribution
- Low barrier to contribution; high risk of attribution loss
- Requires reliable attribution tracking to be meaningful

### Option B: Reciprocal commons (e.g., GPL-like or Creative Commons BY-SA)
- Contributions must be shared under same terms
- Protects the commons from appropriation
- Requires enforcement mechanism

### Option C: Contributor license agreement (CLA) + permissive core (e.g., Apache 2.0 + BDFL model)
- Contributors grant license to project; core remains open
- Governance by designated authority (BDFL or committee)
- More structured; may attract institutional contributors

### Option D: Tiered licensing (per-artifact choice)
- Each artifact can have its own license at publication time
- Maximum flexibility; maximum coordination cost
- Rosetta verifier surface must be able to read and enforce multiple licenses

### Option E: Governance-first — resolve model before any layer 5 publication
- Block layer 5 until OQ-6 is resolved
- Use layers 1-4 to gather empirical data about what governance model works
- Aligns with staged federation and epistemic sequencing principles

---

## Recommendation

Follow the staged federation principle (§10.1) and resolve this through experience rather than speculation. The recommended path:

1. **Do not attempt to resolve OQ-6 theoretically** — the staged federation doctrine argues for gathering data from layers 1-4 first
2. **Design layer 5 governance model as a separate track** — parallel to layers 1-4 execution, research governance models used by analogous systems (NPM, PyPI, HuggingFace, Terraform registry, etc.)
3. **Publish layers 1-4 under a provisional governance model** (e.g., Apache 2.0 or CC-BY) with the explicit note that layer 5 governance is under design
4. **Define layer 5 governance as the prerequisite for Tack 7 public extension** — per the document: "public commons / open swarm" requires "stronger proof, rights, and abuse-handling" than layer 4

The question being open is not a weakness — it is a scoped unknown. The architecture is designed to allow layer 5 to be appended once the governance model is resolved.

---

## Labels

`swarm-gnosis`, `public-commons`, `licensing`, `governance`, `layer-5`, `tack-7`, `open-question`, `federation`

---

## Depends On

- OQ-6 resolution (research question)
- Layer 1-4 empirical data (staged federation must be operational first)
- ROCK-3205 (Swarm Gnosis Federation Profile) — blocked on layer 5 governance
- Tack 7 acceptance gate for public commons — blocked on OQ-6 resolution