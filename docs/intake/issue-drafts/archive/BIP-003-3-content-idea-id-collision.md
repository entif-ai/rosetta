# BIP-003-3 — Idea ID Sequential Counter Has Collision Risk

**Use Case:** BIP-003 (Content Idea Pipeline)
**Confidence:** MEDIUM
**Type:** correctness

## Description

The idea ID format is `YYYY-MM-DD-NNN` where NNN is a sequential counter within a day (001, 002, ... 999). When multiple ideas are created on the same day by concurrent processes or agents, the NNN counter may collide, causing a primary key violation if `slug` is not unique either, or silently creating a malformed ID.

## Specific Problem

1. **No atomic ID generation:** If two processes query the current max-NNN simultaneously, both compute the same next number, and both attempt to insert with the same ID, one will fail.
2. **NNN resets daily:** If the counter is reset to 001 each day, midnight-boundary ideas could collide if the system clock shifts slightly across ingestion runs.
3. **999 ceiling:** The max NNN value is 999. A high-volume content operation could exceed 999 ideas in a day (especially with multiple contributors or automated idea generation), causing an overflow.

## Expected Behavior

Use a database-level auto-increment or sequence for NNN (not application-level read-then-write). If using a composite key of `(date, sequence)`, the database should enforce uniqueness. If using a distributed ID scheme, use UUID v4 or a similar collision-free identifier. If sequential IDs are required for human readability, use a database `SERIAL` or `AUTOINCREMENT` column.

## Source Reference

BIP-003, "Idea database schema" section: "id (format: YYYY-MM-DD-NNN)"
