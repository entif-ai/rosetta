# Issue Draft: HF-009 — Magazine Feed Adapters (Wired, Popular Mechanics, 2600) with DRM Fallback

## Metadata

- **Issue prefix:** HF-009
- **Title:** Implement magazine feed adapters (Wired, Popular Mechanics, 2600) with DRM fallback
- **Confidence:** high (access methods described; adapters not implemented)
- **Authority:** primary (sovereign user request)
- **Extraction source:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Labels:** HF-009, magazine, feed-adapter, DRM, wired, popmech, 2600
- **Status:** draft
- **Depends on:** HF-003 (intake envelope schema)
- **Blocks:** —

---

## Problem Statement

Crates has paid subscriptions to Wired, Popular Mechanics, and 2600: The Hacker Quarterly — received in both physical and digital forms. He wants these funneled through the Claw orchestration layer using the same intelligence loop as research papers. The primary design constraint is access method: Wired and PopMech are likely behind login walls or app DRM; 2600 is print-focused. The spec defines three tiers of access quality: official digital endpoints (ideal), email TOC (fallback), PDF/epub if subscription provides it.

---

## Proposed Approach

1. **Access tier assessment per magazine:**

   **Wired:**
   - Likely behind paywall on web; official digital access may be via Condé Nast subscription portal
   - Check: can we fetch HTML article pages with authenticated session?
   - Fallback: issue TOC email or PDF if available
   - DRM: likely on app versions; prefer web or email

   **Popular Mechanics:**
   - Same parent (Hearst) as many magazines; similar access pattern
   - Check: authenticated web session for article pages
   - Fallback: TOC email, PDF

   **2600: The Hacker Quarterly:**
   - Print-focused; digital presence less developed
   - Check: 2600 website for article content
   - May not have official digital edition; treat as web scraping with respect to ToS
   - Fallback: physical/digital issue PDF if subscription provides it

2. **Feed adapter implementation:**

   Each magazine adapter implements:
   - `check_new_issues()` — detect new issue availability
   - `list_article_urls(issue)` — extract article URLs from issue TOC
   - `fetch_article(url)` — fetch article content (respecting auth)
   - All three emit IntakeEnvelope per article

3. **Auth management:**
   - Store credentials securely (environment variables or encrypted config)
   - Session refresh logic for authenticated web access
   - Rate limiting to avoid triggering abuse detection

4. **DRM fallback strategy:**
   - If official digital endpoint inaccessible: try email TOC (new issue alert emails contain article titles and links)
   - If email TOC unavailable: try PDF/epub issue file if subscription provides it
   - If none available: store metadata (title, author, publication date) from whatever source is accessible; mark as "pending deep ingest" with instructions for manual link drop
   - "The system should always be able to store metadata and a pointer even when it can't immediately fetch full text"

5. **Content pointer for paid magazines:**
   - `content_pointer` field encodes: auth context + URL, or file path to cached PDF, or "pending: manual deep ingest"

---

## Acceptance Criteria

- [ ] Feed adapter implemented for each magazine (Wired, Popular Mechanics, 2600)
- [ ] Each adapter emits IntakeEnvelope compliant objects
- [ ] Authenticated web session works for at least Wired (if accessible)
- [ ] Graceful degradation: if full-text fetch fails, metadata + pointer is stored (not silent failure)
- [ ] DRM-locked content: fallback to TOC metadata + pending deep ingest marker
- [ ] New issue detection works (either via email alert or polling)
- [ ] Receipts metadata included (request IDs, timestamps)

---

## Dependencies

- HF-003 (intake envelope schema; magazine adapters emit IntakeEnvelope)
- Auth credentials for Wired, PopMech (Condé Nast / Hearst accounts)
- Email access for TOC alerts (if using email-based fallback)

---

## Estimated Complexity

**Medium–High.** Magazine paywalls and DRM are the primary complexity. Each magazine may have different access mechanisms. 2600 is likely the easiest (less paywalled); Wired/PopMech may require cookie-based session management.

---

## Notes

- The spec says: "keep the stored content private to your system and tied to your authorized access. You're building a second brain, not republishing a magazine."
- Rate limiting is important: don't hammer magazine servers on every poll cycle
- PDF/epub issue files are the best fallback for DRM-protected content — if Crates' subscription provides downloadable issues, that's the cleanest path
- "Manual deep ingest by link drop" is a valid fallback: if the system can't fetch the article, store what metadata is available and let a human drop the link to trigger deep ingest manually
