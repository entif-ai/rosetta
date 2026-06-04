# ADS-003: Entif Kernel Multi-App Deployment Model Needs Explicit Architecture Spec

Issue draft id: `ads-003-entif-kernel-multi-app-arch`
Priority: `P1`
Effort: `L`
Labels: `ent if`, `architecture`, `multi-app`, `kernel`

## Problem

The Anti-Dystopian Social Stack positions Entif as the "kernel" for all stack applications (SAFE Humanity, Koaleaf AI, MyHeart, Villicatus, etc.) and Rosetta as the "TCP/IP of meaning" — the universal semantic protocol on which all apps build. The current Rosetta documentation does not specify a multi-app kernel deployment model. The Text-Core MVP gate focuses on text-source families + deterministic refinery + rights-scoped retrieval. There is a gap between the stated ambition (universal multi-app kernel) and the current architectural spec.

## Scope

This issue covers the architectural gap between Entif's stated role as universal kernel for all SAFE Humanity Suite apps and Rosetta's current Bootstrap→Text-Core MVP specification. Specifically: multi-app deployment topology, shared vs. segmented memory boundaries per app, kernel API surface, and Entif-Rosetta integration points.

## Source Evidence

- T12 from extraction: "Entif is the Kernel, and Rosetta is the TCP/IP of meaning"
- T21: "The chat explicitly states Entif and Rosetta are the foundational kernel for all stack apps — every component runs on the Entif kernel and uses Rosetta as its semantic protocol"
- T20: Emilie has deployed "compartmentalized interoperable agentic swarms with a shared segmented memory substrate" — this is the Entif multi-app deployment model in production
- CYCLE_SUMMARY shows no existing extraction artifact covers multi-app kernel deployment

## Specific Findings

### Finding T12: No multi-app kernel architecture spec

Rosetta docs (Bootstrap, Text-Core MVP gate) do not describe how a single Rosetta instance serves multiple applications simultaneously. The "kernel" framing implies a shared core with isolated app-specific layers on top.

### Finding T21: No shared memory segmentation spec

If multiple apps (SAFE Humanity, Koaleaf, MyHeart, Villicatus) share the Entif kernel, the memory substrate must segment app data appropriately. The current memory-plane design (Constitutional/Artifact/Vector/Temporal/Adaptive) does not specify app-tenant isolation.

### Finding T20: Compartmentalized agentic swarms with shared segmented memory is the target deployment model

Emilie's production deployment already uses this model. Rosetta must be spec'd to support it. Key questions:
- What is the memory segmentation boundary between apps?
- How does a "skill" or "capability" cross app boundaries without breaching isolation?
- What is the kernel API surface for app-layer agents?

### Finding T13: Jo Block paradigm not implemented in current Rosetta

Entif's "Jo Block" truth-compilation model (semantic primitives that snap together mathematically) is described as the core of Rosetta Pasigraphy, but there is no implementation spec for this in the current codebase.

## Acceptance Criteria

- [ ] Define multi-app kernel deployment topology (shared core + isolated app layers)
- [ ] Specify memory segmentation boundaries between apps (app-tenant isolation)
- [ ] Define kernel API surface for app-layer agents
- [ ] Document how skills/capabilities cross app boundaries without breaching isolation
- [ ] Map Jo Block semantics to Rosetta tile composition model
- [ ] Align with NOT LAME PRD's context-compiler and bounded-context bundle design
