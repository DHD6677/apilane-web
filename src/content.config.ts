import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.md$/, '')
  }),
  schema: z.object({
    slug: z.string(),
    locale: z.enum(['en', 'zh']),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    readingMinutes: z.number(),
    category: z.string(),
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).default([])
  })
});

export const collections = { blog };
