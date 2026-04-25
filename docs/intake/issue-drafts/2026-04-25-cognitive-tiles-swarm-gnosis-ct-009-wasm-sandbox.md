# Issue Draft: CT-009 — WASM Sandbox for Witness Code Execution Not Yet Implemented in Rosetta

**Source extraction:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Issue candidate title:** CT-009: WASM sandbox for witness code execution not yet implemented in Rosetta

**Type:** implementation

**Labels:** wasm, sandbox, security, witness

**Depends on:** — (implementation gap; security-critical if witness code is ever allowed in Rosetta)

---

## Summary

The Swarm Gnosis framework uses WASM (WebAssembly) sandboxing to safely execute untrusted witness code (scripts that verify or recompute results embedded in tiles). The RFC states: "we employ WebAssembly sandboxing to run untrusted code with no access to the host environment unless explicitly granted." This is not currently part of the Rosetta codebase — no WASM runtime, no sandbox enforcement, no witness code execution infrastructure exists.

---

## Evidence

**From "Trust, Provenance, and Verification" — Secure Execution (Sandboxing of Witnesses):**
> "As discussed, executing witness code is done in sandbox. This not only protects the local node from hostile code, but also from overuse of resources. We can impose CPU and memory limits on the sandbox (e.g. using WASM timeouts or Linux cgroups if running containers). If a witness (e.g. a user-provided script to recompute a result) tries to run too long or use too much RAM, it can be aborted – protecting the host. This ensures that even if an attacker injects a tile with a deliberately inefficient or looping witness, it won't grind nodes to a halt. Sandboxing also means the witness code can't exfiltrate data or interfere with the node outside its intended scope."

**From Stack Overflow citation:**
> "WebAssembly's design means code can't do I/O or harm unless the host explicitly permits it, making it suitable for proof-carrying code execution in our use case."

---

## Discussion

Witness code execution is a security-critical feature. Without sandboxing:
- Untrusted code can access the filesystem, network, environment variables
- Malicious witness code can exfiltrate data or attack the host
- Infinite loops or memory-intensive code can cause denial of service

WASM sandbox is the proposed solution. Requirements:
1. **WASM runtime**: WASM interpreter or JIT (e.g., Wasmtime, Wasmer, or browser-native)
2. **Sandbox enforcement**: No access to host resources unless explicitly exposed via host function imports
3. **Resource limits**: CPU time limits, memory limits, execution step limits
4. **Host API**: Controlled API exposed to witness code (output results, verification boolean flag)
5. **Timeout handling**: Abort execution after configurable time threshold

Rosetta's current state:
- No WASM runtime in the codebase
- No witness code execution (skillpack importer runs code but in native environment)
- No sandbox isolation for imported code

If Rosetta ever allows external code to be executed as part of artifact verification, WASM sandboxing must be implemented. This is relevant to:
- Skillpack importer (runs external code during parse/normalize/quarantine/certify/promote)
- Adapter certification harness (runs test adapters which may contain arbitrary code)
- Any future "witness" feature that embeds verification code in artifacts

---

## Action Items

- [ ] Do not merge any feature involving untrusted code execution without WASM sandbox
- [ ] Design WASM sandbox architecture: runtime selection (Wasmtime preferred), resource limits, host API surface
- [ ] Implement sandbox prototype as a separate package: `rosetta-wasm-sandbox`
- [ ] Add to adapter certification harness (8 test classes) — currently no sandbox testing
- [ ] Define what resources witness code is permitted to access (none by default; explicit grant only)
- [ ] Document: no untrusted code execution outside WASM sandbox is permitted in Rosetta

---

## Related

- CT-006: ZK proofs as an alternative (or complement) to sandboxed execution — ZK verifies without running code, but has higher prover cost
- Adapter certification harness (NOT LAME): 8 test classes before adapter promotion
- Skillpack importer: runs code during import; needs sandbox or equivalent isolation