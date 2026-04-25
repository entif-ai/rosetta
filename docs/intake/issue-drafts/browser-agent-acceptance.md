# Issue Draft: Implement browser agent for acceptance verification

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
Implement the Browser Agent (Critic): verifies acceptance checks on living UI; emits evidence (screenshots, HAR, verdicts); never writes code. This closes the evaluation loop for Ada's orchestration.

## Details
Browser Agent responsibilities:
- Given acceptance criteria (structured as a spec artifact), navigate to the target UI
- Verify acceptance checks (e.g., "page loads", "200 health check", "timestamp visible")
- Emit evidence: full-page screenshot, HAR (HTTP Archive), pass/fail verdict
- Never write code — verification only

Role fenced: Browser Agent never writes to codebase. Only Ada can move artifacts across boundaries.

Position in evaluation loop:
1. Cheap summarize → plan cache
2. Attempt → code generated
3. Browser verify → evidence emitted
4. One low-cost self-fix (if verdict is fail)
5. Escalate with rationale (if still failing)

The evaluation loop requires browser agent to exist before it can close.

Browser stack: Chromium-based via Playwright (requires browser installation on target host).

## Acceptance Checks
- [ ] Browser agent accepts a spec artifact with acceptance criteria
- [ ] Browser agent navigates to target URL
- [ ] Acceptance checks execute: pass/fail per criterion
- [ ] Evidence emitted: screenshot (PNG), HAR log, verdict
- [ ] No code writes from browser agent
- [ ] Pass/fail verdict logged to receipt
- [ ] If fail: Cheap-Judge self-fix triggered before escalate
- [ ] Playwright browser installed and functional on target host
