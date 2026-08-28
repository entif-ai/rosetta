export const contentSections = {
  research: 'research',
  project: 'projects',
  protocol: 'protocols',
  essay: 'essays',
  update: 'updates',
} as const;

export type ContentKind = keyof typeof contentSections;
export type PublicationStatus = 'draft' | 'published' | 'deprecated';

export interface ContentSummary {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly kind: ContentKind;
  readonly status: PublicationStatus;
  readonly published: Date;
  readonly updated?: Date;
  readonly tags: readonly string[];
  readonly projects: readonly string[];
  readonly related: readonly string[];
  readonly noindex: boolean;
}

export interface ContentCardData {
  readonly id: string;
  readonly href: string;
  readonly title: string;
  readonly description: string;
  readonly kind: ContentKind;
  readonly tags: readonly string[];
  readonly projects: readonly string[];
}

const latestDate = (item: ContentSummary): number =>
  (item.updated ?? item.published).getTime();

const intersectionCount = (
  left: readonly string[],
  right: readonly string[],
): number => {
  const rightSet = new Set(right);
  return left.reduce((count, value) => count + Number(rightSet.has(value)), 0);
};

export const isPublished = (item: ContentSummary): boolean =>
  item.status === 'published';

export const getContentPath = (item: Pick<ContentSummary, 'kind' | 'slug'>): string =>
  `${contentSections[item.kind]}/${item.slug}/`;

export const toContentCard = (
  item: ContentSummary,
  baseUrl: string,
): ContentCardData => ({
  id: item.id,
  href: `${baseUrl}${getContentPath(item)}`,
  title: item.title,
  description: item.description,
  kind: item.kind,
  tags: item.tags,
  projects: item.projects,
});

export const rankRelatedContent = (
  current: ContentSummary,
  candidates: readonly ContentSummary[],
  limit = 4,
): readonly ContentSummary[] => {
  if (limit <= 0) {
    return [];
  }

  const explicit = new Set(current.related);

  return candidates
    .filter((candidate) => candidate.id !== current.id && isPublished(candidate))
    .map((candidate) => {
      const score =
        Number(explicit.has(candidate.id)) * 100 +
        intersectionCount(current.projects, candidate.projects) * 20 +
        intersectionCount(current.tags, candidate.tags) * 8 +
        Number(current.kind === candidate.kind);

      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        latestDate(right.candidate) - latestDate(left.candidate) ||
        left.candidate.id.localeCompare(right.candidate.id),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
};

export const countTopics = (
  content: readonly ContentSummary[],
): ReadonlyMap<string, number> => {
  const counts = new Map<string, number>();

  for (const item of content.filter(isPublished)) {
    for (const tag of new Set(item.tags)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return counts;
};
