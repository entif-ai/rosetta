# Issue Draft: AWM-005 — Blog Autopost Pipeline: Git Commit or WP REST API

## Metadata

- **Type**: implementation
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/ideas/20251004 - Agentic Workflow for Media Generation.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-agentic-workflow-media-generation.md`
- **Labels**: `blog`, `wordpress`, `hugo`, `jekyll`, `automation`
- **Depends on**: AWM-001, AWM-002

## Summary

Automate the creation of a blog post each time a YouTube video is published. The post uses the track art as the featured image, LLM-drafted copy for title and description (human-approved), and includes the YouTube embed. Supports both static site generators (Hugo/Jekyll/Astro via git) and WordPress (via REST API).

## Trigger

Hourly n8n cron: for any Sheets row where `publish_at <= now` AND `BlogPosted = false`, trigger the autopost workflow.

## Approach A: Static Site (Hugo/Jekyll/Astro) via Git

### Post Front Matter (Markdown)

```yaml
---
title: "Track Title"
slug: "track-slug"
date: "2025-10-01T13:00:00-04:00"
tags: ["lyric-video", "synthwave"]
yt_id: "YOUTUBE_VIDEO_ID"
thumb: "/images/track-slug.jpg"
description: "Short blurb..."
schema: true
---
```

### Post Body (Markdown + HTML for embed)

```markdown
<iframe
  width="100%"
  height="420"
  src="https://www.youtube.com/embed/YOUTUBE_VIDEO_ID"
  title="Track Title"
  frameborder="0"
  allowfullscreen>
</iframe>

Short blurb here...

Listen on [YouTube](https://youtu.be/YOUTUBE_VIDEO_ID)

{{#if srt_url}}
[View Subtitles](/subtitles/track-slug.srt)
{{/if}}
```

### JSON-LD (optional SEO boost)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MusicRecording",
  "name": "Track Title",
  "byArtist": { "@type": "MusicGroup", "name": "SmaBoi" },
  "url": "https://youtu.be/YOUTUBE_VIDEO_ID",
  "image": "https://cdn.example/art/track-slug.jpg",
  "datePublished": "2025-10-01",
  "description": "Short blurb..."
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Track Title (Official Lyric Video)",
  "description": "Short blurb...",
  "uploadDate": "2025-10-01T13:00:00-04:00",
  "thumbnailUrl": "https://cdn.example/art/track-slug.jpg",
  "embedUrl": "https://www.youtube.com/embed/YOUTUBE_VIDEO_ID"
}
</script>
```

### Git Workflow in n8n

```bash
# In n8n "Execute Command" node or git script
BRANCH="post/$(date +%Y-%m-%d)-$SLUG"
git checkout -b "$BRANCH"
cp "$THUMB_PATH" "static/images/$SLUG.jpg"
cat > "content/posts/$SLUG.md" << 'POSTEOF'
---
title: "$TITLE"
...
---
<iframe ...></iframe>
POSTEOF
git add .
git commit -m "post: $SLUG"
git push origin "$BRANCH"
gh pr create \
  --title "post: $SLUG" \
  --body "Auto-post for $TITLE. YouTube: https://youtu.be/$YT_ID" \
  --label "autopost"
# Auto-merge if CI passes
gh pr merge --admin --auto
```

## Approach B: WordPress via REST API

```javascript
// n8n HTTP Request nodes

// Step 1: Upload thumbnail as media
POST /wp-json/wp/v2/media
Authorization: Bearer {{ $credentials.wordpressJwt }}
Content-Type: multipart/form-data
// Body: file=@thumb.jpg

// Step 2: Create post
POST /wp-json/wp/v2/posts
Authorization: Bearer {{ $credentials.wordpressJwt }}
Content-Type: application/json

{
  "title": "{{ $json.title }}",
  "slug": "{{ $json.slug }}",
  "status": "publish",
  "date": "{{ $json.publish_at }}",
  "content": "<iframe src='https://www.youtube.com/embed/{{ $json.yt_id }}' ...></iframe><p>{{ $json.description }}</p>",
  "featured_media": {{ $json.media_id }},
  "categories": [{{ $json.music_category_id }}],
  "tags": [{{ $json.lyric_video_tag_ids }}],
  "meta": {
    "yt_id": "{{ $json.yt_id }}"
  }
}
```

## Approval Gate

Before any post goes live, human approval is required. Options:

1. **n8n approval node**: pause workflow, send Telegram/email to operator, resume on approval
2. **Draft status first**: POST as `status=draft`, notify operator in Slack/email, operator publishes manually
3. **LLM draft + human tweak**: n8n writes the post content, operator reviews the Slack notification with preview link, approves via reaction/button

Recommended: Option 2 (draft-first) for simplicity. The LLM draft is usually good enough that approval is a 30-second thumbs-up.

## Folder / Asset Requirements

| Asset | Source | Destination |
|---|---|---|
| `thumb.jpg` | Drive `ArtURL` | `static/images/{slug}.jpg` (git) or uploaded via WP media API |
| `track.srt` | Produced by aeneas | `static/subtitles/{slug}.srt` (optional link in post) |
| Post content | LLM drafted from `Title`, `Description` | Markdown file or WP post body |

## Post-Publish Cleanup

After successful blog post creation:
- Update Sheets: `BlogPosted = true`
- Log: `blog_url` back to Sheets

## Acceptance Criteria

- [ ] Blog post is created within 60 minutes of YouTube publish time
- [ ] Track art appears as featured image (not an external hotlink)
- [ ] YouTube embed is responsive (100% width, 16:9 aspect)
- [ ] JSON-LD schema is present for MusicRecording + VideoObject
- [ ] Human approval gate is enforced before any post goes public
- [ ] Failed posts are retried once and then flagged for manual intervention
- [ ] Blog post URL is logged back to Sheets
