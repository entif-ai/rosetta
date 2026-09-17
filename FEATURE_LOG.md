# ETR-2026-07 editorial series — #1603

Branch: `codex/1603_ETR-2026-07`. Children: #1604–#1620.

## Contract and authority

Implement the public website experience specified by these issues in `apps/entif-site`.
User instructions narrow tests to necessary novel logic, using semantic data-test-id
selectors; defer W3C/WCAG/performance validation until all implementation is complete.
Experience CSS stays in its own directory. Public website design/README and repository
publication-boundary/authority-closure rules apply. No protected bridge edge applies
to website presentation. No protocol semantics change.

Repository has no `docs/workflows/agentic-development`, lease tool, or existing feature
log on this branch or current main. No lease is claimed. Remote feature branch was
absent at start. Current main merged without discarding the prior branch commit.

## Design and invariants

- Extend existing publication metadata with explicit series ID/order; derive navigation
  and paths from validated entries. Preserve unrelated publication routes/rendering.
- Dedicated full-width editorial shell retains shared header/footer and comfortable
  prose measure. Numbered sticky desktop navigation; previous/next mobile links.
- Build-time citation transformation consumes one CSV registry. Source IDs remain
  stable; unknown IDs stop the build. Native links work without JavaScript; progressively
  enhanced popovers support pointer, keyboard, touch, Escape and outside dismissal.
- All chapter prose retained. All 12 retained additions already occur verbatim in their
  section files: include once. No canonical manuscript, package crawl, or packaged graphics.
- Use authored prose/section breaks for typographic editorial beats; no invented data.
- Static content remains complete in reduced motion and print. No SPA or new runtime.
- Budget: series-specific client JS <= 8 KiB gzip; no new media or web fonts.

## Work and proof

Source acquisition: 16 sections, 12 additions, one registry retrieved by exact issue URLs.
Source snapshots currently in local `/tmp/etr-1603`; migrate selected content with
hashes and addition-inclusion evidence into website-owned content.

Next: narrow red tests for novel series/citation behavior, implement shared system,
migrate chapters and references, run focused build/type/lint checks, then final site
accessibility/HTML/link/responsive/performance gates. Record checkpoint evidence here.
