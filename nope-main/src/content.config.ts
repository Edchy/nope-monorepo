import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "../content/work" }),
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

export const collections = { work };
