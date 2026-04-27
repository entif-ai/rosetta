# AM-006: Data/Control Plane Type Enforcement — Anti-Spoofing

## Status

draft — `docs/intake/issue-drafts/am-006-data-control-plane-spoofing.md`

## Metadata

- **Type:** security
- **Priority:** P1
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 4, Section 7.1, Section 7.2
- **Confidence:** high

## Problem

The data/control plane separation is the foundational security property of the Agentic Messaging protocol. Data plane messages cannot trigger privileged actions (Section 7.1); only control plane messages (ACTION_REQUEST, APPROVAL_REQUEST) can. However, the plane classification is carried as a `msg_type` enum field in the envelope — a value set by the sender and not cryptographically bound to the message content.

A compromised worker (threat model: "any worker node can be compromised" — Section 2.2) could:
1. Craft a message with privileged intent (e.g., requesting a tool that requires Guard authorization)
2. Label it as a data plane type (e.g., `TASK_RECEIPT`)
3. Transmit it as a "data plane" message
4. Bypass the Guard's `iam.decision` requirement

The mailroom validates schema, domain, replay, and signature — but it does not independently verify that the claimed plane is consistent with the message's actual capabilities. The separation is by naming convention, not cryptographic enforcement.

## Evidence

> "Data plane: TASK_RECEIPT, INCIDENT_ENVELOPE, WORK_UNIT_UPDATE, ARTIFACT_PUBLISH, HEALTH_REPORT (cannot trigger actions)" — Section 4

> "Control Plane: ACTION_REQUEST...APPROVAL_REQUEST... (requests action; requires Guard decision)" — Section 4

> "msg_type (enum)" — Section 5.1 (sender-set field, not cryptographically bound)

> Threat model: "Any worker node can be compromised" — Section 2.2

## Attack Scenario

```
1. Compromised worker crafts: { msg_type: "TASK_RECEIPT", payload: { task: "delete_all_receipts", privileged: true } }
2. Worker signs envelope with valid key — passes signature check
3. Mailroom sees TASK_RECEIPT → routes as data plane → does NOT check iam.decision
4. Executor receives "data plane" message — plane separation says no privileged actions
5. But the payload contains an instruction that should require Guard
6. Executor either: (a) processes it as data (ignores intent) — safe but wrong, or (b) misinterprets as actionable — security breach
```

## Required Deliverables

1. Threat model update: document data/control plane spoofing as a known attack vector
2. Option A (Guard-level enforcement): Guard inspects message content regardless of declared type — Guard must evaluate the *intent* of the payload, not just trust the `msg_type` label
3. Option B (cryptographic binding): include a message capability hash in the envelope that encodes what the payload can do; Guard issues decisions scoped to specific capability sets
4. Option C (content policy at executor): executor checks payload content for privileged operations regardless of plane — defense in depth
5. Failure mode analysis: document what happens if a spoofed message reaches the executor under each option
6. Test harness: simulate compromised worker sending spoofed messages; verify they are blocked

## Acceptance Criteria

- [ ] Attack scenario documented and understood
- [ ] One or more countermeasures implemented (Guard-level, cryptographic, or executor-level)
- [ ] Compromised worker cannot bypass Guard by re-labeling a privileged action as data plane
- [ ] Section 7.1 invariant ("data plane cannot trigger privileged side effects") is enforceable
- [ ] Test harness confirms spoofing is blocked

## Dependencies

- AM-005 (Guard Decision API — Guard-level enforcement requires Guard API)
- Threat model update

## Labels

`agentic-messaging`, `security`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` Section 2.2, 4, 5.1, 7.1, 7.2
- Related: AM-005 (Guard API), threat model
