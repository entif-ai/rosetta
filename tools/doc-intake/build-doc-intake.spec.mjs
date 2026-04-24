import { describe, expect, it } from 'vitest';

import { buildChronology, extractTopMatterDates, inferFreshness } from './build-doc-intake.mjs';

describe('doc intake chronology', () => {
  it('preserves chat export created, updated, and exported timestamps separately', () => {
    const topMatter = extractTopMatterDates(`# Agentic Orchestration Failures

**User:** Example
**Created:** 2026/4/23 8:36:10
**Updated:** 2026/4/23 13:09:43
**Exported:** 2026/4/23 22:19:09
`);

    expect(topMatter.createdAt).toMatchObject({
      date: '2026-04-23',
      line: 4,
      localDateTime: '2026-04-23T08:36:10',
      source: 'top-matter'
    });
    expect(topMatter.updatedAt).toMatchObject({
      date: '2026-04-23',
      line: 5,
      localDateTime: '2026-04-23T13:09:43',
      source: 'top-matter'
    });
    expect(topMatter.exportedAt).toMatchObject({
      date: '2026-04-23',
      line: 6,
      localDateTime: '2026-04-23T22:19:09',
      source: 'top-matter'
    });
  });

  it('chooses updated top-matter over filename and mtime while retaining fallback evidence', () => {
    const stats = {
      mtime: new Date('2026-04-24T05:02:58.958Z')
    };
    const chronology = buildChronology(
      'docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md',
      `# Agentic Orchestration Failures

**Created:** 2026/4/23 8:36:10
**Updated:** 2026/4/23 13:09:43
**Exported:** 2026/4/23 22:19:09
`,
      stats,
      undefined,
      '2026-04-24T06:00:00.000Z'
    );

    expect(chronology.primary).toMatchObject({
      date: '2026-04-23',
      kind: 'updatedAt',
      localDateTime: '2026-04-23T13:09:43',
      source: 'top-matter'
    });
    expect(chronology.fallback.pathDate).toMatchObject({
      date: '2026-04-23',
      raw: '20260423',
      source: 'path'
    });
    expect(chronology.fallback.filesystemModifiedAt).toMatchObject({
      date: '2026-04-24',
      isoDateTime: '2026-04-24T05:02:58.958Z',
      source: 'filesystem-mtime'
    });
  });

  it('keeps intake timestamps stable across reruns when previous chronology exists', () => {
    const previousDoc = {
      chronology: {
        intake: {
          firstIndexedAt: '2026-04-24T06:00:00.000Z',
          observedAt: '2026-04-24T06:00:00.000Z'
        }
      }
    };

    const chronology = buildChronology(
      'docs/backlog/20260424 - Rosetta Text-Core MVP Scope Gate (v0.1).md',
      `# Rosetta Text-Core MVP Scope Gate v0.1

Date: 2026-04-24
`,
      { mtime: new Date('2026-04-24T06:30:00.000Z') },
      previousDoc,
      '2026-04-24T07:00:00.000Z'
    );

    expect(chronology.intake).toEqual(previousDoc.chronology.intake);
  });

  it('marks filesystem-only dating as an undated import', () => {
    expect(inferFreshness('2026-04-24', 'filesystemModifiedAt')).toBe('undated-import');
  });
});
