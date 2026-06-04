# ADS-002: Villicatus Decommodification Claim Requires Economic Modeling

Issue draft id: `ads-002-villicatus-economic-model`
Priority: `P2`
Effort: `L`
Labels: `anti-dystopia`, `economics`, `research-spike`, `governance`

## Problem

Villicatus (the destination village of the Anti-Dystopian Social Stack) is described as a post-scarcity community where "access replaces excess" and "land, energy, and tools" are decommodified. These are economic claims that require a specific provisioning model. The doc states these as outcomes without providing any economic mechanism.

## Scope

This issue covers the economic architecture gap for Villicatus's decommodification claims. Specifically: how land, energy, and tools are provisioned without monetary exchange; what replaces price signals for resource allocation; and how the system handles scarcity events.

## Source Evidence

- T23 from extraction: "decommodifying land, energy, and tools" stated as Villicatus property without economic model
- T10: "access replaces excess" — access mechanism undefined
- T5: SAFE Humanity provides "the missing engine" for Villicatus, but SAFE Humanity is itself a sharing inventory system, not an economic provisioning system

## Specific Findings

### Finding T23: Land decommodification mechanism absent

How is land acquired, allocated, and governed in Villicatus? The doc references "access" and "post-scarcity" but provides no land provisioning model. Key questions:
- How is land title handled?
- What prevents external market forces from re-commodifying land?
- How are disputes over land use resolved without price signals?

### Finding T23: Energy decommodification mechanism absent

"Energy" as a resource class is named but not modeled. Key questions:
- Is this solar/battery/grid? Self-sufficient?
- How is energy allocated among 150 members?
- What happens during scarcity (winter, outage, surge)?

### Finding T23: Tool sharing economics undefined

SAFE Humanity's "tool library" is described as the logistics backbone, but:
- Who provides the initial tool inventory?
- How are consumables (fuel, batteries, food) handled?
- What is the relationship between SAFE Humanity and Villicatus governance for resource allocation?

## Acceptance Criteria

- [ ] Define the economic model for Villicatus resource provisioning (land, energy, tools)
- [ ] Identify which resources can be decommodified vs. which require alternative allocation mechanisms
- [ ] Design the relationship between SAFE Humanity inventory ledger and Villicatus resource governance
- [ ] Document the economic failure modes and reset mechanisms
- [ ] Map to Entif's memory-sovereignty-map as potential economic allocation substrate
