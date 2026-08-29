import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const identifierPattern = /^entif\.[a-z0-9.-]+$/;

const siteSchema = z
  .object({
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
    routeTag: z.string().regex(slugPattern).optional(),
    related: z.array(z.string().regex(identifierPattern)).default([]),
    sourceRefs: z.array(z.string().min(1)).default([]),
    featured: z.boolean().default(false),
    noindex: z.boolean().default(false),
  })
  .superRefine((data, context) => {
    if (
      data.status === 'published' &&
      data.kind !== 'project' &&
      data.routeTag === undefined
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['routeTag'],
        message: 'Published non-project content requires a stable routeTag.',
      });
    }

    if (
      data.routeTag !== undefined &&
      !data.tags.includes(data.routeTag) &&
      !data.projects.includes(data.routeTag)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['routeTag'],
        message: 'routeTag must also appear in tags or projects.',
      });
    }
  });

const pageSchema = z.object({
  slug: z.string().regex(slugPattern),
  title: z.string().min(3).max(100),
  eyebrow: z.string().min(2).max(60),
  description: z.string().min(20).max(280),
  status: z.enum(['draft', 'published']),
  sourceRefs: z.array(z.string().min(1)).default([]),
});

const site = defineCollection({
  loader: glob({ pattern: '{projects,research}/**/*.md', base: './content' }),
  schema: siteSchema,
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/pages' }),
  schema: pageSchema,
});

export const collections = { site, pages };
