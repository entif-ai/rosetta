# Issue Draft: Document acpx Session Metadata Schema for Interop

**Source:** `docs/external/acpx.md`  
**Extraction date:** 2026-04-25  
**Draft file:** `docs/intake/issue-drafts/acpx-session-metadata-schema.md`

---

## Issue Summary

acpx stores session history metadata under `~/.acpx/sessions/` as lightweight per-turn previews containing `role`, `timestamp`, and `textPreview` fields. However, no formal schema specification exists for this metadata. Tools or workflows that attempt to consume or replay session history lack a stable contract, creating interop risk.

---

## Evidence

From the Session behavior section of `docs/external/acpx.md`:

> "Each successful prompt appends lightweight turn history previews (role, timestamp, textPreview) to session metadata."

The README describes the behavior but does not:
- Define field types or lengths
- Specify serialization format (JSON? MessagePack? something else?)
- Define what happens to metadata on soft-close vs. hard-delete
- Specify whether `textPreview` is truncated or full-content

---

## Recommendation

Before Rosetta builds any session-replay or audit tooling that consumes acpx session history, a formal schema should be documented or reverse-engineered from the actual stored files. Alternatively, Rosetta should define its own session metadata contract and migrate acpx session data into it.

---

## Priority

medium

---

## Labels

- enhancement
- documentation
- session-management

---

## Dependencies

None identified from this source.