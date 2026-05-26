# Issue Draft: EDG-006 — Emergency Halt Mechanism as Sovereign-Kernel Requirement

## Metadata

| Field | Value |
|---|---|
| Issue ID | EDG-006 |
| Type | requirement |
| Status | draft |
| Source doc | docs/governance/Entif 2.0 - Decentralization and Governance.md |
| Extraction date | 2026-05-26 |
| Confidence | medium |

## Problem

The Entif 2.0 governance doc (Section 3) describes a human-triggerable system-wide halt mechanism that all agents are obligated to obey regardless of other goals. This is not currently defined as a requirement in the sovereign-kernel spec (NOT LAME) or Doctrine v0.2.

## Evidence

Section 3: "Emergency Override mechanism that allows authorized humans (using their Genesis keys or other high-trust credentials) to broadcast a system-wide halt or override command that all Entif agents are obligated to obey."

Implementation note: "implemented at low level (kernel extension) to prevent agent from bypassing — even if Majordomo's higher functions are compromised, as long as the guard process or a small kernel module is running, it will intercept or force the halt"

## Requirements Identified

1. **Emergency halt signal**: cryptographically signed message that all agents recognize and obey
2. **Signature authority**: signed by appropriate authority (Genesis keys or equivalent — currently Doctrine v0.2)
3. **Obligation to obey**: hard-coded into agent runtime — cannot be overridden by agent goals or directives
4. **Low-level enforcement**: not implemented in agent code itself (agent code could be compromised); requires guard process or kernel-level interception
5. **Graceful halt**: save state, stop further operations, await further instructions
6. **Multiple delivery channels**: on-chain message, local network broadcast, etc. to ensure signal reaches even if one channel is compromised

## Relationship to Current Stack

- Doctrine v0.2 Section 7 (Parse-only default and Guard law) is the closest existing equivalent — parse-only until guard token
- Sovereign-kernel kill-switch is not currently specced
- This is the **one near-term actionable requirement** from the Entif 2.0 governance doc

## Recommended Action

1. Add emergency halt/kill-switch requirement to sovereign-kernel spec (NOT LAME)
2. Define: trigger mechanism, signature authority, agent obligation semantics, enforcement layer (guard process minimum)
3. Do NOT require full Genesis Protocol infrastructure (HSM multisig) for the near-term kill-switch — a simpler signed halt mechanism can be defined now, with the multisig path as future upgrade

## Labels

sovereign-kernel, kill-switch, emergency-override, guard-layer, requirement, security

## Depends On

NOT LAME sovereign-kernel spec (for adding kill-switch requirement)

## Related Issues

- EDG-007 (HSM multisig infrastructure — aspirational long-horizon, not near-term)
- EDG-003 (Guard Layer alignment — kill-switch is a Guard Layer / sovereign-kernel feature)
- Doctrine v0.2 Section 7 (closest current equivalent)