import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const identifierPattern = /^entif\.[a-z0-9.-]+$/;

const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../../docs/site' }),
  schema: z.object({
    id: z.string().regex(identifierPattern),
    slug: z.string().regex(slugPattern),
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(220),
    kind: z.enum(['research', 'project', 'protocol', 'essay', 'update']),
    status: z.enum(['draft', 'published', 'deprecated']),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    authors: z.array(z.string().min(1)).min(1),
    tags: z.array(z.string().regex(slugPattern)).default([]),
    projects: z.array(z.string().regex(slugPattern)).default([]),
    related: z.array(z.string().regex(identifierPattern)).default([]),
    sourceRefs: z.array(z.string().min(1)).default([]),
    featured: z.boolean().default(false),
    noindex: z.boolean().default(false),
  }),
});

export const collections = { site };
