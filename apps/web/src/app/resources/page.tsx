import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getResources} from '@/lib/content';
import {DemoNotice} from '@/components/ui/demo-notice';
import {localizedPath} from '@/lib/seo';

export default async function ResourcesPage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'resources'});
  const resources = getResources();

  return (
    <section className="relative overflow-hidden border-b border-border/70 pt-20 pb-32 sm:pt-24 sm:pb-40 lg:pb-48">
      <div className="container-page relative">
        <div className="max-w-3xl mx-auto">
          <p className="kicker">{t('kicker')}</p>
          <h2 className="heading-2 mb-4">{t('title')}</h2>
          <p className="lead mb-10">{t('subtitle')}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <article key={resource.slug} className="card p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="inline-flex items-center gap-1 rounded-md border border-success/25 bg-success/[0.07] px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-success">
                  {t('free')}
                </span>
                <span className="text-xs text-muted">{t('pages', {count: resource.pages})}</span>
              </div>

              <h3 className="heading-3 mb-2">{resource.title.es}</h3>
              <p className="text-sm text-muted line-clamp-2 mb-5">{resource.description.es}</p>

              <div className="flex items-center gap-2 text-xs font-mono text-muted mb-5">
                <span>{t('size', {size: resource.fileSize})}</span>
                <span className="mx-1 h-4 w-px bg-border" />
                <span className="hidden sm:inline">{resource.date}</span>
              </div>

              <a
                href={resource.file}
                download
                className={buttonStyles({className: 'w-full'})}
              >
                {t('download')}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <DemoNotice text={t('demoNotice')} />
        </div>
      </div>
    </section>
  );
}
