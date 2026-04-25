# CTS-005: MediaForge text_to_image Rendering Tool

## Type
`implementation`

## Labels
`mediaforge`, `rendering`, `playwright`, `articleforge`

## Depends On
`— (can be implemented independently)`

## Evidence
PRD Section 2.5: "media.render.text_to_image({text, layout_template?, resolution?}) → FilePassport. This tool uses a sandboxed headless browser (like Playwright) or a graphics library to render Markdown, HTML, or even just plain text into a high-resolution PNG. It leverages ArticleForge templates for consistent layouts. VizForge can be used to render charts *into* these documents."

## Problem Statement
MediaForge needs a text-to-image rendering capability to support the forgetting mechanism (converting text to images for Tier 1 optical storage) and to enable any process that needs to prepare text for optical compression.

## Scope

### Must Include
- [ ] MCP tool: media.render.text_to_image({ text: string, layout_template?: string, resolution?: number })
- [ ] Output: FilePassport (file reference to rendered PNG)
- [ ] Sandbox: headless browser (Playwright) or graphics library in sandboxed environment
- [ ] Input formats: Markdown, HTML, plain text
- [ ] Resolution: canonical high-resolution output (target DPI TBD)
- [ ] ArticleForge template integration for consistent layouts
- [ ] Integration point for VizForge chart rendering into documents

### Should Include
- [ ] Batch rendering (multiple pages from single text)
- [ ] Layout preservation (margins, spacing, typography fidelity)
- [ ] Error handling: malformed Markdown/HTML graceful degradation

### Could Include
- [ ] Custom template DSL for layout_template parameter
- [ ] Progressive render (draft → high-fidelity)
- [ ] PDF output option alongside PNG

## Acceptance Criteria
- [ ] Text input renders to legible, high-resolution PNG
- [ ] Markdown (headings, lists, code blocks) renders correctly
- [ ] FilePassport returned with valid file reference
- [ ] Rendering completes within SLO (p95 < 5000ms for single-page)
- [ ] ArticleForge templates apply consistently across renders

## Notes
Dependency for CTS-004 (forgetting tiers). Slice 2 of the thin-slice plan uses this for the Zettelkasten memory experiment.

## Status
`draft`
