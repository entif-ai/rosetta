# BIP-001-1 — CRM Learning System Feedback Loop Underspecified

**Use Case:** BIP-001 (Personal CRM Intelligence)
**Confidence:** HIGH
**Type:** spec-gap

## Description

When a contact is rejected by the user, the system should add the contact's domain to `skip_domains` in the learning config. However, the mechanism by which a rejection event is communicated from the user interface back to the learning config is not described. The feedback loop is implied but entirely underspecified.

## Specific Gaps

1. **Rejection event communication:** How does the UI inform the learning system that a contact was rejected? Is this a direct write to the learning JSON file? A database write read by an async job? A message bus event?
2. **Learning config storage:** The spec says "maintain a learning.json config" but does not specify the storage location relative to the broader SQLite-based architecture. Is `learning.json` a flat file, a SQLite table, or a key-value store? If SQLite, how does it interact with the WAL-mode SQLite database?
3. **Incremental vs. reversible learning:** The learning is described as append-only additions to `skip_domains`, `skip_keywords`, etc. Is there ever a mechanism to un-learn? If a domain is added to skip_domains but later proves to be a false positive, how is it removed?
4. **Concurrency:** If two concurrent ingestion runs both attempt to update the learning config simultaneously, is the write safe? No locking mechanism is described for learning config updates.

## Expected Behavior

A rejection by the user of an approved contact (or approval of a rejected contact) should be captured as a structured event and fed back into the learning system such that the next ingestion run applies the updated skip lists. The learning config should be treated as a database table or use file-level locking for concurrent safety.

## Source Reference

BIP-001, "Learning system" section: "Maintain a learning.json config with: skip_domains... When I reject a contact, learn from it — add their domain to skip_domains if appropriate."
