# Issue Draft: Crypto Non-Endorsement — Reputational Risk Assessment

**Source:** `docs/external/Moltron.md`
**Extracted:** 2026-04-25
**Status:** Draft

---

## Summary

A post-facto crypto disclaimer was added on 3/4/2026: "We don't financially participate or endorse any crypto activity related to this project." This signals prior or ongoing crypto/fan-coin activity in the community that could carry reputational risk for adopters, including Rosetta.

---

## Evidence

> "Update 3/4/2026: We don't financially participate or endorse any crypto activity related to this project. If you participate in fan coins, do so at your own risk. The code is legit, and free."

---

## What This Suggests

1. A fan coin or crypto token was launched associated with the Moltron project
2. The project maintainers want legal/financial distance from that activity
3. The "code is legit, and free" qualifier suggests they are concerned about the token being perceived as tied to a scam or worthless asset
4. "Fan coins" suggests speculative meme-token associated with the project or community, not an official token sale

---

## Risk Assessment

| Risk | Likelihood | Impact | Notes |
|---|---|---|---|
| Reputational contamination if Rosetta is seen as endorsing Moltron and Moltron has crypto drama | medium | medium | Rosetta should maintain clear distance from any crypto association |
| Legal exposure if Moltron's crypto activity is deemed a security | low | high | "Fan coins" may or may not be securities; maintain arms-length posture |
| Skill contamination if community-evolved skills include crypto/pump-and-dump logic | medium | medium | Swarm-replicated skills could carry malicious or problematic behaviors |

---

## Questions to Resolve

- [ ] What exactly is the "fan coin" associated with Moltron? Name, chain, contract address?
- [ ] Is there any official token or is it purely community-launched with no affiliation?
- [ ] Has any security audit been done on Moltron's skill compilation or telemetry layers?
- [ ] Do the community Discord channels discuss or promote the fan coin?

---

## Recommendation

Do not integrate Moltron into Rosetta's core infrastructure until:
1. The crypto situation is fully understood and documented
2. A security review of Moltron's skill compilation pipeline is performed
3. The project's long-term maintenance and governance is assessed (no governance docs visible in this document)

If Moltron's technical patterns are valuable, consider reverse-engineering only the architectural concepts (evolution loop, telemetry layer, skill hardening) without adopting the install base or community.

---

## Labels

- `docs-intelligence`
- `moltron`
- `legal`
- `crypto`
- `reputational-risk`