import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {getPost, getPostBody} from '@/lib/content';
import {DemoNotice} from '@/components/ui/demo-notice';
import {ArrowLeft} from '@/components/ui/icons';
import {localizedPath} from '@/lib/seo';
import type {AppPathnames} from '@/i18n/routing';

export async function generateStaticParams() {
  return [];
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const body = getPostBody(slug, 'es');
  const t = await getTranslations({locale: 'es', namespace: 'blog'});
  const tCommon = await getTranslations({locale: 'es', namespace: 'common'});

  return (
    <article className="relative overflow-hidden border-b border-border/70 pt-20 pb-28 sm:pt-24 sm:pb-36 lg:pb-48">
      <div className="container-page relative">
        <div className="flex items-center gap-4 md:gap-8 mb-10">
          <Link
            href={localizedPath('es', '/blog')}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-2 text-xs font-mono text-muted transition-colors hover:bg-surface hover:text-text"
          >
            <ArrowLeft className="size-3.5" />
            {t('backToBlog')}
          </Link>
        </div>

        <main className="prose-alex max-w-none space-y-10">
          <div className="flex items-center gap-3 mb-2">
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="heading-1">{post.title.es}</h1>
          <p className="lead mb-6">{post.description.es}</p>

          <div className="flex items-center gap-3 text-xs font-mono text-muted">
            <span>{t('published', {date: post.date})}</span>
            <span className="mx-1 h-4 w-px bg-border" />
            <span>{t('minRead', {minutes: 5})}</span>
          </div>

          {post.updated && (
            <p className="text-[0.85rem] text-muted">
              {t('updated', {date: post.updated})}
            </p>
          )}

          <div dangerouslySetInnerHTML={{__html: body.markdown ?? ''}} />

          <div className="mt-12 pt-8 border-t border-border/60 flex items-center justify-between">
            <Link
              href={localizedPath('es', '/blog')}
              className={buttonStyles({variant: 'ghost'})}
            >
              {t('backToBlog')}
            </Link>
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-2 text-xs font-mono text-muted transition-colors hover:bg-surface hover:text-text"
              onClick={() => navigator.share?.({title: post.title.es, url: location.href}).catch(() => {})}
            >
              {t('share')}
            </button>
          </div>
        </main>

        <aside className="space-y-6">
          <DemoNotice text={t('demoNotice')} />
        </aside>
      </div>
    </article>
  );
}
