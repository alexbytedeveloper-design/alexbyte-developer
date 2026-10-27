import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getProjects} from '@/lib/content';
import {buttonStyles} from '@/components/ui/button';
import {DemoNotice} from '@/components/ui/demo-notice';
import {ArrowRight} from '@/components/ui/icons';
import {localizedPath} from '@/lib/seo';

export async function ProjectsPage({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'projects'});
  const projects = getProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

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
              href={localizedPath(locale, '/projects')}
              className={buttonStyles({variant: 'secondary'})}
            >
              {t('viewAll')}
            </Link>
          </div>
        </div>

        {projects.length === 0 ? (
          <p className="mt-12 text-center text-muted">{t('empty')}</p>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="mt-16 grid gap-12 lg:grid-cols-3">
                {featured.map((project) => (
                  <ProjectCard key={project.slug} project={project} locale={locale} />
                ))}
              </div>
            )}

            {others.length > 0 && (
              <>
                <h2 className="mt-16 heading-3">{t('viewAll')}</h2>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {others.map((project) => (
                    <ProjectCard key={project.slug} project={project} locale={locale} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <DemoNotice text={t('demoNotice')} />
    </section>
  );
}

interface ProjectCardProps {
  project: Awaited<ReturnType<typeof getProjects>>[number];
  locale: string;
}

function ProjectCard({project, locale}: ProjectCardProps) {

  return (
    <article className="card p-5">
      <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-[#070b14] mb-4">
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="object-cover object-center h-full w-full"
        />
      </div>

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-mono text-xs text-muted">{project.type}</span>
        <span
          className={`inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 font-mono text-[0.65rem] ${project.isDemo ? 'text-muted border-muted/50' : 'text-success border-success/25'}`}
        >
          {project.isDemo ? 'demo' : 'publicado'}
        </span>
      </div>

      <h3 className="heading-3 mb-1">{project.title.es}</h3>
      <p className="text-sm text-muted line-clamp-2 mb-3">{project.summary.es}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.stack.slice(0, 4).map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={localizedPath(locale, '/projects/[slug]' as any, {
          slug: project.slug,
        }) as string}
        className={buttonStyles({variant: 'ghost', className: 'w-full'})}
      >
        {project.isDemo ? 'Ver proyecto' : 'Ver proyecto'}
        <ArrowRight className="size-3.5" />
      </Link>
    </article>
  );
}
