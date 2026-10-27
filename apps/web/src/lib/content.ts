import fs from 'node:fs';
import path from 'node:path';
import {
  postSchema,
  projectSchema,
  resourceSchema,
  snippetSchema,
  type ContentLocale,
  type Post,
  type Project,
  type Resource,
  type Snippet,
} from '@alexbyte/shared';
import {cache} from 'react';
import {z} from 'zod';

const contentRoot = path.join(process.cwd(), 'content');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readJson<S extends z.ZodType>(filePath: string, schema: S): z.infer<S> {
  const raw = fs.readFileSync(filePath, 'utf8');
  let json: unknown;

  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error(`[content] JSON inválido en ${filePath}`);
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join('.') || '(raíz)'}: ${issue.message}`)
      .join('; ');
    throw new Error(`[content] ${path.basename(filePath)} inválido → ${details}`);
  }

  return parsed.data;
}

function listDirectories(kind: string): string[] {
  const dir = path.join(contentRoot, kind);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, {withFileTypes: true})
    .filter((entry) => entry.isDirectory() && slugPattern.test(entry.name))
    .map((entry) => entry.name);
}

function readBody(slug: string, kind: string, locale: ContentLocale): string | null {
  const filePath = path.join(contentRoot, kind, slug, `${locale}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8').trim();
}

export function resolveContentLocale(locale: string): {
  locale: ContentLocale;
  isFallback: boolean;
} {
  if (locale === 'es') return {locale: 'es', isFallback: false};
  if (locale === 'en') return {locale: 'en', isFallback: false};
  return {locale: 'en', isFallback: true};
}

export type ContentBody = {
  markdown: string;
  locale: ContentLocale;
  isFallback: boolean;
};

function getBody(slug: string, kind: string, requestedLocale: string): ContentBody {
  const resolved = resolveContentLocale(requestedLocale);
  const candidates: ContentLocale[] = [
    resolved.locale,
    resolved.locale === 'es' ? 'en' : 'es',
  ];

  for (const candidate of candidates) {
    const markdown = readBody(slug, kind, candidate);
    if (markdown) {
      return {
        markdown,
        locale: candidate,
        isFallback: resolved.isFallback || candidate !== resolved.locale,
      };
    }
  }

  return {markdown: '', locale: resolved.locale, isFallback: resolved.isFallback};
}

export const getProjects = cache((): Project[] => {
  const projects = listDirectories('projects').map((slug) =>
    readJson(path.join(contentRoot, 'projects', slug, 'project.json'), projectSchema),
  );

  return projects.sort((a, b) => a.order - b.order || b.year - a.year);
});

export const getFeaturedProjects = cache((limit = 3): Project[] =>
  getProjects()
    .filter((project) => project.featured)
    .slice(0, limit),
);

export function getProject(slug: string): Project | null {
  if (!slugPattern.test(slug)) return null;
  const filePath = path.join(contentRoot, 'projects', slug, 'project.json');
  if (!fs.existsSync(filePath)) return null;
  return readJson(filePath, projectSchema);
}

export function getProjectBody(slug: string, locale: string): ContentBody {
  return getBody(slug, 'projects', locale);
}

export const getPosts = cache((): Post[] =>
  listDirectories('posts')
    .map((slug) =>
      readJson(path.join(contentRoot, 'posts', slug, 'post.json'), postSchema),
    )
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date)),
);

export const getFeaturedPost = cache((): Post | null => {
  const posts = getPosts();
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
});

export function getPost(slug: string): Post | null {
  if (!slugPattern.test(slug)) return null;
  const filePath = path.join(contentRoot, 'posts', slug, 'post.json');
  if (!fs.existsSync(filePath)) return null;
  const post = readJson(filePath, postSchema);
  return post.draft ? null : post;
}

export function getPostBody(slug: string, locale: string): ContentBody {
  return getBody(slug, 'posts', locale);
}

export const getSnippets = cache((): Snippet[] =>
  listDirectories('snippets')
    .map((slug) =>
      readJson(path.join(contentRoot, 'snippets', slug, 'snippet.json'), snippetSchema),
    )
    .filter((snippet) => !snippet.draft)
    .sort((a, b) => b.date.localeCompare(a.date)),
);

export function getSnippet(slug: string): Snippet | null {
  if (!slugPattern.test(slug)) return null;
  const filePath = path.join(contentRoot, 'snippets', slug, 'snippet.json');
  if (!fs.existsSync(filePath)) return null;
  const snippet = readJson(filePath, snippetSchema);
  return snippet.draft ? null : snippet;
}

export function getSnippetBody(slug: string, locale: string): ContentBody {
  return getBody(slug, 'snippets', locale);
}

export const getResources = cache((): Resource[] =>
  listDirectories('resources')
    .map((slug) =>
      readJson(path.join(contentRoot, 'resources', slug, 'resource.json'), resourceSchema),
    )
    .sort((a, b) => b.order - a.order || b.date.localeCompare(a.date)),
);

export function getResource(slug: string): Resource | null {
  if (!slugPattern.test(slug)) return null;
  const filePath = path.join(contentRoot, 'resources', slug, 'resource.json');
  if (!fs.existsSync(filePath)) return null;
  return readJson(filePath, resourceSchema);
}

export function getContentStats() {
  return {
    projects: getProjects().length,
    posts: getPosts().length,
    resources: getResources().length,
  };
}
