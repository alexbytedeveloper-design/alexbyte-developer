import {routing, type AppPathnames, type Locale} from '@/i18n/routing';
import type {Metadata} from 'next';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alexbyte.dev'
).replace(/\/$/, '');

type PathParams = Record<string, string>;

export function localizedPath(
  locale: Locale,
  pathname: AppPathnames,
  params?: PathParams,
): string {
  const entry = routing.pathnames[pathname] as string | Record<Locale, string>;
  const pattern = typeof entry === 'string' ? entry : entry[locale];
  if (!params) return pattern;

  return pattern.replace(/\[([^\]]+)\]/g, (match, key: string) => {
    const value = params[key];
    return value ? encodeURIComponent(value) : match;
  });
}

export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function alternateLanguages(
  pathname: AppPathnames,
  params?: PathParams,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(localizedPath(locale, pathname, params));
  }
  languages['x-default'] = absoluteUrl(localizedPath('en', pathname, params));
  return languages;
}

type MetadataInput = {
  locale: Locale;
  pathname: AppPathnames;
  params?: PathParams;
  title: string;
  description: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

export function buildMetadata({
  locale,
  pathname,
  params,
  title,
  description,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(localizedPath(locale, pathname, params));

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternateLanguages(pathname, params),
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: '<alexbyte/>',
      locale,
      ...(type === 'article'
        ? {publishedTime, modifiedTime, tags, authors: ['Alex']}
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
