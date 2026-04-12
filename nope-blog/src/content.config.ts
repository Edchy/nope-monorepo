import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: '../content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    subtitle: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: '../content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.date().optional(),
      type: z.string(),
      section: z.enum(["selected", "archive"]).default("archive"),
      tags: z.array(z.string()).default([]),
      url: z.url().optional(),
      images: z.array(z.union([image(), z.url()])).default([]),
      tech: z.array(z.string()).default([]),
      effort: z.number().min(1).max(3).default(2),
    }),
});

const artificial = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: '../content/artificial' }),
  schema: z.object({
    kind: z.enum(['note', 'tool', 'link']),
    title: z.string(),
    date: z.date(),
    draft: z.boolean().default(false),
    description: z.string().optional(),
    url: z.url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog,
  work,
  artificial,
};
