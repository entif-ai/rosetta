# SBA-002: Electron SecretStorage plaintext credential vulnerability on Linux — compensating controls

## Status

draft — `docs/intake/issue-drafts/sba-002-electron-secretstorage-plaintext-linux.md`

## Metadata

- **Type:** security
- **Priority:** P1
- **Source doc:** `docs/backlog/Entif v0 Second Brain Architecture Plan.md`
- **Section:** Phase 2 (Integrating the Model Context Protocol (MCP) Stack)
- **Confidence:** high

## Problem

The document acknowledges a critical vulnerability: Electron-based applications (including Obsidian) using the Linux SecretStorage API store credentials in **plaintext within LevelDB local storage directories**. This means:

- The LUKS-encrypted disk protects data at rest against physical theft
- But once the system is booted and the user is logged in, any process running as the same user (or with read access to the .obsidian directory) can extract plaintext credentials from the LevelDB files
- This is a logical process-level compromise, not a physical one
- The document's proposed mitigation ("rely completely on the host OS's LUKS encryption, and Linux file permissions (chmod and chown) must strictly restrict read access to the .obsidian configuration folder") is insufficient

The LevelDB database file itself is not encrypted at the application layer — OS-level file permissions only prevent other users from reading it, not malware or a compromised process running as the same user.

## Evidence

> "Critical Security Warning: As of early 2026, Electron-based applications (like Obsidian) using the SecretStorage API have been documented storing credentials in plaintext within LevelDB local storage directories, making them vulnerable to extraction by unauthorized processes" — Phase 2 MCP Stack

> "To mitigate this architectural vulnerability, the vault directory must rely completely on the host OS's LUKS encryption, and Linux file permissions (chmod and chown) must strictly restrict read access to the .obsidian configuration folder" — Phase 2 MCP Stack

## Impact

If the Obsidian API key for the Local REST API plugin is stored in Electron SecretStorage/LevelDB plaintext:
- Any process on the system that can read the .obsidian directory can extract the API key
- The API key grants read/write access to the entire vault (including all intellectual property)
- This defeats the zero-trust security architecture of Entif v0

## Required Deliverables

1. **Audit report:** Confirm the vulnerability exists in the specific version of Obsidian being deployed. Document which SecretStorage credential is at risk (API key for Local REST API plugin).

2. **Migration path:** Migrate credential storage from Electron SecretStorage (LevelDB) to host OS native secret service:
   - GNOME Keyring (most common on Ubuntu GNOME desktops)
   - KDE Wallet (KDE Plasma)
   - `pass` (command-line standard, works everywhere)
   - systemd-based secret service (for headless/server environments)

3. **Validation:** After migration, verify that:
   - Obsidian can authenticate to its secret store without plaintext file exposure
   - The .obsidian directory contains no unencrypted secrets
   - A process running as the same user cannot extract credentials from the LevelDB files

4. **Backup plan:** If Obsidian cannot be modified to use a secure secret service, document the operational workaround (e.g., disable Obsidian REST API plugin, use only local vault access, accept reduced functionality)

## Dependencies

- None (can start immediately — this is a prerequisite to Phase 2 MCP stack deployment)

## Labels

`security`, `electron`, `credential-storage`, `linux`, `luks`, `obsidian`, `secretstorage`, `leveldb`

## References

- Obsidian Forum thread: "Cross-platform secure storage for secrets and tokens that can be sync'd" — `forum.obsidian.md/t/cross-platform-secure-storage-for-secrets-and-tokens-that-can-be-syncd/100716`
