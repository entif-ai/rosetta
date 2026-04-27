# BIP-010-1 — CRM Cross-Reference Lookup Strategy Not Specified

**Use Case:** BIP-010 (Task Management from Meetings + Chat)
**Confidence:** HIGH
**Type:** spec-gap

## Description

When extracting action items from meeting transcripts, the spec says to "match mentioned people against CRM contacts to enrich with company/role context." The CRM lookup strategy is not specified. Without a defined lookup method, implementations will use ad hoc string matching with unreliable results.

## Specific Problems

1. **No lookup method specified:** Should matching use exact email match? Fuzzy name match? Semantic embedding similarity?
2. **Name ambiguity:** "John" in a transcript could match dozens of CRM contacts. No disambiguation strategy (using company, meeting context, or other signals) is described.
3. **Fuzzy matching without threshold:** If fuzzy matching is used, what similarity threshold triggers a match? 80%? 90%? No threshold is given.
4. **Fallback behavior:** If no CRM match is found, should the enrichment step be skipped silently? Should the user be prompted? No guidance is provided.
5. **CRM availability assumption:** The spec assumes BIP-001's CRM is available and populated, but does not handle the case where the CRM is empty or the integration is not built yet.

## Expected Behavior

Specify:
1. Lookup method: exact email match as primary, with fuzzy name+company as fallback
2. Fuzzy match threshold: minimum token-level similarity (e.g., Levenshtein ratio ≥ 0.85) with company context required
3. Disambiguation: use meeting attendee list to narrow candidate set before fuzzy matching
4. No-match behavior: skip enrichment silently, log the unmatched name for future CRM population

## Source Reference

BIP-010, "CRM cross-reference: Match mentioned people against CRM contacts to enrich with company/role context."
