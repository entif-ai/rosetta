# YAAC-002: Claw variant security comparison matrix

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** claw-variants, security, comparison  
**Depends On:** —  
**Evidence:** `docs/chats/20260226 - Chat GPT - YT, Agents, Auth and Cache.md`

## Summary

Produce a decision-grade security comparison of Claw variants and Agent SDKs for Entif's evaluation, targeting Mac Studio local deployment with eventual enterprise hardening requirements.

## Comparison Matrix Axes

| Axis | OpenClaw | ZeroClaw | Nanobot | IronClaw | PicoClaw | Agent Zero |
| --- | --- | --- | --- | --- | --- | --- |
| Security boundary model | Allow/deny tools + sandbox | Minimal + optional Docker | Python ecosystem risk | WASM sandbox + boundary secrets | Smaller surface, but early | Docker isolation |
| Supply chain risk | HIGH (real infostealer campaigns, malicious skills) | Low (minimal deps) | Medium (Python plugins) | Low (WASM capability) | Medium (early, not production-ready) | Medium (Docker but broad OS access) |
| Secrets handling | OS keychain (best practice) | Minimal (needs hardening) | Python env vars | Encrypted local data | Minimal | Docker-mounted secrets |
| Tool execution model | Typed first-class tools + deny-by-default | Shell-based | Python execution | WASM sandboxed | Go execution | OS as tool + terminal |
| Maturity / adoption | Very high (160k+ devs, OpenAI backing) | High (16k stars) | High (22k stars) | Low (2.6k stars) | Very low (early, not for prod) | Medium (15k stars) |
| Production readiness | High (with hardening) | High | High | High (security-first) | Low (pre-v1.0) | Medium |

## Security Reality Check (from doc)

- Infostealers already stealing OpenClaw config files and tokens
- Malicious skills in marketplace; VirusTotal scanning efforts underway
- Some companies already banning OpenClaw internally
- Prompt-injection attacks on adjacent agent tooling ecosystems
- Skills ecosystem = npm circa 2016 (assume compromise until proven otherwise)

## Selection Guidance for Entif

- **Kernel/worker layer:** ZeroClaw or Nanobot
- **Security philosophy:** IronClaw concepts (WASM/capability sandboxing, secrets at host boundary)
- **Edge nodes:** PicoClaw once mature past "early dev, not for prod"
- **General power tool (optional):** Agent Zero inside tight sandbox with constrained mounts + egress

## Evaluation Test Harness

1. Install 2-3 variants locally on Mac Studio
2. Run "transcript ingest" workload: YouTube URL list → transcript → normalized docs → local Postgres
3. Red-team: place prompt-injection bait in transcript; verify tool policy blocks it
4. Verify secrets not readable by tool code; verify egress allowlisted only

## Status

Open.
