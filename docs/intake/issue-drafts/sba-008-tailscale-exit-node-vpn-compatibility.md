# SBA-008: Tailscale exit node — corporate VPN compatibility and asymmetric routing design

## Status

draft — `docs/intake/issue-drafts/sba-008-tailscale-exit-node-vpn-compatibility.md`

## Metadata

- **Type:** infrastructure
- **Priority:** P2
- **Source doc:** `docs/backlog/Entif v0 Second Brain Architecture Plan.md`
- **Section:** Phase 1 (System Hardening and Zero-Trust Network Overlay)
- **Confidence:** medium

## Problem

The document mandates configuring the Minisforum edge node as a Tailscale exit node to route all iPhone internet traffic through the home edge node. Three specific concerns are unaddressed:

1. **Corporate VPN conflict:** If the iPhone is enrolled in a corporate MDM (Mobile Device Management) profile with a VPN configuration, iOS may:
   - Refuse to connect to the Tailscale exit node simultaneously (VPN-to-VPN conflict)
   - Force all traffic through the corporate VPN regardless of user preference
   - Split-tunnel in unexpected ways that bypass the Tailscale exit node
   - The document does not analyze interaction with existing corporate VPN infrastructure

2. **Asymmetric routing:** When the iPhone routes traffic through the Tailscale exit node on the home network, return traffic from the internet must route back through the same path. If the exit node's public IP changes (e.g., ISP DHCP), routing breaks. The document does not specify how this is handled.

3. **iOS Tailscale client limitations:** iOS Tailscale app restrictions (App Store policies, background app refresh limitations) may prevent persistent VPN tunnel maintenance. The document does not analyze iOS-specific Tailscale client behavior.

## Evidence

> "Exit Node Configuration: To allow the user's mobile devices (e.g., an iPhone acting as the ambient audio capture device) to route all internet traffic securely through the home edge node, the server must be configured as an 'exit node.' First, enable IP forwarding in the Linux kernel by editing /etc/sysctl.conf and uncommenting the lines net.ipv4.ip_forward=1 and net.ipv6.conf.all.forwarding=1, then apply with sudo sysctl -p. Finally, advertise the node to the Tailscale network: sudo tailscale set --advertise-exit-node" — Phase 1

## Required Deliverables

1. **Corporate VPN compatibility analysis:**
   - Test Tailscale exit node routing with corporate MDM VPN enrolled (if applicable)
   - Document iOS VPN configuration conflict scenarios
   - If conflicts exist, propose workaround (e.g., exclude corporate traffic from exit node routing, use per-app VPN rules, route only specific traffic through exit node)

2. **Exit node public IP stability design:**
   - If ISP uses dynamic IP, document how Tailscale maintains routing (Tailscale DERP servers handle this automatically; verify)
   - If static IP is required, document how to obtain and configure
   - Test failover scenarios

3. **iOS Tailscale client behavior analysis:**
   - Test background refresh behavior: does iOS kill the Tailscale VPN tunnel when app is backgrounded?
   - Document any iOS-specific configuration requirements
   - If persistent tunnel is required, evaluate Tailscale Funnel vs full exit node for audio capture use case specifically

4. **Alternative design if exit node is infeasible:**
   - If corporate VPN conflicts are unavoidable, design alternative privacy routing path for iPhone audio capture data
   - Consider: Tailscale subnet router instead of exit node, SSH tunnel, or dedicated privacy VPN service

## Dependencies

- Hardware procurement (Minisforum UM890 Pro must be running Ubuntu 24.04 with Tailscale installed)
- iPhone with Tailscale client installed (can be tested in parallel)

## Labels

`tailscale`, `vpn`, `infrastructure`, `routing`, `ios`, `corporate-vpn`, `exit-node`
