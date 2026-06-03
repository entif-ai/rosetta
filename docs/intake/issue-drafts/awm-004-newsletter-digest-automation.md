# Issue Draft: AWM-004 — Newsletter Digest Automation: n8n Weekly Cron + Blog Cross-Post

## Metadata

- **Type**: implementation
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/ideas/20251004 - Agentic Workflow for Media Generation.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-agentic-workflow-media-generation.md`
- **Labels**: `newsletter`, `n8n`, `email`, `blog`, `automation`
- **Depends on**: AWM-001, AWM-002

## Summary

Automate the weekly digest newsletter and its blog counterpart. n8n queries all releases published in the last 7 days, renders HTML + plaintext from a template, sends via email API, and cross-posts the same content to the blog.

## Problem Statement

At 3/day × 7 days = 21 releases per week, manual newsletter drafting is unsustainable. The newsletter is a critical warm-traffic driver for YouTube (each click is a fan who watches longer than cold traffic), so it must go out consistently every week.

## Architecture

```
Weekly Cron (Monday 08:00 ET)
  ↓
n8n: Query Sheets — all rows WHERE publish_at >= (today - 7 days) AND yt_id IS NOT NULL
  ↓
n8n: Group into sections — New Releases (long-form), Shorts Highlights
  ↓
LLM node: Render HTML digest from template + JSON data
  ↓
  ├─→ Email API (Mailgun / SES / Resend): send to subscriber list
  └─→ Blog autopost: POST to blog as "Week NN — Releases & Notes"
  ↓
Sheets: Mark all queried rows as DigestSent=true
```

## Digest Template (HTML)

```html
<h2>This Week from SmaBoi</h2>
<p>New videos released between {{ start_date }} – {{ end_date }}.</p>

{{#each releases}}
<div>
  <a href="https://youtu.be/{{ yt_id }}">
    <img src="{{ art_cdn_url }}" alt="{{ title }}" width="560" loading="lazy">
  </a>
  <h3>{{ title }}</h3>
  <p>{{ description }}</p>
  <p>
    <a href="https://youtu.be/{{ yt_id }}">Watch on YouTube</a>
    · {{ duration_hm }}
    {{#if is_short }} · Short{{/if}}
  </p>
</div>
{{/each}}

<hr>

<p>
  <a href="https://smaboi.example/blog">Blog</a> ·
  <a href="https://www.youtube.com/channel/...">YouTube</a> ·
  <a href="...">Newsletter Archive</a>
</p>
```

## Digest Template (Plaintext)

```
THIS WEEK FROM SMABOI
{{ start_date }} – {{ end_date }}
{{#each releases}}
---
{{ title }} {{#if is_short }}(Short){{/if}}
{{ description }}
Watch: https://youtu.be/{{ yt_id }} ({{ duration_hm }})
{{/each}}
---
Subscribe: https://smaboi.example/subscribe
YouTube: https://www.youtube.com/channel/...
```

## Subject Line Rotation

Rotate through:
1. "SmaBoi Weekly: 3 new drops you missed"
2. "Fresh this week: {{ track_a }}, {{ track_b }}, {{ track_c }}"
3. "New lyric videos + what's next"
4. "3 videos, 3 days — here's what dropped"

A/B test opens by varying subject line.

## n8n Workflow Nodes

```
[node: Cron Trigger]          → "0 8 * * 1" (Monday 08:00 ET)
[node: Google Sheets]        → Read rows: publish_at >= TODAY-7, yt_id NOT NULL
[node: Set]                  → Group into { new_releases, shorts }
[node: HTML node / LLM]      → Render HTML + plaintext from template
[node: HTTP Request]          → POST to email API (Mailgun/SES/Resend)
[node: HTTP Request]          → POST to blog WP REST API or git commit
[node: Google Sheets]         → Update DigestSent=true on all rows
[node: Telegram/Email Alert]  → Send summary to operator
```

## Email API: Resend (recommended)

```javascript
// n8n HTTP Request node
POST https://api.resend.com/emails
Authorization: Bearer {{ $credentials.resendApiKey }}
Content-Type: application/json

{
  "from": "SmaBoi <digest@smaboi.example>",
  "to": "{{ $json.subscriber_list }}",
  "subject": "{{ $json.subject_line }}",
  "html": "{{ $json.html_body }}",
  "text": "{{ $json.plaintext_body }}",
  "tags": ["weekly-digest"]
}
```

## Blog Cross-Post

The same JSON artifact used to render the email digest is used to create a blog post at `https://smaboi.example/blog/week-YY-releases`:

```json
{
  "title": "Week 24, 2025: Releases & Notes",
  "date": "2025-10-06T08:00:00-04:00",
  "slug": "week-24-2025-releases",
  "tags": ["weekly-digest", "releases"],
  "content": "<html of digest>"
}
```

For Hugo/Jekyll/Astro:
```bash
git checkout -b post/week-24-2025-releases
cp digest.md content/posts/week-24-2025-releases.md
git add . && git commit -m "digest: week 24 2025"
git push origin post/week-24-2025-releases
gh pr create --fill --label "autopost"
```

For WordPress:
```
POST /wp-json/wp/v2/posts
Authorization: Bearer {{ $credentials.wordpressJwt }}
{
  "title": "Week 24, 2025: Releases & Notes",
  "slug": "week-24-2025-releases",
  "status": "publish",
  "date": "2025-10-06T08:00:00",
  "content": "<html>",
  "categories": [<digest_category_id>],
  "tags": [<releases_tag_id>, <weekly_tag_id>]
}
```

## Acceptance Criteria

- [ ] Digest sends every Monday at 08:00 ET without manual trigger
- [ ] Digest includes all releases from previous 7 days that have a `yt_id`
- [ ] Both HTML and plaintext versions are sent
- [ ] Blog post is created within 30 minutes of email send
- [ ] Subject line rotates per the defined list
- [ ] All rows are marked `DigestSent=true` after successful send
- [ ] If send fails, retry 2× with 15-minute backoff; alert operator on final failure
