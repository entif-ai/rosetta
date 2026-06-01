# SDF-012: UWB Device Compatibility Matrix for SDF Swarm Participation Modeling

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — comprehensive UWB device inventory from Apple, Samsung, Google, Motorola, Xiaomi, with citations to Apple Support, NXP press releases, The Verge, Android Police, Motorola Support. Current as of January 2026.

## Summary
Build a comprehensive UWB-capable device inventory for modeling SDF swarm participation rates and constraint density across venue deployments. Sources: Apple Support pages, NXP case studies, The Verge, CSA-Aliro spec, vendor spec sheets.

## Known UWB-Capable Devices (as of January 2026)

### Apple Ecosystem
| Device | UWB Chip | Notes |
|---|---|---|
| iPhone 11 and later | U1 | Region-dependent |
| Apple Watch Series 6 | UWB | Region-dependent |
| Apple Watch Series 9 | 2nd-gen UWB | Explicit spec |
| AirTag (1st gen) | U1 | Precision Finding |
| AirTag 2nd gen (announced Jan 2026) | 2nd-gen UWB | Expanded range |
| AirPods Pro 2 (USB-C + MagSafe) | UWB in case | Explicit spec |
| HomePod mini | UWB | Explicit spec |

### Samsung
| Device | UWB Notes |
|---|---|
| Galaxy S21+, A54+ (select) | Platform feature support varies |
| Note: hardware ≠ feature support; OS may gate UWB exposure |

### Google
| Device | UWB Notes |
|---|---|
| Pixel 6 Pro and later | Find Hub "precise finding" requires Pixel 8 Pro+ (OS gate) |

### Motorola
| Device | UWB Notes |
|---|---|
| Select Edge and Razr phones | "Precise finding" via Moto Tag ecosystem |
| Moto Tag | BLE + UWB tracker |

### Xiaomi
| Device | UWB Notes |
|---|---|
| Xiaomi MIX4 | NXP Trimension; "point to connect" |
| Xiaomi 15S Pro | NXP UWB; transit/car access use cases |

### Wearables (non-Apple)
| Device | UWB Notes |
|---|---|
| Google Pixel Watch 3 | First Wear OS watch with UWB; Watch Unlock proximity |

### Smart Locks
| Device | UWB Notes |
|---|---|
| Aqara Smart Lock U400 | UWB-powered hands-free unlock |
| Aliro-compliant locks (Q1 2026+) | Multiple makers; standardizes UWB access |

### Laptops (UWB Radar / Presence Detection)
| Device | UWB Notes |
|---|---|
| Lenovo ThinkPad X1 Nano | Novelda UWB sensor; Human Presence Detection |
| Multiple ThinkPad models | HPD via UWB (configuration-dependent) |

## Key Gap
No unified manufacturer registry for Android UWB models. Most reliable signal: **platform feature support** (Google Find Hub), not chip presence.

## Research Tasks
- Build structured device matrix (manufacturer, model, UWB capability, OS-level feature exposure, firmware version)
- Model expected participation rate by venue type (e.g., 70% iPhone in Apple Store, 30% Pixel in transit station)
- Assess OS-level API access for UWB peer-ranging by platform and version

## Open Questions
- What fraction of UWB-capable devices expose ranging APIs to third-party apps?
- Is there a platform-level standard (FiRa, CCC) that enables cross-vendor UWB ranging?
- Does Aliro's Q1 2026 launch change the participation model significantly?

## Labels
`sdf`, `uwb`, `device-inventory`, `swarm`, `compatibility`

## Depends On
None (independent research thread)
