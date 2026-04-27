# Issue Draft: Evaluate Moltron's Claims vs. Reality

**Source:** `docs/external/Moltron.md`
**Extracted:** 2026-04-25
**Status:** Draft

---

## Summary

Moltron makes strong claims about ease of use ("zero config", "works out of the box") and cross-platform compatibility (Cursor, Claude Code, OpenAI Codex) that should be verified before treating as reliable planning inputs.

---

## Evidence

**"Zero config" claim vs. actual install steps:**

> "The best thing of all, it requires ZERO WORK AND CONFIG and works out of the box."

**Actual multi-step install:**
1. `curl -sSL https://raw.githubusercontent.com/adridder/moltron/main/install.sh | bash`
2. `cp -r moltron-skill-creator ~/.openclaw/workspace/skills/`
3. Restart OpenClaw
4. Send `@moltron init` in chat

This is at minimum 4 steps with a required chat message trigger. "Zero config" is not accurate.

**Cross-platform unverified:**

> "it also works with: Cursor / Claude Code / OpenAI Codex / …"

No evidence of testing, version requirements, or configuration for any platform other than OpenClaw is provided.

---

## Questions to Resolve

- [ ] What is the actual minimal install path?
- [ ] Is the `@moltron init` chat trigger absolutely required, or is there a silent init path?
- [ ] Has anyone tested this on Cursor, Claude Code, or Codex? What versions?
- [ ] Does Moltron work on the current version of OpenClaw as of 2026-04-25?
- [ ] What happens if the GitHub repo goes private or is deleted?

---

## Impact on Rosetta

If Moltron's core claims are inflated, adopting its patterns could lead to similar over-promising in Rosetta's own skill system documentation. Should establish诚实 baseline before deriving architectural principles from it.

---

## Labels

- `docs-intelligence`
- `moltron`
- `verification`
- `investment`