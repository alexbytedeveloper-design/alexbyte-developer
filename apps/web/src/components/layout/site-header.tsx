'use client';

import {useEffect, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {navItems, socialLinks} from '@/lib/site';
import {cn} from '@/lib/utils';
import {Wordmark} from '@/components/ui/brand';
import {buttonStyles} from '@/components/ui/button';
import {ArrowUpRight, Close, Github, Linkedin, Mail, Menu} from '@/components/ui/icons';
import {LanguageSwitcher} from './language-switcher';

const socialIcons = {github: Github, linkedin: Linkedin, email: Mail} as const;

export function SiteHeader() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-300',
        scrolled
          ? 'border-border/80 bg-bg/80 shadow-[0_18px_50px_rgba(0,0,0,.35)] backdrop-blur-xl'
          : 'border-transparent bg-bg/40 backdrop-blur-md',
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-lg py-1 text-[1.05rem] text-text"
        >
          <span className="relative">
            <Wordmark />
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"
            />
          </span>
        </Link>

        <nav aria-label={t('menu')} className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3 py-2 text-sm transition-colors',
                isActive(item.href)
                  ? 'text-text'
                  : 'text-muted hover:bg-surface/60 hover:text-text',
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className={buttonStyles({size: 'sm', className: 'hidden sm:inline-flex'})}
          >
            {t('cta')}
            <ArrowUpRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('close') : t('menu')}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border/80 bg-surface/50 text-text transition-colors hover:border-accent/40 lg:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-[4.5rem] z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-border bg-[#05070f]/97 backdrop-blur-xl lg:hidden">
          <div className="container-page py-6">
            <nav aria-label={t('menu')} className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-4 py-3.5 text-base transition-colors',
                    isActive(item.href)
                      ? 'bg-primary/10 text-text'
                      : 'text-muted hover:bg-surface hover:text-text',
                  )}
                >
                  <span>{t(item.key)}</span>
                  <span className="font-mono text-[0.65rem] text-muted">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <Link href="/contact" className={buttonStyles({className: 'w-full'})}>
                {t('cta')}
                <ArrowUpRight className="size-4" />
              </Link>
              <LanguageSwitcher compact />
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-5">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.key];
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    target={social.key === 'email' ? undefined : '_blank'}
                    rel={social.key === 'email' ? undefined : 'noreferrer noopener'}
                    aria-label={social.label}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface/50 text-muted transition-colors hover:border-accent/40 hover:text-text"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
              <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                {locale}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
