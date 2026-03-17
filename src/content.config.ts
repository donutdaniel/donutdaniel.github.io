import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    repo: z.string().url().optional(),
    website: z.string().url().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { writing };
