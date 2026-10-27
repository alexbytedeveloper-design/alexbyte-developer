'use client';

import {Globe} from '@/components/ui/icons';
import {localizedPath} from '@/lib/seo';
import type {AppPathnames, Locale} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
import {usePathname} from '@/i18n/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {useParams} from 'next/navigation';

const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  it: 'Italiano',
};

export function LanguageSwitcher({compact = false}: {compact?: boolean}) {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();

  const rest = Object.fromEntries(
    Object.entries(params).filter(([key]) => key !== 'locale'),
  ) as Record<string, string>;

  return (
    <details className="group relative">
      <summary
        aria-label={t('language')}
        className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-border/80 bg-surface/50 px-2.5 py-2 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-text [&::-webkit-details-marker]:hidden"
      >
        <Globe className="size-4" />
        <span>{locale.toUpperCase()}</span>
        <span
          aria-hidden
          className="text-[0.6rem] transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-[#0a1020]/95 p-1 shadow-2xl backdrop-blur-xl">
        {routing.locales.map((option) => {
          const href = localizedPath(
            option,
            pathname as AppPathnames,
            Object.keys(rest).length ? rest : undefined,
          );

          return (
            <a
              key={option}
              href={href}
              hrefLang={option}
              lang={option}
              aria-current={option === locale ? 'true' : undefined}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                option === locale
                  ? 'bg-primary/15 text-text'
                  : 'text-muted hover:bg-surface-2 hover:text-text'
              }`}
            >
              <span>{localeNames[option]}</span>
              <span className="font-mono text-[0.65rem] uppercase text-muted">
                {option}
              </span>
            </a>
          );
        })}
        {compact ? null : (
          <span className="sr-only">{t('language')}</span>
        )}
      </div>
    </details>
  );
}
