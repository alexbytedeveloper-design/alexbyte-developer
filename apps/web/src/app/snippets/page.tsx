import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getSnippets} from '@/lib/content';

export default async function SnippetsPage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'snippets'});
  const snippets = getSnippets();

  return (
    <section className="relative overflow-hidden border-b border-border/70 pt-20 pb-32 sm:pt-24 sm:pb-40 lg:pb-48">
      <div className="container-page relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between max-w-3xl mx-auto">
          <div className="max-w-xl">
            <p className="kicker">{t('kicker')}</p>
            <h2 className="heading-2">{t('title')}</h2>
            <p className="lead mt-4">{t('subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-2 text-xs font-mono text-muted transition-colors hover:bg-surface hover:text-text"
            >
              {t('backToBlog')}
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {snippets.length === 0 ? (
            <p className="text-center text-muted">{t('empty') ?? 'Sin snippets todavía.'}</p>
          ) : (
            snippets.map((snippet) => (
              <article key={snippet.slug} className="card p-6">
                <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 font-mono text-[0.65rem] text-muted">
                  {snippet.language}
                </span>
                <h3 className="heading-3 mt-3 mb-2">{snippet.title.es}</h3>
                <p className="text-sm text-muted line-clamp-2">{snippet.description.es}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
