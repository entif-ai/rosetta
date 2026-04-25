import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { buildChronology, buildDocumentFingerprints, extractTopMatterDates, inferFreshness, resolveIssueDraftState } from './build-doc-intake.mjs';
import { claimNextDoc, cli as docsIntelligenceLedgerCli, failDoc } from './docs-intelligence-ledger.mjs';
import { buildCycleSummary, buildDocsIntelligenceIndex } from './docs-intelligence-graph.mjs';

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

  it('builds stable content fingerprints while material revisions change', () => {
    const formatted = buildDocumentFingerprints('docs/chats/example.md', '# Title\r\n\r\nalpha   beta');
    const equivalent = buildDocumentFingerprints('docs/chats/example.md', '# Title\n\nalpha beta');
    const revised = buildDocumentFingerprints('docs/chats/example.md', '# Title\n\nalpha gamma');

    expect(formatted.contentFingerprint).toBe(equivalent.contentFingerprint);
    expect(formatted.revisionFingerprint).toBe(equivalent.revisionFingerprint);
    expect(formatted.revisionFingerprint).not.toBe(revised.revisionFingerprint);
  });

  it('routes published issue drafts to archive and removes them from active candidates', () => {
    const state = resolveIssueDraftState('text-core-mvp-scope-gate', {
      issueDrafts: {
        'text-core-mvp-scope-gate': {
          number: 4,
          state: 'closed',
          title: 'Define Text-Core MVP scope gate from governing docs',
          url: 'https://github.com/entif-ai/rosetta/issues/4'
        }
      }
    });

    expect(state).toEqual({
      activePath: null,
      archivePath: 'docs/intake/issue-drafts/archive/text-core-mvp-scope-gate.md',
      published: true,
      issueUrl: 'https://github.com/entif-ai/rosetta/issues/4',
      status: 'published'
    });
  });

  it('keeps unpublished issue drafts in the active candidate folder', () => {
    const state = resolveIssueDraftState('canonical-cache-persistence', {
      issueDrafts: {}
    });

    expect(state).toEqual({
      activePath: 'docs/intake/issue-drafts/canonical-cache-persistence.md',
      archivePath: null,
      published: false,
      issueUrl: null,
      status: 'candidate'
    });
  });

  it('preserves manually deferred unpublished drafts in the active folder', () => {
    const state = resolveIssueDraftState('real-acquisition-adapters-behind-refinery-boundary', {
      issueDrafts: {
        'real-acquisition-adapters-behind-refinery-boundary': {
          activeDraftPath: 'docs/intake/issue-drafts/real-acquisition-adapters-behind-refinery-boundary.md',
          archivedDraftPath: null,
          draftStatus: 'deferred',
          deferredReason: 'Overlaps TC-007 until promotion outputs and storage boundaries are explicit.'
        }
      }
    });

    expect(state).toEqual({
      activePath: 'docs/intake/issue-drafts/real-acquisition-adapters-behind-refinery-boundary.md',
      archivePath: null,
      published: false,
      issueUrl: null,
      status: 'deferred',
      deferredReason: 'Overlaps TC-007 until promotion outputs and storage boundaries are explicit.'
    });
  });
});

describe('docs intelligence ledger locking', () => {
  it('claims only an unlocked pending doc and writes an auditable lock state', () => {
    const ledger = `# Ledger

## Per-Document Processing Log

| path | processed | findings | issues_drafted | concepts | notes | timestamp |
| --- | --- | --- | --- | --- | --- | --- |
| docs/already.md | processed:2026-04-24T00:00:00Z:30 | 1 | 0 | done | complete | 2026-04-24 |
| docs/in-flight.md | locked:2026-04-24T00:00:00Z:agent-a:branch-a | - | - | - | active | - |
| docs/next.md | no | - | - | - | pending | - |
`;

    const result = claimNextDoc(ledger, {
      agentId: 'agent-b',
      branchName: 'docs-intelligence/next',
      now: '2026-04-25T00:00:00Z'
    });

    expect(result.claimedPath).toBe('docs/next.md');
    expect(result.text).toContain('locked:2026-04-25T00:00:00Z:agent-b:docs-intelligence/next');
    expect(result.text).toContain('| path | processed | failure_count | findings |');
  });

  it('keeps failed docs claimable until the configured failure threshold', () => {
    const ledger = `# Ledger

## Per-Document Processing Log

| path | processed | failure_count | findings | issues_drafted | concepts | notes | timestamp |
| --- | --- | ---: | --- | --- | --- | --- | --- |
| docs/flaky.md | failed:2026-04-25T00:00:00Z:timeout:worker timed out | 1 | - | - | - | worker timed out | - |
| docs/blocked.md | blocked:2026-04-25T00:00:00Z:timeout:worker timed out | 3 | - | - | - | worker timed out | - |
`;

    const result = claimNextDoc(ledger, {
      agentId: 'agent-retry',
      branchName: 'docs-intelligence/retry',
      now: '2026-04-25T00:05:00Z'
    });

    expect(result.claimedPath).toBe('docs/flaky.md');
    expect(result.text).toContain('locked:2026-04-25T00:05:00Z:agent-retry:docs-intelligence/retry');
    expect(result.text).toContain('| docs/blocked.md | blocked:2026-04-25T00:00:00Z:timeout:worker timed out | 3 |');
  });

  it('dead-letters a doc after the configured failure threshold', () => {
    const ledger = `# Ledger

## Per-Document Processing Log

| path | processed | failure_count | findings | issues_drafted | concepts | notes | timestamp |
| --- | --- | ---: | --- | --- | --- | --- | --- |
| docs/flaky.md | locked:2026-04-25T00:00:00Z:agent-a:branch-a | 2 | - | - | - | active | - |
`;

    const result = failDoc(ledger, {
      docPath: 'docs/flaky.md',
      errorCode: 'timeout',
      summary: 'worker timed out',
      maxFailures: 3,
      now: '2026-04-25T00:10:00Z'
    });

    expect(result.state).toBe('blocked');
    expect(result.text).toContain('blocked:2026-04-25T00:10:00Z:timeout:worker timed out');
    expect(result.text).toContain('| docs/flaky.md | blocked:2026-04-25T00:10:00Z:timeout:worker timed out | 3 |');
  });

  it('atomically prevents concurrent workers from claiming the same doc', async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), 'docs-intelligence-ledger-'));
    const ledgerPath = path.join(tempDir, 'ledger.md');
    await writeFile(
      ledgerPath,
      `# Ledger

## Per-Document Processing Log

| path | processed | findings | issues_drafted | concepts | notes | timestamp |
| --- | --- | --- | --- | --- | --- | --- |
| docs/a.md | pending | - | - | - | pending | - |
| docs/b.md | pending | - | - | - | pending | - |
`
    );

    try {
      const [first, second] = await Promise.all([
        docsIntelligenceLedgerCli(['claim', '--ledger', ledgerPath, '--agent-id', 'agent-a', '--branch', 'branch-a', '--now', '2026-04-25T00:00:00Z'], { log: () => {} }),
        docsIntelligenceLedgerCli(['claim', '--ledger', ledgerPath, '--agent-id', 'agent-b', '--branch', 'branch-b', '--now', '2026-04-25T00:00:01Z'], { log: () => {} })
      ]);
      const claimed = [first.claimedPath, second.claimedPath].sort();
      const updated = await readFile(ledgerPath, 'utf8');

      expect(claimed).toEqual(['docs/a.md', 'docs/b.md']);
      expect(updated).toContain('locked:2026-04-25T00:00:00Z:agent-a:branch-a');
      expect(updated).toContain('locked:2026-04-25T00:00:01Z:agent-b:branch-b');
    } finally {
      await rm(tempDir, { force: true, recursive: true });
    }
  });
});

describe('docs intelligence graph generation', () => {
  it('indexes concepts and surfaces duplicate issue-draft clusters', () => {
    const index = buildDocsIntelligenceIndex({
      extractions: [
        {
          path: 'docs/intake/docs-intelligence/example.md',
          text: `# Docs Intelligence Extraction - Example

## Source
- Path: docs/example.md
- Title: Example

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-25 | docs/example.md | §1 | memory, receipts | memory-sovereignty, receipt-law | decision | Memory requires receipts | §1 | Link to existing issue | high |
`
        }
      ],
      issueDrafts: [
        {
          path: 'docs/intake/issue-drafts/memory-postgres-gap.md',
          text: `# PostgreSQL Memory Migration Gap

Labels: memory, storage
`
        },
        {
          path: 'docs/intake/issue-drafts/postgres-memory-migration.md',
          text: `# Memory PostgreSQL Migration Gap

Labels: storage, memory
`
        }
      ]
    });

    expect(index.concepts['memory-sovereignty'].documents).toContain('docs/example.md');
    expect(index.duplicateIssueDraftClusters).toHaveLength(1);
    expect(index.duplicateIssueDraftClusters[0].drafts.map((draft) => draft.path)).toEqual([
      'docs/intake/issue-drafts/memory-postgres-gap.md',
      'docs/intake/issue-drafts/postgres-memory-migration.md'
    ]);

    const summary = buildCycleSummary(index, { generatedAt: '2026-04-25T00:00:00Z' });
    expect(summary).toContain('## Duplicate Issue-Draft Signals');
    expect(summary).toContain('memory-sovereignty');
  });
});
