# SDF-008: SDF Integration with Aliro UWB Access Standard

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — "Aliro is set to launch in Q1 2026, with multiple lock makers planning support, and it explicitly standardizes UWB hands-free unlocking alongside NFC tap-to-unlock." CSA-Aliro announcement.

## Summary
Investigate Aliro (CSA Connectivity Standards Alliance) as a potential distributed anchor node protocol for indoor positioning and SDF venue sensing. Assess API surface, standards alignment, and whether Aliro-equipped locks/readers can serve as SDF anchor infrastructure.

## Motivation

Aliro standardizes NFC + BLE + UWB for digital access. Multiple lock makers (August, Yale, Schlage, and others) are planning Aliro support. If Aliro UWB is widely deployed in venues and buildings, those devices could serve as the anchor spine for SDF without requiring dedicated hardware installation.

## Key Questions

- Does Aliro expose UWB ranging data via API, or is it locked to the secure ranging session for access control?
- Can Aliro devices act as anchor time references (time-pilot broadcast) without compromising security?
- What is the ranging accuracy of Aliro UWB (cm-level? meter-level?).
- Does Aliro define a discovery/broadcast protocol that SDF could leverage for anchor self-calibration?

## Research Tasks

- Read Aliro specification (CSA-IOT)
- Survey Aliro member implementations (August, Yale, Schlage, Lockly, etc.)
- Identify whether UWB measurement data is accessible for non-access-control use cases
- Assess privacy implications of using access-control infrastructure for spatial sensing

## Open Questions

- Is Aliro UWB measurement data accessible for spatial sensing, or only for the secure access session?
- Can Aliro anchors serve as time-pilot broadcasters for SDF clock synchronization?
- What is the business model for lock makers: do they want SDF as a value-add or a security concern?

## Labels
`sdf`, `uwb`, `aliro`, `smart-lock`, `access-control`, `standards`

## Depends On
None (independent research thread)
