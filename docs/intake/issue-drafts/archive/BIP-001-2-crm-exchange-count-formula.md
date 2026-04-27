# BIP-001-2 — Exchange Count Estimation Misclassifies High-Volume Automated Senders

**Use Case:** BIP-001 (Personal CRM Intelligence)
**Confidence:** MEDIUM
**Type:** reliability

## Description

The formula `Math.min(Math.floor(totalMessages / 2), threadCount)` is used to estimate genuine back-and-forth exchanges as a proxy for relationship depth. This formula conflates message volume with conversation quality and will systematically misclassify high-volume automated senders (newsletters, product update emails, automated reports) as engaged contacts.

## Specific Problem

- A newsletter that sends 20 distinct emails across 20 threads (e.g., 20 article digests) yields `Math.min(Math.floor(40/2), 20) = 20` exchanges — scoring at or near the top of the contact range despite being zero-interaction broadcast content.
- A real colleague who sends 10 individual emails all in a single ongoing thread yields `Math.min(Math.floor(10/2), 1) = 1` exchange — scoring poorly despite genuine two-way interaction.
- The denominator (totalMessages) is not normalized by number of unique senders; a single contact who CC:BCCs the user on 100 automated emails inflates the count dramatically.

## Expected Behavior

Exchange estimation should distinguish between:
1. Unique threads (conversational context)
2. Unique messages per thread (volume)
3. Fraction of messages originating from the counterparty vs. the user

A better proxy: count only messages where the counterparty initiated a new thread or explicitly replied to an existing one, and normalize by unique thread count. At minimum, the spec should acknowledge this limitation and suggest a manual override or user feedback loop.

## Source Reference

BIP-001, "Contact extraction from email" section: "Estimate the number of exchanges (back-and-forth threads, not just raw message count): Math.min(Math.floor(totalMessages / 2), threadCount)."
