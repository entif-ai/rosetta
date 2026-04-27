# Box sync has max depth 5 but no circular reference protection

## Metadata

- **Draft created**: 2026-04-25
- **Source**: docs/external/Berman-PRD.md §CRM System — Box Integration
- **Extraction**: docs/intake/docs-intelligence/2026-04-25-berman-prd.md
- **Labels**: crm, box, sync

## Summary

Box sync's client (`crm/src/box/client.js`) performs tree traversal with a maximum depth of 5. However, there is no documented circular reference protection. If Box contains folder symlinks or junction points that create a cycle (e.g., `folder_a/folder_b/folder_a/folder_b/...`), the traversal could loop indefinitely or hit the depth limit repeatedly without proper cycle detection. The "max depth 5" constraint stops the descent but does not prevent re-visiting the same folder via a different path.

## Evidence

- `client.js / tree traversal (max depth 5)`
- No mention of circular reference handling, visited-set, or cycle detection

## Risk

- If Box contains a folder cycle, the sync could enter an infinite loop at depth ≤5 (revisiting the same folders at shallow depths)
- The depth limit alone does not prevent re-entering a previously-visited folder via a different path
- Could cause excessive API calls, filling the Box API rate limit, and failing the sync
- Could cause the sync process to hang indefinitely without error

## Recommended Action

1. Add a `visited_folder_ids` Set to the Box sync to detect cycles
2. Log and skip any folder that has already been visited in the current sync run
3. Add a cycle detection alert: if N skipped folders exceed a threshold, send Telegram alert and abort sync
4. Document the cycle handling strategy in the Box sync section of `docs/USE-CASES-WORKFLOWS.md`

## Priority

low