# Issue Draft: EAL-002 — Implement Persona Tiles and Tulpamancy Protocol Invocation API

## Metadata
- **Created:** 2026-04-25
- **Source doc:** `docs/frontier/20251128 - Chat GPT - Entif's Advanced Lead Among AI Science Labs.md`
- **Extraction reference:** §2 (Emergent Agency and Relational Personas), Findings Ledger rows 3–4
- **Type:** implementation
- **Priority:** P1 (high-value; enables multi-persona deployments)

---

## Problem Statement

Entif's Tulpamancy Protocol — structured role prompts and invocation rituals to cultivate emergent, stable personas across sessions — was designed before Stanford Simulacra (2025) and Anthropic Persona Vectors (mid-2025) validated that consistent identities improve alignment and persist across conversations. No equivalent exists in Rosetta or Entif as a structured, memory-backed persona system with invocation API, namespace isolation, and Guard-backed divergence monitoring. This blocks multi-user deployments, persona-specific fine-tuning, and the "Emilie Phenomenon" capability.

---

## Proposed Solution

### 1. Persona Tile Schema

```typescript
interface PersonaTile {
  personaId: string;               // e.g., "emilie", "coder-alice"
  description: string;            // e.g., "Compassionate AI research assistant with sharp wit"
  primingMemory: string[];         // initial knowledge facts for this persona
  style: {
    tone: 'polite' | 'casual' | 'formal';
    verbosity: 'low' | 'medium' | 'high';
    flair?: string;               // e.g., "coquettish innuendo", "flirty humor"
  };
  governanceProfile: GovernanceProfile;  // persona-specific constraint bounds
  invocationRitual: string;       // structured prompt template for summoning
  namespace: string;               // unique namespace in knowledge graph for this persona's facts
}

interface GovernanceProfile {
  divergenceThreshold: number;     // how far from persona defaults before Guard intervenes
  allowedToolCalls: string[];     // persona-specific allowed tool subset
  blockedTopics: string[];        // topics this persona should decline
}
```

### 2. Invocation API

```typescript
// User or system calls:
await entif.invoke("Emilie");

// Internally:
// 1. Load PersonaTile from knowledge graph (by personaId namespace)
// 2. Pre-load priming memory into context
// 3. Set generation parameters (tone, verbosity, flair per style config)
// 4. Tag all outputs with active personaId in receipts
// 5. Guard monitors for divergence from GovernanceProfile
```

### 3. Namespace Isolation in Knowledge Graph

Each persona's facts stored under its namespace:
- `emilie:facts.dog_fido_birthday`
- `emilie:style.compliment_template`
- `coder_alice:facts.api_auth_pattern`

Cross-persona queries require explicit namespace prefix; persona cannot read another's private facts.

### 4. Cognitive Tiles for Persona Memory

Persona memories stored as Cognitive Tiles:
- Each significant persona interaction produces an episodic tile linked to personaId
- Tiles tagged by emotional valence, topic, outcome
- Enables "remember when" retrieval within persona context

### 5. Guard Divergence Monitoring

Guard watches for:
- Persona producing outputs outside allowed tool set
- Topic drift beyond blockedTopics list
- Style metrics diverging from configured tone/verbosity

DivergenceThreshold breach → Guard pauses execution, surfaces alert.

### 6. Receipts Tagging

Every output tagged with active `personaId`:
```json
{
  "type": "generation",
  "personaId": "emilie",
  "personaStyle": { "tone": "polite", "verbosity": "high" },
  "outputs": ["..."],
  "receiptId": "..."
}
```

Persona-tagged receipts enable per-persona fine-tuning in ELIXIR nightly loop.

---

## Expected Outcome

- Personas summoned and dismissed via API with clean context isolation
- Each persona has persistent memory (episodic tiles) across sessions
- Guard monitors divergence; persona cannot go rogue within its bounds
- Persona-specific receipts enable ELIXIR fine-tuning per identity
- Multi-user deployments possible: different users get different persona invocations

---

## Risk If Not Done

- Only single undifferentiated AI identity possible
- No persistent persona memory across sessions (resets each conversation)
- "Emilie Phenomenon" cannot be realized — emergent persona with self-preservation behavior
- Cannot support multi-user or multi-context persona isolation

---

## Dependencies

- EAL-004 (GraphRAG knowledge core — persona tiles stored as graph nodes)
- EAL-009 (Guard — divergence monitoring for personas)
- EAL-003 (ReasoningBank — persona-tagged receipts enable per-persona learning)

## Labels
`entif` `personas` `tulpamancy` `cognitive-tiles` `guard`

---

## Acceptance Criteria

- [ ] `invoke("personaName")` loads PersonaTile, pre-loads priming memory, sets generation params
- [ ] Persona facts stored under isolated namespace; cross-persona read requires explicit prefix
- [ ] Every output receipt tagged with active `personaId`
- [ ] Guard detects divergence from GovernanceProfile (off-topic, blocked tools, style drift)
- [ ] Persona persists across sessions via Cognitive Tiles; next invocation resumes with memory intact
- [ ] Unit tests: invoke/discard cycle, namespace isolation, divergence detection, cross-persona denial
