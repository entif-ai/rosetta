# ACP-004: Evaluate acpx for Cross-Vendor Agent Integration (kimi, qwen, kilocode, opencode)

## Summary

Evaluate `acpx` as the integration layer for non-US-market coding agents (kimi, qwen, kilocode, opencode) that currently lack Rosetta coverage.

## Context

Rosetta's agent integration currently covers the major US-market agents (OpenClaw, Codex, Claude, Copilot). The Chinese AI market has several competitive coding agents (kimi, qwen, kilocode, opencode) that are not currently integrated into Rosetta's delegation layer.

`acpx` has native built-in support for 15 agents, including:
- `kimi` — native (`kimi acp`)
- `qwen` — native (`qwen --acp`)
- `kilocode` — `npx -y @kilocode/cli acp`
- `opencode` — `npx -y opencode-ai acp`
- `kiro` — native (`kiro-cli acp`)

## Evidence

From `docs/external/acpx.md` — Built-in agents table:
| Agent | Command | Source |
|-------|---------|--------|
| `kimi` | native (`kimi acp`) | MoonshotAI/kimi-cli |
| `qwen` | native (`qwen --acp`) | QwenLM/qwen-code |
| `kilocode` | `npx -y @kilocode/cli acp` | kilocode.ai |
| `opencode` | `npx -y opencode-ai acp` | opencode.ai |
| `kiro` | native (`kiro-cli acp`) | kiro.dev |

## Analysis

**Market context:**
- Kimi (Moonshot AI) is a leading Chinese LLM with a coding agent CLI
- Qwen (Alibaba) has strong coding capabilities with `qwen-code`
- Kilocode is an emerging coding platform
- OpenCode is another Chinese coding agent option

**Integration opportunity:**
If Rosetta adopts acpx as its delegation mechanism (see ACP-001), these agents become immediately accessible via the same CLI surface. This could expand Rosetta's agentic capabilities into Chinese and non-US markets without per-agent integration work.

**Evaluation criteria for each agent:**
1. ACP compatibility and stability
2. Coding capability benchmark vs current Rosetta agents
3. Language model context window and quality
4. Availability in regions where Rosetta operates
5. Licensing and data privacy implications

## Recommendation

Evaluate kimi, qwen, kilocode, and opencode via acpx as a first pass. Run benchmark tasks comparing these agents against current Rosetta defaults. If quality is competitive and ACP stability is acceptable, add them to Rosetta's standard agent rotation.

This is particularly relevant given the Entif 2.0 Enriched doc's finding that "zero-copy kit swapping via MCP" enables multi-vendor agent strategies.

## Labels

docs-intelligence, multi-vendor, integration, china-market, non-us-agents

## Depends On

ACP-001 (adopting acpx as delegation mechanism)