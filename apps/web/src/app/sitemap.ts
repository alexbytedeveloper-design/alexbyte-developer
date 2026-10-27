import {getProjects, getPosts, getResources} from '@/lib/content';
import {routing} from '@/i18n/routing';
import {SITE_URL} from '@/lib/seo';
import type {MetadataRoute} from 'next';
import type {AppPathnames} from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap[] = [];
  const now = new Date().toISOString();

  const routeKeys = Object.keys(routing.pathnames) as AppPathnames[];

  for (const key of routeKeys) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}${routing.pathnames[key] as string}`,
        lastModified: now,
        changeFrequency: key === '/' ? 'daily' : 'weekly',
        priority: key === '/' ? 1 : 0.8,
      });
    }
  }

  for (const project of getProjects()) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/es/proyectos/${project.slug}`,
        lastModified: new Date(project.year, 0, 1).toISOString(),
        changeFrequency: 'monthly',
        priority: project.featured ? 0.9 : 0.7,
      });
    }
  }

  for (const post of getPosts()) {
    entries.push({
      url: `${SITE_URL}/es/blog/${post.slug}`,
      lastModified: post.updated ? new Date(post.updated).toISOString() : new Date(post.date).toISOString(),
      changeFrequency: 'monthly',
      priority: post.featured ? 0.9 : 0.6,
    });
  }

  for (const resource of getResources()) {
    entries.push({
      url: `${SITE_URL}/es/recursos/${resource.slug}`,
      lastModified: new Date(resource.date).toISOString(),
      changeFrequency: 'yearly',
      priority: resource.featured ? 0.8 : 0.5,
    });
  }

  return entries;
}
