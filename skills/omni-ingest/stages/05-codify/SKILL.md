# Stage 5: Codify — Fan-Out to N Stores

## Responsibility

Read `stores.json`, fire one leaf sub-agent per enabled store. Each sub-agent writes independently. No cross-store dependency. Failures are scoped to individual stores.

## Store Registry

See `stores.json` at the skill root. Hot-swap by editing that file — no code changes required.

## Dispatcher

`dispatch.py` — fans out to all enabled stores in parallel using `delegate_task`. Each store sub-agent:
1. Imports its handler module
2. Calls `store(packet, config)`
3. Writes a receipt to `ledger/<workflow_id>.jsonl`

## Store Handlers

| Handler | Status |
|---|---|
| `handlers/store_markdown.py` | implemented |
| `handlers/store_qmd.py` | implemented |
| `handlers/store_hindsight.py` | implemented |
| `handlers/store_ob1.py` | implemented |
| `handlers/store_honcho.py` | implemented |

## Output

Each store writes independently. Dispatch report emitted with per-store success/failure and timing.
