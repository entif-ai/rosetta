import { describe, expect, it } from 'vitest';
import {
  countTopics,
  getContentPath,
  isPublished,
  rankRelatedContent,
  toContentCard,
  type ContentSummary,
} from '../../src/lib/content';

const makeItem = (overrides: Partial<ContentSummary> = {}): ContentSummary => ({
  id: 'entif.research.alpha',
  slug: 'alpha',
  title: 'Alpha',
  description: 'A sufficiently descriptive test content summary for Alpha.',
  kind: 'research',
  status: 'published',
  published: new Date('2026-01-01T00:00:00Z'),
  tags: ['memory'],
  projects: ['rosetta'],
  related: [],
  noindex: false,
  ...overrides,
});

describe('content utilities', () => {
  it('maps content kinds to stable public paths', () => {
    expect(getContentPath(makeItem())).toBe('research/alpha/');
    expect(getContentPath(makeItem({ kind: 'project' }))).toBe('projects/alpha/');
  });

  it('only marks published content as publishable', () => {
    expect(isPublished(makeItem())).toBe(true);
    expect(isPublished(makeItem({ status: 'draft' }))).toBe(false);
    expect(isPublished(makeItem({ status: 'deprecated' }))).toBe(false);
  });

  it('builds serializable card data with the configured base path', () => {
    const card = toContentCard(makeItem(), '/rosetta/');
    expect(card.href).toBe('/rosetta/research/alpha/');
    expect(card.tags).toEqual(['memory']);
  });

  it('prioritizes explicit relations over inferred similarity', () => {
    const current = makeItem({ related: ['entif.research.explicit'] });
    const explicit = makeItem({ id: 'entif.research.explicit', slug: 'explicit', tags: [] });
    const inferred = makeItem({ id: 'entif.research.inferred', slug: 'inferred', tags: ['memory', 'agents'] });

    expect(rankRelatedContent(current, [inferred, explicit]).map(({ id }) => id)).toEqual([
      'entif.research.explicit',
      'entif.research.inferred',
    ]);
  });

  it('scores shared projects more strongly than a shared tag', () => {
    const current = makeItem({ projects: ['rosetta'], tags: ['memory'] });
    const projectMatch = makeItem({ id: 'entif.project.match', slug: 'project-match', kind: 'project', tags: [], projects: ['rosetta'] });
    const tagMatch = makeItem({ id: 'entif.research.tag', slug: 'tag-match', tags: ['memory'], projects: [] });

    expect(rankRelatedContent(current, [tagMatch, projectMatch]).map(({ id }) => id)).toEqual([
      'entif.project.match',
      'entif.research.tag',
    ]);
  });

  it('excludes itself, drafts, and unrelated candidates', () => {
    const current = makeItem();
    const draft = makeItem({ id: 'entif.research.draft', slug: 'draft', status: 'draft' });
    const unrelated = makeItem({ id: 'entif.research.other', slug: 'other', tags: [], projects: [], kind: 'essay' });

    expect(rankRelatedContent(current, [current, draft, unrelated])).toEqual([]);
  });

  it('uses date and id as deterministic tie breakers', () => {
    const current = makeItem();
    const older = makeItem({ id: 'entif.research.zeta', slug: 'zeta', published: new Date('2025-01-01T00:00:00Z') });
    const newerA = makeItem({ id: 'entif.research.beta', slug: 'beta', published: new Date('2026-03-01T00:00:00Z') });
    const newerB = makeItem({ id: 'entif.research.gamma', slug: 'gamma', published: new Date('2026-03-01T00:00:00Z') });

    expect(rankRelatedContent(current, [older, newerB, newerA]).map(({ id }) => id)).toEqual([
      'entif.research.beta',
      'entif.research.gamma',
      'entif.research.zeta',
    ]);
  });

  it('returns no recommendations for a non-positive limit', () => {
    expect(rankRelatedContent(makeItem(), [makeItem({ id: 'entif.research.beta', slug: 'beta' })], 0)).toEqual([]);
  });

  it('counts each published topic once per page and ignores drafts', () => {
    const counts = countTopics([
      makeItem({ tags: ['memory', 'memory', 'agents'] }),
      makeItem({ id: 'entif.research.beta', slug: 'beta', tags: ['memory'] }),
      makeItem({ id: 'entif.research.draft', slug: 'draft', status: 'draft', tags: ['private'] }),
    ]);

    expect(counts.get('memory')).toBe(2);
    expect(counts.get('agents')).toBe(1);
    expect(counts.has('private')).toBe(false);
  });
});
