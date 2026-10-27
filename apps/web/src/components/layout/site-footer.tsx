import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {socialLinks} from '@/lib/site';
import {Wordmark} from '@/components/ui/brand';
import {ArrowUp, Github, Linkedin, Mail} from '@/components/ui/icons';

const socialIcons = {github: Github, linkedin: Linkedin, email: Mail} as const;

export async function SiteFooter({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'footer'});
  const tNav = await getTranslations({locale, namespace: 'nav'});
  const tLegal = await getTranslations({locale, namespace: 'meta'});

  return (
    <footer className="relative overflow-hidden border-t border-border/80 bg-[#04060d]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="container-page relative py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex rounded-lg py-1 text-lg text-text">
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t('tagline')}
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-widest text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {t('status')}
            </p>
          </div>

          <div>
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
              {t('navTitle')}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                {href: '/projects', key: 'projects'},
                {href: '/blog', key: 'blog'},
                {href: '/resources', key: 'resources'},
                {href: '/about', key: 'about'},
                {href: '/contact', key: 'contact'},
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-text"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
              {t('legalTitle')}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                {href: '/privacy', key: 'privacy'},
                {href: '/terms', key: 'terms'},
                {href: '/cookies', key: 'cookies'},
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-text"
                  >
                    {tLegal(`${item.key}.title`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/newsletter"
                  className="text-muted transition-colors hover:text-text"
                >
                  {t('newsletter')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
              {t('socialTitle')}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.key];
                return (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target={social.key === 'email' ? undefined : '_blank'}
                      rel={
                        social.key === 'email' ? undefined : 'noreferrer noopener'
                      }
                      className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-text"
                    >
                      <Icon className="size-4 text-muted transition-colors group-hover:text-accent" />
                      <span>{social.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/70 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Alex. {t('rights')}</p>
          <p className="font-mono">{t('builtWith')}</p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-text"
          >
            {t('backToTop')}
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
