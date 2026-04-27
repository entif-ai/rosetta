# ESA-004: Villaticus physical allocation as proof-of-work gate

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** villaticus, physical-allocation  
**Depends On:** ESA-005  
**Evidence:** `docs/chats/20260226 - Chat GPT - Entif.AI Systems Architecture Synthesis.md`

## Summary

Villaticus is a counter-infrastructure design that changes the allocation game for scarce goods from "compute speed race" (where bots dominate) to "human throughput" (where labor arbitrage is the ceiling). Physical queue = proof-of-work gate forcing opportunism to pay in human-hours not packets.

## Core Design

- **Bottleneck:** service rate at counter (not microsecond optimization)
- **Attack surface inversion:** compute arbitrage → labor arbitrage
- **Ticket properties:** transferable (NOT non-transferable); no ID required at purchase; cap per person
- **Proof-of-work mechanism:** must show up in person, find parking, get in line, wait — each additional attempt costs actual time and actual people
- **Economic ceiling:** line-sitter market ~$25-27/hr (TaskRabbit); scales like staffing, not like packet floods

## Evidence

- Walmart CISO blocked 20M bot attempts in 30 minutes during PS5 drop
- Ticketmaster saw 3.5B system requests (4x prior peak) during Taylor Swift Eras presale
- In-person: 3.5B digital requests would require ~1.6 years of continuous operation at 10,000 windows × 10 hrs/day
- Physical allocation makes "billions of attempts" class of domination physically impossible

## Key Distinction

Virtual waiting rooms CANNOT replicate physical friction — always gameable via:
- Identity farming (many accounts)
- Residential proxies
- Human-assisted CAPTCHA solving
- Distributed retry strategies
- Session prewarming

Physical gating does not eliminate opportunism; it forces opportunism to pay in human-hours, not packets.

## Recommended Action

1. Design Villaticus allocation mechanism: pre-queue (doors open time) → FIFO → cap per person
2. Implement ticket transfer as face-value exchange (Glastonbury-style; Ticketmaster Face Value Exchange)
3. Do NOT implement non-transferable tickets (Crates explicitly against; anti-consumer)
4. Build Needs & Offers Ledger as standard interface for Villaticus exchanges
5. Integrate with SAFE coordination layer (ESA-005)

## Status

Open.
