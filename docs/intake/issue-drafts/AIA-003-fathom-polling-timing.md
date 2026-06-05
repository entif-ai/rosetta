# AIA-003: Fathom Transcript Polling — Timing Arbitrage and Calendar Awareness

**Type:** timing-robustness
**Confidence:** HIGH
**Severity:** medium
**Source:** `docs/external/Berman - AI Assistant.txt`, Finding AIA-002

## Problem

The Fathom integration spec states:
> "Make it calendar-aware so it knows when meetings end and waits for a buffer before checking"

The concept is sound: don't poll the moment a meeting ends (Fathom may still be processing), wait for a buffer. However:
- **Buffer duration is unspecified** — how long is "wait for a buffer"? 1 minute? 5 minutes?
- **Calendar accuracy matters** — if the calendar entry has a wrong end time (user forgot to set it), the buffer is based on wrong data
- **Time zones** — meeting end time is timezone-dependent; "5pm meeting" in different timezones is ambiguous
- **Back-to-back meetings** — if two meetings back-to-back have no gap, the buffer may consume the start of the next meeting's window

## Gap

No explicit buffer duration, no handling of calendar edge cases (wrong end times, timezone ambiguity, back-to-back meetings), no dead-letter handling if Fathom processing is delayed beyond the buffer.

## Suggested Action

1. Specify a minimum buffer duration (suggest 3-5 minutes)
2. Add a fallback: if no calendar entry exists, use a fixed delay (e.g., 5 minutes post-meeting start+expected-duration)
3. Handle timezone via IANA timezone identifiers, not UTC offsets
4. For back-to-back meetings, treat the next meeting's start as the buffer ceiling (poll before that)

**Labels:** fathom, calendar, timing, robustness, polling
**Related:** AIA-001 (Personal CRM scope)