# Gateway launchd auto-restart — no backoff throttle if crash loop occurs

## Metadata

- **Draft created**: 2026-04-25
- **Source**: docs/external/Berman-PRD.md §OpenClaw Platform Configuration — Gateway
- **Extraction**: docs/intake/docs-intelligence/2026-04-25-berman-prd.md
- **Labels**: openclaw, platform-config, operations

## Summary

OpenClaw gateway is configured with launchd `RunAtLoad + KeepAlive` for auto-restart. If the gateway enters a crash-restart loop (e.g., due to a bug, bad config, or resource exhaustion), launchd will continuously restart it without any backoff throttle. This could cause:
- Rapid consumption of system resources (CPU, memory, file descriptors)
- Log file growth at high speed
- Interference with other services on the machine
- Making debugging harder by overwriting crash state before it can be inspected

## Evidence

- `Launchd: RunAtLoad + KeepAlive (auto-restart)`
- No backoff, throttle, or crash-count limit documented

## Risk

- A crashing gateway could render the machine unresponsive
- Crash logs could grow to fill disk space rapidly
- No human notification if the crash loop begins (Telegram notifications require the gateway to be running to send)
- If the crash is due to a resource leak, each restart consumes more resources until the machine is exhausted

## Recommended Action

1. Add a launchd `ThrottleInterval` setting to introduce backoff between restart attempts (e.g., 30-second minimum between restarts)
2. Add a `WatchPaths` or `QueueDirectories` mechanism to only restart when the binary or config changes, not on every crash
3. Add a crash count check: if the gateway restarts more than N times in M minutes, stop restarting and send an urgent alert
4. Document the crash-loop protection strategy in `docs/SECURITY-BEST-PRACTICES.md`

## Priority

low