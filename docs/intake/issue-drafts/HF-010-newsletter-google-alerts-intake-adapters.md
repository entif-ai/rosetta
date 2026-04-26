# Issue Draft: HF-010 — Newsletter and Google Alerts Intake Adapters

## Metadata

- **Issue prefix:** HF-010
- **Title:** Implement newsletter and Google Alerts intake adapters
- **Confidence:** high (sources described; adapters not implemented)
- **Authority:** primary (sovereign user request)
- **Extraction source:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Labels:** HF-010, newsletter, email-ingest, google-alerts, RSS
- **Status:** draft
- **Depends on:** HF-003 (intake envelope schema)
- **Blocks:** —

---

## Problem Statement

Crates is subscribed to multiple newsletters (including Matt Wolfe's Future Tools) and has Google News alerts set up. He wants these ingested via email-to-ingest (dedicated email label or mailbox folder) and Google Alerts (RSS or alert email). These sources, along with broader RSS feeds and saved recurring search queries, should all feed into the universal intelligence loop. Adapters for these sources are not yet implemented.

---

## Proposed Approach

1. **Newsletter sources (email-to-ingest):**

   Primary source: Matt Wolfe's Future Tools (futuretools.beehiiv.com or similar)
   - Method: dedicated email label/folder for newsletters; Crates labels or filters newsletters to a dedicated mailbox/label
   - Adapter extracts: subject, from, date, body (links + headline blocks + teaser text)
   - Each newsletter issue → multiple IntakeEnvelope objects (one per article/link mentioned)
   - "Pull links + headline blocks + any teaser text"

   Other newsletters to support:
   - Identify from Crates' email which newsletters are subscribed
   - Pattern: newsletters come from specific domains (beehiiv, substack, ghost, etc.)
   - Each newsletter issue scanned for article links and converted to IntakeEnvelope items

2. **Google News alerts (email or RSS):**

   - If RSS available for alert: poll RSS feed
   - If email: ingest alert emails from dedicated label/folder
   - Each alert email → one or more IntakeEnvelope objects
   - Alert emails typically contain: headline, snippet, link to full article
   - Auto-tag with the alert query/trigger term

3. **RSS feed polling:**

   - For sources that provide RSS: poll at configured interval
   - RSS item → IntakeEnvelope
   - Standard fields: title, link, description/pubDate, author

4. **Email adapter requirements:**
   - Read access to labeled email folder/mailbox
   - For Gmail: use Gmail API with filter for newsletter label
   - For other email providers: IMAP or provider-specific API
   - Mark emails as read (not deleted) after processing
   - Deduplicate across polling cycles (hash of subject+from+date)

5. **Sources inventory** (from spec):
   - Matt Wolfe's Future Tools newsletter
   - Google News alerts
   - RSS feeds (general)
   - Saved recurring search queries
   - Tips from humans (via email, messages, Pendant transcriptions)
   - Sources sent by those Crates interacts with

6. **IntakeEnvelope per source:**
   - Newsletter item: `source_type=newsletter`, `source_name=[newsletter-name]`, article title from email body
   - Google Alert item: `source_type=google-alert`, `source_name=[alert-name]`, alert query as tag
   - RSS item: `source_type=rss`, `source_name=[feed-name]`
   - All emit IntakeEnvelope via HF-003

---

## Acceptance Criteria

- [ ] Email-based newsletter adapter implemented (Matt Wolfe Future Tools as first target)
   - [ ] Extracts article links and headlines from newsletter body
   - [ ] Each notable link in newsletter becomes an IntakeEnvelope
   - [ ] Email marked read after processing; not deleted
   - [ ] Deduplication: no duplicate items from same newsletter issue
- [ ] Google News alerts adapter implemented (email or RSS path)
   - [ ] Alert query term stored as tag
   - [ ] Each alert becomes an IntakeEnvelope
- [ ] General RSS feed polling implemented (configurable per feed)
   - [ ] Polling interval configurable per feed
- [ ] All adapters emit IntakeEnvelope compliant objects per HF-003
- [ ] Auth/credentials for email access configured and tested
- [ ] Deduplication across all sources (hash of title+author+date+domain)

---

## Dependencies

- HF-003 (intake envelope schema; all adapters emit IntakeEnvelope)
- Email access credentials (Gmail API or IMAP)
- RSS feed URLs and polling intervals
- Google Alerts RSS URLs (available at https://www.google.com/alerts)

---

## Estimated Complexity

**Medium.** Email API integration (Gmail) and RSS polling are well-understood patterns. Primary complexity is in extracting article links from newsletter bodies (HTML parsing) and deduplication logic.

---

## Notes

- Newsletter body parsing: newsletters often embed article links as text URLs or as formatted buttons. Need to handle both cases.
- Google Alerts: best approach is RSS feeds for each alert (available via Google Alerts setup). Email fallback is messier.
- "Tips from humans" is the most informal source — these may come via email, Slack, Telegram, or other channels. Each tip should be treated as a potential IntakeEnvelope even if manually forwarded.
- Deduplication is critical for newsletter intake: the same article may appear in multiple newsletters or in the same newsletter multiple times (re-sends). Hash of title+author+date+domain must catch this.
- "Saved recurring search queries" suggests Google Alerts or saved search RSS feeds — these should be treated as a separate source type (google-search).
