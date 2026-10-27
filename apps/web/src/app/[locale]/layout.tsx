import {notFound} from 'next/navigation';
import {getTranslations, getMessages, setRequestLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import {SiteHeader} from '@/components/layout/site-header';
import {SiteFooter} from '@/components/layout/site-footer';
import {buildMetadata} from '@/lib/seo';
import '../globals.css';
import {Inter} from 'next/font/google';
import {JetBrains_Mono} from 'next/font/google';
import type {Metadata} from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false,
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-code',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {template: '%s · <alexbyte/>', default: '<alexbyte/>'},
  description: 'Un lugar entre desarrolladores para aprender y apoyarnos.',
  alternates: {canonical: 'https://alexbyte.dev'},
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  locale,
  children,
  params,
}: {
  locale: string;
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  setRequestLocale(await params.locale);

  const t = await getTranslations({locale, namespace: 'meta'});

  return (
    <html lang={locale} className={`${inter.className} ${mono.className} antialiased`}>
      <head>
        <link rel="icon" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:bg-black focus:text-black focus:px-3 focus:py-2"
        >
          {t('notFound.title') ?? 'Saltar al contenido'}
        </a>

        <SiteHeader />
        <main id="main-content" role="main" className="flex-grow">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
