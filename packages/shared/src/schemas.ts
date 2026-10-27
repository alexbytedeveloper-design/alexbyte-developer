import {z} from 'zod';

export const UI_LOCALES = ['es', 'en', 'pt', 'fr', 'it'] as const;
export const CONTENT_LOCALES = ['es', 'en'] as const;

export type UiLocale = (typeof UI_LOCALES)[number];
export type ContentLocale = (typeof CONTENT_LOCALES)[number];

export const localeSchema = z.enum(UI_LOCALES);
export const contentLocaleSchema = z.enum(CONTENT_LOCALES);

const slugSchema = z
  .string()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido');

const localizedStringSchema = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});

const localizedStringArraySchema = z.object({
  es: z.array(z.string().min(1)).min(1),
  en: z.array(z.string().min(1)).min(1),
});

export const projectTypeSchema = z.enum(['web', 'app', 'saas']);
export type ProjectType = z.infer<typeof projectTypeSchema>;

export const projectSchema = z.object({
  slug: slugSchema,
  isDemo: z.boolean().default(true),
  type: projectTypeSchema,
  status: z.enum(['shipped', 'in-progress', 'concept']).default('shipped'),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative().default(0),
  year: z.number().int().min(2020).max(2100),
  duration: localizedStringSchema,
  title: localizedStringSchema,
  summary: localizedStringSchema,
  challenges: localizedStringArraySchema,
  stack: z.array(z.string().min(1)).min(1),
  cover: z.string().min(1),
  gallery: z.array(z.string().min(1)).min(1),
  downloadUrl: z.string().min(1).nullable().default(null),
  policyPdf: z.string().min(1),
  repositoryUrl: z.string().url().nullable().default(null),
  demoUrl: z.string().url().nullable().default(null),
});

export type Project = z.infer<typeof projectSchema>;

export const postSchema = z.object({
  slug: slugSchema,
  isDemo: z.boolean().default(true),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  tags: z.array(z.string().min(1)).default([]),
  cover: z.string().min(1),
  coverAlt: localizedStringSchema,
  title: localizedStringSchema,
  description: localizedStringSchema,
});

export type Post = z.infer<typeof postSchema>;

export const snippetSchema = z.object({
  slug: slugSchema,
  isDemo: z.boolean().default(true),
  draft: z.boolean().default(false),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  language: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  title: localizedStringSchema,
  description: localizedStringSchema,
});

export type Snippet = z.infer<typeof snippetSchema>;

export const resourceSchema = z.object({
  slug: slugSchema,
  isDemo: z.boolean().default(true),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative().default(0),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  file: z.string().startsWith('/'),
  fileSize: z.string().min(1),
  pages: z.number().int().positive(),
  title: localizedStringSchema,
  description: localizedStringSchema,
  topics: localizedStringArraySchema,
});

export type Resource = z.infer<typeof resourceSchema>;

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
  locale: localeSchema.default('es'),
  website: z.string().max(0).optional(),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

export const newsletterSubscribeSchema = z.object({
  email: z.email().max(254),
  consent: z.literal(true),
  locale: localeSchema.default('es'),
  website: z.string().max(0).optional(),
});

export type NewsletterSubscribe = z.infer<typeof newsletterSubscribeSchema>;

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z
      .array(z.object({path: z.string(), message: z.string()}))
      .optional(),
  }),
  meta: z.object({requestId: z.string()}).optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;

export const SITE = {
  name: '<alexbyte/>',
  domain: 'alexbyte.dev',
  url: 'https://alexbyte.dev',
  email: 'hola@alexbyte.dev',
  social: {
    github: 'https://github.com/alexbyte-dev',
    linkedin: 'https://www.linkedin.com/in/alexbyte-dev',
  },
} as const;
