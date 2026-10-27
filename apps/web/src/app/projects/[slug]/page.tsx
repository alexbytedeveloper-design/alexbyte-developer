import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {getProject, getProjectBody} from '@/lib/content';
import {buttonStyles} from '@/components/ui/button';
import {DemoNotice} from '@/components/ui/demo-notice';
import {ArrowLeft} from '@/components/ui/icons';
import {localizedPath} from '@/lib/seo';
import type {AppPathnames} from '@/i18n/routing';

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({params}: {params: {slug: string}}) {
  const project = getProject(params.slug);
  if (!project) return {};
  const t = await getTranslations({namespace: 'meta'});
  return {
    title: project.title.es,
    description: project.summary.es,
    alternates: {
      canonical: `https://alexbyte.dev/es/proyectos/${project.slug}`,
      languages: {
        es: `https://alexbyte.dev/es/proyectos/${project.slug}`,
        en: `https://alexbyte.dev/en/projects/${project.slug}`,
        pt: `https://alexbyte.dev/pt/projetos/${project.slug}`,
        fr: `https://alexbyte.dev/fr/projets/${project.slug}`,
        it: `https://alexbyte.dev/it/progetti/${project.slug}`,
        'x-default': `https://alexbyte.dev/en/projects/${project.slug}`,
      },
    },
  };
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{slug: string}>;
  searchParams: Promise<{locale?: string}>;
}) {
  const {slug} = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const body = getProjectBody(slug, 'es');

  const t = await getTranslations({locale: 'es', namespace: 'projects'});
  const tCommon = await getTranslations({locale: 'es', namespace: 'common'});
  const tMeta = await getTranslations({locale: 'es', namespace: 'meta'});

  return (
    <article className="relative overflow-hidden border-b border-border/70 pt-20 pb-28 sm:pt-24 sm:pb-36 lg:pb-48">
      <div className="container-page relative">
        <div className="flex items-center justify-between gap-4 md:gap-8 mb-10">
          <Link
            href={localizedPath('es', '/projects')}
            className={buttonStyles({variant: 'ghost', className: 'size-10'})}
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="hidden sm:flex items-center gap-1 text-[0.65rem] font-mono text-muted uppercase tracking-widest">
            <span>{tMeta.projects.title}</span>
            <span>/</span>
            <span>{project.title.es}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <main className="space-y-10">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-[#070b14] shadow-2xl">
              <img
                src={project.cover}
                alt=""
                className="object-cover object-center h-full w-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070f]/95 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-4">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-[#05070f]/80 px-2.5 py-1 font-mono text-xs ${project.isDemo ? 'text-muted border-muted/60' : 'text-success border-success/25'}`}
                >
                  {project.isDemo ? t('demo') : tCommon.shipped ?? 'Publicado'}
                </span>
                <span className="text-xs text-muted">{project.year}</span>
              </div>
            </div>

            <h1 className="heading-1">{project.title.es}</h1>
            <p className="lead max-w-xl">{project.summary.es}</p>

            <div className="grid gap-6 sm:grid-cols-2">
              <section className="card p-6">
                <h2 className="heading-3 mb-4">{t('stack')}</h2>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="card p-6">
                <h2 className="heading-3 mb-4">{t('challenges')}</h2>
                <ul className="space-y-2 text-sm text-muted leading-relaxed">
                  {project.challenges.es.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="mt-1 flex size-3 items-center justify-center rounded-full bg-primary/10 text-[10px] text-primary">◆</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div dangerouslySetInnerHTML={{__html: body.markdown ?? ''}} className="prose-alex max-w-none" />

            <div className="mt-12 card p-6 border-t-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                    {t('policyTitle')}
                  </span>
                  <p className="text-sm text-text">{project.title.es}</p>
                </div>
                <Link
                  href={project.policyPdf}
                  className={buttonStyles({variant: 'secondary'})}
                >
                  {t('viewPolicy')}
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted">{t('policyPending')}</p>
            </div>
          </main>

          <aside className="space-y-8">
            <section className="card p-6 sticky top-24">
              <h2 className="heading-3 mb-4">{t('downloadTitle')}</h2>
              <p className="text-sm text-muted mb-5">{t('downloadText')}</p>

              <form
                onSubmit={(event) => event.preventDefault()}
                className="space-y-3"
              >
                <div className="flex items-start gap-2">
                  <input
                    id="accept-policy"
                    type="checkbox"
                    className="mt-1 rounded border-border bg-bg text-primary focus:ring-primary"
                  />
                  <label htmlFor="accept-policy" className="text-sm text-muted">
                    {t('acceptPolicy')}
                  </label>
                </div>
                <button
                  disabled
                  className={buttonStyles({className: 'w-full'})}
                >
                  {t('downloadCta')}
                </button>
                <p className="mt-2 text-[0.75rem] text-muted">{t('policyPending')}</p>
              </form>
            </section>

            <DemoNotice text={t('demoNotice')} />
          </aside>
        </div>
      </div>
    </article>
  );
}
