"""
dispatch.py — Stage 5: Fan-out codify dispatcher.

Dispatches the consolidated assimilation packet to N store handlers in parallel
via isolated sub-agents. Each store handler runs independently — one dying
does not cascade to others.

Orchestration:
  1. Load stores.json to get enabled stores
  2. For each store, fire a sub-agent via delegate_task
  3. All sub-agents run in parallel (bounded by max_concurrent_children)
  4. Collect results as they complete
  5. Emit a consolidated dispatch report
"""

import json
import sys
import uuid
from dataclasses import dataclass, field
from pathlib import Path

# Ensure lib/ and stages/04-classify-mine/ are importable from here
_SKILL_ROOT = Path(__file__).parent.parent.parent
sys.path.insert(0, str(_SKILL_ROOT))
sys.path.insert(0, str(_SKILL_ROOT / "stages" / "04-classify-mine"))

from lib.bus import Bus
from lib.ledger import Ledger
from lib.receipts import emit

try:
    from hermes_agent import delegate_task  # noqa: F401
except ImportError:
    delegate_task = None  # Test environments without hermes_agent

# Store handler registry — maps store IDs to their Python modules
HANDLER_REGISTRY: dict[str, str] = {
    "hindsight": "stages/05-codify/handlers/store_hindsight",
    "markdown":  "stages/05-codify/handlers/store_markdown",
    "qmd":       "stages/05-codify/handlers/store_qmd",
    "ob1":       "stages/05-codify/handlers/store_ob1",
    "honcho":    "stages/05-codify/handlers/store_honcho",
}

DEFAULT_TIMEOUT_SECONDS = 120


@dataclass
class StoreResult:
    store_id: str
    success: bool
    receipt_id: str | None = None
    error: str | None = None
    duration_ms: int | None = None


@dataclass
class DispatchReport:
    dispatch_id: str
    workflow_id: str
    packet_id: str
    stores_attempted: int
    stores_succeeded: int
    stores_failed: int
    results: list[StoreResult] = field(default_factory=list)
    duration_ms: int | None = None


def load_stores(stores_json_path: str | Path) -> list[dict]:
    """Load the stores configuration from stores.json."""
    path = Path(stores_json_path).expanduser()
    if not path.exists():
        return []
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    return data.get("stores", [])


def filter_enabled(stores: list[dict]) -> list[dict]:
    """Return only stores where enabled == True."""
    return [s for s in stores if s.get("enabled", False)]


def build_store_payload(
    store: dict,
    packet: dict,
    workflow_id: str,
    dispatch_id: str,
    ledger_dir: Path,
) -> dict:
    """
    Build the payload passed to a store sub-agent.

    The sub-agent will:
      1. Import the store handler module
      2. Call store(packet, config) with its config
      3. Write receipt to ledger_dir
      4. Return a StoreResult dict
    """
    return {
        "workflowId": workflow_id,
        "dispatchId": dispatch_id,
        "stage": "05-codify",
        "storeId": store["id"],
        "handlerModule": HANDLER_REGISTRY.get(store["id"], ""),
        "storeConfig": store.get("config", {}),
        "packet": packet,
        "packetId": packet.get("packetId", ""),
        "ledgerDir": str(ledger_dir),
        "timeoutSeconds": store.get("timeoutSeconds", DEFAULT_TIMEOUT_SECONDS),
    }


def dispatch(
    packet: dict,
    stores: list[dict],
    workflow_id: str,
    ledger_dir: Path,
    max_concurrent: int = 5,
) -> DispatchReport:
    """
    Fan out store writes to N sub-agents in parallel.

    Returns a DispatchReport with per-store success/failure and timing.
    """
    dispatch_id = f"disp_{uuid.uuid4().hex[:12]}"
    enabled = filter_enabled(stores)
    stores_attempted = len(enabled)

    results: list[StoreResult] = []

    if not enabled:
        return DispatchReport(
            dispatch_id=dispatch_id,
            workflow_id=workflow_id,
            packet_id=packet.get("packetId", ""),
            stores_attempted=0,
            stores_succeeded=0,
            stores_failed=0,
            results=[],
        )

    # Build payloads for each store
    payloads = [
        build_store_payload(store, packet, workflow_id, dispatch_id, ledger_dir)
        for store in enabled
    ]

    # Fan out via delegate_task — all stores fire simultaneously (up to limit)
    tasks = [
        {
            "goal": _sub_agent_task(payload),
            "context": (
                f"store_id={payload['storeId']}, "
                f"handler={payload['handlerModule']}, "
                f"packet_id={payload['packetId']}"
            ),
            "toolsets": ["terminal", "file"],
        }
        for payload in payloads
    ]

    import time
    start_ms = int(time.time() * 1000)

    # Fire all at once, bounded by max_concurrent
    outcomes = delegate_task(
        tasks=tasks,
        max_concurrent=max_concurrent,
    )

    duration_ms = int(time.time() * 1000) - start_ms

    # Parse outcomes into StoreResults
    for outcome in outcomes:
        sr = _parse_outcome(outcome)
        results.append(sr)

    stores_succeeded = sum(1 for r in results if r.success)
    stores_failed = stores_attempted - stores_succeeded

    return DispatchReport(
        dispatch_id=dispatch_id,
        workflow_id=workflow_id,
        packet_id=packet.get("packetId", ""),
        stores_attempted=stores_attempted,
        stores_succeeded=stores_succeeded,
        stores_failed=stores_failed,
        results=results,
        duration_ms=duration_ms,
    )


def _sub_agent_task(payload: dict) -> str:
    """
    The task instruction for a store sub-agent.
    This is the 'goal' passed to delegate_task.
    """
    return f"""
You are a Stage 5 store-writer sub-agent.

Task: Write an assimilation packet to the "{payload['storeId']}" store.

Steps:
1. Import the handler module: {payload['handlerModule']}
2. Load the packet from: {payload['packet']}
3. Load the store config from: {payload['storeConfig']}
4. Call the store handler: store_write(packet, config)
5. On success: write a receipt to {payload['ledgerDir']}/receipts/{payload['storeId']}_{payload['dispatchId']}.json
6. Print a JSON result to stdout:
   {{
     "storeId": "{payload['storeId']}",
     "success": true|false,
     "receiptId": "<receipt_id>",
     "error": null
   }}
7. On failure: print the JSON result with success=false and the error message.

Packet ID: {payload['packetId']}
Workflow ID: {payload['workflowId']}
Timeout: {payload['timeoutSeconds']}s
""".strip()


def _parse_outcome(outcome) -> StoreResult:
    """
    Parse a delegate_task outcome into a StoreResult.

    Outcomes from delegate_task vary by type — handle both dict-like and
    exception-like results.
    """
    try:
        if hasattr(outcome, "__dict__"):
            # Object result
            store_id = getattr(outcome, "store_id",
                             getattr(outcome, "storeId",
                                    getattr(outcome, "id", "unknown")))
            success = getattr(outcome, "success", False)
            receipt_id = getattr(outcome, "receipt_id",
                               getattr(outcome, "receiptId", None))
            error = getattr(outcome, "error", None)
            duration_ms = getattr(outcome, "duration_ms", None)
        elif isinstance(outcome, dict):
            store_id = outcome.get("storeId", outcome.get("store_id", "unknown"))
            success = outcome.get("success", False)
            receipt_id = outcome.get("receiptId", outcome.get("receipt_id", None))
            error = outcome.get("error", None)
            duration_ms = outcome.get("duration_ms", None)
        else:
            store_id = "unknown"
            success = False
            error = str(outcome)
            receipt_id = None
            duration_ms = None

        return StoreResult(
            store_id=store_id,
            success=bool(success),
            receipt_id=receipt_id,
            error=error,
            duration_ms=duration_ms,
        )
    except Exception as exc:
        return StoreResult(
            store_id=getattr(outcome, "storeId", "unknown"),
            success=False,
            error=str(exc),
        )


def format_report(report: DispatchReport) -> str:
    """Human-readable dispatch report."""
    status = "ALL OK" if report.stores_failed == 0 else f"FAILURES({report.stores_failed})"
    lines = [
        f"=== Dispatch {report.dispatch_id} ===",
        f"  Packet:    {report.packet_id}",
        f"  Workflow:  {report.workflow_id}",
        f"  Stores:    {report.stores_succeeded}/{report.stores_attempted} OK [{status}]",
        f"  Duration:  {report.duration_ms}ms",
        "",
    ]
    for r in report.results:
        icon = "✓" if r.success else "✗"
        err = f" | {r.error}" if r.error else ""
        lines.append(f"  {icon} {r.store_id}: {r.receipt_id or 'NO RECEIPT'}{err}")
    return "\n".join(lines)
