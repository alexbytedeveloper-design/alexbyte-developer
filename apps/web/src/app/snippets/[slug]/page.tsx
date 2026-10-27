import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {getSnippet, getSnippetBody} from '@/lib/content';

export default async function SnippetDetailPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const snippet = getSnippet(slug);
  if (!snippet) notFound();

  const body = getSnippetBody(slug, 'es');
  const t = await getTranslations({locale: 'es', namespace: 'snippets'});
  const tCommon = await getTranslations({locale: 'es', namespace: 'common'});

  return (
    <article className="relative overflow-hidden border-b border-border/70 pt-20 pb-28 sm:pt-24 sm:pb-36 lg:pb-48">
      <div className="container-page relative">
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/snippets"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-2 text-xs font-mono text-muted transition-colors hover:bg-surface hover:text-text"
          >
            {tCommon.backToBlog}
          </Link>
        </div>

        <main className="prose-alex max-w-none space-y-8">
          <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 font-mono text-[0.65rem] text-muted">
            {snippet.language}
          </span>
          <h1 className="heading-1">{snippet.title.es}</h1>
          <p className="lead mb-6">{snippet.description.es}</p>
          <div dangerouslySetInnerHTML={{__html: body.markdown ?? ''}} />
        </main>
      </div>
    </article>
  );
}
