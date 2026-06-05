# AIA-001: Personal CRM — Scope Claim vs. Multi-Tenant Reality

**Type:** spec-gap / verification-needed
**Confidence:** HIGH
**Severity:** medium
**Source:** `docs/external/Berman - AI Assistant.txt`, Finding AIA-001

## Problem

Berman's Personal CRM prompt specifies:
> "Store them in a SQLite database with vector embeddings so I can query in natural language"

And Berman-PRD.md specifies:
> "Gmail API (OAuth, read emails) → Personal inbox only, no shared/multi-tenant mailboxes"

The PRD explicitly scopes to "Personal inbox only." However, the CRM design implies broad email scanning to "discover contacts from the past year" across potentially all emails. If a user operates in a multi-tenant email environment (e.g., Google Workspace with shared mailboxes, delegation, or team inboxes), the "personal inbox only" claim conflates auth-scope (what credentials are used) with data-scope (what mailboxes the credentials can access).

## Gap

No verification that the "personal inbox only" constraint is enforced as an auth boundary rather than just a design aspiration. In multi-tenant setups, OAuth tokens may legitimately access shared mailboxes if the user has access — the prompt doesn't specify whether this is architecturally blocked.

## Question for Emilie

When you built the Berman CRM, was there an explicit auth-scope enforcement that limits Gmail API calls to the authenticating user's primary mailbox only (not shared/delegate mailboxes)?

## Suggested Action

1. Verify Gmail OAuth scope is `gmail.readonly` + `email` (not `gmail.modify` or full mailbox access)
2. Add a runtime check that rejects any email where `to/cc` addresses include non-personal addresses (address not matching authenticated user)
3. Document the scope boundary in the OpenClaw workspace SOUL.md if this is a known constraint

**Labels:** gmail, oauth, multi-tenant, scope-enforcement
**Related:** Berman-PRD.md (already extracted)