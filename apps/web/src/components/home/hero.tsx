import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {buttonStyles} from '@/components/ui/button';
import {BrandLogo} from '@/components/ui/brand';
import {ArrowRight, ArrowUpRight, Github, Linkedin, Mail} from '@/components/ui/icons';
import {socialLinks, stack} from '@/lib/site';
import {CodeWindow} from './code-window';

const socialIcons = {github: Github, linkedin: Linkedin, email: Mail} as const;

export async function Hero({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'hero'});

  return (
    <section className="relative isolate overflow-hidden border-b border-border/70">
      <div
        aria-hidden
        className="surface-grid absolute inset-0 -z-20 opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_25%,#000_35%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="absolute -left-40 top-10 -z-10 size-[30rem] rounded-full bg-primary/15 blur-[130px]"
      />
      <div
        aria-hidden
        className="absolute -right-32 top-0 -z-10 size-[26rem] rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="container-page relative pb-14 pt-10 sm:pt-14 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/[0.07] px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-success">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
              {t('badge')}
            </p>

            <p className="kicker mt-7">{t('hello')}</p>
            <h1 className="heading-1 mt-4">
              {t('title1')}
              <br />
              <span className="text-gradient">{t('title2')}</span>
            </h1>

            <p className="lead mt-6 max-w-xl">{t('subtitle')}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/projects" className={buttonStyles()}>
                {t('ctaPrimary')}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className={buttonStyles({variant: 'secondary'})}
              >
                {t('ctaSecondary')}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-muted">
                {t('stackLabel')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {stack.slice(0, 5).map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center gap-4 border-t border-border/60 pt-5">
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-muted">
                {t('available')}
              </span>
              <div className="flex items-center gap-1">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.key];
                  return (
                    <a
                      key={social.key}
                      href={social.href}
                      target={social.key === 'email' ? undefined : '_blank'}
                      rel={
                        social.key === 'email'
                          ? undefined
                          : 'noreferrer noopener'
                      }
                      aria-label={social.label}
                      className="inline-flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-accent"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[24rem] lg:max-w-[27rem]">
            <div
              aria-hidden
              className="absolute inset-[-8%] rounded-[3rem] border border-white/[0.04]"
            />
            <div
              aria-hidden
              className="absolute inset-[-16%] rounded-[4rem] border border-white/[0.03]"
            />
            <BrandLogo priority className="relative z-10" />

            <div className="absolute -left-3 top-8 z-20 hidden animate-float rounded-xl border border-border bg-surface/80 px-3 py-2 font-mono text-[0.68rem] text-text shadow-xl backdrop-blur-md sm:block">
              <span className="text-accent">▲</span> Next.js 16
            </div>
            <div className="absolute -right-4 bottom-16 z-20 hidden animate-float rounded-xl border border-border bg-surface/80 px-3 py-2 font-mono text-[0.68rem] text-text shadow-xl backdrop-blur-md [animation-delay:1.8s] sm:block">
              <span className="text-primary">◆</span> TypeScript
            </div>
            <div className="absolute -bottom-3 left-8 z-20 hidden animate-float rounded-xl border border-border bg-surface/80 px-3 py-2 font-mono text-[0.68rem] text-text shadow-xl backdrop-blur-md [animation-delay:3s] sm:block">
              <span className="text-success">✦</span> IA aplicada
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-14">
          <CodeWindow
            file={t('file')}
            phrase={t('phrase')}
            accent={t('accent')}
          />
        </div>
      </div>
    </section>
  );
}
