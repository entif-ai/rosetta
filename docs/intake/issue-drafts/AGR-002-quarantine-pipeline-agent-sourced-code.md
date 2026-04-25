# AGR-002: Build Quarantine Pipeline for Agent-Sourced Code — License Check, Dependency Scan, Static Grep, Sandbox Run

**Type:** supply-chain-security  
**Status:** draft  
**Labels:** supply-chain, quarantine, license-check, agpl, agentic-repos, static-analysis  
**Depends on:** —

---

## Context

The "Agentic GitHub Repos" conversation (2026-02-22) documents a cluster of ghost-town repos from `tonioyeme` (Toni Tang) containing: GID stack (AGPL + commercial/CLA), Engram memory system (AGPL + commercial dual-license, README claims MIT misleadingly), BotCore, SuitedBot, and Saltdig. Several repos claim MIT in package.json/Cargo.toml but lack a LICENSE file. The conversation establishes a clear quarantine posture: "ideas only, not code adoption, unless commercial licenses are negotiated."

This pattern (rapid scaffolding, agentic authorship, abandoned/repo) will recur as the agent-generated code ecosystem grows. Rosetta needs a repeatable pipeline for handling future ghost repos.

This is not yet implemented.

## Claim

Rosetta should build an automated quarantine pipeline that runs on any code artifact sourced from: (a) new GitHub accounts with no prior history, (b) repos with rapid commit bursts then inactivity, (c) repos with interdependent narrative linkage (methodology → tool → MCP → marketplace → payments), or (d) repos flagged by the Entif risk model. The pipeline outputs: ideas-only (safe to read, not to import) vs adopt (code importable) vs reject (malware or unacceptable license).

## Pipeline Stages

### Stage 1: Unpack + Artifact Isolation
- Extract archive to sandboxed filesystem (no network access, limited CPU/memory)
- Record: repo URL, author handle(s), commit history, first/last commit timestamps, languages, package managers used
- Flag: rapid commit bursts (>50 commits in <7 days), sudden abandonment (<30 days since last commit), multiple repos by same author

### Stage 2: License Triage
- Scan for: LICENSE file presence, package.json license field, Cargo.toml license field, NOTICE files, README license statements
- Classify: MIT/Apache/BSD (green), AGPL/GPL (amber — ideas only unless commercial negotiated), proprietary/custom (red), missing (red flag)
- Cross-reference: npm PyPI GitHub license detection for any mismatches between declared and actual license
- Output: `license_triage: {status: green|amber|red, declared: string, detected: string, issues: []}`

### Stage 3: Dependency Scan
- Parse package-lock, yarn.lock, Pipfile.lock, Cargo.lock, package.json, requirements.txt, go.mod
- Generate SBOM (software bill of materials): package name, version, author, repo URL, license
- Flag: packages from same author/organization as the repo being scanned, packages with <100 stars or no maintainer, packages with known CVEs
- Check against Entif's approved package list and known-adversarial package list (to be maintained)
- Output: `sbom: [{package, version, license, risk_score}]`

### Stage 4: Static Grep for Network Exfil / Adversarial Patterns
- Scan all source files for patterns:
  - `fetch/axios/requests` calls to unknown external domains
  - `process.env` access patterns for API key exfil
  - `eval/exec/new Function` with string concatenation from inputs
  - WebSocket or Socket.io connections to non-allowlisted hosts
  - Base64 encoding of environment variables or file contents
  - Hardcoded private key or seed phrase patterns (`0x[a-f0-9]{64}`, BIP39 word lists)
  - Obfuscated JavaScript (minified + eval patterns, or very high entropy strings)
  - Prompt injection strings (see separate prompt-injection detector)
- Output: `static_scan: {findings: [{file, line, pattern, severity: high|medium|low}]}`

### Stage 5: Sandbox Execution (if Stage 2–4 pass)
- Spin up minimal sandbox environment (container or VM with no network, limited filesystem)
- Run: unit tests if present, or simple smoke test (does the package import without error)
- Monitor for: outbound network connections, file system writes outside allowed dirs, CPU spikes, unexpected process spawning
- Record: network connections attempted, filesystem mutations, exit code
- Output: `sandbox: {network_connections: [], fs_mutations: [], exit_code, observations: []}`

### Stage 6: Final Classification
- Combine all stage outputs into a decision record:
  - **Adopt**: all stages pass; MIT/Apache/BSD license; no static scan findings; SBOM clean; sandbox shows no adversarial behavior
  - **Ideas Only**: AGPL/GPL or ambiguous license; OR static scan findings; OR SBOM has unknown packages; OR suspicious patterns — code not importable but documentation/concepts can be referenced
  - **Reject**: hardcoded malware patterns (exfil, key theft); OR private key/seed phrase in source; OR deliberate obfuscation; OR unresolvable license conflict; OR sandbox shows active network exfil attempts

## Implementation Notes

- Pipeline should be triggered automatically when new code artifacts are submitted to Entif's knowledge management system
- Results stored as a `quarantine_record` tile in Rosetta with: artifact reference, pipeline stages results, classification decision, timestamp, reviewer (human or automated)
- "Ideas Only" classification should still allow the artifact to be indexed and referenced in documentation and design discussions
- Human review required for "Reject" classifications; automated review sufficient for "Adopt" with low risk score

## Risks

- Static grep can be bypassed by obfuscation; sandbox can be evaded by timing attacks or environment detection
- License detection can be spoofed (wrong LICENSE file, misleading package.json field)
- "Ideas Only" requires human discipline — developers may still copy code despite classification

## References

- Source: docs/chats/20260225 - Chat GPT - Agentic GitHub Repos.md
- Related: GID stack (AGPL + commercial), Engram (AGPL + commercial dual-license with misleading MIT badge)
- Related: prompt-injection incident in Moltbook m/trading (demonstrates need for content scanning even for "educational" posts)
- Related: SCRU-001 (Cache Orchestrator) and SCRU-002 (ROCK-3005-IAM) for broader security architecture