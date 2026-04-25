# Issue: mac-studio-control-two-tier-guard

## Metadata

- ID: 
- Title: Mac Studio M3 Ultra Control — Two-Tier Guard (Browser + Desktop)
- Type: implementation
- Severity: high
- Tags: mac-control, playwright, appleevents, accessibility, step-up-approval, guard-rails
- Created: 2026-04-24
- Source: docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md

## Summary

Mac Studio control requires a two-tier guard architecture: Tier A (lower risk) = Playwright for headless browser automation; Tier B (higher risk) = AppleEvents/Accessibility API for active desktop control, with step-up approval, session recording, kill switch, and app allowlist.

## The Requirement

Crates wants: "the ability to actively consume and LEARN from my past chat transcripts... and sources... and... control my Mac Studio M3 Ultra and drive both the browser (headlessly) and desktop (actively, including any program, within guardrails)"

This is two fundamentally different risk profiles:

### Tier A: Browser Automation (Lower Risk)
- Headless browser control
- Authenticated workflows, scraping, form fill, testing, research, dashboards
- Playwright adapter behind guard
- Must be: headless by default, replayable, receipt-logged, diff/screenshot evidenced, guard-scoped by site/domain/account
- Context-per-run isolation (no state leakage between runs)

### Tier B: Active Desktop Control (Higher Risk)
- Desktop apps, Finder/file actions, IDE interactions, GUI-only software, media/creative tools
- AppleEvents → Shortcuts → Accessibility ladder
- Requires: stronger approval path, explicit mode switch, session recording, action receipts, kill switch, app allowlist, step-up authorization for destructive operations

## The Guard Architecture

### Tier A: Browser Guard
```
User Request → Context Compiler → Guard Scope Check → Playwright Adapter → Receipt + Evidence
```

- Guard scoped by site/domain/account
- All actions logged with receipts
- Screenshots/diffs as evidence for each action
- No persistent browser state between runs (context-per-run isolation)
- Hard timeout per action
- Can be paused/killed mid-run

### Tier B: Desktop Guard
```
User Request → Context Compiler → Step-Up Authorization → Desktop Adapter → Session Recording → Receipt + Kill Switch
```

**Step-Up Authorization:**
- Not every desktop action requires the same approval
- Routine/lower-risk actions might get automatic approval after first human authorization
- Destructive actions (delete, format, network change) require explicit step-up
- Step-up can be: re-authentication, biometric, explicit "yes I mean it" confirmation

**Session Recording:**
- Every desktop action is recorded
- Recording is stored as evidence artifact
- Human can review after the fact
- Enables debugging and accountability

**Kill Switch:**
- At any point, human can trigger emergency stop
- All pending actions are cancelled
- Adapter is put into safe state
- No further actions until human releases

**App Allowlist:**
- Only approved applications can be controlled
- New apps require explicit allowlist addition
- Prevent accidental control of unknown apps

## Implementation Ladder

```
Intended Action
     ↓
Check Allowlist
     ↓
Determine Risk Level (routine vs. destructive)
     ↓
Routine → automatic or first-authorization cached
Destructive → step-up required
     ↓
Execute via appropriate adapter
     ↓
Session record (desktop) or screenshot evidence (browser)
     ↓
Emit receipt with action summary + evidence reference
```

## Resolution Required

1. Build Playwright adapter for browser automation (Tier A)
2. Build AppleEvents/Shortcuts/Accessibility adapter for desktop control (Tier B)
3. Implement two-tier guard: browser (lower risk) vs. desktop (higher risk)
4. Implement step-up authorization for destructive desktop operations
5. Implement session recording for desktop actions
6. Implement kill switch (emergency stop)
7. Implement app allowlist for desktop control
8. All actions emit structured receipts with evidence references

## Related Issues

- sovereign-kernel-vs-harness-proof-architecture
- write-admission-gate-nine-step-state-machine
- receipt-ledger-every-durable-operation