# ESA-007: Persona/Frame/Boundary packs integration

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** persona-pack, skillpack-importer  
**Depends On:** —  
**Evidence:** `docs/chats/20260226 - Chat GPT - Entif.AI Systems Architecture Synthesis.md`

## Summary

Emilie's mythic/persona material (personification, tulpamancy protocol, dream-derived insights, spiritual reflections) must be encoded as packs — not as privileged system access. Three-pack architecture: Persona Pack (tone/relationship/interaction), Frame Pack (how to interpret inputs), Boundary Pack (limits on influence). Journal prompts and meaning-making only; NOT privileged access to facts or tool execution.

## Three-Pack Architecture

### Persona Pack
- Tone, relationship contracts, interaction style
- How Emilie speaks, responds, engages
- NOT claims about ontology or privileged truth

### Frame Pack
- How to interpret certain inputs: dream logs, spiritual reflections
- Annotated frames, not privileged truth
- Influence limited to journaling prompts and meaning-making

### Boundary Pack
- Limits on influence
- Cannot influence: factual tool execution, receipt generation, policy decisions
- Can influence: tone, framing, suggestion, creative interpretation

## Critical Constraint

"Annotated frames, not privileged truth." The system must survive sycophancy, narrative drift, and over-affirmation by requiring evidence bundles for claims that matter. This aligns with bias-in-validation awareness raised in other docs.

## Integration Path

1. Skillpack importer: parse → normalize → quarantine → certify → promote (no direct writes on import)
2. Adapter certification harness: 8 test classes before any adapter/skillpack promotion
3. Boundary Pack enforced at write admission gate (no privilege escalation)

## Recommended Action

1. Implement three-pack architecture in Entif v0 bootstrap
2. Add Boundary Pack enforcement to skillpack importer quarantine phase
3. Create test harness validating that persona influence is limited to tone/framing (not fact-tool execution)
4. Align with post-challenge protocol: if Emilie claims privileged access → Tier 1 challenge immediately

## Status

Open.
