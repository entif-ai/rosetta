# RSK-001: Risk Scoring — Missing Provenance Signal Integration

## Metadata
- **Issue:** RSK-001
- **Priority:** P2
- **Confidence:** high
- **Source:** docs/intake/docs-intelligence/2026-06-05-email-driven-security-defenses.md

## Boundary
Artifact is issue-draft output for planning. Not final specification.

## Problem

The ensemble classifier design in the Email-driven Security Defenses conversation includes sender metadata features (sender, domain, thread history) but has no explicit integration path for external RBL/DNSBL reputation signals as provenance risk features — despite the user explicitly mentioning these as part of the anti-spam infrastructure layer.

The provenance risk axis currently covers: sender trust tier, SPF/DKIM/DMARC pass/fail, thread consistency. It does not cover:
- source IP/domain reputation
- ASN/hosting-provider reputation
- sender-domain age and registration anomalies
- HELO/EHLO anomalies
- reverse DNS consistency
- historical sender frequency / first-seen timing

## Impact

Without RBL/DNSBL signals, the provenance risk axis is incomplete. Compromised infrastructure and low-reputation senders can pass through the existing provenance checks (SPF/DKIM alignment, allowlist) without being flagged by the reputation layer.

## Suggested Approach

1. Add `provenance_risk` signal family to `risk.provenance` pack
2. Define feature set: RBL lookup results, DNSBL hit counts, ASN reputation score, domain age, HELO/EHLO sanity check, reverse DNS mismatch flag, sender first-seen delta
3. Integrate as metadata features in Tier 1 (lexical/statistical) and Tier 3 (graph/meta anomaly) classifiers
4. Add to scorecard output as `provenance_risk_score`

## Related
- F1, F3, F7
- risk.provenance pack design
- ingress.mail adapter