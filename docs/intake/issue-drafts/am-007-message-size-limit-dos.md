# AM-007: Message Size Limit — DoS Prevention at Ingress

## Status

draft — `docs/intake/issue-drafts/am-007-message-size-limit-dos.md`

## Metadata

- **Type:** security
- **Priority:** P1
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 6.2, Section 3
- **Confidence:** high

## Problem

Section 6.2 lists "unexpected size" as a quarantine trigger but provides no definition of what constitutes an "unexpected" size — no minimum, maximum, or threshold. Section 3 mentions "rate limiting and basic DDoS throttling" but not message-level size limits.

Without a defined maximum message size:
- An attacker (internal or external) can send arbitrarily large messages to fill disk, memory, or network buffers
- Large message processing can cause timeouts in downstream systems
- The "unexpected size" quarantine trigger cannot be automated (no threshold to compare against)
- No basis for rate limit calibration

## Evidence

> "Quarantine Rules: Messages are quarantined if any of... unexpected size" — Section 6.2 (no size threshold)

> "Rate limiting and basic DDoS throttling" — Section 3 (no size limit mentioned)

## Required Deliverables

1. Define `max_message_size` — recommended: 1 MB for typical messages, 10 MB for artifact references (with explicit content type gating)
2. Validation at Stage 1 (Authenticate & Validate): reject messages exceeding `max_message_size` before processing
3. Quarantine count instrumentation for size violations (Section 10 `quarantine_counts`)
4. Alerting threshold: if >10% of messages in a window are size-rejected, trigger alert
5. Chunking strategy for legitimate large payloads (e.g., chunk ARTIFACT_PUBLISH over multiple messages with a `fragment_index` field)
6. Documentation: operators must know the size limit when designing integrations

## Acceptance Criteria

- [ ] `max_message_size` defined and documented
- [ ] Stage 1 rejects oversized messages before any processing
- [ ] Oversized messages count toward `quarantine_counts` telemetry
- [ ] Legitimate large payloads (artifact references) can still be transmitted via chunking
- [ ] DoS via message size amplification is not possible

## Dependencies

- AM-001 (size field must be in the JSON schema for validation)

## Labels

`agentic-messaging`, `security`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` Section 3, 6.2, 10
- Related: AM-001 (schema validation)
