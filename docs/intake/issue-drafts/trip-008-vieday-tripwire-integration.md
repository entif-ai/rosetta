# TRIP-008: Tripwire Protocol Integration into VieDay Mental-Health Journaling Module

## Metadata

- **Type**: personal-apps
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/governance/20250710 - Tripwire Protocol - EntifAI.md`
- **Extraction date**: 2026-05-26
- **Labels**: tripwire, vieday, mental-health, personal-wellness
- **Depends on**: TRIP-001

## Problem Statement

VieDay is a personal productivity + mindfulness framework with AI journaling, check-ins, and habit tracking. Users share deeply personal content — emotional lows, life struggles, trauma processing. The Tripwire Protocol is a natural fit: detect crises (suicidal ideation, self-harm, abuse) in real-time from personal journaling data without surveilling all other content. But the implementation must be fully privacy-preserving and user-controlled.

## Proposed Solution

### AI Journaling with Local Tripwire

1. User writes in VieDay journaling module
2. Before ANY local storage or inference: lightweight local tripwire classifier evaluates semantic risk + entropy
3. If tripwire does NOT fire: journaling continues normally, stored locally with optional E2E encryption
4. If tripwire FIRES: escalation envelope constructed (encrypted), sent to user's personal validator quorum (see below)

### Personal Validator Quorum Options

**Option A: Self-Authoring Mode (strictest privacy)**
- No human ever sees the content
- Quorum of local AI agents evaluates
- Crisis intervention = a gentle prompt ("Would you like to reach out to someone?") — not external escalation
- User retains full control

**Option B: Guardian Mode**
- User opts in by adding guardian(s) to their personal quorum
- Guardians can be: therapist, family member, trusted friend, crisis line
- If tripwire fires + quorum approves: guardian is notified (specific concern, not full content)
- User can set: soft nudge vs. hard escalation

**Option C: Supported Growth Mode**
- Middle ground: user opts into periodic check-ins
- If crisis detected + quorum reached: user is prompted to schedule a therapy session
- Outcome is NOT external notification; user retains agency

### Community / Accountability Group Features

If VieDay incorporates shared goals or support circles:
- Group members are NOT in the same validator pool
- Group-level moderation (flagged content reviewed by a random, vetted cross-group panel)
- Only genuine dangerous or urgent situations result in group-level escalation

### Developer/Coach Platform Layer

Coaches using VieDay to support clients have access to:
- Aggregate anonymized wellness metrics (engagement, mood trends)
- Crisis alerts ONLY when quorum fires and approves
- NO access to individual journal entries or session content without explicit client consent
- Tripwire acts as the ethical boundary and liability mitigator

### Monetization Hook

- Guardian + care circle configuration → premium feature
- "Ethics-by-design" certification for enterprise customers (schools, companies running VieDay wellness programs)
- White-label for therapists and coaches

## Acceptance Criteria

1. Tripwire runs locally on every journal entry before storage or inference
2. User can set Guardian Mode (opt-in guardian/therapist) or Self-Authoring Mode (strictest privacy)
3. In Guardian Mode, only quorum-approved escalations result in guardian notification — and only the concern category, not full content
4. Journal entries NOT triggered by tripwire are never stored externally; fully local E2E encrypted
5. Coach/therapist dashboard shows only aggregate anonymized data; individual entries require explicit per-client consent
6. Integration tests: full flow from writing → tripwire evaluation → storage OR escalation envelope + quorum
7. UX copy approved by mental health professional before launch

## Dependencies

- TRIP-001 (tripwire detection + envelope format)
