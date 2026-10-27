import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {buttonStyles} from '@/components/ui/button';
import {DemoNotice} from '@/components/ui/demo-notice';
import {getPosts} from '@/lib/content';
import {localizedPath} from '@/lib/seo';
import type {AppPathnames} from '@/i18n/routing';

export async function generateStaticParams() {
  return [];
}

export default async function BlogPage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'blog'});
  const posts = getPosts();
  const snippets = []; // populated after snippets loader exists

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
              href={localizedPath(locale as AppPathnames, '/blog')}
              className={buttonStyles({variant: 'secondary'})}
            >
              {t('allPosts')}
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            {posts.length === 0 ? (
              <p className="text-center text-muted">{t('noPosts')}</p>
            ) : (
              posts.map((post) => (
                <article key={post.slug} className="card p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 font-mono text-[0.65rem] text-muted">
                        {post.tags.slice(0, 1).map((tag) => tag)}
                      </span>
                    </div>
                  </div>

                  <h3 className="heading-3 mb-2">{post.title.es}</h3>
                  <p className="text-sm text-muted line-clamp-2 mb-4">{post.description.es}</p>

                  <div className="flex items-center gap-3 text-xs font-mono text-muted">
                    <span>{t('published', {date: post.date})}</span>
                    <span className="mx-1 h-4 w-px bg-border" />
                    <span>{t('minRead', {minutes: 5})}</span>
                  </div>
                </article>
              ))
            )}
          </div>

          <aside className="space-y-8 hidden lg:block">
            <section className="card p-6 sticky top-24">
              <h2 className="heading-3 mb-4">{t('snippets')}</h2>
              <p className="text-sm text-muted mb-4">{t('snippetsSubtitle')}</p>
              <p className="text-xs text-muted">{t('empty')}</p>
            </section>

            <DemoNotice text={t('demoNotice')} />
          </aside>
        </div>
      </div>
    </section>
  );
}
