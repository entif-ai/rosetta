# SDF-012: Entif-Phone Hardware Access Requirements for Guardian Mode

## Status
draft

## Type
architecture

## Summary
Define the OS-level hardware measurement access required for Entif-Phone to function as a Guardian Mode sensing node. The critical unknown is whether consumer OS (stock Android, stock iOS) exposes sufficient UWB and WiFi measurement primitives, or whether custom/rooted firmware is required.

## Measurement Access Requirements

### UWB Ranging (Required)
- Access level needed: UWB ranging sessions, range + angle output
- iOS: CoreLocation provides UWB APIs for "nearby interaction" sessions; U1 chip accessible
- Android: Pixel 8+ provides UWB API via UwbManager; other OEMs inconsistent
- What is NOT available: raw CIR, phase history, high-rate sampling (radar mode)
- Implication: phones can contribute ranging edges to factor graph, not imaging

### WiFi CSI (Desired but Likely Unavailable)
- Access level needed: full Channel State Information (complex values per subcarrier per antenna pair)
- iOS: Not exposed to third-party apps
- Android: Some research builds (Nexmon) can capture CSI; stock OS does not expose CSI
- What is NOT available: phase/amplitude per subcarrier for pose inference (CMU approach)
- Implication: WiFi CSI pose inference requires dedicated infrastructure sensors, not phones

### WiFi RTT (802.11mc) (Available on Some Devices)
- Access level needed: WiFi RTT ranging
- Android: WifiRttManager API (API 31+) on supported devices (Pixel 6+, some Samsung)
- iOS: Not exposed to third-party apps
- Provides: range with ~1-2m accuracy; useful as coarse anchor edge
- Implication: partial availability; Android-only for now

### BLE (Available)
- Access level needed: BLE beacon scanning, RSSI
- Both iOS and Android: standard BLE APIs
- Provides: proximity constraints (weak), beacon presence
- Not: precision geometry

### IMU (Available)
- Access level needed: accelerometer, gyroscope, magnetometer
- Both iOS and Android: standard motion APIs
- Provides: dead-reckoning deltas, orientation, barometer (if equipped)
- Implication: inertial odometry is the most universally available constraint

### Microphone (Available but Constrained)
- Access level needed: raw audio or real-time audio analysis
- Both iOS and Android: microphone permission required
- Privacy: Guardian Mode would run local event detection, not raw streaming
- Anchor time-pilot correlation possible (SDF-003) but requires permission + calibration

### Camera (Available but Constrained)
- Access level needed: real-time video analysis
- Both iOS and Android: camera permission required
- Privacy: Guardian Mode would output occupancy/flow, not raw video
- Implication: venue cameras (not phones) are the primary visual sensing

## OS Access Summary

| Modality | iOS | Android | Custom Firmware |
|---|---|---|---|
| UWB ranging | Partial (U1, nearby interaction) | Partial (Pixel 8+, OEM-dependent) | Required for raw access |
| WiFi CSI | Not exposed | Not exposed (stock) | Required |
| WiFi RTT | Not exposed | Partial (API 31+, Pixel 6+) | Required for broad coverage |
| BLE | Yes | Yes | Not needed |
| IMU | Yes | Yes | Not needed |
| Microphone | Yes (permission) | Yes (permission) | Not needed |
| Camera | Yes (permission) | Yes (permission) | Not needed |

## Critical Unknown

The document assumes "future OS/software updates support this being activated." This is the load-bearing assumption for phone-as-imager. Without OS access, phones are cooperative ranging tags and inertial sensors, not radar imagers.

## Architecture Implication

Guardian Mode must be designed as hybrid:
- **Infrastructure UWB radar nodes** (not phones) as primary spatial imaging sensors
- **Phones as cooperative participants**: UWB ranges, IMU odometry, BLE proximity, audio event detection, optional camera events
- **AI's role**: confidence weighting, bias detection, data association — not magic super-resolution from limited measurements

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: "platform API access, not compute, is the bottleneck"
- CMU DensePose: CSI access requires research-grade hardware, not consumer phones

## Labels

entify-phone, guardian-mode, uwb-api, wifi-csi, os-access, hardware-access

## Priority

high